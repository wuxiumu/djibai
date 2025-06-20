<template>
  <form class="rental-calc" @submit.prevent="handleOrder">
    <div>商品：<b>{{ product.name }}</b></div>
    <div>租赁天数：
      <input v-model.number="days" type="number" min="1" max="30" /> 天
    </div>
    <div>日租金：￥{{ product.price }}</div>
    <div>押金：￥{{ deposit }}</div>
    <div class="total">总计：<b>￥{{ total }}</b></div>
    <button type="submit" :disabled="loading">下单并支付</button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="paid" class="success">支付成功！</div>
  </form>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrderStore } from '@/store/order'
import type { Product } from '@/api/product'

const props = defineProps<{ product: Product }>()
const days = ref(1)
const deposit = computed(() => Math.ceil(props.product.price * 2))
const total = computed(() => props.product.price * days.value + deposit.value)

const store = useOrderStore()
const loading = computed(() => store.submitting)
const error = computed(() => store.error)
const paid = ref(false)

async function handleOrder() {
  paid.value = false
  const order = await store.createNewOrder({
    productId: props.product.id,
    productName: props.product.name,
    days: days.value,
    price: props.product.price,
    deposit: deposit.value
  })
  if (order && order.id) {
    // 模拟支付
    const success = await store.pay(order.id)
    paid.value = !!success
  }
}
</script>
<style scoped>
.rental-calc { background:#fff; border-radius:10px; padding:20px; box-shadow:0 4px 16px #eee; max-width:350px; margin:auto;}
.total { margin:12px 0; font-size:18px; color:#e44; }
.error { color:#d60000; margin-top:8px;}
.success { color:#27ae60; margin-top:8px;}
button { padding:8px 20px; border-radius:8px; }
input[type="number"] { width:50px; margin:0 4px;}
</style>