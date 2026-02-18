$(function(){
    $(".shopnow").click(function(){
        window.location.href = "/productList/Template/product_list.html"
    });

    
});
// --- Event Listener 1: Add to Cart ---
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".btn-warning");

    addToCartButtons.forEach(function (button) {
        // We check the text to make sure we hit the right button
        if (button.textContent.trim().toLowerCase() === "add to cart") {
            button.addEventListener("click", function() {
                redirectToCart();
            });
        }
    });
});

function redirectToCart() {
    console.log("Navigating to Cart...");
    window.location.href = "cart/Template/cart.html";
}