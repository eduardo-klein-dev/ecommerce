"use strict";
$(function(){

	$.ajax({
		url:'src/txts/promocoes.txt',
		type:'GET',
		dataType:'json',
		beforeSend:function(){
			$('.promotion').html('<div style="margin-top:20px" class="carregando col-md-12">Carregando...</div>');
		},
		success:function(json) {

			var html = '';

			for(var i in json) {
				html += '<div class="promotion"><div class="item-promotion"><div class="item-promotion-imagem"><img src="'+json[i].imagem+'" /></div><div class="item-promotion-tittle">'+json[i].titulo+'</div><div class="item-promotion-preco">'+json[i].preço+'</div></div></div>';
			}
			$('.promotion').html(html);

		}
	});

});