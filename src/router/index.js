import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../components/User.vue'
import Admin from '../components/Admin.vue'
import Cart from '../components/userComponents/cart/Cart.vue'
import CartInProgress from '../components/userComponents/cart/CartInProgress.vue'
import BarContent from '../components/userComponents/BarContent.vue'
import store from '../store/index'
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: User,
    children: [
      {
        path: '',
        component: BarContent,
        name: 'home'
      },
      {
        path: '/cart',
        component: Cart,
        meta: { requireAuth: true }
      },
      {
        path: '/cart-in-progress',
        component: CartInProgress,
        meta: { requireAuth: true }
      }
    ]
  },
  { path: '/admin', component: Admin }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user?.isLogin) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    next()
  }
})
export default router;