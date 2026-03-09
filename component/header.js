import { getBasePath } from "./basepath.js";

const basepath = getBasePath();
const products = JSON.parse(localStorage.getItem("products")) || [];
const user = JSON.parse(localStorage.getItem("currentUser")) || {};
const name = user.firstName;

export function header() {
    const authButtons = name
        ? ""
        : `<div class="d-flex">
                <a href="${basepath}auth/Template/register.html" class="border-1 border-end pe-1 fw-light  text-decoration-none secondryTextTheme"
                    >Register</a
                >
                <a href="${basepath}auth/Template/login.html" class="fw-light secondryTextTheme  ms-1 text-decoration-none">Login</a>
            </div>`;
        
    
    const role = user.role;
    console.log("role:", role);
    let roleMenu = "";
    if (role === "seller") {
        roleMenu = '<li><a class="dropdown-item sellerdash" href="/seller/Template/sellerdash.html">Seller Dashboard</a></li>';
        }
        else if (role === "admin") {
            roleMenu = '<li><a class="dropdown-item adminpanel" href="/admin/Template/adminPanal.html">Admin Panel</a></li>';
        }

    $(document).ready(function () {
        const resultContainer = $(".searchResults");

        function handelSearch(inputElement) {
            const value = $(inputElement).val().toLowerCase().trim();

            if (value === "") {
                resultContainer.addClass("d-none").empty();
                return;
            }
            const matches = products.filter(product =>
                product._name.toLowerCase().includes(value)
            );

            resultContainer.empty();

            if (matches.length === 0) {
                resultContainer.addClass("d-none");
                return;
            }

            matches.forEach(product => {
                const item = $(`
                        <div class="search-item p-2 border-bottom">
                            <strong>${product._name}</strong>
                            <div class="small text-muted">${product._category}</div>
                        </div>
                    `);
                item.on("click", function() {
                    window.location.href = `/productDetails/Template/productDetails.html?id=${product._id}`;
                });

                resultContainer.append(item);
            });
            
            resultContainer.removeClass("d-none");
        };
        //fullScreen search
        $("#global-search").on("input", function() {
            handelSearch(this);
        })

        // offCanvas search
        $("#searchOffCanvas").on("input", function() {
            handelSearch(this);
        })
    })

    return `
        <header class="container-fluid px-lg-5 sticky-top p-3 bg-body">
            <div class="d-flex align-items-center justify-content-between px-xxl-4">
                <section>
                    <a href="${basepath}home/Template/home.html">
                        <img src="${basepath}Static/Images/logo-1.svg" alt="logo" class="w-50 h-100"/>
                    </a>
                </section>
                <form class="d-none d-lg-flex input-group w-50" role="search">
                    <label for="global-search" class="d-flex position-relative w-100">
                        <input
                            class="form-control rounded-pill d-block w-100"
                            type="search"
                            id="global-search"
                            placeholder="Search our store"
                            aria-label="Search"
                        />
                        <button
                            class="btn py-2 search-btn input-group-text rounded-pill position-absolute end-0 h-100"
                            id="search"type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <div class="position-absolute bg-white w-100 shadow rounded mt-1 searchResults"></div>
                    </label>
                </form>
                <section class="d-flex align-items-center">
                    <nav class="navbar d-xxl-none">
                        <div class="container px-0">
                            <button
                                class="navbar-toggler border-0 p-0"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar"
                                aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div
                                class="offcanvas offcanvas-end"
                                tabindex="-1"
                                id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel"
                            >
                                <div class="offcanvas-header">
                                    <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div class="offcanvas-body">
                                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li class="nav-item"><a class="nav-link text-body active"href="${basepath}home/Template/home.html">Home</a></li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link text-body dropdown-toggle"
                                                href="${basepath}productList/Template/product_list.html"
                                                data-bs-toggle="dropdown">
                                                Collection
                                            </a>
                                            <ul class="dropdown-menu collectionMenu"></ul>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link text-body dropdown-toggle"
                                                href="#"
                                                data-bs-toggle="dropdown">
                                                Pages
                                            </a>
                                            <ul class="dropdown-menu pagesMenu">
                                                <li><a class="dropdown-item" href="/home/Template/home.html">Home</a></li>
                                                <li><a class="dropdown-item" href="/productList/Template/product_list.html">Catalog</a></li>
                                                <li><hr class="dropdown-divider"/></li>
                                                ${roleMenu}
                                            </ul>
                                        </li>
                                        <li class="nav-item"><a class="nav-link text-body" href="/aboutus/Template/aboutUs.html">About us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div class="d-flex d-lg-none mt-4 px-1"> <!-- maginfier icon -->
                        <button
                            class="btn btn mb-4 p-0"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#searchOffcanvas"
                            aria-controls="searchOffcanvas"
                        >
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <!-- Offcanvas panel from top -->
                    <div
                        class="offcanvas offcanvas-top"
                        tabindex="-1"
                        id="searchOffcanvas"
                        aria-labelledby="searchOffcanvasLabel"
                    >
                        <div class="offcanvas-header text-center">
                            <button
                                type="button"
                                class="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="offcanvas-body">
                            <h5 class="offcanvas-title text-center">
                                What are you looking for?
                            </h5>
                            <br />
                            <form class="d-flex input-group" role="search">
                                <input id="searchOffCanvas" class="form-control rounded-pill me-2"
                                    type="search" placeholder="Search our store" aria-label="Search"/>
                                <button class="btn py-2 search-btn input-group-text rounded-pill"
                                    id="search" type="submit">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                                <div class="position-absolute bg-white w-100 shadow rounded mt-1 searchResults"></div>
                            </form>
                        </div>
                    </div>
                    <div class=" d-flex align-items-center">
                    <button id="themeToggle" class="btn btn-outline-secondary d-block border border-0 d-block d-xxl-none p-0 icon-size">🌙</button>
                        <!-- Account icon -->
                        <a href="${basepath}account/Template/profile.html">
                            <i class="fa-regular fa-user text-body px-1 icon-size"></i>
                        </a>
                        <div id="account" class="d-none d-xl-flex flex-column">
                            <a href="${basepath}account/Template/profile.html" class="fs-6  text-decoration-none secondryTextTheme"><b>${name || "Account"}</b></a>
                            ${authButtons}
                        </div>
                        <!-- Heart icon -->
                        <a href="${basepath}wishlist/Template/wishlist.html">
                            <i class="fa-regular fa-heart text-body px-1 icon-size"></i>
                        </a>
                        <!-- Bag icon -->
                        <a href="${basepath}cart/Template/cart.html">
                            <i class="fa-solid fa-bag-shopping text-body px-1 icon-size"></i>
                        </a>
                    </div>
                </section>
            </div>
            <hr class="d-none d-xxl-block mx-4 my-2"/>
            <section class="d-none d-xxl-flex justify-content-between px-4">
                <nav>
                    <ul class="nav nav-tabs justify-content-around col-12 gap-5">
                        <li class="nav-item"><a class="nav-link text-body active" href="${basepath}home/Template/home.html">Home</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link text-body dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Collection
                            </a>
                            <ul class="dropdown-menu collectionMenu"></ul>
                        </li>
                        <li class="nav-item dropdown"><a class="nav-link text-body dropdown-toggle" href="#" data-bs-toggle="dropdown">Pages</a>
                            <ul class="dropdown-menu pagesMenu">
                                <li><a class="dropdown-item" href="/home/Template/home.html">Home</a></li>
                                <li><a class="dropdown-item" href="/productList/Template/product_list.html">Catalog</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                ${roleMenu}
                            </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link text-body" href="/aboutus/Template/aboutUs.html">About us</a></li>
                    </ul>
                </nav>
                <button id="themeToggle" class="btn btn-outline-secondary d-block border border-0 icon-size py-0">🌙</button>
            </section>
        </header>
    `;
}


export function loadCategorires() {
    const categories = new Set();
    console.log("products",products)
    console.log("menu:", $(".collectionMenu"));
    
    products.forEach(product => {
        categories.add(product._category)
    });
    
    categories.forEach(category => {
        $(".collectionMenu").append(
            `
            <li><a class="dropdown-item category-item" href="#">${category}</a></li>
            `
        )
    })

        $(".category-item").on("click", function() {
        const name = $(this).text().trim();
        console.log("name: ", name);
        window.location.href = `/productList/Template/product_list.html?category=${encodeURIComponent(name)}`;
    })
}
