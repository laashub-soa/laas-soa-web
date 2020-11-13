/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const workflowRouter = {
  path: '/workflow',
  component: Layout,
  redirect: '/workflow/audit',
  name: '流程领域',
  meta: {
    title: '流程领域',
  },
  children: [
    {
      path: '/workflow/audit',
      component: () => import('@/views/change/workflow/Audit'),
      name: '审批流程',
      meta: {title: '审批'}
    },
    {
      path: '/workflow/design',
      component: () => import('@/views/change/workflow/Struct'),
      name: '设计流程',
      meta: {title: '设计'}
    },
  ]
}

export default workflowRouter
