// checkout logic

import { User } from "/models/user.js"

const userData = localStorage.getItem("currentUser");
console.log(`userData: ${userData}`)
const plainUser  = JSON.parse(userData);
console.log(`Plan User:` ,plainUser)
let user = Object.assign(new User({}), plainUser );

$(function() {
    // LOGOUT
    // Use this function once per page to avoid double-handlers
    $(".logoutBtn").off("click").on("click", (function(e) {
        e.preventDefault();
        e.stopPropagation();
        const currentPage = window.location.pathname + window.location.search;
        const userDate = localStorage.getItem("currentUser");

        if (userDate) {
            const confirmLogout = confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                localStorage.removeItem("currentUser");
                window.location.replace ("/auth/Template/login.html?returnUrl=" + encodeURIComponent(currentPage));
            }
            else {
                // in case not logged in
                return;
            }
        } else {
            window.location.href = 
            "/auth/Template/login.html?returnUrl=" + encodeURIComponent(currentPage);
        }
    }));

    // Logout dropdown list
    $("#menuToggle").click(function(e) {
        e.stopPropagation();
        $("#menuBox").toggle();
    });
    
    $(document).click(function() {
        $("#menuBox").hide();
    });
    $("#menuBox").click(function(e) {
        e.stopPropagation();
    });
});

$(function() {

    // Load Current User

    $("#userContact").hide();

    if (userData) {
        
        // Email & icon
        $("#userEmail").text(user.email);
        $("#userInitial").text(user.firstName.charAt(0).toUpperCase());

        $("#contentHeader").addClass("d-none");
        $("#guestContact").hide();
        $("#userContact").show();
    }
});

let newAddress;
const currentAddress = plainUser.address || [];
const order = localStorage.getItem("currentOrder");
const plainOrder = order ? JSON.parse(order) : {};
const orderAddress = plainOrder.shipping || {};

$(function() {
    // fetch address data
    console.log("order Address: ", orderAddress)
    console.log(`planUser: `, plainUser);
    console.log(currentAddress);

    if (orderAddress) {
        const defaultAddress = currentAddress.filter(addr => addr.isDefault === true)[0] || {};
        console.log("plan order: ", plainOrder);
        
        $(".firstname").val(orderAddress.firstName || defaultAddress.firstName || '');
        $(".lastname").val(orderAddress.lastName || defaultAddress.lastName || '');
        $(".address").val(orderAddress.fullAddress || defaultAddress.address || '');
        $(".apartment").val(orderAddress.appartment || defaultAddress.apartment || '');
        $(".city").val(orderAddress.city || defaultAddress.city || '');
        $(".postal").val(orderAddress.postalCode || defaultAddress.postalCode || '');
        $("#country").val(orderAddress.country || defaultAddress.country || '');
    
        if (orderAddress.country) {
            $("#countryFirstOption").text(orderAddress.country);
        }
        console.log(orderAddress.country)
        
    }
})

let total = $(".total");
let totalFinalPriceSum = 0;
const subtotal = $(".subtotal");
const shipping = $(".shipping");
const itemsCount = $(".itemNumber");
const subtotalValue = Number(plainOrder.subtotal);
const shippingValue = Number(orderAddress.shipping_fees);
const totalValue = subtotalValue + shippingValue;
const products = JSON.parse(localStorage.getItem("products"));
const cart = plainOrder.cart;
const orderProducts = cart.map(item => {
    const product = products.find(p => p._id === Number(item.product_id));
    
    return {
        ...product,
        name: item.name,
        quantity: item.quantity,
        size: item.size
    };
});

$(function() {
    console.log("Products",products);
    console.log("cart", cart);
    console.log("plain order", plainOrder)

    function getFinalPrice(product) {
        const price = Number(product._price);
        const discount = Number(product._discountPercentage) || 0;

        if (discount > 0) {
            const discounted = price - (price * (discount / 100));
            return Math.max(0, discounted);
        }
        return price;
    }
    
    orderProducts.forEach (product => {
        
        const originalPrice = Number(product._price);
        const finalPrice = getFinalPrice(product);
        const totalOriginalPrice = (originalPrice * Number(product.size)) * product.quantity;
        const totalFinalPrice = (finalPrice * Number(product.size)) * product.quantity;
        totalFinalPriceSum += totalFinalPrice;

        $("#accordionForm").prepend(
            `
                <section class="d-flex justify-content-between align-items-center mb-3 p-2 px-5">
                    <div class="col-1 border border-2 border-white rounded-3 text-center productImg">
                        <img src="${product._imageUrl}" alt="" class="productImage">
                    </div>
                    <div class="col-8 productContect ps-3">
                        <p class="m-0 productName">${product._name}</p>
                        <small class="text-secondary productDetails">
                        Size: ${product.size ?? "Default"} | Qty: ${product.quantity} | Price: ${product._price}
                        </small>
                    </div>
                    <div class="col-3 text-end productPrice">
                        ${
                            finalPrice < originalPrice
                            ? `
                                <del><i class="text-warning">$${totalOriginalPrice.toFixed(2)}</i></del>
                                <span>$${totalFinalPrice.toFixed(2)}</span>
                            `
                            : `
                            <span>$${totalFinalPrice.toFixed(2)}</span>
                            `
                        }
                    </div>
                </section>
            `
        )
        $("#lgForm").prepend(
            `
                <section class="d-flex justify-content-between align-items-center mb-3 p-2 ">
                    <div class="col-1 border border-2 border-white rounded-3 text-center productImg">
                        <img src="${product._imageUrl}" alt="" class="productImage">
                    </div>
                    <div class="col-7 productContect">
                        <p class="m-0 productName">${product._name}</p>
                        <small class="text-secondary productDetails">
                        Size: ${product.size ?? "Default"} | Qty: ${product.quantity} | Price: ${product._price}
                        </small>
                    </div>
                    <div class="col-2 text-end productPrice">
                        ${
                            finalPrice < originalPrice
                            ? `
                                <del><i class="text-warning">$${totalFinalPrice.toFixed(2)}</i></del>
                                <span>$${totalFinalPrice.toFixed(2)}</span>
                            `
                            : `
                            <span>$${totalFinalPrice.toFixed(2)}</span>
                            `
                        }
                    </div>
                </section>
            `
        )
    }) 
    
    const itemsCountVal = orderProducts.length;

    subtotal.text(`$${plainOrder.subtotal}`)
    shipping.text(`$${orderAddress.shipping_fees}`)
    itemsCount.text(`${itemsCountVal} items`)
    
    total.text(`$${totalValue}`)
    console.log("order Product: ", orderProducts)
    
})


$("form").on("submit", function(e) {
    e.preventDefault();
    const discountCode = $("input[type='text']").val().trim();
    const discountList = plainOrder.discount_codes_list;
    let total = $(".total");
    
    const matchedCode = discountList.find(c => c.code === discountCode);
    
    if (matchedCode) {
        const newTotal = totalValue - (totalValue * (matchedCode.value / 100));
        total.text(`$${newTotal}`);
        totalFinalPriceSum = newTotal;
    } else {
        total.text(`$${totalValue}`);
    }
})

// Get Done Orders
const getDoneOrders = () =>
    JSON.parse(localStorage.getItem("doneOrders")) || [];

// Add Done Orders
const addDoneOrder = (order) => {
    const orders = getDoneOrders();
    orders.push(order);
    localStorage.setItem("doneOrders", JSON.stringify(orders));
};

$(function() {
    // Complete Order
    $("#orderBtn").click(function() {

        if (!user) {
            alert("Please login first");
            return;
        }
        
        function clearDefaultAddress() {
            plainUser.address.forEach(addr => addr.isDefault = false);
        }

        const isDefaultChecked = $("#saveInfo").prop("checked");
        
        
        const newAddress = {
            firstName: $(".firstname").val(),
            lastName: $(".lastname").val(),
            address: $(".address").val(),
            apartment: $(".apartment").val(),
            city: $(".city").val(),
            postalCode: $(".postal").val(),
            country: $("#country").val(),
            isDefault: isDefaultChecked
        };

        if (isDefaultChecked) {
            clearDefaultAddress();
            newAddress.isDefault = true;
        }

        user.addAddress(newAddress);
        user.saveCurrentUser();
        user.updateUsersArray();

        const now = new Date();
        const DateTime = now.toISOString().slice(0, 19).replace("T", " ");
        console.log("TIME NOW: ", DateTime)

        const newDoneOrder  = {
                id: plainOrder.id,
                customerId: plainUser.id,
                sellerId: plainOrder.sellerId,
                total: totalFinalPriceSum,
                orderDetail: plainOrder,
                payment: "Cash on Delivery (COD)",
                createdAt : DateTime,
            }
        

        // Add doneOrder Object
        addDoneOrder(newDoneOrder );

        alert("Order Completed Successfully!")
        window.location.replace("/home/Template/home.html");
    })
})