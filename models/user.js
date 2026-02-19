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
            city: ""
        },
    }}


export function saveUser(user) {
    // Get existing users or empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}


export function emailExists(email) {
    // check for exsisting emails
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(u => u.email === email);
}

export async function hashPassword(password) {
    // hashing passwords
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    return hashHex;
}