import { Product, saveProducts } from "../../component/Product.js";

const dummyProducts = [
         new Product(1, "Classic Bagel", 25,
        "A delicious freshly baked bagel made from high quality wheat flour and natural ingredients. Perfect for breakfast with cream cheese and jam for a delightful start to your day.",
        50, "bagel", "https://picsum.photos/200/300?1.jpg",
        [1,2,3,4,5], 4.5, [{ name: "Yamen Aly", comment: "This bagel is soft, fresh, and absolutely delicious. Perfect for breakfast!" }], 5, 10),

    new Product(2, "Chocolate Candy", 15,
        "Rich chocolate candy crafted from premium cocoa beans blended smoothly to create a sweet and satisfying treat loved by both kids and adults everywhere.",
        100, "candy", "https://picsum.photos/200/300?2.jpg",
        [1,2,3,4,5], 4.2, [{ name: "Ali Hassan", comment: "Smooth and perfectly sweet, this candy melts in your mouth and is loved by kids and adults alike." }], 2, 5),

    new Product(3, "Green Beans Pack", 30,
        "Fresh organic green beans carefully selected from trusted farms to ensure high quality and nutritional value suitable for healthy meals and balanced diets.",
        40, "beans", "https://picsum.photos/200/300?3.jpg",
        [1,2,3,4,5], 4.0, [{ name: "Sara Mahmoud", comment: "These green beans are fresh, crisp, and perfect for healthy meals. Loved their vibrant color!" }], 0, 0),

    new Product(4, "Best Seller Bread", 20,
        "Our bestselling bread baked daily with love and care to provide a soft texture and golden crust ideal for sandwiches and breakfast meals.",
        70, "bestseller", "https://picsum.photos/200/300?4.jpg",
        [1,2,3,4,5], 4.7, [{ name: "Omar Nabil", comment: "Soft, fresh, and golden crust. This bread is consistently my family's top choice." }], 3, 15),

    new Product(5, "Whole Wheat Bread", 22,
        "Nutritious whole wheat bread made from 100 percent natural grains providing fiber and essential nutrients to support a healthy lifestyle.",
        60, "bread", "https://picsum.photos/200/300?5.jpg",
        [1,2,3,4,5], 4.3, [{ name: "Mona Sami", comment: "Healthy, nutritious, and delicious. The perfect daily bread with rich whole wheat flavor." }], 2, 8),

];

if(!localStorage.getItem("products")){
    saveProducts(dummyProducts);
}