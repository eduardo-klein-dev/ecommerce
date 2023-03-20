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

 <body >

     <header>
         <input style="display:none" type="text" id="sessionID" value="<?= $idSession ?>" />

         <div class="login-cart">
             <div style="width: 150px;" id="nome-pagina">
                 <p id="user-info">Bem Vindo!</p>
             </div>
             <div class="login-cart-body">
                 <div id="link-entrar" class="login"><u>Entrar</u></div>
                 <div id="link-cadastro" class="cadastro"><u>Cadastrar</u></div>
             </div>
             <div class="cart">
                 <i class="fa-solid fa-cart-shopping"></i>
             </div>
             <div class="popup-cart"></div>
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

        

     <!-- Links JavaScript: -->
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
     <script src="public/js/promocoes.js" defer></script>
     <script src="public/js/scripts.js" defer></script>
     <script src="public/js/login.js" defer></script>
     <script src="public/js/cookie.js" defer></script>

 </body>

 </html>