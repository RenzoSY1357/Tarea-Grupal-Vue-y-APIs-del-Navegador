/**
 * Composable para formatear divisas usando Intl.NumberFormat.
 */
export function useCurrencyFormatter() {

  /**
   * Formatea un número como una cadena de divisa.
   * @param amount El número a formatear
   * @param locale El código de locale (ej. 'en-US')
   * @param currencyCode El código de divisa (ej. 'USD')
   * @returns La cadena de texto formateada
   */
  const formatCurrency = (amount: number, locale: string, currencyCode: string): string => {
    
    // 1. Usa el constructor Intl.NumberFormat
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    });

    return formatter.format(amount);
  };

  // 1. Devuelve la función
  return {
    formatCurrency
  };
}