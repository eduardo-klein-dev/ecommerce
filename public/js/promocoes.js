"use strict";
$(function () {

	$.ajax({
		url: 'http://d06a0002n.dfs.local:8000/api/ecommerce/promotionsnew/',
		type: 'GET',
		dataType: 'json',

		beforeSend: function () {
			$('.carousel-inner').html('<div style="margin-top:20px" class="carregando col-md-12">Carregando...</div>');
		},
		success: function (json) {
			var html = '';
			var contador = 0;
			var primeiro = true;
			var palavra = 0;

			for (var i in json) {

				contador = contador + 1;
				var calculo = contador % 5;

				if (primeiro) {

					html += '<div class="carousel-item active" data-bs-interval="3000"><div class="slide w-100"><div class="item-promotion" id=' + json[i].id + ' onclick="openScreenBuyPromo(' + json[i].id + ')"><div class="item-promotion-imagem"><img src="public/imgs/produtos/' + json[i].id + '.png" /></div><div class="item-promotion-tittle">' + json[i].apelido + '<div style="display: flex; flex-direction: row;align-items: center;justify-content: center;"><div style="text-transform: capitalize; margin-right: 5px;">De </div><div style="text-decoration: line-through;">R$ '+json[i].valor+'</div><div style="color: red; margin-left: 5px;"><strong>-'+json[i].desconto+'%</strong></div></div><div style="text-transform: capitalize;" class="item-promotion-preco-total-'+json[i].id+'"></div></div></div>';
					primeiro = false;

				} else {

					if (calculo == 0) {
						html += '</div></div><div class="carousel-item" data-bs-interval="3000"><div class="slide w-100"><div class="item-promotion" id=' + json[i].id + ' onclick="openScreenBuyPromo(' + json[i].id + ')"><div class="item-promotion-imagem"><img src="public/imgs/produtos/' + json[i].id + '.png" /></div ><div class="item-promotion-tittle">' + json[i].apelido + '<div style="display: flex; flex-direction: row;align-items: center;justify-content: center;"><div style="text-transform: capitalize; margin-right: 5px;">De </div><div style="text-decoration: line-through;">R$ '+json[i].valor+'</div><div style="color: red; margin-left: 5px;"><strong>-'+json[i].desconto+'%</strong></div></div><div style="text-transform: capitalize;" class="item-promotion-preco-total-'+json[i].id+'"></div></div></div>';
					}

					else {
						html += '<div class="item-promotion" id="' + json[i].id + '" onclick="openScreenBuyPromo(' + json[i].id + ')"><div class="item-promotion-imagem"><img src="public/imgs/produtos/' + json[i].id + '.png" /></div><div class="item-promotion-tittle">' + json[i].apelido + '<div style="display: flex; flex-direction: row;align-items: center;justify-content: center;"><div style="text-transform: capitalize; margin-right: 5px;">De </div><div style="text-decoration: line-through;">R$ '+json[i].valor+'</div><div style="color: red; margin-left: 5px;"><strong>-'+json[i].desconto+'%</strong></div></div><div style="text-transform: capitalize;" class="item-promotion-preco-total-'+json[i].id+'"></div></div></div>';
					}

				}
			}
			html += '</div>';
			$('.carousel-inner').html(html);

			for (i in json) {
				var valor1 = json[i].valor;
				var novoValor1 = valor1.replace(".", "").replace(",", ".");
				var valor2 = ((novoValor1 * json[i].desconto) / 100).toFixed(2);
				var total = (novoValor1 - valor2);
				var totalFormatado = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

				var price = document.querySelector('.item-promotion-preco-total-' + json[i].id + '');
				price.innerHTML = '<p>Por R$ ' + totalFormatado + '</p>';
			}
		}
	});
});