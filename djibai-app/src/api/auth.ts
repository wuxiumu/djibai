// src/api/auth.ts
import axios from 'axios'

export async function loginByPhone(phone: string, code: string) {
    // return axios.post('/api/auth/login', { phone, code })
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (code === '123456') {
                resolve({ data: { token: 'FAKE_TOKEN', user: { phone } } })
            } else {
                reject({ response: { data: { msg: '验证码错误' } } })
            }
        }, 800)
    })
}

export async function registerByPhone(phone: string, code: string) {
    return axios.post('/api/auth/register', { phone, code })
}

export async function sendSmsCode(phone: string) {
    return axios.post('/api/auth/send-code', { phone })
}
