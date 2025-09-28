<!-- 💡 Mini Fiche : Composant AppFooter.vue
     
     Objectif :
     - Créer un footer responsive et clair pour l'application.
     - Divisé en sections : À propos, Navigation, Légal.
     - Utilisation de DaisyUI + Tailwind pour le style et la mise en page.

     Points clés :
     - grid-cols-1 / md:grid-cols-3 : grille responsive, 1 colonne sur mobile, 3 sur desktop.
     - footer-title : DaisyUI, met en valeur le titre des sections.
     - link / link-hover : liens accessibles, changement visuel au hover.
     - Bonnes pratiques : texte lisible, contraste suffisant, responsive design.
   =========================================================== -->
<template>
  <footer class="footer p-10 bg-base-300 text-base-content rounded-box shadow-lg">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <!-- Section 1 : À propos -->
        <div>
          <!-- Titre de la section -->
          <span class="footer-title">À propos de nous</span>
          <!-- Petit texte descriptif -->
          <p class="text-sm text-gray-500">
            Votre application est construite avec ❤️ et Nuxt.
          </p>
        </div>

        <!-- Section 2 : Liens de navigation -->
        <div>
          <span class="footer-title">Navigation</span>
          <!-- Liens internes ou externes -->
          <a href="#" class="link link-hover">Accueil</a>
          <a href="#" class="link link-hover">À propos</a>
          <a href="#" class="link link-hover">Services</a>
          <a href="#" class="link link-hover">Contact</a>
        </div>

        <!-- Section 3 : Légal -->
        <div>
          <span class="footer-title">Légal</span>
          <a href="#" class="link link-hover">Conditions d'utilisation</a>
          <a href="#" class="link link-hover">Politique de confidentialité</a>
          <a href="#" class="link link-hover">Politique de cookies</a>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
/**
 * Script Setup - Vue 3
 * - Pas de logique JS pour ce footer statique.
 * - Tous les éléments sont purement décoratifs / navigationnels.
 * - Les liens peuvent être remplacés par des router-link si navigation SPA.
 */
</script>

<style scoped>
/* Styles gérés par DaisyUI et Tailwind :
   - Pas besoin de CSS additionnel pour ce footer.
   - Bonnes pratiques : garder la cohérence avec le thème global.
*/
</style>
