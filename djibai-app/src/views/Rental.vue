<template>
  <div>
    <h2>租赁流程</h2>
    <RentalCalculator :product="product"/>
  </div>
</template>
<script setup lang="ts">
import RentalCalculator from '@/components/RentalCalculator.vue'
import { ref } from 'vue'

// 这里用静态商品，实际开发可通过路由参数/Pinia传递
const product = ref({
  id: 1,
  name: '小米电视',
  price: 20,
  image: 'https://img.yzcdn.cn/vant/apple-1.jpg'
})
</script>