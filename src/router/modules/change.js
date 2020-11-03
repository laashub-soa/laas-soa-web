/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const changeRouter = {
  path: '/change',
  component: Layout,
  redirect: '/change/process/audit',
  name: '变更领域',
  meta: {
    title: '变更领域',
    // icon: 'nested'
  },
  children: [
    {
      path: 'process',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: '流程',
      meta: {title: '流程'},
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'audit',
          component: () => import('@/views/nested/menu1/index'),
          name: '审批',
          meta: {title: '审批'}
        },
        {
          path: 'design',
          component: () => import('@/views/nested/menu1/index'),
          name: '设计',
          meta: {title: '设计'}
        },
      ]
    },
    {
      path: 'change',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: '变更业务',
      meta: {title: '变更'},
      redirect: '/nested/menu2/menu2-1',
      children: [
        {
          path: 'project_build',
          name: '项目构建',
          component: () => import('@/views/nested/menu1/index'),
          meta: {title: '项目构建'}
        },
        {
          path: 'project_build',
          name: '项目部署',
          component: () => import('@/views/nested/menu1/index'),
          meta: {title: '项目部署'}
        },
        {
          path: 'config_file',
          name: '配置文件',
          component: () => import('@/views/nested/menu1/index'),
          meta: {title: '配置文件'}
        },
        {
          path: 'database',
          name: '数据库',
          component: () => import('@/views/nested/menu1/index'),
          meta: {title: '数据库'}
        },
        {
          path: 'plan_task',
          name: '计划任务',
          component: () => import('@/views/nested/menu1/index'),
          meta: {title: '计划任务'}
        }
      ]
    },
  ]
}

export default changeRouter
