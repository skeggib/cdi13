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
				if(response != false){
					pageBuilder.get_datas.getSubjects(pageBuilder.current_subject);
					if(pageBuilder.currentSubject != null){
						pageBuilder.get_datas.getLinksBySubjectId(pageBuilder.current_subject);
					}
				}

				result = response;
			}
		});

		return result; 
	}
}