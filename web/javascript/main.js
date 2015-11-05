//$.ajaxSetup({async: false}); // Ne pas supprimer

var loader = $('<div>').load('loader.html')
loader.addClass('loaderDiv');

$('html').append(loader);

window.onload = function(){
	pageBuilder = new PageBuilder();
	pageBuilder.init();

	$('.loaderDiv').remove();
}
