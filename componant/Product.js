export class Product{
    constructor(id, name, price, description, stock, category, imageUrl){
        this._id =id;
        this._name = name;
        this._price = price;
        this._description = description;
        this._stock = stock;
        this._category = category;
        this._imageUrl = imageUrl;
    }

    set ID(_id)
    {
        if(_id>0)
        this._id = _id;
    }
    get ID()
    {
        return this.id
    }
    
    set Name(_name)
    {

        this.name = _name;
    }
    get Name()
    {
        return this.name;
    }

    set Price(_price)
    {
        if(_price < 0) throw new Error("Rice cannot be negative");
        this.price = _price;
    }

    get Price()
    {
        return this.price;
    }
    
    set Description(_description)
    {
        this.description = _description;
    }
    get Description()
    {
        return this.description;
    }

    set Stock(_stock)
    {
        if(_stock < 0) throw new Error("Stock cannot be negative");
        this.stock = _stock;
    }
    get Stock()
    {
        return this.stock;
    }

    set Category(_category)
    {
        this.category = _category;
    }
    get Category()
    {
        return this.category;
    }

    set ImageUrl(_imageUrl)
    {
        this.imageUrl = _imageUrl;
    }
    get ImageUrl()
    {
        return this.imageUrl;
    }
}