<script setup lang="ts">
interface Props {
  number: number;
  title: string;
}

defineProps<Props>();
</script>

<template>
  <div class="carta-objetos">
    <h3>Ejercicio {{ number }}: {{ title }}</h3>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.carta-objetos {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.carta-objetos h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
}

.content {
  padding: 0;
}
</style>