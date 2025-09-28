<template>
  <div class="w-full bg-blue-700 text-white flex justify-between items-center p-4 ">
    <!-- Partie gauche : code + nuances -->
    <div class="flex items-center gap-4">
      <!-- Code couleur -->
      <span class="text-lg">#FFFFFF</span>

      <!-- Nuances -->
      <div class="flex gap-2">
        <span class="w-6 h-6 rounded-full bg-gray-100"></span>
        <span class="w-6 h-6 rounded-full bg-gray-300"></span>
        <span class="w-6 h-6 rounded-full bg-gray-400"></span>
      </div>
    </div>

    <!-- Partie droite : contrastes -->
    <div class="flex items-center gap-2 md:gap-6 ">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-white"></span>
        <span class="text-lg">2.31.4</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-black"></span>
        <span class="text-lg">2.31.4</span>
      </div>
    </div>
  </div>
</template>


<script setup lang='js'>
import { computed, watch, onMounted, onUpdated, onBeforeUnmount, ref } from 'vue'


</script>

<style scoped lang="css"></style>