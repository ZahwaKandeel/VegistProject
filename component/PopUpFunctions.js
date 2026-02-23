document.addEventListener("DOMContentLoaded", function () {
    fetch("/component/quickViewModal.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("#quickViewModal").innerHTML = data;

            const carouselElement = document.getElementById("carouselPopup");

            if (carouselElement) {
                new bootstrap.Carousel(carouselElement, {
                    interval: false,
                    wrap: true
                });
            }
        });
});

$(document).on('click', '.fa-heart', function () {
    window.location.href = "../../wishlist/Template/wishlist.html";
});

$(document).on('click', '.fa-shopping-bag', function () {

});

// PLUS BUTTON
$(document).on('click', '.qty-plus', function () {
        
    let input = $(this).siblings('.qty-input');
    let value = parseInt(input.val());

    input.val(value + 1);
    calculateSubTotal(input)
});

// MINUS BUTTON
$(document).on('click', '.qty-minus', function () {

    let input = $(this).siblings('.qty-input');
    let value = parseInt(input.val());

    if (value > 1) {
        input.val(value - 1);
    }
     calculateSubTotal(input)
});

// Add to cart (send product id to the cart)
$(document).ready(function () {
    $('#addToCart').on('click', function(e) {
        e.preventDefault();

        if (product) {
            let quantity = parseInt($('#quantityValue').val());
            addToCart(product.ID, quantity);
            window.location.href = "../../cart/Template/cart.html";
        }
    });
});