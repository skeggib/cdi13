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
	this.get_Markdown = function (link_id) {
		$('#nav_markdown_text').append(loader);

		$.ajax({
			url : urlPrefix + '/database/get/markdown',
			type : 'GET',
			dataType : 'text',
			data : {
				'link_id' : link_id
			},
			success : function(response, statut){
				console.log("test");
				console.log(response);
				page_builder.createView_Markdown(response);
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