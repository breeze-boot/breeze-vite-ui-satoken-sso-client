/**
 * @author: gaoweixuan
 * @since: 2023-11-12
 */

import type { Settings, UserInfoData } from '@/types/types'
import { Theme } from '@/types/types'

/**
 * 用户保存类型
 */
export interface UserState {
  userInfo: UserInfoData
  tenantId: string
  accessToken: string
  roleCodes: string[]
  permissions: string[]
}

/**
 * 系统配置保存类型
 */
export interface SettingState {
  refresh: boolean
  device: string
  theme: Theme
  settings: Settings
}

