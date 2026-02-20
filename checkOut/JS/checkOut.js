// checkout logic

$(function() {
    

    const userData = localStorage.getItem("currentUser");

    if (userData) {
        const user = JSON.parse(userData);
        const email = user.email;
        // Email & icon
        $("#userEmail").text(email);
        $("userInitial").text(email.charAt(0).toUpperCase());

        $("#guestConact").hide();
        $("#userConact").show();
        $("#signinLink").hide();
    }
});