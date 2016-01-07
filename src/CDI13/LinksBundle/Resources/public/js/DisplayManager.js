function DisplayManager (){

	this.historic = [];

	this.displayLastView = function(){
			if(this.historic.length !== 0){
			lastView = this.historic.pop();
			switch (lastView.view){
				case 'subject' :
					if(!isNaN(parseInt(lastView.id))){
						page_builder.get_datas.get_LinksBySubjectId(lastView.id);
						this.displayView_Links();
					} else {
						this.displayView_Subjects();
					}
					page_builder.current_subject = lastView.id;
					page_builder.get_datas.get_Subjects(lastView.id);
					break;
				case 'search' : 
					$('#head_search_textarea').text("Chercher un cours");
					this.displayView_Links();
					page_builder.get_datas.get_Subjects(page_builder.current_subject);
					page_builder.get_datas.get_LinksBySubjectId(page_builder.current_subject);
					break;
				case 'link' :
					if(lastView.state === 'search'){
						this.displayView_Search();
					} else {
						this.displayView_Links();
					}
				default :
					//donothing	
			}
		} else {
			this.displayView_Subjects(); 
		}
	}

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
		this.resetPlacements($('section#nav section#nav_iframe'));

		$('section#nav section#nav_subjects').addClass('placement-fullscreen');
		$('section#nav section#nav_links').addClass('placement-hidden-right');
		$('section#nav section#nav_iframe').addClass('placement-hidden-right');
	};

	this.displayView_Search = function () {
		this.resetPlacements($('section#nav section#nav_subjects'));
		this.resetPlacements($('section#nav section#nav_links'));
		this.resetPlacements($('section#nav section#nav_iframe'));

		$('section#nav section#nav_links').addClass('placement-fullscreen');
		$('section#nav section#nav_subjects').addClass('placement-hidden-left');
		$('section#nav section#nav_iframe').addClass('placement-hidden-right');
	};

	this.displayView_Links = function () {
		this.resetPlacements($('section#nav section#nav_subjects'));
		this.resetPlacements($('section#nav section#nav_links'));
		this.resetPlacements($('section#nav section#nav_iframe'));

		$('section#nav section#nav_subjects').addClass('placement-left');
		$('section#nav section#nav_links').addClass('placement-right');
		$('section#nav section#nav_iframe').addClass('placement-hidden-right');
	};

	this.displayView_Iframe = function () {
		this.resetPlacements($('section#nav section#nav_subjects'));
		this.resetPlacements($('section#nav section#nav_links'));
		this.resetPlacements($('section#nav section#nav_iframe'));

		$('section#nav section#nav_subjects').addClass('placement-hidden-left');
		$('section#nav section#nav_links').addClass('placement-hidden-left');
		$('section#nav section#nav_iframe').addClass('placement-fullscreen');
	};
};