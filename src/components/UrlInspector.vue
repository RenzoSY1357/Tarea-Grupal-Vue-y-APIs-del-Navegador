<script setup lang="ts">
import { reactive, onMounted } from 'vue';

// 1. Interfaz de TypeScript
interface UrlParts {
    href: string;
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
}

// 1. Objeto reactive
const parts = reactive<UrlParts>({
    href: '',
    protocol: '',
    hostname: '',
    port: '',
    pathname: '',
    search: '',
});

// 1. Asignar valores en onMounted
onMounted(() => {
    parts.href = window.location.href;
    parts.protocol = window.location.protocol;
    parts.hostname = window.location.hostname;
    parts.port = window.location.port;
    parts.pathname = window.location.pathname;
    parts.search = window.location.search;
});
</script>

<template>
  <div class="url-inspector">
    <h3>2.1: Analizador de URL (UrlInspector.vue)</h3>
    <!-- 2. Mostrar la información -->
    <dl>
      <dt>URL Completa (href)</dt>
      <dd>{{ parts.href }}</dd>

      <dt>Protocolo (protocol)</dt>
      <dd>{{ parts.protocol }}</dd>

      <dt>Dominio (hostname)</dt>
      <dd>{{ parts.hostname }}</dd>

      <dt>Puerto (port)</dt>
      <dd>{{ parts.port || '(defecto)' }}</dd>

      <dt>Ruta (pathname)</dt>
      <dd>{{ parts.pathname }}</dd>

      <dt>Parámetros (search)</dt>
      <dd>{{ parts.search || '(ninguno)' }}</dd>
    </dl>
  </div>
</template>

<style scoped>
.url-inspector {
background-color: #f9f9f9;
border-radius: 8px;
padding: 1rem;
font-family: monospace;
}
dl {
display: grid;
grid-template-columns: 200px 1fr;
gap: 5px;
}
dt {
font-weight: bold;
color: #333;
}
dd {
margin: 0;
color: #007acc;
word-break: break-all;
}
</style>