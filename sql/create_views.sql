CREATE VIEW full_link_view AS
	SELECT 
		link.id, 
		link.name, 
		link.subject_id, 
		link.creation_timestamp,
		subject.short_name,
		subject.full_name
	FROM link JOIN subject
	ON subject.id = link.subject_id
;
