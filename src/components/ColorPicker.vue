<template>

  <section class="card bg-base-100 w-full p-4 rounded-none ">
    <div class=" flex flex-row gap-4">
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

        <!-- Pointeur  -->
         <div
              class="absolute w-4 h-4 rounded-full ring-2 ring-base-100 shadow-md -translate-x-1/2 -translate-y-1/2"
              :style="{ left: sat + '%', top: (100 - val) + '%' }"
              aria-hidden="true">
          </div>

      </div>
<!-- Block couleurs -->
      <div class="relative w-12 rounded-full overflow-hidden"
      style="touch-action:none;"
      role="slider"
      tabindex="0"
      ref="hueRef"
      :style="{ background: hueGradient }"
      :aria-label="`Curseur de teinte: ${Math.round(hue)}°`"
      :aria-valuemin="0"
      :aria-valuemax="360"
      :aria-valuenow="Math.round(hue)"
      @pointerdown.prevent="startHue"
      @keydown.prevent="onHueKeydown">
        <!-- curseur 
          style dynamique qui permet au curseur de s'adapter à la couleur : on commence par le haut et on divise hue (couleur) divisé par 360 (le nombre d'étapes) fois 100 (pour obtenir un pourcentage) et on ajoute le symbole % à la valeur, translate avoir le curseur centrée sur la couleur(sinom le trait se position en dessous et pas dessus , c'est la ligne du haut qui sert d'axe) -->
          <div class="absolute left-0 right-0 h-0.5 bg-base-100"
          :style="{ top: (hue / 360 * 100) + '%', transform: 'translateY(-50%)' }">
        </div>
      </div>

<!-- Block Valeurs -->
      <div class="card bg-base-300 w-2/3 p-2">
        <!-- Vue de la couleur et titre du block"Valeurs" -->
        <div class="flex items-center gap-3">
          <!-- Vue couleur -->
          <div class="w-12 h-12 rounded-xl  shadow-inner" :style="{ backgroundColor:hex}" aria-hidden="true"></div>
          <!-- Titre -->
          <div class="flex-1">
            <h3 class="font-medium">Valeurs</h3>
            <div class="text-sm text-muted">{{ hex }}</div>
          </div>
        </div>
        <!-- Valeurs copiables -->
        <div class="mt-3 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 w-full md:gap-8 p-2">
          <!-- Valeurs copiables Hexa -->
          <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div class="text-xs font-medium">HEX</div>
                <button class="btn btn-soft btn-sm text-left md:text-center">{{ hex }}</button>
          </div>
          <!-- Valeurs copiables RGB -->
          <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div class="text-xs font-medium">RGB</div>
                <button class="btn btn-soft btn-sm text-left md:text-center">{{ rgbString }}</button>
          </div>
          <!-- Valeurs copiables  CMJN-->
          <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div class="text-xs font-medium">CMJN</div>
                <button class="btn btn-soft btn-sm text-left md:text-center">{{ cmykString }}</button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="js">
import { computed, watch, onMounted, onUpdated, onBeforeUnmount,ref } from 'vue'
// PROPS / EMIT -------------------------------------------------------//
const props = defineProps({
  // variable pour déclarer les props 
  // (propriétes que pour recevoir l'élément par son parent)
  // On déclare ModeValue qui renvoie une valeur qui doit etre une String et qui part defaut sera #FF0000
  chosedColor: { type: String, default: '#FF0000' }
});
// Variable qui défini ce que l'on permet d'émettre (envoyer) au parent , ici un événement qui met a jour la valeur 
const emit = defineEmits(['update:chosedColor']);


// SI on récupere une valeur vià les props 
if (props.chosedColor) {
  // si tout ce passe bien, on convertit le hex en rgb puis en hsv , et on met à jour avec les valeurs dans le color picker 
  try {
    const rgb = hexToRgbObj(props.chosedColor);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    hue.value = hsv.hueVal;
    sat.value = hsv.saturation;
    val.value = hsv.luminosity;
  //sinom il y a une erreur on ignore pour l'instant 
  } catch { /* ignore */ }
}

// Valeurs des teintes 
const hue = ref(0); //teinte
const sat = ref(100); //saturation
const val = ref(100); //valeur

// Initialisation de curseur pour les manipulés 
// (Pour écouter et calculé la teinte et la couleur en fonction de sa position)
const svRef = ref(null);
const hueRef = ref(null);

const hueGradient = 'linear-gradient(to bottom, #ff0000 0%, #ffff00 16%, #00ff00 33%, #00ffff 50%, #0000ff 66%, #ff00ff 83%, #ff0000 100%)';

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

// Emit qui met à jours la valuer quand la couleur hex du colorPicker change 
// On surveille la valeur hex dés qu'elle change , on envoie un événement au parent qui transmet la nouvelle valeur 
watch(hex, (newValueColor) => emit('update:chosedColor', newValueColor));

// Fonction pour définir une gradutation max et min au valeurs des couleurs 
function clamp(graduation, minGraduation, MaxGraduation) { return Math.max(minGraduation, Math.min(MaxGraduation, graduation)); }

// Conversions----------------------------------------//

// Fonction pour convertir la valeur Hex en valeur rgb
function hexToRgbObj(hex) {
  //on supprime les symbole # et les espace pour avoir seulement la valeur "ex:FF0033"
  const hexSymbol = hex.replace('#','');
  // variable qui récupere les 2 premiers caractéres et les convertit en base 16, 
  // parseInt convertie la chaine en nombre (sur base 16), 
  // le substring récupere la chaine de caratere hexSymbol et permet de 
  // renvoyer un sous chaine par rapport a un debut et une faint (0,2)
  //
  const red = parseInt(hexSymbol.substring(0,2),16);
  const green = parseInt(hexSymbol.substring(2,4),16);
  const blue = parseInt(hexSymbol.substring(4,6),16);
  return { red, green, blue };
}
// Fonctionpour convertir les valeurs RGB en HSV
function rgbToHsv(red,green,blue) {
  // On divise les valeurs RGB par 255 pour avoir les valeurs entre 0 et 1
  red /= 255; green /= 255; blue /= 255;
  // variables qui trouve la valeur max et min parmis les 3 paramétres
  const max = Math.max(red,green,blue), min = Math.min(red,green,blue);
  // calcule la différence entre le min et le max, pour avoir la pureté de la couleur (écart entre la teinte dominante et les autres )
  const dominantColor = max - min;
  // On initialise la teinte
  let hueVal = 0;
  if (dominantColor === 0) hueVal = 0;
  //Sinom si la valeur et rouge et la plus grande, la teinte seras égale à green moins blue, diviser pas la la teinte dominante le tout modulo 6,
  // (calcule la position de la teinte (Hue) sur la roue des couleurs quand le rouge est la composante dominante, en mesurant combien le vert et le bleu diffèrent du rouge, puis % 6 garde la valeur dans les 6 secteurs de la roue (0 à 5))
  else if (max === red) hueVal = ((green - blue) / dominantColor) % 6;
  else if (max === green) hueVal = (blue - red) / dominantColor + 2;
  else hueVal = (red - green) / dominantColor + 4;
  // On convertie la valeur de la teinte en degrés arrondie à l'unité, en la teinte par 60 
  hueVal = Math.round(hueVal * 60);
  // Si la teintes est négatif on ajoute 360 pour quelle se repositionne dans la roue chromatique 
  if (hueVal < 0) hueVal += 360;
  // si max=0 sat=0 (noir) sinom la teinte dominante divisier par la valeur max (ce qui donne une valeur entre 0 et 1)
  const saturation = max === 0 ? 0 : dominantColor / max;
  const luminosity = max;
  // on retourne la valeur au format hsv, en ajoutant la valeur de la teinte et en convertisant la saturation et luminosité en pourcentage 
  return { hueVal, saturation: Math.round(saturation*100), luminosity: Math.round(luminosity*100) };
}
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
  const posXPointer = clamp(pointerEvent.clientX - hvBlockSize.left, 0, hvBlockSize.width);
  const posYPointer = clamp(pointerEvent.clientY - hvBlockSize.top, 0, hvBlockSize.height);
  //On convertit la position en valeur 
    // On arrondie à l'entier le résultat de 100 fois la position diviser par la taille du block,
    //  -1 sert à inverser l'axe,
    //  position / taille donne une fraction 0.1,
    //  que l'on convertit en pourcentage avec *100
  sat.value = Math.round((posXPointer / hvBlockSize.width) * 100);
  val.value = Math.round((1 - posYPointer / hvBlockSize.height) * 100);
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

//Manipulation du curseur de la barre de couleur ----------------------//
let hueCursorId = null;
//Fonction qui assigne la valeur de la couleur par rapport à la postion du cusreur dans la barre
function updateHueEvent(cursorEvent) {
  // On récupere la valeur de l'element hueRef
  const cursorElement = hueRef.value;
  // Si l'element a une valeur différentes ou n'as pas de valeur, on s'arrete la pour éviter les erreur 
  if (!cursorElement) return;
  // Sinom on récupere la taille et la position par rapport à la l'element du curseur 
  const hueBlockSize = cursorElement.getBoundingClientRect();
  // On récupere la position verticale du curseur par rapport a la hauteur de l'élément , 
  // on calcule la position Y ( vertical) 
  // moins la hauteur de mon élément 
  // pour obtenir la position du curseur par rapport à la hauteur de l'élement , 
  // compris entre 0 et la hauteur de l'élément
  const posYCursor = clamp(cursorEvent.clientY - hueBlockSize.top, 0, hueBlockSize.height);
  // On assigne le valeur de la couleur (on divise la position du curseur par la hauteur de l'élement parent pour obtenir un résultat entre 0 et 1 que l'on multiplie par 360 pour obtenir un angle de teinte en degrés Et obtenir la valeur de la couleur dans une roue chromatique)
  hue.value = Math.round((posYCursor / hueBlockSize.height) * 360);
}
// Fonction pour démarrer la gestion du curseur    
function startHue(cursorEvent) {
  // On récupere la valeur de l'element hueRef
  const cursorElement = hueRef.value;
  // Si l'element a une valeur différentes ou n'as pas de valeur, on s'arrete la pour éviter les erreur 
  if (!cursorElement) return;
  // Permet de garder le controle du curseur au clic meme si la souris sort de l'élément:   
  // //donc on capture les événement du curseur OU on présice le curseur visé ,
  // setPointerCapture permet de capturer tous les événement ( souris, doigt...) pour l'élément tant que on ne relache pas le clic 
  cursorElement.setPointerCapture?.(cursorEvent.pointerId);
  // On récupere l'élément (l'identifiant) du pointeur que l'on utilise
  hueCursorId = cursorEvent.pointerId;
  // Met à jour la valeurs de la couleur au mouvement du courseur 
  updateHueEvent(cursorEvent);
  // On ajoute un événement qui à chaque clic sur le curseur, appel la fonction qui met a jour la valeur au mouvement du curseur (on attache l'evenement à la fenetre pour reecevoir les evenements meme si le curseur sort du comopsant)
  window.addEventListener('pointermove', onHueCursorMove);
  // On ajoute un événement qui au relachement du clic, appel la fonction pour nettoyer les événments du curseur, et ce supprime aprés une seul exécution , pour éviter de saturer le stockage 
  window.addEventListener('pointerup', onHuePointerUp, { once: true });
}
//Fonction pour mettre a jour la valeur de la couleur au déplacement du curseur 
function onHueCursorMove(cursorEvent) {
  // Si l'element a une valeur différentes ou n'as pas de valeur, on s'arrete la pour éviter les erreur 
  if (cursorEvent.pointerId !== hueCursorId) return;
  // Sinom on appel la fonction qui met à jour la valeurs par rapport à la position du curseur 
  updateHueEvent(cursorEvent);
}
// Fonction qui nettoye les événement au relachement du curseur 
function onHuePointerUp(cursorEvent) {
  // Si l'element a une valeur différentes ou n'as pas de valeur, on s'arrete la pour éviter les erreur 
  if (cursorEvent.pointerId !== hueCursorId) return;
  // On réintialise la variable 
  // (null pour rendre le curseur inactif , pour pouvoir ddétecter le prochain clic)
  hueCursorId = null;
  // Et on suprime l'evenement qui met a jour la valeur au mouvement du curseur 
  // (meme si on relache en dehors de la barre de couleur grace a window)
  window.removeEventListener('pointermove', onHueCursorMove);
}
// Fonction pour manipuler le curseur au clavier (à l'appuie d'une touche)
function onHueKeydown(cursorEvent) {
  // détermine la quantité du déplacement dans la teinte (1 ou 10 avec Shift)
  const stepCursor = cursorEvent.shiftKey ? 10 : 1;
  // Si on appuie sur la fleche du haut, la valeur diminue de la quantité de déplacement 
  // (+360 évite que le résultat soit négatif, 
  // le modulo remet la valeur sans le "+360" 
  // pour s'assurer d'avoir une valeur entre 0 et 360 "dans la roue chromatique")
  if (cursorEvent.key === 'ArrowUp') hue.value = (hue.value - stepCursor + 360) % 360;
  // Sinom si on appuie sur la fleche du bas, la valeur augmente de la quantité de déplacement 
  // (+360 évite que le résultat soit négatif,
  // le modulo remet la valeur sans le "+360" 
  // pour s'assurer d'avoir une valeur entre 0 et 360 "dans la roue chromatique")
  else if (cursorEvent.key === 'ArrowDown') hue.value = (hue.value + stepCursor) % 360;
}

// Fonction Asynchrone, Pour copiée une valeur
async function copyToClipboard(text) {
  // Si tout ce passe bien , et que la fonction est terminé on continue avec l'action de copier le texte de writeTexte 
  // (grace l'api clipboard qui permet d'acceder au presse papier de l'utilisateur)
  try {
    await navigator.clipboard.writeText(text);
    // petit feedback : on pourrait afficher un toast
    // console.log('copied', text);
  //si il y a une erreur 
  } catch (err) {
    console.error('copy failed', err);
  }
}

// Nettoyage ---------------------------//

// fonction qui permet de supprimer (détruire) les événement d'écoute qui sont acroché au composant quand mon composant n'est plus utilisé (cycle de vie) 
// Sans ça :
// Même si ton composant n’est plus affiché, les pointermove continueraient à déclencher les fonctions.
// Résultat : erreurs en console, perte de performance, mémoire consommée inutilement.
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onSVPointerMove);
  window.removeEventListener('pointermove', onHueCursorMove);
});
</script>

<style scoped lang="css"></style>


