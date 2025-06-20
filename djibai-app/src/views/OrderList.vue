<template>
  <div>
    <h2>订单流量MVP测试</h2>
    <button @click="genOrders">一键生成500订单</button>
    <button @click="clearOrders">清空</button>
    <span style="margin-left:12px;">总订单数: {{ total }}</span>
    <span style="margin-left:20px;color:#555;">页面请求数: {{ requestCount }}</span>

    <div>
      <button :disabled="page===1" @click="toPage(page-1)">上一页</button>
      <button :disabled="page*pageSize>=total" @click="toPage(page+1)">下一页</button>
      <span> 第{{ page }}页/共{{ Math.ceil(total/pageSize) }}页 </span>
    </div>
    <OrderCard v-for="order in orders" :key="order.id" :order="order" />
    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>
<script setup lang="ts">
import { useOrderStore } from '@/store/order'
import { computed } from 'vue'
import OrderCard from '@/components/OrderCard.vue'
const store = useOrderStore()
const orders = computed(() => store.list)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const total = computed(() => store.total)
const page = computed(() => store.page)
const pageSize = computed(() => store.pageSize)
const requestCount = computed(() => store.requestCount)

function genOrders() {
  store.generateMockData(500)
}
function clearOrders() {
  store.resetMockData()
}
function toPage(p: number) {
  store.loadList(p)
}
</script>
<style scoped>
.error { color: #c00; }
button { margin: 4px 6px; }
</style>