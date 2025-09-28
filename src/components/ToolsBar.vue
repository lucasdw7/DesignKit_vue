<template>

 <div class="flex justify-between items-center">
  <!-- Bouton gauche : Mes projets -->
  <router-link to="/project" >
    <button class="btn btn-accent flex items-center" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h6v6m2 0h4v2H3v-2h4m8-4V7a2 2 0 00-2-2H9a2 2 0 00-2 2v6h10z" />
    </svg>
    Mes projets
  </button>
  </router-link>

  <!-- Bouton droit : Exportation -->
  <router-link to="/exportation">
    <button class="btn btn-accent btn-circle flex items-center" tabindex="0">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
  </button>
  </router-link>
</div>


</template>

<script setup lang='js'>
import { computed, watch, onMounted, onUpdated, onBeforeUnmount,ref } from 'vue'

// import { RouterLink } from "vue-router";
</script>

<style scoped lang="css">
</style>