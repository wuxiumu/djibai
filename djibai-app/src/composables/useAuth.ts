// src/composables/useAuth.ts
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { loginByPhone, registerByPhone, sendSmsCode } from '@/api/auth'

export function useAuth() {
    const loading = ref(false)
    const error = ref('')
    const store = useAuthStore()

    // 登录
    async function login(phone: string, code: string) {
        loading.value = true
        error.value = ''
        try {
            const res = await loginByPhone(phone, code)
            store.setAuth(res.data.token, res.data.user)
            return true
        } catch (e: any) {
            error.value = e?.response?.data?.msg || '登录失败'
            return false
        } finally {
            loading.value = false
        }
    }

    // 注册
    async function register(phone: string, code: string) {
        loading.value = true
        error.value = ''
        try {
            const res = await registerByPhone(phone, code)
            store.setAuth(res.data.token, res.data.user)
            return true
        } catch (e: any) {
            error.value = e?.response?.data?.msg || '注册失败'
            return false
        } finally {
            loading.value = false
        }
    }

    // 发送验证码
    async function sendCode(phone: string) {
        loading.value = true
        error.value = ''
        try {
            await sendSmsCode(phone)
            return true
        } catch (e: any) {
            error.value = e?.response?.data?.msg || '发送失败'
            return false
        } finally {
            loading.value = false
        }
    }

    return { login, register, sendCode, loading, error }
}
