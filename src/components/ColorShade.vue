<template>
  <section
    class="mt-6 flex flex-col gap-4 rounded-3xl p-5 shadow-md md:flex-row md:items-center md:justify-between"
    :style="{ backgroundColor: color, color: textColor }"
  >
    <div class="flex items-center gap-4">
      <div>
        <div class="text-xs uppercase opacity-70">Couleur sélectionnée</div>
        <div class="text-2xl font-semibold">{{ color }}</div>
      </div>

      <div class="flex gap-2">
        <span
          v-for="shade in shades"
          :key="shade.label"
          class="h-8 w-8 rounded-full border border-white/30"
          :style="{ backgroundColor: shade.value }"
          :title="`${shade.label} ${shade.value}`"
        ></span>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3 md:justify-end">
      <div class="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
        <div class="text-xs uppercase opacity-70">Contraste avec blanc</div>
        <div class="text-lg font-semibold">{{ contrastWithWhite }}</div>
      </div>

      <div class="rounded-2xl bg-black/15 px-4 py-3 backdrop-blur-sm">
        <div class="text-xs uppercase opacity-70">Contraste avec noir</div>
        <div class="text-lg font-semibold">{{ contrastWithBlack }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="js">
import { computed } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "#FFFFFF",
  },
});

const rgbColor = computed(() => hexToRgb(props.color));

const shades = computed(() => [
  { label: "Plus clair", value: mixColors(rgbColor.value, { red: 255, green: 255, blue: 255 }, 0.75) },
  { label: "Base", value: props.color.toUpperCase() },
  { label: "Plus fonce", value: mixColors(rgbColor.value, { red: 0, green: 0, blue: 0 }, 0.35) },
]);

const contrastWithWhite = computed(() => getContrastRatio(rgbColor.value, { red: 255, green: 255, blue: 255 }));
const contrastWithBlack = computed(() => getContrastRatio(rgbColor.value, { red: 0, green: 0, blue: 0 }));

const textColor = computed(() => {
  return numericContrastRatio(rgbColor.value, { red: 255, green: 255, blue: 255 }) >= 4.5
    ? "#FFFFFF"
    : "#111827";
});

function hexToRgb(value) {
  const normalizedValue = typeof value === "string" ? value.replace("#", "").trim() : "FFFFFF";

  return {
    red: Number.parseInt(normalizedValue.slice(0, 2), 16) || 255,
    green: Number.parseInt(normalizedValue.slice(2, 4), 16) || 255,
    blue: Number.parseInt(normalizedValue.slice(4, 6), 16) || 255,
  };
}

function rgbToHex({ red, green, blue }) {
  const toHex = (channel) => channel.toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function mixColors(baseColor, targetColor, amount) {
  const mixChannel = (baseChannel, targetChannel) => {
    return Math.round(baseChannel + (targetChannel - baseChannel) * amount);
  };

  return rgbToHex({
    red: mixChannel(baseColor.red, targetColor.red),
    green: mixChannel(baseColor.green, targetColor.green),
    blue: mixChannel(baseColor.blue, targetColor.blue),
  });
}

function getRelativeLuminance({ red, green, blue }) {
  const channels = [red, green, blue].map((channel) => {
    const normalizedChannel = channel / 255;
    return normalizedChannel <= 0.03928
      ? normalizedChannel / 12.92
      : ((normalizedChannel + 0.055) / 1.055) ** 2.4;
  });

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function numericContrastRatio(firstColor, secondColor) {
  const firstLuminance = getRelativeLuminance(firstColor);
  const secondLuminance = getRelativeLuminance(secondColor);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastRatio(firstColor, secondColor) {
  return `${numericContrastRatio(firstColor, secondColor).toFixed(2)}:1`;
}
</script>

<style scoped lang="css"></style>
