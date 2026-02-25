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

$(function() {

    $("#shipping").text(orderAddress.shipping_fees)
})

$(function() {
    // Complete Order
    $("#orderBtn").click(function() {

        if (!user) {
            alert("Please login first");
            return;
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
        user.addAddress(newAddress);
        user.saveCurrentUser();
        user.updateUsersArray();
    })
})