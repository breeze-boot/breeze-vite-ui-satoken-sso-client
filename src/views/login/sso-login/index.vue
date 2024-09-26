<!--
 * @author: gaoweixuan
 * @since: 2024-02-17
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import router from '@/router'
import { checkIsLogin, doLoginByTicket, getSsoAuthUrl } from '@/api/login'
import { CookiesKey } from '@/utils/cookies.ts'

const userStore = useUserStore()

/**
 * 从url中查询到指定名称的参数值
 *
 * @param name
 * @param defaultValue
 */
const getParam = function (name: string, defaultValue?: string) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === name) {
      return pair[1]
    }
  }
  return !defaultValue ? null : defaultValue
}

// 获取参数
const back = getParam('back') || (router.currentRoute.value.query.back as string)
console.log('获取 back 参数：', back)
const ticket = getParam('ticket') || (router.currentRoute.value.query.ticket as string)
console.log('获取 ticket 参数：', ticket)

/**
 * 页面加载后触发
 */
onMounted(async () => {
  if (ticket) {
    await handleDoLoginByTicket(ticket, back)
  } else {
    await handle2SsoAuthUrl()
  }
})

/**
 * 页面加载后触发
 */
onMounted(async () => {
  const res: any = await checkIsLogin()
  if (res.data) {
    await userStore.storeUserInfo()
  }
})

/**
 * 重定向至认证中心
 */
const handle2SsoAuthUrl = async () => {
  const res: any = await getSsoAuthUrl(location.href)
  location.href = res.data + ('&' + CookiesKey.XTenantId + '=' + userStore.tenantId)
}

/**
 * 根据ticket值登录
 *
 * @param ticket
 * @param back
 */
const handleDoLoginByTicket = async (ticket: string, back: string) => {
  const response: any = await doLoginByTicket(ticket)
  if (response.code === '0000') {
    await userStore.storeLoginInfo(response.data)
    await userStore.storeUserInfo()
    location.href = decodeURIComponent(back)
  } else {
    alert(response.message)
  }
}
</script>

<template>{{}}</template>

<style lang="scss" scoped></style>
