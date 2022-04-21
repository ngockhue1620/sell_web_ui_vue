export default {
  state: {
    products: []
  },
  getters: {
    listProducts: (state) => state.products
  },
  mutations: {
    INSERT_PRODUCT(state, value) {
      state.products = value
    }
  },
  actions: {
    saveProduct({ commit }, value) {
      console.log(value)
      commit('INSERT_PRODUCT', value)
    }
  }
}