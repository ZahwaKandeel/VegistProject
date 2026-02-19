
import {hashPassword} from "/models/user.js";

$(function() {
    const email = $("#email");
    const password = $("#password");
    const registerBtn = $("#register")

    registerBtn.click(() =>{window.location.href = "/auth/Template/register.html"});
    
    function isEmailValid() {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.val());
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

        const emailValue = email.val().trim();
        const passValue = password.val().trim();

        // Clear previous validation
        email.removeClass("is-invalid");
        password.removeClass("is-invalid");

        const emailValid = isEmailValid();
        setValidation(email, emailValid);
        if (!emailValid) {
            alert("Please enter a valid email");
            return;
        }

        const users = JSON.parse(localStorage.getItem("Users")) || [];
        const user = users.find(u => u.email === emailValue);

        if(!user) {
            alert("Email not registerd");
            email.addClass("is-invalid");
            return;
        }
        
        const hashedPassword = await hashPassword(passValue);

        if (hashedPassword !== user.password) {
            alert("Wrong password");
            password.addClass("is-invalid");
            return;
        }

        localStorage.setItem("currentUser",JSON.stringify(user));
        window.location.replace("/seller/Template/sellerdash.html");
    });
})
