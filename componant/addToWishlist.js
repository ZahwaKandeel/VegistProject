// This function adds a product to the wishlist
// Send product object as parameter

function addToWishlist(product) {
    
    // check if the product already exists or not
    const existing = wishlist.find(item => item.id == product.id);
    if (existing) {
        alert('Product has already added to your wishlist')
        return
    } else {
        wishlist.push(product);
    } 

    // save the wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
