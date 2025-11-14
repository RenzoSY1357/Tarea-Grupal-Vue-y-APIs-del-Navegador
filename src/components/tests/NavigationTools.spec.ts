import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationTools from '../NavigationTools.vue';

// 1. Mock de reload y assign
const reloadMock = vi.fn();
const assignMock = vi.fn();

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      assign: assignMock,
      reload: reloadMock,
    },
    writable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  reloadMock.mockClear();
  assignMock.mockClear();
});

describe('NavigationTools', () => {
  it('2.2.1: calls window.location.reload() when reload button is clicked', async () => {
    const wrapper = mount(NavigationTools);
    
    // 2. Prueba del botón de recarga
    await wrapper.find('button.reload-btn').trigger('click');
    
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });

  it('2.2.2: calls window.location.assign() with default URL', async () => {
    const wrapper = mount(NavigationTools);
    
    // 3. Prueba del botón de navegación (default)
    await wrapper.find('button.go-btn').trigger('click');
    
    expect(assignMock).toHaveBeenCalledTimes(1);
    expect(assignMock).toHaveBeenCalledWith('https://vuejs.org');
  });

  it('2.2.3: (Bonus) calls window.location.assign() with updated URL', async () => {
    const wrapper = mount(NavigationTools);
    const newUrl = 'https://www.google.com';

    // 4. (Bonus) Cambia el valor del input
    await wrapper.find('input[type="text"]').setValue(newUrl);
    await wrapper.find('button.go-btn').trigger('click');
    
    expect(assignMock).toHaveBeenCalledTimes(1);
    expect(assignMock).toHaveBeenCalledWith(newUrl);
  });
});