import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // 是否已经登录
  const hasToken = getToken()
  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
    return
  }
  // 是否跳转登录界面
  if (to.path === '/login') {
    next({path: '/'})
    NProgress.done()
    return
  }
  // 是否已经初始化界面路由
  if (window.is_init_page) { // 已经初始化过界面了
    next()
    return
  }
  // 初始化界面路由
  try {
    // const page_permission = get_page_permission(); // 查询页面权限
    const accessRoutes = await store.dispatch('permission/generateRoutes', null)
    router.addRoutes(accessRoutes)
    console.log("初始化界面路由")
    window.is_init_page = true;
    next({...to, replace: true})
  } catch (error) {
    await store.dispatch('user/resetToken')
    Message.error(error || 'Has Error')
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})
router.afterEach(() => {
  NProgress.done()
})
