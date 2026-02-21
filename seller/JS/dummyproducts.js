import { Product, saveProducts } from "../../component/Product.js";

const dummyProducts = [
     new Product(1, "Classic Bagel", 25, "A delicious freshly baked bagel made from high quality wheat flour and natural ingredients. Perfect for breakfast with cream cheese and jam for a delightful start to your day.", 50, "bagel", "https://picsum.photos/200/300?1.jpg",
        250, 4.5, "Customers love the softness and freshness of this bagel making it a consistent breakfast favorite among many families.", 5, 10),

    new Product(2, "Chocolate Candy", 15, "Rich chocolate candy crafted from premium cocoa beans blended smoothly to create a sweet and satisfying treat loved by both kids and adults everywhere.", 100, "candy", "https://picsum.photos/200/300?2.jpg",
        100, 4.2, "Highly praised for its smooth texture and balanced sweetness that makes it enjoyable without being overly sugary.", 2, 5),

    new Product(3, "Green Beans Pack", 30, "Fresh organic green beans carefully selected from trusted farms to ensure high quality and nutritional value suitable for healthy meals and balanced diets.", 40, "beans", "https://picsum.photos/200/300?3.jpg",
        500, 4.0, "Customers appreciate the freshness and vibrant color of these beans which remain crisp even after cooking.", 0, 0),

    new Product(4, "Best Seller Bread", 20, "Our bestselling bread baked daily with love and care to provide a soft texture and golden crust ideal for sandwiches and breakfast meals.", 70, "bestseller", "https://picsum.photos/200/300?4.jpg",
        400, 4.7, "This bread is known for its softness and consistent quality making it a top choice for families across the region.", 3, 15),

    new Product(5, "Whole Wheat Bread", 22, "Nutritious whole wheat bread made from 100 percent natural grains providing fiber and essential nutrients to support a healthy lifestyle.", 60, "bread", "https://picsum.photos/200/300?5.jpg",
        380, 4.3, "Consumers value the healthy ingredients and rich taste that supports a balanced and nutritious diet daily.", 2, 8),

    new Product(6, "Vanilla Biscuit", 18, "Crunchy vanilla flavored biscuit baked to perfection offering a delightful snack option for tea time and quick energy breaks during busy days.", 90, "biscuite", "https://picsum.photos/200/300?6.jpg",
        150, 4.1, "Popular for its crispy texture and pleasant vanilla aroma making it a perfect companion for tea or coffee breaks.", 1, 5),

    new Product(7, "Breakfast Cereal", 35, "Healthy breakfast cereal enriched with vitamins and minerals to give you sustained energy and a nutritious start every single morning.", 45, "breakfast", "https://picsum.photos/200/300?7.jpg",
        600, 4.6, "Parents appreciate the nutritional value and balanced sweetness that children enjoy every morning.", 4, 12),

    new Product(8, "Strawberry Cake", 80, "Soft sponge cake layered with fresh strawberry cream filling and topped with natural fruit slices for a refreshing dessert experience.", 20, "cake", "https://picsum.photos/200/300?8.jpg",
        900, 4.8, "Customers adore the freshness of the strawberries and the light creamy texture that makes every bite delightful.", 10, 20),

    new Product(9, "Chocolate Cookie", 12, "Freshly baked chocolate cookie with a crispy exterior and soft gooey center providing a perfect sweet snack for all ages.", 120, "cookie", "https://picsum.photos/200/300?9.jpg",
        80, 4.4, "Loved for its rich chocolate flavor and soft center that creates a comforting snack experience.", 0, 0),

    new Product(10, "Red Velvet Cupcake", 28, "Moist red velvet cupcake topped with creamy frosting delivering a rich flavor and beautiful presentation for special occasions.", 75, "cupcake", "https://picsum.photos/200/300?10.jpg",
        120, 4.9, "Frequently chosen for celebrations due to its vibrant appearance and perfectly balanced sweetness.", 3, 10),

    new Product(11, "Cheddar Cheese", 45, "Premium cheddar cheese aged perfectly to enhance its rich flavor making it ideal for sandwiches pasta dishes and gourmet recipes.", 30, "Diary&Cheese", "https://picsum.photos/200/300?11.jpg",
        300, 4.6, "Praised for its sharp flavor and smooth melting texture making it versatile for many recipes.", 5, 12),

    new Product(12, "Dinner Pasta", 55, "Italian style dinner pasta made from high quality durum wheat providing an authentic taste and texture for family meals.", 35, "Dinner", "https://picsum.photos/200/300?12.jpg",
        1000, 4.2, "Customers enjoy the authentic texture and reliable cooking results every time.", 6, 10),

    new Product(13, "Honey Bagel", 27, "Sweet honey glazed bagel baked fresh every day with natural ingredients and perfect for pairing with butter or cream cheese.", 55, "bagel", "https://picsum.photos/200/300?13.jpg",
        260, 4.5, "Appreciated for its subtle sweetness and soft texture that complements various toppings.", 2, 7),

    new Product(14, "Caramel Candy", 16, "Smooth caramel candy with a rich buttery flavor crafted carefully to melt in your mouth and satisfy your sweet cravings.", 85, "candy", "https://picsum.photos/200/300?14.jpg",
        90, 4.3, "Highly rated for its creamy consistency and long lasting caramel flavor.", 1, 5),

    new Product(15, "Black Beans", 32, "High quality black beans packed with protein and fiber suitable for soups stews and healthy balanced dishes.", 60, "beans", "https://picsum.photos/200/300?15.jpg",
        550, 4.1, "Customers value the consistent quality and rich flavor after cooking in traditional dishes.", 0, 0),

    new Product(16, "Butter Croissant", 25, "Flaky butter croissant baked with premium ingredients providing a soft interior and crispy outer layer ideal for breakfast.", 70, "bread", "https://picsum.photos/200/300?16.jpg",
        200, 4.7, "Loved for its flaky layers and buttery aroma that elevate breakfast moments.", 3, 10),

    new Product(17, "Blueberry Muffin", 30, "Delicious blueberry muffin bursting with fresh berries and baked to golden perfection for a delightful snack option.", 65, "breakfast", "https://picsum.photos/200/300?17.jpg",
        180, 4.4, "Praised for the generous amount of blueberries and moist texture inside.", 2, 6),

    new Product(18, "Chocolate Cake", 85, "Rich chocolate cake layered with smooth cocoa cream and decorated elegantly making it perfect for celebrations.", 25, "cake", "https://picsum.photos/200/300?18.jpg",
        950, 4.9, "Customers consistently rate this cake highly for its intense chocolate flavor and smooth frosting layers.", 8, 18),

    new Product(19, "Vanilla Cookie", 10, "Light and crispy vanilla cookie baked with natural flavors offering a sweet and satisfying bite every time.", 110, "cookie", "https://picsum.photos/200/300?19.jpg",
        70, 4.0, "A favorite snack for its light texture and balanced sweetness suitable for all ages.", 0, 0),

    new Product(20, "Cream Cheese", 40, "Soft and creamy cheese made from high quality dairy products ideal for spreads baking and gourmet cooking recipes.", 50, "Diary&Cheese", "https://picsum.photos/200/300?20.jpg",
        250, 4.6, "Customers appreciate the smooth texture and rich creamy taste perfect for both savory and sweet dishes.", 4, 10)
];

if(!localStorage.getItem("products")){
    saveProducts(dummyProducts);
}