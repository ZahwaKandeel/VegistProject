
export function isAuth() {
    const validUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(validUser)
    return validUser;
}
console.log(isAuth())