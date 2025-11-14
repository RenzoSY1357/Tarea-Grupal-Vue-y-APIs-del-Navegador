<template>
      <div class="window-size-display">
        Ancho: {{ width }}px - Alto: {{ height }}px
      </div>
    </template>

    <script setup lang="ts">
    import { useWindowSize } from '../composables/useWindowsSize';

    const { width, height } = useWindowSize();
    </script>

    <style scoped>
    .window-size-display {
      position: fixed;
      top: 10px;
      left: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-family: monospace;
      z-index: 1001;
    }
    </style>