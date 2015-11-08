function SendDatas () {

	var urlPrefix = ''; // TODO Modifier a la fin

	this.newLink = function (url) {
		var result;
		$.ajax({
			url : urlPrefix + '/database/add/link',
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