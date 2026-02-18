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
                let html2 = `
                  <div class="cards  col-12  my-5   " "> <!--div of card 1  with icons   -->

<div     class="     row  "  >
                    <div class=" position-relative col-12 col-lg-4  "  style="height: 250px;" >    <!--Image -->
    <img src="${product.thumbnail}" class=" w-100 main-img   object-fit-cover h-100"> 
    <img src="../images//1.2.jpg" class=" w-100  hover-img position-absolute top-0 start-0 h-100  ">
</div>

<div class="  col-12 col-lg-8 ">     <!--   name and price and rationg  -->


<p class=""> <a href=""  class="para text-decoration-none  " >${product.title}</a></p>  <!--   name and price   -->
        <p class="fw-bold">${product.price}</p>   

        <div class="d-flex align-items-center  "> <!-- review by stars -->
    <div class="text-warning me-2 rating ">
      <i class=" fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
     <i class="fa-regular fa-star"></i>
      
    </div>
    <span class="text-muted ratingspa">No reviews</span>

  </div>    <!--   name and price   -->



  <div> <!--   paragraph   -->

            <p class="text-muted mt-3 ">
             ${product.description}
            </p>

            <div class="icons  d-flex gap-2 ">

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

</div> <!--   paragraph   -->
  

</div> 
</div>
</div>
                `;

                $("#divlayout1 ").append(html);
                $("#divlayout2 ").append(html2);
            });

        },
        error: function (error) {
            console.error("Error fetching products:", error);
        }
    });



})//end of load