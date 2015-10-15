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
				result = response;
			}
		});

		return result; 
	}
}