/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const operateRouter = {
  path: '/operate',
  component: Layout,
  // redirect: '/operate/process/audit',
  name: '运维领域',
  meta: {
    title: '运维领域',
    // icon: 'nested'
  },
  children: [
    {
      path: 'desinger',
      component: () => import('@/views/operate/designer/Designer'), // Parent router-view
      name: '设计器',
      meta: {title: '设计器'},
    },
    {
      path: '操作台',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'operate',
      meta: {title: '操作台'},
    },
  ]
}

export default operateRouter
