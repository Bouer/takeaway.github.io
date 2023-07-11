document.getElementById("header-nav").innerHTML=
`
<nav class="navbar navbar-expand-md">
    <div class="container d-flex align-items-center">
        <a class="navbar-brand" href="../html/index.html">
            <img src="https://postimg.cc/7JbM7RLh" style="height: 80px" alt="Logo Bytebar">
        </a>
        <button class="navbar-toggler ms-2" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            style="font-size: 25px;" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
        </button>
        <div id="nav-menu-app" class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav mx-auto mb-2 mb-md-0 align-items-center">
                <li class="nav-item mt-2 mr-sm-3 align-items-center">
                    <a href="" class="nav-link text-white">Burgers</a>
                </li>
                <li class="nav-item mt-2 mr-sm-3 align-items-center">
                    <a href="" class="nav-link text-white">Pizzas</a>
                </li>
                <li class="nav-item mt-2 mr-sm-3 align-items-center">
                    <a href="" class="nav-link text-white">Entradas</a>
                </li>
                <li class="nav-item mt-2 mr-sm-3 align-items-center">
                    <a href="" class="nav-link text-white">Bebidas</a>
                </li>
            </ul>
            <div id="fastfood">
                <ul class="navbar-nav mx-auto ml-auto align-items-center">
                    <li v-if="loggedIn" class="nav-item mr-sm-3 align-items-center d-flex">
                        <span class="mt-2 nav-link btn-borde text-white" >{{username}}</span>
                        <div v-if="loggedIn" class="dropdown">
                            <button class="btn btn-secondary btn-sm border-0 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-user" style="color: #ffffff;"></i>
                            </button>
                            <ul class="dropdown-menu dropmenu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <a class="dropdown-item disabled  " href="#">Configuracion</a>
                                </li>
                                <div class="dropdown-divider"></div>
                                <li>
                                    <a href="#" class="dropdown-item" @click="logout">Cerrar sesión</a>
                                </li>
                                <div class="dropdown-divider"></div>
                                <li>
                                    <a v-if="userType==='admin'" class="dropdown-item" href="./html/adminMenu.html">ADMIN Menu</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li v-else="loggedIn" class="nav-item mr-sm-3 align-items-center">
                        <a href="../html/login.html" class="mt-2 nav-link btn-borde text-white">Iniciar Sesion</a>
                    </li>
                    <li class="nav-item align-items-center my-1">
                        <a href="../html/pedidos.html" class="nav-link btn-card text-white">
                        <i class="fas fa-shopping-cart"></i> 0 - $0,00
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>

`
