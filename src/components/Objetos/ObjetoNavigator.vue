<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 3.1 Panel de Información del Navegador
const userAgent = ref(navigator.userAgent)
const language = ref(navigator.language)
const platform = ref(navigator.platform)
const cookieEnabled = ref(navigator.cookieEnabled)

// 3.2 Indicador de Estado de Conexión
const isOnline = ref(navigator.onLine)

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})

// 3.3 Radar de Amigos Cercanos (Geolocation)
const location = ref<GeolocationCoordinates | null>(null)
const locationError = ref<string | null>(null)

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.value = position.coords
        locationError.value = null
      },
      (error) => {
        locationError.value = `Error: ${error.message}`
      }
    )
  } else {
    locationError.value = 'La geolocalización no es soportada por este navegador.'
  }
}

// 3.4 Botón "Copiar al Portapapeles"
const textToCopy = ref('¡Texto copiado desde Vue!')
const copyStatus = ref('')

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(textToCopy.value)
    copyStatus.value = '¡Copiado!'
    setTimeout(() => (copyStatus.value = ''), 2000)
  } catch (err) {
    copyStatus.value = 'Error al copiar.'
  }
}
</script>

<template>
  <div class="navigator-container">
    <h4>3.1 Panel de Información del Navegador</h4>
    <ul>
      <li><strong>User Agent:</strong> {{ userAgent }}</li>
      <li><strong>Idioma:</strong> {{ language }}</li>
      <li><strong>Plataforma:</strong> {{ platform }}</li>
      <li><strong>Cookies Habilitadas:</strong> {{ cookieEnabled ? 'Sí' : 'No' }}</li>
    </ul>

    <h4>3.2 Indicador de Estado de Conexión</h4>
    <p>
      Estado de la conexión:
      <span :class="['status-indicator', { online: isOnline, offline: !isOnline }]">
        {{ isOnline ? 'En Línea' : 'Fuera de Línea' }}
      </span>
    </p>

    <h4>3.3 Radar de Amigos Cercanos (Geolocalización)</h4>
    <button @click="getLocation">Obtener Ubicación</button>
    <div v-if="location">
      <p><strong>Latitud:</strong> {{ location.latitude }}</p>
      <p><strong>Longitud:</strong> {{ location.longitude }}</p>
    </div>
    <p v-if="locationError" class="error">{{ locationError }}</p>

    <h4>3.4 Botón "Copiar al Portapapeles"</h4>
    <input v-model="textToCopy" type="text" />
    <button @click="copyToClipboard">Copiar</button>
    <p v-if="copyStatus">{{ copyStatus }}</p>
  </div>
</template>

<style scoped>
.navigator-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
.status-indicator {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: white;
  font-weight: bold;
}
.online {
  background-color: #28a745;
}
.offline {
  background-color: #dc3545;
}
.error {
  color: #dc3545;
}
button {
  margin-right: 0.5rem;
}
</style>
