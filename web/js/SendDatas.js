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
					page_builder.get_datas.get_Subjects(page_builder.current_subject);
					if(page_builder.current_subject != null){
						page_builder.get_datas.get_LinksBySubjectId(page_builder.current_subject);
					}
				}

				result = response;
			}
		});

		return result; 
	}
}