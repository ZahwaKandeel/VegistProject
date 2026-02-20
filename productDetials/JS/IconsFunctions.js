$(document).on('click', '.fa-heart', function () {
    window.location.href = "../../wishlist/Template/wishlist.html";
});

$(document).on('click', '.fa-shopping-bag', function () {
    window.location.href = "../../cart/Template/cart.html";
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("quickViewModal.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("modalContainer").innerHTML = data;

            const modal = document.getElementById('quickViewModal');

            modal.addEventListener('shown.bs.modal', function () {
                const carousel = document.querySelector('#carouselVeg');
                if (carousel) {
                    new bootstrap.Carousel(carousel);
                }
            });
        });
});