<script setup lang="ts">
import { ref, onMounted } from 'vue';

const detectedLang = ref('ninguno');

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');

  if (lang === 'es') {
    detectedLang.value = 'Español (redirigiendo a /lang-es.html)';
    // window.location.assign('/lang-es.html'); // Descomentar para activar
  } else if (lang === 'en') {
    detectedLang.value = 'Inglés (redirigiendo a /lang-en.html)';
    // window.location.assign('/lang-en.html'); // Descomentar para activar
  } else {
    detectedLang.value = 'Idioma no especificado (no se redirige).';
  }
});
</script>

<template>
  <div class="lang-redirect">
    <h3>Extra 2.4: Redirección por Idioma</h3>
    <p>
      Intenta añadir <strong>?lang=es</strong> o <strong>?lang=en</strong> a la URL de esta página y recarga.
    </p>
    <p>Idioma detectado: <strong>{{ detectedLang }}</strong></p>
    <p>(Las redirecciones reales están comentadas).</p>
  </div>
</template>

<style scoped>
.lang-redirect {
background-color: #e8f5e9;
border: 1px solid #a5d6a7;
border-radius: 8px;
padding: 1rem;
}
</style>