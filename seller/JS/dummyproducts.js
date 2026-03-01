import { Product, saveProducts } from "../../component/Product.js";

export const dummyProducts = [

    new Product(1,1,"Apple",25,
        "Fresh red apples harvested from trusted farms. Crisp texture with natural sweetness and perfect balance of flavor. Ideal for snacking, juicing, baking, or adding to fruit salads for a healthy treat.",
        100,"Fresh Fruits","../../productList/images/apples.jpg",
        [1,2],4.6,[{
        uid:1,
        title:"Crisp and Sweet",
        rating:4.6,
        comment:"These apples are very fresh and juicy with a satisfying crunch and natural sweetness."
        }],10),

        new Product(2,1,"Avocado",15,
        "Premium ripe avocados rich in healthy fats and nutrients. Smooth creamy texture makes them perfect for salads, sandwiches, smoothies, and homemade guacamole recipes.",
        90,"Tropical Fruits","../../productList/images/avocado.webp",
        [1,2,3],4.5,[{
        uid:1,
        title:"Perfectly Ripe",
        rating:4.5,
        comment:"The avocados arrive fresh and creamy with excellent flavor and no bruising."
        }],5),

        new Product(3,1,"Banana",30,
        "Naturally sweet bananas packed with potassium and energy. Carefully selected for freshness and ideal for breakfast smoothies or healthy daily snacks.",
        120,"Tropical Fruits","../../productList/images/Banana.jpg",
        [1,2,3],4.4,[{
        uid:1,
        title:"Fresh and Sweet",
        rating:4.4,
        comment:"Soft texture with natural sweetness and great quality every time."
        }],0),

        new Product(4,1,"Red Berries",26,
        "Fresh mixed red berries packed with antioxidants and natural sweetness. Carefully selected for vibrant color and juicy texture, perfect for smoothies, desserts, fruit bowls, and healthy snacks.",
        80,"Berries","../../productList/images/redberries.jpg",
        [1,2],4.7,[{
        uid:1,
        title:"Sweet and Vibrant",
        rating:4.7,
        comment:"These red berries are extremely fresh, juicy, and full of natural sweetness with beautiful color."
        }],12),

        new Product(5,1,"BlackBerry",22,
        "Fresh blackberries packed with antioxidants and natural sweetness. Juicy and flavorful, ideal for smoothies, desserts, or healthy snacking.",
        75,"Berries","../../productList/images/BlackBerry.jpg",
        [1,2],4.3,[{
        uid:1,
        title:"Sweet and Juicy",
        rating:4.3,
        comment:"Very flavorful berries with perfect ripeness and freshness."
        }],8),

        new Product(6,1,"BlueBerry",18,
        "Premium blueberries carefully selected for quality and taste. Rich in nutrients and perfect for breakfast bowls, baking, and smoothies.",
        95,"Berries","../../productList/images/blueberry.webp",
        [1,2,3],4.2,[{
        uid:1,
        title:"Great for Smoothies",
        rating:4.2,
        comment:"Fresh blueberries with a nice balance of sweetness and tartness."
        }],5),

        new Product(7,1,"Cabbage",35,
        "Fresh green cabbage with tightly packed leaves and crisp texture. Perfect for salads, coleslaw, soups, and healthy home cooking.",
        60,"Leafy Vegetables","../../productList/images/cabbage.jpg",
        [1,2,3],4.5,[{
        uid:1,
        title:"Crunchy and Fresh",
        rating:4.5,
        comment:"Very fresh cabbage with crisp leaves and excellent flavor."
        }],12),

        new Product(8,1,"Cantalope",80,
        "Sweet and juicy cantaloupe melon with refreshing flavor. Carefully selected for ripeness and ideal for fruit salads or summer snacks.",
        40,"Tropical Fruits","../../productList/images/canatalope.jpg",
        [1,2,3],4.8,[{
        uid:1,
        title:"Extremely Sweet",
        rating:4.8,
        comment:"Very juicy and sweet with perfect ripeness and aroma."
        }],20),

        new Product(9,1,"Carrot",12,
        "Fresh organic carrots with vibrant orange color and natural sweetness. Great for salads, cooking, juicing, and healthy snacking.",
        150,"Root Vegetables","../../productList/images/carrots.jpg",
        [1,2],4.4,[{
        uid:1,
        title:"Crunchy and Sweet",
        rating:4.4,
        comment:"Firm texture and naturally sweet flavor. Very high quality."
        }],0),

        new Product(10,1,"Cauliflower",28,
        "Fresh white cauliflower heads packed with nutrients and mild flavor. Ideal for roasting, steaming, or healthy low carb recipes.",
        70,"Cruciferous Vegetables","../../productList/images/Cauliflower.webp",
        [1,2],4.6,[{
        uid:1,
        title:"Clean and Fresh",
        rating:4.6,
        comment:"Well packed and very fresh with no discoloration."
        }],10),

        new Product(11,1,"Coconut",45,
        "Natural whole coconuts with rich refreshing water and thick creamy flesh. Perfect for tropical dishes, desserts, and beverages.",
        50,"Tropical Fruits","../../productList/images/Coconut.webp",
        [1,2,5],4.6,[{
        uid:1,
        title:"Very Fresh Inside",
        rating:4.6,
        comment:"Fresh coconut water and soft tasty flesh inside."
        }],12),

        new Product(12,1,"Cucumber",55,
        "Cool and refreshing cucumbers with crisp texture and high water content. Excellent for salads, sandwiches, and detox drinks.",
        65,"Gourds","../../productList/images/cucumber.webp",
        [1,2,3],4.3,[{
        uid:1,
        title:"Crisp and Hydrating",
        rating:4.3,
        comment:"Very fresh cucumbers with crunchy texture and clean taste."
        }],10),

        new Product(13,1,"Grape Fruit",27,
        "Fresh grapefruit rich in vitamin C with balanced sweet and tangy flavor. Ideal for juices and healthy breakfasts.",
        70,"Citrus Fruits","../../productList/images/grapefruit.jpg",
        [1,2],4.4,[{
        uid:1,
        title:"Refreshing Taste",
        rating:4.4,
        comment:"Perfect balance between sweetness and citrus tanginess."
        }],7),

        new Product(14,1,"Green Coconut",16,
        "Tender green coconut filled with naturally refreshing coconut water. Hydrating and perfect for hot weather.",
        85,"Tropical Fruits","../../productList/images/greencoconut.jpg",
        [1,2,3],4.5,[{
        uid:1,
        title:"Very Refreshing",
        rating:4.5,
        comment:"Extremely refreshing coconut water with natural sweetness."
        }],5),

        new Product(15,1,"Guava",32,
        "Fresh guavas with sweet fragrance and soft juicy interior. Rich in vitamins and perfect for juices or fruit salads.",
        60,"Tropical Fruits","../../productList/images/Guava.jpg",
        [1,2,3],4.2,[{
        uid:1,
        title:"Aromatic and Sweet",
        rating:4.2,
        comment:"Delicious aroma and soft texture with natural sweetness."
        }],0),

        // new Product(16,1,"Lemon",25,
        // "Bright yellow lemons packed with vitamin C and strong citrus flavor. Perfect for cooking, baking, and refreshing drinks.",
        // 100,"Citrus Fruits","../../productList/images/Lemon.jpg",
        // [1,2],4.7,[{
        // uid:1,
        // title:"Strong Fresh Flavor",
        // rating:4.7,
        // comment:"Very fresh lemons with intense citrus aroma and juice."
        // }],10),

        new Product(17,1,"Orange",30,
        "Sweet and juicy oranges full of vitamin C. Easy to peel and perfect for fresh juice or healthy snacks.",
        110,"Citrus Fruits","../../productList/images/Orange.webp",
        [1,2],4.6,[{
        uid:1,
        title:"Juicy and Sweet",
        rating:4.6,
        comment:"Very juicy oranges with natural sweetness and freshness."
        }],6),

        new Product(18,1,"Papaya",85,
        "Ripe papayas with soft texture and tropical sweetness. Rich in nutrients and perfect for smoothies and fruit bowls.",
        45,"Tropical Fruits","../../productList/images/Papaya.jpg",
        [1,2,3],4.8,[{
        uid:1,
        title:"Soft and Delicious",
        rating:4.8,
        comment:"Perfectly ripe papaya with smooth texture and rich sweetness."
        }],18),

        new Product(19,1,"Peach",10,
        "Fresh peaches with soft skin and juicy interior. Naturally sweet and ideal for desserts or fresh consumption.",
        130,"Fresh Fruits","../../productList/images/Peach.jpg",
        [1,2],4.3,[{
        uid:1,
        title:"Very Juicy",
        rating:4.3,
        comment:"Sweet and juicy peaches with great freshness and flavor."
        }],0),

        new Product(20,1,"Tomato",40,
        "Fresh red tomatoes rich in flavor and nutrients. Perfect for salads, sauces, sandwiches, and everyday cooking.",
        95,"Gourds","../../productList/images/Tomato.jpg",
        [1,2,3],4.5,[{
        uid:1,
        title:"Rich Flavor",
        rating:4.5,
        comment:"Very fresh tomatoes with firm texture and delicious taste."
        }],10)

];



if(!localStorage.getItem("products")){
    saveProducts(dummyProducts);
}