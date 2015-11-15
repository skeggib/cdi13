function PageBuilder () {

	this.current_subject = null;

	this.historic = [];

	this.get_datas = new GetDatas();
	this.send_datas = new SendDatas();

	this.display_manager = new DisplayManager();

	this.init = function () {
		this.get_datas.get_Subjects(null);
		this.addEvent_NewLink();
		this.addEvent_Search();
		this.addEvent_Back();
		this.display_manager.displayView_Subjects();
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
	this.createView_Subjects = function (subCurrent, subjects) {
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
			if(self.current_subject != subId){
				self.display_manager.historic.push({view : 'subject', id : self.current_subject});
				$('.nav_subjects_object').removeClass('selected');
				$(this).addClass('selected');
				self.get_datas.get_LinksBySubjectId(subId);
				self.display_manager.displayView_Links();
			}
			self.current_subject = subId;
		});
	};

	/*	Fontion qui crée des objets Jquery
			Chaque objet représente un Lien
		Chaque lien est ensuite inseré dans la page
		Puis la fonction .click leur est attribué
	*/
	this.createView_Link = function (links){
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

		var self = this;
		//Ouvre la page associer au lien
		$('.nav_links_object').click(function(event) {
			//window.open($(this).attr('data-cdi13-link'));
			var linkId = $(this).attr('data-cdi13-id');
			// TODO Armya Charger le markdown dans la section
			self.display_manager.historic.push({view : 'link', id : self.current_subject});
			self.get_datas.get_Markdown(linkId);
			self.display_manager.displayView_Markdown();
		});
	}

	this.createView_Markdown = function (markdown){
		$('#nav_markdown_text').html(markdown);
	}

	/*	Fontion qui crée des objets Jquery
			Chaque objet représente un Lien
		Chaque lien est ensuite inseré dans la page
		Puis la fonction .click leur est attribué
	*/
	this.createView_Search = function (links){
		//Vide le nav
		$('#nav_links').html("");
		$('#nav_subjects').removeClass('selected');

		this.display_manager.displayView_Search();

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
			window.open($(this).attr('data-cdi13-link'));
		});
	}

	this.addEvent_NewLink = function () {
		
		function sendRequest(self) {
			var text = $("#head_add_textarea").text();
			$("#head_add_textarea").text("Ajouter un lien vers un cours");
			$("#head_add_textarea").removeClass('focusOn');

			if(text.indexOf('hackmd.io') >= 0){
				self.send_datas.newLink(text); 
			}
		}

		var self = this;

		$("#head_add_button").click(function(){	
			$('#head_add_textarea').addClass('focusOn')
			sendRequest(self);
		});

		$('#head_add_textarea').keydown(function(event) {
			if(event.keyCode === 13){
				event.preventDefault();
				sendRequest(self);
			}
		});

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

	this.addEvent_Back = function () {
		var self = this;
		$('#head_back_button').click(function(event) {

			self.display_manager.displayLastView();
		});
	};

	this.addEvent_Search = function () {

		function sendRequest (self) {
			if(self.display_manager.historic.length != 0 && self.display_manager.historic[self.display_manager.historic.length - 1].view != 'search'){
				self.display_manager.historic.push({view : 'search'});
			}
			var text = $("#head_search_textarea").text();
			text = text.trim();
			if(text.trim() != ""){
				$(".nav_subjects_object").removeClass('selected');
				self.get_datas.searchLinks(text);
			}
		}

		var self = this;

		$('#head_search_textarea').keyup(function(event) {
				sendRequest(self);
		});

		$('#head_search_textarea').keydown(function(event) {
			if(event.keyCode === 13){
				event.preventDefault();
				sendRequest(self);
			}
		});

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