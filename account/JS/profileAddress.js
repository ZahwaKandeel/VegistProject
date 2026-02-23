// Addresses Logic
import { User } from "/models/user.js";

window.onload = () => window.scrollTo(0, 0);

$(function () {
    const userData = localStorage.getItem("currentUser");
        if (userData) {
            const plainUser  = JSON.parse(userData);
            const user = Object.assign(new User({}), plainUser );

            if (user.address && user.address.length > 0){
                for (let i = 0; i < user.address.length; i++) {
                    const addr = user.address[i];

                    $("#addAddressSection").before(
                        `<div class="d-flex justify-content-between align-items-baseline bg-body-secondary bg-opacity-50 mb-4 addDis">
                            <div class="ms-3 my-2">
                                <p class="m-0 fullName"><b>${addr.firstName} ${addr.lastName}</b></p>
                                <p class="m-0">${addr.address}, ${addr.apartment}</p>
                                <p class="m-0">${addr.country}</p>
                                <p class="m-0">${addr.city}</p>
                                <p class="m-0">${addr.postalCode}</p>
                                <p class="m-0">${addr.phone}</p>
                            </div>
                            <div class="mt-3">
                                <button class="bg-transparent border border-1 rounded p-2 edit">Edit</button>
                                <button class="bg-transparent border border-1 rounded p-2 me-3 delete">Delete</button>
                            </div>
                        </div>`
                    )
                }
                updateDefaultAddress();
            }
        }

            $("form").on("submit", function (e) {
                e.preventDefault();

                const newAddress = {
                    firstName: $("#firstName").val(),
                    lastName: $("#lastName").val(),
                    address: $("#address").val(),
                    apartment: $("#apartment").val(),
                    city: $("#city").val(),
                    postalCode: $("#postalCode").val(),
                    country: $("#country").val(),
                    phone: $("#phone").val(),
                };

                if (!newAddress.firstName || !newAddress.address || !newAddress.city) {
                    alert("Please fill required fields");
                    return;
                }

                console.log(newAddress);
                user.addAddress(newAddress);
                window.location.reload();
            });
        });

function updateDefaultAddress() {
    $(".fullName").text(function () {
        return this.textContent.replace(` <b>(Default)</b>`, "");
    });

    $(".addDis").first().find(".fullName").append(` <b>(Default)</b>`)
}

$(function() {
    $(".delete").click(function () {
        $(this).closest(".addDis").remove();
        updateDefaultAddress();
    })
})