// This function adds a product to the wishlist
// Send product id object as parameter

function addToWishlist(product_id) {
    
    // check if the product already exists or not
    const existing = wishlist.find(item => item.product_id == product_id);
    if (existing) {
        alert('Product has already added to your wishlist')
        return
    } else {
        wishlist.push({product_id});
    } 

    // save the wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
