$.ajaxSetup({async: false}); // Ne pas supprimer

window.onload = function(){
	
	getDatas = new GetDatas();
	pageBuilder = new PageBuilder();

	console.log(getDatas.getSubjects());
	console.log(getDatas.getLinks());

	pageBuilder.createNavSubjects(null);
	pageBuilder.addEventNewLink();

}
