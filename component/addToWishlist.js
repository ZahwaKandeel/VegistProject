// This function adds a product to the wishlist
import {showToast} from "./toast.js";

export function addToWishlist(product_id) {
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    // check if the product already exists or not
    const existing = wishlist.find(item => item.product_id == product_id);
    if (existing) {
        showToast("warning", 'Product has already added to your wishlist')
        return
    } else {
        wishlist.push({product_id});
        showToast("success", 'Product Added to Wishlist')
    } 

    // save the wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
