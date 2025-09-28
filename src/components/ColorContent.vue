<template>
  <div class="card w-full bg-base-100 shadow-md mt-6">
  <div class="card-body">
    <!-- Header de la card -->
    <div class="flex justify-between items-center">
      <h2 class="card-title text-xl uppercase">Palette de couleurs</h2>
      <router-link to="/colors">
      <button class="btn btn-accent btn-sm flex items-center gap-1">
        <!-- Icône crayon -->
        <svg xmlns="http://www.w3.org/2000/svg" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke-width="1.5" 
             stroke="currentColor" 
             class="w-4 h-4">
          <path stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13l-2.685.805.805-2.685a4.5 4.5 0 011.13-1.897l10.927-10.936z" />
        </svg>
        Modifier
      </button>
    </router-link>
    </div>

    <!-- Liste des couleurs -->
    <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 mt-2">
      <!-- Exemple d’un item -->
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full" :style="{background: primaryColor}"></div>
        <span class="mt-2 text-sm text-base-content">#FF5733</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full" :style="{background: secondaryColor}"></div>
        <span class="mt-2 text-sm text-base-content">#33FF57</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full" :style="{background: accentColor}"></div>
        <span class="mt-2 text-sm text-base-content">#3357FF</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full" :style="{background: bgColor}"></div>
        <span class="mt-2 text-sm text-base-content">#F1C40F</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full" :style="{background: textColor}"></div>
        <span class="mt-2 text-sm text-base-content">#8E44AD</span>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-full" style="background: #1ABC9C"></div>
        <span class="mt-2 text-sm text-base-content">#1ABC9C</span>
      </div>
    </div>
  </div>
</div>

</template>

<script setup lang='js'>
import { computed, watch, onMounted, onUpdated, onBeforeUnmount, ref } from 'vue'
import { users } from '../data/users.js'

//récupere la couleur Primary dans mon tableau user:
    // une var user qui auras pour valeurs le premier element avec le pseudo ColorMaster dans le tableau Users
const user = users.find(u => u.pseudo === "ColorMaster")
    //une var project qui auras pour valeurs le premier projet de user 
const project = user.projects[0]
    //et une derniere var qui récupere la valeur de la couleur Primaru dans la palette de couleur du projet de user
const primaryColor = project.colorPalette.find(c => c.name === "Primary").value

const secondaryColor = project.colorPalette.find(c => c.name === "Secondary").value
const accentColor = project.colorPalette.find(c => c.name === "Accent").value
const bgColor = project.colorPalette.find(c => c.name === "Background").value
const textColor = project.colorPalette.find(c => c.name === "Text").value

</script>

<style scoped lang="css">
</style>