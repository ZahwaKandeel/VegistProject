// Addresses Logic
import { User } from "/models/user.js";

$(function () {
    const userData = localStorage.getItem("currentUser");
        if (userData) {
            const plainUser  = JSON.parse(userData);
            const user = Object.assign(new User({}), plainUser );

            $("#addAddress").click(function(e) {
                e.preventDefault();
                const newAddress = {
                    firstName: document.querySelector("#firstName").value,
                    lastNamN: document.querySelector("#lastName").value,
                    address: document.querySelector("#address").value,
                    apartment: document.querySelector("#apartment").value,
                    city: document.querySelector("#city").value,
                    postalCode: document.querySelector("#postalCode").value,
                    country: document.querySelector("#country").value,
                    country: document.querySelector("#phone").value,
                };
    
                user.addAddress(newAddress);
                user.saveCurrentUser();
                user.updateUsersArray();
            });
        }
});