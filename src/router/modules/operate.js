/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const operateRouter = {
  path: '/native',
  component: Layout,
  redirect: '/native',
  name: '运维领域',
  meta: {
    title: '运维领域',
  },
}

export default operateRouter
