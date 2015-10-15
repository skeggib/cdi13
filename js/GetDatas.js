function GetDatas () {
	this.getSubjects = function (subCurrent) {
		$('#nav_subjects').append(loader);

		$.ajax({
			url : 'php/getSubjects.php',
			type : 'GET',
			dataType : 'json',
			success : function(response, statut){
				result = response;
				pageBuilder.createViewNavSubjects(subCurrent, response);
			}
		});
	};
	this.getLinks = function () {
		$('#nav_links').append(loader);

		$.ajax({
			url : 'php/getLinks.php',
			type : 'GET',
			dataType : 'json',
			success : function(response, statut){
				//do nothing
			}
		});
	};
	this.getLinksBySubjectId = function (subject_id) {
		$('#nav_links').append(loader);

		$.ajax({
			url : 'php/getLinks.php',
			type : 'GET',
			dataType : 'json',
			data : {
				'subject_id' : subject_id
			},
			success : function(response, statut){
				//console.log(JSON.parse(response));
				pageBuilder.createViewNavLink(response);
			}
		});
	};
}