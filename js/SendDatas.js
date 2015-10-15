function SendDatas () {
	this.newLink = function (url) {
		var result;
		$.ajax({
			url : 'php/newLink.php',
			type : 'GET',
			dataType : 'json',
			data : {
				'url' : url
			},
			success : function(response, statut){
				console.log(response);

				if(response != false){
					pageBuilder.getDatas.getSubjects(pageBuilder.currentSubject);
					if(pageBuilder.currentSubject != null){
						pageBuilder.getDatas.getLinksBySubjectId(pageBuilder.currentSubject);
					}
				}

				result = response;
			}
		});

		return result; 
	}
}