import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchFilter from '../SearchFilter.vue';

// 1. Lista de items de prueba
const mockItems = [
  { id: 1, name: 'Introducción a Vue.js' },
  { id: 2, name: 'Guía de Componentes en Vue' },
  { id: 3, name: 'Reactividad a fondo' },
  { id: 4, name: 'Aprendiendo Vitest' },
];

describe('SearchFilter', () => {
  it('7.1.1 (Filtrado): filtra la lista basándose en el searchQuery', async () => {
    const wrapper = mount(SearchFilter, {
      props: { items: mockItems }
    });
    
    // Al inicio, se deben mostrar los 4 items
    expect(wrapper.findAll('li').length).toBe(4);

    // 1. Simula la escritura en el input
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Vue');

    // 2. Comprueba que el número de <li> coincide
    expect(wrapper.findAll('li').length).toBe(2);
    expect(wrapper.text()).toContain('Introducción a Vue.js');
    expect(wrapper.text()).toContain('Guía de Componentes en Vue');
    expect(wrapper.text()).not.toContain('Reactividad a fondo');
  });

  it('7.1.2 (Resaltado): resalta las coincidencias (insensible a mayúsculas)', async () => {
    const wrapper = mount(SearchFilter, {
      props: { items: mockItems }
    });

    // 1. Simula la escritura (en minúsculas)
    const input = wrapper.find('input[type="text"]');
    await input.setValue('vue');

    // 2. Comprueba el innerHTML del primer resultado
    const firstResult = wrapper.find('li');
    
    // 3. Verifica que contiene la etiqueta <mark>
    expect(firstResult.html()).toContain('Introducción a <mark>Vue</mark>.js');
  });
});