# TP noté pour la ressource 'Application mobile' - BUT MMI S5 | React Native

## Structure du rendu
### L’application doit être sur Git, avec un workflow cohérent :
 - Un commit par feature détaillant la feature
 - Pas la nécessité de créer plusieurs branch
### La structure d’un projet React doit être respectée :
 - Un fichier par composant
 - La structure d’un composant doit être similaire à la fiche de rappel
## Contenu de l'application
### L’application doit contenir minimum 4 pages :
 - La page d’accueil contenant la liste de tous les pokémons avec un infinite scroll
 - La page d’accueil doit être liée à une sous page » Détails « au clic d’un pokémon
 - Une page recherche d’un pokémon (Intégration libre : une barre de recherche avec un bouton » rechercher « ; une fois la recherche effectuée, afficher un pokémon ou une erreur si le pokémon n’existe pas) La page recherche doit être liée à une sous page » Détails « au clic d’un pokémon
 - Une page » Mon équipe «
 - Une page » Paramètres « (Il ne s’agit ici que d’intégration)
### Utilisation d’une BottomTabNavigator pour la navigation principale
### Utilisation d’un StackNavigator pour les sous pages
### Utilisation de la mémoire interne de l’application pour la page » Mon équipe «
### Demande d’accès aux droits du téléphone
 - Activer l’orientation de l’écran (cf. la documentation React Native)
 - Demander l’accès à la caméra ou la galerie d’images du téléphone
