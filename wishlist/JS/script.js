import { Order } from "../../models/order.js";

// Get products list from localStorage
// (Assumes products were already saved there earlier)
let products = JSON.parse(localStorage.getItem('products'));
let subtotal;

// Run when page loads → display wishlist
$(document).ready(function () {
    // addToWishlist(3) // For testing only
    displayWishlist();
});


// ======================================================
// Render wishlist items on the page
// ======================================================
function displayWishlist() {

    // Get wishlist from localStorage or default to empty array
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Clear current wishlist UI
    $('.wishlist-items').empty();

    // If wishlist empty → show empty message
    if (wishlist.length === 0) {
        $('main .container').empty().append(`
            <div class="text-center h3 my-5">
                <span>Your wishlist is empty</span> 
                <a href="../../productList/Template/product_list.html" class="text-secondary">
                    Return to store
                </a>
            </div>`);
        return;
    }

    // Loop through wishlist items
    wishlist.map(item => {

        // Find full product data using stored product_id
        let product = products.find(p => p._id == item.product_id);

        // Append product card to wishlist UI
        $('.wishlist-items').append(`
            <div id="${product._id}" class="cards col-6 col-md-4 col-lg-3">

                <div class="card border-0 mb-4">

                    <!-- Product image section -->
                    <div class="card-image position-relative">

                        <!-- Show discount badge if exists -->
                        ${product._discountPercentage ? `
                            <div class="discount-per badge position-absolute top-0 end-0 text-white px-3 py-2 mt-2 me-2 rounded-5" style="background-color: #e30514;">
                                ${product._discountPercentage}%
                            </div>` : ``}

                        <img src="${product._imageUrl}" class="card-img-top img-1" alt="${product._name}">

                        <!-- Action icons -->
                        <div class="icons">
                            <!-- Remove from wishlist -->
                            <i class="fa-solid fa-heart remove" data-id=${product._id}></i>

                            <!-- Add to cart -->
                            <i class="fa-solid fa-shopping-bag add-to-cart" data-id=${product._id}></i>

                            <!-- Quick view modal trigger -->
                            <i class="fa-regular fa-eye"
                               data-id=${product._id}
                               data-bs-toggle="modal"
                               data-bs-target="#quikViewModal"></i>
                        </div>
                    </div>

                    <!-- Product info -->
                    <div class="card-body ps-0 fw-bold">

                        <p class="card-title fw-bold">${product._name}</p>

                        <!-- Show discounted price if exists -->
                        ${product?._discountPercentage
                            ? `<p class="card-text price fw-bold m-1">
                                   $${product._price - (product._price * product._discountPercentage / 100)}
                                   <span class="fw-normal text-decoration-line-through">$${product._price}</span>
                               </p>`
                            : `<p class="card-text price fw-bold m-1">$${product._price}</p>`}

                        <!-- Rating + reviews -->
                        <div class="d-block d-md-flex align-items-center">

                            <!-- Star rating -->
                            <div>${renderStars(product._rating)}</div>

                            <!-- Reviews count -->
                            ${
                                product.Reviews
                                ? `<span class="text-secondary fw-semibold ms-0 ms-md-3">
                                        ${product.Reviews.length} review
                                   </span>`
                                : `<span class="text-secondary fw-semibold ms-0 ms-md-3">
                                        no reviews
                                   </span>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}


// ======================================================
// Render star icons based on rating value
// Supports full star, half star, empty star
// ======================================================
function renderStars(rating) {

    let starsHTML = '';

    for (let i = 1; i <= 5; i++) {

        // Full star
        if (i <= Math.floor(rating)) {
            starsHTML += `<i class="fa-solid fa-star text-warning"></i>`;
            console.log(rating);
            
        }
        // Half star
        else if (i - rating < 1) {
            console.log(rating);
            
            starsHTML += `<i class="fa-solid fa-star-half-stroke text-warning"></i>`;
        }
        // Empty star
        else {
            console.log(rating);
            
            starsHTML += `<i class="fa-regular fa-star text-warning"></i>`;
        }
    }

    return starsHTML;
}


// ======================================================
// Remove product from wishlist in localStorage
// ======================================================
function removeFromWishlist(product_id) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Filter out the removed product
    wishlist = wishlist.filter(item => item.product_id != product_id);

    // Save updated wishlist
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}


// ======================================================
// Click handler → remove item from wishlist
// ======================================================
$(document).on("click", ".remove", function () {

    const id = Number($(this).data("id"));

    removeFromWishlist(id);
    displayWishlist();
});


// ======================================================
// Retrieve cart from localStorage or initialize empty array
// ======================================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// ======================================================
// Click handler → move item from wishlist to cart
// ======================================================
$(document).on("click", ".add-to-cart", function () {

    const id = Number($(this).data("id"));

    addToCart(id);        // Add item to cart
    removeFromWishlist(id); // Remove it from wishlist
    displayWishlist();      // Refresh UI
});