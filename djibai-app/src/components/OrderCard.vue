<template>
  <div class="order-card" @click="$emit('click', order)">
    <div>
      <b>订单号：</b>{{ order.id }}<br/>
      <b>商品：</b>{{ order.productName }}<br/>
      <b>租期：</b>{{ order.days }}天
    </div>
    <div>
      <b>总计：</b>￥{{ order.total }}<br/>
      <b>状态：</b>{{ order.status }}
    </div>
    <button v-if="order.status === '租赁中'" @click.stop="onReturn">申请归还</button>
  </div>
</template>
<script setup lang="ts">
import type { Order } from '@/api/order'
const props = defineProps<{ order: Order }>()
const emit = defineEmits(['click', 'return'])
function onReturn() {
  emit('return', props.order.id)
}
</script>
<style scoped>
.order-card { padding:14px; border-radius:10px; background:#fff; box-shadow:0 2px 12px #eee; margin:14px 0; display:flex; justify-content:space-between; align-items:center;}
button { border-radius:8px; padding:4px 16px;}
</style>