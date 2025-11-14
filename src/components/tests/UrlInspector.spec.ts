import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import UrlInspector from '../UrlInspector.vue';
import { nextTick } from 'vue';

// 1. Mock de la URL
const mockUrl = 'https://www.vuejs.org:8080/guide/essentials/list.html?query=test#v-for';
const mockLocation = new URL(mockUrl);

// 2. Mock de window.location
beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      href: mockLocation.href,
      protocol: mockLocation.protocol,
      hostname: mockLocation.hostname,
      port: mockLocation.port,
      pathname: mockLocation.pathname,
      search: mockLocation.search,
    },
    writable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('UrlInspector', () => {
it('should display all parts of the mocked window.location on mount', async () => {
    const wrapper = mount(UrlInspector);
    
    // Esperamos a que onMounted() se complete y Vue renderice
    await nextTick();

    const text = wrapper.text();
    
    // 3. Comprobamos que el HTML renderizado coincide con el mock
    expect(text).toContain(mockLocation.href);
    expect(text).toContain(mockLocation.protocol);
    expect(text).toContain(mockLocation.hostname);
    expect(text).toContain(mockLocation.port);
    expect(text).toContain(mockLocation.pathname);
    expect(text).toContain(mockLocation.search);
    });
});