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

$(document).on('click', '.fa-heart', function () {
    window.location.href = "../../wishlist/Template/wishlist.html";
});

$(document).on('click', '.fa-shopping-bag', function () {
    window.location.href = "../../cart/Template/cart.html";
});

$(document).ready(function () {

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

});