import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PopupWindowManager from '../PopupWindowManager.vue';
import { nextTick } from 'vue'; // <-- Importamos nextTick

// 1. Mock de window.open
const openSpy = vi.spyOn(window, 'open');

// 2. Mock del objeto "ventana" falso
const mockPopup = {
  closed: false,      // Simula que la ventana está abierta
  close: vi.fn(() => { mockPopup.closed = true; }),   // Simula la función para cerrarla
};

beforeEach(() => {
  // Limpiamos los mocks antes de cada test
  vi.clearAllMocks();
  mockPopup.closed = false; // Reset closed state
  // Por defecto, simulamos que window.open funciona
  openSpy.mockReturnValue(mockPopup as any); 
});

afterEach(() => {
  // Reset mock state but keep spy active
  mockPopup.closed = false;
});


describe('PopupWindowManager', () => {

  it('6.1.1 (Éxito): abre un popup y muestra el botón de cerrar', async () => {
    const wrapper = mount(PopupWindowManager);

    // Estado inicial: solo se ve el botón de abrir
    expect(wrapper.find('button.btn-close').exists()).toBe(false);

    // 1. Simula clic en "Abrir"
    await wrapper.find('button').trigger('click');
    await nextTick(); // <-- AÑADIDO: Esperamos que Vue actualice el DOM

    // 2. Verifica que window.open fue llamado
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(
      'https://vuejs.org/guide/introduction.html',
      '_blank',
      'width=600,height=400'
    );

    // 3. Verifica que ahora se muestra el botón "Cerrar"
    expect(wrapper.find('button.btn-close').exists()).toBe(true);
  });

  it('6.1.2 (Éxito): cierra el popup cuando se hace clic', async () => {
    const wrapper = mount(PopupWindowManager);

    // 1. Abrimos el popup
    await wrapper.find('button').trigger('click');
    await nextTick(); // <-- AÑADIDO: Esperamos que Vue actualice el DOM
    expect(wrapper.find('button.btn-close').exists()).toBe(true); // Confirmamos que está abierto

    // 2. Simula clic en "Cerrar"
    await wrapper.find('button.btn-close').trigger('click');
    await nextTick(); // <-- AÑADIDO: Esperamos que Vue actualice el DOM

    // 3. Verifica que el método .close() de la ventana falsa fue llamado
    expect(mockPopup.close).toHaveBeenCalledTimes(1);

    // 4. Verifica que el botón "Cerrar" desaparece y "Abrir" vuelve
    expect(wrapper.find('button.btn-close').exists()).toBe(false);
    expect(wrapper.find('button').text()).toContain('Abrir Pop-up');
  });

  it('6.1.3 (Bloqueo): maneja el caso en que window.open es bloqueado', async () => {
    // 1. Simulamos que el navegador bloquea el popup
    openSpy.mockReturnValue(null);

    const wrapper = mount(PopupWindowManager);

    // 2. Simula clic en "Abrir"
    await wrapper.find('button').trigger('click');
    await nextTick(); // <-- AÑADIDO: Esperamos que Vue actualice el DOM

    // 3. Verifica que window.open fue llamado
    expect(openSpy).toHaveBeenCalledTimes(1);

    // 4. Verifica que el botón "Cerrar" NO aparece
    expect(wrapper.find('button.btn-close').exists()).toBe(false);
    // 5. El botón "Abrir" sigue estando visible
    expect(wrapper.find('button').text()).toContain('Abrir Pop-up');
  });
});