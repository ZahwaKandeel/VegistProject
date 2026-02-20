$(document).ready(function () {
    // Wishlist Link
    $('.bi-heart').closest('a').on('click', function(e) {
        e.preventDefault();
        window.location.href = "../../wishlist/Template/wishlist.html";
    });
});