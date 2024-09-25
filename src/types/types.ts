/**
 * @author: gaoweixuan
 * @since: 2023-11-12
 *
 * =====================
 * 此处用来声明公共的类型
 * =====================
 */
import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/utils/common.ts'

/**
 * 下拉框公共参数
 */
export interface SelectData {
  value: number | string | boolean
  label: string
  children?: SelectData[]
}

/**
 * 公共返回参数
 */
export interface ResponseData {
  code: number | string
  message: string
  timestamp: bigint
  data:
    | {
        records: object
        total: number
        size: number
        current: number
        pages: number
      }
    | boolean
    | object
}

/**
 * 权限参数
 */
export interface AuthoritiesData {
  authority: string
}

/**
 * 权限数组参数
 */
export type AuthoritiesDatas = AuthoritiesData[]

/**
 * 登录用户参数
 */
export interface UserInfoData {
  password: null
  username: string
  avtar: string
  tenantId: string
  permissions: object
  authorities: AuthoritiesDatas
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  enabled: boolean
  id: number
  deptId: number
  deptName: string
  userCode: string
  displayName: string
  avatar: string
  phone: string
  sex: number
  idCard: string
  amountType: number
  isLock: number
  openId: string
  email: string
  userRoleCodes: string[]
  userRoleIds: number[]
  excludeColumn: string[]
}

/**
 * 权限数据类型
 */
export interface PermissionData {
  id: string
  parentId: string
  weight: number
  name: string
  path: string
  component: string
  keepAlive: number
  hidden: number
  icon: string
  permission: string
  href: number
  platformId: string
  sort: number
  title: string
  platformName: null
  type: number
  children: PermissionDatas | RouteRecordRaw[]
}

/**
 * 权限数据数组类型
 */
export type PermissionDatas = PermissionData[]

/**
 * 缓存值名称
 */
export enum StorageName {
  INIT_MENU = 'INIT_MENU',
  AccessToken = 'ACCESS_TOKEN',
  RoleCodes = 'ROLE_CODES',
  Permissions = 'PERMISSIONS',
  UserInfo = 'USER_INFO',
  Columns = 'COLUMNS',
  AcceptLanguage = 'Accept-Language',
  Authorization = 'Authorization',
  mixMenuRoutes = 'MIX_MENU_ROUTES',
  menuRoutes = 'MENU_ROUTES',
}

/**
 * pinia 字典保存参数
 *
 * [
 *   {
 *     code  : dictName,
 *     value :
 *        {
 *            label?: string
 *            value?: string
 *            type?: string
 *        },
 *   }
 * ]
 */
export interface Dict {
  [idx: number]: DictItem
}

/**
 * 字典项保存参数
 */
export interface DictItem {
  value?: number
  label?: string
  type?: string
}

/**
 * 设置类型
 */
export interface Settings {
  title: string
  showAvatar: boolean
  isCollapse: boolean
  logoHidden: boolean
  logoUrl: any
  language: string
}

/**
 * 设置主题类型
 */
export interface Theme {
  menuLayout: MenuLayout
  watermark: boolean
  watermarkContent: string[]
  themeModel: string
  lightFont: object
  darkFont: object
  themeColor: string
  size: string
}

export type MenuLayout = LAYOUT

/**
 * Tab类型
 */
export interface Tab {
  title: string
  name: string
  path: string
  fullPath: string
  query?: object
  params?: object
  keepAlive: boolean
  hidden: boolean
}
