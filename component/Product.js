export class Product{
    constructor(id, name, price, description, stock, category, imageUrl, sizes, rating, reviews, discountValue, discountPercentage){
        this.ID =id;
        this.Name = name;
        this.Price = price;
        this.Description = description;
        this.Stock = stock;
        this.Category = category;
        this.ImageUrl = imageUrl;
        this.Sizes = sizes;
        this.Rating = rating;
        this.Reviews = reviews || [];
        this.DiscountValue = discountValue;
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
        if(!urlPattern.test(imageUrl))
            throw new Error("Invalid image URL")
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
  
    // set Reviews(reviews)
    // {
    //     if(!Array.isArray(reviews)) throw new Error("Reviews must be an array");
    //     reviews.forEach(review =>{
    //         if(typeof review !== "object" || review === null)
    //             throw new Error("Each review must be an object");
    //         if(!("name" in review) || !("comment" in review))
    //             throw new Error("Review must contain name and comment properties");
    //         if(typeof review.name !== "string" || review.name.trim().length<3)
    //             throw new Error("Reviewers name must be at least 3 characters");
    //         if(typeof review.comment !== "string" || review.comment.trim().length.length<50)
    //             throw new Error("Comment length must be at least 50 characters");
    //     });
    //     this._reviews = reviews;
    // }
    // get Reviews()
    // {
    //     return this._reviews;
    // }

    set DiscountValue(discountValue)
    {
        if(discountValue<0) throw new Error("Discounts values cannot be negative");
        this._discountValue = discountValue;
    }
    get DiscountValue()
    {
        return this._discountValue;
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
        p._name,
        p._price,
        p._description,
        p._stock,
        p._category,
        p._imageUrl,
        p._sizes,
        p._rating,
        p._reviews,
        p._discountValue,
        p._discountPercentage
    ));
}

export function editProduct(productID, updatedData){
    
    let products = JSON.parse(localStorage.getItem("products")) || [];

    products = products.map(p => new Product(
        p._id,
        p._name,
        p._price,
        p._description,
        p._stock,
        p._category,
        p._imageUrl,
        p._sizes,
        p._rating,
        p._reviews,
        p._discountValue,
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

    if(updatedData.discountValue !== undefined)
        product.DiscountValue = updatedData.discountValue;

    if(updatedData.discountPercentage !== undefined)
        product.DiscountPercentage = updatedData.discountPercentage;
    
    localStorage.setItem("products", JSON.stringify(products));

    return true;
    
}

    const review =[
         {
        id:"",
        userId:"",
        review:"lkadjfldskjfld;kfja kljdlfjslkdj ;lkjsdflkdsjfldskjk jslakdjff",
        rating:4
    },
       {
        review:"lkadjfldskjfld;kfja kljdlfjslkdj ;lkjsdflkdsjfldskjk jslakdjff",
        rating:2
    },   {
        review:"lkadjfldskjfld;kfja kljdlfjslkdj ;lkjsdflkdsjfldskjk jslakdjff",
        rating:4
    },   {
        review:"lkadjfldskjfld;kfja kljdlfjslkdj ;lkjsdflkdsjfldskjk jslakdjff",
        rating:1
    },   {
        review:"lkadjfldskjfld;kfja kljdlfjslkdj ;lkjsdflkdsjfldskjk jslakdjff",
        rating:4
    },   {
        review:"lkadjfldskjfld;kfja kljdlfjslkdj ;lkjsdflkdsjfldskjk jslakdjff",
        rating:5
    },
    ]

let totalRating = 0
review.forEach(i=>{
    totalRating+= i.rating
})

const finalRating = totalRating / review.length