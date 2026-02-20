export class Product{
    constructor(id, name, price, description, stock, category, imageUrl){
        this.ID =id;
        this.Name = name;
        this.Price = price;
        this.Description = description;
        this.Stock = stock;
        this.Category = category;
        this.ImageUrl = imageUrl;
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
        p._imageUrl
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

    localStorage.setItem("products", JSON.stringify(products));

    return true;
    
}