import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CalendarView from '../CalendarView.vue';

// 1. Mock de eventos
const mockEvents = [
  { date: new Date('2024-02-01'), title: 'Inicio', type: 'busy' as const },
  { date: new Date('2024-02-15'), title: 'Reunión', type: 'tentative' as const },
  { date: new Date('2024-02-15'), title: 'Entrega', type: 'busy' as const },
  { date: new Date('2024-02-29'), title: 'Fin de mes', type: 'holiday' as const },
];

describe('CalendarView', () => {

  // 1. Test de estructura (Febrero 2024 tuvo 29 días y empezó en Jueves)
  it('7.4.1 (Estructura): renderiza la cuadrícula correcta para Feb 2024', () => {
    const wrapper = mount(CalendarView, {
      props: {
        year: 2024,
        month: 1, // 1 = Febrero
        events: []
      }
    });

    // 2. Comprueba el número total de celdas (4 días relleno + 29 días mes) = 33. Relleno al final = 35.
    const cells = wrapper.findAll('.calendar-cell');
    expect(cells.length).toBe(35);

    // 3. Verifica la primera celda
    // (Jueves es el 4º día, así que 4 días de relleno)
    const firstDay = cells[4];
    expect(firstDay.text()).toContain('1');
    expect(firstDay.classes('is-not-current-month')).toBe(false);
    
    // Verifica el relleno anterior
    expect(cells[3].classes('is-not-current-month')).toBe(true);
    expect(cells[3].text()).toContain('31'); // 31 de Enero

    // 4. Verifica la última celda del mes
    const lastDay = cells[32]; // (4 + 29 - 1)
    expect(lastDay.text()).toContain('29');
  });

  it('7.4.2 (Eventos): renderiza los eventos en los días correctos', () => {
    const wrapper = mount(CalendarView, {
      props: {
        year: 2024,
        month: 1, // 1 = Febrero
        events: mockEvents
      }
    });
    
    // 1. Busca la celda del día 15 (índice 4 + 14 = 18)
    const day15 = wrapper.findAll('.calendar-cell')[18];
    expect(day15.text()).toContain('15');
    
    // 2. Comprueba que tiene 2 eventos
    const eventsInDay15 = day15.findAll('.calendar-event');
    expect(eventsInDay15.length).toBe(2);
    expect(day15.text()).toContain('Reunión');
    expect(day15.text()).toContain('Entrega');

    // 3. Comprueba el día 1 (índice 4)
    const day1 = wrapper.findAll('.calendar-cell')[4];
    expect(day1.findAll('.calendar-event').length).toBe(1);
    expect(day1.text()).toContain('Inicio');
    
    // 4. Comprueba un día vacío (índice 5)
    const day2 = wrapper.findAll('.calendar-cell')[5];
    expect(day2.findAll('.calendar-event').length).toBe(0);
  });

  it('7.4.3 (Clases): aplica clases condicionales a eventos', () => {
    const wrapper = mount(CalendarView, {
      props: {
        year: 2024,
        month: 1,
        events: mockEvents
      }
    });
    
    // 1. Busca el evento "Reunión" y comprueba su clase 'tentative'
    const reunion = wrapper.find('.event-tentative');
    expect(reunion.exists()).toBe(true);
    expect(reunion.text()).toBe('Reunión');
    
    // 2. Busca el evento "Fin de mes" y comprueba su clase 'holiday'
    const holiday = wrapper.find('.event-holiday');
    expect(holiday.exists()).toBe(true);
    expect(holiday.text()).toBe('Fin de mes');
  });
});