import { loadProducts } from "../../component/Product.js";

//Load products from localStorage
let products = loadProducts() || [];

//Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id")); // assumes URL is like ?id=1

let product = null;

if (productId && products.length > 0) {
    product = products.find(p => p.ID === productId);
}

if (!productId) {
    console.log("No product ID found in URL");
} else if (products.length === 0) {
    console.log("No products found in localStorage");
} else {
    
    if (!product) {
        console.log("Product not found");
    } else {
        //Fill in the main info
        document.getElementById("name").textContent = product.Name;
        document.getElementById("productPrice").textContent = `€${product.Price.toFixed(2)}`;
        document.getElementById("productStock").innerHTML = `<strong>Availability:</strong> <span class="text-success">● ${product.Stock} in stock</span>`;
        document.getElementById("productDescription").textContent = product.Description;
        document.getElementById("productSKU").textContent = product.ID;

        //Fill in the carousel images
        const carouselImages = document.querySelectorAll("#carouselVeg img");
        carouselImages.forEach((img) => {
            img.src = product.ImageUrl; // All slides show the same image
        });

        //Fill in the thumbnail images
        const thumbImages = document.querySelectorAll(".d-flex.justify-content-evenly img");
        thumbImages.forEach((img) => {
            img.src = product.ImageUrl;
        });

        //Fill in rating stars
        const starsContainer = document.querySelector(".text-warning");
        if (starsContainer) {
            let fullStars = Math.floor(product.Rating);
            let starsHtml = "";
            for (let i = 0; i < 5; i++) {
                starsHtml += i < fullStars ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
            }
            starsContainer.innerHTML = starsHtml + ` <span class="text-muted ms-2">${product.Reviews.length} reviews</span>`;
        }

        //Fill in discount info
        const priceContainer = document.getElementById("productPrice");
        if (product.DiscountPercentage > 0) {
            priceContainer.nextElementSibling.textContent = `€${(product.Price + product.DiscountValue).toFixed(2)}`;
            const badge = priceContainer.nextElementSibling.nextElementSibling;
            badge.textContent = `${product.DiscountPercentage}%`;
        }
    }
}

// Wishlist link
$(document).ready(function () {
    $('.bi-heart').on('click', function(e) {
        e.preventDefault();

        if (product) {
            addToWishlist(product.ID);
            window.location.href = "../../wishlist/Template/wishlist.html";
        }
    });
});


// Add to cart link
$(document).ready(function () {
    $('#addToCart').on('click', function(e) {
        e.preventDefault();

        if (product) {
            addToCart(product.ID);
            window.location.href = "../../cart/Template/cart.html";
        }
    });
});

// Buy it now link
$(document).ready(function () {
    $('#addToCart').on('click', function(e) {
        e.preventDefault();

        if (product) {
            addToCart(product.ID);
            window.location.href = "../../cart/Template/cart.html";
        }
    });
});