<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 1. Prop para la fecha objetivo
const props = defineProps<{
  targetDate: Date;
}>();

// 1. Refs para las unidades de tiempo
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const isFinished = ref(false);

// 2. Ref para el ID del intervalo
let timerId: number | undefined = undefined;

// 3. Método para formatear números (padStart)
const formatNumber = (num: number): string => String(num).padStart(2, '0');

// Propiedades computed para el formato
const formattedDays = computed(() => formatNumber(days.value));
const formattedHours = computed(() => formatNumber(hours.value));
const formattedMinutes = computed(() => formatNumber(minutes.value));
const formattedSeconds = computed(() => formatNumber(seconds.value));

// 2. Función principal de cálculo
const updateCountdown = () => {
  const now = new Date();
  // 2. Calcula la distancia
  const distance = props.targetDate.getTime() - now.getTime();

  // 2. Manejo de finalización
  if (distance <= 0) {
    isFinished.value = true;
    if (timerId) {
      clearInterval(timerId); // Detiene el timer
    }
    // Reseteamos a 0
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    return;
  }

  // 2. Convierte la distancia
  days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
};

// 2. Ciclo de vida (Lifecycle)
onMounted(() => {
  updateCountdown(); // Llama una vez al inicio
  timerId = setInterval(updateCountdown, 1000); // Actualiza cada segundo
});

onUnmounted(() => {
  // 2. Limpia el intervalo
  if (timerId) {
    clearInterval(timerId);
  }
});
</script>

<template>
  <div class="countdown-timer">
    <h3>7.3: Cuenta Atrás (CountdownTimer.vue)</h3>
    
    <!-- 3. Muestra la cuenta atrás -->
    <div v-if="!isFinished" class="timer-box">
      <div class="time-segment">
        <span class="number">{{ formattedDays }}</span>
        <span class="label">Días</span>
      </div>
      <div class="time-segment">
        <span class="number">{{ formattedHours }}</span>
        <span class="label">Horas</span>
      </div>
      <div class="time-segment">
        <span class="number">{{ formattedMinutes }}</span>
        <span class="label">Minutos</span>
      </div>
      <div class="time-segment">
        <span class="number">{{ formattedSeconds }}</span>
        <span class="label">Segundos</span>
      </div>
    </div>
    
    <!-- 3. Muestra el mensaje final -->
    <div v-else class="finished-message">
      ¡El evento ha comenzado!
    </div>
  </div>
</template>

<style scoped>
.countdown-timer {
background-color: #f9f9f9;
border-radius: 8px;
padding: 1rem;
}
.timer-box {
display: flex;
justify-content: center;
gap: 1rem;
text-align: center;
}
.time-segment {
background-color: #333;
color: white;
padding: 1rem;
border-radius: 5px;
min-width: 70px;
}
.number {
display: block;
font-size: 2.5rem;
font-weight: bold;
}
.label {
display: block;
font-size: 0.8rem;
text-transform: uppercase;
}
.finished-message {
font-size: 1.5rem;
font-weight: bold;
color: #42b883;
text-align: center;
padding: 1rem;
}
</style>