<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 4.1 Controles de Navegación Básicos
const goBack = () => window.history.back()
const goForward = () => window.history.forward()
const goTo = (delta: number) => window.history.go(delta)

// 4.2 Simulación de Navegación SPA con pushState
const currentState = ref(window.history.state)
const page = ref(location.pathname)

const navigate = (url: string, title: string) => {
  const state = { page: url }
  window.history.pushState(state, title, url)
  currentState.value = state
  page.value = url
}

const handlePopState = (event: PopStateEvent) => {
  currentState.value = event.state
  page.value = location.pathname
}

onMounted(() => {
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})

// 4.3 Protector de Cambios Sin Guardar
const hasUnsavedChanges = ref(false)

onMounted(() => {
  window.onbeforeunload = (event) => {
    if (hasUnsavedChanges.value) {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }
  }
})

onUnmounted(() => {
  window.onbeforeunload = null
})

// 4.4 Desplazamiento infinito con sincronización de URL
// This is a conceptual implementation. A real-world scenario would involve
// fetching more content as the user scrolls.
const items = ref(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`))
const scrollContainer = ref<HTMLElement | null>(null)

const handleScroll = () => {
  const container = scrollContainer.value
  if (container) {
    const scrollPosition = container.scrollTop + container.clientHeight
    const pageHeight = container.scrollHeight
    const currentPage = Math.floor(scrollPosition / pageHeight * 3) + 1 // Example logic

    if (scrollPosition >= pageHeight - 10) {
      // Load more items
      const currentLength = items.value.length
      for (let i = 0; i < 10; i++) {
        items.value.push(`Item ${currentLength + i + 1}`)
      }
    }
    
    const newUrl = `/page/${currentPage}`
    if (location.pathname !== newUrl) {
      window.history.replaceState({ page: currentPage }, `Page ${currentPage}`, newUrl)
      page.value = newUrl
    }
  }
}

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="history-container">
    <h4>4.1 Controles de Navegación Básicos</h4>
    <button @click="goBack">Atrás</button>
    <button @click="goForward">Adelante</button>
    <button @click="goTo(-2)">Ir 2 atrás</button>

    <h4>4.2 Simulación de Navegación SPA</h4>
    <p>Página Actual: {{ page }}</p>
    <button @click="navigate('/home', 'Home')">Ir a Home</button>
    <button @click="navigate('/about', 'About')">Ir a About</button>
    <p>Estado actual: <code>{{ currentState }}</code></p>

    <h4>4.3 Protector de Cambios Sin Guardar</h4>
    <label>
      <input type="checkbox" v-model="hasUnsavedChanges" />
      Hay cambios sin guardar
    </label>
    <p v-if="hasUnsavedChanges" class="warning">
      Intenta recargar la página. Se te advertirá antes de salir.
    </p>

    <h4>4.4 Desplazamiento Infinito con Sincronización de URL</h4>
    <div ref="scrollContainer" class="scroll-container">
      <ul>
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ul>
    </div>
    <p>URL actual: {{ page }}</p>
  </div>
</template>

<style scoped>
.history-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
button {
  margin-right: 0.5rem;
}
.warning {
  color: #f39c12;
}
.scroll-container {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 1rem;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
li {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
</style>
