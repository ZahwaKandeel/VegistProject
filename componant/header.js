export function header(){
    return`
        <header class="container-fluid px-lg-5 sticky-top p-3 bg-body-secondary">
            <div class="d-flex align-items-center justify-content-between px-xxl-4">
                <section>
                    <a href="home.html">
                        <img src="Static/Images/logo-1.svg" alt="logo" class="w-50 h-100"/>
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
                        <div class="container">
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
                                        <li class="nav-item"><a class="nav-link text-body active"href="home.html">Home</a></li>
                                        <li class="nav-item"><a class="nav-link text-body" href="#">Collection</a></li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link text-body dropdown-toggle"
                                                href="product_list.html"
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
                    <div class="d-flex d-lg-none mt-4">
                        <button
                            class="btn btn mb-4 p-0"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#searchOffcanvas"
                            aria-controls="searchOffcanvas"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" 
                                width="40" height="40" class="mx-1 text-body">
                                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/>
                            </svg>
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
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="45"
                            height="45" class="mx-1">
                            <path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/></svg>
                        </a>
                        <div id="account" class="d-none d-xl-flex flex-column">
                            <a href="profile.html" class="fs-6  text-decoration-none secondryTextTheme"><b>Account</b></a>
                            <div class="d-flex">
                                <a href="register.html" class="border-1 border-end pe-1 fw-light  text-decoration-none secondryTextTheme"
                                    >Register</a
                                >
                                <a href="login.html" class="fw-light secondryTextTheme  ms-1 text-decoration-none">Login</a>
                            </div>
                        </div>
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"width="45" 
                            height="45" class="mx-1">
                                <path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"/>
                            </svg>
                        </a>
                        <a href="cart.html">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="45"
                                height="45"class="cart-icon mx-1">
                                <path d="M256 144C256 108.7 284.7 80 320 80C355.3 80 384 108.7 384 144L384 192L256 192L256 144zM208 192L144 192C117.5 192 96 213.5 96 240L96 448C96 501 139 544 192 544L448 544C501 544 544 501 544 448L544 240C544 213.5 522.5 192 496 192L432 192L432 144C432 82.1 381.9 32 320 32C258.1 32 208 82.1 208 144L208 192zM232 240C245.3 240 256 250.7 256 264C256 277.3 245.3 288 232 288C218.7 288 208 277.3 208 264C208 250.7 218.7 240 232 240zM384 264C384 250.7 394.7 240 408 240C421.3 240 432 250.7 432 264C432 277.3 421.3 288 408 288C394.7 288 384 277.3 384 264z"/>
                            </svg>
                        </a>
                    </div>
                </section>
            </div>
            <hr class="d-none d-xxl-block mx-4 my-2"/>
            <section class="d-none d-xxl-flex justify-content-between px-4">
                <nav>
                    <ul class="nav nav-tabs justify-content-around col-12 gap-5">
                        <li class="nav-item"><a class="nav-link text-body active" href="home.html">Home</a></li>
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


