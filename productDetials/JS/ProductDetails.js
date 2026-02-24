import { loadProducts } from "../../component/Product.js";
import { dummyProducts } from "../../seller/JS/dummyproducts.js";
import { Order } from "/models/order.js"

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
        document.getElementById("category").textContent = product.Category;
        //document.getElementById("productReviews").textContent = product.Reviews;
        //document.getElementById("discount").textContent = product.DiscountPercentage;

        //Fill in the carousel images
        const carouselImages = document.querySelectorAll("#carouselVeg img");
        carouselImages.forEach((img) => {
            img.src = product.ImageUrl; // All slides show the same image as its one img 
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

// Wishlist link (send product id to the wishlist)
$(document).ready(function () {
    $('.bi-heart').on('click', function(e) {
        e.preventDefault();

        if (product) {
            addToWishlist(product.ID);
            window.location.href = "../../wishlist/Template/wishlist.html";
        }
    });
});

let value = parseInt($('#quantityValue').val());
// PLUS BUTTON
$(document).on('click', '.qty-plus', function () {
    value++
    $('.qty-input').val(value);  
    calculateSubTotal()
});

// MINUS BUTTON
$(document).on('click', '.qty-minus', function () {
    if (value > 1) {
        value --;
    }
    $('.qty-input').val(value);
    calculateSubTotal()
});

// Add to cart (send product id to the cart)
$(document).ready(function () {
    $('#addToCart').on('click', function(e) {
    e.preventDefault();

    if (product) {
        let quantity = parseInt($('#quantityValue').val());
        let selectedSize = $('input[name="size_choice"]:checked').val();

        addToCart(product.ID,quantity,Sizes);
        window.location.href = "../../cart/Template/cart.html";
    }
    });
});

//In seller page ( remove function)
$(document).ready(function () {
    $('#removeProduct1').on('click', function(e) {
        e.preventDefault();

        if (product) {
            deleteProductById(product.ID);
            window.location.href = "../../seller/Template/sellerdash.html";
        }
    });
});

//Calculate subTotal
let total;

function calculateSubTotal(){
    total = product.Price * value;
    return total;
}

//send product id and cart needed data for checkout
function buyItNow(){
    let currentOrder = new Order({
            id: Date.now(),
            sellerId: 1,
            cart: [{product_id:productId,
                quantity:value
            }],
            createdAt: new Date(),
            shipping: {
                fristName: "",
                lastName: "",
                phone: "",
                country:  "",
                fullAddress: "",
                appartment: "",
                postalCode: "",
                City: "",
                shipping_fees: null
            },
            subtotal: total,
            discount_code:  "",
            special_instructions: ""
        });

    localStorage.setItem("currentOrder",JSON.stringify(currentOrder));
    console.log(currentOrder);
    
}
$(document).ready(function () {
    $('#buyItNow').on('click', function() {
        buyItNow();
        window.location.href = "../../checkOut/Template/checkOut.html";
    });
});

//Fetch size of product
// Clear old sizes first
$('.sizediv').empty();

//Generate sizes dynamically
product.Sizes.map((item, index) => {

    let sizeId = `size_${index}`; // unique id for each size

    $('.sizediv').append(`
        <input 
            type="radio" 
            class="btn-check" 
            name="size_choice" 
            id="${sizeId}" 
            value="${item}"
            ${index === 0 ? "checked" : ""}
            autocomplete="off">

        <label 
            class="btn btn-outline-warning rounded-pill px-4 me-2"
            for="${sizeId}">
            ${item}KG
        </label>
    `);
});

function loadRelatedProducts() {
    if (!product || products.length === 0) return;

    let related = products.filter(p => p.ID !== product.ID);
    let cards = $(".cards");

    cards.each(function (index) {
        if (index < related.length) {
            let p = related[index];

            // Assign the unique ID to the card
            $(this).attr("data-id", p.ID).show(); 
            $(this).find(".main-img").attr("src", p.ImageUrl);
            $(this).find(".para").text(p.Name).attr("href", `productDetails.html?id=${p.ID}`);
            $(this).find(".fw-bold").text(`€${p.Price.toFixed(2)}`);
        } else {
            $(this).hide();
        }
    });
}


$(document).on("click", ".fa-eye", function() {
    // 1. Get the ID from the card that was clicked
    let productId = $(this).closest(".cards").attr("data-id");

    // 2. Find the product object in your 'products' array
    let item = products.find(p => p.ID == productId);

    if (item) {
        // 3. Inject data into your QuickViewModal IDs
        $("#modal-productImage").attr("src", item.ImageUrl);
        $("#modal-name").text(item.Name);
        $("#modal-productPrice").text(`€${item.Price}`);
        $("#modal-productStock").text(item.Stock);
        $("#modal-discount").text(item.DiscountPercentage);
        $("#modal-category").text(item.Category);

        // If you have a description or category in your data:
        $("#modal-productDescription").text(item.Description || "No description available.");
        
        // Update the 'View Details' button link
        $(".view-details-btn").attr("href", `productDetails.html?id=${item.ID}`);
    }
});