
window.onload = function(){
	$.ajax({
		url : 'php/newLink.php',
		type : 'GET',
		dataType : 'json',
		data : {
			url : 'https://hackmd.io/KwFgjA7AZgnGCmBaAHAQwExkSZUBGKAzAGxKGrLDzGEAM6tAJhEAAA=='
		},
		success : function(response, statut){
			console.log(response);
		},

		error : function(resultat, statut, erreur){

		},

		complete : function(resultat, statut){

		}

    }); 
}