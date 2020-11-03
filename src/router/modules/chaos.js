/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const chaosRouter = {
  path: '/chaos',
  component: Layout,
  name: '混沌领域',
  meta: {
    title: '混沌领域',
    // icon: 'nested'
  },
}

export default chaosRouter
