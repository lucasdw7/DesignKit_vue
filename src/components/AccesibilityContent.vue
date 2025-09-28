<template>
  
<div class="card w-full p-2  bg-base-100 shadow-md mt-6">
  <div class="card-body">
    <!-- Header de la card -->
    <div class="flex justify-between items-center">
      <h2 class="card-title text-xl uppercase">Accessibilité</h2>
    </div>

    <!-- Grille -->
      <div class="grid grid-cols-7 gap-4">
        <!-- ligne 1 -->
        <div class="flex items-center justify-center w-full p-2  rounded-md"> bg/text</div>
        <div class="flex items-center justify-center w-full p-2  rounded-md bg-accent"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-content"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-secondary"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-primary"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-300"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-200"></div>

        <!-- Deuxième ligne 2 -->
        <div class="flex items-center justify-center w-full p-2  rounded-md bg-accent"></div>
        <div class="flex items-center justify-center w-full p-2  rounded-md"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md  bg-accent text-base-content">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md  bg-accent text-secondary">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md  bg-accent text-primary">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md  bg-accent text-base-300">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md  bg-accent text-base-200">AAA</div>
        <!-- Deuxième ligne 3 -->
        <div class="flex items-center justify-center w-full p-2  rounded-md bg-base-content"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-content text-accent">AAA</div>
        <div class="flex items-center justify-center w-full p-2  rounded-md"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-content text-secondary">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-content text-primary">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-content text-base-300">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-content text-base-200">AAA</div>

        <!-- Deuxième ligne 4 -->
        <div class="flex items-center justify-center w-full p-2  rounded-md bg-secondary"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-secondary text-accent">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-secondary text-base-content">AAA</div>
        <div class="flex items-center justify-center w-full p-2  rounded-md"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-secondary text-primary">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-secondary text-base-300">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-secondary text-base-200">AAA</div>

        <!-- Deuxième ligne 5 -->
        <div class="flex items-center justify-center w-full p-2  rounded-md bg-primary"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-primary text-accent">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-primary text-base-content">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-primary text-secondary">AAA</div>
        <div class="flex items-center justify-center w-full p-2  rounded-md"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-primary text-base-300">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-primary text-base-200">AAA</div>

        <!-- Deuxième ligne 6 -->
        <div class="flex items-center justify-center w-full p-2  rounded-md bg-base-300"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-300 text-accent">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-300 text-base-content">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-300 text-secondary">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-300 text-primary">AAA</div>
        <div class="flex items-center justify-center w-full p-2  rounded-md"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-300 text-base-200">AAA</div>

        <!-- Deuxième ligne 7 -->
        <div class="flex items-center justify-center w-full p-2  rounded-md bg-base-200"></div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-200 text-accent">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-200 text-base-content">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-200 text-secondary">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-200 text-primary">AAA</div>
        <div class=" flex items-center justify-center w-full p-2  rounded-md bg-base-200 text-base-300">AAA</div>
        <div class="flex items-center justify-center w-full p-2  rounded-md"></div>

      </div>
      
    
  </div>
</div>


</template>

<script setup lang='js'>
import { computed, watch, onMounted, onUpdated, onBeforeUnmount } from 'vue'


</script>

<style scoped lang="css">
</style>