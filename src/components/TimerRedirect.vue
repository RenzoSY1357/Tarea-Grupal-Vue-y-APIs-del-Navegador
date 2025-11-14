<script setup lang="ts">
import { ref, onMounted } from 'vue';

const seconds = ref(5);
const targetUrl = ref('/confirmacion-compra'); // Página de ejemplo

onMounted(() => {
  const interval = setInterval(() => {
    seconds.value--;
    if (seconds.value <= 0) {
      clearInterval(interval);
      console.log(`Redirigiendo a ${targetUrl.value}...`);
      // window.location.assign(targetUrl.value); // Descomentar para activar
    }
  }, 1000);
});
</script>

<template>
  <div class="timer-redirect">
    <h3>Extra 2.2: Redirección con Timer</h3>
    <p>
      Redirigiendo a <strong>{{ targetUrl }}</strong> en {{ seconds }} segundos...
    </p>
    <p>(La redirección real está comentada).</p>
  </div>
</template>

<style scoped>
.timer-redirect {
background-color: #e3f2fd;
border: 1px solid #90caf9;
border-radius: 8px;
padding: 1rem;
}
</style>