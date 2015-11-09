function DisplayManager (){
	this.resetPlacements = function (object) {
		object.removeClass('placement-fullscreen');
		object.removeClass('placement-left');
		object.removeClass('placement-right');
		object.removeClass('placement-hidden-left');
		object.removeClass('placement-hidden-right');
	};

	this.displayView_Subjects = function () {
		this.resetPlacements($('section#nav section#nav_subjects'));
		this.resetPlacements($('section#nav section#nav_links'));
		// TODO Markdown

		$('section#nav section#nav_subjects').addClass('placement-fullscreen');
		$('section#nav section#nav_links').addClass('placement-hidden-right');
		// Markdown
	};

	this.displayView_Search = function () {
		this.resetPlacements($('section#nav section#nav_subjects'));
		this.resetPlacements($('section#nav section#nav_links'));
		// TODO Markdown

		$('section#nav section#nav_links').addClass('placement-fullscreen');
		$('section#nav section#nav_subjects').addClass('placement-hidden-left');
		// Markdown
	};

	this.displayView_Links = function () {
		this.resetPlacements($('section#nav section#nav_subjects'));
		this.resetPlacements($('section#nav section#nav_links'));
		// TODO Markdown

		$('section#nav section#nav_subjects').addClass('placement-left');
		$('section#nav section#nav_links').addClass('placement-right');
		// Markdown
	};

	this.displayView_Markdown = function () {
		this.resetPlacements($('section#nav section#nav_subjects'));
		this.resetPlacements($('section#nav section#nav_links'));
		// TODO Markdown

		$('section#nav section#nav_subjects').addClass('placement-hidden-left');
		$('section#nav section#nav_links').addClass('placement-left');
		// Markdown
	};
};