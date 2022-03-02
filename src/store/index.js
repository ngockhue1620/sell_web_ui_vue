import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import product from './modules/product'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cart,
    product,
    user
  }
})

export default store;