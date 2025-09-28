<template>
  
  <!-- ✅ Conteneur principal du contenu (centré et responsive) -->
    <main class="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
      <ToolsBar/>
       <ColorContent/>
       <TypoContent/>
       <AccesibilityContent/>
      <!-- Zone dynamique où s’affichent les composants selon la route -->
      <router-view></router-view>
      <!-- Exemple de contenu temporaire pour tester :
      <h1>ICI c'est TOULOUSE</h1> -->
    </main>

  
</template>

<script setup lang='js'>
// import { ref, watch } from 'vue';
import ToolsBar from '../components/ToolsBar.vue';
import ColorContent from '../components/ColorContent.vue';
import TypoContent from '../components/TypoContent.vue';
import AccesibilityContent from '../components/AccesibilityContent.vue';
</script>

<style scoped >
</style>