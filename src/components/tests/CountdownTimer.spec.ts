import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CountdownTimer from '../CountdownTimer.vue';
import { nextTick } from 'vue';

describe('CountdownTimer', () => {

  // 1. Activa los Fake Timers
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('7.3.1 (Estado Inicial): muestra el tiempo restante correcto al montar', async () => {
    // 1. Fija la "hora actual"
    const now = new Date('2025-11-20T10:00:00Z');
    vi.setSystemTime(now);
    
    // 2. Define la fecha objetivo
    const target = new Date('2025-11-21T12:30:30Z'); // 1 día, 2h, 30m, 30s
    
    const wrapper = mount(CountdownTimer, {
      props: { targetDate: target }
    });
    
    await nextTick(); // Espera a que onMounted se ejecute

    // 3. Comprueba los valores iniciales
    const text = wrapper.text();
    expect(text).toContain('01'); // Días
    expect(text).toContain('02'); // Horas
    expect(text).toContain('30'); // Minutos
    expect(text).toContain('30'); // Segundos
  });

  it('7.3.2 (Actualización): actualiza el tiempo cada segundo', async () => {
    const now = new Date('2025-11-20T10:00:00Z');
    vi.setSystemTime(now);
    
    const target = new Date('2025-11-20T10:00:10Z'); // Quedan 10 segundos
    
    const wrapper = mount(CountdownTimer, {
      props: { targetDate: target }
    });
    await nextTick();
    
    expect(wrapper.text()).toContain('10'); // Segundos

    // 1. Avanza el tiempo 1 segundo
    vi.advanceTimersByTime(1000);
    await nextTick();
    
    // 2. Comprueba que el valor ha disminuido
    expect(wrapper.text()).toContain('09'); // Segundos
    
    // Avanzamos 3 segundos más
    vi.advanceTimersByTime(3000);
    await nextTick();
    expect(wrapper.text()).toContain('06'); // Segundos
  });

  it('7.3.3 (Finalización): muestra el mensaje final cuando llega a cero', async () => {
    const now = new Date('2025-11-20T10:00:00Z');
    vi.setSystemTime(now);
    
    const target = new Date('2025-11-20T10:00:03Z'); // Quedan 3 segundos
    
    const wrapper = mount(CountdownTimer, {
      props: { targetDate: target }
    });
    
    expect(wrapper.find('.timer-box').exists()).toBe(true);

    // 1. Avanza el tiempo más allá del final
    vi.advanceTimersByTime(4000); // 4 segundos
    await nextTick();

    // 2. Comprueba que el mensaje final está visible
    expect(wrapper.find('.timer-box').exists()).toBe(false);
    expect(wrapper.find('.finished-message').exists()).toBe(true);
    expect(wrapper.text()).toContain('¡El evento ha comenzado!');
  });
});