<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  if (window.location.protocol === 'http:') {
    console.log('Redirigiendo a HTTPS...');
    window.location.href = window.location.href.replace('http://', 'https://');
    return;
  }

  const userAgent = navigator.userAgent;
  
  // Esta es la lógica para el test
  if (userAgent.includes('Firefox')) {
    console.log('Navegador Firefox detectado. Redirigiendo...');
    window.location.assign('/pagina-para-firefox'); // El test espera esta llamada
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    console.log('Navegador Chrome detectado. Redirigiendo...');
    window.location.assign('/pagina-para-chrome'); // El test espera esta llamada
  }
});
</script>

<template>
  <div class="smart-redirector">
    <h3>2.3: Redirección Inteligente (SmartRedirector.vue)</h3>
    <p>Comprobando entorno (mira la consola)...</p>
  </div>
</template>

<style scoped>
.smart-redirector {
  background-color: #fff8e1;
  border: 1px solid #ffe57f;
  border-radius: 8px;
  padding: 1rem;
}
</style>