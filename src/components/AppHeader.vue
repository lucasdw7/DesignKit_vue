<!-- ===========================================================
     💡 Mini Fiche : Composant AppHeader.vue
     
     Objectif :
     - Créer une barre de navigation (header) responsive.
     - Afficher le logo et le menu principal.
     - Menu desktop visible, menu mobile (dropdown) pour petits écrans.
     - DaisyUI + Tailwind pour le style.

     Points clés :
     - router-link : navigation interne SPA.
     - lg:hidden / lg:flex : classes Tailwind pour responsive.
     - tabindex=0 : navigation clavier pour le menu déroulant.
     - sticky + z-50 : header toujours visible.
     - Bonnes pratiques : texte clair, éléments accessibles, responsive design.
   =========================================================== -->
<template>
  <header class="navbar bg-neutral shadow-sm px-4 sticky top-0 z-50">
    <!-- Logo -->
    <div class="flex-1 flex items-center gap-4">
      <router-link to="/" class="btn btn-neutral text-xl text-base"
        >DesignKit</router-link
      >

      <!-- Nav links (desktop only) -->
      <nav class="hidden lg:flex" aria-label="Main navigation">
        <ul class="flex gap-4">
          <li>
            <router-link
              to="/colors"
              class="text-base text-neutral-content hover:text-primary"
              >Couleurs</router-link
            >
          </li>
          <li>
            <router-link
              to="/Typescale"
              class="text-base text-neutral-content hover:text-primary"
              >Typographies</router-link
            >
          </li>
        </ul>
      </nav>
    </div>

    <!-- Dropdown profil -->
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <button
          tabindex="0"
          class="btn btn-ghost btn-circle avatar hover:btn-accent"
          aria-haspopup="true"
          aria-label="Profil options"
        >
          <div class="w-10 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Avatar utilisateur"
            />
          </div>
        </button>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          role="menu"
        >
          <li role="menuitem">
            <router-link to="/profile" class="justify-between"
              >Profil
            </router-link>
          </li>
          <li role="menuitem">
            <router-link to="/project"
              >Mes projets
              <span class="badge">2</span>
            </router-link>
          </li>
          <li role="menuitem">
            <router-link to="/gestionUser">Gestion du compte</router-link>
          </li>
          <li role="menuitem">
            <router-link to="/settings">Paramètres</router-link>
          </li>
          <li role="menuitem">
            <router-link to="/logout" class="hover:text-error">Déconnexion</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
/**
 * Script Setup - Vue 3
 * - Import RouterLink nécessaire pour navigation interne SPA.
 * - Ici on utilise uniquement router-link → pas de logique JS additionnelle.
 */
import { RouterLink } from "vue-router";
</script>

<style scoped>
/* Pas de styles personnalisés ici
   - DaisyUI + Tailwind gèrent la mise en page et le design.
   - Bonnes pratiques : garder le style global cohérent et réutilisable.
*/
</style>

<!-- <template>
  <header class="navbar bg-neutral shadow-sm px-4 sticky top-0 z-50">
    <!-- Logo 
    <div class="flex-1 flex items-center gap-4">
      <router-link 
        to="/" 
        class="text-xl font-bold text-neutral-content hover:text-primary no-underline"
      >
        DesignKit
      </router-link>

      <!-- Nav links (desktop only) 
      <nav class="hidden lg:block" aria-label="Navigation principale">
        <ul class="flex gap-4">
          <li>
            <router-link 
              to="/colors" 
              class="text-base text-neutral-content hover:text-primary no-underline"
            >
              Couleurs
            </router-link>
          </li>
          <li>
            <router-link 
              to="/page2" 
              class="text-base text-neutral-content hover:text-primary no-underline"
            >
              Typographies
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Dropdown profil 
    <div class="flex-none">
      <!-- (ton dropdown reste identique, il est ok en accessibilité)
    </div>
  </header>
</template> -->
