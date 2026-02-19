$(document).ready(function () {
    // Fetch the list of countries
    $.ajax({
        url: "https://countriesnow.space/api/v0.1/countries",
        method: "GET",
        success: function (response) {
            let countries = response.data;
            let countrySelect = $('#countries');
            countries.forEach(function (country) {
                countrySelect.append($('<option></option>').text(country.country).val(country.country));
            });
        }
    });

    // When a country is selected, fetch the cities for that country
    $('#countries').change(function () {
        let selectedCountry = $(this).val(); 
        $.ajax({
            url: "https://countriesnow.space/api/v0.1/countries/cities",
            method: "POST",
            data: JSON.stringify({ country: selectedCountry }),
            contentType: "application/json",
            success: function (response) {
                let cities = response.data;
                $('#cities').empty();
                cities.forEach(function (city) {
                    $('#cities').append($('<option></option>').text(city).val(city));
                });
                
                $('#cities').parent().removeClass('d-none');
            }
        });
    });

    // When the "Calculate shipping" button is clicked, display the shipping rate

    $('#calc-shipping-btn').click(function () {
        let selectedCountry = $('#countries').val();
        let selectedCity = $('#cities').val();
        let zipCode = $('#zip-code').val();
        if (selectedCountry && selectedCity && zipCode) {
            $('.shipping-rate').empty()
            .append(`<p>There is one shipping rate available for ${zipCode}, ${selectedCity}, ${selectedCity}.</p> <p>Standard at €14,00 EUR</p>`);
            $('.shipping-rate p:first').addClass('text-success');
            $('.shipping-rate p:last').addClass('text-secondary');
        } else {
            $('.shipping-rate').empty()
            .append(`<p>You should select a country, city, and enter a zip code to calculate shipping.</p>`);
            $('.shipping-rate > p').addClass('text-danger fw-bold');
        }
    });
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];
function displayCart() {

  let products = JSON.parse(localStorage.getItem('products'))  
  $('.cart-items').empty()
  
  if (cart.length === 0) {
    
    $('main .container-fluide').empty().append(`<div class="text-center h3 my-5"><span>Your cart is empty</span> <a
                  href="../../productList/Template/product_list.html"
                  class="text-secondary"
                  >Return to store</a
                ></div>`);
     return;
  }
  cart.map(item => {
        const product = products.find(p => p.id === item.product_id);
        
        $('.cart-items').append(`<div class="row align-items-center border-bottom p-2 mb-3">
                  <!-- Product -->
                  <div class="col-12 col-md-6">
                    <div class="card mb-3 bg-transparent border-0">
                      <div class="row g-0 ">
                        <div class="col-4">
                          <img
                            src="${product.images[0]}"
                            class="img-fluid"
                            alt="${product.title}"
                          />
                        </div>
                        <div class="col-8">
                          <div class="card-body p-2">
                            <h5 class="card-title mb-1">Card title</h5>
                            <p class="card-text price fw-bold m-1">
                              $${product.discountvalue}
                              <span
                                class="fw-normal text-decoration-line-through"
                                > $${product.price}
                                </span
                              >
                            </p>
                            <p class="card-text fw-bold m-1">
                              Size: <span class="size fw-normal">
                              ${product.size[0]}
                              </span>
                            </p>
                            <p class="card-text fw-bold m-1">
                              Material:
                              <span class="material fw-normal">
                              ${product.matiral[0]}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Quantity -->
                  <div class="col-6 col-md-3 text-center">
                    <div
                      class="d-flex justify-content-center align-items-center gap-2"
                    >
                      <div class="quantity border d-flex" style="width: 160px">
                        <button
                          class="btn btn-outline-secondary w-25 border-0 rounded-0 decrease-btn"
                          data-id=${product.id}
                          type="button"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          class="w-50 text-center ps-2 border-0"
                          value="${item.quantity}"
                          readonly
                        />
                        <button
                          class="btn btn-outline-secondary w-25 border-0 rounded-0 increase-btn"
                          data-id=${product.id}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <button class="bg-transparent border-0 remove-btn" data-id=${product.id}>
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Total -->
                  <div class="col-6 col-md-3 fw-bold text-center item-total">
                    $${(product.discountvalue * item.quantity).toFixed(2)}
                  </div>
                </div>`);
    });

    calculateSubtotal()

}

$(document).ready(function() {

//addToCart(4,5);

displayCart();
 });

 function removeFromCart(product_id){
  cart = cart.filter(item=>item.product_id !== product_id);
  localStorage.setItem("cart", JSON.stringify(cart));
}
$(document).on("click", ".remove-btn", function() {
  const id = Number($(this).data("id"));
  removeFromCart(id);
  displayCart();
});

function increaseQuantity(product_id){

  const item = cart.find(item => item.product_id === product_id);
console.log(item);

  if (item) {
    item.quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

$(document).on("click", ".increase-btn", function() {
  const id = Number($(this).data("id"));
  increaseQuantity(id);
  displayCart();
});

function decreaseQuantity(product_id){

  const item = cart.find(item => item.product_id === product_id);

  if (item) {
    item.quantity -= 1;
    if (item.quantity < 1) {
      removeFromCart(item.product_id)
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

$(document).on("click", ".decrease-btn", function() {
  const id = Number($(this).data("id"));
  decreaseQuantity(id);
  displayCart();
});


function checkFreeShipping(subtotal){
  $('.progress-truck').css("left", `${subtotal}%`)
  $(".progress-bar").css("width", `${subtotal}%`)
  if (subtotal >=100) {
    $('.progress-truck').css("left", `100%`)
  $(".progress-bar").css("width", `100%`)
  $(".shipping-text").empty().text("Congratulations , you've got free shipping!")
  } else{
    $(".shipping-text").empty().text(`Spend €${100-subtotal} more and get free shipping!`)
  }
}


function calculateSubtotal() {

  let products = JSON.parse(localStorage.getItem('products')) || [];

  let subtotal = 0;

  cart.forEach(item => {

    const product = products.find(p => p.id === item.product_id);
    if (!product) return;

    const price = product.discountvalue || product.price;

    subtotal += price * item.quantity;

  });

  $('.subtotal').empty().text(`$ ${subtotal.toFixed(2)} dollar`)

  checkFreeShipping(subtotal)

}

function checkFreeShipping(subtotal){
  $('.progress-truck').css("left", `${subtotal}%`)
  $(".progress-bar").css("width", `${subtotal}%`)
  if (subtotal >=100) {
    $('.progress-truck').css("left", `100%`)
  $(".progress-bar").css("width", `100%`)
  $(".shipping-text").empty().text("Congratulations , you've got free shipping!")
  return true
  } else{
    $(".shipping-text").empty().text(`Spend €${100-subtotal} more and get free shipping!`)
    return false
  }
}


