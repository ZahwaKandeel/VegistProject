
$(function(){

 localStorage.getItem("products")


const userData = JSON.parse(localStorage.getItem("products"));
console.log(userData); 

let cards = "";

userData.forEach(product => {
  cards += `
<div id="${product._id}" class="col-6  col-lg-3  cards " data-category="${product._category}" data-stock="${product._stock}" data-price="${product._price}">

  <div class="   position-relative "> <!--div of card 1 -->

<div class=" position-relative  ">
    <img src=" ${ product._imageUrl}" class=" w-100 main-img ">
  

<div class="icons position-absolute  start-50 translate-middle-x d-flex gap-2 p-2 ">
    
  <span class="icon  p-2   btnheart "  >
<i class="fa-regular fa-heart "></i>
   </span>
<span class="icon  p-2  btnbag ">
    <i class="fa fa-shopping-bag "></i>
</span>

  <span class="icon  p-2  btneye ">
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

    // filter by category
function filterByCategory(category) {
    $(".cards").hide();
    $(`.cards[data-category="${category}"]`).show();
}

// filter by Price and category
// function filterProducts(category, minPrice, maxPrice) {

//     $(".cards").each(function () {

//         let itemCategory = $(this).data("category");
//         let itemPrice = parseFloat($(this).data("price"));

//         let matchCategory = category === "all" || itemCategory === category;
//         let matchPrice = itemPrice >= minPrice && itemPrice <= maxPrice;

//         if (matchCategory && matchPrice) {
//             $(this).show();
//         } else {
//             $(this).hide();
//         }

//     });
// }
// filter by Price 
function filterByPrice(minPrice, maxPrice) {

    $(".cards").each(function () {

        let price = parseFloat($(this).data("price"));

        if (price >= minPrice && price <= maxPrice) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });
}
// filter by Price rangeee
$("#range1").on("input", function () {

    let maxPrice = parseFloat($(this).val());

    filterByPrice(0, maxPrice);

    $(".form-label").text(`The highest price is €${maxPrice}`);

});

// filter by Price stockk

function filterInStock() {

    $(".cards").each(function () {

        let stock = parseInt($(this).data("stock"));

        if (stock > 0) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });
}







$(".filternum").text(`(${userData.length})`)
$(".catmemb").text(`All products`)

$(".bagel").click(function () {
    filterByCategory('bagel');
$(".categName").text('Bagel')
  let   num = $('.cards[data-category="bagel"]:visible').length;

    $(".filternum").text(`(${num})`)

$(".catmemb").text(`Bagel`)
    
});


$(".bestseller").click(function () {
    filterByCategory('bestseller');
$(".categName").text('BestSeller')
      let   num = $('.cards[data-category="bestseller"]:visible').length;

    $(".filternum").text(`(${num})`)
    
$(".catmemb").text(`BestSeller`)
});


$(".beans").click(function () {
    filterByCategory('beans');
$(".categName").text('Beans')
    let   num = $('.cards[data-category="beans"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Beans`)
});


$(".candy").click(function () {
    filterByCategory('candy');
$(".categName").text('Candy')
  let   num = $('.cards[data-category="candy"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Candy`)
});

$(".bread").click(function () {
    filterByCategory('bread');
$(".categName").text('Bread')
  let   num = $('.cards[data-category="bread"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Bread`)
});

$(".biscuite").click(function () {
    filterByCategory('biscuite');
$(".categName").text('Biscuite')
 let   num = $('.cards[data-category="biscuite"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Biscuite`)
});

$(".breakfast").click(function () {
    filterByCategory('breakfast');
$(".categName").text('Breakfast')
 let   num = $('.cards[data-category="breakfast"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Breakfast`)
});

$(".cake").click(function () {
    filterByCategory('cake');
$(".categName").text('Cake')
 let   num = $('.cards[data-category="cake"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Cake`)
});

$(".cookie").click(function () {
    filterByCategory('cookie');
$(".categName").text('Cookie')
 let   num = $('.cards[data-category="cookie"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Cookie`)
});


$(".cupcake").click(function () {
    filterByCategory('cupcake');
$(".categName").text('Cupcake')
 let   num = $('.cards[data-category="cupcake"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Cupcake`)
});

$(".Diaryhesse").click(function () {
    filterByCategory('Diary&Cheese');
$(".categName").text('Diary & chesse')
 let   num = $('.cards[data-category="Diary&Cheese"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Diary & chesse`)
});

$(".Dinner").click(function () {
    filterByCategory('Dinner');
$(".categName").text('Dinner')
 let   num = $('.cards[data-category="Dinner"]:visible').length;

    $(".filternum").text(`(${num})`)
    $(".catmemb").text(`Dinner`)
});







// breakkkkk--------------------------------------------------------

  // that btn to change layout of divs to make it single  
$(".btnlay2").click(function(){

    $("#divlayout1").addClass("d-none");

    $("#divlayout2").removeClass("d-none");
})
// that btn to back to defult layout of divs 
$(".btnlay1").click(function(){

    $("#divlayout1").removeClass("d-none");
    $("#divlayout2").addClass("d-none");
})




// $(".btnheart").click(function(){
//   open("../../wishlist/Template/wishlist.html" ,' width=800, height=600')


  
// })

// $(".btnbag").click(function(){
//    open("../../productDetials/Template/ProductPopUp.html" ,' width=800px, height=600px')
// })

// $(".btneye").click(function(){
//    open("../../productDetials/Template/ProductPopUp.html" )
// })



// $(".bagel").click(function(){
//     open("../Template/Bagel.html" , "_self" )
   
// })




//----------------break---------------



    let itemsPerPage = 16; // number of products in page
    let items = $("#divlayout1 .cards");
    let totalItems = items.length ;
    let totalPages = Math.ceil(totalItems / itemsPerPage);


    console.log(items.length)
    function showPage(page) {

        items.hide(); 

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        items.slice(start, end).show();  
    }

    //button for slide
    function createPagination() {  

        $("#pagination").html("");

        for (let i = 1; i <= totalPages; i++) {
            $("#pagination").append(`
                <li class="page-item">
                    <a class="page-link" href="#">${i}</a>
                </li>
            `);
        }

        $("#pagination li:first").addClass("active");

        $(".page-link").click(function (e) {
            e.preventDefault();

            const page = parseInt($(this).text());

            $(".page-item").removeClass("active");
            $(this).parent().addClass("active");

            showPage(page);
        });
    }

    showPage(1);
    createPagination();

        //--------------------------------------------------
    //      let itemsPerPage2 = 8; // number of products in page
    // let items2 = $("#divlayout2 .cards");
    // let totalItems2 = items2.length ;
    // let totalPages2 = Math.ceil(totalItems2 / itemsPerPage2);


    // console.log(items2.length)
    // function showPage2(page) {

    //     items2.hide(); 

    //     const start = (page - 1) * itemsPerPage2;
    //     const end = start + itemsPerPage2;

    //     items2.slice(start, end).show();  
    // }

    // //button for slide
    // function createPagination2() {  

    //     $("#pagination").html("");

    //     for (let i = 1; i <= totalPages2; i++) {
    //         $("#pagination").append(`
    //             <li class="page-item">
    //                 <a class="page-link" href="#">${i}</a>
    //             </li>
    //         `);
    //     }

    //     $("#pagination li:first").addClass("active");

    //     $(".page-link").click(function (e) {
    //         e.preventDefault();

    //         const page = parseInt($(this).text());

    //         $(".page-item").removeClass("active");
    //         $(this).parent().addClass("active");

    //         showPage(page);
    //     });
    // }

    // showPage2(1);
    // createPagination2();



//------------------------------------


// console.log(userData.age); 


// $.ajax({
//         url: "https://dummyjson.com/products/category/groceries",
//         method: "GET",
//         success: function (response) {

// console.log(response.products[1].thumbnail)

//             // Loop through the products array
//             response.products.forEach(function (product) {

//                 let html = `
//                     <div class="cards  col-6  col-md-4  col-lg-3   position-relative ">
//                         <div class=" h-100">
//                             <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                          
//                             <div class="icons position-absolute  start-50 translate-middle-x d-flex gap-2 ">

//   <span class="icon  p-2   "  >
// <i class="fa-regular fa-heart "></i>
//    </span>
// <span class="icon  p-2   ">
//     <i class="fa fa-shopping-bag"></i>
// </span>

//   <span class="icon  p-2   ">
//         <i class="fa fa-eye"></i>
//     </span> 
// </div>
//                                 <h5 class=" para">${product.title}</h5>
//                                 <p class=" fw-bold">€${product.price}</p>
//                             </div>
//                              <div class="d-flex align-items-center  "> <!-- review by stars -->
//     <div class="text-warning me-2 rating ">
//       <i class=" fa-regular fa-star"></i>
//       <i class="fa-regular fa-star"></i>
//       <i class="fa-regular fa-star"></i>
//       <i class="fa-regular fa-star"></i>
//      <i class="fa-regular fa-star"></i>
      
//     </div>
//     <span class="text-muted ratingspa">No reviews</span>
//   </div>
// </div>
//                         </div>
//                     </div>
//                 `;
//                 let html2 = `
//                   <div class="cards  col-12  my-5    "> <!--div of card 1  with icons   -->

// <div     class="     row  "  >
//                     <div class=" position-relative col-12 col-lg-4  "  style="height: 250px;" >    <!--Image -->
//     <img src="${product.thumbnail}" class=" w-100 main-img   object-fit-cover h-100"> 
//     <img src="../images//1.2.jpg" class=" w-100  hover-img position-absolute top-0 start-0 h-100  ">
// </div>

// <div class="  col-12 col-lg-8 ">     <!--   name and price and rationg  -->


// <p class=""> <a href=""  class="para text-decoration-none  " >${product.title}</a></p>  <!--   name and price   -->
//         <p class="fw-bold">${product.price}</p>   

//         <div class="d-flex align-items-center  "> <!-- review by stars -->
//     <div class="text-warning me-2 rating ">
//       <i class=" fa-regular fa-star"></i>
//       <i class="fa-regular fa-star"></i>
//       <i class="fa-regular fa-star"></i>
//       <i class="fa-regular fa-star"></i>
//      <i class="fa-regular fa-star"></i>
      
//     </div>
//     <span class="text-muted ratingspa">No reviews</span>

//   </div>    <!--   name and price   -->



//   <div> <!--   paragraph   -->

//             <p class="text-muted mt-3 ">
//              ${product.description}
//             </p>

//             <div class="icons  d-flex gap-2 ">

//   <span class="icon  p-2   "  >
// <i class="fa-regular fa-heart "></i>
//    </span>
// <span class="icon  p-2   ">
//     <i class="fa fa-shopping-bag"></i>
// </span>

//   <span class="icon  p-2   ">
//         <i class="fa fa-eye"></i>
//     </span> 
// </div>

// </div> <!--   paragraph   -->
  

// </div> 
// </div>
// </div>
//                 `;

//                 $("#divlayout1 ").append(html);
//                 $("#divlayout2 ").append(html2);
//             });

//         },
//         error: function (error) {
//             console.error("Error fetching products:", error);
//         }
//     });

    // breakkkkk--------------------------------------------------------


























})//end of load