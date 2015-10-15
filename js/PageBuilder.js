function PageBuilder () {

	this.currentSubject;
	this.getDatas = new GetDatas();
	this.sendDatas = new SendDatas();

	/* Fontion pour mettre la premiere lettre en majuscule*/
	this.firstToUpperCase = function (string) {
		return string.substring(0,1).toUpperCase()+string.substring(1,string.length);
	};

	/*	Fontion qui crée des objets Jquery
			Chaque objet représente un Sujet
		Chaque sujet est ensuite inserer dans la page
		Puis la fonction .click leur est attribué
	*/
	this.createNavSubjects = function (subCurrent) {
		
		$('#nav_subjects').html("");

		var subjects = this.getDatas.getSubjects();
		
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

		var self = this;

		$('.nav_subjects_object').click(function(event) {
			var subId = $(this).attr('data-cdi13-id');
			//console.log(subId);
			//console.log(self.currentSubject);
			if(self.currentSubject != subId){
				$('.nav_subjects_object').removeClass('selected');
				$(this).addClass('selected');
				//console.log("request send");
				self.createNavLink(subId);
			}
			self.currentSubject = subId;
		}).bind(self);
	};

	/*	Fontion qui crée des objets Jquery
			Chaque objet représente un Lien
		Chaque lien est ensuite inseré dans la page
		Puis la fonction .click leur est attribué
	*/
	this.createNavLink = function (id) {
		var links = this.getDatas.getLinksBySubjectId(id);
		
		$('#nav_links').html("");

		for (var i = 0; i < links.length; i++) {
			var temp = $('<div></div>');
			temp.addClass('nav_links_object');
			temp.attr('data-cdi13-id', links[i].id);
			temp.attr('data-cdi13-link', links[i].link);
			temp.html(this.firstToUpperCase(links[i].name));

			$('#nav_links').append(temp);			
		};

		$('.nav_links_object').click(function(event) {
			//console.log($(this).attr('data-cdi13-link'));
			window.open($(this).attr('data-cdi13-link'));
		});
	};

	this.addEventNewLink = function () {
		
		function sendRequest(self) {
			var text = $("#head_add_textarea").text();
			$("#head_add_textarea").text("");

			if(text.indexOf('hackmd.io') >= 0){
				var query = self.sendDatas.newLink(text);

				if(query != false){
					self.createNavSubjects(self.currentSubject);
					if(self.currentSubject != null){
						self.createNavLink(self.currentSubject);
					}
				}
			}
		}

		var self = this;
		$("#head_add_button").click(function(){
			sendRequest(self);
		}).bind(self);

		$('#head_add_textarea').keydown(function(event) {
			if(event.keyCode === 13){
				event.preventDefault();
				sendRequest(self);
			}
		}).bind(self);
	}
}