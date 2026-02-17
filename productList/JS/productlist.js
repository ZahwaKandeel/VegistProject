$(function(){

$(".btnlay2").click(function(){

    $("#divlayout1").addClass("d-none");

    $("#divlayout2").removeClass("d-none");
})

$(".btnlay1").click(function(){

    $("#divlayout1").removeClass("d-none");
    $("#divlayout2").addClass("d-none");
})


$.ajax({
        url: "https://dummyjson.com/products/category/groceries",
        method: "GET",
        success: function (response) {

console.log(response.products[1].thumbnail)

            // Loop through the products array
            response.products.forEach(function (product) {

                let html = `
                    <div class="cards  col-6  col-md-4  col-lg-3   position-relative ">
                        <div class=" h-100">
                            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                            <div class="">
                            <div class="icons position-absolute  start-50 translate-middle-x d-flex gap-2 ">

  <span class="icon  p-2   "  >
<i class="fa-regular fa-heart "></i>
   </span>
<span class="icon  p-2   ">
    <i class="fa fa-shopping-bag"></i>
</span>

  <span class="icon  p-2   ">
        <i class="fa fa-eye"></i>
    </span> 
</div>
                                <h5 class=" para">${product.title}</h5>
                                <p class=" fw-bold">€${product.price}</p>
                            </div>
                             <div class="d-flex align-items-center  "> <!-- review by stars -->
    <div class="text-warning me-2 rating ">
      <i class=" fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
     <i class="fa-regular fa-star"></i>
      
    </div>
    <span class="text-muted ratingspa">No reviews</span>
  </div>
</div>
                        </div>
                    </div>
                `;

                $("#divlayout1 ").append(html);
                $("#divlayout2 ").append(html);
            });

        },
        error: function (error) {
            console.error("Error fetching products:", error);
        }
    });



})//end of load