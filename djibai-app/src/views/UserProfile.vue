<template>
  <div class="profile">
    <img :src="profile.avatar" class="avatar" />
    <div class="info">
      <div class="nickname">{{ profile.nickname }}</div>
      <div class="phone">{{ profile.phone }}</div>
      <div class="credit">
        <span>信用分：</span>
        <b :class="creditColor">{{ profile.creditScore }}</b>
        <span class="level">({{ profile.creditLevel }})</span>
      </div>
    </div>
    <button class="logout-btn" @click="$emit('logout')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 17L21 12L16 7" stroke="#ff5c38" stroke-width="2"/><path d="M21 12H9" stroke="#ff5c38" stroke-width="2"/><path d="M13 5V7" stroke="#ccc" stroke-width="2"/><path d="M13 17V19" stroke="#ccc" stroke-width="2"/><path d="M5 12H13" stroke="#ccc" stroke-width="2"/></svg>
      退出
    </button>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/api/user'
import { computed } from 'vue'
const props = defineProps<{ profile: User }>()
defineEmits(['logout'])
const creditColor = computed(() =>
    props.profile.creditScore >= 700
        ? 'green'
        : props.profile.creditScore >= 650
            ? 'orange'
            : 'red'
)
</script>
<style scoped>
.profile { display:flex; align-items:center; padding:22px 0 12px 0; position:relative; border-radius:18px; background:linear-gradient(100deg,#f8faff 70%,#f4ecfc 100%); box-shadow:0 3px 20px #f2f2f2;}
.avatar { width:66px; height:66px; border-radius:50%; margin:0 18px; border:2px solid #fff; box-shadow:0 2px 8px #eee;}
.info { flex:1; }
.nickname { font-size:20px; font-weight:700; margin-bottom:2px; color:#444;}
.phone { font-size:13px; color:#888;}
.credit { margin-top:6px; font-size:15px;}
.level { font-size:12px; color:#888; margin-left:3px;}
.green { color:#27ae60;}
.orange { color:#f5a623;}
.red { color:#d60000;}
.logout-btn { position:absolute; right:18px; top:14px; background:#fff; border:1.5px solid #ff5c38; color:#ff5c38; border-radius:20px; padding:5px 18px 5px 10px; font-weight:600; display:flex; align-items:center; gap:5px; cursor:pointer; transition:.1s;}
.logout-btn:hover { background:#ffeae2; }
</style>