<script setup lang="ts">
import { ref, computed } from 'vue';

// 1. Define un ref para la ventana, tipado correctamente
const popupWindow = ref<Window | null>(null);

// 3. Propiedad computed para saber si la ventana está abierta
const isPopupOpen = computed(() => {
  // Comprueba si tenemos una referencia Y si esa ventana no ha sido cerrada por el usuario
  return popupWindow.value !== null && !popupWindow.value?.closed;
});

// 2. Método para abrir el popup
const openPopup = () => {
  // Asegurarse de que no abrimos más de una
  if (isPopupOpen.value) {
    return;
  }

  const popup = window.open(
    'https://vuejs.org/guide/introduction.html', // URL de prueba
    '_blank',
    'width=600,height=400'
  );

  // 2. Controlar si el navegador bloquea el popup
  if (popup) {
    popupWindow.value = popup;
  } else {
    // El test 6.1.3 (Bloqueo) espera que el componente maneje esto
    // (en este caso, simplemente no asignando el popup, el computed isPopupOpen dará false)
    console.warn('El navegador ha bloqueado la ventana emergente.');
  }
};

// 3. Método para cerrar el popup
const closePopup = () => {
  if (isPopupOpen.value) {
    popupWindow.value?.close(); // Cierra la ventana
    popupWindow.value = null; // Limpia la referencia
  }
};
</script>

<template>
  <div class="popup-manager">
    <h3>6.1: Gestor de Ventanas Emergentes (PopupWindowManager.vue)</h3>
    <p>Controla una ventana emergente (pop-up) desde Vue.</p>
    
    <!-- 3. Mostrar botones condicionalmente -->
    <button v-if="!isPopupOpen" @click="openPopup">
      Abrir Pop-up (a Vuejs.org)
    </button>
    <button v-if="isPopupOpen" @click="closePopup" class="btn-close">
      Cerrar Pop-up
    </button>
  </div>
</template>

<style scoped>
.popup-manager {
background-color: #f5f5f5;
border-radius: 8px;
padding: 1rem;
}
button {
padding: 10px 15px;
cursor: pointer;
border: none;
border-radius: 5px;
font-weight: bold;
}
.btn-close {
background-color: #e57373;
color: white;
}
</style>

<!--
---
EJERCICIO 6.2: COMANDOS PARA LA CONSOLA JS
---

1. Modifica el título de la página
document.title = "¡He cambiado este título!";

2. Muestra el texto del elemento H1
(En nuestro proyecto, mostrará: "Proyecto Vue, composition API y Ts")
console.log( document.querySelector('h1').textContent );

3. Modifica el contenido de un párrafo (que quieras)
(Esto cambiará el párrafo de "Renzo y Fabricio")
document.querySelector('p.nombres').textContent = "Párrafo modificado por JS.";

4. Modifica el contenido de un elemento concreto
(Usaremos el h1 que ya encontramos)
document.querySelector('h1').innerHTML = "¡<em>Hackeado</em>!";

5. Di cuántos enlaces tiene la página
console.log( `Número de enlaces: ${document.querySelectorAll('a').length}` );

6. Modifica uno de los enlaces de la página
(Como no tenemos, dará error, pero el comando es correcto)
document.querySelector('a').href = "https://vuejs.org";

7. Cambia una de las imágenes de la página
(Como no tenemos <img>, dará error, pero el comando es correcto)
document.querySelector('img').src = "https://vuejs.org/images/logo.png";

8. Cambia el color del texto de un elemento concreto
document.querySelector('h1').style.color = "red";

9. Añade una regla css a uno de los elementos vía atributo style
document.querySelector('h1').style.border = "2px solid blue";
document.querySelector('h1').style.padding = "10px";
document.querySelector('h1').style.backgroundColor = "yellow";

10. Di cuantas palabra hay en un párrafo concreto
const textoFooter = document.querySelector('.app-footer p').textContent;
const palabras = textoFooter.trim().split(' ').length;
console.log( `El párrafo del footer tiene ${palabras} palabras.` );

-->