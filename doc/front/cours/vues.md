# Vues (Front)

## Page des cours

La page des cours propose plusieurs vues via des fonctions javascripts contenues dans le fichier *web/js/changeView.js*.

### Placement des sections

Les sections suivantes peuvent être placées grace aux classe de type "placement-..." :

- **section#nav_subjects**
- **section#nav_links**
- **section#nav_markdown**

Les classes permettant le placement sont :

- **placement-fullscreen** : prend toute la page
- **placement-left** : partie gauche de la page
- **placement-right** : partie droite de la page
- **placement-hidden-left** : caché en dehors de l'écran à gauche
- **placement-hidden-right** : caché en dehors de l'écran à droite

#### Class DisplayManager

##### Fonction resetPlacements

Remet à zéro les classes "placement-..." de l'objet jQuery passé en parametre.

Par exemple :
```javascript
resetPlacements($('section#nav section#nav_subjects'));
```

##### Fonctions displayView_<vue>

Place les sections en fonction de la vue demandée :

- **displayView_Subjects**
- **displayView_Links**
- **displayView_Markdown**