import { loadProducts } from "../../component/Product.js";

document.addEventListener("DOMContentLoaded", function () {

    // 1️⃣ Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    if (!id) {
        console.log("No product ID found in URL");
        return;
    }

    // 2️⃣ Load products from localStorage
    const products = loadProducts();

    if (!products || products.length === 0) {
        console.log("No products found in storage");
        return;
    }

    // 3️⃣ Find selected product
    const product = products.find(p => p.ID === id);

    if (!product) {
        console.log("Product not found");
        return;
    }

    // 4️⃣ Inject data into page
    renderProduct(product);
});

function renderProduct(product) {
    document.querySelector("h2").textContent = product.Name;
    document.querySelector(".fs-4").textContent = `€${product.Price}`;
    document.querySelector(".text-muted.small").textContent = product.Description;
    document.querySelector(".text-success").textContent = `● ${product.Stock} in stock`;
    const skuElements = document.querySelectorAll("span.text-muted");
    skuElements[skuElements.length - 1].textContent = product.ID;
    document.querySelector(".carousel-item.active img").src = product.ImageUrl;

    // Render Sizes
    const sizeContainer = document.querySelector("#sizeContainer"); // add id in HTML
    sizeContainer.innerHTML = product.Sizes.map(s => `<button class="btn btn-outline-warning me-2">${s}</button>`).join("");

    // Render Materials
    const materialContainer = document.querySelector("#materialContainer"); // add id in HTML
    materialContainer.innerHTML = product.Materials.map(m => `<button class="btn btn-outline-warning me-2">${m}</button>`).join("");
}


$(document).ready(function () {
    // Wishlist Link
    $('.bi-heart').closest('a').on('click', function(e) {
        e.preventDefault();
        window.location.href = "../../wishlist/Template/wishlist.html";
    });
});