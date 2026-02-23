// profile Logic

import { User } from "/models/user.js"
$(function() {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
            const plainUser  = JSON.parse(userData);
            const user = Object.assign(new User({}), plainUser );
            
            $("#accountDetails")
            .append(`<p class="text-secondary mb-0">${`${user.firstName} ${user.lastName}`}</p>`)
            .append(`<p class="text-secondary mb-0">${user.email}</p>`)
            .append(`<p class="text-secondary mb-0">${user.address[0]["address"]}</p>`)
            .append(`<p class="text-secondary mb-0">${user.address[0]["apartment"]}</p>`)
            .append(`<p class="text-secondary mb-0">${user.address[0]["city"]}</p>`)
            .append(`<p class="text-secondary mb-0">${user.address[0]["postalCode"]}</p>`)
            .append(`<p class="text-secondary mb-0">${user.address[0]["country"]}</p>`);
    }
});