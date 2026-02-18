// This function adds a product to the shopping cart
// Send the product object as parameter 

function addToCart(product) {
    
    // check if the product already exists or not
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += productQuantity || 1;
    } else {
        cart.push({...product, quantity: productQuantity || 1 });
    } 

    // save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}