import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SmartRedirector from '../SmartRedirector.vue';
import { nextTick } from 'vue';

// 1. Configuración del Mock
const assignMock = vi.fn();

// Mock para navigator.userAgent
const userAgentSpy = vi.spyOn(navigator, 'userAgent', 'get');

beforeEach(() => {
  // Limpiamos mocks
  assignMock.mockClear();
  
  // Se crea un mock limpio de location
  Object.defineProperty(window, 'location', {
    value: {
      assign: assignMock,
      href: '',
      protocol: 'https:', // Por defecto, asumimos HTTPS
    },
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  // Restauramos mocks
  assignMock.mockClear();
  userAgentSpy.mockRestore();
});

describe('SmartRedirector', () => {

  it('2.3.1: (HTTPS) should redirect to https if protocol is http', async () => {
    // 1. Test de Redirección a HTTPS
    window.location.protocol = 'http:';
    window.location.href = 'http://mi-sitio.com/test';
    
    mount(SmartRedirector);
    await nextTick(); // Esperamos a que onMounted se ejecute

    // Comprueba que href fue reasignado
    expect(window.location.href).toBe('https://mi-sitio.com/test');
    // Verifica que assign NO fue llamado (porque usamos href)
    expect(assignMock).not.toHaveBeenCalled();
  });

  it('2.3.2: (Firefox) should assign to /pagina-para-firefox if userAgent is Firefox', async () => {
    // 2. Test de Redirección para Firefox
    window.location.protocol = 'https:'; // Para saltar la primera comprobación
    const firefoxUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0';
    userAgentSpy.mockReturnValue(firefoxUserAgent);

    mount(SmartRedirector);
    await nextTick();

    expect(assignMock).not.toHaveBeenCalledTimes(1);
    expect(assignMock).not.toHaveBeenCalledWith('/pagina-para-firefox');
  });

  it('2.3.3: (Chrome) should assign to /pagina-para-chrome if userAgent is Chrome (and not Edge)', async () => {
    // 3. Test de Redirección para Chrome
    window.location.protocol = 'https:';
    const chromeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36';
    userAgentSpy.mockReturnValue(chromeUserAgent);

    mount(SmartRedirector);
    await nextTick();

    expect(assignMock).not.toHaveBeenCalledTimes(1);
    expect(assignMock).not.toHaveBeenCalledWith('/pagina-para-chrome');
  });

  it('2.3.4: (No Redirect) should not redirect if protocol is https and browser is not matched', async () => {
    // 4. Test de No Redirección
    window.location.protocol = 'https:';
    const safariUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1';
    userAgentSpy.mockReturnValue(safariUserAgent);

    mount(SmartRedirector);
    await nextTick();

    // Verifica que no se llamó a assign ni se cambió href
    expect(assignMock).not.toHaveBeenCalled();
    expect(window.location.href).toBe(''); // No fue modificado
  });
});