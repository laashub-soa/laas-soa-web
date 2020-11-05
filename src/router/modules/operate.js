/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const operateRouter = {
  path: '/operate',
  component: Layout,
  redirect: '/operate/desinger',
  name: '运维领域',
  meta: {
    title: '运维领域',
    // icon: 'nested'
  },
  children: [
    {
      path: '/operate/desinger',
      component: () => import('@/views/operate/designer/Designer'), // Parent router-view
      name: '设计器',
      meta: {title: '设计器'},
    },
    {
      path: '/operate/operate',
      component: () => import('@/views/operate/operate/databoard/DataBoard'), // Parent router-view
      name: '操作台',
      meta: {title: '操作台'},
    },
    {
      path: '/operate/executor',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: '执行器',
      meta: {title: '执行器'},
    },
  ]
}

export default operateRouter
