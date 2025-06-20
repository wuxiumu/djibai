<template>
  <div class="card" @click="onClick">
    <img :src="product.image" :alt="product.name" />
    <div class="name">{{ product.name }}</div>
    <div class="price">￥{{ product.price }}/天</div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Product } from '@/api/product'
const props = defineProps<{ product: Product }>()
const emit = defineEmits(['click'])
function onClick() { emit('click', props.product) }
</script>
<style scoped>
.card { padding:16px; border-radius:12px; box-shadow:0 2px 6px #eee; margin:12px; cursor:pointer; transition: box-shadow .2s;}
.card:hover { box-shadow:0 6px 20px #ddd;}
img { width:100%; height:120px; object-fit:cover; border-radius:10px;}
.name { font-weight:600; margin-top:8px;}
.price { color:#e77; margin-top:4px;}
</style>