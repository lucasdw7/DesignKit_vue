<template>
  <div>
    <!-- Conteneur de modification -->
    <div>
      <!-- Modif de base  -->
      <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-4">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Taille de Base</legend>
          <select class="select select-accent bg-base-300 ">
            <option disabled selected>Taille de Base</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
          <!-- <span class="label">Optional</span> -->
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Unité</legend>
          <select class="select select-accent bg-base-300">
            <option disabled selected>Unité</option>
            <option>px</option>
            <option>em</option>
            <option>rem</option>
          </select>
        </fieldset>
        </div>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Ratio</legend>
          <select class="select select-accent bg-base-300">
            <option disabled selected>Ratio</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Niveaux</legend>
          <select class="select select-accent bg-base-300">
            <option disabled selected>Niveaux</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
        </fieldset>
      </div>
      <!-- Modif typo 1 -->
      <div class="flex flex-row justify-between gap-8">
        <div>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Typographie de Titre</legend>
          <select class="select select-accent bg-base-300 w-full">
            <option disabled selected>Typographie de Titre</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
        </fieldset>
        <div class="flex gap-4">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Hauteur de ligne</legend>
          <select class="select select-accent bg-base-300">
            <option disabled selected>Hauteur de ligne</option>
            <option>px</option>
            <option>em</option>
            <option>rem</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Escpaces des caractères</legend>
          <select class="select select-accent bg-base-300">
            <option disabled selected>Escpaces des caractères</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
        </fieldset>
        </div>
        </div>

        <fieldset class="fieldset self-end">
          <legend class="fieldset-legend">Nombre</legend>
          <select class="select select-accent bg-base-300 self-end">
            <option disabled selected>Nombre</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
        </fieldset>
      </div>
      <!-- Modif typo 2 -->
      <div class="flex flex-row justify-between gap-8">
        <div>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Typographie de texte</legend>
          <select class="select select-accent bg-base-300 w-full">
            <option disabled selected>Typographie de texte</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
        </fieldset>
        <div class="flex gap-4">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Hauteur de ligne</legend>
          <select class="select select-accent bg-base-300">
            <option disabled selected>Hauteur de ligne</option>
            <option>px</option>
            <option>em</option>
            <option>rem</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Escpaces des caractères</legend>
          <select class="select select-accent bg-base-300">
            <option disabled selected>Escpaces des caractères</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
        </fieldset>
        </div>
        </div>

        <fieldset class="fieldset self-end">
          <legend class="fieldset-legend">Graisse</legend>
          <select class="select select-accent bg-base-300 self-end">
            <option disabled selected>Graisse</option>
            <option>Chrome</option>
            <option>FireFox</option>
            <option>Safari</option>
          </select>
        </fieldset>
      </div>
      
    </div>
    <!-- Conteneur de visualisation -->
    <div class="card bg-base-100 w-full p-4 md:p-8 gap-4 shadow-sm">

      <div class="flex flex-grow gap-8 text-primary">
        <p>Taille de base: 14</p>
        <p>Ratio: 1.17</p>
      </div>

      <div class="flex flex-grow items-center gap-4 px-2 md:px-16">
        <div class="flex flex-col text-end text-primary">
          <p>70px</p>
          <p>5.00rem</p>
        </div>
        <input type="text" placeholder="RENDU-H1" class="input input-ghost w-full h-fit text-8xl font-bold placeholder:text-base-content placeholder:opacity-100"/>
      </div>

     <div class="flex flex-grow items-center gap-4 px-2 md:px-16">
        <div class="flex flex-col text-end text-primary">
          <p>54px</p>
          <p>3.857re</p>
        </div>
        <input type="text" placeholder="Rendu-H2" class="input input-ghost w-full h-fit text-5xl font-bold placeholder:text-base-content placeholder:opacity-100"/>
      </div>

    </div>
    
  </div>
</template>

<script setup lang="js">
import { computed, watch, onMounted, onUpdated, onBeforeUnmount, ref } from 'vue'
</script>

<style scoped lang="css"></style>
