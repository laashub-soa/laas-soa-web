/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nativeRouter = {
  path: '/native',
  component: Layout,
  redirect: '/native/desinger',
  name: '原生领域',
  meta: {
    title: '原生领域',
    // icon: 'nested'
  },
  children: [
    {
      path: '/native/desinger',
      component: () => import('@/views/operate/designer/Designer'),
      name: '设计器',
      meta: {title: '设计器'},
    },
    {
      path: '/native/operate',
      component: () => import('@/views/operate/operate/databoard/DataBoard'),
      name: '操作台',
      meta: {title: '操作台'},
    },
    {
      path: '/native/open_data',
      // component: () => import('@/views/operate/operate/databoard/DataBoard'),
      name: '开放数据',
      meta: {title: '开放数据'},
    },
    // {
    //   path: '/native/executor',
    //   component: () => import('@/views/nested/menu1/index'),
    //   name: '执行器',
    //   meta: {title: '执行器'},
    // },
    // {
    //   path: '/native/business',
    //   component: () => import('@/views/nested/menu1/index'),
    //   name: '业务场',
    //   meta: {title: '业务场'},
    // },
  ]
}

export default nativeRouter
