import {Product, loadProducts,saveProducts,} from "../../component/Product.js";
import { Order } from "/models/order.js";
import { deleteProductById } from "/component/deleteProduct.js";
import { isAuth } from "../../component/isAuth.js";

// Load products from localStorage
let products = loadProducts() || [];

// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const idParam = Number(params.get("id"));

let selectedSize = 1;
let pricePerKg = 0;
let finalPricePerKg = 0;
let product = null;

$(function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    });

if (idParam === null) {
    console.log("No product ID found in URL");
} else {
    if (products.length === 0) {
        console.log("No products found in localStorage");
    } else {
        product = products.find((p) => p._id === idParam);

        if (!product) {
            console.log("Product not found");
        } else {
            // Fill main product info
            document.getElementById("name").innerText = product._name;
            document.getElementById("productPrice");
            document.getElementById("productStock").innerHTML =
                `<strong>Availability:</strong> <span class="text-success">● ${product.Stock} in stock</span>`;
            document.getElementById("productDescription").textContent =
                product.Description;
            document.getElementById("productSKU").textContent = product._id;
            document.getElementById("category").textContent = product.Category;
            document.getElementById("table-productsize").textContent =
                product.Sizes.join(" - ");
            document.getElementById("moreDetail").textContent =
                product.Description;
            document.getElementById("table-productCategory").textContent =
                product.Category;
            document.getElementById("table-productSKU").textContent =
                product._id;
            $("#discount").text(`${product._discountPercentage}%`);

            // Carousel images
            const carouselImages =
                document.querySelectorAll("#carouselVeg img");
            carouselImages.forEach((img) => (img.src = product.ImageUrl));

            // Thumbnail images
            const thumbImages = document.querySelectorAll(
                ".d-flex.justify-content-evenly img",
            );
            thumbImages.forEach((img) => (img.src = product.ImageUrl));

            // Discount info
            const priceContainer = document.getElementById("productPrice");
            function getFinalPrice(product) {
                const price = Number(product._price);
                const discount = Number(product._discountPercentage) || 0;

                if (discount > 0) {
                    const discounted = price - price * (discount / 100);
                    return Math.max(0, discounted);
                }
                return price;
            }
            const finalPrice = getFinalPrice(product);

            finalPricePerKg = finalPrice; // discounted 1KG price
            pricePerKg = finalPricePerKg; // initial price per KG

            const productafterDiscount = $("#productAfterDiscount");
            const productPrice = $("#productPrice");
            const originalPrice = product._price;

            if (finalPrice < originalPrice) {
                productafterDiscount.text("€" + finalPrice);
                productPrice.text("€" + originalPrice);
            } else {
                productafterDiscount.text("€" + finalPrice);
            }

            // Wishlist
            $(document).ready(function () {
                $(".bi-heart").on("click", function (e) {
                    e.preventDefault();
                    if (product) {
                        addToWishlist(product._id);
                    }
                });
            });

            // Quantity
            let value = parseInt($("#quantityValue").val());

            $(document).on("click", ".qty-plus", function () {
                if (value >= product.Stock) return;
                value++;
                $(".qty-input").val(value);
            });

            $(document).on("click", ".qty-minus", function () {
                if (value > 1) value--;
                $(".qty-input").val(value);
            });

            // Add to Cart
            $(document).ready(function () {
                $("#addToCart").on("click", function (e) {
                    e.preventDefault();
                    if (product) {
                        let quantity = parseInt($("#quantityValue").val());
                        if (quantity > product.Stock) return;
                        let selectedSize = $(
                            'input[name="size_choice"]:checked',
                        ).val();
                        let totalPrice = pricePerKg * quantity;
                        addToCart(product._id, quantity, selectedSize);
                        alert("Product added to your cart");
                    }
                });
            });

            //Back to Catalog
            $(".backToCatalog").on("click", function () {
                window.location.href ="../../productList/Template/product_list.html";
                
            });

            // Remove product (Seller page)
            $(document).ready(function () {
                $(".removeProduct").on("click", function (e) {
                    e.preventDefault();
                    if (product) {
                        alert("Are you sure of deleting that product ?");
                        deleteProductById(product._id);
                        window.location.href ="/productList/Template/product_list.html";
                    }
                });
            });

            // Buy it now
            function buyItNow() {
                let currentQty = parseInt($("#quantityValue").val()) || 1;
                let currentSize =
                    parseFloat($('input[name="size_choice"]:checked').val()) ||
                    1;

                let freshSubtotal = finalPricePerKg * currentQty * currentSize;

                let currentOrder = new Order({
                    id: Date.now(),
                    sellerId: 1,
                    cart: [
                        {
                            product_id: idParam,
                            quantity: value,
                            size: selectedSize,
                            price: finalPricePerKg * currentSize,
                        },
                    ],
                    createdAt: new Date(),
                    shipping: {
                        fristName: "",
                        lastName: "",
                        phone: "",
                        country: "",
                        fullAddress: "",
                        appartment: "",
                        postalCode: "",
                        City: "",
                        shipping_fees: null,
                    },
                    subtotal: freshSubtotal,
                    discount_code: "",
                    special_instructions: "",
                });

                localStorage.setItem(
                    "currentOrder",
                    JSON.stringify(currentOrder),
                );
            }
            $(document).ready(function () {
                $("#buyItNow").on("click", function () {
                    buyItNow();
                    window.location.href =
                        "../../checkOut/Template/checkOut.html";
                });
            });

            // Sizes
            $(".sizediv").empty();
            product.Sizes.forEach((item, index) => {
                let sizeId = `size_${index}`;
                $(".sizediv").append(`
                <input type="radio" class="btn-check" name="size_choice" id="${sizeId}" value="${item}" ${index === 0 ? "checked" : ""} autocomplete="off">
                <label class="btn btn-outline-warning rounded-pill px-4 me-2" for="${sizeId}">${item}KG</label>
            `);
            });

            // Update price when size changes
            $(document).on("change", 'input[name="size_choice"]', function () {
                selectedSize = parseFloat($(this).val());

                let originalPrice = Number(product._price);

                let newOriginalPrice = selectedSize * originalPrice;
                let newAfterDiscount = selectedSize * finalPricePerKg;

                //update global pricePerKg (price of selected size)
                pricePerKg = finalPricePerKg * selectedSize;

                if (product._discountPercentage > 0) {
                    $("#productAfterDiscount").text(
                        "€" + newAfterDiscount.toFixed(2),
                    );
                    $("#productPrice").text("€" + newOriginalPrice.toFixed(2));
                    $("#discount").text(product._discountPercentage + "%");
                } else {
                    $("#productAfterDiscount").text(
                        "€" + newAfterDiscount.toFixed(2),
                    );
                    $("#productPrice").text("");
                    $("#discount").text("");
                }
            });

            // Related products
            function loadRelatedProducts() {
                if (!product || products.length === 0) return;

                let related = products
                    .filter((p) => p.ID !== product._id)
                    .slice(0, 4);
                let cards = $(".cardsRelatedProducts");

                const user = isAuth(); //get currentUser
                const detailsPage =
                    user?.role == "seller"
                        ? "../../productDetails/Template/SellerProductDetaill.html"
                        : "../../productDetails/Template/productDetails.html";

                related.forEach((p) => {
                    cards.append(
                        `
                        <div id="${p.ID}" class="cards  col-6  col-md-4  col-lg-3   position-relative "> <!--div of card 1 -->
                        <div class="card-image">
                            <a href="${detailsPage}?id=${p.ID}">
                            <img src="${p.ImageUrl}" class="img-fluid w-100 main-img">
                            <img src="" class="img-fluid w-100  hover-img position-absolute top-0 start-0">
                            <!-- discount -->
                            ${
                                p._discountPercentage
                                    ? `
                            <div class="badge position-absolute top-0 end-0 text-white px-3 py-2 mt-2 me-3 rounded-5" style="background-color:#e30514;">
                            ${p._discountPercentage}% 
                            </div>`
                                    : ``
                            }
                            </a>
                            
                            <div class="icons" style="margin-bottom: 100px ;">
                            <span class="  p-2   "  >
                            <i class="fa-regular fa-heart "></i>
                            </span>
                            <span class="  p-2   ">
                                <i class="fa fa-shopping-bag"></i>
                            </span>
                            <!-- add that part to work the popup -->
                            <span class=" p-2"
                                data-bs-toggle="modal"
                                data-bs-target="#quickViewModal"
                                style="cursor: pointer;">
                            <i class="fa fa-eye"></i> <!--  opens the popup -->
                            </span> 
                            </div>
                        </div> 
                        <div>
                        <p class=""> <a href=""  class="name text-decoration-none text-black" >${p.Name}</a></p>
                                <p class="price fw-bold">€${p.Price}</p>
                            <div class="d-flex align-items-center  "> <!-- review by stars -->
                            <div class="text-warning me-2 rating">
                                
                            </div>
                            <span class="text-muted ratingspa"></span>
                        </div>
                        </div>
                    
                    </div>  <!--end  of card 1 -->
                        `,
                    )

                    const card = $(`#${p.ID}`);
                    const divstars = card.find(".rating");
                    let rating = 0;
                        divstars.empty();
                        if (p._reviews && p._reviews.length > 0) {
                            let total = 0;
                            p._reviews.forEach((review)=>{
                                total += review.rating;
                            });
                            rating = Number((total / p._reviews.length).toFixed(2));
                    }
                    function generateStars(rating){
                    divstars.empty();
                        for (let i = 0; i < 5; i++) {
                            if (i < Math.floor(rating))
                                divstars.append(`<i class="bi bi-star-fill"></i>`);
                            else divstars.append(`<i class="bi bi-star"></i>`);
                        }
                    }
                    generateStars(rating, divstars);
                });
            }
            loadRelatedProducts();

            // Wishlist icon beside the popup
            $(document).on("click", ".fa-heart", function () {
                const cardId = parseInt($(this).closest(".cards").attr("id"));
                const product = products.find((p) => p.ID === cardId);
                if (!product) return;
                addToWishlist(product._id);
                alert("Product added to your wishlist");
            });

            // Shopping bag icon beside the popup
            $(document).on("click", ".fa-shopping-bag", function () {
                const cardId = parseInt($(this).closest(".cards").attr("id"));
                const product = products.find((p) => p.ID === cardId);
                if (!product) return;
                // Replace quantity & size with defaults
                addToCart(product._id, 1, product.Sizes[0]);
                alert("Product added to your cart");
            });

            //Stars Rating inside review
            const stars = document.querySelectorAll(".star");
            const ratingInput = document.getElementById("reviewRating");

            stars.forEach((star) => {
                star.addEventListener("click", function () {
                    const value = this.getAttribute("data-value");
                    ratingInput.value = value;

                    // Reset all stars
                    stars.forEach((s) => {
                        s.classList.remove("bi-star-fill");
                        s.classList.add("bi-star");
                    });

                    // Fill stars up to selected value
                    for (let i = 0; i < value; i++) {
                        stars[i].classList.remove("bi-star");
                        stars[i].classList.add("bi-star-fill");
                    }
                });
            });

            // get currentuser email and name
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const userEmail = currentUser ? currentUser.email : "";
            const userName = currentUser ? currentUser.firstName : "";

            // Find current product
            const currentProduct = products.find(
                (p) => p._id === Number(idParam),
            );

            //Get existing reviews
            const reviews = currentProduct._reviews;

            document.getElementById("reviewName").value = userName;
            document.getElementById("reviewEmail").value = userEmail;

            let review_rating;

            const reviewForm = document.getElementById("reviewForm");
            const reviewTitleInput = document.getElementById("reviewTitle");
            const userRatingInput = document.getElementById("reviewRating");
            const userContentInput = document.getElementById("reviewContent");

            function isTitalValid(title) {
                const trimmed = title.trim();
                const regex = /^[A-Za-z0-9 ]{5,20}$/;
                return regex.test(trimmed);
            }

            function isContentValid(comment) {
                const trimmed = comment.trim();
                const regex = /^[A-Za-z0-9 ]{10,100}$/;
                return regex.test(trimmed);
            }

            function setValidation(input, isValid) {
                if (isValid) {
                    input.classList.remove("is-invalid");
                    input.classList.add("is-valid");
                } else {
                    input.classList.remove("is-valid");
                    input.classList.add("is-invalid");
                }
            }

            //Save the review
            reviewForm.addEventListener("submit", function (e) {
                e.preventDefault();

                if (!currentUser || !currentUser.id) {
                    alert("You must be logged in to write a review!");
                    return;
                }

                if (!idParam) return;

                const userTitle = reviewTitleInput.value;
                const validUserTitle = isTitalValid(userTitle);

                const userContent = userContentInput.value;
                const validUserContent = isContentValid(userContent);

                setValidation(reviewTitleInput, validUserTitle);
                setValidation(userContentInput, validUserContent);

                if (!validUserTitle) {
                    alert(
                        "Make sure your review title is minimum 5 characters!",
                    );
                    return;
                }

                if (!validUserContent) {
                    alert(
                        "Make sure your review content is minimum 10 characters!",
                    );
                    return;
                }

                const userRating = Number(userRatingInput.value);
                // Get form values
                const review = {
                    userId: currentUser.id,
                    title: userTitle,
                    rating: userRating,
                    comment: userContent,
                    name: userName,
                    email: userEmail,
                    date: new Date().toLocaleDateString(),
                };

                review_rating = review.rating;

                // Basic validation
                if (
                    !review.rating ||
                    !review.title ||
                    !review.comment ||
                    !review.name ||
                    !review.email
                ) {
                    alert("All fields must be filled");
                    return;
                }

                currentProduct.Reviews = [...currentProduct._reviews, review]; 
                saveProducts(products);

                // Reset form
                reviewForm.reset();
                document.getElementById("reviewRating").value = "";

                stars.forEach((s) => {
                    s.classList.remove("bi-star-fill");
                    s.classList.add("bi-star");
                });

                // Reload reviews display
                displayReviews();
            });

            //product rating
            if (currentProduct) {
                
                const divstars = $(".getRating");

                function generateStars(rating) {
                    divstars.empty();
                    for (let i = 0; i < 5; i++) {
                        if (i < Math.floor(rating))
                            divstars.append(`<i class="bi bi-star-fill"></i>`);
                        else divstars.append(`<i class="bi bi-star"></i>`);
                    }
                }
                generateStars(currentProduct._rating, divstars);
            }

            //Display saved reviews
            function displayReviews() {
                const container = document.getElementById("reviewsContainer");
                container.innerHTML = "";

                if (reviews.length === 0) {
                    container.innerHTML =
                        "<p class='text-center text-muted'>No reviews yet.</p>";
                    return;
                }

                reviews.forEach((r) => {
                    let starsHTML = "";
                    for (let i = 0; i < 5; i++) {
                        if (i < r.rating) {
                            starsHTML += `<i class="bi bi-star-fill text-warning"></i>`;
                        } else {
                            starsHTML += `<i class="bi bi-star text-warning"></i>`;
                        }
                    }

                    container.innerHTML += `
                    <div class="mb-4">
                        <h5>${r.title}</h5>
                        <div>${starsHTML}</div>
                        <p class="mt-2">${r.comment}</p>
                        <small class="text-muted">By ${r.name} on ${r.date}</small>
                        <hr>
                    </div>
                `;
                });
            }

            document.addEventListener("DOMContentLoaded", function () {
                displayReviews();
            });
        }
    }
}