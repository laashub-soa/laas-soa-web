// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: () => import('layout/Layout'),
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: () => import('layout/Layout'),
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('views/dashboard/index'),
        name: 'Dashboard',
        meta: {title: 'Dashboard', icon: 'dashboard', affix: true}
      }
    ]
  },
]

const asyncRoutes = [
  {
    path: '/permission',
    component: () => import('layout/Layout'),
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: () => import('views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
        }
      },
      {
        path: 'role',
        component: () => import('views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/tab',
    component: () => import('layout/Layout'),
    children: [
      {
        path: 'index',
        component: () => import('views/tab/index'),
        name: 'Tab',
        meta: {title: 'Tab', icon: 'tab'}
      }
    ]
  },

  {
    path: '/error',
    component: () => import('layout/Layout'),
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('views/error-page/401'),
        name: 'Page401',
        meta: {title: 'Page 401', noCache: true}
      },
      {
        path: '404',
        component: () => import('views/error-page/404'),
        name: 'Page404',
        meta: {title: 'Page 404', noCache: true}
      }
    ]
  },

  {
    path: '/error-log',
    component: () => import('layout/Layout'),
    redirect: 'noRedirect',
    children: [
      {
        path: 'log',
        component: () => import('views/error-log/index'),
        name: 'ErrorLog',
        meta: {title: 'Error Log', icon: 'bug'}
      }
    ]
  },


  {path: '*', redirect: '/404', hidden: true}
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
