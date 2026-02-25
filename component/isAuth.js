
export function isAuth() {
    const validUser = localStorage.getItem("currentUser");
    if (!validUser) {
        alert(`Unauthinticated: Access denied, You must login first!`);
        window.location.replace("/auth/Template/login.html")
    }
     return JSON.parse(validUser);
}