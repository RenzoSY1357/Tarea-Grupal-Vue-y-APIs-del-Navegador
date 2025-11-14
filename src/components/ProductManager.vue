<script setup lang="ts">
import { ref, computed } from 'vue';

// 1. Definimos la interfaz del producto
interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
  categoria: string;
  fechaDeIngreso: string;
}

// El componente recibe la lista de productos como prop
const props = defineProps<{
  productos: Producto[];
}>();

// --- Definimos una 'computed' para cada requisito ---

// 1. Ordena el array de menor a mayor por precio
const sortedByPrice = computed(() => {
  // Usamos .slice() para no mutar la prop original
  return [...props.productos].sort((a, b) => a.precio - b.precio);
});

// 2. Ordena el array de menor a mayor por fechaIngreso
const sortedByDate = computed(() => {
  return [...props.productos].sort((a, b) => 
    new Date(a.fechaDeIngreso).getTime() - new Date(b.fechaDeIngreso).getTime()
  );
});

// 3. Selecciona los artículos que tiene un precio inferior a 25
const cheaperThan25 = computed(() => {
  return props.productos.filter(p => p.precio < 25);
});

// 4. Porcentaje de Stock (stock máximo 30, mínimo 5)
const stockPercentage = computed(() => {
  const stockMin = 5;
  const stockMax = 30;
  return props.productos.map(p => {
    // ((cantidad - min) / (max - min)) * 100
    // Nos aseguramos que esté entre 0 y 100
    const pct = Math.max(0, Math.min(100, 
      ((p.cantidad - stockMin) / (stockMax - stockMin)) * 100
    ));
    return {
      nombre: p.nombre,
      porcentaje: `${pct.toFixed(0)}%`
    };
  });
});

// 5. Agrupa los artículos por categoría
const groupedByCategory = computed(() => {
  return props.productos.reduce((acc, p) => {
    // Si la categoría no existe en el acumulador, la crea
    if (!acc[p.categoria]) {
      acc[p.categoria] = [];
    }
    // Añade el producto a su categoría
    acc[p.categoria].push(p);
    return acc;
  }, {} as Record<string, Producto[]>);
});

// 6. Muestra los 3 productos más caros
const threeMostExpensive = computed(() => {
  // Ordena de mayor a menor y coge los 3 primeros
  return [...props.productos].sort((a, b) => b.precio - a.precio).slice(0, 3);
});

// 7. Calcula cuánto ganaremos si vendemos todos los accesorios
const totalAccessoryValue = computed(() => {
  return props.productos
    .filter(p => p.categoria === 'Accesorios')
    .reduce((total, p) => total + (p.precio * p.cantidad), 0);
});

// 8. Muestra los productos que han ingresado en los últimos 15 días
// ¡IMPORTANTE! Esto depende del "día de hoy". 
// Usaremos "2024-11-14" como referencia.
const recentProducts = computed(() => {
  const hoy = new Date('2024-11-14T00:00:00Z');
  const quinceDiasAtras = new Date(hoy.getTime() - (15 * 24 * 60 * 60 * 1000));

  return props.productos.filter(p => {
    const fechaIngreso = new Date(p.fechaDeIngreso);
    return fechaIngreso >= quinceDiasAtras && fechaIngreso <= hoy;
  });
});

// 9. Muestra el calzado con precio entre 20 y 30
const specificShoes = computed(() => {
  return props.productos.filter(p => 
    p.categoria === 'Calzado' && p.precio >= 20 && p.precio <= 30
  );
});

// 10. Agrega un nuevo producto (como computed)
const withNewProduct = computed(() => {
  const nuevoProducto: Producto = {
    nombre: 'Mochila',
    precio: 75,
    cantidad: 10,
    categoria: 'Accesorios',
    fechaDeIngreso: '2024-11-14'
  };
  // Devuelve una nueva lista con el producto añadido
  return [...props.productos, nuevoProducto];
});

// 11. Descuento del 5% a los 5 productos con mayor stock
const withDiscount = computed(() => {
  // Encontramos los 5 con más stock
  const top5Stock = [...props.productos]
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5)
    .map(p => p.nombre); // Solo nos quedamos con los nombres

  // Mapeamos la lista original y aplicamos el descuento
  return props.productos.map(p => {
    if (top5Stock.includes(p.nombre)) {
      return {
        ...p,
        precioAnterior: p.precio,
        precio: p.precio * 0.95 // Aplicamos 5% de descuento
      };
    }
    return p;
  });
});

// 12. Borra los productos del mes de octubre
const withoutOctober = computed(() => {
  return props.productos.filter(p => {
    // getMonth() es 0-11, así que Octubre es 9
    return new Date(p.fechaDeIngreso).getMonth() !== 9;
  });
});

</script>

<template>
  <div class="product-manager">
    <h3>7.5: Gestor de Productos (ProductManager.vue)</h3>
    
    <div class="result-box">
      <h4>1. Ordenados por Precio (Menor a Mayor)</h4>
      <ul>
        <li v-for="p in sortedByPrice" :key="p.nombre">{{ p.nombre }} ({{ p.precio }}€)</li>
      </ul>
    </div>
    
    <div class="result-box">
      <h4>3. Precio inferior a 25€</h4>
      <ul>
        <li v-for="p in cheaperThan25" :key="p.nombre">{{ p.nombre }} ({{ p.precio }}€)</li>
      </ul>
    </div>
    
    <div class="result-box">
      <h4>5. Agrupados por Categoría</h4>
      <div v-for="(categoryItems, category) in groupedByCategory" :key="category">
        <strong>{{ category }}:</strong>
        <span>{{ categoryItems.map(p => p.nombre).join(', ') }}</span>
      </div>
    </div>
    
    <div class="result-box">
      <h4>6. Los 3 Más Caros</h4>
      <ol>
        <li v-for="p in threeMostExpensive" :key="p.nombre">{{ p.nombre }} ({{ p.precio }}€)</li>
      </ol>
    </div>
    
    <div class="result-box">
      <h4>7. Valor Total de "Accesorios"</h4>
      <p>{{ totalAccessoryValue.toFixed(2) }}€</p>
    </div>
    
    <div class="result-box">
      <h4>8. Ingresados en los últimos 15 días (desde 2024-11-14)</h4>
      <ul>
        <li v-for="p in recentProducts" :key="p.nombre">{{ p.nombre }} ({{ p.fechaDeIngreso }})</li>
      </ul>
    </div>

    <div class="result-box">
      <h4>9. Calzado entre 20€ y 30€</h4>
      <ul>
        <li v-for="p in specificShoes" :key="p.nombre">{{ p.nombre }} ({{ p.precio }}€)</li>
      </ul>
    </div>
    
    <div class="result-box">
      <h4>12. Productos sin Octubre (quedan {{ withoutOctober.length }})</h4>
      <ul>
        <li v-for="p in withoutOctober" :key="p.nombre">{{ p.nombre }} ({{ p.fechaDeIngreso }})</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.product-manager {
background-color: #f9f9f9;
border-radius: 8px;
padding: 1rem;
}
.result-box {
background-color: #fff;
border: 1px solid #eee;
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
}
h4 {
margin-top: 0;
border-bottom: 1px solid #eee;
padding-bottom: 5px;
}
ul, ol {
margin: 0;
padding-left: 20px;
}
</style>