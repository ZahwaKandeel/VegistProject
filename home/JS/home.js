$(function(){
    $(".shopnow").click(function(){
        window.location.href = "/productList/Template/product_list.html"
    });    
});
document.addEventListener("DOMContentLoaded", function(){
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const carouselInner = document.getElementById("carouselInner");

    
    function getProductsPerSlide(){
        const width = window.innerWidth;
        if(width>=992){
            return 8;
        }
        else if(width>=768){
            return 6;
        }
        else{
            return 4;
        }        
    }
    const productsPerSlide = getProductsPerSlide();
    let slideIndex = 0;
    for(let i = 0; i<products.length; i+= productsPerSlide){
        const slideProducts =  products.slice(i,i+productsPerSlide);
        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item";
        if(slideIndex === 0) carouselItem.classList.add("active");
        const row = document.createElement("div");
        row.className = "row g-3";

        slideProducts.forEach(product =>{
            row.innerHTML += createProductCard(product);
        });

        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);

        slideIndex++;
    }
});

function createProductCard(product){
    const ratingStars = generateStars(product._rating);
    return`
        <div id="${product._id}" class="cards col-6 col-md-4 col-lg-3 position-relative">
            <div class="position-relative">
                <img src="${product._imageUrl}"
                    class="img-fluid w-100 main-img"/>
                <img src="${product._imageUrl}"
                    class="img-fluid w-100 hover-img position-absolute top-0 start-0"/>    
            </div>
            <div class="icons position-absolute start-50 translate-middle-x d-flex gap-2">
                <span class="icon p-2">
                    <i class="fa-regular fa-heart wishlist-icon" data-id="${product._id}"></i>
                </span>
                <span class="icon p-2">
                    <i class="fa fa-shopping-bag cart-icon" data-id="${product._id}"></i>
                </span>
                <span class="icon p-2"
                    data-bs-toggle="modal"
                    data-bs-target="#quickViewModal"
                    style="cursor: pointer;">
                    <i class="fa fa-eye view-icon" data-id="${product._id}"></i>
                </span>
            </div>
            <div>
                <p>
                    <a href="/productDetails/productDetails.html?id=${product._id}"
                        class="para text-decoration-none">
                        ${product._name}
                    </a>
                </p>
                <p class="fw-bold">€${product._price.toFixed(2)}</p>
                <div class="d-flex align-items-center">
                    <div class="text-warning me-2 rating">
                        ${ratingStars}
                    </div>
                    <span class="text-muted ratingspa">
                        ${product._rating.toFixed(1)}/5
                    </span>
                </div>
            </div>
        </div>
    `
}
function generateStars(rating){
    let stars ="";
    for (let i = 1; i<=5; i++){
        if(i<=Math.floor(rating)){
            stars += `<i class="fa fa-star"></i>`;
        }else{
            stars += `<i class="fa-regular fa-star"></i>`
        }
    }
    return stars;
}

$(document).ready(function(){
    $(document).on("click", ".wishlist-icon", function(){
        const productId = parseInt($(this).data("id"));
        addToWishlist(productId);
        alert("Added to wishlist");
    });
    $(document).on("click", ".cart-icon", function(){
        const productId = parseInt($(this).data("id"));
        addToCart(productId,1);
        alert("Added to cart");
    });
    $(document).on("click", "view-icon", function(){
        const productId = parseInt($(this).data("id"));
        openQuickView(productId);
    });
});


// --- Event Listener 1: Add to Cart ---
// document.addEventListener("DOMContentLoaded", function () {
//     const addToCartButtons = document.querySelectorAll(".btn-warning");

//     addToCartButtons.forEach(function (button) {
//         // We check the text to make sure we hit the right button
//         if (button.textContent.trim().toLowerCase() === "add to cart") {
//             button.addEventListener("click", function() {
//                 redirectToCart();
//             });
//         }
//     });
// });

// function redirectToCart() {
//     console.log("Navigating to Cart...");
//     window.location.href = "cart/Template/cart.html";
// }