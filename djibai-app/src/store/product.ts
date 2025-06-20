// src/store/product.ts
import { defineStore } from 'pinia'
import { fetchProducts, fetchProductDetail } from '@/api/product'
import type { Product } from '@/api/product'

export const useProductStore = defineStore('product', {
    state: () => ({
        list: [] as Product[],
        detail: null as Product | null,
        loading: false,
        error: ''
    }),
    actions: {
        async loadList() {
            this.loading = true
            this.error = ''
            try {
                const res = await fetchProducts()
                this.list = res.data
            } catch (e: any) {
                this.error = e?.message || '加载商品失败'
            } finally {
                this.loading = false
            }
        },
        async loadDetail(id: number) {
            this.loading = true
            this.error = ''
            try {
                const res = await fetchProductDetail(id)
                this.detail = res.data || null
            } catch (e: any) {
                this.error = e?.message || '加载详情失败'
            } finally {
                this.loading = false
            }
        },
        clearDetail() {
            this.detail = null
        }
    }
})