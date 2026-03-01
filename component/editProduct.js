import { saveProducts } from "./Product.js";
export function initializeEditProduct (productId){    

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => Number(p._id) === Number(productId));   


    

    let imageBase64 = product._imageUrl;//maintain old image
    
    //load product data in form fields
    $("#updateName").val(product._name);
    $("#updatePrice").val(product._price);
    $("#updateDescription").val(product._description);
    $("#updateStock").val(product._stock);
    $("#category").val(product._category);
    $("#updateImagePreview").attr("src", product._imageUrl)
                            .removeClass("d-none");
    product._sizes.forEach(size =>{
            $(`.size-option[value="${size}"]`).prop("checked", true);
    });
    $("#discountPercentage").val(product._discountPercentage);


    $("#updateImage").off("change").on("change", function(){
        const file = this.files[0];
        if(!file) return;
        if(!file.type.startsWith("image/")){
            alert("Please select a valid image file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e){
            imageBase64 = e.target.result;
            $("#updateImagePreview").attr("src", imageBase64)
                                    .removeClass("d-none");
        };
        reader.readAsDataURL(file);
    });
        
    const allowedCategories = ["Fresh Fruits", "Tropical Fruits", "Berries",
                                "Leafy Vegetables", "Root Vegetables", "Cruciferous Vegetables",
                                "Gourds", "Citrus Fruits"
    ];
        
    $("#editProductForm").off("submit").on("submit", function(e){
        e.preventDefault();
        let isValid = true;

        $(".form-control").removeClass("is-invalid");
        $(".invalid-feedback").remove();

        let name = $("#updateName").val().trim();
        let price = parseFloat($("#updatePrice").val());
        let description = $("#updateDescription").val().trim();
        let stock = parseInt($("#updateStock").val());
        let category = $("#category").val().trim();

        let sizes = $(".size-option:checked").map(function(){
            return parseInt($(this).val(),10);
        }).get();

        let discountPercentage = parseInt($("#discountPercentage").val());

        if (name.length<3){
            showError("#updateName", "Name must be at least 3 characters");
            isValid = false;
        }
        if (isNaN(price) || price<=0){
            showError("#updatePrice", "Price must be a number greater than 0");
            isValid = false;
        }
        if (description.length < 100 || description.length > 200){
            showError("#updateDescription", "Description must be at least 100 characters and less than 200");
            isValid = false;
        }
        if (isNaN(stock) || stock<=0){
            showError("#updateStock", "Stock must be a number greater than 0");
            isValid = false;
        }
        if (!allowedCategories.includes(category)){
            showError("#category", "Invalid Category, allowed categories: bagel, candy, beans, bestseller, bread, biscuite, breakfast, cake, cookie, cupcake, Dairy&Cheese, Dinner");
            isValid = false;
        }
        if (sizes.length === 0) {
            $("#sizesError").html('<div class="text-danger mt-2">Please select at least one size</div>');
            isValid = false;
        } else {
            $("#sizesError").html("");
        }
        if(isNaN(discountPercentage) || discountPercentage<0 || discountPercentage>100){
            showError("#discountPercentage","Discount Percentage must be a number between 0 and 100");
            isValid = false;
        }
        if (!isValid) return;

        product._name = name;
        product._price = price;
        product._description = description;
        product._stock = parseInt($("#updateStock").val());
        product._category = category;
        product._imageUrl = imageBase64;
        product._sizes = sizes;
        product._discountPercentage = discountPercentage;

        saveProducts(products);

        alert("Product updated successfully");
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("editProductModal")
        )
        modal.hide();
        location.reload();
    });
        
    function showError(selector, message){
        $(selector).addClass("is-invalid");
        $(selector).after(`<div class="invalid-feedback">${message}</div>`);
    }

};
