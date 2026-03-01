$(function(){
    $(".shopnow").click(function(){
        window.location.href = "/productList/Template/product_list.html"
    });    
});

const products = JSON.parse(localStorage.getItem("products")) || [];
const carouselInner = document.getElementById("carouselInner");
document.addEventListener("DOMContentLoaded", function(){

    
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
    loadCustomerReviews();
});

function createProductCard(products){
    const ratingStars = generateStars(products._rating);
    return`
        <div id="${products._id}" class="cards col-6 col-md-4 col-lg-3 position-relative">
            <div class="position-relative">
                <img src="${products._imageUrl}"
                    class="img-fluid w-100 main-img"/>
                <img src="${products._imageUrl}"
                    class="img-fluid w-100 hover-img position-absolute top-0 start-0"/>    
            </div>
            <div class="icons position-absolute start-50 translate-middle-x d-flex gap-2">
                <span class="" id="iconbtns">
                    <i class="fa-regular fa-heart wishlist-icon" data-id="${products._id}"></i>
                </span>
                <span class="" id="iconbtns">
                    <i class="fa fa-shopping-bag cart-icon" data-id="${products._id}"></i>
                </span>
                <span class="" id="iconbtns"
                    data-bs-toggle="modal"
                    data-bs-target="#quickViewModal"
                    style="cursor: pointer;">
                    <i class="fa fa-eye view-icon" data-id="${products._id}"></i>
                </span>
            </div>
            <div>
                <p>
                    <a href="/productDetails/productDetails.html?id=${products._id}"
                        class="para text-decoration-none">
                        ${products._name}
                    </a>
                </p>
                <p class="fw-bold">€${products._price.toFixed(2)}</p>
                <div class="d-flex align-items-center">
                    <div class="text-warning me-2 rating">
                        ${ratingStars}
                    </div>
                    <span class="text-muted ratingspa">
                        ${products._rating.toFixed(1)}/5
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
    $(document).on("click", ".view-icon", function(){
        const productId = parseInt($(this).data("id"));
        openQuickView(productId);
    });
    $(document).on("click", ".cards", function(e){
        if($(e.target).closest(".icon").length) return;
        const productId = $(this).attr("id");
        window.location.href = `/productDetials/Template/productDetails.html?id=${productId}`;
    })
});

function loadCustomerReviews(){
    const carouselInner = document.querySelector("#customersCarousel .carousel-inner");
    if(!carouselInner) return;

    let allReviews = [];
    products.forEach(product =>{
        if (Array.isArray(product._reviews)){
            product._reviews.forEach(review =>{ 
                allReviews.push({
                    title: review.title,
                    comment: review.comment,
                    rating: review.rating,
                    uid: review.uid
                });
            });
        }
    });
    
    if (allReviews.length === 0){
        carouselInner.innerHTML= `
            <div class = "carousel-item active">
                <div class="d-flex justify-content-center">
                    <p class = "text-muted"> No Reviews yet.</p>
                </div>
            </div>
        `;
        return;
    }

    const reviewsPerSlide = 2;
    let slideIndex = 0;

    for(let i=0; i<allReviews.length; i+=reviewsPerSlide){
        const slideReviews = allReviews.slice(i, i + reviewsPerSlide);
        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item";
        if(slideIndex === 0) carouselItem.classList.add("active");

        const wrapper = document.createElement("div");
        wrapper.className = "d-flex justify-content-center gap-4 align-items-stretch";

        slideReviews.forEach((review, index) => {
            const reviewCard = document.createElement("div");
            reviewCard.className = "customer-card card text-center p-4 bg-transparent" 
            + (index === 1 ? " d-none d-md-block" : "");

            reviewCard.innerHTML = `
                <h5 class="fw-bold">"${review.title}"</h5>
                <p class="mb-3">"${review.comment}"</p>
                <small class="fw-bold">By ${review.uid}</small>
                <p class="stars">${generateStars(review.rating)}</p>
            `;
            wrapper.appendChild(reviewCard);
        });
        carouselItem.appendChild(wrapper);
        carouselInner.appendChild(carouselItem);

        slideIndex++;
    }
}