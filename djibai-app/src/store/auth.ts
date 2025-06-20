// src/store/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        userInfo: null as null | Record<string, any>,
    }),
    actions: {
        setAuth(token: string, userInfo: any) {
            this.token = token
            this.userInfo = userInfo
            localStorage.setItem('token', token)
        },
        logout() {
            this.token = ''
            this.userInfo = null
            localStorage.removeItem('token')
        },
        loadFromStorage() {
            this.token = localStorage.getItem('token') || ''
        },
    },
})
