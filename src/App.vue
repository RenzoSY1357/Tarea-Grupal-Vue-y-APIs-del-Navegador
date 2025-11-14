<script setup lang="ts">
import { ref } from 'vue';
import Objetos from './components/Objetos/CartaObjetos.vue'; 
import ObjetoNavigator from './components/Objetos/ObjetoNavigator.vue';
import ObjetoHistory from './components/Objetos/ObjetoHistory.vue';
import ObjetoDocument from './components/Objetos/ObjetoDocument.vue';

import ScrollProgressBar from './components/ScrollProgressBar.vue';
import ScrollToTopButton from './components/ScrollToTopButton.vue';
import WindowSizeDisplay from './components/WindowSizeDisplay.vue';

import UrlInspector from './components/UrlInspector.vue';
import NavigationTools from './components/NavigationTools.vue';
import SmartRedirector from './components/SmartRedirector.vue';
import TimerRedirect from './components/TimerRedirect.vue';
import LangRedirect from './components/LangRedirect.vue';

import PopupWindowManager from './components/PopupWindowManager.vue';

import SearchFilter from './components/SearchFilter.vue';
import ProductPrice from './components/ProductPrice.vue';
import CountdownTimer from './components/CountdownTimer.vue';
import CalendarView from './components/CalendarView.vue';
import ProductManager from './components/ProductManager.vue';

const titulo = ref('Proyecto Vue, composition API y Ts')
const nombres = ref('Renzo y Fabricio')

// --- Mock Data para Ejercicio 7 ---

// 7.1 SearchFilter
const searchItems = ref([
  { id: 1, name: 'Introducción a Vue.js' },
  { id: 2, name: 'Guía de Componentes en Vue' },
  { id: 3, name: 'Reactividad a fondo' },
  { id: 4, name: 'Aprendiendo Vitest' },
  { id: 5, name: 'State Management con Pinia' },
]);

// 7.3 CountdownTimer (pon una fecha 2 minutos en el futuro)
const futureDate = new Date(Date.now() + 2 * 60 * 1000);

// 7.4 CalendarView (Eventos para este mes)
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth(); // 0-11
const calendarEvents = ref([
  { date: new Date(currentYear, currentMonth, 1), title: 'Inicio de Mes', type: 'holiday' as const },
  { date: new Date(currentYear, currentMonth, 15), title: 'Reunión', type: 'tentative' as const },
  { date: new Date(currentYear, currentMonth, 15), title: 'Entrega Práctica', type: 'busy' as const },
  { date: new Date(currentYear, currentMonth, 25), title: 'Día Libre', type: 'holiday' as const },
]);

// 7.5 ProductManager
const productos = ref([
 { nombre: 'Camiseta', precio: 20, cantidad: 10, categoria: 'Ropa', fechaDeIngreso: '2024-11-01' },
 { nombre: 'Pantalones', precio: 50, cantidad: 0, categoria: 'Ropa', fechaDeIngreso: '2024-10-15' },
 { nombre: 'Zapatos', precio: 30, cantidad: 5, categoria: 'Calzado', fechaDeIngreso: '2024-11-10' },
 { nombre: 'Sombrero', precio: 15, cantidad: 20, categoria: 'Accesorios', fechaDeIngreso: '2024-11-05' },
 { nombre: 'Chaqueta', precio: 80, cantidad: 7, categoria: 'Ropa', fechaDeIngreso: '2024-11-11' },
 { nombre: 'Guantes', precio: 25, cantidad: 15, categoria: 'Accesorios', fechaDeIngreso: '2024-10-20' },
 { nombre: 'Bufanda', precio: 18, cantidad: 12, categoria: 'Accesorios', fechaDeIngreso: '2024-11-09' },
 { nombre: 'Gafas de sol', precio: 45, cantidad: 9, categoria: 'Accesorios', fechaDeIngreso: '2024-10-31' },
 { nombre: 'Reloj', precio: 120, cantidad: 3, categoria: 'Accesorios', fechaDeIngreso: '2024-11-03' },
 { nombre: 'Bolso', precio: 60, cantidad: 6, categoria: 'Accesorios', fechaDeIngreso: '2024-10-25' },
 { nombre: 'Cinturón', precio: 22, cantidad: 13, categoria: 'Accesorios', fechaDeIngreso: '2024-11-08' },
 { nombre: 'Vestido', precio: 70, cantidad: 4, categoria: 'Ropa', fechaDeIngreso: '2024-11-12' },
 { nombre: 'Falda', precio: 35, cantidad: 11, categoria: 'Ropa', fechaDeIngreso: '2024-10-18' },
 { nombre: 'Calcetines', precio: 8, cantidad: 30, categoria: 'Ropa', fechaDeIngreso: '2024-11-02' },
 { nombre: 'Pañuelo', precio: 12, cantidad: 25, categoria: 'Accesorios', fechaDeIngreso: '2024-11-07' },
 { nombre: 'Camiseta sin mangas', precio: 15, cantidad: 14, categoria: 'Ropa', fechaDeIngreso: '2024-10-22' },
 { nombre: 'Pantalones cortos', precio: 40, cantidad: 8, categoria: 'Ropa', fechaDeIngreso: '2024-10-30' },
 { nombre: 'Botas', precio: 90, cantidad: 5, categoria: 'Calzado', fechaDeIngreso: '2024-11-06' },
 { nombre: 'Sandalias', precio: 28, cantidad: 18, categoria: 'Calzado', fechaDeIngreso: '2024-10-27' },
 { nombre: 'Zapatos deportivos', precio: 65, cantidad: 7, categoria: 'Calzado', fechaDeIngreso: '2024-11-13' }
]);
</script>

<template>
  <div class="app-contenedor">

    <ScrollProgressBar />
    <WindowSizeDisplay />
    <ScrollToTopButton />

  _ <header class="app-header">
      <h1>{{titulo}}</h1>
      <p class="nombres">{{nombres}}</p>
    </header>

    <!-- main -->
    <main class="ejercicios">
      <section class="Componentes">

        <!-- EJERCICIO 7 -->
        <h2>Ejercicio 7: Objetos Nativos (String, Intl, Date, Array)</h2>
        <SearchFilter :items="searchItems" />
        <br>
        <CountdownTimer :target-date="futureDate" />
        <br>
        <div class="price-demo">
          <h4>7.2: Formateador de Divisas (ProductPrice.vue)</h4>
          <ProductPrice :price="12345.67" locale="en-US" currency-code="USD" />
          <ProductPrice :price="12345.67" locale="de-DE" currency-code="EUR" />
          <ProductPrice :price="5000" locale="ja-JP" currency-code="JPY" />
        </div>
        <br>
        <CalendarView :year="currentYear" :month="currentMonth" :events="calendarEvents" />
        <br>
        <ProductManager :productos="productos" />
        <hr style="margin: 2rem 0;">

        <!-- EJERCICIO 6 -->
        <h2>Ejercicio 6: Gestión de Ventanas</h2>
        <PopupWindowManager />
        <hr style="margin: 2rem 0;">
        
        <!-- EJERCICIO 2 -->
        <h2>Ejercicio 2: Objeto Location</h2>
        <UrlInspector />
        <br>
        <NavigationTools />
        <br>
        
        <!-- 
          EJERCICIOS DE REDIRECCIÓN (Descomentar para probarlos) 
        -->
        <!-- <SmartRedirector /> -->
        <!-- <TimerRedirect /> -->
        <!-- <LangRedirect /> -->
        
        <hr style="margin: 2rem 0;">

        <Objetos :number="3" title="Objeto navigator">
          <ObjetoNavigator />
        </Objetos>

        <Objetos :number="4" title="Objeto history">
          <ObjetoHistory />
        </Objetos>

        <Objetos :number="5" title="Objeto document">
          <ObjetoDocument />
        </Objetos>
      </section>
      
      <!-- Relleno para Ejercicio 1 -->
      <div class="filler-content">
        <p>Contenido de relleno para probar el scroll.</p>
        <p>...</p>
        <p>¡Final del contenido de relleno!</p>
      </div>

    </main>

    <!-- footer -->
    <footer class="app-footer">
      <p> Modelo de objetos predefinidos en JS 2025-26</p>
    </footer>
  </div>
</template>

<!-- Estilos -->
<style scoped>
/*<header> */
.app-contenedor {
min-height: 100vh;
min-width: 100vw;
display: flex;
flex-direction: column;
}
.app-header {
background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 2rem;
text-align: center;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.app-header h1{
margin: 0;
font-size: 2rem;
font-weight: 600;
}
.nombres {
margin: 0.5rem 0 0 0;
font-size: 1.1rem;
opacity: 0.9;
}
/*<main> */
.ejercicios {
flex: 1;
max-width: 1200px;
margin: 0 auto;
padding: 2rem;
width: 100%;
}
.componentes {
background-color: white;
border-radius: 8px;
padding: 2rem;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
}
/*<footer> */
.app-footer {
background: #2c3e50;
color: white;
padding: 1rem;
text-align: center;
margin-top: auto;
}

/* Estilos para 7.2 ProductPrice */
.price-demo {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
}
.price-demo h4 {
  margin-top: 0;
}
.price-demo span {
  margin-right: 1.5rem;
}
</style>

<style>
/* Estilos globales */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  height: 4000px;
  background-color: #f4f4f4;
}
.filler-content {
  margin-top: 50px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.filler-content p {
font-size: 1.1rem;
line-height: 1.6;
padding-bottom: 200px;
}
</style>