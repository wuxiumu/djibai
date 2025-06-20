<template>
  <div class="coupons">
    <div v-for="c in coupons" :key="c.id" class="coupon">
      {{ c.desc }} <span class="expire">({{ c.expire }} 到期)</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Coupon } from '@/api/user'
defineProps<{ coupons: Coupon[] }>()
</script>
<style scoped>
.coupon { background:#fff5e0; padding:10px 16px; border-radius:8px; margin-bottom:8px;}
.expire { color:#b08b00; margin-left:6px;}
</style>