import { Product, loadProducts, saveProducts } from "../../component/Product.js"; 
import { Order } from "/models/order.js";
import { deleteProductById } from "/component/deleteProduct.js";


// Load products from localStorage
let products = loadProducts() || [];


// Get the product ID from the URL
const params = new URLSearchParams(window.location.search)
const idParam = Number(params.get("id"));

let selectedSize = 1;
let pricePerKg = 0;
let finalPricePerKg = 0;
let product = null;


if (idParam === null) {
    console.log("No product ID found in URL");
} else {

    if (products.length === 0) {
        console.log("No products found in localStorage");
    } else {

        product = products.find(p => p._id === idParam); 

        if (!product) {
            console.log("Product not found");
        } else {
            // Fill main product info
            document.getElementById("name").innerText = product._name;
            document.getElementById("productPrice");
            document.getElementById("productStock").innerHTML = `<strong>Availability:</strong> <span class="text-success">● ${product.Stock} in stock</span>`;
            document.getElementById("productDescription").textContent = product.Description;
            document.getElementById("productSKU").textContent = product._id;
            document.getElementById("category").textContent = product.Category;
            document.getElementById("table-productsize").textContent = product.Sizes.join(" - ");
            document.getElementById("moreDetail").textContent = product.Description;
            document.getElementById("table-productCategory").textContent = product.Category;
            document.getElementById("table-productSKU").textContent = product._id;

            $("#discount").text(`${product._discountPercentage}%`);

            // Carousel images
            const carouselImages = document.querySelectorAll("#carouselVeg img");
            carouselImages.forEach(img => img.src = product.ImageUrl);

            // Thumbnail images
            const thumbImages = document.querySelectorAll(".d-flex.justify-content-evenly img");
            thumbImages.forEach(img => img.src = product.ImageUrl);

            // Discount info
            const priceContainer = document.getElementById("productPrice");
            function getFinalPrice(product) {
                const price = Number(product._price);
                const discount = Number(product._discountPercentage) || 0;

                if (discount > 0) {
                    const discounted = price - (price * (discount / 100));
                    return Math.max(0, discounted);
                }
                return price;
            }
            const finalPrice = getFinalPrice(product);

			finalPricePerKg = finalPrice;     // discounted 1KG price
			pricePerKg = finalPricePerKg;     // initial price per KG

            const productafterDiscount = $("#productAfterDiscount");
            const productPrice = $("#productPrice");
            const originalPrice = product._price;

            if(finalPrice < originalPrice){
                productafterDiscount.text(finalPrice);
                productPrice.text(originalPrice);
            }else{
                productafterDiscount.text(finalPrice);
            }

        // Wishlist
        $(document).ready(function () {
            $('.bi-heart').on('click', function(e) {
                e.preventDefault();
                if (product) {
                    addToWishlist(product._id);
                    window.location.href = "../../wishlist/Template/wishlist.html";
                }
            });
        });

        // Quantity
        let value = parseInt($('#quantityValue').val());

        $(document).on('click', '.qty-plus', function () {
            if (value >= product.Stock) return;
            value++;
            $('.qty-input').val(value);  
            // calculateSubTotal();
        });

        $(document).on('click', '.qty-minus', function () {
            if (value > 1) value--;
            $('.qty-input').val(value);
            // calculateSubTotal();
        });

        // Add to Cart
        $(document).ready(function () {
            $('#addToCart').on('click', function(e) {
                e.preventDefault();
                if (product) {
                    let quantity = parseInt($('#quantityValue').val());
                    if (quantity > product.Stock) return;
                    let selectedSize = $('input[name="size_choice"]:checked').val();
					let totalPrice = pricePerKg * quantity;
                    addToCart(product._id, quantity, selectedSize);
                    window.location.href = "../../cart/Template/cart.html";
                }
            });
        });

        // Remove product (Seller page)
        $(document).ready(function () {
            $('#removeProduct1').on('click', function(e) {
                e.preventDefault();
                if (product) {
                    deleteProductById(product._id);
                    window.location.href = "/productList/Template/product_list.html";
                }
            });
        });

        // Subtotal
        let total;
        function calculateSubTotal(){
            total = pricePerKg * value;
            return total;
        }
        calculateSubTotal();

        // Buy it now
        function buyItNow(){
			let quantity = parseInt($('#quantityValue').val()) || 1;
			let subtotal = pricePerKg * quantity;
            let currentOrder = new Order({
                id: Date.now(),
                sellerId: 1,
                cart: [{ product_id: idParam, quantity: value, size: selectedSize, price: pricePerKg }],
                createdAt: new Date(),
                shipping: {
                    fristName: "",
                    lastName: "",
                    phone: "",
                    country:  "",
                    fullAddress: "",
                    appartment: "",
                    postalCode: "",
                    City: "",
                    shipping_fees: null
                },
                subtotal: subtotal,
                discount_code:  "",
                special_instructions: ""
            });

            localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
            console.log(currentOrder);
        }
        $(document).ready(function () {
            $('#buyItNow').on('click', function() {
                if (quantity > product.Stock) return;
                buyItNow();
                window.location.href = "../../checkOut/Template/checkOut.html";
            });
        });

        // Sizes
        $('.sizediv').empty();
        product.Sizes.forEach((item, index) => {
            let sizeId = `size_${index}`;
            $('.sizediv').append(`
                <input type="radio" class="btn-check" name="size_choice" id="${sizeId}" value="${item}" ${index === 0 ? "checked" : ""} autocomplete="off">
                <label class="btn btn-outline-warning rounded-pill px-4 me-2" for="${sizeId}">${item}KG</label>
            `);
        });
		
		// Update price when size changes
		$(document).on('change', 'input[name="size_choice"]', function () {

			selectedSize = parseFloat($(this).val());

			let originalPrice = Number(product._price);

			let newOriginalPrice = selectedSize * originalPrice;
			let newAfterDiscount = selectedSize * finalPricePerKg;

			//update global pricePerKg (price of selected size)
			pricePerKg = finalPricePerKg * selectedSize;

			if (product._discountPercentage > 0) {
				$("#productAfterDiscount").text(newAfterDiscount.toFixed(2));
				$("#productPrice").text(newOriginalPrice.toFixed(2));
				$("#discount").text(product._discountPercentage + "%");
			} else {
				$("#productAfterDiscount").text(newAfterDiscount.toFixed(2));
				$("#productPrice").text("");
				$("#discount").text("");
			}
		});


        // Related products
        function loadRelatedProducts() {
            if (!product || products.length === 0) return;

            let related = products.filter(p => p.ID !== product._id);
            let cards = $(".cards");

            cards.each(function (index) {
                if (index < related.length) {
                    let p = related[index];
                    $(this).attr("data-id", p.ID).show();
                    $(this).find(".main-img").attr("src", p.ImageUrl);
                    $(this).find(".para").text(p.Name).attr("href", `productDetails.html?id=${p.ID}`);
                    $(this).find(".fw-bold").text(`€${p.Price}`);
                } else {
                    $(this).hide();
                }
            });
        }

        loadRelatedProducts();

        // Wishlist icon beside the popup
        $(document).on('click', '.fa-heart', function () {
            const cardId = parseInt($(this).closest(".cards").attr("id"));
            const product = products.find(p => p.ID === cardId);
            if (!product) return;
            addToWishlist(product._id);
        });

        // Shopping bag icon beside the popup
        $(document).on('click', '.fa-shopping-bag', function () {
            const cardId = parseInt($(this).closest(".cards").attr("id"));
            const product = products.find(p => p.ID === cardId);
            if (!product) return;
            // Replace quantity & size with defaults
            addToCart(product._id, 1, product.Sizes[0]);
        });

        //Stars Rating inside review
        const stars = document.querySelectorAll(".star");
        const ratingInput = document.getElementById("reviewRating");

        stars.forEach(star => {
            star.addEventListener("click", function () {
                const value = this.getAttribute("data-value");
                ratingInput.value = value;

                // Reset all stars
                stars.forEach(s => {
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
        const userEmail = currentUser.email;
		const userName = currentUser.firstName;
		
        // Find current product
        const currentProduct = products.find(p => p._id === Number(idParam));
        
        //Get existing reviews
        const reviews = currentProduct._reviews;

        document.getElementById("reviewName").value = userName;
		document.getElementById("reviewEmail").value = userEmail;
        
        let review_rating ;
        const Productsreview = products._reviews; 

        //Save the review
        const reviewForm = document.getElementById("reviewForm");

        reviewForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!idParam) return;

            let userTitle = document.getElementById("reviewTitle").value;
            let userRating = Number(document.getElementById("reviewRating").value);
            let userContent = document.getElementById("reviewContent").value;

            // Get form values
            const review = {
                userId: currentUser.id, 
                title: userTitle,
                rating:userRating,
                comment: userContent,
                name: userName,
                email: userEmail,
                date: new Date().toLocaleDateString()
            };

            review_rating = review.rating;
            console.log("review_rating", review_rating)

            // Basic validation
            console.log("set reviq",review);
            if(!review.rating || !review.title || !review.comment || !review.name || !review.email){
                alert("All fields must be filled");
                return
            }
            
           // Push review inside product
            reviews.push(review);
            localStorage.setItem("Productsreview", JSON.stringify(reviews));

            // Save updated products back
            saveProducts(products);

            // Reset form
            reviewForm.reset();
            document.getElementById("reviewRating").value = "";

            stars.forEach(s => {
                s.classList.remove("bi-star-fill");
                s.classList.add("bi-star");
            });

            // Reload reviews display
            displayReviews();

            
        });

        //product rating 
         if (currentProduct) {
                
                let rating;
                if (reviews.length > 0) {

                    let total = 0;

                    reviews.forEach(review => {
                        total += review.rating;
                    });
                    rating = Number((total / reviews.length).toFixed(2));

                } else {
                    rating = 0;
                }

                currentProduct._rating = rating;

                const divstars = $(".getRating");
                divstars.empty();

                for (let i = 0; i < 5; i++) {
                    if (i < Math.floor(rating))
                        divstars.append(`<i class="bi bi-star-fill"></i>`);
                    else
                        divstars.append(`<i class="bi bi-star"></i>`);
                }

                
        }
        
        //Display saved reviews
        function displayReviews() {

            const container = document.getElementById("reviewsContainer");
            container.innerHTML = "";

            if (reviews.length === 0) {
                container.innerHTML = "<p class='text-center text-muted'>No reviews yet.</p>";
                return;
            }

            reviews.forEach(r => {

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


        //test
    }
}}