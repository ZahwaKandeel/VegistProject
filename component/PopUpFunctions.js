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
            let quantity = parseInt($('#quantityValue').val());
            addToCart(product.ID, quantity);
            window.location.href = "../../cart/Template/cart.html";
});

