function GetDatas () {
	this.getSubjects = function () {
		var result;
		$.ajax({
			url : 'php/getSubjects.php',
			type : 'GET',
			dataType : 'json',
			success : function(response, statut){
				//console.log(JSON.parse(response));
				result = response;
			}
		});

		return result; 
	};
	this.getLinks = function () {
		var result;
		$.ajax({
			url : 'php/getLinks.php',
			type : 'GET',
			dataType : 'json',
			success : function(response, statut){
				//console.log(JSON.parse(response));
				result = response;
			}
		});

		return result; 
	};
	this.getLinksBySubjectId = function (subject_id) {
		var result;
		$.ajax({
			url : 'php/getLinks.php',
			type : 'GET',
			dataType : 'json',
			data : {
				'subject_id' : subject_id
			},
			success : function(response, statut){
				//console.log(JSON.parse(response));
				result = response;
			}
		});

		return result; 
	};
}