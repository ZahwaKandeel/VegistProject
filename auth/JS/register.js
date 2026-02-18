
import { createUser, saveUser } from "../../models/user";

$(function(){
    const firstName = $("#firstName");
    const lastName = $("#lastName");
    const email = $("#email");
    const password = $("#password");
    const createBtn = $("#create");

    function isNameValid($input) {
        const name = $input.val().trim();
        return /^[A-Za-z]{4,30}$/.test(name);
    }

    function isEmailValid() {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.val());
    }

    function isStrongPassword() {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        return regex.test(password.val());
    }

    createBtn.click(function (e) {
        if (!isNameValid(firstName)) {
            firstName.addClass("is-invalid").removeClass("is-valid");
            e.preventDefault();
        } else {
            firstName.removeClass("is-invalid").addClass("is-valid");
        }
        if (!isNameValid(lastName)) {
            lastName.addClass("is-invalid").removeClass("is-valid");
            e.preventDefault();
        } else {
            lastName.removeClass("is-invalid").addClass("is-valid");
        }
        if (!isEmailValid()){
            email.addClass("is-invalid").removeClass("is-valid");
            e.preventDefault();
        } else {
            email.removeClass("is-invalid").addClass("is-valid");
        }
        if (!isStrongPassword()){
            password.addClass("is-invalid").removeClass("is-valid");
            e.preventDefault();
        } else {
            password.removeClass("is-invalid").addClass("is-valid");
        }

        const userData = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            email: email.val().trim(),
            password: password.val()
        };

        const newUser = createUser(userData);
        saveUser(newUser);

        alert("User registered successfully!");
    });
})