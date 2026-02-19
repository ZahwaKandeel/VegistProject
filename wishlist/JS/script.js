let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
 $(document).ready(function(){
// addToWishlist(3)
displayWishlist()
 })

 function displayWishlist() {

  let products = JSON.parse(localStorage.getItem('products'))  
  $('.wishlist-items').empty()
  
  if (wishlist.length === 0) {
    
    $('main .container').empty().append(`<div class="text-center h3 my-5"><span>Your wishlist is empty</span> <a
                  href="../../productList/Template/product_list.html"
                  class="text-secondary"
                  >Return to store</a
                ></div>`);
     return;
  }
  wishlist.map(item => {
        const product = products.find(p => p.id === item.product_id);
        
        $('.wishlist-items').append(`
                  <!-- Product -->
                  <div class="col-6 col-md-4 col-lg-3">
                    <div class="card border-0 mb-4">
                        <div class="image position-relative">
                            <div class="discount-per badge position-absolute top-0 end-0 text-white px-3 py-2 mt-2 me-2 rounded-5" style="background-color: #e30514;">
                                    32%
                                </div>
                            <img src="${product.images[0]}" class="card-img-top img-1" alt="${product.title}">
                            <img src="../images/2.2.webp" class="card-img-top img-2" alt="${product.title}">

                            <div class="icons position-absolute bottom-0 start-50 translate-middle-x p-2 d-flex">
                                <i class="fa-solid fa-heart remove" data-id=${product.id}></i>
                                <i class="fa-solid fa-shopping-bag add-to-cart" data-id=${product.id}></i>
                                <i class="fa-regular fa-eye" data-id=${product.id}></i>
                            </div>
                        </div>
                        <div class="card-body ps-0 fw-bold">
                            <p class="card-title fw-bold">Sp. red fresh guava</p>
                            <p class="card-text price fw-bold m-1">
                                $${product.discountvalue}
                                <span class="fw-normal text-decoration-line-through"> $${product.price}
                                </span>
                            </p>
                            <div class="d-block d-md-flex align-items-center  ">
                                <div class="text-warning me-1 rating ">
                                    <i class=" fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>

                                </div>
                                <span class="text-secondary fw-semibold">${product.rating.count} reviews</span>
                            </div>
                        </div>



                    </div>
                </div>`);
    });


}

function removeFromWishlist(product_id){
  wishlist = wishlist.filter(item=>item.product_id !== product_id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
$(document).on("click", ".remove", function() {
  const id = Number($(this).data("id"));
  removeFromWishlist(id);
  displayWishlist();
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];
$(document).on("click", ".add-to-cart", function() {
  const id = Number($(this).data("id"));
  addToCart(id);
  removeFromWishlist(id);
  displayWishlist()
});