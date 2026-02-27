// This function adds a product to the shopping cart

function addToCart(product_id, p_quantity=1, size = 1) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // check if the product already exists or not
    const existing = cart.find(item => item.product_id === product_id);
    if (existing) {
        existing.quantity += p_quantity;
    } else {
        cart.push({product_id, quantity: p_quantity, size });
    } 

    // save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}