// GET ALL PRODUCTS
function getAllProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

// GET PRODUCT BY ID
function getProductById(id) {
  const products = getAllProducts();
  return products.find(product => product.id == id);
}