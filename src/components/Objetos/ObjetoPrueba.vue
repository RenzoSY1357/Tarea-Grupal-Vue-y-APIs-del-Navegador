<script setup lang="ts">
  import { ref, computed } from 'vue'

  //Trabajar con objetos String
  const inputText = ref('Hola Mundo')
  const resultado = computed(()=>{
    return {
      longitud: inputText.value.length,
      mayusculas: inputText.value.toUpperCase(),
      minusculas: inputText.value.toLowerCase(),
      caracteres: inputText.value.split('')
    }
  })
</script>

<template>
  <div class="exercise-demo">
    <h4>Objeto String - Metodos basicos</h4>

    <div class="input-group">
      <label for="text-input">Ingresa un texto:</label>
      <input
        id="text"
        v-model="inputText"
        type="text"
        placeholder="Escribe algo..."
        >
    </div>

    <div class="results">
      <div class="result-item">
        <strong>Longitud:</strong> {{ resultado.longitud }}
      </div>
      <div class="result-item">
        <strong>Mayusculas:</strong> {{ resultado.mayusculas }}
      </div>
      <div class="result-item">
        <strong>Minusculas:</strong> {{ resultado.minusculas }}
      </div>
      <div class="result-item">
        <strong>Array de caracteres</strong>
        <code>{{resultado.caracteres}}</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .exercise-demo {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 6px;
  }

  h4 {
    color: #667eea;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .input-group {
    margin-bottom: 1.5rem;
  }

  .input-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }

  input-group input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input-group input:focus{
    outline: none;
    border-color: #667eea;
  }

  .results {
    background: white;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }

  .result-item {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f7fafc;
  }

  .result-item:last-child {
    border-bottom: none;
  }

  .result-item strong {
    color: #2d3748;
    margin-right: 0.5rem;
  }

  code {
    background: #edf2f7;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
  }
</style>