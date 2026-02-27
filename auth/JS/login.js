
import {User} from "/models/user.js";

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
        const plainUser = users.find(u => u.email === emailValue);

        if(!plainUser) {
            alert("Email not registerd");
            email.addClass("is-invalid");
            return;
        }
        
        const user = Object.assign(new User({}), plainUser);
        const hashedPassword = await User.hashPassword(passValue);

        if (hashedPassword !== plainUser.password) {
            alert("Wrong password");
            password.addClass("is-invalid");
            return;
        }
        // Create currentUser object
        user.saveCurrentUser();

        // Check if we have a returnUrl parameter
        const params = new URLSearchParams(window.location.search);
        const returnUrl = params.get("returnUrl");

        if (returnUrl && returnUrl.startsWith("/")) {
            // Safe internal redirect
            window.location.replace(returnUrl);
        } else {
            // Role-based fallback
            if (user.role === "seller") {
                window.location.replace("/seller/Template/sellerdash.html");

            } else if (user.role === "admin") {
                window.location.replace("/admin/Template/adminPanal.html");

            } else {
                // customer or unknown role
                window.location.replace("/home/Template/home.html");
            }
        }
    });
})
