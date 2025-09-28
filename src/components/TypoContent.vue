<template>
  <div class="card w-full bg-base-100 shadow-md mt-6">
  <div class="card-body">
    <!-- Header de la card -->
    <div class="flex justify-between items-center">
      <h2 class="card-title text-xl uppercase">Echelle typographique</h2>
      <router-link to="/typescale" >
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

    <!-- echelle typo -->
      <div class="w-full p-2 md:px-8 gap-4">

      <div class="flex gap-2 text-secondary">
        <p class="w-auto">Taille de base: 14</p>
        <p >Ratio: 1.17</p>
      </div>

      <div class="flex flex-grow items-center gap-4 px-2 md:px-16">
        <div class="flex flex-col text-end text-secondary">
          <p>70px</p>
          <p>5.00rem</p>
        </div>
        <input type="text" placeholder="RENDU-H1" class="input input-ghost w-full h-fit text-8xl font-bold placeholder:text-base-content placeholder:opacity-100"/>
      </div>

      <div class="flex flex-grow items-center gap-4 px-2 md:px-16">
        <div class="flex flex-col text-end text-secondary">
          <p>54px</p>
          <p>3.857re</p>
        </div>
        <input type="text" placeholder="Rendu-H2" class="input input-ghost w-full h-fit text-5xl font-bold placeholder:text-base-content placeholder:opacity-100"/>
      </div>

    </div>
  </div>
</div>

</template>

<script setup lang='js'>
import { computed, watch, onMounted, onUpdated, onBeforeUnmount, ref } from 'vue'

</script>

<style scoped lang="css">
</style>