export default {
  state: {
    products: [],
    orderInProgeess: [],
  },
  getters: {
    totalProductInCart: (state) => {
      let total = 0;
      state.products.forEach(element => {
        total += parseInt(element.quantity)
      });
      return total
    },
    totalMoney: (state) => {
      let total = 0
      state.products.map(item => {
        total += parseInt(item.price) * parseInt(item.quantity)
      })
      return total
    },
    productInCart: (state) => state.products
  },
  mutations: {
    ADD_TO_CART(state, value) {
      let index = state.products.findIndex(item => item.id === value.product.id)
      if (index === -1) {
        let updateProduct = value.product
        updateProduct.quantity = value.quantity
        state.products.push(value.product)
      } else {
        state.products[index].quantity += value.quantity
      }
    },
    REMOVE(state, value) {
      if (value.type === 'all') {
        state.products = []
      } else {
        let index = state.products.findIndex(item => item.id === value.id)
        state.products.splice(index, 1)
      }

    }
  },
  actions: {
    addToCart({ commit }, value) {
      console.log(value)
      commit('ADD_TO_CART', value)
    },
    remove({ commit }, value) {
      commit('REMOVE', value)
    }
  }
}