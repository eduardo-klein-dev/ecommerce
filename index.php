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

 <body onload="verificaCarrinhoPopUp(idProdutoInserido), consultaCookieStatus(session), consultaCookie(session), pegaValorId()">

     <div class="cookie" style="display: none;">
         <div class="cookie-body">
             <h4><u><i class="fa-solid fa-cookie"></i> Este site usa Cookies</u></h4>
             <label>Nós armazenamos dados temporiamente para melhorar a sua experiência de navegação em nosso site. Ao utilizar nossos serviços, você concorda com isso.</label>
             <br>
             <button onclick="cliqueAlteraCookie()" id="btn-aceita-cookie" type="button" class="btn btn-light mt-3">Aceitar</button>
         </div>
     </div>

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

         <div class="order-completion-screen-empty-display" style="display: none;">
             <div class="order-completion-screen-empty">
                 <div class="order-completion-screen-empty-body">
                     <h5>Infelizmente você ainda não incluiu nenhum item em seu carrinho!</h5>
                     <i class="fa-regular fa-face-sad-tear"></i>
                     <h5>Porém você pode dar uma olhada em nossos produtos, temos certeza que irá gostar de algo!</h5>
                     <button onclick="fechaTelaVaziaCart()" class="btn">Conhecer os Produtos</button>
                 </div>
             </div>
         </div>
         <div class="order-completion-screen-content-display" style="display: none;">
             <div class="order-completion-screen-content">
                 <h4>Carrinho de compras:</h4>
                 <div class="sublime-cart"></div>
                 <div class="order-completion-screen-content-body"></div>
                 <button id='checkout_button' onclick="cliqueBotaoEnvia()" style="width: 90%;" class="btn">Finalizar Compra</button>
                 <div class="close-cart" onclick="fechaTelaItemCart()"><i class="fa-solid fa-xmark"></i></div>
             </div>
         </div>
         <div class="order-completion-screen-content-display-exclude" style="display: none;">
             <div class="order-completion-screen-content-exclude">
                 <h4>Tens certeza que deseja excluir o item:</h4>
                 <div class="order-completion-screen-content-exclude-body"></div>
                 <h4>De seu pedido?</h4>
                 <div class="order-completion-screen-content-display-exclude-buttons">
                     <button id="btn-confirm-exclude" class="btn btn-success">Sim</button>
                     <button id="btn-delete-exclude" class="btn btn-danger">Não</button>
                 </div>
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

         <div class="screen-login" style="display: none;">
             <div class="screen-login-bottom">
                 <div class="screen-login-body">
                     <div class="screen-login-body-right">
                         <img src="public/imgs/logo-cart.png" alt="">
                     </div>
                     <div class="screen-login-body-left">
                         <h4>Para poder prosseguir com a compra de seus pedidos você precisa estar logado em uma conta</h4>
                         <form id="form-login">
                             <div class="mb-3">
                                 <label style="margin-left: -370px;" class="form-label">Email:</label>
                                 <input id="login-email" type="email" class="form-control" required>
                                 <div id="emailHelp" class="form-text">Nunca compartilharemos seu e-mail com mais ninguém.</div>
                             </div>
                             <div class="mb-3">
                                 <label style="margin-left: -370px;" class="form-label">Senha:</label>
                                 <input id="login-senha" type="password" class="form-control" required>
                             </div>
                             <div class="mb-3 form-check">
                                 <input type="checkbox" class="form-check-input" id="checkbox-lembre-de-mim">
                                 <label style="margin-left: -290px;">Lembre de mim</label>
                             </div>
                             <div class="mb-3" style="margin-top: -10px;">
                                 <label style="margin-left: -210px;">Não tenho login, <u id="link-cadastrar">cadastrar-se</u></label>
                             </div>
                             <button id="btn-valida-login" onclick="cliqueValidaLogin()" class="btn btn-light">OK</button>
                         </form>
                         <div class="close-screen-login"><i class="fa-solid fa-xmark"></i></div>
                     </div>
                 </div>
                 <div id="text-confirm-login" style="display: none;">
                     <label>Usuário ou Senha Inválidos! Revise as informações inseridas!</label>
                 </div>
             </div>
         </div>

         <div class="registration-screen" style="display: none;">
             <div class="screen-registration-bottom">
                 <div class="screen-registration-body">
                     <div class="screen-registration-body-content">
                         <div style="text-align: center; margin-bottom: 20px;">
                             <h4><u>Entre com as informações solicitadas para criar seu cadastro:</u></h4>
                         </div>
                         <form id="form-cadastro">
                             <div>
                                 <label class="form-label">*Nome Completo:</label>
                                 <input id="input-nome-completo" type="text" class="form-control" required>
                                 <small class="form-text text-muted mb-2">Ex.: Fulano de Ciclano da Silva</small>
                             </div>
                             <div id="email-senha">
                                 <div id="input-email">
                                     <label class="form-label mt-2">*Email:</label>
                                     <input id="input-campo-email" type="email" class="form-control" required>
                                     <small class="form-text text-muted">Ex.: fulano@gmail.com</small>
                                 </div>
                                 <div>
                                     <label class="form-label mt-2">*Senha:</label>
                                     <input id="input-senha" type="password" class="form-control" required>
                                     <small class="form-text text-muted mb-2">Ex.: A senha deve ter no mínimo 6 dígitos.</small>
                                 </div>
                             </div>
                             <div id="rua-bairro">
                                 <div id="input-rua">
                                     <label class="form-label mt-2">Rua:</label>
                                     <input id="input-campo-rua" type="text" class="form-control">
                                 </div>
                                 <div>
                                     <label class="form-label mt-2">Bairro:</label>
                                     <input id="input-campo-bairro" type="text" class="form-control">
                                 </div>
                             </div>
                             <div id="cidade-estado">
                                 <div id="input-cidade">
                                     <label class="form-label mt-2">Cidade:</label>
                                     <input id="input-campo-cidade" type="text" class="form-control">
                                 </div>
                                 <div>
                                     <label class="form-label mt-2">Estado:</label>
                                     <select id="input-campo-estado" class="form-control">
                                         <option>Escolha a opção</option>
                                         <option>Acre</option>
                                         <option>Alagoas</option>
                                         <option>Amapá</option>
                                         <option>Amazonas</option>
                                         <option>Bahia</option>
                                         <option>Ceará</option>
                                         <option>Espírito Santo</option>
                                         <option>Goiás</option>
                                         <option>Maranhão</option>
                                         <option>Mato Grosso</option>
                                         <option>Mato Grosso do Sul</option>
                                         <option>Pará</option>
                                         <option>Paraíba</option>
                                         <option>Paraná</option>
                                         <option>Pernambuco</option>
                                         <option>Piauí</option>
                                         <option>Rio de Janeiro</option>
                                         <option>Rio Grande do Norte</option>
                                         <option>Rio Grande do Sul</option>
                                         <option>Rondônia</option>
                                         <option>Roraima</option>
                                         <option>Santa Catarina</option>
                                         <option>São Paulo</option>
                                         <option>Sergipe</option>
                                         <option>Tocantins</option>
                                     </select>
                                 </div>
                             </div>
                             <div class="mt-2" style="margin-top: -10px;color: rgb(250, 0, 0);">
                                 <label>*Campos Obrigatórios</label>
                             </div>
                             <div class="mt-1" style="margin-top: -10px;">
                                 <label>Já tenho login, <u id="link-login">entrar</u></label>
                             </div>
                             <div style="text-align: center;">
                                 <button type="submit" onclick="cliqueEnviaCadastro()" class="btn btn-light">Enviar</button>
                             </div>
                         </form>
                         <div class="close-screen-registration"><i class="fa-solid fa-xmark"></i></div>
                     </div>
                 </div>
             </div>
         </div>

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

                 <div class="container">
                     <div class="purchase-screen">
                         <div class="container"></div>
                     </div>
                 </div>
             </div>
         </div>

         <div class="final-order" style="display: none;">
             <div class="final-order-opacity">
                 <div class="final-order-body container">
                     <div class="final-order-body-left">
                         <div class="tittle-final-order-left">
                             <h2>Itens do Pedido:</h2>
                         </div>
                         <div class="line-tittle"></div>
                         <div id="seus-itens"><strong>Seus Itens:</strong></div>
                         <div class="list-products-final-order"></div>
                         <div id="total-valor-itens"><strong>Valor Total: </strong></div>
                         <div class="final-order-body-left-address">
                             <div class="tittle-final-order-left">
                                 <h2>Endereço de Entrega:</h2>
                             </div>
                             <div class="line-tittle"></div>
                             <div class="final-order-body-left-address-body">
                                 <form>
                                     <div class="form-group">
                                         <div id="rua-bairro-address">
                                             <div>
                                                 <label class="form-label mt-2">Rua:</label>
                                                 <input id="input-rua-confirm" type="text" class="form-control">
                                             </div>
                                             <div>
                                                 <label class="form-label mt-2">Bairro:</label>
                                                 <input id="input-bairro-confirm" type="text" class="form-control">
                                             </div>
                                         </div>
                                         <div id="cidade-estado-address">
                                             <div>
                                                 <label class="form-label mt-2">Cidade:</label>
                                                 <input id="input-cidade-confirm" type="text" class="form-control">
                                             </div>
                                             <div>
                                                 <label class="form-label mt-2">Estado:</label>
                                                 <input id="input-estado-confirm" type="text" class="form-control">
                                             </div>
                                         </div>
                                         <div class="final-order-address-buttons">
                                             <div id="div-botao-confirma"><button id="button-confirm-address" onclick="cliqueConfirmaEndereço()" type="button" class="btn btn-light">Confirmar Endereço</button></div>
                                             <div id="div-botao-altera"><button id="button-change-address" onclick="cliqueAlteraEndereço()" type="button" class="btn btn-light">Outro Endereço de Entrega</button></div>
                                         </div>
                                     </div>
                                 </form>
                                 <div class="final-order-address-confirm" style="display: none;">
                                     <h5>Endereço Confirmado!</h5>
                                 </div>
                                 <div class="final-order-address-erro" style="display: none;">
                                     <h5>Endereço Incorreto! Favor verificar os campos inseridos!</h5>
                                 </div>
                                 <div class="line-address"></div>
                                 <div class="choice-delivery">
                                     <div class="choice-delivery-item">
                                         <div class="choice-delivery-item-icon"><i class="fa-solid fa-truck-fast"></i></div>
                                         <div class="choice-delivery-item-content">
                                             <h5>Entrega Express (De 5 a 7 dias úteis) - R$20,00</h5>
                                         </div>
                                         <div class="choice-delivery-item-option"><input class="form-check-input" type="checkbox" value="option1"></div>
                                     </div>
                                     <div class="choice-delivery-item">
                                         <div class="choice-delivery-item-icon"><i class="fa-solid fa-truck"></i></div>
                                         <div class="choice-delivery-item-content">
                                             <h5>Entrega Normal (De 10 a 15 dias úteis) - R$10,00</h5>
                                         </div>
                                         <div class="choice-delivery-item-option"><input class="form-check-input" type="checkbox" value="option2"></div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="final-order-body-right" id="methods-payment">
                         <div class="tittle-final-order-right">
                             <h2 id="titulo-pagamentos">Forma de Pagamento:</h2>
                         </div>
                         <div class="line-tittle-payments"></div>
                         <div class="tittle-final-order-right-body">
                             <div id="payment-option-1" class="payment-option">
                                 <div class="payment-option-1-front">
                                     <i class="fa-solid fa-credit-card"></i>
                                     <h5>Cartão de Crédito</h5>
                                 </div>
                                 <div class="payment-option-1-back">
                                     <h5><strong>Parcelas até 8x sendo até 5x sem juros!</strong></h5>
                                 </div>
                             </div>
                             <div id="payment-option-2" class="payment-option">
                                 <div class="payment-option-2-front">
                                     <i class="fa-regular fa-credit-card"></i>
                                     <h5>Cartão de Débito</h5>
                                 </div>
                                 <div class="payment-option-2-back">
                                     <h5><strong>10% de desconto nesta forma de pagamento!</strong></h5>
                                 </div>
                             </div>
                             <div id="payment-option-3" class="payment-option">
                                 <div class="payment-option-3-front">
                                     <i class="fa-brands fa-pix"></i>
                                     <h5>PIX</h5>
                                 </div>
                                 <div class="payment-option-3-back">
                                     <h5><strong>15% de desconto nesta forma de pagamento!</strong></h5>
                                 </div>
                             </div>
                             <div id="payment-option-4" class="payment-option">
                                 <div class="payment-option-4-front">
                                     <i class="fa-solid fa-file-invoice-dollar"></i>
                                     <h5>Boleto</h5>
                                 </div>
                                 <div class="payment-option-4-back">
                                     <h5><strong>Emitimos boleto 7 dias para pagamento!</strong></h5>
                                 </div>
                             </div>
                             <div id="payment-option-5" class="payment-option">
                                 <div class="payment-option-5-front">
                                     <i class="fa-solid fa-wallet"></i>
                                     <h5>Carteira Digital</h5>
                                 </div>
                                 <div class="payment-option-5-back">
                                     <h5><strong>Aceitamos as mais famosas carteiras digitais!</strong></h5>
                                 </div>
                             </div>
                         </div>
                         <div class="end-of-order-completion">
                             <div class="tittle-final-end-left">
                                 <h2>Finalizar Pedido:</h2>
                             </div>
                             <div class="line-tittle-payments"></div>
                             <div class="end-of-order-completion-body">
                                 <h5 style="font-size: 22px; width: 400px; text-align: center;">Aguardando a confirmação de endereço, forma de entrega e pagamento...</h5>
                                 <i style="margin-top: 5px; margin-bottom: 20px; font-size: 50px; text-align: center;" class="fa-regular fa-clock"></i>
                                 <div class="end-of-order-completion-body-table"></div>
                             </div>
                         </div>
                     </div>
                     <div id="method-card" class="final-order-body-right-card" style="display: none;">
                         <div class="tittle-final-order-right">
                             <h2>Forma de Pagamento:</h2>
                         </div>
                         <div class="line-tittle"></div>
                         <div class="tittle-final-order-right-body-card">
                             <i id="close-cart-payment" class="fa-solid fa-xmark"></i>
                             <form id="form-credit">
                                 <div>
                                     <label>Numero do cartão</label>
                                     <input id="cartao-credit-input" type="text" class="form-control" maxlength="16" required>
                                 </div>
                                 <div>
                                     <label>Nome do titular do cartão</label>
                                     <input id="nome-credit-input" type="text" class="form-control" required>
                                 </div>
                                 <div>
                                     <label>Vencimento (Mês - Ano)</label>
                                     <div id="vencimento">
                                         <div>
                                             <select id="mes-cartao-input" class="form-control" required>
                                                 <option selected>1</option>
                                                 <option>2</option>
                                                 <option>3</option>
                                                 <option>4</option>
                                                 <option>5</option>
                                                 <option>6</option>
                                                 <option>7</option>
                                                 <option>8</option>
                                                 <option>9</option>
                                                 <option>10</option>
                                                 <option>11</option>
                                                 <option>12</option>
                                             </select>
                                         </div>
                                         <div>
                                             <select id="ano-cartao-input" class="form-control" required>
                                                 <option selected>2023</option>
                                                 <option>2024</option>
                                                 <option>2025</option>
                                                 <option>2026</option>
                                                 <option>2027</option>
                                                 <option>2028</option>
                                                 <option>2029</option>
                                                 <option>2030</option>
                                                 <option>2031</option>
                                                 <option>2032</option>
                                                 <option>2033</option>
                                                 <option>2034</option>
                                             </select>
                                         </div>
                                         <div id="cvv">
                                             <label>CVV:</label>
                                             <input id="cvv-input-credit" type="text" maxlength="3" class="form-control" required>
                                         </div>
                                     </div>
                                     <div>
                                         <label>Número de parcelas</label>
                                         <select id="parcelas" class="form-control" required>
                                             <option></option>
                                             <option></option>
                                             <option></option>
                                             <option></option>
                                             <option></option>
                                             <option></option>
                                             <option></option>
                                             <option></option>
                                         </select>
                                     </div>
                                     <div id="button-confirm-card">
                                         <button id="btn-confirm-credit" type="submit" class="btn btn-primary">Confirmar</button>
                                     </div>
                                 </div>
                             </form>
                         </div>
                     </div>
                     <div id="method-card-debit" class="final-order-body-right-card" style="display: none;">
                         <div class="tittle-final-order-right">
                             <h2>Forma de Pagamento:</h2>
                         </div>
                         <div class="line-tittle"></div>
                         <div class="tittle-final-order-right-body-card">
                             <i id="close-cart-debit-payment" class="fa-solid fa-xmark"></i>
                             <form id="form-debit">
                                 <div>
                                     <label>Numero do cartão</label>
                                     <input id="cartao-debit-input" type="text" class="form-control" maxlength="16" required>
                                 </div>
                                 <div>
                                     <label>Nome do titular do cartão</label>
                                     <input id="nome-debit-input" type="text" class="form-control" required>
                                 </div>
                                 <div>
                                     <label>Vencimento</label>
                                     <div id="vencimento">
                                         <div>
                                             <select id="mes-cartao-input" class="form-control" required>
                                                 <option selected>1</option>
                                                 <option>2</option>
                                                 <option>3</option>
                                                 <option>4</option>
                                                 <option>5</option>
                                                 <option>6</option>
                                                 <option>7</option>
                                                 <option>8</option>
                                                 <option>9</option>
                                                 <option>10</option>
                                                 <option>11</option>
                                                 <option>12</option>
                                             </select>
                                         </div>
                                         <div>
                                             <select id="ano-cartao-input" class="form-control" required>
                                                 <option selected>2023</option>
                                                 <option>2024</option>
                                                 <option>2025</option>
                                                 <option>2026</option>
                                                 <option>2027</option>
                                                 <option>2028</option>
                                                 <option>2029</option>
                                                 <option>2030</option>
                                                 <option>2031</option>
                                                 <option>2032</option>
                                                 <option>2033</option>
                                                 <option>2034</option>
                                             </select>
                                         </div>
                                         <div id="cvv">
                                             <label>CVV:</label>
                                             <input id="cvv-input-debit" type="text" maxlength="3" class="form-control" required>
                                         </div>
                                     </div>
                                     <div id="button-confirm-card-debit">
                                         <button id="btn-confirm-debit" type="submit" class="btn btn-primary">Confirmar</button>
                                     </div>
                                 </div>
                             </form>
                         </div>
                     </div>
                     <div id="method-pix" class="final-order-body-right-card" style="display: none;">
                         <div class="tittle-final-order-right">
                             <h2>Forma de Pagamento:</h2>
                         </div>
                         <div class="line-tittle"></div>
                         <div class="tittle-final-order-right-body-card">
                             <i id="close-pix" class="fa-solid fa-xmark"></i>
                             <form id="form-pix">
                                 <div>
                                     <div class="form-group">
                                         <label>Nome completo</label>
                                         <input id="nome-pix" type="text" class="form-control" required>
                                     </div>
                                     <div class="form-group">
                                         <label>CPF</label>
                                         <input id="cpf-pix" class="form-control cpf-input" maxlength="11" type="text" required>
                                     </div>
                                     <div class="form-group">
                                         <label>E-mail</label>
                                         <input id="email-pix" type="email" class="form-control" required>
                                     </div>
                                     <div style="text-align: center; color: #fff;">
                                         <small>Enviaremos o qrCode por e-mail para pagamento via PIX.<br>(Nosso e-mail de contato é financeiro@devtech.com.br cuidado com golpes de spam)</small>
                                     </div>
                                     <div id="button-confirm-pix">
                                         <button id="btn-confirm-pix" type="submit" class="btn btn-primary">Confirmar</button>
                                     </div>
                                 </div>
                             </form>
                         </div>
                     </div>
                     <div id="method-boleto" class="final-order-body-right-card" style="display: none;">
                         <div class="tittle-final-order-right">
                             <h2>Forma de Pagamento:</h2>
                         </div>
                         <div class="line-tittle"></div>
                         <div class="tittle-final-order-right-body-card">
                             <i id="close-boleto" class="fa-solid fa-xmark"></i>
                             <form id="form-boleto">
                                 <div>
                                     <div class="form-group">
                                         <label>Nome completo</label>
                                         <input id="nome-boleto" type="text" class="form-control" required>
                                     </div>
                                     <div class="form-group">
                                         <label>CPF</label>
                                         <input id="cpf-boleto" class="form-control cpf-input" type="text" maxlength="11" required>
                                     </div>
                                     <div class="form-group">
                                         <label>E-mail</label>
                                         <input id="email-boleto" type="email" class="form-control" required>
                                     </div>
                                     <div style="text-align: center; color: #fff;">
                                         <small>Enviaremos o boleto por e-mail para você.<br>(Nosso e-mail de contato é financeiro@devtech.com.br cuidado com golpes de spam)</small>
                                     </div>
                                     <div id="button-confirm-boleto">
                                         <button id="btn-confirm-boleto" type="submit" class="btn btn-primary">Confirmar</button>
                                     </div>
                                 </div>
                             </form>
                         </div>
                     </div>
                     <div id="method-carteira-digital" class="final-order-body-right-card" style="display: none;">
                         <div class="tittle-final-order-right">
                             <h2>Forma de Pagamento:</h2>
                         </div>
                         <div class="line-tittle"></div>
                         <div class="tittle-final-order-right-body-card">
                             <i id="close-carteira-digital" class="fa-solid fa-xmark"></i>
                             <form id="form-carteiradigital">
                                 <div>
                                     <div class="form-group">
                                         <label>Nome completo</label>
                                         <input id="nome-carteiradigital" type="text" class="form-control" required>
                                     </div>
                                     <div class="form-group">
                                         <label>CPF</label>
                                         <input id="cpf-carteiradigital" class="cpf-input form-control" type="text" maxlength="11" required>
                                     </div>
                                     <div class="form-group">
                                         <label>E-mail (conta da carteira digital utlizada)</label>
                                         <input id="email-carteiradigital" type="email" class="form-control" required>
                                     </div>
                                     <div style="text-align: center; color: #fff;">
                                         <small>Enviaremos o link por e-mail com um redirecionamento para o App da Carteira Digital.<br>(Nosso e-mail de contato é financeiro@devtech.com.br cuidado com golpes de spam)</small>
                                     </div>
                                     <div id="button-confirm-carteira-digital">
                                         <button id="btn-confirm-carteiradigital" type="submit" class="btn btn-primary">Confirmar</button>
                                     </div>
                                 </div>
                             </form>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
         </div>
         </div>

     </main>

     <script>
         function consultaCookieStatus(session) {
             $.ajax({
                 url: 'http://localhost:8000/api/ecommerce/consultacookie/' + session,
                 type: 'GET',
                 dataType: 'json',

                 beforeSend: function() {
                     $('.purchase-screen').html('<div style="margin-top:20px" class="carregando col-md-12">Carregando...</div>');
                 },

                 success: function(json) {

                     for (var i in json) {

                         if (json[i].status == 'SIM') {
                             telaCookie.style.display = 'none'
                         } else {
                             telaCookie.style.display = 'block'
                         }
                     }

                 }
             })
         };


         function getCookie(name) {
             var value = "; " + document.cookie;
             var parts = value.split("; " + name + "=");
             if (parts.length == 2) {
                 return parts.pop().split(";").shift();
             }
         }
         var nome = getCookie("Login");
         if (nome) {
             document.getElementById("user-info").innerHTML = "Olá, " + nome + "!";
             var c = document.querySelector('.login-cart-body');
             var cart = document.querySelector('.cart');
             var popup = document.querySelector('.popup-cart');

             c.innerHTML = '';
             cart.style.marginTop = '10px';
             popup.style.marginTop = '10px'

         } else {
             document.getElementById("user-info").innerHTML = "Bem-Vindo!";
         }
     </script>

     <!-- Links JavaScript: -->
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" defer integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" defer></script>
     <script src="public/js/promocoes.js" defer></script>
     <script src="public/js/scripts.js" defer></script>
     <script src="public/js/login.js" defer></script>
     <script src="public/js/cookie.js" defer></script>
     <script src="public/js/finalizapedido.js" defer></script>

 </body>

 </html>