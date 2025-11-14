<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const scrollProgress = ref(0);

const updateScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = window.scrollY;
  
  const scrollableHeight = scrollHeight - clientHeight;
  if (scrollableHeight <= 0) {
    scrollProgress.value = 0;
  } else {
    scrollProgress.value = (scrollTop / scrollableHeight) * 100;
  }
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll);
  updateScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
});
</script>

<template>
  <div class="progress-container">
    <!-- El template ahora usa la computed property 'scrollProgress' -->
    <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
  </div>
</template>

<style scoped>
.progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #eee;
}

.progress-bar {
  height: 100%;
  background-color: #42b883;
  width: 0%;
}
</style>