<template>

  <section class="card bg-base-100 w-full p-2 rounded-none ">
    <div class="card-body flex flex-row gap-4">
<!-- block teintes 
     Relative pour pouvoir positionner le curseur dedans
     Les :Aria-"" servent a lier dynamiquement des valeurs pour les lecteurs d'écran:
        - aria-label = décrire le conteneur et donner les valeurs de contraste de la teinte (saturation et value ( luminosité)
        - aria-value = indique la valeurs minimal et maximal possible ainsi que la valeur de la couleur actuelle (la valeur de la couleurs sur une échelle de 1 )100)

        @pointerdown.prevent="startSvPointer"
        @keydown.prevent="onSVKeydown"
        On écoute les événments "" quand on clic ou qu'on appuie sur le clavier, en empechant les action par défaut (espace pour faire defiler la page ou selection de texte par exemple) 
     -->
      <div 
        class="relative overflow-hidden w-full aspect-[4/3] rounded-xl shadow-inner"
        style="touch-action:none;"
        ref="svRef"
        role="slider"
        tabindex="0"
        :aria-label="`Sélecteur de teinte (saturation et luminosité) : sat ${sat}% value ${val}%`"
        :aria-valuemin="0" 
        :aria-valuemax="100"
        :aria-valuenow="sat"
        @pointerdown.prevent="startSvPointer"
        @keydown.prevent="onSVKeydown"
      >

        <!-- inset-0 = que l'élément prenne la taille dde sont conteneur (en absolute) -->
        <!-- Couche de couleur de base (teinte actulle) qui récuperer les données de hexaAtFull pour les appliquées au style du conteneur (BG)  -->
        <div class="absolute inset-0 rounded-xl"
          :style="{ backgroundColor: hexAtFull }">
        </div>
          <!-- Couche dégrader blanc vers transparent (pour la saturation), 
          On applique dynamiquement un dégrader au style du conteneur 
          (de gauche à droite)  -->
        <div class="absolute inset-0 rounded-xl"
          :style="{ background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))' }">
        </div>
         <!-- Couche degrader noir vers transparent (pour la luminosité),
          (de haut en bas)  -->
        <div class="absolute inset-0 rounded-xl"
          :style="{ background: 'linear-gradient(to bottom, rgba(0,0,0,0), #000)' }">
        </div>

        <!-- Curseur  -->
         <div
              class="absolute w-4 h-4 rounded-full ring-2 ring-white/90 shadow-md -translate-x-1/2 -translate-y-1/2"
              :style="{ left: sat + '%', top: (100 - val) + '%' }"
              aria-hidden="true">
          </div>

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
      <div class="card bg-base-300 w-2/3 p-2">
        <!-- Vue de la couleur et titre du block"Valeurs" -->
        <div class="flex items-center gap-3">
          <!-- Vue couleur -->
          <div></div>
          <!-- Titre -->
          <div class="flex-1">
            <h3 class="font-medium">Valeurs</h3>
            <div class="text-sm text-muted">{{ hex }}</div>
          </div>
        </div>
        <!-- Valeurs copiables -->
        <div class="mt-3 flex flex-wrap gap-2 md:gap-8 p-2">
          <!-- Valeurs copiables Hexa -->
          <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div class="text-xs font-medium">HEX</div>
                <button class="btn btn-ghost btn-sm text-left md:text-center">{{ hex }}</button>
          </div>
          <!-- Valeurs copiables RGB -->
          <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div class="text-xs font-medium">RGB</div>
                <button class="btn btn-ghost btn-sm text-left md:text-center">{{ rgbString }}</button>
          </div>
          <!-- Valeurs copiables  CMJN-->
          <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div class="text-xs font-medium">CMJN</div>
                <button class="btn btn-ghost btn-sm text-left md:text-center">{{ cmykString }}</button>
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

// Initialisation de curseur pour les manipulés 
// (Pour écouter et calculé la teinte et la couleur en fonction de sa position)
const svRef = ref(null);
// const hueRef = ref(null);

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

// Conversions----------------------------------------//
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
  // Une variable qui pour chaque propriétes retourne 'n' convertie en string en base 16 , si la chaine à moins de 2 carractéres on complete avec des 0 sur la gauche (.padStart(2,'0')), et on mets les lettres en majuscules.
  const toHex = n => n.toString(16).padStart(2,'0').toUpperCase();
  // On retourne alors la variables toHex pour chauqe popriétées de la fonction que l'on concatène avec # (écrit/ajoute)
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

//Fonction pour convertir le RGB en CMYK
function rgbToCmyk(red,green,blue) {
  // Si red , green, blue =0 on retourne ces propriétées à 0 avec un Key à 100 pour avoir du noir pur
  if (red===0 && green===0 && blue===0) return { cyan:0,magenta:0,yellow:0,key:100 };
  // Sinom on commence par diviser chaque propriété par 255 pour ramener les valeurs entre 0 et 1 (plus facile à manipuler (on vas de 0.255 ou 0.1))
  red /= 255; green /= 255; blue /= 255;
  // Pour Key on soustrait 1 à la propriétée la plus forte ( la plus clair) 
  // Pour mesurer la noirceur (key) attribuer à la couleur trouver la valeur la plus claire pour déterminer combien de noir on ajoute à la couleur
  const key = 1 - Math.max(red,green,blue);
  // Pour Cyan on soustrait le noir et le rouge a valeur (1 qui est le cyan) pour 
  // avoir la quantité de cyan 
  // ex: 1-0.5-0.2=0.3 de cyan dans la couleur 
  // Et on divise par la valeur (1) - key (noir) pour ramené à l'echelle (0.1)
  const cyan = (1 - red - key) / (1 - key);
  // Même logique pour Magenta 
  const magenta = (1 - green - key) / (1 - key);
  // Même logique pour Magenta 
  const yellow = (1 - blue - key) / (1 - key);
  // On retrourne chaque valeur divisier par 100 et arrondit à l'entier le plus proche 
  // On divise par 100 pour convertire en pourcentage (de 0.1 à 0.100) 
  // Et on arrondie pour avoir un pourcentage entier 
  return {
    cyan: Math.round(cyan*100),
    magenta: Math.round(magenta*100),
    yellow: Math.round(yellow*100),
    key: Math.round(key*100)
  };
}

//On vérifie que les fonction de conversion HSV, RGB et CMJK fonction est renvoie les valeur dans la console
console.log(hue.value, sat.value, val.value, rgbObj.value, hex.value, cmykString.value);

//Manipulation du pointeur du block de teinte -------------------------//
// (teinte/contrastre= saturation() et luminosité(val) "valeur HSV")

// On commence par initialisé un variable pour stocké la valeur (l'id) du pointeur 
let svPointerId = null;
// Fonction qui récupere le parametre pointerEvent 
// (qui récuperer l'évenement du clic par l'utilisateur)
function startSvPointer(pointerEvent) {
  // On initialise une variable qui récupere la valeur de l'élement svRef (la zone de teinte)
  const pointerElement = svRef.value;
  // Si pointerElement na pas de valeur on retourne : 
  if (!pointerElement) return;
    //on dit a l'élément de capturer tous les evenements du pointeur pour un clic en particulier (.? securité pour  vérifier la méthode avant de l'appeler)
    pointerElement.setPointerCapture?.(pointerEvent.pointerId);
    // on défini l'identitfiant du pointeur comme valeur de svPointerId
    svPointerId = pointerEvent.pointerId;
    //fonction qui va récuperer la valeur du parametre pour mettre a jour les donnée de la teinte
    updateSVPointerEvent(pointerEvent);
    // On ajoute les evenements à la fenetre ( conteneur teintes) qui feras que : 
    // - à chaque fois que la souris bouge meme en dehors du block le pointer bougera aussi. 
    // - quand l'utilisateur relache le clic le pointer sera nettoyer et libérer avant que cette événment ne ce suprime aprés son déclanchement 
    window.addEventListener('pointermove', onSVPointerMove);
    window.addEventListener('pointerup', onSVPointerUp, { once: true });
}
// Fonction qui vérifie si on utilise le bon pointer avant de mettre a jour les valeurs de teinte (si c'est le bon pointer)
function onSVPointerMove(pointerEvent) {
  if (pointerEvent.pointerId !== svPointerId) return;
  updateSVPointerEvent(pointerEvent);
}
// Fonction pour nettoyer (retirer) l'événement et réintialise la valeur du pointer 
function onSVPointerUp(pointerEvent) {
  if (pointerEvent.pointerId !== svPointerId) return;
  svPointerId = null;
  window.removeEventListener('pointermove', onSVPointerMove);
}
// Fonction qui calcule les valeurs de luminosité(val) et de saturation(sat) en fonction de la position du pointer dans le block
function updateSVPointerEvent(pointerEvent) {
  // On initialise une variable qui récupere la valeur de l'élement svRef (la zone de teinte)
  const pointerElement = svRef.value;
  if (!pointerElement) return;
  //on récupere la position et la taille de l'élément par rapport a la fenetre.
     // getBoundingClientRect permet de connaitre la taille et la position d'un élément
  const hvBlockSize = pointerElement.getBoundingClientRect();
  // calcul les coordonnées du pointeur à l'interieur de l'éléments 
  const PosXPointer = clamp(pointerEvent.clientX - hvBlockSize.left, 0, hvBlockSize.width);
  const PosYPointer = clamp(pointerEvent.clientY - hvBlockSize.top, 0, hvBlockSize.height);
  //On convertit la position en valeur 
    // On arrondie à l'entier le résultat de 100 fois la position diviser par la taille du block,
    //  -1 sert à inverser l'axe,
    //  position / taille donne une fraction 0.1,
    //  que l'on convertit en pourcentage avec *100
  sat.value = Math.round((PosXPointer / hvBlockSize.width) * 100);
  val.value = Math.round((1 - PosYPointer / hvBlockSize.height) * 100);
}
// fonction pour manipuler la position du curseur au clavier
function onSVKeydown(pointerEvent) {
  // Si touche Shift enfoncer + direction = déplacement de 5 en 5 sinom 1
  const stepDirectionPointer = pointerEvent.shiftKey ? 5 : 1;
  //Si l'évenement du pointeur a comme key la touche "fleche gauche" la valeur de la saturation sera égale à ça valeur moins la valeur de déplacement (entre 0 et 100)
  if (pointerEvent.key === 'ArrowLeft') sat.value = clamp(sat.value - stepDirectionPointer, 0, 100);
  else if (pointerEvent.key === 'ArrowRight') sat.value = clamp(sat.value + stepDirectionPointer, 0, 100);
  else if (pointerEvent.key === 'ArrowUp') val.value = clamp(val.value + stepDirectionPointer, 0, 100);
  else if (pointerEvent.key === 'ArrowDown') val.value = clamp(val.value - stepDirectionPointer, 0, 100);
}


// Nettoyage ---------------------------//

// fonction qui permet de supprimer (détruire) les événement d'écoute qui sont acroché au composant quand mon composant n'est plus utilisé (cycle de vie) 
// Sans ça :
// Même si ton composant n’est plus affiché, les pointermove continueraient à déclencher les fonctions.
// Résultat : erreurs en console, perte de performance, mémoire consommée inutilement.
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onSVPointerMove);
  // window.removeEventListener('pointermove', onHuePointerMove);
});
</script>

<style scoped lang="css"></style>


