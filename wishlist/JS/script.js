import { Order } from "../../models/order.js";

// Retrieve wishlist and products from localStorage, or initialize as empty arrays
let products = JSON.parse(localStorage.getItem('products'))
let subtotal;
// When the document is ready, display the wishlist
$(document).ready(function () {
   addToWishlist(3)  // Uncomment for testing adding a product
    displayWishlist()
})

// Function to render the wishlist items on the page
function displayWishlist() {
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

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
        let product = products.find(p => p._id === item.product_id);  // Find the corresponding product

        // Append the product card to the wishlist container
        $('.wishlist-items').append(`
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card border-0 mb-4">
                    <div class="image position-relative">
                        ${product._discountPercentage? `<div class="discount-per badge position-absolute top-0 end-0 text-white px-3 py-2 mt-2 me-2 rounded-5" style="background-color: #e30514;">
                            ${product._discountPercentage}%
                        </div>`:``}
                        <img src="${product._imageUrl}" class="card-img-top img-1" alt="${product._name}">
                        <img src="../images/2.2.webp" class="card-img-top img-2" alt="${product._name}">

                        <div class="icons position-absolute bottom-0 start-50 translate-middle-x p-2 d-flex">
                            <i class="fa-solid fa-heart remove" data-id=${product._id}></i>
                            <i class="fa-solid fa-shopping-bag add-to-cart" data-id=${product._id}></i>
                            <i class="fa-regular fa-eye" data-id=${product._id} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        </div>
                    </div>
                    <div class="card-body ps-0 fw-bold">
                        <p class="card-title fw-bold">${product._name}</p>
                       ${product._discountValue?` <p class="card-text price fw-bold m-1">
                            $${product._discountValue}
                            <span class="fw-normal text-decoration-line-through"> $${product._price}</span>
                        </p>`:` <p class="card-text price fw-bold m-1">
                        $${product._price}
                        </p>`}
                        <div class="d-block d-md-flex align-items-center">
                            <div>${renderStars(Math.round(product._rating))}</div>
${product._reviews 
    ? `<span class="text-secondary fw-semibold">1 review</span>` 
    : `<span class="text-secondary fw-semibold">no reviews</span>`
}                            
                        </div>
                    </div>
                </div>
            </div>`);
    });
}

function renderStars(rating) {
    let starsHTML = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            starsHTML += `<i class="fa-solid fa-star text-warning"></i>`;
        } else if (i - rating < 1) {
            starsHTML += `<i class="fa-solid fa-star-half-stroke text-warning"></i>`;
        } else {
            starsHTML += `<i class="fa-regular fa-star text-warning"></i>`;
        }
    }

    return starsHTML;
}

// Function to remove a product from the wishlist
function removeFromWishlist(product_id) {
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
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
    window.location.replace('../../cart/Template/cart.html') // Redirect to cart
})

// Event listener for opening the modal when the "eye" icon is clicked
$(document).on("click", ".fa-eye", function () {

    const product_id = Number($(this).data("id"));
    const product = products.find(p => p._id === product_id);    

    // Populate modal content with the product details
    $(".modal img").attr("src", product._imageUrl);
    $(".modal .title").text(product._name);
    $(".modal .rating").html(`<div>${renderStars(Math.round(product._rating))}</div>`)
    $(".modal .reviews").html(`${product._reviews 
    ? `<span class="text-secondary fw-semibold">1 review</span>` 
    : `<span class="text-secondary fw-semibold">no reviews</span>`
}`);
    $(".modal .stock").text(`${product._stock} in stock`);
    $(".modal .disc-value").text(`$${product._discountValue}`);
    $(".modal .price").html(` ${product._discountValue?` <p class="card-text price fw-bold m-1">
                            $${product._discountValue}
                            <span class="fw-normal text-decoration-line-through"> $${product._price}</span>
                        </p>`:` <p class="card-text price fw-bold m-1">
                        $${product._price}
                        </p>`}`);
    $(".modal .disc-per").text(`${product._discountPercentage}%`);


    // Clear previous size options and add new ones
    $(".size").empty().append(`${product._size}`)

    // Set the product ID on the modal's "Add to Cart" button
    $("#exampleModal .add-to-cart-modal").attr("data-id", product_id)
    $("#exampleModal #button-plus").attr("data-id", product_id)
    $("#exampleModal #button-minus").attr("data-id", product_id)
    // Set the product ID on the modal's "Buy it now" button
    $("#exampleModal .checkout-modal").attr("data-id", product_id)

    calculateSubtotal(product_id)
})

// Event listener for adding the product from modal to cart
$(document).on("click", ".modal .add-to-cart-modal", function() {
    const id = Number($(this).attr("data-id"));
    const qty = Number($("#quantity-input").val());  // Get selected quantity
    addToCart(id, qty);  // Call addToCart function
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();  // Close the modal
    removeFromWishlist(id);  // Remove from wishlist
    displayWishlist();  // Refresh the wishlist
    window.location.replace('../../cart/Template/cart.html') // Redirect to cart
})

// Quantity decrement button
$(document).on("click", "#button-minus", function() {
    const id = Number($(this).attr("data-id"));
    let value = Number($("#quantity-input").val());
    if (value > 1) {  // Prevent quantity from going below 1
        $("#quantity-input").val(value - 1);
    } else{
        return
    }
    calculateSubtotal(id)
})

// Quantity increment button
$(document).on("click", "#button-plus", function() {
    const id = Number($(this).attr("data-id"));
    let value = Number($("#quantity-input").val());
    $("#quantity-input").val(value + 1);
    calculateSubtotal(id)
})

function calculateSubtotal(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p._id === id);
        if (!product) return;
        let value = Number($("#quantity-input").val());
        const price = product._discountValue || product._price;
        subtotal = price * value;
        console.log(subtotal);
        
}

$(".checkout-modal").on('click', function(){
     const id = Number($(this).attr("data-id"));
    let value = Number($("#quantity-input").val());
    let newOrder = new Order({
        id: Date.now(),
        cart: [{product_id:id, quantity: value}],
        createdAt: new Date(),
        shipping: {
            fristName: "",
            lastName: "",
            phone: "",
            country: "",
            fullAddress: "",
            appartment: "",
            postalCode: "",
            City: "",
            shipping_fees: null
        },
        subtotal: subtotal,
        discount_code: "",
        special_instructions: ""
    });

    localStorage.setItem("currentOrder", JSON.stringify(newOrder));

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newOrder);

    removeFromWishlist(id);
    displayWishlist();
    window.location.replace("../../checkOut/Template/checkOut.html")

})