// Logout logic

$(function() {
    $(".logoutBtn").click(function(e) {
        e.preventDefault();

        const userDate = localStorage.getItem("currentUser");

        if (userDate) {
            const confirmLogout = confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                localStorage.removeItem("currentUser");
                window.location.replace("/auth/Template/login.html");
            }
            else {
                // in case not logged in
                window.location.href = "/auth/Template/login.html"
            }
        }
    })
})
