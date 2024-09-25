<!--
 * @author: gaoweixuan
 * @since: 2023-11-12
-->
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useSettingStore from '@/store/modules/setting'
import { storeToRefs } from 'pinia'
import { THEME } from '@/utils/common.ts'
import SvgButton from '@/components/SvgButton/index.vue'
import { SelectData } from '@/types/types.ts'
import { checkIsLogin } from '@/api/login'
import { ElMessage } from 'element-plus'

let $router = useRouter()
let settingStore = useSettingStore()
let { theme, settings } = storeToRefs(settingStore)
let loading = ref(false)
let userStore = useUserStore()
// 单点登录地址
const loginUrl = '/sso-login?back=' + encodeURIComponent(location.href)

/**
 * 初始化
 */
onMounted(async () => {
  await userStore.clearLoginInfo()
  changeDark()
  changeThemeColor()
  await initSelectTenant()
  const res: any = await checkIsLogin()
  if (!userStore.tenantId) {
    ElMessage.warning('请先选择租户')
    return
  }
  if (res.data) {
    await $router.push(loginUrl)
  }
})

const tenantOption = ref<SelectData[]>()

/**
 * 初始化自定义行权限下拉框数据
 */
const initSelectTenant = async () => {
  tenantOption.value = [
    {
      value: '1',
      label: '公司',
    },
  ]
}

/**
 * 切换日间/夜间模式
 */
const changeDark = () => {
  let html = document.documentElement
  if (theme.value.themeModel !== THEME.DARK) {
    html.classList.remove(THEME.DARK)
    return
  }
  html.classList.add(THEME.DARK)
}

/**
 * 改变主题颜色
 */
const changeThemeColor = () => {
  document.documentElement.style.setProperty('--el-color-primary', theme.value.themeColor)
}

/**
 * 标题动态获取计算属性
 */
const title = computed(() => {
  return settings.value.title
})

/**
 * 获取当前租户
 */
const tenantId = computed({
  get: () => {
    return userStore.tenantId
  },
  set: (value) => {
    userStore.storeTenantId(value)
  },
})

/**
 * 获取当前租户
 */
const tenantName = computed(() => {
  return tenantOption.value?.find((item) => item?.value === tenantId.value)?.label
})
</script>

<template>
  <el-watermark
    :font="theme.themeModel === THEME.DARK ? theme.lightFont : theme.darkFont"
    :content="theme.watermarkContent"
  >
    <div class="login_container">
      <div class="tenant">
        <el-popover placement="bottom" trigger="hover">
          <el-select
            @change="() => userStore.storeTenantId(tenantId || '1')"
            :teleported="false"
            v-model="tenantId"
            style="width: 120px"
          >
            <el-option v-for="item in tenantOption" :key="item?.value" :label="item?.label" :value="item?.value" />
          </el-select>
          <template #reference>
            <svg-button
              :style="{ background: 'transparent !important' }"
              :circle="true"
              icon="tenant"
              width="2rem"
              height="2rem"
            />
          </template>
        </el-popover>
      </div>

      <div class="login-form-card">
        <h1>{{ title }}</h1>
        <router-link :to="loginUrl">
          <svg-button
            :style="{ background: 'transparent !important' }"
            :circle="true"
            :loading="loading"
            icon="sso"
            width="10rem"
            height="10rem"
            type="primary"
          />
        </router-link>
        <div class="tenant-name">{{ tenantName }}</div>
      </div>
    </div>
  </el-watermark>
</template>

<style lang="scss" scoped>
.login_container {
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(circle at 48.7% 44.3%, rgb(254, 254, 254) 10.5%, rgb(181, 239, 249) 50%);

  .tenant {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 100;
  }

  .login-form-card {
    border: none;
    position: absolute;
    top: 20vh;
    left: 50%;
    width: 28rem;
    height: 25rem;
    transform: translateX(-50%);
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h1 {
      margin-top: -10px;
      margin-bottom: 100px;
      font-size: 40px;
      font-weight: 700;
      text-align: center;
      background: linear-gradient(to right, blue, rgb(35 60 70));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .tenant-name {
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      height: 50px;
      padding: 10px;
      z-index: 999;
    }
  }
}

.el-card {
  box-shadow: rgb(0 0 0 / 24%) 0 0 3px;
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
