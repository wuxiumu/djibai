<template>
  <div class="history">
    <div v-for="r in records" :key="r.orderId" class="item">
      <b>{{ r.productName }}</b>
      <span>({{ r.date }})</span>
      <span :class="r.status">{{ r.status }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RentalRecord } from '@/api/user'
defineProps<{ records: RentalRecord[] }>()
</script>
<style scoped>
.item { display:flex; align-items:center; gap:10px; margin-bottom:8px;}
.租赁中 { color:#2177ff; }
.已归还 { color:#27ae60; }
</style>