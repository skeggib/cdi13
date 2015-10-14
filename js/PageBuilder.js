function PageBuilder () {

	this.getDatas = new GetDatas();

	/* Fontion pour mettre la premiere lettre en majuscule*/
	this.firstToUpperCase = function (string) {
		return string.substring(0,1).toUpperCase()+string.substring(1,string.length);
	};

	/*	Fontion qui crée des objets Jquery
			Chaque objet représente un Sujet
		Chaque sujet est ensuite inserer dans la page
		Puis la fonction .click leur est attribué
	*/
	this.createNavSubjects = function () {
		var subjects = this.getDatas.getSubjects();
		
		for (var i = 0; i < subjects.length; i++) {
			var temp = $('<div></div>');
			temp.addClass('nav_subjects_object');
			temp.attr('data-cdi13-id', subjects[i].id);
			temp.html(this.firstToUpperCase(subjects[i].name));

			$('#nav_subjects').append(temp);			
		};

		var self = this;

		$('.nav_subjects_object').click(function(event) {
			console.log($(this).attr('data-cdi13-id'));
			self.createNavLink($(this).attr('data-cdi13-id'));
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
			console.log($(this).attr('data-cdi13-link'));
			window.open($(this).attr('data-cdi13-link'));
		});
	};
}