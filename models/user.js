// User object

export function createUser(data) {
    return {
        id: Date.now(), 
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "customer",
        wishlist: [""],    // products ids
        cart: [""],     // products ids
        phone: "",
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
    const Users = JSON.parse(localStorage.getItem("Users")) || [];
    Users.push(user);
    localStorage.setItem("Users", JSON.stringify(Users));
}


export function emailExists(email) {
    // check for exsisting emails
    const Users = JSON.parse(localStorage.getItem("Users")) || [];
    return Users.some(u => u.email === email);
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