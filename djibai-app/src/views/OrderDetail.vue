<template>
  <div v-if="order" class="order-detail">
    <div class="mask" @click="$emit('close')" />
    <div class="panel">
      <h3>订单详情</h3>
      <p><b>订单号：</b>{{ order.id }}</p>
      <p><b>商品：</b>{{ order.productName }}</p>
      <p><b>天数：</b>{{ order.days }}</p>
      <p><b>总计：</b>￥{{ order.total }}</p>
      <p><b>押金：</b>￥{{ order.deposit }}</p>
      <p><b>状态：</b>{{ order.status }}</p>
      <button @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Order } from '@/api/order'
defineProps<{ order: Order | null }>()
</script>
<style scoped>
.order-detail { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:20;}
.mask { position:fixed; inset:0; background:rgba(0,0,0,0.2);}
.panel { background:#fff; border-radius:14px; padding:30px 24px; width:330px; position:relative; box-shadow:0 6px 30px #aaa;}
button { margin-top:20px; border-radius:8px; padding:6px 24px;}
</style>