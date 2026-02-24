// Addresses Logic
import { User } from "/models/user.js";
import {isAuth } from "/component/isAuth.js"

isAuth();

window.onload = () => window.scrollTo(0, 0);
const userData = localStorage.getItem("currentUser");
const plainUser  = JSON.parse(userData);
const user = Object.assign(new User({}), plainUser );
let editingAddressId = null;

$(function() {
            $("#addAddressBtn").click(function(e) {
                e.preventDefault();
                $("#addressForm").toggleClass("visually-hidden");
            });
        });

$(function () {
    
        if (userData) {

            if (user.address && user.address.length > 0){
                for (let i = 0; i < user.address.length; i++) {
                    const addr = user.address[i];

                    $("#addAddressSection").before(
                        `<div class="d-flex justify-content-between align-items-baseline bg-body-secondary bg-opacity-50 mb-4 addDis"
                            data-id="${addr.id}">
                            <div class="ms-3 my-2">
                                <p class="m-0 fullName">
                                    <b>${addr.firstName} ${addr.lastName}</b>
                                    ${addr.isDefault ? " (Default)": ""}
                                    </p>
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
            }
        }

            $("form").on("submit", function (e) {
                e.preventDefault();

                const isDefaultChecked = $("#default").prop("checked");

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
                // check for default addresses, remove previous default
                if (isDefaultChecked) {
                    clearDefaultAddress();
                    newAddress.isDefault = true;
                }

                if (editingAddressId !== null) {
                    const addr = user.address.find(a => a.id === editingAddressId);

                    if (addr) {
                        Object.assign(addr, newAddress); // update address

                        // If editing default
                        if (isDefaultChecked) {
                            clearDefaultAddress();
                            addr.isDefault = true;
                        }
                    }
                    editingAddressId = null; // exit edit mode
                }
                else {
                    newAddress.id = Date.now();
                    user.addAddress(newAddress);
                }
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.reload();
            });

            $("form").on("click", "#cancel", function(e) {
                e.preventDefault();

                $("#firstName").val("");
                $("#lastName").val("");
                $("#address").val("");
                $("#apartment").val("");
                $("#city").val("");
                $("#country").val("");
                $("#postalCode").val("");
                $("#phone").val("");
            })
    });

function clearDefaultAddress() {
    user.address.forEach(addr => addr.isDefault = false);
}

$(function() {
    $(".delete").click(function () {
        const card = $(this).closest(".addDis");
        const addressId = Number(card.data("id"));

        const userData = localStorage.getItem("currentUser");
        const user = JSON.parse(userData);

        user.address = user.address.filter(addr => addr.id !== addressId);

        localStorage.setItem("currentUser", JSON.stringify(user));
        card.remove();
    })
})

$(function() {
    
    $(".edit").on("click", function(e) {
        e.preventDefault();

        
        const card = $(this).closest(".addDis");
        const addressId = Number(card.data("id"));
        const chosenAddress = user.address.find(addr => addr.id === addressId);
        if (!chosenAddress) return;
        
        $("#default").prop("checked", chosenAddress.isDefault === true);
        editingAddressId = addressId;
        
        $("#addressForm").toggleClass("visually-hidden");
        $("#firstName").val(chosenAddress.firstName);
        $("#lastName").val(chosenAddress.lastName);
        $("#address").val(chosenAddress.address);
        $("#apartment").val(chosenAddress.apartment);
        $("#city").val(chosenAddress.city);
        $("#country").val(chosenAddress.country);
        $("#postalCode").val(chosenAddress.postalCode);
        $("#phone").val(chosenAddress.phone);

    })
})