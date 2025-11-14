import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWindowSize } from '@/composables/useWindowsSize';
import { nextTick, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';

// Creamos un componente "anfitrión" solo para el test
const TestComponent = defineComponent({
  template: '<div></div>',
  setup() {
    const { width, height } = useWindowSize();
    return { width, height };
  },
});

beforeEach(() => {
  // Mockeamos los valores de la ventana ANTES de cada test
  Object.defineProperty(window, 'innerWidth', { writable: true, value: 800 });
  Object.defineProperty(window, 'innerHeight', { writable: true, value: 600 });
});

describe('useWindowSize', () => {

  it('1.1.1: should initialize with correct window dimensions on mount', async () => {
    const wrapper = mount(TestComponent);
    await nextTick(); // Esperamos a que se ejecute onMounted()

    // Comprobamos los valores iniciales
    expect(wrapper.vm.width).toBe(800);
    expect(wrapper.vm.height).toBe(600);
  });

  it('1.1.2: should update dimensions reactively on window resize', async () => {
    const wrapper = mount(TestComponent);
    await nextTick(); // Esperamos a que se ejecute onMounted()

    // Comprobamos los valores iniciales
    expect(wrapper.vm.width).toBe(800);
    expect(wrapper.vm.height).toBe(600);

    // Simulamos un cambio de tamaño de la ventana
    Object.defineProperty(window, 'innerWidth', { value: 1200 });
    Object.defineProperty(window, 'innerHeight', { value: 900 });

    // Disparamos el evento manualmente
    window.dispatchEvent(new Event('resize'));
    await nextTick(); // Esperamos que el listener se ejecute

    // Comprobamos que los refs se han actualizado
    expect(wrapper.vm.width).toBe(1200);
    expect(wrapper.vm.height).toBe(900);
  });
});