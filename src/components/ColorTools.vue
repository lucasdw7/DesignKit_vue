<template>

  <div class="flex justify-between items-center">
    <!-- Gauche -->
    <div class="flex items-center gap-4">
       <router-link to="./">
        <button class="btn btn-accent btn-circle flex items-center" tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </router-link>

     <router-link to="./">
      <button class="btn btn-accent btn-circle flex items-center" tabindex="0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </router-link>

     <router-link to="./">
      <button class="btn btn-accent btn-circle flex items-center" tabindex="0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </router-link>
  </div>

    <!-- Droit -->
    <router-link to="../">
      <button class="btn btn-accent btn-circle flex items-center" tabindex="0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </router-link>
  </div>


</template>

<script setup lang='js'>
import { computed, watch, onMounted, onUpdated, onBeforeUnmount, ref } from 'vue'

import { RouterLink } from "vue-router";
</script>

<style scoped lang="css"></style>