<template>
  <!-- V1 pourrie
    <div class="flex flex-col md:flex-row items-center justify-center gap-6 bg-base-200 p-6 rounded-lg">
    <!-- Zone de sélection principale 
    <div class="relative w-64 h-64 rounded-lg overflow-hidden">
      <!-- Dégradé principal 
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to top, black, transparent), 
               linear-gradient(to right, white, transparent), 
               blue;"
      ></div>
      <!-- Curseur rond 
      <div
        class="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white"
      ></div>
    </div>

    <!-- Barre verticale de spectre 
    <div class="relative w-6 h-64 rounded-full overflow-hidden">
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to top, red, yellow, lime, cyan, blue, magenta, red);"
      ></div>
      <!-- Curseur rond 
      <div
        class="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-6 h-6 rounded-full border-2 border-white"
      ></div>
    </div>

    <!-- Infos couleurs 
    <div class="grid grid-cols-2 gap-4 bg-base-100 p-6 rounded-lg shadow-md">
      <div>
        <p class="font-semibold">RGB</p>
        <p class="font-mono text-sm">#FFFFFF</p>
      </div>
      <div>
        <p class="font-semibold">CMYK</p>
        <p class="font-mono text-sm">#FFFFFF</p>
      </div>
      <div>
        <p class="font-semibold">HEX</p>
        <p class="font-mono text-sm">#FFFFFF</p>
      </div>
      <div>
        <p class="font-semibold">HSL</p>
        <p class="font-mono text-sm">#FFFFFF</p>
      </div>
      <div>
        <p class="font-semibold">Websafe</p>
        <p class="font-mono text-sm">#FFFFFF</p>
      </div>
      <div>
        <p class="font-semibold">Accessibilty</p>
        <p class="font-mono text-sm">#FFFFFF</p>
      </div>
    </div>
  </div>
 -->

  <section class="card bg-base-100 w-full p-4 rounded-none ">
    <div class="card-body flex flex-row gap-4">
<!-- block teintes -->
      <div 
        class="relative overflow-hidden w-full aspect-[4/3] rounded-xl shadow-inner bg-accent"
        aria-label="Zone sélection de saturation et luminosité" 
        role="slider"
        tabindex="0">

      </div>
<!-- Block couleurs -->
      <div class="relative w-12 rounded-full overflow-hidden bg-info"
      role="slider"
      tabindex="0">
      <!-- Gradient -->
        <div style="background: linear-gradient(to bottom, red, yellow, lime, cyan, blue, magenta, red);"> </div>
        <!-- curseur -->
          <div class="absolute left-0 right-0 h-0.5 bg-white/90">
        </div>
      </div>

<!-- Block Valeurs -->
      <div class="card bg-error p-3">
        <!-- Vue de la couleur et titre du block"Valeurs" -->
        <div class="flex items-center gap-3">
          <!-- Vue couleur -->
          <div></div>
          <!-- Titre -->
          <div class="flex-1">
            <h3 class="font-medium">Valeurs</h3>
            <div class="text-sm text-muted">code hex</div>
          </div>
        </div>
        <!-- Valeurs copiables -->
        <div class="mt-3 flex flex-wrap gap-2 md:gap-8 p-4">
          <!-- Valeurs copiables Hexa -->
          <div class="flex items-center justify-between">
                <div class="text-xs font-medium">HEX</div>
                <button class="btn btn-ghost btn-xs">#00JHGF</button>
          </div>
          <!-- Valeurs copiables RGB -->
          <div class="flex items-center justify-between">
                <div class="text-xs font-medium">HEX</div>
                <button class="btn btn-ghost btn-xs">#00JHGF</button>
          </div>
          <!-- Valeurs copiables  CMJN-->
          <div class="flex items-center justify-between">
                <div class="text-xs font-medium">HEX</div>
                <button class="btn btn-ghost btn-xs">#00JHGF</button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="js">
import { computed, watch, onMounted, onUpdated, onBeforeUnmount,ref } from 'vue'

// Valeurs des teintes 
const hue = ref(0); //teinte
const sat = ref(100); //saturation
const val = ref(100); //valeur

// On pour calculé(convertir) les valeurs HSV (hue, sat, val) en valeurs RGB grace à la fonction "hsvToRgb"
const rgbObj = computed(() => hsvToRgb(hue.value, sat.value, val.value));
// On calcule la valeur de rgbObj en Hexa
const hex = computed(() => rgbToHex(rgbObj.value));
// on calcule la valeur Hexa via l'objet "rgbObj" en forcant la saturation et la valeur à 100%
const hexAtFull = computed(() => rgbToHex(hsvToRgb(hue.value, 100, 100)));
// On calcule la valeur Rgb pour la convertir en string 
const rgbString = computed(() => `rgb(${rgbObj.value.red}, ${rgbObj.value.green}, ${rgbObj.value.blue})`);
// On calcule la valeur de rgbObj pour la convertir en CMYK
const cmykString = computed(() => {
  const codeCmyk = rgbToCmyk(rgbObj.value.red, rgbObj.value.green, rgbObj.value.blue);
  // On retourne la valeurs convertie en string 
  return `cmyk(${codeCmyk.cyan}%, ${codeCmyk.magenta}%, ${codeCmyk.yellow}%, ${codeCmyk.key}%)`;
});

// Fonction pour définir une gradutation max et min au valeurs des couleurs 
function clamp(graduation, minGraduation, MaxGraduation) { return Math.max(minGraduation, Math.min(MaxGraduation, graduation)); }

// Conversions
// Fonction pour convertir le HSV en RGB qui attend comme valeurs hueColor (teinte), saturation, valueColor (couleur de base/valeur)
function hsvToRgb(hueColor, saturation, valueColor) {
  //On indique que saturation et la valeur sont diviser par 100 pour facilité les calcul (exemple 50% deviens 0.5)
  saturation = saturation/100; 
  valueColor = valueColor/100;
  //Diviser la valeur par la sauration pour definir la différence avec les 2 valeurs
  const colorForce = valueColor * saturation;
  // Divise la valeur de la teinte par 60 pour définir la couleur (Roue chromatique diviser par secteur) 
  const chromaValue = hueColor / 60;
  //met a l'echelle le positionnement de la valeur dans le secteur par rapport à la force de la teinte
  //colorForce * (1 - Math.abs((chromaValue % 2) - 1)) sert à créer une valeur qui monte de 0 à colorForce puis redescend à 0 de façon triangulaire, selon la position de chromaValue dans son cycle.
  const moyValue = colorForce * (1 - Math.abs((chromaValue % 2) - 1));
  // Variables temporaires pour recevoir la valeur selon le secteur 
  let red1=0,green1=0,blue1=0;
  //si la couleur est supérieur à 0 et inférieur à 1
  if (chromaValue >= 0 && chromaValue < 1) { 
    //alors red1 aura comme valeur la force de la couleur, green1 aura le positionnement dans le secteur et blue1 auras comme valeur 0 
  red1=colorForce; green1=moyValue; blue1=0; } //rouge-majoritaire
  else if (chromaValue < 2) { red1=moyValue; green1=colorForce; blue1=0; } // jaune→vert
  else if (chromaValue < 3) { red1=0; green1=colorForce; blue1=moyValue; } //vert-majoritaire
  else if (chromaValue < 4) { red1=0; green1=moyValue; blue1=colorForce; } // vert→bleu
  else if (chromaValue < 5) { red1=moyValue; green1=0; blue1=colorForce; } // bleu→magenta
  else { red1=colorForce; green1=0; blue1=moyValue; } //magenta→rouge
  //ajuste la valeur pour faire correspondre à la valeur exact de la couleur 
  const valueAdjust = valueColor - colorForce;
    //on retourne chaque valeur puis on arrondit pour avoir la forme standard RGB 
  return {
    red: Math.round((red1 + valueAdjust) * 255),
    green: Math.round((green1 + valueAdjust) * 255),
    blue: Math.round((blue1 + valueAdjust) * 255)
  };
}

//Fonction pour convertir le RGB en Hexa 
function rgbToHex({red,green,blue}) {
  const toHex = n => n.toString(16).padStart(2,'0').toUpperCase();
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

//Fonction pour convertir le RGB en CMYK
function rgbToCmyk(red,green,blue) {
  if (red===0 && green===0 && blue===0) return { cyan:0,magenta:0,yellow:0,key:100 };
  red /= 255; green /= 255; blue /= 255;
  const key = 1 - Math.max(red,green,blue);
  const cyan = (1 - red - key) / (1 - key);
  const magenta = (1 - green - key) / (1 - key);
  const yellow = (1 - blue - key) / (1 - key);
  return {
    cyan: Math.round(cyan*100),
    magenta: Math.round(magenta*100),
    yellow: Math.round(yellow*100),
    key: Math.round(key*100)
  };
}
console.log(hue.value, sat.value, val.value, rgbObj.value, hex.value, cmykString.value);

</script>

<style scoped lang="css"></style>


