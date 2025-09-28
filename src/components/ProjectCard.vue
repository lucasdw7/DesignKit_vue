<template>

  <div class="card bg-base-100 w-full shadow-sm">

    <div class="flex justify-between p-4 px-8">
      <h2 class="text-xl font-bold">Projet 1</h2>
      <p class="text-lg font-semibold">Date</p>
    </div>

    <div class="divider divider-primary m-0"></div>

    <div class="flex flex-grow gap-16  p-4 px-8">

      <div class="flex flex-col w-1/2 gap-4">

        <div class="flex flex-grow items-center gap-4">
        <div class="w-8 h-8 rounded-full" style="background-color: #FF5733;"></div>
        <span class="text-base-content">#FF5733</span>
      </div>
      <div class="flex flex-grow items-center gap-4">
        <div class="w-8 h-8 rounded-full" style="background-color: #FF5733;"></div>
        <span class="text-base-content">#FF5733</span>
      </div>
      <div class="flex flex-grow items-center gap-4">
        <div class="w-8 h-8 rounded-full" style="background-color: #FF5733;"></div>
        <span class="text-base-content">#FF5733</span>
      </div>
      <div class="flex flex-grow items-center gap-4">
        <div class="w-8 h-8 rounded-full" style="background-color: #FF5733;"></div>
        <span class="text-base-content">#FF5733</span>
      </div>

      </div>

      <div class="flex flex-col w-1/2 gap-6">
        <p>Typographie 1</p>
        <p>Typographie 2</p>
      </div>

    </div>

    <div class="flex flex-grow justify-end-safe p-4 px-8 gap-4">

      <router-link to="/" >
    <button class="btn btn-ghost flex items-center" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h6v6m2 0h4v2H3v-2h4m8-4V7a2 2 0 00-2-2H9a2 2 0 00-2 2v6h10z" />
    </svg>
    Dupliquer
  </button>
  </router-link>

  <router-link to="/" >
    <button class="btn btn-ghost flex items-center" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h6v6m2 0h4v2H3v-2h4m8-4V7a2 2 0 00-2-2H9a2 2 0 00-2 2v6h10z" />
    </svg>
    Supprimer
  </button>
  </router-link>
    </div>

  </div>

</template>

<script setup lang='js'>
import { computed, watch, onMounted, onUpdated, onBeforeUnmount } from 'vue'

</script>

<style scoped lang="css">
</style>