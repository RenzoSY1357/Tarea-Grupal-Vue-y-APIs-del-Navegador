import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import ScrollProgressBar from '../ScrollProgressBar.vue';

let wrapper: VueWrapper; // Define el tipo para TypeScript

/**
 * Función helper para simular de forma segura el estado del scroll en JSDOM
 */
function mockScrollProperties(scrollY: number, scrollHeight: number, clientHeight: number) {
  Object.defineProperty(window, 'scrollY', {
    value: scrollY,
    writable: true,
  });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    writable: true,
  });
  Object.defineProperty(document.documentElement, 'clientHeight', {
    value: clientHeight,
    writable: true,
  });
  
  // Dispara el evento de scroll para que el componente reaccione
  window.dispatchEvent(new Event('scroll'));
}

beforeEach(() => {
  // 1. Simula el estado inicial (arriba del todo) ANTES de montar
  mockScrollProperties(0, 2000, 500); 
  // 2. Monta el componente
  wrapper = mount(ScrollProgressBar);
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount(); // Limpia el listener del componente
  }
  vi.restoreAllMocks(); // Limpia cualquier otro mock
});

describe('ScrollProgressBar', () => {
  
  it('1.3.1: should have width 0% at the top (scrollY: 0)', async () => {
    // El 'beforeEach' ya ha simulado el scroll en 0 y montado el componente.
    // El 'onMounted' del componente llama a updateScroll().
    await nextTick(); // Espera a que Vue reaccione al 'mount' y al update inicial
    
    const bar = wrapper.find('.progress-bar');
    expect(bar.attributes('style')).toContain('width: 0%');
  });

  it('1.3.2: should have width 50% at midpoint (scrollY: 750)', async () => {
    // Simula el nuevo estado de scroll (mitad)
    mockScrollProperties(750, 2000, 500);
    await nextTick(); // Espera a que el componente reaccione al evento 'scroll'
    
    const bar = wrapper.find('.progress-bar');
    expect(bar.attributes('style')).toContain('width: 50%');
  });

  it('1.3.3: should have width 100% at the bottom (scrollY: 1500)', async () => {
    // Simula el estado final (abajo del todo)
    // El scroll máximo es scrollHeight (2000) - clientHeight (500) = 1500
    mockScrollProperties(1500, 2000, 500);
    await nextTick(); // Espera a que el componente reaccione
    
    const bar = wrapper.find('.progress-bar');
    expect(bar.attributes('style')).toContain('width: 100%');
  });
});