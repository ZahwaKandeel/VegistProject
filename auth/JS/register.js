
import { User, emailExists, hashPassword } from "/models/user.js";

$(function(){
    const firstName = $("#firstName");
    const lastName = $("#lastName");
    const email = $("#email");
    const password = $("#password");
    const loginBtn = $("#login")

    loginBtn.click(() =>{window.location.href = "/auth/Template/login.html"});

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

    function setValidation($input, isValid) {
        // validation UI
        if (isValid) {
            $input.removeClass("is-invalid").addClass("is-valid");
        } else {
            $input.removeClass("is-valid").addClass("is-invalid");
        }
    }

    $("form").submit(async function (e) {
        e.preventDefault();

        const firstValid = isNameValid(firstName);
        const lastValid  = isNameValid(lastName);
        const emailValid = isEmailValid();
        const passValid  = isStrongPassword();

        setValidation(firstName, firstValid);
        setValidation(lastName, lastValid);
        setValidation(email, emailValid);
        setValidation(password, passValid);

        if (!firstValid || !lastValid || !emailValid || !passValid) {
            alert("Please fix invalid fields");
            return;
        }

        if (emailExists(email.val().trim())) {
            alert("This email is already registered.");
            return;
        }
        
        const hashedPassword = await hashPassword(password.val().trim());

        const userData = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            email: email.val().trim(),
            password: hashedPassword
        };


        const newUser = new User(userData);
        newUser.saveUser();
        // newUser.saveCurrentUser();
        window.location.href = "/auth/Template/login.html";

    });
})