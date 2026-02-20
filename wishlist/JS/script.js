// Retrieve wishlist and products from localStorage, or initialize as empty arrays
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let products = JSON.parse(localStorage.getItem('products'))

// When the document is ready, display the wishlist
$(document).ready(function () {
     addToWishlist(3)  // Uncomment for testing adding a product
    displayWishlist()
})

// Function to render the wishlist items on the page
function displayWishlist() {

    // Clear the wishlist container before rendering
    $('.wishlist-items').empty()

    // If the wishlist is empty, show a message and a link to return to store
    if (wishlist.length === 0) {

        $('main .container').empty().append(`<div class="text-center h3 my-5">
            <span>Your wishlist is empty</span> 
            <a href="../../productList/Template/product_list.html" class="text-secondary">Return to store</a>
        </div>`);
        return;
    }

    // Loop through each wishlist item
    wishlist.map(item => {
        let product = products.find(p => p.id === item.product_id);  // Find the corresponding product

        // Append the product card to the wishlist container
        $('.wishlist-items').append(`
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card border-0 mb-4">
                    <div class="image position-relative">
                        <div class="discount-per badge position-absolute top-0 end-0 text-white px-3 py-2 mt-2 me-2 rounded-5" style="background-color: #e30514;">
                            32%
                        </div>
                        <img src="${product.images[0]}" class="card-img-top img-1" alt="${product.title}">
                        <img src="../images/2.2.webp" class="card-img-top img-2" alt="${product.title}">

                        <div class="icons position-absolute bottom-0 start-50 translate-middle-x p-2 d-flex">
                            <i class="fa-solid fa-heart remove" data-id=${product.id}></i>
                            <i class="fa-solid fa-shopping-bag add-to-cart" data-id=${product.id}></i>
                            <i class="fa-regular fa-eye" data-id=${product.id} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        </div>
                    </div>
                    <div class="card-body ps-0 fw-bold">
                        <p class="card-title fw-bold">${product.title}</p>
                        <p class="card-text price fw-bold m-1">
                            $${product.discountvalue}
                            <span class="fw-normal text-decoration-line-through"> $${product.price}</span>
                        </p>
                        <div class="d-block d-md-flex align-items-center">
                            <div class="text-warning me-1 rating">
                                <i class=" fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <span class="text-secondary fw-semibold">${product.rating.count} reviews</span>
                        </div>
                    </div>
                </div>
            </div>`);
    });
}

// Function to remove a product from the wishlist
function removeFromWishlist(product_id) {
    wishlist = wishlist.filter(item => item.product_id !== product_id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Event listener for removing a product when the "heart" icon is clicked
$(document).on("click", ".remove", function () {
    const id = Number($(this).data("id"));
    removeFromWishlist(id);
    displayWishlist();
})

// Retrieve cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Event listener for adding product from wishlist directly to cart
$(document).on("click", ".add-to-cart", function () {
    const id = Number($(this).data("id"));
    addToCart(id);  // Add to cart
    removeFromWishlist(id);  // Remove from wishlist
    displayWishlist();  // Refresh wishlist
})

// Event listener for opening the modal when the "eye" icon is clicked
$(document).on("click", ".fa-eye", function () {

    const product_id = Number($(this).data("id"));
    const product = products.find(p => p.id === product_id);

    // Populate modal content with the product details
    $(".modal img").attr("src", product.images[0]);
    $(".modal .title").text(product.title);
    $(".modal .reviews").text(`${product.rating.count} review`);
    $(".modal .stock").text(`${product.stock} in stock`);
    $(".modal .disc-value").text(`$${product.discountvalue}`);
    $(".modal .price").text(`$${product.price}`);
    $(".modal .disc-per").text(`${product.discountPercentage}%`);

    // Clear previous size options and add new ones
    $(".size").empty();
    product.size.forEach((element, index) => {
        $(".size").append(`
            <input type="radio" class="btn-check" 
                   name="size_choice" 
                   id="size${index}" 
                   autocomplete="off">
            <label class="btn btn-variant-pill" 
                   for="size${index}">
                   ${element}
            </label>
        `);
    });

    // Set the product ID on the modal's "Add to Cart" button
    $(".modal .add-to-cart-modal").attr("data-id", `${product.id}`)
})

// Event listener for adding the product from modal to cart
$(document).on("click", ".modal .add-to-cart-modal", function() {
    const id = Number($(this).data("id"));
    const qty = Number($("#quantity-input").val());  // Get selected quantity
    addToCart(id, qty);  // Call addToCart function
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();  // Close the modal
    removeFromWishlist(id);  // Remove from wishlist
    displayWishlist();  // Refresh the wishlist
})

// Quantity decrement button
$(document).on("click", "#button-minus", function() {
    let value = Number($("#quantity-input").val());
    if (value > 1) {  // Prevent quantity from going below 1
        $("#quantity-input").val(value - 1);
    }
})

// Quantity increment button
$(document).on("click", "#button-plus", function() {
    let value = Number($("#quantity-input").val());
    $("#quantity-input").val(value + 1);
})