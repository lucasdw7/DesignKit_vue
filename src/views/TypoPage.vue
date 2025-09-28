<template>
  <div>
    <TitleBar/>
    <ToolsBar/>
    <TypoTools/>

  </div>
</template>

<script setup lang='js'>
import { ref, watch } from 'vue';
import ToolsBar from '../components/ToolsBar.vue';
import TitleBar from '../components/TitleBar.vue';
import TypoTools from '../components/TypoTools.vue';
</script>

<style scoped >
</style>