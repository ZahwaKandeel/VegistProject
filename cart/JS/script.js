// Import Order model
import { Order } from '../../models/order.js';

// Available discount coupons list
const coupons = [
    { code: "SAVE10", value: 10 },
    { code: "SAVE20", value: 20 },
    { code: "SAVE30", value: 30 },
    { code: "SAVE40", value: 40 },
    { code: "SAVE50", value: 50 },
];

// Track currently applied coupon and special instructions
let appliedCoupon = null;
let special_instructions;

$(document).ready(function () {

    // ================================
    // Load countries from external API
    // ================================
    $.ajax({
        url: "https://countriesnow.space/api/v0.1/countries",
        method: "GET",
        success: function (response) {
            let countries = response.data;
            let countrySelect = $('#countries');

            // Default option
            countrySelect.append('<option value="">Select Country</option>');

            // Populate dropdown
            countries.forEach(function (country) {
                countrySelect.append(
                    $('<option></option>')
                        .text(country.country)
                        .val(country.country)
                );
            });
        }
    });

    // ================================
    // When country changes → load cities
    // ================================
    $('#countries').change(function () {
        let selectedCountry = $(this).val();
        if (!selectedCountry) return;

        $.ajax({
            url: "https://countriesnow.space/api/v0.1/countries/cities",
            method: "POST",
            data: JSON.stringify({ country: selectedCountry }),
            contentType: "application/json",
            success: function (response) {
                let cities = response.data;
                let citySelect = $('#cities');

                citySelect.empty();
                citySelect.append('<option value="">Select City</option>');

                // Populate city dropdown
                cities.forEach(function (city) {
                    citySelect.append(
                        $('<option></option>')
                            .text(city)
                            .val(city)
                    );
                });

                // Show city select container
                citySelect.parent().removeClass('d-none');
            }
        });
    });

    // ================================
    // Calculate shipping rate UI message
    // ================================
    $('#calc-shipping-btn').click(function () {
        let selectedCountry = $('#countries').val();
        let selectedCity = $('#cities').val();
        let zipCode = $('#zip-code').val();

        if (selectedCountry && selectedCity && zipCode) {
            $('.shipping-rate').empty()
                .append(`<p>There is one shipping rate available for ${zipCode}, ${selectedCity}, ${selectedCity}.</p> <p>Standard at €14,00 EUR</p>`);

            $('.shipping-rate p:first').addClass('text-success');
            $('.shipping-rate p:last').addClass('text-secondary');
        } else {
            $('.shipping-rate').empty()
                .append(`<p>You should select a country, city, and enter a zip code to calculate shipping.</p>`);

            $('.shipping-rate > p').addClass('text-danger fw-bold');
        }
    });

    // Render cart items on page load
    displayCart();
});


// ======================================================
// Render cart items from localStorage into the checkout UI
// ======================================================
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];

    $('.cart-items').empty();

    // If cart empty → show message
    if (cart.length === 0) {
        $('main .container-fluide').empty().append(`
            <div class="text-center h3 my-5">
                <span>Your cart is empty</span> 
                <a href="../../productList/Template/product_list.html" class="text-secondary">Return to store</a>
            </div>`);
        return;
    }

    // Loop through each cart item and render it
    cart.map(item => {
        const product = products.find(p => p._id == item.product_id);

        $('.cart-items').append(`
            <div class="row align-items-center border-bottom p-2 mb-3">

                <!-- Product information -->
                <div class="col-12 col-md-6">
                    <div class="card mb-3 bg-transparent border-0">
                        <div class="row g-0 ">
                            <div class="col-4">
                                <img src="${product?._imageUrl}" class="img-fluid" alt="${product?._name}" />
                            </div>
                            <div class="col-8">
                                <div class="card-body p-2">
                                    <h5 class="card-title mb-1">${product?._name}</h5>

                                    <!-- Show discounted price if exists -->
                                    ${product?._discountPercentage
                                        ? `<p class="card-text price fw-bold m-1">
                                            $${product?._price - (product?._price * product._discountPercentage / 100)}
                                            <span class="fw-normal text-decoration-line-through">$${product?._price}</span>
                                           </p>`
                                        : `<p class="card-text price fw-bold m-1">$${product?._price}</p>`}

                                    <!-- Size selector -->
                                    <p class="card-text fw-bold m-1">
                                        Size:
                                        <div class="sizes d-flex flex-wrap gap-1">
                                            ${checkSize(product?._id)}
                                        </div>
                                    </p>

                                    <p class="card-text fw-bold m-1">
                                        Category: <span class="material fw-normal">${product?._category}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quantity controls -->
                <div class="col-6 col-md-3 text-center">
                    <div class="d-flex justify-content-center align-items-center gap-2">
                        <div class="quantity border d-flex" style="width: 160px">
                            <button class="btn btn-outline-secondary w-25 border-0 rounded-0 decrease-btn" data-id=${product?._id}>-</button>
                            <input type="number" class="w-50 text-center ps-2 border-0" value="${item.quantity}" readonly />
                            <button class="btn btn-outline-secondary w-25 border-0 rounded-0 increase-btn" data-id=${product?._id}>+</button>
                        </div>
                        <button class="bg-transparent border-0 remove-btn" data-id=${product?._id}>
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>

                <!-- Item total -->
                <div class="col-6 col-md-3 fw-bold text-center item-total">
                    ${
                        item.size
                            ? `$${((product?._price - (product?._price * product._discountPercentage / 100) || product?._price) * item.size * item.quantity).toFixed(2)}`
                            : `$${((product?._price - (product?._price * product._discountPercentage / 100) || product?._price) * item.quantity).toFixed(2)}`
                    }
                </div>
            </div>`);
    });

    calculateSubtotal();
}


// ======================================================
// Generate size radio buttons and mark selected one
// ======================================================
function checkSize(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const cartItem = cart.find(item => item.product_id == productId);
    if (!cartItem) return '';

    const product = products.find(p => p._id == productId);
    if (!product) return '';

    const selectedSize = cartItem.size;

    return product._sizes.map((size) => `
        <input 
            type="radio"
            class="choose-size d-none"
            name="size-${productId}"     
            id="size-${productId}-${size}" 
            data-id="${productId}"
            value="${size}"
            ${selectedSize == size ? 'checked' : ''}
        >
        <label 
            for="size-${productId}-${size}" 
            class="btn btn-outline-warning rounded-pill py-1 me-2 size-label ${selectedSize == size ? 'active text-white' : ''}">
            ${size} kg
        </label>
    `).join('');
}


// ======================================================
// Update cart when user selects size
// ======================================================
$(document).on('change', '.choose-size', function () {
    let productId = $(this).data('id');
    let selectedSize = $(this).val();

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(i => i.product_id == productId);

    if (item) item.size = selectedSize;

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
});


// ======================================================
// Remove item from cart
// ======================================================
function removeFromCart(product_id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.product_id != product_id);
    localStorage.setItem("cart", JSON.stringify(cart));
}

$(document).on("click", ".remove-btn", function () {
    const id = Number($(this).data("id"));
    removeFromCart(id);
    displayCart();
});


// ======================================================
// Quantity increase/decrease handlers
// ======================================================
function increaseQuantity(product_id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.product_id == product_id);
    if (item) item.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function decreaseQuantity(product_id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.product_id == product_id);

    if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else cart = cart.filter(item => item.product_id != product_id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

$(document).on("click", ".increase-btn", function () {
    increaseQuantity(Number($(this).data("id")));
    displayCart();
});

$(document).on("click", ".decrease-btn", function () {
    decreaseQuantity(Number($(this).data("id")));
    displayCart();
});


// ======================================================
// Update progress bar toward free shipping
// ======================================================
function checkFreeShipping(subtotal) {
    $('.progress-truck').css("left", `${subtotal}%`);
    $(".progress-bar").css("width", `${subtotal}%`);

    if (subtotal >= 100) {
        $('.progress-truck').css("left", `100%`);
        $(".progress-bar").css("width", `100%`);
        $(".shipping-text").text("Congratulations, you've got free shipping!");
    } else {
        $(".shipping-text").text(`Spend €${100 - subtotal} more and get free shipping!`);
    }
}


// ======================================================
// Apply coupon logic
// ======================================================
$('#discount-code-btn').on('click', function () {
    const code = $('#coupon-code').val().trim().toUpperCase();
    const coupon = coupons.find(c => c.code === code);

    if (!coupon) {
        $('.coupon-message').text("* Invalid coupon code!")
            .removeClass("text-success").addClass("text-danger");

        appliedCoupon = null;
        calculateSubtotal();
        return;
    }

    appliedCoupon = coupon;
    $('.coupon-message').text(`Coupon applied: ${coupon.code}`)
        .removeClass("text-danger").addClass("text-success");

    calculateSubtotal();
});


// ======================================================
// Calculate subtotal including discounts
// ======================================================
function calculateSubtotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];

    let subtotal = 0;

    cart.forEach(item => {
        const product = products.find(p => p._id == item.product_id);
        if (!product) return;

        const price = product?._price - (product?._price * product._discountPercentage / 100) || product._price;
        subtotal += price * item.size * item.quantity;
    });

    // Apply coupon discount if exists
    if (appliedCoupon) {
        subtotal -= subtotal * appliedCoupon.value / 100;
    }

    $('.subtotal').text(`$ ${subtotal.toFixed(2)} dollar`);
    checkFreeShipping(subtotal);

    return subtotal;
}


// ======================================================
// Track special instructions text input
// ======================================================
$('#instructions').on('input', function () {
    special_instructions = $(this).val();
});


// ======================================================
// Build order object to store in localStorage
// ======================================================
function buildOrderData() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = calculateSubtotal();

    let newOrder = new Order({
        id: Date.now(),
        sellerId: 1,
        cart: cart,
        createdAt: new Date(),
        shipping: {
            fristName: "",
            lastName: "",
            phone: "",
            country: $('#countries').val() || "",
            fullAddress: "",
            appartment: "",
            postalCode: $('#zip-code').val() || "",
            city: $('#cities').val() || "",
            shipping_fees: subtotal >= 100 ? 0 : 14.00
        },
        subtotal: subtotal,
        discount_code: appliedCoupon ? appliedCoupon.code : "",
        discount_codes_list: coupons,
        special_instructions: special_instructions || ""
    });

    localStorage.setItem("currentOrder", JSON.stringify(newOrder));
    return newOrder;
}


// ======================================================
// Checkout button handler
// ======================================================
$('#checkout-btn').on('click', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Prevent checkout if any product missing size
    const missingSize = cart.some(item => !item.size);
    if (missingSize) {
        alert("Please select a size for each product in your cart");
        return;
    }

    const order = buildOrderData();
    if (!order) return;

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');

    displayCart();

    alert("Order placed successfully!");
    window.location.href = '../../checkOut/Template/checkOut.html'
});