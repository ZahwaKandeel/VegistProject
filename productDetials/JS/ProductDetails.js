$(document).ready(function () {

    // PLUS BUTTON
    $(document).on('click', '.qty-plus', function () {
        
        let input = $(this).siblings('.qty-input');
        let value = parseInt(input.val());

        input.val(value + 1);
    });


    // MINUS BUTTON
    $(document).on('click', '.qty-minus', function () {

        let input = $(this).siblings('.qty-input');
        let value = parseInt(input.val());

        if (value > 1) {
            input.val(value - 1);
        }
    });

    // Add to Cart
    $(document).on('click', '.btn-warning', function () {
        if ($(this).text().trim() === "Add to cart") {
            window.location.href = "../../cart/Template/cart.html";
        }
    });

    // Buy Now
    $(document).on('click', '.btn-dark', function () {
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