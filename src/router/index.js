import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../components/User.vue'
import Admin from '../components/Admin.vue'
import Cart from '../components/userComponents/cart/Cart.vue'
import BarContent from '../components/userComponents/BarContent.vue'
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: User,
    children: [
      {
        path: '',
        component: BarContent,
      },
      {
        path: '/cart',
        component: Cart,
      }
    ]
  },
  { path: '/admin', component: Admin }
]

const router = new VueRouter({
  routes
})

export default router;