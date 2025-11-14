<script setup lang="ts">
import { ref } from 'vue';

const externalUrl = ref('https://vuejs.org');

const reloadPage = () => {
  window.location.reload();
};

const goToExternalUrl = () => {
  window.location.assign(externalUrl.value);
};
</script>

<template>
  <div class="nav-tools">
    <h3>2.2: Panel de Navegación (NavigationTools.vue)</h3>
    
    <!-- Añadida class="reload-btn" -->
    <button @click="reloadPage" class="reload-btn">Recargar Página</button>
    
    <hr>

    <label for="external-url">Navegar a URL externa:</label>
    <input 
      id="external-url" 
      type="text" 
      v-model="externalUrl"
      class="url-input"
    >
    <!-- Añadida class="go-btn" -->
    <button @click="goToExternalUrl" class="go-btn">Ir</button>
  </div>
</template>

<style scoped>
.nav-tools {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
}
.url-input {
  width: 250px;
  margin: 0 10px;
  padding: 5px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
hr {
  margin: 1rem 0;
  border: 0;
  border-top: 1px solid #eee;
}
</style>