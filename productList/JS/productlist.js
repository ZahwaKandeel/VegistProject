import { isAuth } from '../../component/isAuth.js';

$(function(){

const user = isAuth();  //return currentUser to compare it 
 
// to show button add product if he is a seller
if (user.role === "seller") {
    $(".sellerBtn").show();
} else {
    $(".sellerBtn").hide();
}

// href to send user to product details page and seller to details page with edit product and remove
const detailsPage = user?.role == "seller"
    ? "../../productDetials/Template/SellerProductDetaill.html"
    : "../../productDetials/Template/productDetails.html";

 localStorage.getItem("products")


const userData = JSON.parse(localStorage.getItem("products"));
console.log(userData); 





  //-------------------------------- get data to layout onee--------------------------------
let cards = "";

userData.forEach(product => {
// to append raiting to card
function generateStars(rating){
    let stars ="";
    for (let i = 1; i<=5; i++){
        if(i<=Math.floor(rating)){
            stars += `<i class="fa fa-star"></i>`;
        }else{
            stars += `<i class="fa-regular fa-star"></i>`
        }
    }
    return stars;
}
// to calc raiting
     let ratingStars = generateStars(product._rating);
  cards += `
  
<div id="${product._id}" class="col-6  col-lg-3  cards " data-category="${product._category}" data-stock="${product._stock}" data-price="${product._price}" data-size="${JSON.stringify(product._sizes)}" data-discountPercentage="${product._discountPercentage}">
<!--div of card 1 -->
  <div class="   position-relative "> 

<div class=" card position-relative ">
    
   <a class="position-relative" href="${detailsPage}?id=${product._id}">
        <img src="${product._imageUrl}" class="w-100 main-img ">
        <!-- Show discount badge if exists -->
        ${product._discountPercentage ? `
        <div class="discount-per badge position-absolute top-0 end-0 text-white px-3 py-2 mt-2 me-2 rounded-5" style="background-color: #e30514;">
            ${product._discountPercentage}%
        </div>` : ``}
      </a>
  

<div class="icons">
    
  <span class="  btnheart "  >
<i class="fa-regular fa-heart "></i>
   </span>
<span class="     btnbag ">
    <i class="fa fa-shopping-bag "></i>
</span>

  <span class="  btneye "  data-bs-toggle="modal" data-bs-target="#quickViewModal">
        <i class="fa fa-eye"></i>
    </span> 

</div>
    </div>   
<div>
<p class=""> <a href=""  class="para text-decoration-none  " >${ product._name}</a></p>
        <p class="fw-bold">€${ product._price}</p>

        <div class="d-flex align-items-center  "> <!-- review by stars -->
    <div class="text-warning me-2 rating ">
     ${ratingStars}
      
    </div>
    <span class="text-muted ratingspa">  
   ${product._rating.toFixed(1)}/5
       </span>
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
// to append raiting to card
function generateStars(rating){
    let stars ="";
    for (let i = 1; i<=5; i++){
        if(i<=Math.floor(rating)){
            stars += `<i class="fa fa-star"></i>`;
        }else{
            stars += `<i class="fa-regular fa-star"></i>`
        }
    }
    return stars;
}
// to calc raiting
 let ratingStars = generateStars(product._rating);

  cards2 += `
<div id="${product._id}" class="  cards2    col-12  my-5  " data-category="${product._category}" data-stock="${product._stock}" data-price="${product._price}" data-size="${JSON.stringify(product._sizes)}" data-discountPercentage="${product._discountPercentage}" > <!--div of card 1  with icons   -->

<div     class="    row  "  > <!--container card with icons     -->

  
<div class=" position-relative col-12 col-lg-4  "  style="height: 250px;" >    <!--Image -->
  <a href="${detailsPage}?id=${product._id}">
        <img src="${product._imageUrl}" class="w-100 main-img object-fit-cover h-100">
        <!-- Show discount badge if exists -->
        ${product._discountPercentage ? `
        <div class="discount-per badge position-absolute top-0 end-0 text-white px-3 py-2 mt-2 me-2 rounded-5" style="background-color: #e30514;">
            ${product._discountPercentage}%
        </div>` : ``}
      </a>
    
    
</div>

<div class="  col-12 col-lg-8 card ">     <!--   name and price and raitng  -->


<p class=""> <a href=""  class="para text-decoration-none  " > ${ product._name}</a></p>  <!--   name and price   -->
        <p class="fw-bold">€${ product._price}</p>   

        <div class="d-flex align-items-center  "> <!-- review by stars -->
    <div class="text-warning me-2 rating ">
    ${ratingStars}
    </div>
    <span class="text-muted ratingspa">   ${product._rating.toFixed(1)}/5 </span>

  </div>    <!--   name and price   -->
  <div class=" "> <!--   paragraph   -->
            <p class="text-muted mt-3  ">
             ${ product._description}
            </p>


            <div class="icons   d-flex gap-2 ">

  <span class="   p-2  btnheart2 "  >
<i class="fa-regular fa-heart "></i>
   </span>
<span class=" p-2 btnbag2 ">
    <i class="fa-solid fa-shopping-bag"></i>
</span>

  <span class="  p-2  btneye " data-bs-toggle="modal" data-bs-target="#quickViewModal" >
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




    // ------------------------------------------------breakkkkk--------------------------------------------------------

    
//----------------------------------- filters work with each other--------------------------------
let activeFilters = {
    category: null,
    stock: null,
    sizes: [],
    maxPrice: null,
     discountOnly: false
};

function applyFilters(layoutClass) {

    $(`.${layoutClass}`).each(function () {

        const category = $(this).data("category");
        const stock = $(this).data("stock");
        const price = parseFloat($(this).data("price"));
        const sizes = JSON.parse($(this).attr("data-size"));
        const discount = parseFloat($(this).data("discountpercentage")) 

        let show = true;

        // Category
        if (activeFilters.category && category != activeFilters.category) {
            show = false;
        }
      

        // Stock
        if (activeFilters.stock == "in" && stock <= 0) {
            show = false;
        }

        if (activeFilters.stock == "out" && stock > 0) {
            show = false;
        }

        // Price
        if (activeFilters.maxPrice != null && price > activeFilters.maxPrice) {
            show = false;
        }

        // Sizes
        if (activeFilters.sizes.length > 0) {
            const hasMatch = sizes.some(size =>
                activeFilters.sizes.includes(size)
            );
            if (!hasMatch) show = false;
        }

        if (activeFilters.discountOnly && discount <= 0) {
    show = false;
}



        if (show) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });

}



  // ------------------------------------------------breakkkkk--------------------------------------------------------
$(function(){
    const discount = localStorage.getItem("discountOnly");
    
    if (discount === "true") {
        activeFilters.discountOnly = true;
        applyFilters("cards");
        setupPagination("divlayout1", "cards", "pagination1", 16);
    
        localStorage.removeItem("discountOnly");
    }
});
// --------------------------------filter by Category  --------------------------------

  


$('input[name="categories"]').on('change', function () {

    const selectedCategory = $(this).val();
 activeFilters.category = selectedCategory || null;
    // activeFilters.category = selectedCategory;


    // Layout 1
    applyFilters("cards");
    setupPagination("divlayout1", "cards", "pagination1", 16);

    // Layout 2
    applyFilters("cards2");
    setupPagination("divlayout2", "cards2", "pagination2", 8);

    
    let visibleCount = $('.cards:visible').length;

    $(".filternum").text(`(${visibleCount})`);
    $(".catmemb").text(selectedCategory);
    $(".categName").text(selectedCategory);
    $(".numcat").text(`(${visibleCount}) selected` );

});

// ------------------------------------------------breakkkkk--------------------------------------------------------
// --------------------------------filter by sizes  --------------------------------

//         ------------------------filterBysize layout one ---------------------------------- 
$('input[name="size"]').on('change', function () {

    let selectedSizes = [];

    $('input[name="size"]:checked').each(function () {
        selectedSizes.push(parseInt($(this).val()));
    });

    activeFilters.sizes = selectedSizes;

    applyFilters("cards");
    setupPagination("divlayout1", "cards", "pagination1", 16);
});

//         ------------------------filterBysize layout two ---------------------------------- 

$('input[name="size"]').on('change', function () {

    let selectedSizes = [];

    $('input[name="size"]:checked').each(function () {
        selectedSizes.push(parseInt($(this).val()));
    });

    activeFilters.sizes = selectedSizes;

    applyFilters("cards2");
    setupPagination("divlayout2", "cards2", "pagination2", 8);
});


  // ------------------------------------------------breakkkkk--------------------------------------------------------
// --------------------------------filter by price  --------------------------------

$('input[type="range"]').on("input", function () {

    activeFilters.maxPrice = parseFloat($(this).val());

    applyFilters("cards");
    setupPagination("divlayout1", "cards", "pagination1", 16);

    applyFilters("cards2");
    setupPagination("divlayout2", "cards2", "pagination2", 8);

    $(".form-label").text(`The highest price is €${activeFilters.maxPrice}`);
});



  // ------------------------------------------------breakkkkk--------------------------------------------------------

// --------------------------------filter by stock  --------------------------------------


$(".out").click(function () {

    activeFilters.stock = "out";

    applyFilters("cards");
    setupPagination("divlayout1", "cards", "pagination1", 16);


    applyFilters("cards2");
    setupPagination("divlayout2", "cards2", "pagination2", 8);
let visibleCount =
    $("#divlayout1 .cards:visible").length +
    $("#divlayout2 .cards2:visible").length;

    $(".numstock").text(`${visibleCount} selected` );
   
});


$(".ins").click(function () {

    activeFilters.stock = "in";

    applyFilters("cards");
    setupPagination("divlayout1", "cards", "pagination1", 16);

    applyFilters("cards2");
    setupPagination("divlayout2", "cards2", "pagination2", 8);

    let visibleCount =
    $("#divlayout1 .cards:visible").length +
    $("#divlayout2 .cards2:visible").length;

    $(".numstock").text(`${visibleCount} selected` );
});

$(".allStock").click(function () {

    activeFilters.stock = null;

    applyFilters("cards");
    setupPagination("divlayout1", "cards", "pagination1", 16);

    applyFilters("cards2");
    setupPagination("divlayout2", "cards2", "pagination2", 8);
    let visibleCount =
    $("#divlayout1 .cards:visible").length +
    $("#divlayout2 .cards2:visible").length;

    $(".numstock").text(`${visibleCount} selected` );
});



 // ------------------------------------------------breakkkkk--------------------------------------------------------





  // ------------------------------------------------breakkkkk--------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// title of products and there numbers
$(".filternum").text(`(${userData.length})`)
$(".catmemb").text(`All products`)


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

  // ------------------------------------------------breakkkkk--------------------------------------------------------
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


 // -----------------------------------add to wishlist layout two -----------------------------------
 $(".btnheart").click(function(){
       const parentId = $(this).parent().parent().parent().parent().attr("id");
   addToWishlist(parentId)

 })
 $(".btnheart2").click(function(){
       const parentId = $(this).parent().parent().parent().parent().parent().attr("id");
   addToWishlist(parentId)

 })



 // $(".btneye").click(function(){
//    open("../../productDetials/Template/ProductPopUp.html" )
// })


  // ------------------------------------------------breakkkkk--------------------------------------------------------

// $("#acs").click(function(){


//  let nedat = userData.sort((a, b) => a._name.localeCompare(b._name));
// console.log(nedat)


 
// })

$("#acs").click(function () {

  let cards = $(".cards").get();

  cards.sort(function (a, b) {
    let nameA = $(a).find(".para").text().toLowerCase();
    let nameB = $(b).find(".para").text().toLowerCase();
    return nameA.localeCompare(nameB);
  });

  $.each(cards, function (index, card) {
    $("#divlayout1").append(card);
  });

});

$("#acs").click(function () {

  let cards = $(".cards2").get();

  cards.sort(function (a, b) {
    let nameA = $(a).find(".para").text().toLowerCase();
    let nameB = $(b).find(".para").text().toLowerCase();
    return nameA.localeCompare(nameB);
  });

  $.each(cards, function (index, card) {
    $("#divlayout2").append(card);
  });

});

$("#decs").click(function () {

  let cards = $(".cards").get();

  cards.sort(function (a, b) {
    let nameA = $(a).find(".para").text().toLowerCase();
    let nameB = $(b).find(".para").text().toLowerCase();

    return nameB.localeCompare(nameA);
  });

  $.each(cards, function (index, card) {
    $("#divlayout1").append(card);
  });

});

$("#decs").click(function () {

  let cards = $(".cards2").get();

  cards.sort(function (a, b) {
    let nameA = $(a).find(".para").text().toLowerCase();
    let nameB = $(b).find(".para").text().toLowerCase();

    return nameB.localeCompare(nameA);
  });

  $.each(cards, function (index, card) {
    $("#divlayout2").append(card);
  });

});

//    setupPagination("divlayout1", "cards", "pagination1", 16);










    // breakkkkk--------------------------------------------------------




//----------------------------------- function of pagination -----------------------------------
function setupPagination(containerId, cardClass, paginationId, itemsPerPage) {

  //  let items = $(`#${containerId} .${cardClass}`);
let items = $(`#${containerId} .${cardClass}:visible`);
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

  // ------------------------------------------------breakkkkk--------------------------------------------------------







    // ------------------------------------------------breakkkkk--------------------------------------------------------




 // ------------------------------------------------breakkkkk--------------------------------------------------------


})//end of load
