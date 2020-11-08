import {getInfo, logout} from '@/api/user'
import {getToken, removeToken, setToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'

const state = {
  token: getToken(),
  name: 'admin',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({commit}, token) {
    commit('SET_TOKEN', token)
    setToken(token)
    // 从网络请求角色信息
    commit('SET_ROLES', ["admin"])

  },

  // get user info
  getInfo({commit, state}) {
    // commit('SET_ROLES', state["roles"])
    // commit('SET_NAME', state["name"])
    // commit('SET_AVATAR', state["avatar"])
    // commit('SET_INTRODUCTION', state["introduction"])
    return state
  },

  // user logout
  logout({commit, state, dispatch}) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()
    dispatch('tagsView/delAllViews', null, {root: true})
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({commit, dispatch}, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const {roles} = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {root: true})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
