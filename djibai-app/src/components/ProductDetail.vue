<template>
  <div class="detail" v-if="product">
    <div class="mask" @click="$emit('close')" />
    <div class="panel">
      <img :src="product.image" />
      <h3>{{ product.name }}</h3>
      <div>￥{{ product.price }}/天</div>
      <p>{{ product.desc }}</p>
      <button @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import type { Product } from '@/api/product'
defineProps<{ product: Product | null }>()
</script>
<style scoped>
.detail { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:10;}
.mask { position:fixed; inset:0; background:rgba(0,0,0,0.3);}
.panel { background:#fff; border-radius:14px; padding:32px 20px; width:300px; position:relative; box-shadow:0 6px 40px #aaa;}
img { width:100%; border-radius:10px;}
button { margin-top:16px; border-radius:8px; padding:8px 20px;}
</style>