
<!-- Mini Fiche : Layout principal de l’app
=========================================
Objectif :
- Définir la structure globale de l’application.
- Afficher un header fixe, un contenu central (via <router-view>) et un footer.
- Garantir une mise en page responsive avec Tailwind/DaisyUI.

Points importants :
- <router-view> permet d’injecter dynamiquement les composants des routes.
- La classe Tailwind `min-h-screen` assure que la page occupe toute la hauteur de l’écran.
- Le layout reste cohérent et réutilisable sur toutes les pages. -->


<template>
  <div class="min-h-screen flex flex-col bg-base-200 text-base-content">
    <!-- ✅ Navbar en haut de la page -->
    <AppHeader />

    <!-- ✅ Conteneur principal du contenu (centré et responsive) -->
    <main class="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
      <!-- <ToolsBar/>
       <ColorContent/>
       <TypoContent/> -->
      <!-- Zone dynamique où s’affichent les composants selon la route -->
      <router-view></router-view>
      <!-- Exemple de contenu temporaire pour tester :
      <h1>ICI c'est TOULOUSE</h1> -->
    </main>

    <!-- ✅ Footer en bas de la page -->
    <AppFooter/>
  </div>
</template>

<script setup>
// Importation des composants globaux
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

// import ToolsBar from './components/ToolsBar.vue';
// import ColorContent from './components/ColorContent.vue';
// import TypoContent from './components/TypoContent.vue';

// ℹ️ Ici pas de logique particulière :
// Vue Router se charge d’injecter les pages via <router-view>.
</script>

<style>
/* Styles globaux (optionnels) :
   - Ajouter ici des styles partagés si vous ne gérez pas un fichier global main.css
   - Exemple : personnalisation de la couleur de fond, typo globale, etc.
*/
</style>
