$(document).ready(function() {
    // --- 1. Quantity Plus/Minus Logic ---
    $('#button-plus').on('click', function() {
        let qty = parseInt($('#quantity-input').val());
        $('#quantity-input').val(qty + 1);
    });

    $('#button-minus').on('click', function() {
        let qty = parseInt($('#quantity-input').val());
        if (qty > 1) {
            $('#quantity-input').val(qty - 1);
        }
    });

    // --- 2. Button Redirects ---
    
    // Add to Cart button
    $('.btn-warning').on('click', function() {
        if ($(this).text().trim() === "Add to cart") {
            window.location.href = "../../cart/Template/cart.html";
        }
    });

    // Buy it Now button
    $('.btn-dark').on('click', function() {
        if ($(this).text().trim() === "Buy it now") {
            window.location.href = "../../checkOut/Template/checkOut.html";
        }
    });

    // Wishlist Link
    $('.bi-heart').closest('a').on('click', function(e) {
        e.preventDefault();
        window.location.href = "../../wishlist/Template/wishlist.html";
    });
});

$(document).ready(function() {

    // --- Heart Icon: Wishlist ---
    $('.fa-heart').closest('.icon').on('click', function() {
        console.log("jQuery: Redirecting to Wishlist...");
        window.location.href = "../../wishlist/Template/wishlist.html";
    });

    // --- Shopping Bag Icon: Cart ---
    $('.fa-shopping-bag').closest('.icon').on('click', function() {
        console.log("jQuery: Redirecting to Cart...");
        window.location.href = "../../cart/Template/cart.html";
    });

    // --- Eye Icon: Product Details PopUp ---
    $('.fa-eye').closest('.icon').on('click', function() {
        console.log("jQuery: Redirecting to Product Details...");
        window.location.href = "../../productDetials/Template/ProductPopUp.html";
    });

});