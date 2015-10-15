# Cours DUT Info 13

## Installation

### Creation de la base de donnée

Le SGBD utilisé est PostGreSQL.

Créer une base de donnée nommée 'cours_dut_info_13' :
```sql
CREATE DATABASE cours_dut_info_13;
```

Créer l'utilisateur 'cours_dut_info_13' avec le mot de passe 'cdi13database' (ce mot de passe peut être différent, il suffit de le modifier dans le fichier php/funtions/dbConnect.php) :
```sql
CREATE USER cours_dut_info_13 PASSWORD 'cdi13database';
```

Attribuer les droits à l'utilisateur :
```sql
GRANT ALL ON DATABASE cours_dut_info_13 TO cours_dut_info_13;
```

Executer le fichier sql/createTables.sql pour creer les tables.

## Utilisation des fichiers PHP

Les fichiers PHP à utiliser à la racine du dossier php.
Ces fichiers renvoient des données uniquement si la requette est de type GET et est réalisée via AJAX.

### getSubjects.php

Retourne la liste des sujets au format JSON sous cette forme :

```json
[
	{
		"id":"1",
		"name":"System"
	},

	{
		"id":"2",
		"name":"Proba"
	}
]
```

### getLinks.php

Retourne une liste de cours au format JSON sous cette forme :

```json
[
	{
		"id":"1",
		"link":"https://hackmd.io/s/NJVu9dxeg",
		"name":"6. Traveaux dirigé"
	},
	{
		"id":"4",
		"link":"https://hackmd.io/OwTghgpgHC4LQGYCsAzEcAsAmAxusUAbOhlAIwAmKOWFwCpQAAA=",
		"name":"1. TD"
	},
	{
		"id":"5",
		"link":"https://hackmd.io/MzCMCNQFgDgMwLSQAwFMG1eJoCGBWBUAYwBNkAmC3GMVZIAA",
		"name":"1. Probabilité discrètes"
	}
]
```

**Options : **
- subject_id : ID de la matière

Si subject_id n'est pas précisé, la totalité des cours est renvoyée.

### addLink.php

Ajoute un lien à la base de données et retourne l'objet ajouté au format JSON de la forme : 

```json
{
	"link":"https://hackmd.io/KwFgjA7AZgnGCmBaAHAQwExkSZUBGKAzAGxKGrLDzGEAM6tAJhEAAA==",
	"name":"Communication des processus par tubes",
	"subject_id":"system"
}
```

**Option : **
- url : Lien à ajouter

### searchLinks.php

Effectue une recherche dans le base de données et retourne le resultat au format JSON de la forme :

```json
[
	{
		"id":"1",
		"link":"https://hackmd.io/s/NJVu9dxeg",
		"name":"6. Traveaux dirigé",
		'subject_name':"Systemes"
	},
	{
		"id":"4",
		"link":"https://hackmd.io/OwTghgpgHC4LQGYCsAzEcAsAmAxusUAbOhlAIwAmKOWFwCpQAAA=",
		"name":"1. TD"
		'subject_name':"Systemes"
	},
	{
		"id":"5",
		"link":"https://hackmd.io/MzCMCNQFgDgMwLSQAwFMG1eJoCGBWBUAYwBNkAmC3GMVZIAA",
		"name":"1. Probabilité discrètes"
		'subject_name':"Probabilites"
	}
]
```

**Option : **
- search_string : Texte de la recherche