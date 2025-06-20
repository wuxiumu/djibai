<template>
  <div class="product-list">
    <h2>全部商品</h2>
    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="grid">
      <ProductCard
          v-for="item in list"
          :key="item.id"
          :product="item"
          @click="openDetail(item)"
      />
    </div>
    <ProductDetail v-if="showDetail" :product="detail" @close="closeDetail" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/store/product'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetail from '@/components/ProductDetail.vue'


const store = useProductStore()
const list = computed(() => store.list)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const detail = computed(() => store.detail)
const showDetail = ref(false)

function openDetail(item: any) {
  store.loadDetail(item.id)
  showDetail.value = true
}
function closeDetail() {
  store.clearDetail()
  showDetail.value = false
}

onMounted(() => { store.loadList() })
</script>
<style scoped>
.product-list { max-width: 900px; margin: 0 auto; padding: 24px; }
.grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(200px,1fr)); gap:18px; }
.error { color:#c00; }
</style>