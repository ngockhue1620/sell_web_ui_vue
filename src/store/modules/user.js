export default {
  state: {
    user: {},
    isLogin: false,
    token: '',
  },
  getters: {
    isLogin: (state) => state.isLogin,
    user: (state) => state.user,
    token: (state) => state.token
  },
  mutations: {
    LOGIN_LOGOUT(state, data) {
      if (data.type === "login") {
        state.user = data.user
        state.isLogin = true
        state.token = data.token
      }
      if (data.type === "logout") {
        state.user = {}
        state.isLogin = false
        state.token = ""
      }
    },
    CHANGE_DATA_USER(state, data) {
      state.user = data
    }
  },
  actions: {
    loginOrLogout({ commit }, data) {
      commit('LOGIN_LOGOUT', data)
    },
    changeDataUser({ commit }, data) {
      commit('CHANGE_DATA_USER', data)
    }
  }
}