"use strict";
$(function () {

	$.ajax({
		url: 'src/txts/promocoes.txt',
		type: 'GET',
		dataType: 'json',
		beforeSend: function () {
			$('.carousel-inner').html('<div style="margin-top:20px" class="carregando col-md-12">Carregando...</div>');
		},
		success: function (json) {

			var html = '';
			var contador = 0;
			var primeiro = true;

			for (var i in json) {

				contador = contador + 1;
				var calculo = contador % 5;

				if (primeiro) {
					html += '<div class="carousel-item active" data-bs-interval="3000"><div class="slide w-100"><div class="item-promotion"><div class="item-promotion-imagem"><img src="' + json[i].imagem + '" /></div><div class="item-promotion-tittle">' + json[i].titulo + '</div><div class="item-promotion-preco">' + json[i].preço + '</div></div>';
					primeiro = false;
					
				} else {

					if (calculo == 0) {
						html += '</div></div><div class="carousel-item" data-bs-interval="3000"><div class="slide w-100"><div class="item-promotion"><div class="item-promotion-imagem"><img src="' + json[i].imagem + '" /></div><div class="item-promotion-tittle">' + json[i].titulo + '</div><div class="item-promotion-preco">' + json[i].preço + '</div></div>';
					}

					else {
						html += '<div class="item-promotion"><div class="item-promotion-imagem"><img src="' + json[i].imagem + '" /></div><div class="item-promotion-tittle">' + json[i].titulo + '</div><div class="item-promotion-preco">' + json[i].preço + '</div></div>';
					}
					
				}
			}
			html += '</div>';
			$('.carousel-inner').html(html);

		}
	});

});