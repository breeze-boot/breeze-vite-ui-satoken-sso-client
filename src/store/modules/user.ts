/**
 * @author: gaoweixuan
 * @since: 2023-11-12
 */
import { defineStore } from 'pinia'
import type { LoginResponseData } from '@/api/login/type'
import { type UserState } from './types/types'
import { userInfo } from '@/api/login'
import {
  CLEAR_STORAGE,
  GET_ARRAY_STORAGE,
  GET_OBJ_STORAGE,
  GET_STRING_STORAGE,
  SET_STORAGE,
  SET_STRING_STORAGE,
} from '@/utils/storage'
import { AuthoritiesData, AuthoritiesDatas, StorageName, UserInfoData } from '@/types/types'
import { CookiesKey, CookiesStorage } from '@/utils/cookies.ts'

/**
 * 过滤出按钮权限
 *
 * @param userInfo
 */
const filterPermissions = (userInfo: UserInfoData): string[] => {
  if (!userInfo) {
    return []
  }
  const PERMISSIONS = [] as string[]

  ;(userInfo.authorities as AuthoritiesDatas).forEach((item: AuthoritiesData) => {
    PERMISSIONS.push(item.authority)
  })
  return PERMISSIONS
}

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      userInfo: GET_OBJ_STORAGE(StorageName.UserInfo) as UserInfoData,
      tenantId: CookiesStorage.get(CookiesKey.XTenantId) as string,
      accessToken: GET_STRING_STORAGE(StorageName.AccessToken) as string,
      roleCodes: GET_ARRAY_STORAGE(StorageName.RoleCodes) as string[],
      permissions: GET_ARRAY_STORAGE(StorageName.Permissions) as string[],
    }
  },
  actions: {
    /**
     * 用户信息
     */
    async storeUserInfo(): Promise<LoginResponseData> {
      const response: any = await userInfo()

      if (response.data) {
        const user_info = response?.data as UserInfoData
        // 持久化
        this.userInfo = user_info as UserInfoData
        SET_STORAGE(StorageName.UserInfo, this.userInfo as UserInfoData)

        this.tenantId = user_info.tenantId as string
        CookiesStorage.set(CookiesKey.XTenantId, this.userInfo.tenantId as string)

        this.roleCodes = user_info.userRoleCodes as string[]
        SET_STORAGE(StorageName.RoleCodes, this.roleCodes as string[])

        this.permissions = filterPermissions(user_info) as string[]
        SET_STORAGE(StorageName.Permissions, this.permissions as string[])

        return response
      }
      return {} as LoginResponseData
    },
    /**
     * 退出登录
     */
    async logout() {
      let href = ''
      const env = import.meta.env.VITE_APP_BASE_API
      if (env === 'development') {
        href = import.meta.env.VITE_APP_SSO_BASE_SERVER
      } else {
        href = import.meta.env.VITE_APP_SSO_BASE_SERVER + '/api'
      }
      href += '/sso/logout?satoken=' + this.accessToken + '&back=' + encodeURIComponent(location.origin)
      location.href = href
      await this.clearLoginInfo()
    },
    /**
     * 退出登录
     */
    async clearLoginInfo() {
      this.userInfo = {} as UserInfoData
      this.accessToken = '' as string
      this.permissions = [] as string[]
      this.roleCodes = [] as string[]
      CLEAR_STORAGE()
    },
    /**
     * 保存登录信息
     */
    async storeLoginInfo(accessToken: string) {
      this.accessToken = accessToken
      SET_STRING_STORAGE(StorageName.AccessToken, this.accessToken as string)
    },
    /**
     * 保存租户信息
     */
    storeTenantId(tenantId: string) {
      this.tenantId = tenantId
      CookiesStorage.set(CookiesKey.XTenantId, tenantId)
    },
  },
  getters: {
    /**
     * 获取权限信息
     *
     * @param state
     */
    getPermissions: (state: UserState) => {
      return async (): Promise<string[]> => {
        return (
          state.permissions.length > 0 ? state.permissions : (GET_ARRAY_STORAGE(StorageName.Permissions) as string[])
        ) as string[]
      }
    },
    /**
     * 获取角色信息
     *
     * @param state
     */
    getRoleCodes: (state: UserState) => {
      return async (): Promise<string[]> => {
        return (
          state.roleCodes.length > 0 ? state.roleCodes : (GET_ARRAY_STORAGE(StorageName.RoleCodes) as string[])
        ) as string[]
      }
    },
  },
})

export default useUserStore
