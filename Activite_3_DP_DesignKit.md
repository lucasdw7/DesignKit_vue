# Activité 3

Prototype front-end d'un outil DesignKit avec Vue 3 pour structurer une interface et développer des composants réutilisables

> Note de cadrage
>
> Cette activité doit être présentée comme un prototype front-end en cours de construction. Les fichiers présents montrent une base réelle de développement Vue, une structuration de projet, plusieurs composants d'interface et un composant interactif plus abouti pour la gestion de la couleur. En revanche, le projet ne doit pas être présenté comme une application complète ou finalisée.

## Tâche 1

Mise en place de l'ossature technique et de la structure de l'application

### 1. Tâches réalisées et conditions

- Initialisation d'un projet Vue 3 avec Vite.
- Intégration de `vue-router` pour organiser la navigation en plusieurs vues.
- Mise en place d'une structure de projet séparant les vues, les composants, le routeur et les données.
- Création d'un layout global avec un en-tête, une zone centrale pilotée par les routes et un pied de page.
- Intégration de Tailwind CSS et DaisyUI, puis personnalisation d'un thème graphique.
- Travail réalisé dans un contexte d'apprentissage a preciser selon la situation reelle : projet personnel ou projet realise en formation.

### 2. Moyens utilisés

- Vue 3
- Vite
- Vue Router
- Tailwind CSS
- DaisyUI
- JavaScript
- Visual Studio Code
- Git
- Navigateur web pour les essais et verifications

### 3. Les personnes avec qui vous avez travaillé

- A completer selon la situation reelle.
- Si le projet a ete realise seul : travail individuel.
- Si le projet a ete realise pendant la formation : indiquer le formateur ou les camarades impliques, uniquement si c'est exact.

### 4. Contexte

Le projet DesignKit sert de support d'apprentissage pour construire une interface front-end modulaire autour de la creation de palettes de couleurs, de typographies et d'elements de design. Le travail observable dans les fichiers correspond surtout a la phase de structuration de l'application et a la mise en place du socle technique.

### 5. Informations complémentaires

Preuves a joindre ou citer :

- Arborescence du projet montrant `src/components`, `src/views`, `src/router`, `src/data`
- `package.json` pour les dependances front-end
- `vite.config.js` pour l'integration Vite + Tailwind
- `src/App.vue` pour le layout global
- `src/router/index.js` pour l'organisation des routes
- `src/style.css` pour le theme DaisyUI personnalise
- Capture de la page d'accueil et d'une page interne

## Tâche 2

Developpement et assemblage de composants Vue pour structurer l'interface

### 1. Tâches réalisées et conditions

- Creation de composants de structure et de navigation : en-tete, pied de page, barre d'outils, barre de titre et barre projet.
- Creation de composants de contenu pour afficher une palette de couleurs, une echelle typographique et une carte projet.
- Assemblage des composants dans plusieurs vues : accueil, page couleurs, page typographie et page projet.
- Mise en place d'un jeu de donnees local pour representer un utilisateur, un projet, une palette de couleurs et une echelle typographique.
- Exploitation des donnees du fichier `users.js` dans le composant de palette pour afficher des valeurs issues du projet.
- Travail realise dans un prototype front-end sans API ni base de donnees connectee.

### 2. Moyens utilisés

- Composants Vue en `script setup`
- Vue Router pour la navigation entre vues
- Donnees statiques en JavaScript
- Classes utilitaires Tailwind et composants DaisyUI

### 3. Les personnes avec qui vous avez travaillé

- A completer selon la situation reelle.
- En l'etat des fichiers, rien ne permet d'affirmer une co-realisation.

### 4. Contexte

Cette tache correspond a la construction progressive d'une interface decoupee en composants afin de faciliter la reutilisation, la maintenance et l'evolution du projet. L'objectif etait de tester une organisation de code propre et de mettre en place les premiers blocs d'une application de design system.

### 5. Informations complémentaires

Preuves a joindre ou citer :

- `src/views/Home.vue`
- `src/views/ColorPage.vue`
- `src/views/TypoPage.vue`
- `src/views/ProjectPage.vue`
- `src/components/AppHeader.vue`
- `src/components/AppFooter.vue`
- `src/components/ToolsBar.vue`
- `src/components/ColorContent.vue`
- `src/components/TypoContent.vue`
- `src/components/ProjectCard.vue`
- `src/data/users.js`
- Captures des cartes d'interface ou des ecrans assembles

## Tâche 3

Implementation d'une logique front interactive pour la selection et la conversion de couleurs

### 1. Tâches réalisées et conditions

- Developpement d'un composant `ColorPicker.vue` pour selectionner une couleur.
- Mise en place d'un fonctionnement reactif avec `ref`, `computed` et `watch`.
- Gestion des conversions de couleur entre plusieurs formats : HSV, RGB, HEX et CMJN.
- Mise en place de l'interaction a la souris et au clavier sur la zone de saturation/luminosite et sur la barre de teinte.
- Ajout d'attributs d'accessibilite sur les zones de selection.
- Ajout d'une fonction de copie des valeurs dans le presse-papiers.
- Preparation d'un mecanisme de reutilisation via `defineProps` et `defineEmits`, meme si l'integration complete avec un composant parent n'est pas encore finalisee.

### 2. Moyens utilisés

- Vue 3 Composition API
- JavaScript
- Evenements pointeur et clavier
- API `navigator.clipboard`
- Tailwind CSS et DaisyUI pour la presentation

### 3. Les personnes avec qui vous avez travaillé

- A completer selon la situation reelle.
- Si le composant a ete realise seul, indiquer travail individuel.

### 4. Contexte

Cette tache constitue la partie la plus technique et la plus aboutie du projet. Elle montre une logique front reelle au-dela de la simple mise en page : calculs, reactivite, ergonomie et debuts de reutilisabilite composant.

### 5. Informations complémentaires

Preuves a joindre ou citer :

- `src/components/ColorPicker.vue` pour les props, emits, conversions et interactions
- Extrait montrant `defineProps` et `defineEmits`
- Extrait montrant les fonctions `rgbToHsv`, `hsvToRgb`, `rgbToHex` et `rgbToCmyk`
- Extrait montrant les `watch` et les calculs `computed`
- Extrait montrant la gestion clavier et pointeur
- Capture du selecteur de couleur affiche a l'ecran

## Limites a respecter dans la rédaction du DP

- Ne pas presenter DesignKit comme une application complete.
- Ne pas affirmer la mise en place d'une gestion d'etat globale : les fichiers montrent surtout un etat local dans `ColorPicker.vue`.
- Ne pas affirmer une reutilisabilite generalisee de tous les composants : plusieurs composants sont encore statiques ou tres peu parametres.
- Ne pas affirmer l'existence de tests automatises : la dependance Cypress est presente, mais aucun test n'est visible dans les fichiers.
- Ne pas affirmer l'implementation effective des fonctions export, profil, gestion de compte ou parametres : des liens existent dans l'interface, mais les routes et traitements associes ne sont pas presents.

## Positionnement conseillé pour le DP

Ce support est exploitable si tu presentes l'activite comme un travail de prototypage et d'integration front-end sous Vue 3. Il est plus credible de valoriser :

- la structuration du projet,
- le decoupage en composants,
- l'integration d'un routeur,
- la personnalisation d'un theme,
- la manipulation de donnees locales,
- et surtout la logique du composant de selection de couleur.

Il vaut mieux eviter d'en faire une activite centree sur une application metier complete, car les fichiers montrent encore beaucoup d'elements statiques ou partiellement branches.
