// User Class

export class User {
    constructor({ firstName, lastName, email, password }) {
        this.id = Date.now();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = "customer";
        this.wishlist = [];
        this.cart = [];
        this.phone = "";
        this.address = [];
    }

    static async hashPassword(password) {
        // hashing passwords
        const encoder = new TextEncoder();
        const data = encoder.encode(password);

        const hashBuffer = crypto.subtle.digest("SHA-256", data);

        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

        return hashHex;
}

    static emailExists(email) {
        // check for exsisting emails
        const Users = JSON.parse(localStorage.getItem("Users")) || [];
        return Users.some(u => u.email === email);
    }

    // Add a new address
    addAddress(newAddress) {
        this.address = this.address || [];
        this.address.push(newAddress);
        this.saveCurrentUser();
        this.updateUsersArray();
    }

    // Save current user session
    saveCurrentUser() {
        localStorage.setItem("currentUser", JSON.stringify(this));
    }

    // Update Users array
    updateUsersArray() {
        const allUsers = JSON.parse(localStorage.getItem("Users")) || [];
        const userIndex = allUsers.findIndex(u => u.id === this.id);

        if (userIndex !== -1) {
            allUsers[userIndex] = this;
        } else {
            allUsers.push(this);
        }

        localStorage.setItem("Users", JSON.stringify(allUsers));
    }

    // Optional: Get all addresses
    getAddresses() {
        return this.address || [];
    }

    // Optional: Save user to Users array only
    saveUser() {
        const allUsers = JSON.parse(localStorage.getItem("Users")) || [];
        allUsers.push(this);
        localStorage.setItem("Users", JSON.stringify(allUsers));
    }
}