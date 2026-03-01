import { Product, saveProducts } from "../../component/Product.js";

// export async function loadDummyProductsFromAPI(){
//     try {
//         const response =  await fetch("https://dummyjson.com/products/category/groceries");
//         const data = await response.json();

//         const categorySet = new Set();

//         data.products.forEach(p =>{
//             if(p.tags && Array.isArray(p.tags)){
//                 p.tags.forEach(tag => categorySet.add(tag));
//             }
//         });

//         Product.AllowedCategories = [...categorySet];
//         console.log("Allowed categories:", Product.AllowedCategories);

//         const products = data.products.map(p => {

//             const category = p.tags && p.tags.length > 0
//                 ? p.tags[0]
//                 :"uncategorized";

//             return new Product(
//                 p.id,
//                 1,
//                 p.title,
//                 p.price,
//                 formatDescription(p.description),
//                 p.stock,
//                 category,
//                 p.thumbnail,
//                 [1,2,3],
//                 p.rating,
//                 mapReviews(p.reviews),
//                 p.discountPercentage
//             );
//         });
//            saveProducts(products);
//            console.log("Product Saved Successfully");
//            return products;
//     }
//     catch(error){
//         console.error("Error loading products", error);
//     }
//     function formatDescription(desc){
//         if (desc.length >= 70) return desc;
//         return desc + "This product is part of our premium grocery collection carefully selected for quality and freshness."
//     }
//     function formatComment(comment){
//         if (comment.length >= 20) return comment;
//         return comment + "This product is part of our premium grocery collection carefully selected for quality and freshness."
//     }
//     function mapReviews(apiReviews){
//         if(!Array.isArray(apiReviews)) return [];
        
//         return apiReviews.map((r, index) =>({
//             uid: index + 1,
//             title: r.reviewerName || "Customer Review",
//             rating: r.rating,
//             comment: formatComment(r.comment)
//         }));
//     }  
     
// }
// if (!localStorage.getItem("products")) {
//         loadDummyProductsFromAPI();
//     } 

export const dummyProducts = [

    new Product(1,1,"Classic Bagel",25,
    "A delicious freshly baked bagel made from high quality wheat flour and natural ingredients. Perfect for breakfast with cream cheese and jam for a delightful start to your day.",
    0,"bagel","https://github.com/ZahwaKandeel/VegistProject/blob/22610efb153e6dfb66792b2137e81b4b90732971/productList/images/apples.jpg",
    [1,2],4.5,
    [{
        uid:1,
        title:"Fresh and Soft",
        rating:4.5,
        comment:"This bagel is consistently fresh and soft with an amazing texture that makes breakfast much more enjoyable every single time."
    }],
    10),

    new Product(2,1,"Chocolate Candy",15,
    "Rich chocolate candy crafted from premium cocoa beans blended smoothly to create a sweet and satisfying treat loved by both kids and adults everywhere.",
    100,"candy","https://picsum.photos/200/300?2.jpg",
    [1,2,3],4.2,
    [{
        uid:1,
        title:"Perfect Sweet Balance",
        rating:4.2,
        comment:"The chocolate has a perfectly balanced sweetness and smooth texture making it enjoyable without feeling overly heavy or sugary."
    }],
    5),

    new Product(3,1,"Green Beans Pack",30,
    "Fresh organic green beans carefully selected from trusted farms to ensure high quality and nutritional value suitable for healthy meals and balanced diets.",
    40,"beans","https://picsum.photos/200/300?3.jpg",
    [1,2,3,5],4.0,
    [{
        uid:1,
        title:"Very Fresh Quality",
        rating:4.0,
        comment:"These beans are always fresh and vibrant in color and they remain crisp and flavorful even after cooking for longer periods."
    }],
    0),

    new Product(4,1,"Best Seller Bread",20,
    "Our bestselling bread baked daily with love and care to provide a soft texture and golden crust ideal for sandwiches and breakfast meals.",
    70,"bestseller","https://picsum.photos/200/300?4.jpg",
    [1,2],4.7,
    [{
        uid:1,
        title:"Soft with Great Crust",
        rating:4.7,
        comment:"The texture is incredibly soft with a beautiful crust and it stays fresh longer than most other bread options available."
    }],
    15),

    new Product(5,1,"Whole Wheat Bread",22,
    "Nutritious whole wheat bread made from 100 percent natural grains providing fiber and essential nutrients to support a healthy lifestyle.",
    60,"bread","https://picsum.photos/200/300?5.jpg",
    [1,2],4.3,
    [{
        uid:1,
        title:"Healthy Choice",
        rating:4.3,
        comment:"Healthy and delicious with a rich whole wheat flavor that makes it perfect for anyone trying to maintain a balanced diet."
    }],
    8),

    new Product(6,1,"Vanilla Biscuit",18,
    "Crunchy vanilla flavored biscuit baked to perfection offering a delightful snack option for tea time and quick energy breaks during busy days.",
    90,"biscuite","https://picsum.photos/200/300?6.jpg",
    [1,2,3],4.1,
    [{
        uid:1,
        title:"Crispy and Aromatic",
        rating:4.1,
        comment:"Crispy texture with a pleasant vanilla aroma that makes it a perfect companion for tea or coffee breaks."
    }],
    5),

    new Product(7,1,"Breakfast Cereal",35,
    "Healthy breakfast cereal enriched with vitamins and minerals to give you sustained energy and a nutritious start every single morning.",
    45,"breakfast","https://picsum.photos/200/300?7.jpg",
    [1,2,3],4.6,
    [{
        uid:1,
        title:"Nutritious Option",
        rating:4.6,
        comment:"Very nutritious and not overly sweet which makes it ideal for both kids and adults every morning."
    }],
    12),

    new Product(8,1,"Strawberry Cake",80,
    "Soft sponge cake layered with fresh strawberry cream filling and topped with natural fruit slices for a refreshing dessert experience.",
    20,"cake","https://picsum.photos/200/300?8.jpg",
    [1,2,3],4.8,
    [{
        uid:1,
        title:"Light and Delicious",
        rating:4.8,
        comment:"The strawberries taste fresh and the cream is light and fluffy making every bite extremely enjoyable."
    }],
    20),

    new Product(9,1,"Chocolate Cookie",12,
    "Freshly baked chocolate cookie with a crispy exterior and soft gooey center providing a perfect sweet snack for all ages.",
    120,"cookie","https://picsum.photos/200/300?9.jpg",
    [1,2],4.4,
    [{
        uid:1,
        title:"Rich Chocolate Flavor",
        rating:4.4,
        comment:"Rich chocolate flavor with a soft center that makes it comforting and delicious every time."
    }],
    0),

    new Product(10,1,"Red Velvet Cupcake",28,
    "Moist red velvet cupcake topped with creamy frosting delivering a rich flavor and beautiful presentation for special occasions.",
    75,"cupcake","https://picsum.photos/200/300?10.jpg",
    [1,2],4.9,
    [{
        uid:1,
        title:"Perfect for Celebrations",
        rating:4.9,
        comment:"Beautiful presentation and perfectly balanced sweetness making it ideal for birthdays and celebrations."
    }],
    10),

    new Product(11,1,"Cheddar Cheese",45,
    "Premium cheddar cheese aged perfectly to enhance its rich flavor making it ideal for sandwiches pasta dishes and gourmet recipes.",
    30,"Diary&Cheese","https://picsum.photos/200/300?11.jpg",
    [1,2,5],4.6,
    [{
        uid:1,
        title:"Excellent Melting",
        rating:4.6,
        comment:"Sharp rich flavor with excellent melting quality that works well in many recipes and dishes."
    }],
    12),

    new Product(12,1,"Dinner Pasta",55,
    "Italian style dinner pasta made from high quality durum wheat providing an authentic taste and texture for family meals.",
    35,"Dinner","https://picsum.photos/200/300?12.jpg",
    [1,2,3,5],4.2,
    [{
        uid:1,
        title:"Authentic Texture",
        rating:4.2,
        comment:"Authentic texture and consistent cooking results that make family dinners easy and enjoyable."
    }],
    10),

    new Product(13,1,"Honey Bagel",27,
    "Sweet honey glazed bagel baked fresh every day with natural ingredients and perfect for pairing with butter or cream cheese.",
    55,"bagel","https://picsum.photos/200/300?13.jpg",
    [1,2],4.5,
    [{
        uid:1,
        title:"Sweet and Soft",
        rating:4.5,
        comment:"Subtle honey sweetness combined with a soft texture makes this bagel absolutely delicious."
    }],
    7),

    new Product(14,1,"Caramel Candy",16,
    "Smooth caramel candy with a rich buttery flavor crafted carefully to melt in your mouth and satisfy your sweet cravings.",
    85,"candy","https://picsum.photos/200/300?14.jpg",
    [1,2,3],4.3,
    [{
        uid:1,
        title:"Creamy Caramel Taste",
        rating:4.3,
        comment:"Creamy and rich caramel taste that lasts long and feels premium compared to other brands."
    }],
    5),

    new Product(15,1,"Black Beans",32,
    "High quality black beans packed with protein and fiber suitable for soups stews and healthy balanced dishes.",
    60,"beans","https://picsum.photos/200/300?15.jpg",
    [1,2,3,5],4.1,
    [{
        uid:1,
        title:"Great for Recipes",
        rating:4.1,
        comment:"Consistent quality and excellent flavor after cooking making it perfect for traditional recipes."
    }],
    0),

    new Product(16,1,"Butter Croissant",25,
    "Flaky butter croissant baked with premium ingredients providing a soft interior and crispy outer layer ideal for breakfast.",
    70,"bread","https://picsum.photos/200/300?16.jpg",
    [1,2],4.7,
    [{
        uid:1,
        title:"Buttery and Flaky",
        rating:4.7,
        comment:"Flaky layers with a strong buttery aroma that truly elevates any breakfast experience."
    }],
    10),

    new Product(17,1,"Blueberry Muffin",30,
    "Delicious blueberry muffin bursting with fresh berries and baked to golden perfection for a delightful snack option.",
    65,"breakfast","https://picsum.photos/200/300?17.jpg",
    [1,2],4.4,
    [{
        uid:1,
        title:"Full of Berries",
        rating:4.4,
        comment:"Generous amount of blueberries with a moist interior that stays soft even after a day."
    }],
    6),

    new Product(18,1,"Chocolate Cake",85,
    "Rich chocolate cake layered with smooth cocoa cream and decorated elegantly making it perfect for celebrations.",
    25,"cake","https://picsum.photos/200/300?18.jpg",
    [1,2,3],4.9,
    [{
        uid:1,
        title:"Outstanding Chocolate",
        rating:4.9,
        comment:"Intense chocolate flavor combined with smooth frosting layers makes this cake outstanding."
    }],
    18),

    new Product(19,1,"Vanilla Cookie",10,
    "Light and crispy vanilla cookie baked with natural flavors offering a sweet and satisfying bite every time.",
    110,"cookie","https://picsum.photos/200/300?19.jpg",
    [1,2],4.0,
    [{
        uid:1,
        title:"Light and Tasty",
        rating:4.0,
        comment:"Light texture with balanced sweetness making it suitable for both kids and adults."
    }],
    0),

    new Product(20,1,"Cream Cheese",40,
    "Soft and creamy cheese made from high quality dairy products ideal for spreads baking and gourmet cooking recipes.",
    50,"Diary&Cheese","https://picsum.photos/200/300?20.jpg",
    [1,2,3],4.6,
    [{
        uid:1,
        title:"Smooth and Rich",
        rating:4.6,
        comment:"Smooth creamy consistency and rich flavor that works perfectly in both savory and sweet dishes."
    }],
    10)

];


if(!localStorage.getItem("products")){
    saveProducts(dummyProducts);
}