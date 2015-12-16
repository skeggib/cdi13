INSERT INTO subject(short_name, full_name) 
	VALUES('sub1', 'Subject N1');
INSERT INTO subject(short_name, full_name) 
	VALUES('sub2', 'Subject N2');
INSERT INTO subject(short_name, full_name) 
	VALUES('bddav', 'BDD Avancée');
INSERT INTO subject(short_name, full_name) 
	VALUES('proba', 'Probabilités Discretes');

INSERT INTO link(link, name, subject_id)
	VALUES('url1', 'link1', subject_id('sub1'));
INSERT INTO link(link, name, subject_id)
	VALUES('url2', 'link2', subject_id('sub2'));
INSERT INTO link(link, name, subject_id)
	VALUES('url3', 'link3', subject_id('sub1'));
INSERT INTO link(link, name, subject_id)
	VALUES('url4', 'link4', subject_id('sub1'));
INSERT INTO link(link, name, subject_id)
	VALUES('url5', 'link5', subject_id('sub2'));
INSERT INTO link(link, name, subject_id)
	VALUES('url6', 'link6', subject_id('sub1'));
INSERT INTO link(link, name, subject_id)
	VALUES('url7', 'link7', subject_id('sub2'));
INSERT INTO link(link, name, subject_id)
	VALUES('https://hackmd.io/MwMwbARg7ALAJhAtAVmRMiYENlUQTgGM5lFCsRD8wt8AGADgFMogAA==', 'Concurence', subject_id('bddav'));
INSERT INTO link(link, name, subject_id)
	VALUES('https://hackmd.io/KwTgbAZgpgzDAmBaARvCSAsAOA7AJkRAwEMBGQkAY0vAmPjIyAA=', 'Normalisation', subject_id('bddav'));
INSERT INTO link(link, name, subject_id)
	VALUES('https://hackmd.io/GwTg7ArCFsC0AjAxgDhXALBCBTO4BGMRCAQyQBMCkAzABgIRyAA=', 'Variable Aleatoire', subject_id('proba'));
	