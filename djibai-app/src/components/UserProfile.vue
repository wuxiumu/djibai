<template>
  <div class="profile">
    <img :src="profile.avatar" class="avatar" />
    <div class="info">
      <div>{{ profile.nickname }}</div>
      <div>{{ profile.phone }}</div>
      <div>信用分: <b>{{ profile.creditScore }}</b> ({{ profile.creditLevel }})</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { User } from '@/api/user'
defineProps<{ profile: User }>()
</script>
<style scoped>
.profile { display:flex; align-items:center; padding:20px 0;}
.avatar { width:64px; height:64px; border-radius:50%; margin-right:18px;}
.info > div { margin:2px 0;}
</style>