<script setup lang="ts">
import { computed } from 'vue';
import { isSameDay } from '@/utils/isSameday';

// 1. Interfaz de Eventos
interface CalendarEvent {
  date: Date;
  title: string;
  type: 'busy' | 'tentative' | 'holiday';
}

// 1. Props del componente
const props = defineProps<{
  year: number;
  month: number; // 0-11 (Enero=0, Diciembre=11)
  events: CalendarEvent[];
}>();

const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S']; // Empezando en Domingo

// 3. Lógica principal en una computed
const calendarGrid = computed(() => {
  const grid = [];
  
  // 3. Primer día y días totales
  const firstDayOfMonth = new Date(props.year, props.month, 1);
  const daysInMonth = new Date(props.year, props.month + 1, 0).getDate();
  
  // 3. Día de la semana del primer día (0=Domingo, 1=Lunes...)
  const firstDayWeekday = firstDayOfMonth.getDay();

  // 3. Calcula los días de relleno al principio
  for (let i = 0; i < firstDayWeekday; i++) {
    const prevMonthDate = new Date(props.year, props.month, 0); // Último día del mes anterior
    const day = prevMonthDate.getDate() - firstDayWeekday + 1 + i;
    grid.push({
      date: new Date(props.year, props.month - 1, day),
      isCurrentMonth: false,
      events: []
    });
  }

  // 3. Genera los días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(props.year, props.month, day);
    
    // 3. Asigna los eventos al día
    const eventsForDay = props.events.filter(event => isSameDay(event.date, date));
    
    grid.push({
      date: date,
      isCurrentMonth: true,
      events: eventsForDay
    });
  }

  // 3. Calcula los días de relleno al final
  const gridEndIndex = grid.length;
  const nextMonthFill = 7 - (gridEndIndex % 7);
  
  if (nextMonthFill < 7) {
    for (let i = 1; i <= nextMonthFill; i++) {
      grid.push({
        date: new Date(props.year, props.month + 1, i),
        isCurrentMonth: false,
        events: []
      });
    }
  }

  return grid;
});

</script>

<template>
  <div class="calendar-view">
    <h3>7.4: Calendario Mensual (CalendarView.vue)</h3>
    <div class="calendar-grid">
      <!-- 4. Cabecera con días de la semana -->
      <div v-for="day in dayNames" :key="day" class="day-header">
        {{ day }}
      </div>
      
      <!-- 4. Itera sobre la cuadrícula generada -->
      <div 
        v-for="(day, index) in calendarGrid" 
        :key="index"
        class="calendar-cell"
        :class="{ 'is-not-current-month': !day.isCurrentMonth }"
      >
        <!-- 4. Muestra el número del día -->
        <span class="day-number">{{ day.date.getDate() }}</span>
        
        <!-- 4. Itera sobre los eventos del día -->
        <div class="events-list">
          <div 
            v-for="(event, eIndex) in day.events"
            :key="eIndex"
            class="calendar-event"
            :class="`event-${event.type}`"
          >
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
}
.day-header {
    text-align: center;
    font-weight: bold;
    background-color: #f4f4f4;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
}
.calendar-cell {
    min-height: 100px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    padding: 5px;
    background-color: #fff;
}
.calendar-cell:nth-child(7n) {
    border-right: none;
}
.day-number {
    font-size: 0.9rem;
    font-weight: bold;
}
.is-not-current-month {
    background-color: #f9f9f9;
    color: #aaa;
}
.events-list {
    margin-top: 5px;
}
.calendar-event {
    font-size: 0.8rem;
    padding: 2px 5px;
    border-radius: 3px;
    margin-bottom: 3px;
    color: white;
}
.event-busy { background-color: #ef4444; }
.event-tentative { background-color: #f59e0b; }
.event-holiday { background-color: #22c55e; }
</style>