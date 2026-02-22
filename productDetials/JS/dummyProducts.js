// dummyProducts.js
import { Product, saveProducts } from "../../component/Product.js";

const dummyProducts = [
  new Product(
    1, // ID
    "Fresh Tomato", // Name
    14.0,           // Price
    "Freshly picked tomatoes, perfect for salads and cooking.", // Description
    18,             // Stock
    "vegetable",    // Tag or category
    "../../images/product_detials/tomato.jpg" // Image URL
  ),
  new Product(
    2,
    "Organic Apple",
    20.0,
    "Crisp, juicy organic apples from local farms.",
    25,
    "fruit",
    "../../images/product_detials/apple.jpg"
  ),
  new Product(
    3,
    "Red Bell Pepper",
    10.5,
    "Sweet red bell peppers, perfect for stir-fry and salads.",
    12,
    "vegetable",
    "../../images/product_detials/redbell.jpg"
  )
];

// Save the dummy products to localStorage
saveProducts(dummyProducts);