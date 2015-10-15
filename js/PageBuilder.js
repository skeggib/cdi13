function PageBuilder () {

	this.currentSubject;
	this.getDatas = new GetDatas();
	this.sendDatas = new SendDatas();

	this.init = function () {
		this.getDatas.getSubjects(null);
		this.addEventNewLink();
		this.addEventSearch();
	}

	/* Fontion pour mettre la premiere lettre en majuscule*/
	this.firstToUpperCase = function (string) {
		return string.substring(0,1).toUpperCase()+string.substring(1,string.length);
	};

	/*	Fontion qui crée des objets Jquery
			Chaque objet représente un Sujet
		Chaque sujet est ensuite inserer dans la page
		Puis la fonction .click leur est attribué
	*/
	this.createViewNavSubjects = function (subCurrent, subjects) {
		//Vide le nav
		$('#nav_subjects').html("");

		//Construit et ajout tout les sujets dans le nav
		for (var i = 0; i < subjects.length; i++) {
			var temp = $('<div></div>');
			temp.addClass('nav_subjects_object');
			temp.attr('data-cdi13-id', subjects[i].id);
			temp.html(this.firstToUpperCase(subjects[i].name));
			if(subCurrent != null && subjects[i].id == subCurrent){
				temp.addClass('selected');
			}

			$('#nav_subjects').append(temp);			
		};

		//Permet de charger les liens associer a un sujet
		var self = this;
		$('.nav_subjects_object').click(function(event) {
			var subId = $(this).attr('data-cdi13-id');
			//console.log(subId);
			//console.log(self.currentSubject);
			if(self.currentSubject != subId){
				$('.nav_subjects_object').removeClass('selected');
				$(this).addClass('selected');
				//console.log("request send");
				self.getDatas.getLinksBySubjectId(subId);
			}
			self.currentSubject = subId;
		}).bind(self);
	};

	/*	Fontion qui crée des objets Jquery
			Chaque objet représente un Lien
		Chaque lien est ensuite inseré dans la page
		Puis la fonction .click leur est attribué
	*/
	this.createViewNavLink = function (links){
		//Vide le nav
		$('#nav_links').html("");
		//Contruit et ajoute touts les liens dans le nav
		for (var i = 0; i < links.length; i++) {
			var temp = $('<div></div>');
			temp.addClass('nav_links_object');
			temp.attr('data-cdi13-id', links[i].id);
			temp.attr('data-cdi13-link', links[i].link);
			temp.html(this.firstToUpperCase(links[i].name));

			$('#nav_links').append(temp);			
		};
		//Ouvre la page associer au lien
		$('.nav_links_object').click(function(event) {
			//console.log($(this).attr('data-cdi13-link'));
			window.open($(this).attr('data-cdi13-link'));
		});
	}

	this.addEventNewLink = function () {
		
		function sendRequest(self) {
			var text = $("#head_add_textarea").text();
			$("#head_add_textarea").text("Ajouter un lien vers un cours");
			$("#head_add_textarea").removeClass('focusOn');

			if(text.indexOf('hackmd.io') >= 0){
				self.sendDatas.newLink(text); 
			}
		}

		var self = this;
		$("#head_add_button").click(function(){
			$('#head_add_textarea').addClass('focusOn')
			sendRequest(self);
		}).bind(self);

		$('#head_add_textarea').keydown(function(event) {
			if(event.keyCode === 13){
				event.preventDefault();
				sendRequest(self);
			}
		}).bind(self);

		$('#head_add_textarea').focusin(function(event) {
			if($('#head_add_textarea').html().trim() == "Ajouter un lien vers un cours"){
				$(this).html("");
			}
		})
		$('#head_add_textarea').focusout(function(){
			setTimeout(function(){
				if(!$('#head_add_textarea').hasClass('focusOn') && $('#head_add_textarea').html().trim() == ""){
					$('#head_add_textarea').html("Ajouter un lien vers un cours")
				}
			}, 100);
		})
	}

	this.addEventSearch = function () {

		var self = this;
		$("#head_search_button").click(function(){
			$('#head_add_textarea').addClass('focusOn')
			//Do something
		}).bind(self);

		$('#head_search_textarea').keydown(function(event) {
			if(event.keyCode === 13){
				event.preventDefault();
				//Do something
			}
		}).bind(self);

		$('#head_search_textarea').focusin(function(event) {
			if($('#head_search_textarea').html().trim() == "Ne marche pas encore..."){
				$(this).html("");
			}
		})
		$('#head_search_textarea').focusout(function(){
			setTimeout(function(){
				if(!$('#head_search_textarea').hasClass('focusOn') && $('#head_search_textarea').html().trim() == ""){
					$('#head_search_textarea').html("Ne marche pas encore...")
				}
			}, 100);
		})
	}
}