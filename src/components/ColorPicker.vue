<template>
  <section class="card bg-base-100 w-full p-4 rounded-none">
    <div class="flex flex-row gap-4">

      <!-- Zone saturation / luminosité -->
      <div ref="svRef" class="relative overflow-hidden w-full aspect-[4/3] rounded-xl shadow-inner"
        style="touch-action: none" role="slider" tabindex="0"
        :aria-label="`Sélecteur saturation / luminosité : saturation ${sat}% et luminosité ${val}%`" :aria-valuemin="0"
        :aria-valuemax="100" :aria-valuenow="sat" @pointerdown.prevent="startSvPointer" @keydown="onSVKeydown">
        <div class="absolute inset-0 rounded-xl" :style="{ backgroundColor: hexAtFull }"></div>

        <div class="absolute inset-0 rounded-xl"
          style="background: linear-gradient(to right, #fff, rgba(255,255,255,0))"></div>

        <div class="absolute inset-0 rounded-xl" style="background: linear-gradient(to bottom, rgba(0,0,0,0), #000)">
        </div>

        <div class="absolute w-4 h-4 rounded-full ring-2 ring-base-100 shadow-md -translate-x-1/2 -translate-y-1/2"
          :style="svCursorStyle" aria-hidden="true"></div>
      </div>

      <!-- Barre de teinte -->
      <div ref="hueRef" class="relative w-12 rounded-full overflow-hidden" style="touch-action: none" role="slider"
        tabindex="0" :style="{ background: hueGradient }" :aria-label="`Curseur de teinte : ${Math.round(hue)}°`"
        :aria-valuemin="0" :aria-valuemax="360" :aria-valuenow="Math.round(hue)" @pointerdown.prevent="startHuePointer"
        @keydown="onHueKeydown">
        <div class="absolute left-0 right-0 h-0.5 bg-base-100" :style="hueCursorStyle"></div>
      </div>

      <!-- Bloc valeurs -->
      <div class="card bg-base-300 w-2/3 p-3">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl shadow-inner" :style="{ backgroundColor: hex }" aria-hidden="true"></div>

          <div class="flex-1">
            <h3 class="font-medium">Valeurs</h3>
            <div class="text-sm text-muted">{{ hex }}</div>
          </div>
        </div>

        <div class="mt-3 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 w-full md:gap-8 p-2">
          <div v-for="item in colorValues" :key="item.label"
            class="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div class="text-xs font-medium">{{ item.label }}</div>
            <button class="btn btn-soft btn-sm text-left md:text-center" @click="copyToClipboard(item.value)">
              {{ item.value }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="js">
import { ref, computed, watch, onBeforeUnmount } from 'vue'

// Props / Emit
const props = defineProps({
  chosedColor: {
    type: String,
    default: '#FF0000'
  }
})

const emit = defineEmits(['update:chosedColor'])

// Valeurs HSV
const hue = ref(0)
const sat = ref(100)
const val = ref(100)

// Références DOM
const svRef = ref(null)
const hueRef = ref(null)

// Gradient de la barre de teinte
const hueGradient =
  'linear-gradient(to bottom, #ff0000 0%, #ffff00 16%, #00ff00 33%, #00ffff 50%, #0000ff 66%, #ff00ff 83%, #ff0000 100%)'

// --------------------
// Computed
// --------------------

const rgbObj = computed(() => {
  return hsvToRgb(hue.value, sat.value, val.value)
})

const hex = computed(() => {
  return rgbToHex(rgbObj.value)
})

const hexAtFull = computed(() => {
  return rgbToHex(hsvToRgb(hue.value, 100, 100))
})

const rgbString = computed(() => {
  return `rgb(${rgbObj.value.red}, ${rgbObj.value.green}, ${rgbObj.value.blue})`
})

const cmykString = computed(() => {
  const cmyk = rgbToCmyk(rgbObj.value.red, rgbObj.value.green, rgbObj.value.blue)
  return `cmyk(${cmyk.cyan}%, ${cmyk.magenta}%, ${cmyk.yellow}%, ${cmyk.key}%)`
})

const colorValues = computed(() => [
  { label: 'HEX', value: hex.value },
  { label: 'RGB', value: rgbString.value },
  { label: 'CMJN', value: cmykString.value }
])

const svCursorStyle = computed(() => ({
  left: sat.value + '%',
  top: (100 - val.value) + '%'
}))

const hueCursorStyle = computed(() => ({
  top: (hue.value / 360 * 100) + '%',
  transform: 'translateY(-50%)'
}))

// --------------------
// Watch
// --------------------

// Quand la couleur du parent change
watch(
  () => props.chosedColor,
  (newColor) => {
    if (!newColor) return

    try {
      const rgb = hexToRgbObj(newColor)
      const hsv = rgbToHsv(rgb.red, rgb.green, rgb.blue)

      hue.value = hsv.hue
      sat.value = hsv.saturation
      val.value = hsv.value
    } catch (error) {
      console.error('Couleur invalide :', error)
    }
  },
  { immediate: true }
)

watch(hex, (newHex) => {
  emit('update:chosedColor', newHex)
})

// --------------------
// Fonctions utilitaires
// --------------------

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function hexToRgbObj(hex) {
  const cleanHex = hex.replace('#', '').trim()

  const red = parseInt(cleanHex.substring(0, 2), 16)
  const green = parseInt(cleanHex.substring(2, 4), 16)
  const blue = parseInt(cleanHex.substring(4, 6), 16)

  return { red, green, blue }
}

function rgbToHex({ red, green, blue }) {
  const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase()
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`
}

function rgbToHsv(red, green, blue) {
  red = red / 255
  green = green / 255
  blue = blue / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min

  let hue = 0

  if (delta !== 0) {
    if (max === red) {
      hue = ((green - blue) / delta) % 6
    } else if (max === green) {
      hue = (blue - red) / delta + 2
    } else {
      hue = (red - green) / delta + 4
    }
  }

  hue = Math.round(hue * 60)

  if (hue < 0) hue += 360

  const saturation = max === 0 ? 0 : Math.round((delta / max) * 100)
  const value = Math.round(max * 100)

  return { hue, saturation, value }
}

function hsvToRgb(hueColor, saturation, valueColor) {
  saturation = saturation / 100
  valueColor = valueColor / 100

  const chroma = valueColor * saturation
  const h = hueColor / 60
  const x = chroma * (1 - Math.abs((h % 2) - 1))
  const m = valueColor - chroma

  let red1 = 0
  let green1 = 0
  let blue1 = 0

  if (h >= 0 && h < 1) {
    red1 = chroma
    green1 = x
    blue1 = 0
  } else if (h < 2) {
    red1 = x
    green1 = chroma
    blue1 = 0
  } else if (h < 3) {
    red1 = 0
    green1 = chroma
    blue1 = x
  } else if (h < 4) {
    red1 = 0
    green1 = x
    blue1 = chroma
  } else if (h < 5) {
    red1 = x
    green1 = 0
    blue1 = chroma
  } else {
    red1 = chroma
    green1 = 0
    blue1 = x
  }

  return {
    red: Math.round((red1 + m) * 255),
    green: Math.round((green1 + m) * 255),
    blue: Math.round((blue1 + m) * 255)
  }
}

function rgbToCmyk(red, green, blue) {
  if (red === 0 && green === 0 && blue === 0) {
    return { cyan: 0, magenta: 0, yellow: 0, key: 100 }
  }

  red = red / 255
  green = green / 255
  blue = blue / 255

  const key = 1 - Math.max(red, green, blue)
  const cyan = (1 - red - key) / (1 - key)
  const magenta = (1 - green - key) / (1 - key)
  const yellow = (1 - blue - key) / (1 - key)

  return {
    cyan: Math.round(cyan * 100),
    magenta: Math.round(magenta * 100),
    yellow: Math.round(yellow * 100),
    key: Math.round(key * 100)
  }
}

// --------------------
// Gestion zone saturation / luminosité
// --------------------

let svPointerId = null

function startSvPointer(event) {
  const element = svRef.value
  if (!element) return

  svPointerId = event.pointerId
  element.setPointerCapture?.(event.pointerId)

  updateSV(event)

  window.addEventListener('pointermove', onSvPointerMove)
  window.addEventListener('pointerup', stopSvPointer, { once: true })
}

function onSvPointerMove(event) {
  if (event.pointerId !== svPointerId) return
  updateSV(event)
}

function stopSvPointer(event) {
  if (event.pointerId !== svPointerId) return

  svPointerId = null
  window.removeEventListener('pointermove', onSvPointerMove)
}

function updateSV(event) {
  const element = svRef.value
  if (!element) return

  const rect = element.getBoundingClientRect()

  const x = clamp(event.clientX - rect.left, 0, rect.width)
  const y = clamp(event.clientY - rect.top, 0, rect.height)

  sat.value = Math.round((x / rect.width) * 100)
  val.value = Math.round((1 - y / rect.height) * 100)
}

function onSVKeydown(event) {
  const step = event.shiftKey ? 5 : 1

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    sat.value = clamp(sat.value - step, 0, 100)
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    sat.value = clamp(sat.value + step, 0, 100)
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    val.value = clamp(val.value + step, 0, 100)
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    val.value = clamp(val.value - step, 0, 100)
  }
}

// --------------------
// Gestion barre de teinte
// --------------------

let huePointerId = null

function startHuePointer(event) {
  const element = hueRef.value
  if (!element) return

  huePointerId = event.pointerId
  element.setPointerCapture?.(event.pointerId)

  updateHue(event)

  window.addEventListener('pointermove', onHuePointerMove)
  window.addEventListener('pointerup', stopHuePointer, { once: true })
}

function onHuePointerMove(event) {
  if (event.pointerId !== huePointerId) return
  updateHue(event)
}

function stopHuePointer(event) {
  if (event.pointerId !== huePointerId) return

  huePointerId = null
  window.removeEventListener('pointermove', onHuePointerMove)
}

function updateHue(event) {
  const element = hueRef.value
  if (!element) return

  const rect = element.getBoundingClientRect()
  const y = clamp(event.clientY - rect.top, 0, rect.height)

  hue.value = Math.round((y / rect.height) * 360)
}

function onHueKeydown(event) {
  const step = event.shiftKey ? 10 : 1

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    hue.value = clamp(hue.value - step, 0, 360)
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    hue.value = clamp(hue.value + step, 0, 360)
  }
}

// --------------------
// Copie
// --------------------

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.error('Erreur lors de la copie :', error)
  }
}

// --------------------
// Nettoyage
// --------------------

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onSvPointerMove)
  window.removeEventListener('pointermove', onHuePointerMove)
})
</script>

<style scoped></style>