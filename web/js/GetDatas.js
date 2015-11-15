function GetDatas () {

	var urlPrefix = ''; // TODO Modifier a la fin

	this.get_Subjects = function (subCurrent) {
		$('#nav_subjects').append(loader);

		$.ajax({
			url : urlPrefix + '/database/get/subjects',
			type : 'GET',
			dataType : 'json',
			success : function(response, statut){
				result = response;
				page_builder.createView_Subjects(subCurrent, response);
			}
		});
	};
	this.get_Links = function () {
		$('#nav_links').append(loader);

		$.ajax({
			url : urlPrefix + '/database/get/links',
			type : 'GET',
			dataType : 'json',
			success : function(response, statut){
				//do nothing
			}
		});
	};
	this.get_LinksBySubjectId = function (subject_id) {
		$('#nav_links').append(loader);

		$.ajax({
			url : urlPrefix + '/database/get/links',
			type : 'GET',
			dataType : 'json',
			data : {
				'subject_id' : subject_id
			},
			success : function(response, statut){
				page_builder.createView_Link(response);
			}
		});
	};
	this.searchLinks = function (search) {
		$.ajax({
			url : urlPrefix + '/database/get/search/links',
			type : 'GET',
			dataType : 'json',
			data : {
				'search_string' : search
			},
			success : function(response, statut){
				page_builder.createView_Search(response);
			}
		});	
	}
}