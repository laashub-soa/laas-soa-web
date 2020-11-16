/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const monitorRouter = {
  path: '/monitor',
  component: Layout,
  // redirect: '/operate/process/audit',
  name: '监控领域',
  meta: {
    title: '监控领域',
    // icon: 'nested'
  },
  // children: [
  //   {
  //     path: 'frontend',
  //     component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //     name: '前端',
  //     meta: {title: '前端'},
  //   },
  //   {
  //     path: 'host_cluster',
  //     component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //     name: '主机和主机层',
  //     meta: {title: '主机和主机层'},
  //   },
  //   {
  //     path: 'middleware',
  //     component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //     name: '中间件层',
  //     meta: {title: '中间件层'},
  //   },
  //   {
  //     path: 'service',
  //     component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //     name: '服务层',
  //     meta: {title: '服务层'},
  //   },
  // ]
}

export default monitorRouter
