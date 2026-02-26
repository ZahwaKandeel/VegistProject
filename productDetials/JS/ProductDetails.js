import { loadProducts } from "../../component/Product.js"; 
import { Order } from "/models/order.js";

// Load products from localStorage
let products = loadProducts() || [];

// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id")); // URL like ?id=1

let product = null;
if (productId && products.length > 0) {
    product = products.find(p => p.ID === productId);
}

if (!productId) {
    console.log("No product ID found in URL");
} else if (products.length === 0) {
    console.log("No products found in localStorage");
} else if (!product) {
    console.log("Product not found");
} else {
    // Fill main product info
    document.getElementById("name").textContent = product.Name;
    document.getElementById("productPrice").textContent = `€${product.Price.toFixed(2)}`;
    document.getElementById("productStock").innerHTML = `<strong>Availability:</strong> <span class="text-success">● ${product.Stock} in stock</span>`;
    document.getElementById("productDescription").textContent = product.Description;
    document.getElementById("productSKU").textContent = product.ID;
    document.getElementById("category").textContent = product.Category;

    // Carousel images
    const carouselImages = document.querySelectorAll("#carouselVeg img");
    carouselImages.forEach(img => img.src = product.ImageUrl);

    // Thumbnail images
    const thumbImages = document.querySelectorAll(".d-flex.justify-content-evenly img");
    thumbImages.forEach(img => img.src = product.ImageUrl);

    // Discount info
    const priceContainer = document.getElementById("productPrice");
    if (product.DiscountPercentage > 0) {
        priceContainer.nextElementSibling.textContent = `€${(product.Price + product.DiscountValue).toFixed(2)}`;
        const badge = priceContainer.nextElementSibling.nextElementSibling;
        badge.textContent = `${product.DiscountPercentage}%`;
    }
}

// Wishlist
$(document).ready(function () {
    $('.bi-heart').on('click', function(e) {
        e.preventDefault();
        if (product) {
            addToWishlist(product.ID);
            window.location.href = "../../wishlist/Template/wishlist.html";
        }
    });
});

// Quantity
let value = parseInt($('#quantityValue').val());

$(document).on('click', '.qty-plus', function () {
    value++;
    $('.qty-input').val(value);  
    calculateSubTotal();
});

$(document).on('click', '.qty-minus', function () {
    if (value > 1) value--;
    $('.qty-input').val(value);
    calculateSubTotal();
});

// Add to Cart
$(document).ready(function () {
    $('#addToCart').on('click', function(e) {
        e.preventDefault();
        if (product) {
            let quantity = parseInt($('#quantityValue').val());
            let selectedSize = $('input[name="size_choice"]:checked').val();
            addToCart(product.ID, quantity, selectedSize);
            window.location.href = "../../cart/Template/cart.html";
        }
    });
});

// Remove product (Seller page)
$(document).ready(function () {
    $('#removeProduct1').on('click', function(e) {
        e.preventDefault();
        if (product) {
            deleteProductById(product.ID);
            window.location.href = "../../seller/Template/sellerdash.html";
        }
    });
});

// Subtotal
let total;
function calculateSubTotal(){
    total = product.Price * value;
    return total;
}

// Buy it now
function buyItNow(){
    let currentOrder = new Order({
        id: Date.now(),
        sellerId: 1,
        cart: [{ product_id: productId, quantity: value }],
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

    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
    console.log(currentOrder);
}

$(document).ready(function () {
    $('#buyItNow').on('click', function() {
        buyItNow();
        window.location.href = "../../checkOut/Template/checkOut.html";
    });
});

// Sizes
$('.sizediv').empty();
product.Sizes.forEach((item, index) => {
    let sizeId = `size_${index}`;
    $('.sizediv').append(`
        <input type="radio" class="btn-check" name="size_choice" id="${sizeId}" value="${item}" ${index === 0 ? "checked" : ""} autocomplete="off">
        <label class="btn btn-outline-warning rounded-pill px-4 me-2" for="${sizeId}">${item}KG</label>
    `);
});

// Related products
function loadRelatedProducts() {
    if (!product || products.length === 0) return;

    let related = products.filter(p => p.ID !== product.ID);
    let cards = $(".cards");

    cards.each(function (index) {
        if (index < related.length) {
            let p = related[index];
            $(this).attr("data-id", p.ID).show();
            $(this).find(".main-img").attr("src", p.ImageUrl);
            $(this).find(".para").text(p.Name).attr("href", `productDetails.html?id=${p.ID}`);
            $(this).find(".fw-bold").text(`€${p.Price}`);
        } else {
            $(this).hide();
        }
    });
}

loadRelatedProducts();

// Wishlist from popup
$(document).on('click', '.fa-heart', function () {
    const cardId = parseInt($(this).closest(".cards").attr("id"));
    const product = products.find(p => p.ID === cardId);
    if (!product) return;
    addToWishlist(product.ID);
});

// Shopping bag icon from popup
$(document).on('click', '.fa-shopping-bag', function () {
    const cardId = parseInt($(this).closest(".cards").attr("id"));
    const product = products.find(p => p.ID === cardId);
    if (!product) return;
    // Replace quantity & size with defaults if needed
    addToCart(product.ID, 1, product.Sizes[0]);
});