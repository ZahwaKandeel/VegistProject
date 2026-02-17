// This function adds a product to the shopping cart
// Send all the parameters 
// example: addToCart({ id: 1, productName: 'Organic coconet', productPrice: '40.00', discountPrice: '35.00', productImage: '../images/39.webp', productSize: '1Kg', productMaterial: 'Vegetables' });

function addToCart({ id, productName, productPrice, discountPrice, productImage, productSize, productMaterial, productQuantity }) {
    
    // check if the product already exists or not
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += productQuantity || 1;
    } else {
        cart.push({ id, productName, productPrice, discountPrice, productImage, productSize, productMaterial, quantity: productQuantity || 1 });
    } 

    // save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}