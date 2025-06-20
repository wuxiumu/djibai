<template>
  <div class="login-page">
    <h2>{{ isRegister ? '注册' : '登录' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input
          v-model.trim="phone"
          placeholder="请输入手机号"
          maxlength="11"
          inputmode="tel"
          autocomplete="tel"
          @input="clearError"
      />
      验证码 123456
      <div class="code-row">
        <input
            v-model.trim="code"
            placeholder="验证码"
            maxlength="6"
            inputmode="numeric"
            autocomplete="one-time-code"
            @input="clearError"
        />
        <button
            type="button"
            @click="onSendCode"
            :disabled="codeCountdown>0 || loading"
        >
          {{ codeCountdown > 0 ? `${codeCountdown}s后重发` : '发送验证码' }}
        </button>
      </div>
      <button type="submit" :disabled="loading || !canSubmit">
        {{ isRegister ? '注册' : '登录' }}
      </button>
    </form>
    <div>
      <a href="javascript:;" @click="toggleMode">
        {{ isRegister ? '已有账号？去登录' : '没有账号？去注册' }}
      </a>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const phone = ref('')
const code = ref('')
const isRegister = ref(false)
const codeCountdown = ref(0)
const { login, register, sendCode, loading, error } = useAuth()
const router = useRouter()
let codeTimer: ReturnType<typeof setInterval> | null = null

const canSubmit = computed(() =>
    /^1\d{10}$/.test(phone.value) && /^\d{6}$/.test(code.value)
)

function clearError() {
  if (error.value) error.value = ''
}

function toggleMode() {
  isRegister.value = !isRegister.value
  code.value = ''
  clearError()
}

async function handleSubmit() {
  if (!/^1\d{10}$/.test(phone.value)) {
    error.value = '请输入有效手机号'
    return
  }
  if (!/^\d{6}$/.test(code.value)) {
    error.value = '请输入6位验证码'
    return
  }
  let ok = false
  if (isRegister.value) {
    ok = await register(phone.value, code.value)
  } else {
    ok = await login(phone.value, code.value)
  }
  if (ok) {
    router.push('/')
  }
}

function onSendCode() {
  if (!/^1\d{10}$/.test(phone.value)) {
    error.value = '请输入有效手机号'
    return
  }
  if (codeCountdown.value > 0 || loading.value) return
  sendCode(phone.value)
  codeCountdown.value = 60
  codeTimer = setInterval(() => {
    codeCountdown.value -= 1
    if (codeCountdown.value <= 0 && codeTimer) {
      clearInterval(codeTimer)
      codeTimer = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (codeTimer) clearInterval(codeTimer)
})
</script>

<style scoped>
.login-page {
  max-width: 320px;
  margin: 40px auto;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px #eee;
}
input {
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 15px;
}
.code-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
button {
  border-radius: 6px;
  padding: 8px 16px;
}
.error {
  color: #d60000;
  margin-top: 10px;
  text-align: center;
  min-height: 24px;
  font-size: 14px;
}
a {
  display: block;
  color: #2177ff;
  text-align: right;
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>