import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import product from './modules/product'
import user from './modules/user'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  modules: {
    cart,
    product,
    user
  },
  plugins: [vuexLocal.plugin]
})

export default store;