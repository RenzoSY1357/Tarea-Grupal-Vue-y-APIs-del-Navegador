<script setup lang="ts">
  defineProps<{
    title: string
    number: number
  }>()
</script>

<template>
  <div class="exercise-card">
    <div class="exercise-header">
      <span class="exercise-number">Ejercicio {{number}}</span>
      <h3>{{title}}</h3>
    </div>
    <div class="exercise-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .exercise-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }

  .exercise-card:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }

  .exercise-header {
    background: #f7fafc;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .exercise-number {
    display: inline-block;
    background: #667eea;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-right: 0.75rem;
  }

  .exercise-header h3 {
    display: inline;
    color: #2d3748;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }

  .exercise-content {
    padding: 1.5rem;
    background: white;
  }
</style>
