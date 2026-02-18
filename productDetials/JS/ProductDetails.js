// when add to cart button clicked it goes to add to cart page
// document.addEventListener("DOMContentLoaded", function () {

//     const warningButtons = document.querySelectorAll(".btn-warning");

//     warningButtons.forEach(function (button) {

//         if (button.textContent.trim() === "Add to cart") {
//             button.addEventListener("click", function () {
//                 window.location.href = "cart/Template/cart.html";
//             });
//         }
//     });
// });



// when buy it now button clicked it goes to check out page
document.addEventListener("DOMContentLoaded", function () {

    const buyItNowBtn = document.querySelector(".btn-dark");

    if (buyItNowBtn) {
        buyItNowBtn.addEventListener("click", function () {
            window.location.href = "VegistProject/checkOut/Template/checkOut.html";
        });
    }

});
