// User object

export function createUser(data) {
    return {
        id: Date.now(), 
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "customer",
        wishlist: ["productId"],
        cart: ["productId"],
        phone: "01234567891",
        address: {
            country: "",
            fullAddress: "",
            appartment: "",
            postalCode: "",
            City: ""
        },
    }}


export function saveUser(user) {
    // Get existing users or empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}