/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const developRouter = {
  path: '/develop',
  component: Layout,
  redirect: '/develop/project_config',
  name: '研发领域',
  meta: {
    title: '研发领域',
    // icon: 'nested'
  },
  children: [
    {
      path: '/develop/project_config',
      name: '项目配置',
      redirect: '/develop/project_config/config_project'
      ,component: () => import('@/views/develop/index'),
      meta: {title: '项目配置'}
      , children: [
        {
          path: '/develop/project_config/config_project',
          name: '配置项目',
          component: () => import('@/views/develop/project_config/ConfigProject.vue'),
          meta: {title: '配置项目'}
        }
        , {
          path: '/develop/project_config/config_project_env',
          name: '配置项目环境',
          component: () => import('@/views/develop/project_config/ConfigProjectEnv.vue'),
          meta: {title: '配置项目环境'}
        }
      ]
    },
    {
      path: '/develop/project_build',
      name: '项目构建',
      component: () => import('@/views/develop/index'),
      redirect: '/develop/project_build/build_project',
      meta: {title: '项目构建'},
      children: [
        // 数据
        {
          path: '/develop/project_build/config_git_repository_data',
          name: '配置代码仓库数据',
          component: () => import('@/views/develop/project_build/ConfigCodeRepositoryData'),
          meta: {title: '配置代码仓库数据'}
        },
        {
          path: '/develop/project_build/config_docker_repository_data',
          name: '配置docker仓库数据',
          component: () => import('@/views/develop/project_build/ConfigDockerRepositoryData'),
          meta: {title: '配置docker仓库数据'}
        },
        {
          path: '/develop/project_build/config_project_build_info_data',
          name: '配置项目构建信息数据',
          component: () => import('@/views/develop/project_build/ConfigProjectBuildInfoData'),
          meta: {title: '配置项目构建信息数据'}
        },
        // // 指令
        // {
        //   path: 'config_project_build_business',
        //   name: '配置项目构建指令',
        //   component: () => import('@/views/change/change/develop/project_build/ConfigProjectBuildBusiness'),
        //   meta: {title: '配置项目构建指令'}
        // },
        // 动作
        {
          path: '/develop/project_build/build_project',
          name: '构建项目',
          component: () => import('@/views/develop/project_build/BuildProject'),
          meta: {title: '构建项目'}
        },
      ]
    },
    {
      path: '/develop/update_project_config_file',
      name: '修改项目配置文件',
      component: () => import('@/views/develop/project_config_file/UpdateProjectConfigFile'),
      meta: {title: '修改项目配置文件'}
    },
    {
      path: '/develop/project_deploy',
      name: '项目部署',
      // component: () => import('@/views/nested/menu1/index'),
      meta: {title: '项目部署'}
    },

    {
      path: '/develop/database',
      name: '数据库',
      // component: () => import('@/views/nested/menu1/index'),
      meta: {title: '数据库'}
    },
    {
      path: '/develop/plan_task',
      name: '计划任务',
      // component: () => import('@/views/nested/menu1/index'),
      meta: {title: '计划任务'}
    }
  ]
}

export default developRouter
