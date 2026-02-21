// checkout logic

import { User } from "/models/user.js"

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
    let user;
    const userData = localStorage.getItem("currentUser");
    $("#userContact").hide();

    if (userData) {
        const plainUser  = JSON.parse(userData);
        user = Object.assign(new User({}), plainUser );
        

        // Email & icon
        $("#userEmail").text(user.email);
        $("#userInitial").text(user.firstName.charAt(0).toUpperCase());

        $("#contentHeader").addClass("d-none");
        $("#guestContact").hide();
        $("#userContact").show();
    }


    // Complete Order
    $("#orderBtn").click(function() {

        if (!user) {
            alert("Please login first");
            return;
        }

        const userDetails = JSON.parse(userData);
        const userAddress = userDetails.address;
        console.log(userAddress);

        const newAddress = {
            firstName: document.querySelector(".firstname").value,
            lastName: document.querySelector(".lastname").value,
            address: document.querySelector(".address").value,
            apartment: document.querySelector(".apartment").value,
            city: document.querySelector(".city").value,
            postalCode: document.querySelector(".postal").value,
            country: document.querySelector("#country").value,
        };
    
        user.addAddress(newAddress);
        user.saveCurrentUser();
        user.updateUsersArray();
    })
});