function resetPlacements(object) {
	object.removeClass('placement-fullscreen');
	object.removeClass('placement-left');
	object.removeClass('placement-right');
	object.removeClass('placement-hidden-left');
	object.removeClass('placement-hidden-right');
}



function displayView_Subjects() {
	resetPlacements($('section#nav section#nav_subjects'));
	resetPlacements($('section#nav section#nav_links'));
	// TODO Markdown

	$('section#nav section#nav_subjects').addClass('placement-fullscreen');
	$('section#nav section#nav_links').addClass('placement-hidden-right');
	// Markdown
}

function displayView_Links() {
	resetPlacements($('section#nav section#nav_subjects'));
	resetPlacements($('section#nav section#nav_links'));
	// TODO Markdown

	$('section#nav section#nav_subjects').addClass('placement-left');
	$('section#nav section#nav_links').addClass('placement-right');
	// Markdown
}

function displayView_Markdown() {
	resetPlacements($('section#nav section#nav_subjects'));
	resetPlacements($('section#nav section#nav_links'));
	// TODO Markdown

	$('section#nav section#nav_subjects').addClass('placement-hidden-left');
	$('section#nav section#nav_links').addClass('placement-left');
	// Markdown
}