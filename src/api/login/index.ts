/**
 * @author: gaoweixuan
 * @since: 2023-11-12
 */
import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { PermissionResponseData } from './type'

/**
 * 校验是否登录
 */
export function checkIsLogin(): AxiosPromise<PermissionResponseData> {
  return request({
    url: '/sso/isLogin',
    method: 'get',
  })
}

/**
 * 获取sso地址
 */
export function getSsoAuthUrl(back: string): AxiosPromise<PermissionResponseData> {
  return request({
    url: '/sso/getSsoAuthUrl',
    method: 'get',
    params: { clientLoginUrl: back },
  })
}

/**
 * sso 使用 ticket获取 token
 */
export function doLoginByTicket(ticket: string) {
  return request({
    url: '/sso/doLoginByTicket',
    method: 'get',
    params: {
      ticket,
    },
  })
}

/**
 * sso 用户信息
 */
export function userInfo() {
  return request({
    url: '/sso/userInfo',
    method: 'get',
  })
}
