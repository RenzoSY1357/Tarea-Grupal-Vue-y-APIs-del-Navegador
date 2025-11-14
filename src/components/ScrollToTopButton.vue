<template>
      <button v-if="isVisible" @click="scrollToTop" class="scroll-to-top">
        Volver Arriba ↑
      </button>
    </template>

    <script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';

    const scrollY = ref(0);

    const isVisible = computed(() => scrollY.value > 200);

    function updateScroll() {
      scrollY.value = window.scrollY;
    }

    onMounted(() => {
      window.addEventListener('scroll', updateScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', updateScroll);
    });

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    </script>

    <style scoped>
    .scroll-to-top {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 15px;
      background-color: #42b883;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      z-index: 1000;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      transition: opacity 0.3s, transform 0.3s;
    }

    .scroll-to-top:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    </style>