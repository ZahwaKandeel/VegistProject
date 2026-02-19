// Product prototype

const resetDB = () => {
    const Product = [
        {
            id: 0,
            title: "",
            rating: {
                total: 10,
                count: 2,
            },
            stock: 0,
            description: "",
            size: [""],
            matiral: [""],
            qty: 0,
            serial: "",
            details: "Rich text",
            images: ["path"],
            price: 0,
            sale: 0,
            discountvalue: 0,
            discountPercentage: 0, // %
        },
    ];
    localStorage.setItem("Products", JSON.stringify(Product));
};
// const product = {
//     form.title,
//     form.description,
//     form.stock
//     rating:{
//         total:0,
//         count:0
//     }
// }


// GET products
const getDB=()=>{
    const products = localStorage.getItem("Product")
    return JSON.parse(products)
}

// SET products
const addProduct = (product)=>{
    const products = getDB()
    products.push(product)
    localStorage.setItem("Product",JSON.stringify(products))
}