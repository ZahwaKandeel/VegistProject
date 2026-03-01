import { loadProducts } from "../../component/Product.js";
import { Order } from "/models/order.js";

let products = loadProducts() || [];
let selectedProduct = null;
let bsModal = null;


// Load modal HTML and bind events
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("quickViewModal");

    fetch("/component/quickViewModal.html")
    .then(response => response.text())
    .then(data => {
        container.innerHTML = data;

        // Bind Buy It Now click AFTER the modal exists
        $(container).on('click', '#modal-BuyItNow', function () {
            console.log("BUY BUTTON CLICKED"); // Debug
            buyItNow();
            window.location.href = "../../checkOut/Template/checkOut.html";
        });
    });

    // Bind the eye icon to open the modal
    $(document).on('click', '.fa-eye', function() {
        const cardId = parseInt($(this).closest(".cards").attr("id"));
        selectedProduct = products.find(p => p.ID === cardId);
        if (!selectedProduct) return;

        // Fill modal info
        $("#modal-productImage").attr("src", selectedProduct.ImageUrl);
        $("#modal-name").text(selectedProduct.Name);
        $("#modal-productPrice").text(`€${selectedProduct.Price}`);
        $("#modal-productStock").text(selectedProduct.Stock);
        $("#modal-discount").text(selectedProduct.DiscountPercentage);
        $("#modal-category").text(selectedProduct.Category);
        $("#modal-productDescription").text(selectedProduct.Description || "No description available.");
        

        // Fill sizes
        $('.sizediv').empty();
        selectedProduct.Sizes.forEach((item, index) => {
            let sizeId = `size_${index}`;
            $('.sizediv').append(`
                <input type="radio" class="btn-check" name="size_choice" id="${sizeId}" value="${item}" ${index === 0 ? "checked" : ""} autocomplete="off">
                <label class="btn ${index === 0 ? "btn-warning text-white" : "btn-outline-warning"} rounded-pill px-4 me-2" for="${sizeId}">${item}KG</label>
            `);
        });

        let pricePerKg = selectedProduct.Price;
        let selectedSize = parseFloat($('input[name="size_choice"]:checked').val());
        // $("#modal-productPrice").text((pricePerKg * selectedSize).toFixed(2));

        $(document).on('change', 'input[name="size_choice"]', function () {
            selectedSize = parseFloat($(this).val());
            $("#modal-productPrice").text((pricePerKg * selectedSize).toFixed(2));

            function getFinalPrice(products) {
                const price = Number(products._price);
                const discount = Number(products._discountPercentage) || 0;

                if (discount > 0) {
                    const discounted = price - (price * (discount / 100));
                    return Math.max(0, discounted);
                }
                return price;
            }
            const finalPrice = getFinalPrice(products);
            const discoutedPrice = (finalPrice).toFixed(2)
            ("#modal-productAfterDiscount").text(discoutedPrice);

        });

        // Show the modal
        const modalEl = container.querySelector(".modal");
        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();

    });
});

//Quantity Plus/Minus
// Quantity Plus
$(document).on('click', '.modal-qty-plus', function () {
    let value = parseInt($('#modal-quantityValue').val()) || 1;
    value++;
    $('#modal-quantityValue').val(value);
});

// Quantity Minus
$(document).on('click', '.modal-qty-minus', function () {
    let value = parseInt($('#modal-quantityValue').val()) || 1;
    if (value > 1) value--;
    $('#modal-quantityValue').val(value);
});

//AddToCart
$(document).on('click', '#modal-addToCart', function(e) {
    e.preventDefault(); // VERY IMPORTANT

    if (!selectedProduct) return;

    let quantity = parseInt($('#modal-quantityValue').val()) || 1;
    let selectedSize = $('input[name="size_choice"]:checked').val();

    addToCart(selectedProduct.ID, quantity, selectedSize);

    window.location.href = "../../cart/Template/cart.html";
});

// Buy It Now function
function buyItNow() {
    if (!selectedProduct) return;

    let quantity = parseInt($('#modal-quantityValue').val()) || 1;
    let selectedSize = $('input[name="size_choice"]:checked').val();

    let currentOrder = new Order({
        id: Date.now(),
        sellerId: 1,
        cart: [{ product_id: selectedProduct.ID, quantity: quantity, size: selectedSize }],
        createdAt: new Date(),
        shipping: {
            fristName: "",
            lastName: "",
            phone: "",
            country: "",
            fullAddress: "",
            appartment: "",
            postalCode: "",
            City: "",
            shipping_fees: null
        },
        subtotal: selectedProduct.Price * quantity,
        discount_code: "",
        special_instructions: ""
    });

    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
    console.log("Order saved:", currentOrder);
}

// Change size button style when clicked
$(document).on('click', '.sizediv label', function () {

    // remove active style from all labels
    $('.sizediv label')
        .removeClass('btn-warning text-white')
        .addClass('btn-outline-warning');

    // add active style to clicked label
    $(this)
        .removeClass('btn-outline-warning')
        .addClass('btn-warning text-white');
});
