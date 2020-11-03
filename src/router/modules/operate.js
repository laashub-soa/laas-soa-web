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
      path: 'cmdb',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'CMDB',
      meta: {title: 'CMDB'},
    },
    {
      path: '业务',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'business',
      meta: {title: '业务'},
    },
  ]
}

export default operateRouter
