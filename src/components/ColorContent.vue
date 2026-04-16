<template>
  <div class="card w-full bg-base-100 shadow-md mt-6">
    <div class="card-body">
      <div class="flex justify-between items-center">
        <h2 class="card-title text-xl uppercase">Palette de couleurs</h2>

        <router-link to="/colors">
          <button class="btn btn-accent btn-sm flex items-center gap-1">
            Modifier
          </button>
        </router-link>
      </div>

      <div v-if="loading" class="mt-4 text-sm text-base-content">
        Chargement de la palette...
      </div>

      <div v-else-if="paletteColors.length === 0" class="mt-4 text-sm text-base-content">
        Aucune palette enregistrée.
      </div>

      <div v-else class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 mt-2">
        <div
          v-for="color in paletteColors"
          :key="color.name"
          class="flex flex-col items-center"
        >
          <div
            class="w-20 h-20 rounded-full"
            :style="{ backgroundColor: color.value }"
          ></div>

          <span class="mt-2 text-sm text-base-content">{{ color.value }}</span>
          <span class="text-xs text-base-content opacity-70">{{ color.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { ref as firebaseRef, onValue } from "firebase/database";
import { auth, db } from "../environments/firebase";

const loading = ref(true);
const palette = ref(null);

let stopAuthListener = null;
let stopDbListener = null;

const paletteColors = computed(() => {
  if (!palette.value || !palette.value.colors) {
    return [];
  }

  const colors = palette.value.colors;

  return [
    { name: "primary", label: "Primary", value: colors.primary || "#000000" },
    { name: "secondary", label: "Secondary", value: colors.secondary || "#000000" },
    { name: "accent", label: "Accent", value: colors.accent || "#000000" },
    { name: "background", label: "Background", value: colors.background || "#000000" },
    { name: "text", label: "Text", value: colors.text || "#000000" },
    { name: "success", label: "Success", value: colors.success || "#000000" }
  ];
});

function resolveStoredPalette(data) {
  if (!data) {
    return null;
  }

  if (data.colors) {
    return data;
  }

  if (data.current?.colors) {
    return data.current;
  }

  const savedPalettes = Object.values(data).filter((entry) => entry?.colors);

  if (savedPalettes.length === 0) {
    return null;
  }

  return savedPalettes.sort((firstPalette, secondPalette) => {
    return (secondPalette.createdAt || 0) - (firstPalette.createdAt || 0);
  })[0];
}

onMounted(() => {
  stopAuthListener = onAuthStateChanged(auth, (user) => {
    if (stopDbListener) {
      stopDbListener();
      stopDbListener = null;
    }

    if (!user) {
      palette.value = null;
      loading.value = false;
      return;
    }

    const palettesRef = firebaseRef(
      db,
      `users/${user.uid}/projects/designkit/palettes`
    );

    stopDbListener = onValue(
      palettesRef,
      (snapshot) => {
        const data = snapshot.val();

        palette.value = resolveStoredPalette(data);
        loading.value = false;
      },
      (error) => {
        console.error("Erreur Firebase :", error);
        loading.value = false;
      }
    );
  });
});

onBeforeUnmount(() => {
  if (stopAuthListener) {
    stopAuthListener();
  }

  if (stopDbListener) {
    stopDbListener();
  }
});
</script>
