function PageBuilder () {

	this.currentSubject = null;

	this.historic = [];

	this.getDatas = new GetDatas();
	this.sendDatas = new SendDatas();

	this.displayManager = new DisplayManager();

	this.init = function () {
		this.getDatas.getSubjects(null);
		this.addEventNewLink();
		this.addEventSearch();
		this.addEventBack();
		this.displayManager.displayView_Subjects();
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

			$('#head_search_textarea').text("Chercher un cours");

			var subId = $(this).attr('data-cdi13-id');
			//console.log(subId);
			//console.log(self.currentSubject);
			if(self.currentSubject != subId){
				self.historic.push({view : 'subject', id : self.currentSubject});
				$('.nav_subjects_object').removeClass('selected');
				$(this).addClass('selected');
				//console.log("request send");
				self.getDatas.getLinksBySubjectId(subId);
				self.displayManager.displayView_Links();
			}
			self.currentSubject = subId;
		});
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

	/*	Fontion qui crée des objets Jquery
			Chaque objet représente un Lien
		Chaque lien est ensuite inseré dans la page
		Puis la fonction .click leur est attribué
	*/
	this.createViewSearch = function (links){
		//Vide le nav
		$('#nav_links').html("");
		$('#nav_subjects').removeClass('selected');

		this.displayManager.displayView_Search();

		//Contruit et ajoute touts les liens dans le nav
		for (var i = 0; i < links.length; i++) {
			var temp = $('<div></div>');
			temp.addClass('nav_links_object');
			temp.attr('data-cdi13-id', links[i].id);
			temp.attr('data-cdi13-link', links[i].link);
			temp.html(this.firstToUpperCase(links[i].name) + ' (' + this.firstToUpperCase(links[i].subject_name) + ')');

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
	};

	this.addEventBack = function () {
		var self = this;
		$('#head_back_button').click(function(event) {

			console.log('');
			console.log('TEST' , self.historic);
			console.log('');
			if(self.historic.length !== 0){
				lastView = self.historic.pop();
				console.log('TEST' , self.historic);
				console.log('');
				switch (lastView.view){
					case 'subject' :
						console.log('SUBJECT : ', parseInt(lastView.id));
						if(!isNaN(parseInt(lastView.id))){
							self.getDatas.getLinksBySubjectId(lastView.id);
							self.displayManager.displayView_Links();
						} else {
							console.log("LAST SUBJECT");
							self.displayManager.displayView_Subjects();
						}
						self.currentSubject = lastView.id;
						self.getDatas.getSubjects(lastView.id);
						console.log(self);
						break;
					case 'search' : 
						$('#head_search_textarea').text("Chercher un cours");
						self.displayManager.displayView_Links();
						self.getDatas.getSubjects(self.currentSubject);
						self.getDatas.getLinksBySubjectId(self.currentSubject);
						break;
					default :
						//donothing	
				}
			}
		});
	};

	this.addEventSearch = function () {

		function sendRequest (self) {
			if(self.historic.length != 0 && self.historic[self.historic.length - 1].view != 'search'){
				self.historic.push({view : 'search'});
			}
			var text = $("#head_search_textarea").text();
			text = text.trim();
			console.log(text);
			if(text.trim() != ""){
				$(".nav_subjects_object").removeClass('selected');
				self.getDatas.searchLinks(text);
			}
		}

		var self = this;

		$('#head_search_textarea').keyup(function(event) {
				sendRequest(self);
		}).bind(self);

		$('#head_search_textarea').keydown(function(event) {
			if(event.keyCode === 13){
				event.preventDefault();
				sendRequest(self);
			}
		}).bind(self);

		$('#head_search_textarea').focusin(function(event) {
			if($('#head_search_textarea').html().trim() == "Chercher un cours"){
				$(this).html("");
			}
		});
		
		$('#head_search_textarea').focusout(function(){
			setTimeout(function(){
				if(!$('#head_search_textarea').hasClass('focusOn') && $('#head_search_textarea').html().trim() == ""){
					$('#head_search_textarea').html("Chercher un cours")
				}
			}, 100);
		})
	};
};