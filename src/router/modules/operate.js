/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const operateRouter = {
  path: '/operate',
  component: Layout,
  redirect: '/operate',
  name: '运维领域',
  meta: {
    title: '运维领域',
  },
}

export default operateRouter
