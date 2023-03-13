 <?php
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    $idSession = session_id();
    header("Access-Control-Allow-Origin: *")
    ?>

 <!DOCTYPE html>
 <html lang="pt-br">


 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width='device-width', initial-scale=1.0">
     <title>DevTech</title>
     <link rel="icon" href="public/imgs/logo.png">

     <!-- Links CSS -->
     <link rel="stylesheet" href="public/styles/estilo.css">
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

     <!-- Links de Fonte: -->
     <script></script>
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

 </head>

 <body>

     <header>
         <input style="display:none" type="text" id="sessionID" value="<?= $idSession ?>" />

         <div class="login-cart">
             <p>Bem Vindo!</p>
             <div class="login-cart-body">
                 <div class="login"><a href="">Entrar</a></div>
                 <div class="cadastro"><a href="">Cadastrar</a></div>
             </div>
             <div class="cart">
                 <i class="fa-solid fa-cart-shopping"></i>
             </div>
             <div class="popup-cart"></div>
         </div>

         <div class="order-completion-screen-empty-display" style="display: none;">
             <div class="order-completion-screen-empty">
                 <div class="order-completion-screen-empty-body">
                     <h5>Infelizmente você ainda não incluiu nenhum item em seu carrinho!</h5>
                     <i class="fa-regular fa-face-sad-tear"></i>
                     <h5>Porém você pode dar uma olhada em nossos produtos, temos certeza que irá gostar de algo!</h5>
                     <button class="btn">Conhecer os Produtos</button>
                 </div>
             </div>
         </div>
         <div class="order-completion-screen-content-display" style="display: none;">
             <div class="order-completion-screen-content">
                 <h4>Carrinho de compras:</h4>
                 <div class="order-completion-screen-content-body"></div>
                 <button style="width: 90%;" class="btn">Finalizar Compra</button>
             </div>
         </div>

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
                     <div class="container">

                     </div>
                 </div>
             </div>

         </div>

         <div class="who-we-are"></div>

     </main>

     <!-- Links JavaScript: -->
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
     <script src="public/js/promocoes.js" defer></script>
     <script src="public/js/scripts.js" defer></script>

 </body>

 </html>