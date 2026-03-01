import { User } from "/models/user.js"
export class Product{
    constructor(id,sellerId, name, price, description, stock, category, imageUrl, sizes, rating, reviews, discountPercentage){
        this.ID =id;
        this.SellerId = sellerId;
        this.Name = name;
        this.Price = price;
        this.Description = description;
        this.Stock = stock;
        this.Category = category;
        this.ImageUrl = imageUrl;
        this.Sizes = sizes;
        this.Rating = rating;
        this.Reviews = reviews || [];
        this.DiscountPercentage = discountPercentage;
    }



    set ID(id)
    {
        if(id>0)
        this._id = id;
    }
    get ID()
    {
        return this._id
    }
    set SellerId(sellerId)
    {
        // if(!Number.isInteger(sellerId)||sellerId<=0)
        //     throw new Error("Seller ID must be positive integer")
        
        // const users = JSON.parse(localStorage.getItem("Users")) || [];
        // const seller = users.find(u => u.id === sellerId)
        // if(!seller)
        //     throw new Error("Seller does not exist");
        // if(seller.role!== "seller")
        //     throw new Error("User is not a seller");

        this._sellerId = sellerId;
    }
    get SellerId()
    {
        return this._sellerId
    }
    set Name(name)
    {
        if(name.length<3) throw new Error("Name must be at least 3 characters");
        this._name = name;
    }
    get Name()
    {
        return this._name;
    }

    set Price(price)
    {
        if(price <= 0) throw new Error("Price cannot be 0 or negative");
        this._price = price;
    }
    get Price()
    {
        return this._price;
    }
    
    set Description(description)
    {
        if(description.length<100)
            throw new Error("Description must be at least 100 characters")
        this._description = description;
    }
    get Description()
    {
        return this._description;
    }

    set Stock(stock)
    {
        if(stock < 0) throw new Error("Stock cannot be negative");
        this._stock = stock;
    }
    get Stock()
    {
        return this._stock;
    }

    set Category(category)
    {
        const allowed = ["bagel", "candy", "beans", "bestseller", "bread",
            "biscuite", "breakfast", "cake", "cookie",
            "cupcake", "Diary&Cheese", "Dinner"];
        if(!allowed.includes(category))
            throw new Error("Invalid Category");
        this._category = category;
    }
    get Category()
    {
        return this._category;
    }

    set ImageUrl(imageUrl)
    {
        const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/i;
        const base64Pattern = /^data:image\/(png|jpg|jpeg|webp);base64,/i;
        if(!urlPattern.test(imageUrl) && !base64Pattern.test(imageUrl))
            throw new Error("Invalid image URL or Base64 image");
        this._imageUrl = imageUrl;
    }
    get ImageUrl()
    {
        return this._imageUrl;
    }

    set Sizes(sizes)
    {
        if(!Array.isArray(sizes)) throw new Error("Sizes must be an array of sizes")
        sizes.forEach(size =>{
            if(size <= 0) throw new Error("Sizes cannot be 0 or negative");
        });
        this._sizes = sizes;
        
    }
    get Sizes()
    {
        return this._sizes;
    }

    set Rating(rating)
    {
        if(rating < 0 || rating >5) throw new Error("Rating must be a number between 1 and 5");
        this._rating = rating;
    }
    get Rating()
    {
        return this._rating;
    }
  
    set Reviews(reviews)
    {
        if(!Array.isArray(reviews)) throw new Error("Reviews must be an array");
        reviews.forEach(review =>{
            if(typeof review !== "object" || review === null)
                throw new Error("Each review must be an object");
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            
            const {uid = currentUser.id, title, rating, comment} = review;
            if((uid == null ) || (title == review) || (rating == review) || (comment == review))
                throw new Error("Review must contain userId, title, rating and comment properties");
            if(typeof title !== "string" || title.trim().length<5)
                throw new Error("Title length must be at least 5 characters");
            if(typeof uid !== "number" || uid.length<0)
                throw new Error("UserId invalid");
            if(typeof rating !== "number" || rating.length<0)
                throw new Error("Rating invalid")
            if(typeof comment !== "string" || comment.trim().length<10)
                throw new Error("Comment length must be at least 50 characters");
        });
        this._reviews = reviews;
        if(reviews.length>0){
            let total = 0;
            reviews.forEach(review => {
                total += review.rating                
            });
            this._rating = Number((total/reviews.length).toFixed(2));
        }else{
            this.rating = 0;
        }
    }
    get Reviews()
    {
        return this._reviews;
    }


    set DiscountPercentage(discountPercentage)
    {
        if(discountPercentage<0) throw new Error("Discounts must be positive");
        this._discountPercentage = discountPercentage;
    }
    get DiscountPercentage()
    {
        return this._discountPercentage;
    }
}
export function saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }

export function loadProducts(){
    let data = localStorage.getItem("products");
    if(!data) return;
    
    let parsed = JSON.parse(data);
    return parsed.map(p => new Product(
        p._id,
        p._sellerId,
        p._name,
        p._price,
        p._description,
        p._stock,
        p._category,
        p._imageUrl,
        p._sizes,
        p._rating,
        p._reviews,
        p._discountPercentage
    ));
}

export function editProduct(productID, updatedData){
    
    let products = JSON.parse(localStorage.getItem("products")) || [];

    products = products.map(p => new Product(
        p._id,
        p._sellerId,
        p._name,
        p._price,
        p._description,
        p._stock,
        p._category,
        p._imageUrl,
        p._sizes,
        p._rating,
        p._reviews,
        p._discountPercentage
    ));

    let product = products.find(p => p.ID === productID);

    if (!product){
        console.log("Product not found");
        return false;
    }

    if(updatedData.name !== undefined)
        product.Name = updatedData.name;

    if(updatedData.price !== undefined)
        product.Price = updatedData.price;
    
    if(updatedData.description !== undefined)
        product.Description = updatedData.description;
    
    if(updatedData.stock !== undefined)
        product.Stock = updatedData.stock;
    
    if(updatedData.category !== undefined)
        product.Category = updatedData.category;
    
    if(updatedData.imageUrl !== undefined)
        product.ImageUrl = updatedData.imageUrl;

    if(updatedData.sizes !== undefined)
        product.Sizes = updatedData.sizes;

    if(updatedData.rating !== undefined)
        product.Rating = updatedData.rating;

    if(updatedData.reviews !== undefined)
        product.Reviews = updatedData.reviews;

    if(updatedData.discountPercentage !== undefined)
        product.DiscountPercentage = updatedData.discountPercentage;
    
    localStorage.setItem("products", JSON.stringify(products));

    return true;
    
}

