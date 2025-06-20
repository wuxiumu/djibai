<template>
  <div class="user-center">
    <UserProfile v-if="profile" :profile="profile" />
    <button class="logout-btn" @click="logoutConfirm = true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 17L21 12L16 7" stroke="#ff5c38" stroke-width="2"/><path d="M21 12H9" stroke="#ff5c38" stroke-width="2"/><path d="M13 5V7" stroke="#ccc" stroke-width="2"/><path d="M13 17V19" stroke="#ccc" stroke-width="2"/><path d="M5 12H13" stroke="#ccc" stroke-width="2"/></svg>
      退出
    </button>
    <h3>租赁历史</h3>
    <RentalHistory :records="rentalHistory"/>
    <h3>我的优惠券</h3>
    <CouponList :coupons="coupons"/>
    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="logoutConfirm" class="logout-modal">
      <div class="modal-panel">
        <div style="font-weight:600;margin-bottom:14px;">确定要退出登录吗？</div>
        <button class="danger" @click="doLogout">确认退出</button>
        <button @click="logoutConfirm=false">取消</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useUserStore } from '@/store/user'
import UserProfile from '@/components/UserProfile.vue'
import RentalHistory from '@/components/RentalHistory.vue'
import CouponList from '@/components/CouponList.vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const logoutConfirm = ref(false)

function doLogout() {
  authStore.logout()
  logoutConfirm.value = false
  router.replace('/login')
}

const store = useUserStore()
const profile = computed(() => store.profile)
const rentalHistory = computed(() => store.rentalHistory)
const coupons = computed(() => store.coupons)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

onMounted(() => {
  store.loadProfile()
  store.loadRentalHistory()
  store.loadCoupons()
})

</script>
<style scoped>
.user-center {
  max-width: 500px;
  margin: 0 auto;
  padding: 38px 0 42px 0;
  min-height: 100vh;
  position: relative;
}
h3 { margin: 32px 0 12px 8px; font-size: 17px; color:#374;}
.error { color: #c00; margin-top: 10px; }
.logout-btn {
  position: absolute;
  top: 22px;
  right: 28px;
  background: #fff;
  border: 1.5px solid #ff5c38;
  color: #ff5c38;
  border-radius: 22px;
  padding: 6px 19px 6px 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  box-shadow: 0 1px 7px #ffe1d2;
  transition: background .13s;
  z-index: 2;
}
.logout-btn:hover {
  background: #ffeae2;
}
.logout-modal {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,0.13);
  display: flex; align-items: center; justify-content: center;
}
.modal-panel {
  background: #fff;
  border-radius: 16px;
  padding: 38px 38px 28px 38px;
  min-width: 230px;
  box-shadow: 0 8px 32px #d2d2d2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: fadeIn .2s;
}
@keyframes fadeIn {
  from { transform: translateY(24px) scale(.98); opacity: 0;}
  to   { transform: none; opacity: 1;}
}
button {
  border-radius: 8px;
  padding: 7px 26px;
  margin: 0 6px;
  border: none;
  background: #eee;
  color: #444;
  font-size: 15px;
}
button.danger {
  background: #ffebe7;
  color: #ff4316;
  border: 1px solid #ffbdb2;
}
button.danger:hover {
  background: #ffd4c7;
}
button:hover {
  background: #f6f6f6;
}
</style>