import router from '@/router'
import setting from '@/setting'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
import { GET_STRING_STORAGE, SET_STRING_STORAGE } from '@/utils/storage.ts'
import { StorageName } from '@/types/types.ts'
import { checkIsLogin } from '@/api/login'

nprogress.configure({ showSpinner: false })

const whiteRoute: string[] = ['/redirect', '/sso-login', '/sso']
const userStore = useUserStore(pinia)

/**
 * 全局前置守卫
 */
router.beforeEach(async (to, from, next) => {
  document.title = (to.meta.title || '') + ` | ${setting.title}`
  nprogress.start()

  const token = userStore.accessToken as string
  const res = await checkIsLogin()
  // 用户未登录
  if (!token || !res.data) {
    if (whiteRoute.includes(to.path)) {
      next() // 白名单路由直接放行
      return
    } else {
      next({ path: '/sso', query: { redirect: to.path, ...to.query } }) // 重定向到SSO
      return
    }
  }

  const initMenu: string = GET_STRING_STORAGE(StorageName.INIT_MENU)

  if (initMenu === '1') {
    // 菜单已初始化
    if (to.path === '/sso') {
      next({ path: '/' }) // 重定向到主页
      return
    }

    // 处理无效路由
    if (to.matched.length === 0) {
      from.name ? next({ name: from.name }) : next('/404') // 导航到上一个路由或404页面
      return
    }

    // 继续导航
    next()
  } else {
    // 菜单未初始化
    try {
      SET_STRING_STORAGE(StorageName.INIT_MENU, '1')
      next({ ...to, replace: true }) // 加载菜单后重定向
    } catch (error) {
      await userStore.logout() // 登出操作
      // 重定向到SSO
      next({ path: '/sso', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach(() => {
  nprogress.done()
})
