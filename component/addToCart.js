// This function adds a product to the shopping cart
// Send the product id and quantity as parameters

function addToCart(product_id, p_quantity=1) {
    
    // check if the product already exists or not
    const existing = cart.find(item => item.product_id === product_id);
    if (existing) {
        existing.quantity += p_quantity;
    } else {
        cart.push({product_id, quantity: p_quantity });
    } 

    // save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}