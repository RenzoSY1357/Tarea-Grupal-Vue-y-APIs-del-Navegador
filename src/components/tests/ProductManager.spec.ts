import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductManager from '../ProductManager.vue';

const productos = [
 { nombre: 'Camiseta', precio: 20, cantidad: 10, categoria: 'Ropa', fechaDeIngreso: '2024-11-01' },
 { nombre: 'Pantalones', precio: 50, cantidad: 0, categoria: 'Ropa', fechaDeIngreso: '2024-10-15' },
 { nombre: 'Zapatos', precio: 30, cantidad: 5, categoria: 'Calzado', fechaDeIngreso: '2024-11-10' },
 { nombre: 'Sombrero', precio: 15, cantidad: 20, categoria: 'Accesorios', fechaDeIngreso: '2024-11-05' },
 { nombre: 'Chaqueta', precio: 80, cantidad: 7, categoria: 'Ropa', fechaDeIngreso: '2024-11-11' },
 { nombre: 'Guantes', precio: 25, cantidad: 15, categoria: 'Accesorios', fechaDeIngreso: '2024-10-20' },
 { nombre: 'Bufanda', precio: 18, cantidad: 12, categoria: 'Accesorios', fechaDeIngreso: '2024-11-09' },
 { nombre: 'Gafas de sol', precio: 45, cantidad: 9, categoria: 'Accesorios', fechaDeIngreso: '2024-10-31' },
 { nombre: 'Reloj', precio: 120, cantidad: 3, categoria: 'Accesorios', fechaDeIngreso: '2024-11-03' },
 { nombre: 'Bolso', precio: 60, cantidad: 6, categoria: 'Accesorios', fechaDeIngreso: '2024-10-25' },
 { nombre: 'Cinturón', precio: 22, cantidad: 13, categoria: 'Accesorios', fechaDeIngreso: '2024-11-08' },
 { nombre: 'Vestido', precio: 70, cantidad: 4, categoria: 'Ropa', fechaDeIngreso: '2024-11-12' },
 { nombre: 'Falda', precio: 35, cantidad: 11, categoria: 'Ropa', fechaDeIngreso: '2024-10-18' },
 { nombre: 'Calcetines', precio: 8, cantidad: 30, categoria: 'Ropa', fechaDeIngreso: '2024-11-02' },
 { nombre: 'Pañuelo', precio: 12, cantidad: 25, categoria: 'Accesorios', fechaDeIngreso: '2024-11-07' },
 { nombre: 'Camiseta sin mangas', precio: 15, cantidad: 14, categoria: 'Ropa', fechaDeIngreso: '2024-10-22' },
 { nombre: 'Pantalones cortos', precio: 40, cantidad: 8, categoria: 'Ropa', fechaDeIngreso: '2024-10-30' },
 { nombre: 'Botas', precio: 90, cantidad: 5, categoria: 'Calzado', fechaDeIngreso: '2024-11-06' },
 { nombre: 'Sandalias', precio: 28, cantidad: 18, categoria: 'Calzado', fechaDeIngreso: '2024-10-27' },
 { nombre: 'Zapatos deportivos', precio: 65, cantidad: 7, categoria: 'Calzado', fechaDeIngreso: '2024-11-13' }
];

describe('ProductManager', () => {
  const wrapper = mount(ProductManager, {
    props: { productos }
  });
  const vm = wrapper.vm as any; // Accedemos a las computed

  it('7.5.1: Ordena por precio', () => {
    expect(vm.sortedByPrice[0].nombre).toBe('Calcetines');
    expect(vm.sortedByPrice[vm.sortedByPrice.length - 1].nombre).toBe('Reloj');
  });

  it('7.5.2: Ordena por fecha', () => {
    expect(vm.sortedByDate[0].nombre).toBe('Pantalones');
    expect(vm.sortedByDate[vm.sortedByDate.length - 1].nombre).toBe('Zapatos deportivos');
  });

  it('7.5.3: Precio inferior a 25', () => {
    const names = vm.cheaperThan25.map((p: any) => p.nombre);
    expect(names).toEqual(['Camiseta', 'Sombrero', 'Bufanda', 'Cinturón', 'Calcetines', 'Pañuelo', 'Camiseta sin mangas']);
  });
  
  it('7.5.4: Porcentaje de Stock (stock 5-30)', () => {
    const calcetines = vm.stockPercentage.find((p: any) => p.nombre === 'Calcetines');
    const zapatos = vm.stockPercentage.find((p: any) => p.nombre === 'Zapatos');
    const pantalones = vm.stockPercentage.find((p: any) => p.nombre === 'Pantalones');
    
    expect(calcetines.porcentaje).toBe('100%'); // 30
    expect(zapatos.porcentaje).toBe('0%');     // 5
    expect(pantalones.porcentaje).toBe('0%'); // 0 (min)
  });

  it('7.5.5: Agrupa por categoría', () => {
    expect(vm.groupedByCategory['Ropa'].length).toBe(8);
    expect(vm.groupedByCategory['Calzado'].length).toBe(4);
    expect(vm.groupedByCategory['Accesorios'].length).toBe(8);
  });
  
  it('7.5.6: Los 3 más caros', () => {
    const names = vm.threeMostExpensive.map((p: any) => p.nombre);
    expect(names).toEqual(['Reloj', 'Botas', 'Chaqueta']);
  });
  
  it('7.5.7: Valor total de accesorios', () => {
    // (15*20) + (25*15) + (18*12) + (45*9) + (120*3) + (60*6) + (22*13) + (12*25) = 2602
    expect(vm.totalAccessoryValue).toBe(2602);
  });

  it('7.5.8: Ingresados últimos 15 días (desde 2024-11-14)', () => {
    const names = vm.recentProducts.map((p: any) => p.nombre);
    
    expect(names).toEqual([
      'Camiseta', 'Zapatos', 'Sombrero', 'Chaqueta', 'Bufanda', 'Gafas de sol', 'Reloj', 'Cinturón',
      'Vestido', 'Calcetines', 'Pañuelo', 'Pantalones cortos', 'Botas', 'Zapatos deportivos'
    ]);
  });
  
  it('7.5.9: Calzado entre 20 y 30', () => {
    const names = vm.specificShoes.map((p: any) => p.nombre);
    expect(names).toEqual(['Zapatos', 'Sandalias']);
  });

  it('7.5.10: Agrega un nuevo producto', () => {
    expect(vm.withNewProduct.length).toBe(21);
    expect(vm.withNewProduct.find((p: any) => p.nombre === 'Mochila')).toBeDefined();
  });
  
  it('7.5.11: Descuento 5% a top 5 stock', () => {
    // Top 5 stock: Calcetines (30), Pañuelo (25), Sombrero (20), Sandalias (18), Guantes (15)
    const calcetines = vm.withDiscount.find((p: any) => p.nombre === 'Calcetines');
    const pañuelo = vm.withDiscount.find((p: any) => p.nombre === 'Pañuelo');
    const camiseta = vm.withDiscount.find((p: any) => p.nombre === 'Camiseta');
    
    expect(calcetines.precio).toBe(8 * 0.95); // 7.6
    expect(pañuelo.precio).toBe(12 * 0.95); // 11.4
    expect(camiseta.precio).toBe(20); // Sin descuento
  });
  
  it('7.5.12: Borra productos de octubre (mes 9)', () => {
    expect(vm.withoutOctober.length).toBe(12);
    expect(vm.withoutOctober.find((p: any) => p.nombre === 'Pantalones')).toBeUndefined();
  });
});