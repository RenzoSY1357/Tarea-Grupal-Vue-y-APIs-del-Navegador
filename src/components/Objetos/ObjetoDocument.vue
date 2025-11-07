<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 5.1 Detector de Clics Fuera de un Componente
const isClickOutside = ref(false)
const componentRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (componentRef.value && !componentRef.value.contains(event.target as Node)) {
    isClickOutside.value = true;
  } else {
    isClickOutside.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 5.2 Modo Pantalla Completa (Fullscreen)
const isFullscreen = ref(!!document.fullscreenElement)

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error al intentar entrar en pantalla completa: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<template>
  <div class="document-container">
    <h4>5.1 Detector de Clics Fuera de un Componente</h4>
    <div ref="componentRef" class="component-to-track">
      <p>Haz clic dentro o fuera de este cuadro.</p>
    </div>
    <p v-if="isClickOutside">¡Has hecho clic fuera!</p>
    <p v-else>Estás haciendo clic dentro.</p>

    <h4>5.2 Modo Pantalla Completa (Fullscreen)</h4>
    <button @click="toggleFullscreen">
      {{ isFullscreen ? 'Salir de Pantalla Completa' : 'Entrar en Pantalla Completa' }}
    </button>
  </div>
</template>

<style scoped>
.document-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.component-to-track {
  padding: 2rem;
  border: 2px dashed #667eea;
  background-color: #f0f2fe;
  text-align: center;
}
</style>
