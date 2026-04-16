<template>
  <section class="card bg-base-100 shadow-md mt-6">
    <div class="card-body gap-4">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="card-title text-xl uppercase">Composer la palette</h2>
          <p class="text-sm opacity-70">
            Sélectionne une couleur puis applique-la à un rôle avant de sauvegarder.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div>
            <div class="text-xs uppercase opacity-60">Couleur active</div>
            <div class="text-sm font-semibold">{{ selectedColor }}</div>
          </div>

          <div
            class="h-12 w-12 rounded-2xl border border-base-300 shadow-sm"
            :style="{ backgroundColor: selectedColor }"
            aria-hidden="true"
          ></div>

          <button
            type="button"
            class="btn btn-accent"
            :class="{ 'btn-disabled': saving }"
            :disabled="saving"
            @click="$emit('save-palette')"
          >
            {{ saving ? "Sauvegarde..." : "Sauvegarder dans Firebase" }}
          </button>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="slot in paletteSlots"
          :key="slot.name"
          class="rounded-2xl border border-base-300 bg-base-200 p-4"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-sm font-semibold uppercase">{{ slot.label }}</div>
              <div class="text-xs opacity-70">{{ palette[slot.name] }}</div>
            </div>

            <div
              class="h-12 w-12 rounded-xl border border-base-300"
              :style="{ backgroundColor: palette[slot.name] }"
              aria-hidden="true"
            ></div>
          </div>

          <button
            type="button"
            class="btn btn-outline btn-sm mt-4 w-full"
            @click="$emit('assign-color', slot.name)"
          >
            Utiliser la couleur active pour {{ slot.label.toLowerCase() }}
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="js">
const props = defineProps({
  palette: {
    type: Object,
    required: true,
  },
  selectedColor: {
    type: String,
    default: "#3B82F6",
  },
  saving: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["assign-color", "save-palette"]);

const paletteSlots = [
  { name: "primary", label: "Primary" },
  { name: "secondary", label: "Secondary" },
  { name: "accent", label: "Accent" },
  { name: "background", label: "Background" },
  { name: "text", label: "Text" },
  { name: "success", label: "Success" },
];
</script>

<style scoped lang="css"></style>
