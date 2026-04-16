<template>
  <div>
    <TitleBar />
    <ToolsBar />

    <section class="card bg-base-100 shadow-md mt-6">
      <div class="card-body gap-3">
        <label class="form-control w-full">
          <span class="label-text text-sm font-medium">Nom de la palette</span>
          <input
            v-model="paletteName"
            type="text"
            class="input input-bordered w-full"
            placeholder="Palette principale"
          />
        </label>

        <p
          v-if="feedbackMessage"
          class="text-sm"
          :class="feedbackType === 'error' ? 'text-error' : 'text-success'"
        >
          {{ feedbackMessage }}
        </p>
      </div>
    </section>

    <ColorTools
      :palette="palette"
      :selected-color="selectedColor"
      :saving="saving"
      @assign-color="assignColorToSlot"
      @save-palette="handleSavePalette"
    />

    <ColorShade :color="selectedColor" />
    <ColorPicker v-model:chosedColor="selectedColor" />
  </div>
</template>

<script setup lang="js">
import { ref } from "vue";
import ColorPicker from "../components/ColorPicker.vue";
import ColorShade from "../components/ColorShade.vue";
import ColorTools from "../components/ColorTools.vue";
import TitleBar from "../components/TitleBar.vue";
import ToolsBar from "../components/ToolsBar.vue";
import { getDefaultPaletteColors, savePalette } from "../environments/palette";

const selectedColor = ref("#3B82F6");
const paletteName = ref("Palette principale");
const palette = ref(getDefaultPaletteColors());
const saving = ref(false);
const feedbackMessage = ref("");
const feedbackType = ref("success");

function assignColorToSlot(slotName) {
  palette.value = {
    ...palette.value,
    [slotName]: selectedColor.value,
  };

  feedbackMessage.value = `La couleur ${selectedColor.value} est maintenant associee a ${slotName}.`;
  feedbackType.value = "success";
}

async function handleSavePalette() {
  saving.value = true;
  feedbackMessage.value = "";

  try {
    const savedPalette = await savePalette({
      name: paletteName.value,
      colors: palette.value,
    });

    paletteName.value = savedPalette.name;
    palette.value = savedPalette.colors;
    feedbackMessage.value = "Palette enregistree dans Firebase.";
    feedbackType.value = "success";
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la palette :", error);
    feedbackType.value = "error";
    feedbackMessage.value = getFirebaseErrorMessage(error);
  } finally {
    saving.value = false;
  }
}

function getFirebaseErrorMessage(error) {
  const errorCode = typeof error?.code === "string" ? error.code : "";

  if (errorCode === "auth/admin-restricted-operation") {
    return "Firebase bloque la creation de comptes cote client. Autorise l'inscription des utilisateurs dans Identity Platform ou Firebase Authentication.";
  }

  if (errorCode === "auth/operation-not-allowed") {
    return "L'authentification anonyme n'est pas active dans Firebase Authentication.";
  }

  if (errorCode === "PERMISSION_DENIED") {
    return "La base Realtime Database refuse l'ecriture. Verifie les rules de users/$uid.";
  }

  return `La sauvegarde a echoue${errorCode ? ` (${errorCode})` : ""}. Ouvre la console du navigateur pour voir le detail.`;
}
</script>

<style scoped></style>
