import { isAuth } from '../../component/isAuth.js';

$(function(){


const user = isAuth();

if (  user.role == "seller") {
    document.getElementById("sellerBtn").style.display = "block";
} else {
    document.getElementById("sellerBtn").style.display = "none";
}


const detailsPage = user?.role == "seller"
    ? "../../productDetials/Template/SellerProductDetaill.html"
    : "../../productDetials/Template/productDetails.html";

 localStorage.getItem("products")


const userData = JSON.parse(localStorage.getItem("products"));
console.log(userData); 
  //-------------------------------- get data to layout onee--------------------------------
let cards = "";

userData.forEach(product => {
  cards += `
<div id="${product._id}" class="col-6  col-lg-3  cards " data-category="${product._category}" data-stock="${product._stock}" data-price="${product._price}">

  <div class="   position-relative "> <!--div of card 1 -->

<div class=" position-relative  ">

   <a  href="${detailsPage}?id=${product._id}">
        <img src="${product._imageUrl}" class="w-100 main-img">
      </a>
  

<div class="icons position-absolute  start-50 translate-middle-x d-flex gap-2 p-2 ">
    
  <span class=" icon     btnheart "  >
<i class="fa-regular fa-heart "></i>
   </span>
<span class=" icon    btnbag ">
    <i class="fa fa-shopping-bag "></i>
</span>

  <span class=" icon    btneye ">
        <i class="fa fa-eye"></i>
    </span> 

</div>
    </div>   
<div>
<p class=""> <a href=""  class="para text-decoration-none  " >${ product._name}</a></p>
        <p class="fw-bold">€${ product._price}</p>

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
       
    </div>  <!--end  of card 1 -->

</div>


 `;



 
});

document.getElementById("divlayout1").innerHTML = cards;


    // breakkkkk--------------------------------------------------------
    //-------------------------------- get data to layout twoo--------------------------------
let cards2 = "";

userData.forEach(product => {
  cards2 += `
<div id="${product._id}" class="  cards2    col-12  my-5  " data-category="${product._category}" data-stock="${product._stock}" data-price="${product._price}"> <!--div of card 1  with icons   -->

<div     class="    row  "  > <!--container card with icons     -->

  
<div class=" position-relative col-12 col-lg-4  "  style="height: 250px;" >    <!--Image -->
  <a href="${detailsPage}?id=${product._id}">
        <img src="${product._imageUrl}" class="w-100 main-img object-fit-cover h-100">
      </a>
    
    
</div>

<div class="  col-12 col-lg-8 ">     <!--   name and price and rationg  -->


<p class=""> <a href=""  class="para text-decoration-none  " > ${ product._name}</a></p>  <!--   name and price   -->
        <p class="fw-bold">€${ product._price}</p>   

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
             ${ product._description}
            </p>

            <div class="icons  d-flex gap-2 ">

  <span class=" icon  p-2   "  >
<i class="fa-regular fa-heart "></i>
   </span>
<span class="icon p-2 btnbag2 ">
    <i class="fa-solid fa-shopping-bag"></i>
</span>

  <span class="icon  p-2   ">
        <i class="fa fa-eye"></i>
    </span> 
</div>

</div> <!--   paragraph   -->
</div> 
     </div>   <!--container card with icons     -->
</div>    <!--div of card 1 with icons -->

 `;



 
});

document.getElementById("divlayout2").innerHTML = cards2;




    // breakkkkk--------------------------------------------------------

    //-------------------------------- filter by category--------------------------------
function filterByCategory(category) {
    $(".cards").hide();
    $(`.cards[data-category="${category}"]`).show();
}
// --------------------------------filter by category layout 2 --------------------------------
function filterByCategory2(category) {
    $(".cards2").hide();
    $(`.cards2[data-category="${category}"]`).show();
}

// --------------------------------filter by stock  --------------------------------

// function filterByStock(){
//   if (userData._stock == 0) {
//     $("#out").val( "out")
//   }else {

//   } }


    

// function filterByStock() {
//      $(".cards").hide();
//     $(`.cards[data-stock="${stock}"]`).show();
//   if (userData._stock == 0) {
//     $("#outs").text("outs");
//   } else {
//     $("#outs").text(userData._stock);
//   }
// }



function  filterByStock(type) {
   
$(".cards").hide();
$(".cards").each(function(){
    let stock = $(this).data("stock");
    if (type == "in" && stock > 0){
          
        $(this).show();
    }
     if (type == "out" && stock == 0){
   
        $(this).show();

    }
});
setupPagination("divlayout1",$(this).data("stock") , "pagination1", 16);
}

function  filterByStock2(typee) {
$(".cards2").hide();
$(".cards2").each(function(){
    let stock = $(this).data("stock");
    if (typee == "in" && stock > 0){
        $(this).show();
    }
     if (typee == "out" && stock == 0){
        $(this).show();
    }


});

}

$("#outs").click(function(){
    filterByStock("out");
    filterByStock2("out");


});
$("#Ins").click(function(){
    
    filterByStock("in");
     filterByStock2("in");


});





// --------------------------------filter by Price --------------------------------
function filterByPrice(minPrice, maxPrice) {

    $(".cards").each(function () {

        let price = parseFloat($(this).data("price"));

        if (price >= minPrice && price <= maxPrice) {
            $(this).show();
           
        } else {
            $(this).hide();
        }
        //  setupPagination("divlayout1", ".cards:visible", "pagination1", 16);

    });
    
}
//-------------------------------- filter by Price rangeee--------------------------------
$('input[type="range"]').on("input", function () {

    let maxPrice = parseFloat($(this).val());

    filterByPrice(0, maxPrice);

    $(".form-label").text(`The highest price is €${maxPrice}`);

});

// --------------------------------filter by Price stockk--------------------------------





// --------------------------------filter category layout oneee--------------------------------


$(".filternum").text(`(${userData.length})`)
$(".catmemb").text(`All products`)

$(".bagel").click(function () {
    filterByCategory('bagel');
$(".categName").text('Bagel')
  let   num = $('.cards[data-category="bagel"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`Bagel`)

     $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

setupPagination("divlayout1", `cards[data-category="bagel"]`, "pagination1", 16);
    
});


$(".bestseller").click(function () {
    filterByCategory('bestseller');
$(".categName").text('BestSeller')
      let   num = $('.cards[data-category="bestseller"]:visible').length;

    $(".filternum").text(`(${num})`)
    
$(".catmemb").text(`BestSeller`)

     $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

setupPagination("divlayout1", `cards[data-category="bestseller"]`, "pagination1", 16);
});


$(".beans").click(function () {
    filterByCategory('beans');
$(".categName").text('Beans')
    let   num = $('.cards[data-category="beans"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Beans`)


      $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");
    
setupPagination("divlayout1", `cards[data-category="beans"]`, "pagination1", 16);
});


$(".candy").click(function () {
    filterByCategory('candy');
$(".categName").text('Candy')
  let   num = $('.cards[data-category="candy"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Candy`)

      $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="candy"]`, "pagination1", 16);
});

$(".bread").click(function () {
    filterByCategory('bread');
$(".categName").text('Bread')
  let   num = $('.cards[data-category="bread"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Bread`)

          $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="bread"]`, "pagination1", 16);

});

$(".biscuite").click(function () {
    filterByCategory('biscuite');
$(".categName").text('Biscuite')
 let   num = $('.cards[data-category="biscuite"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Biscuite`)

          $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="biscuite"]`, "pagination1", 16);
});

$(".breakfast").click(function () {
    filterByCategory('breakfast');
$(".categName").text('Breakfast')
 let   num = $('.cards[data-category="breakfast"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Breakfast`)

          $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="breakfast"]`, "pagination1", 16);
});

$(".cake").click(function () {
    filterByCategory('cake');
$(".categName").text('Cake')
 let   num = $('.cards[data-category="cake"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Cake`)

          $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="cake"]`, "pagination1", 16);
});

$(".cookie").click(function () {
    filterByCategory('cookie');
$(".categName").text('Cookie')
 let   num = $('.cards[data-category="cookie"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Cookie`)

          $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="cookie"]`, "pagination1", 16);
});


$(".cupcake").click(function () {
    filterByCategory('cupcake');
$(".categName").text('Cupcake')
 let   num = $('.cards[data-category="cupcake"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Cupcake`)

          $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="cupcake"]`, "pagination1", 16);
});

$(".Diaryhesse").click(function () {
    filterByCategory('Diary&Cheese');
$(".categName").text('Diary & chesse')
 let   num = $('.cards[data-category="Diary&Cheese"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Diary & chesse`)

          $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="Diary&Cheese"]`, "pagination1", 16);
});

$(".Dinner").click(function () {
    filterByCategory('Dinner');
$(".categName").text('Dinner')
 let   num = $('.cards[data-category="Dinner"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Dinner`)

          $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

    setupPagination("divlayout1", `cards[data-category="Dinner"]`, "pagination1", 16);
});

//-------------------------------- filter category layout twoooo--------------------------------------------- 

$(".bagel").click(function () {
    filterByCategory2('bagel');
$(".categName").text('Bagel')
  let   num = $('.cards2[data-category="bagel"]:visible').length; 

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`Bagel`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="bagel"]`, "pagination2", 8);
    
});

$(".bestseller").click(function () {
    filterByCategory2('bestseller');
$(".categName").text('Bestseller')
  let   num = $('.cards2[data-category="bestseller"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`bestseller`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="bestseller"]`, "pagination2", 8);
    
});

$(".beans").click(function () {
    filterByCategory2('beans');
$(".categName").text('Beans')
  let   num = $('.cards2[data-category="beans"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`beans`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="beans"]`, "pagination2", 8);
    
});

$(".candy").click(function () {
    filterByCategory2('candy');
$(".categName").text('Candy')
  let   num = $('.cards2[data-category="candy"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`candy`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="candy"]`, "pagination2", 8);
    
});

$(".bread").click(function () {
    filterByCategory2('bread');
$(".categName").text('Bread')
  let   num = $('.cards2[data-category="bread"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`bread`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="bread"]`, "pagination2", 8);
    
});


$(".biscuite").click(function () {
    filterByCategory2('biscuite');
$(".categName").text('Biscuite')
  let   num = $('.cards2[data-category="biscuite"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`biscuite`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="biscuite"]`, "pagination2", 8);
    
});

$(".breakfast").click(function () {
    filterByCategory2('breakfast');
$(".categName").text('Breakfast')
  let   num = $('.cards2[data-category="breakfast"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`breakfast`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="breakfast"]`, "pagination2", 8);
    
});

$(".cake").click(function () {
    filterByCategory2('cake');
$(".categName").text('Cake')
  let   num = $('.cards2[data-category="cake"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`cake`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="cake"]`, "pagination2", 8);
    
});

$(".cookie").click(function () {
    filterByCategory2('cookie');
$(".categName").text('Cookie')
  let   num = $('.cards2[data-category="cookie"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`cookie`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="cookie"]`, "pagination2", 8);
    
});

$(".cupcake").click(function () {
    filterByCategory2('cupcake');
$(".categName").text('Cupcake')
  let   num = $('.cards2[data-category="cupcake"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`cupcake`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="cupcake"]`, "pagination2", 8);
    
});

$(".Diaryhesse").click(function () {
    filterByCategory2('Diary&Cheese');
$(".categName").text('Diary & chesse')
  let   num = $('.cards2[data-category="Diary&Cheese"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`Diary & chesse`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="Diary&Cheese"]`, "pagination2", 8);
    
});

$(".Dinner").click(function () {
    filterByCategory2('Dinner');
$(".categName").text('Dinner')
  let   num = $('.cards2[data-category="Dinner"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`Dinner`)

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", `cards2[data-category="Dinner"]`, "pagination2", 8);
    
});
// breakkkkk--------------------------------------------------------

  // that btn to change layout of divs to make it single  
$(".btnlay2").click(function(){


$(".filternum").text(`(${userData.length})`)
$(".catmemb").text(`All products`)
$(".categName").text('All products')

    $("#divlayoutdefult").addClass("d-none");
    $("#divlayout2").removeClass("d-none");

     $("#paginationnav2").removeClass("d-none");
    $("#paginationnav").addClass("d-none");
setupPagination("divlayout2", "cards2", "pagination2", 8);



})
// that btn to back to defult layout of divs 
$(".btnlay1").click(function(){


$(".filternum").text(`(${userData.length})`)
$(".catmemb").text(`All products`)
$(".categName").text('All products')

    $("#divlayoutdefult").removeClass("d-none");
    $("#divlayout2").addClass("d-none");

     $("#paginationnav2").addClass("d-none")
      $("#paginationnav").removeClass("d-none");

setupPagination("divlayout1", "cards", "pagination1", 16);
})

setupPagination("divlayout1", "cards", "pagination1", 16);



// $(".btnheart").click(function(){
 
    
//  const parentIdd = $(this).parent().parent().parent().parent().attr("id");

//   addToWishlist(parentIdd)


  
// })


//----------------------------------- add to cart layout one -----------------------------------

$(".btnbag").click(function(){
    const parentId = $(this).parent().parent().parent().parent().attr("id");
    addToCart(parentId, 1);
//    addToCart(this.userData._id, p_quantity=1)
 })

 // -----------------------------------add to cart layout two -----------------------------------

$(".btnbag2").click(function(){
    const parentId = $(this).parent().parent().parent().parent().parent().attr("id");
    addToCart(parentId, 1);
//    addToCart(this.userData._id, p_quantity=1)
 })



 $(".btnheart").click(function(){
       const parentId = $(this).parent().parent().parent().parent().attr("id");
   addToWishlist(parentId)

 })




 // $(".btneye").click(function(){
//    open("../../productDetials/Template/ProductPopUp.html" )
// })

    // breakkkkk--------------------------------------------------------




//----------------------------------- function of pagination -----------------------------------
function setupPagination(containerId, cardClass, paginationId, itemsPerPage) {

    let items = $(`#${containerId} .${cardClass}`);

    let totalItems = items.length;

    let totalPages = Math.ceil(totalItems / itemsPerPage);

    function showPage(page) {
        items.hide();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        items.slice(start, end).show();
    }

    function createPagination() {
        $(`#${paginationId}`).html("");

        for (let i = 1; i <= totalPages; i++) {
            $(`#${paginationId}`).append(`
                <li class="page-item">
                    <a class="page-link" href="#">${i}</a>
                </li>
            `);
        }

        $(`#${paginationId} li:first`).addClass("active");

        $(`#${paginationId} .page-link`).click(function (e) {
            e.preventDefault();

            const page = parseInt($(this).text());

            $(`#${paginationId} .page-item`).removeClass("active");
            $(this).parent().addClass("active");

            showPage(page);
        });
    }

    showPage(1);
    createPagination();
}














//--------------------------------filter by Price --------------------------------
function filterByPrice2(minPrice, maxPrice) {

    $(".cards2").each(function () {

        let price = parseFloat($(this).data("price"));

        if (price >= minPrice && price <= maxPrice) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });
   
}
//-------------------------------- filter by Price rangeee--------------------------------
$('input[type="range"]').on("input", function () {

    let maxPrice = parseFloat($(this).val());

    filterByPrice2(0, maxPrice);

    $(".form-label").text(`The highest price is €${maxPrice}`);

    //      $("#paginationnav2").removeClass("d-none");
    // $("#paginationnav").addClass("d-none");
    // setupPagination("divlayout2", "cards2", "pagination2", 8);


});






})//end of load
