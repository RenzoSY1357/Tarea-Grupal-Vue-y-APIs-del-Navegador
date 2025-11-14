<script setup lang="ts">
import { computed } from 'vue';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';

// 1. El componente recibe las props
const props = defineProps<{
  price: number;
  locale: string;
  currencyCode: string;
}>();

// 2. Llama a useCurrencyFormatter
const { formatCurrency } = useCurrencyFormatter();

// 2. Crea una propiedad computed
const formattedPrice = computed(() => {
  return formatCurrency(props.price, props.locale, props.currencyCode);
});
</script>

<template>
  <!-- 2. Muestra el precio formateado -->
  <span class="product-price">{{ formattedPrice }}</span>
</template>

<style scoped>
.product-price {
font-weight: bold;
font-size: 1.2rem;
color: #3b82f6;
}
</style>