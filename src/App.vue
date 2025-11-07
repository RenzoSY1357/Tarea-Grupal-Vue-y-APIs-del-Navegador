<script setup lang="ts">
  import { ref } from 'vue';
  import Objetos from './components/CartaObjetos.vue';
  import ObjetoNavigator from './components/Objetos/ObjetoNavigator.vue';
  import ObjetoHistory from './components/Objetos/ObjetoHistory.vue';
  import ObjetoDocument from './components/Objetos/ObjetoDocument.vue';

  const titulo = ref('Proyecto Vue, composition API y Ts')
  const nombres = ref('Renzo y Fabricio')
</script>

<template>
  <div class="app-contenedor">
    <!-- header -->
    <header class="app-header">
      <h1>{{titulo}}</h1>
      <p class="nombres">{{nombres}}</p>
    </header>

    <!-- main -->
    <main class="ejercicios">
      <section class="Componentes">

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
    </main>

    <!-- footer -->
    <footer class="app-footer">
      <p> Modelo de objetos predefinidos en JS 2025-26</p>
    </footer>
  </div>
</template>

<style scoped>

  /*<header> */
  .app-contenedor {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column
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
  /*<header/> */


  /*<main> */
  .ejercicios {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%
  }
    .componentes {
      background-color: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
    }
  /*<main/> */

  /*<footer> */
  .app-footer {
      background: #2c3e50;
      color: white;
      padding: 1rem;
      text-align: center;
      margin-top: auto;
  }
  /*<footer/> */

</style>
