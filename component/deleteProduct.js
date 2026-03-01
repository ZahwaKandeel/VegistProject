// DELETE PRODUCT BY ID

//get the product will be removed
//filter it from other products
//update to set the remained products
export function deleteProductById(id) {

  let products = JSON.parse(localStorage.getItem("products")) || [];
  const updatedProducts = products.filter(product => product._id !== Number(id));
  
  localStorage.setItem("products", JSON.stringify(updatedProducts));
  console.log("Updated:", JSON.parse(localStorage.getItem("products")));
}