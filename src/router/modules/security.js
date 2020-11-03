/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const securityRouter = {
  path: '/security',
  component: Layout,
  name: '安全领域',
  meta: {
    title: '安全领域',
    // icon: 'nested'
  },
}

export default securityRouter
