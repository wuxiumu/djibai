// src/store/order.ts
import { defineStore } from 'pinia'
import { createOrder, payOrder, fetchOrderList } from '@/api/order'
import type { Order } from '@/api/order'
import { generateMockOrders,requestReturn, subscribeOrderStatus } from '@/api/order'

export const useOrderStore = defineStore('order', {
    state: () => ({
        list: [] as Order[],
        total: 0,
        loading: false,
        error: '',
        page: 1,
        pageSize: 20,
        requestCount: 0 // MVP流量统计
    }),
    actions: {
        /** 一键生成测试订单数据 */
        generateMockData(count = 500) {
            generateMockOrders(count)
            this.page = 1
            this.loadList()
        },
        resetMockData() {
            resetMockOrders()
            this.list = []
            this.total = 0
        },
        async createNewOrder(params: {productId: number, productName: string, days: number, price: number, deposit: number}) {
            this.submitting = true
            this.error = ''
            try {
                const res = await createOrder(params)
                this.list.push(res.data)
                return res.data
            } catch (e: any) {
                this.error = e?.message || '下单失败'
            } finally {
                this.submitting = false
            }
        },
        async pay(id: number) {
            this.submitting = true
            this.error = ''
            try {
                const res = await payOrder(id)
                return res.success
            } catch (e: any) {
                this.error = e?.message || '支付失败'
                return false
            } finally {
                this.submitting = false
            }
        },
        async loadList(page = this.page) {
            this.loading = true
            this.error = ''
            this.requestCount++
            try {
                const res = await fetchOrderList({ page, pageSize: this.pageSize })
                this.list = res.data
                this.total = res.total
                this.page = page
            } catch (e: any) {
                this.error = e?.message || '加载订单失败'
            } finally {
                this.loading = false
            }
        },
        async applyReturn(id: number) {
            this.submitting = true
            this.error = ''
            try {
                const res = await requestReturn(id)
                if (res.success) {
                    const order = this.list.find(o => o.id === id)
                    if (order) order.status = '归还申请中'
                }
                return res.success
            } catch (e: any) {
                this.error = e?.message || '归还申请失败'
                return false
            } finally {
                this.submitting = false
            }
        },
        watchOrderStatus(callback: (order: Order) => void) {
            subscribeOrderStatus(callback)
        }
    }
})

// 在原有的基础上补充

// ... 省略前面代码
//
// export const useOrderStore = defineStore('order', {
//     // ... state
//     actions: {
//         // ... 原有 actions
//         async applyReturn(id: number) {
//             this.submitting = true
//             this.error = ''
//             try {
//                 const res = await requestReturn(id)
//                 if (res.success) {
//                     const order = this.list.find(o => o.id === id)
//                     if (order) order.status = '归还申请中'
//                 }
//                 return res.success
//             } catch (e: any) {
//                 this.error = e?.message || '归还申请失败'
//                 return false
//             } finally {
//                 this.submitting = false
//             }
//         },
//         watchOrderStatus(callback: (order: Order) => void) {
//             subscribeOrderStatus(callback)
//         }
//     }
// })