<!--
 * @author: gaoweixuan
 * @since: 2024-02-17
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user.ts'
import router from '@/router'

let $route = useRoute()
const userStore = useUserStore()

onMounted(() => {
  const accessToken = $route.query.accessToken as string
  if (accessToken) {
    userStore.storeLoginInfo(accessToken)
    router.push('Layout')
  }
})
</script>

<template>{{}}</template>

<style lang="scss" scoped></style>
