<script setup lang="ts">
import { ref, computed } from 'vue';

// 1. Definimos la interfaz para los items
interface SearchItem {
  id: number;
  name: string;
}

// 1. El componente recibe la lista de items como prop
const props = defineProps<{
  items: SearchItem[];
}>();

// 1. Ref para el v-model
const searchQuery = ref('');

// 1. Propiedad computed para los items filtrados
const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return props.items;
  }
  
  const query = searchQuery.value.toLowerCase();
  
  return props.items.filter(item => 
    item.name.toLowerCase().includes(query)
  );
});

// 1. Método para resaltar las coincidencias
const highlightMatches = (text: string): string => {
  const query = searchQuery.value;
  
  if (!query) {
    return text;
  }

  // 1. Crea una RegExp global ('g') e insensible a mayúsculas ('i')
  const regex = new RegExp(query, 'gi');
  
  // 1. Usa text.replace para envolver las coincidencias
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
};
</script>

<template>
  <div class="search-filter">
    <h3>7.1: Filtro de Búsqueda (SearchFilter.vue)</h3>
    
    <!-- 2. Input vinculado a searchQuery -->
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Buscar en la lista..."
      class="search-input"
    >
    
    <!-- 2. Lista que itera sobre filteredItems -->
    <ul class="results-list">
      <li v-for="item in filteredItems" :key="item.id">
        <!-- 2. Usa v-html para renderizar el resaltado -->
        <span v-html="highlightMatches(item.name)"></span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-filter {
background-color: #f9f9f9;
border-radius: 8px;
padding: 1rem;
}
.search-input {
width: 100%;
padding: 8px;
margin-bottom: 1rem;
  box-sizing: border-box; /* Para que el padding no rompa el ancho */
}
.results-list {
list-style: none;
padding: 0;
margin: 0;
}
.results-list li {
padding: 5px 0;
border-bottom: 1px solid #eee;
}
/* Estilo para la etiqueta <mark> que inyectamos */
:deep(mark) {
background-color: #fffb8f;
padding: 0 2px;
border-radius: 3px;
}
</style>