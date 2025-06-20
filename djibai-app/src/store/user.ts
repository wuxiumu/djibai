// src/store/user.ts
import { defineStore } from 'pinia'
import { fetchUserProfile, fetchRentalHistory, fetchCoupons } from '@/api/user'
import type { User, RentalRecord, Coupon } from '@/api/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        profile: null as User | null,
        rentalHistory: [] as RentalRecord[],
        coupons: [] as Coupon[],
        loading: false,
        error: ''
    }),
    actions: {
        async loadProfile() {
            this.loading = true
            this.error = ''
            try {
                const res = await fetchUserProfile()
                this.profile = res.data
            } catch (e: any) {
                this.error = e?.message || '加载资料失败'
            } finally {
                this.loading = false
            }
        },
        async loadRentalHistory() {
            this.loading = true
            this.error = ''
            try {
                const res = await fetchRentalHistory()
                this.rentalHistory = res.data
            } catch (e: any) {
                this.error = e?.message || '加载历史失败'
            } finally {
                this.loading = false
            }
        },
        async loadCoupons() {
            this.loading = true
            this.error = ''
            try {
                const res = await fetchCoupons()
                this.coupons = res.data
            } catch (e: any) {
                this.error = e?.message || '加载优惠券失败'
            } finally {
                this.loading = false
            }
        }
    }
})