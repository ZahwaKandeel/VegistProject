// profile Logic

import { User } from "/models/user.js"
$(function() {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
            const plainUser  = JSON.parse(userData);
            const user = Object.assign(new User({}), plainUser );
            const addressCount = user.address.length;
            $("#addressCount").text(`(${addressCount})`)
            const defaultAddress = user.address.find(a => a.isDefault === true);

            $("#accountDetails")
            .append(`<p class="text-secondary mb-0">${`${user.firstName} ${user.lastName}`}</p>`)
            .append(`<p class="text-secondary mb-0">${user.email}</p>`)
            .append(`<p class="text-secondary mb-0">${defaultAddress["address"]}</p>`)
            .append(`<p class="text-secondary mb-0">${defaultAddress["apartment"]}</p>`)
            .append(`<p class="text-secondary mb-0">${defaultAddress["city"]}</p>`)
            .append(`<p class="text-secondary mb-0">${defaultAddress["postalCode"]}</p>`)
            .append(`<p class="text-secondary mb-0">${defaultAddress["country"]}</p>`);
    }
});

$(function() {
    $(".logoutBtn").off("click").on("click", (function(e) {
        e.preventDefault();
        e.stopPropagation();
        const currentPage = window.location.pathname + window.location.search;
        const userDate = localStorage.getItem("currentUser");

        if (userDate) {
            const confirmLogout = confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                localStorage.removeItem("currentUser");
                window.location.replace ("/auth/Template/login.html");
            }
            else {
                // in case not logged in
                return;
            }
        } else {
            window.location.href = "/auth/Template/login.html"
        }
    }));
})