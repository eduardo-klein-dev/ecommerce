<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width='device-width', initial-scale=1.0">
    <title>Ecommerce</title>

    <!-- Links CSS -->
    <link rel="stylesheet" href="public/styles/estilo.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- Links de Fonte: -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

</head>

<body>

    <header>
        <div class="container header">
            <div class="header-logo">
                <div class="imagem-logo">
                    <img src="public/imgs/logo.png" alt="">
                </div>
            </div>
            <nav class="header-menu">
                <div class="header-menu-search">
                    <div class="header-menu-search-input">
                        <input type="text" name="loupe" class="form-control" placeholder="Digite o que procura">
                    </div>
                    <div class="header-menu-search-imagem">
                        <a href="index.php"><img src="public/imgs/loupe.png" alt=""></a>
                    </div>
                </div>
                <div class="header-menu-buttons">
                    <ul>
                        <li>
                            <button id="button-start" type="button" class="btn-header active">Início</button>
                        </li>
                        <li>
                            <button type="button" onblur="productsOnBlur()" id="button-products" class="btn-header">Produtos</button>
                        </li>
                        <li>
                            <button type="button" class="btn-header">Quem somos</button>
                        </li>
                        <li>
                            <button type="button" class="btn-header">Contatos</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        <div class="list-products">
            <ul>
                <li>
                    <a href="">Cadeiras Gamers</a>
                </li>
                <li>
                    <a href="">Periféricos</a>
                </li>
                <li>
                    <a href="">Acessórios</a>
                </li>
                <li>
                    <a href="">Cpus e Notebooks</a>
                </li>
                <li>
                    <a href="">Hardware</a>
                </li>
                <li>
                    <a href="">Energia e Rede</a>
                </li>
            </ul>
        </div>

    </header>

    <main>

        <div class="promotions">

            <div class="promotions-opacity">
                <div class="container promotions-body">
                    <div class="tittle-promotions">
                        <h2>Promoções:</h2>
                    </div>
                    <div class="line-tittle"></div>
                    <div id="carouselExampleInterval" class="carousel carousel-dark slide" data-bs-ride="carousel" style="margin-top:30px">
                        <div class="carousel-inner"></div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="purchase-screen">
                    <div class="purchase-screen-body">
                        <div class="purchase-screen-body-left">
                            <div class="purchase-screen-body-left-images">
                                <div class="purchase-screen-body-left-image1">
                                    <img src="public/imgs/produtos/1.png" alt="">
                                </div>
                                <div class="purchase-screen-body-left-image2">
                                    <img src="public/imgs/produtos/1-1.png" alt="">
                                </div>
                                <div class="purchase-screen-body-left-image3">
                                    <img src="public/imgs/produtos/1-2.png" alt="">
                                </div>
                            </div>
                            <div class="purchase-screen-body-left-main-image">
                                <img src="public/imgs/produtos/1.png" alt="">
                            </div>
                        </div>
                        <div class="purchase-screen-body-right">
                            <div class="purchase-screen-body-right-content">
                                <h2>PLACA DE VÍDEO RTX 4090 24GB SG GDDR6X 384BITS</h2>
                                <p>49NXM5MD6DSG</p>
                                <div class="purchase-screen-body-right-content-img">
                                    <img src="public/imgs/fornecedores/1.jpg" alt="">
                                </div>
                                <h1>R$ 13.447,17</h1>
                                <div class="purchase-screen-body-right-content-buttons">
                                    <button type="button" id="button-buy" class="btn btn-success">Adicionar ao carrinho <i class="fa-solid fa-cart-plus"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="fechaProdutos()">Cancelar <i class="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="who-we-are">
            <div class="container">

            </div>
        </div>

    </main>

    <!-- Links JavaScript: -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
    <script src="public/js/promocoes.js" defer></script>
    <script src="public/js/scripts.js" defer></script>

</body>

</html>