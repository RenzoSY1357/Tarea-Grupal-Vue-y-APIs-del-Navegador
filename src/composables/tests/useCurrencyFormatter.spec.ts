import { describe, it, expect } from 'vitest';
import { useCurrencyFormatter } from '../useCurrencyFormatter';

// 1. Test de lógica pura, no se necesita 'mount'
describe('useCurrencyFormatter', () => {

  // 2. Importa el composable
  const { formatCurrency } = useCurrencyFormatter();

  it('7.2.1: (USD) formatea correctamente para en-US y USD', () => {
    // 3. Comprueba el caso USD
    const result = formatCurrency(12345.67, 'en-US', 'USD');
    // Vitest puede tener ligeras variaciones, usamos toContain
    expect(result).toContain('$');
    expect(result).toContain('12,345.67');
  });

  it('7.2.2: (EUR) formatea correctamente para de-DE y EUR', () => {
    // 3. Comprueba el caso EUR
    const result = formatCurrency(12345.67, 'de-DE', 'EUR');
    // El símbolo (€) puede ir al final
    expect(result).toContain('12.345,67');
    expect(result).toContain('€');
  });

  it('7.2.3: (JPY) formatea correctamente para ja-JP y JPY (sin decimales)', () => {
    // 3. Comprueba el caso JPY
    const result = formatCurrency(5000, 'ja-JP', 'JPY');
    expect(result).toContain('￥');
    expect(result).toContain('5,000');
  });
});