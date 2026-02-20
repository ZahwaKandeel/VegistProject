import { Product, saveProducts } from "../../component/Product.js";

const dummyProducts = [
    new Product(1, "Classic Bagel", 25, "A delicious freshly baked bagel made from high quality wheat flour and natural ingredients. Perfect for breakfast with cream cheese and jam for a delightful start to your day.", 50, "bagel", "https://picsum.photos/200/300?1.jpg"),

    new Product(2, "Chocolate Candy", 15, "Rich chocolate candy crafted from premium cocoa beans blended smoothly to create a sweet and satisfying treat loved by both kids and adults everywhere.", 100, "candy", "https://picsum.photos/200/300?2.jpg"),

    new Product(3, "Green Beans Pack", 30, "Fresh organic green beans carefully selected from trusted farms to ensure high quality and nutritional value suitable for healthy meals and balanced diets.", 40, "beans", "https://picsum.photos/200/300?3.jpg"),

    new Product(4, "Best Seller Bread", 20, "Our bestselling bread baked daily with love and care to provide a soft texture and golden crust ideal for sandwiches and breakfast meals.", 70, "bestseller", "https://picsum.photos/200/300?4.jpg"),

    new Product(5, "Whole Wheat Bread", 22, "Nutritious whole wheat bread made from 100 percent natural grains providing fiber and essential nutrients to support a healthy lifestyle.", 60, "bread", "https://picsum.photos/200/300?5.jpg"),

    new Product(6, "Vanilla Biscuit", 18, "Crunchy vanilla flavored biscuit baked to perfection offering a delightful snack option for tea time and quick energy breaks during busy days.", 90, "biscuite", "https://picsum.photos/200/300?6.jpg"),

    new Product(7, "Breakfast Cereal", 35, "Healthy breakfast cereal enriched with vitamins and minerals to give you sustained energy and a nutritious start every single morning.", 45, "breakfast", "https://picsum.photos/200/300?7.jpg"),

    new Product(8, "Strawberry Cake", 80, "Soft sponge cake layered with fresh strawberry cream filling and topped with natural fruit slices for a refreshing dessert experience.", 20, "cake", "https://picsum.photos/200/300?8.jpg"),

    new Product(9, "Chocolate Cookie", 12, "Freshly baked chocolate cookie with a crispy exterior and soft gooey center providing a perfect sweet snack for all ages.", 120, "cookie", "https://picsum.photos/200/300?9.jpg"),

    new Product(10, "Red Velvet Cupcake", 28, "Moist red velvet cupcake topped with creamy frosting delivering a rich flavor and beautiful presentation for special occasions.", 75, "cupcake", "https://picsum.photos/200/300?10.jpg"),

    new Product(11, "Cheddar Cheese", 45, "Premium cheddar cheese aged perfectly to enhance its rich flavor making it ideal for sandwiches pasta dishes and gourmet recipes.", 30, "Diary&Cheese", "https://picsum.photos/200/300?11.jpg"),

    new Product(12, "Dinner Pasta", 55, "Italian style dinner pasta made from high quality durum wheat providing an authentic taste and texture for family meals.", 35, "Dinner", "https://picsum.photos/200/300?12.jpg"),

    new Product(13, "Honey Bagel", 27, "Sweet honey glazed bagel baked fresh every day with natural ingredients and perfect for pairing with butter or cream cheese.", 55, "bagel", "https://picsum.photos/200/300?13.jpg"),

    new Product(14, "Caramel Candy", 16, "Smooth caramel candy with a rich buttery flavor crafted carefully to melt in your mouth and satisfy your sweet cravings.", 85, "candy", "https://picsum.photos/200/300?14.jpg"),

    new Product(15, "Black Beans", 32, "High quality black beans packed with protein and fiber suitable for soups stews and healthy balanced dishes.", 60, "beans", "https://picsum.photos/200/300?15.jpg"),

    new Product(16, "Butter Croissant", 25, "Flaky butter croissant baked with premium ingredients providing a soft interior and crispy outer layer ideal for breakfast.", 70, "bread", "https://picsum.photos/200/300?16.jpg"),

    new Product(17, "Blueberry Muffin", 30, "Delicious blueberry muffin bursting with fresh berries and baked to golden perfection for a delightful snack option.", 65, "breakfast", "https://picsum.photos/200/300?17.jpg"),

    new Product(18, "Chocolate Cake", 85, "Rich chocolate cake layered with smooth cocoa cream and decorated elegantly making it perfect for celebrations.", 25, "cake", "https://picsum.photos/200/300?18.jpg"),

    new Product(19, "Vanilla Cookie", 10, "Light and crispy vanilla cookie baked with natural flavors offering a sweet and satisfying bite every time.", 110, "cookie", "https://picsum.photos/200/300?19.jpg"),

    new Product(20, "Cream Cheese", 40, "Soft and creamy cheese made from high quality dairy products ideal for spreads baking and gourmet cooking recipes.", 50, "Diary&Cheese", "https://picsum.photos/200/300?20.jpg")
];

if(!localStorage.getItem("products")){
    saveProducts(dummyProducts);
}