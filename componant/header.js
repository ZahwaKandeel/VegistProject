export function header(){
    return`
        <header class="container-fluid px-lg-5 sticky-top p-3 bg-body-secondary">
            <div class="d-flex align-items-center justify-content-between px-xxl-4">
                <section>
                    <a href="/home/Template/home.html">
                        <img src="/Static/Images/logo-1.svg" alt="logo" class="w-50 h-100"/>
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
                                        <li class="nav-item"><a class="nav-link text-body active"href="/home/Template/home.html">Home</a></li>
                                        <li class="nav-item"><a class="nav-link text-body" href="#">Collection</a></li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link text-body dropdown-toggle"
                                                href="/productList/Template/product_list.html"
                                                data-bs-toggle="dropdown">
                                                Shop
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item"href="#">Action</a></li>
                                                <li><a class="dropdown-item"href="#">Another action</a></li>
                                                <li><hr class="dropdown-divider"/></li>
                                                <li><a class="dropdown-item"href="#">Something else here</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link text-body dropdown-toggle"
                                                href="#"
                                                data-bs-toggle="dropdown">
                                                Pages
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item"href="#">Action</a></li>
                                                <li><a class="dropdown-item"href="#">Another action</a></li>
                                                <li><hr class="dropdown-divider"/></li>
                                                <li><a class="dropdown-item"href="#">Something else here</a></li>
                                            </ul>
                                        </li>
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
                                <input class="form-control rounded-pill me-2"
                                    type="search" placeholder="Search our store" aria-label="Search"/>
                                <button class="btn py-2 search-btn input-group-text rounded-pill"
                                    id="search" type="submit">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class=" d-flex align-items-center">
                    <button id="themeToggle" class="btn btn-outline-secondary d-block border border-0 d-block d-xxl-none p-0">🌙</button>
                        <!-- Account icon -->
                        <a href="/account/Template/profile.html" class="icon">
                            <i class="fa-regular fa-user text-body px-1"></i>
                        </a>
                        <div id="account" class="d-none d-xl-flex flex-column">
                            <a href="/account/Template/profile.html" class="fs-6  text-decoration-none secondryTextTheme"><b>Account</b></a>
                            <div class="d-flex">
                                <a href="/auth/Template/register.html" class="border-1 border-end pe-1 fw-light  text-decoration-none secondryTextTheme"
                                    >Register</a
                                >
                                <a href="/auth/Template/login.html" class="fw-light secondryTextTheme  ms-1 text-decoration-none">Login</a>
                            </div>
                        </div>
                        <!-- Heart icon -->
                        <a href="" class="icon">
                            <i class="fa-regular fa-heart text-body px-1"></i>
                        </a>
                        <!-- Bag icon -->
                        <a href="/cart/Template/cart.html" class="icon">
                            <i class="fa-solid fa-bag-shopping text-body px-1"></i>
                        </a>
                    </div>
                </section>
            </div>
            <hr class="d-none d-xxl-block mx-4 my-2"/>
            <section class="d-none d-xxl-flex justify-content-between px-4">
                <nav>
                    <ul class="nav nav-tabs justify-content-around col-12 gap-5">
                        <li class="nav-item"><a class="nav-link text-body active" href="/home/Template/home.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link text-body" href="#">Collection</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link text-body dropdown-toggle"
                                href="#"
                                id="shopDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Shop
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown"><a class="nav-link text-body dropdown-toggle"href="#"data-bs-toggle="dropdown">Pages</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <button id="themeToggle" class="btn btn-outline-secondary d-block border border-0">🌙</button>
            </section>
        </header>
    `
}


