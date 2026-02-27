import { Product, loadProducts, saveProducts } from "../../component/Product.js"; 
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

    document.getElementById("table-productsize").textContent = product.Sizes.join(" - ");

    document.getElementById("moreDetail").textContent = product.Description;
    document.getElementById("table-productCategory").textContent = product.Category;
    document.getElementById("table-productSKU").textContent = product.ID;

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

    
window.initializeEditProduct = function(productId){    
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    
    if(!currentUser || currentUser.role !== "seller"){
        alert("Only Sellers can create products");
        }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => Number(p.ID) === Number(id));   

    if(!product){
            alert("Product not found");
            return;
        }

        //const sellerId = currentUser.id;
        //const params = new URLSearchParams(window.location.search);
        //const productId = parseInt(params.get("id"));
    
    $("#updateName").val(product.Name);
    $("#updatePrice").val(product.Price);
    $("#updateDescription").val(product.Description);
    $("#updateStock").val(product.Stock);
    $("#category").val(product.Category);
    $("#updateImage").val(product.ImageUrl);
    product.Sizes.forEach(size =>{
            $(`.size-option[value="${size}"]`).prop("checked", true);
    });
    $("#discountPercentage").val(product.DiscountPercentage);
        
    const allowedCategories = [
        "bagel", "candy", "beans", "bestseller", "bread", "biscuite", "breakfast", "cake", "cookie", "cupcake", "Dairy&Cheese", "Dinner"
    ]; 
        
    $("#editProductForm").off("submit").on("submit", function(e){
        e.preventDefault();
        let isValid = true;

        $(".form-control").removeClass("is-invalid");
        $(".invalid-feedback").remove();

        let name = $("#updateName").val().trim();
        let price = parseFloat($("#updatePrice").val());
        let description = $("#updateDescription").val().trim();
        let stock = parseInt($("#updateStock").val());
        let category = $("#category").val().trim();
        let image = $("#updateImage").val().trim();

        let sizes = $(".size-option:checked").map(function(){
            return parseInt($(this).val(),10);
        }).get();

        let discountPercentage = parseInt($("#discountPercentage").val());

        if (name.length<3){
            showError("#updateName", "Name must be at least 3 characters");
            isValid = false;
        }
        if (isNaN(price) || price<=0){
            showError("#updatePrice", "Price must be a number greater than 0");
            isValid = false;
        }
        if (description.length < 100 || description.length > 200){
            showError("#updateDescription", "Description must be at least 100 characters and less than 200");
            isValid = false;
        }
        if (isNaN(stock) || stock<=0){
            showError("#updateStock", "Stock must be a number greater than 0");
            isValid = false;
        }
        if (!allowedCategories.includes(category)){
            showError("#category", "Invalid Category, allowed categories: bagel, candy, beans, bestseller, bread, biscuite, breakfast, cake, cookie, cupcake, Dairy&Cheese, Dinner");
            isValid = false;
        }
        if (!isValidURL(image)) {
            showError("#updateImage", "Enter a valid image URL.");
            isValid = false;
        }
        if (sizes.length === 0) {
            $("#sizesError").html('<div class="text-danger mt-2">Please select at least one size</div>');
            isValid = false;
        } else {
            $("#sizesError").html("");
        }
        if(isNaN(discountPercentage) || discountPercentage<0 || discountPercentage>100){
            showError("#discountPercentage","Discount Percentage must be a number between 0 and 100");
            isValid = false;
        }
        if (!isValid) return;

        product.Name = name;
        product.Price = price;
        product.Description = description;
        product.Stock = parseInt($("#updateStock").val());
        product.Category = category;
        product.ImageUrl = image;
        product.Sizes = sizes;
        product.DiscountPercentage = discountPercentage;

        saveProducts(products);

        alert("Product updated successfully");
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("editProductModal")
        )
        modal.hide();
        location.reload();
    });
        
    function showError(selector, message){
        $(selector).addClass("is-invalid");
        $(selector).after(`<div class="invalid-feedback">${message}</div>`);
    }
    function isValidURL(url){
        try {new URL(url); return true;}
        catch {return false;}
    }
};
