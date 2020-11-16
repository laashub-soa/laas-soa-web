/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/user',
  name: '用户领域',
  meta: {
    title: '用户领域',
  },
  children: [
    {
      path: '/user/user',
      component: () => import('@/views/nested/menu1/index'),
      name: '用户',
      meta: {title: '用户'},
    },
    {
      path: '/user/role',
      component: () => import('@/views/native/operate/Operate'),
      name: '角色',
      meta: {title: '角色'},
    },
    {
      path: '/user/permission',
      component: () => import('@/views/nested/menu1/index'),
      name: '权限',
      meta: {title: '权限'},
    },
  ]
}

export default userRouter
