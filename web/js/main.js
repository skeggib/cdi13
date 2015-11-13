//$.ajaxSetup({async: false}); // Ne pas supprimer

var loader = $('<div>').load('../html/loader.html')
loader.addClass('loaderDiv');

$('html').append(loader);

window.onload = function(){
	
	page_builder = new PageBuilder();
	page_builder.init();

	$('.loaderDiv').remove();
}
