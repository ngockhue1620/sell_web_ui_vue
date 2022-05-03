import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt_decode from "jwt-decode";
import store from '../store/index'


import User from '../components/User.vue'
import Cart from '../components/userComponents/cart/Cart.vue'
import OrderInProgress from '../components/userComponents/cart/OrderInProgress.vue'
import OrderHistory from '../components/userComponents/cart/OrderHistory.vue'
import BarContent from '../components/userComponents/BarContent.vue'
import ProductDetail from '../components/userComponents/product/ProductDetail.vue'

import Login from '../components/adminComponents/Login.vue'
import Admin from '../components/Admin.vue'
import AMProduct from '../components/adminComponents/product/List.vue'
import AMAddProduct from '../components/adminComponents/product/Add.vue'
import AMProductDetail from '../components/adminComponents/product/ProductDetail.vue'
import AMMOrder from '../components/adminComponents/order/manage.vue'

import AMCategory from '../components/adminComponents/category/List.vue'

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
        path: '/order-in-progress',
        component: OrderInProgress,
        meta: { requireAuth: true }
      },
      {
        path: '/order-history',
        component: OrderHistory,
        meta: { requireAuth: true }
      },
      {
        path: '/product/:id',
        component: ProductDetail,
        meta: { requireAuth: false },
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        component: AMProduct,
        meta: { requireAuth: true },
      },
      {
        path: 'add-product',
        component: AMAddProduct,
        meta: { requireAuth: true },
      },
      {
        path: 'manage-order',
        component: AMMOrder,
        meta: { requireAuth: true },
      },
      {
        path: 'product/:id',
        component: AMProductDetail,
        meta: { requireAuth: false },
      },
      {
        path: 'category',
        component: AMCategory,
        meta: { requireAuth: true },
      },
    ],
    meta: { requireAuth: true },
    name: "admin"
  },
  {
    path: '/login',
    component: Login,
    meta: { requireAuth: false },
    name: 'admin-login'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user?.isLogin) {
      console.log(to)
      const re = /admin/
      if (re.exec(to.fullPath)) {
        var decoded = jwt_decode(store.state.user?.token);
        if (decoded.admin) {
          next()
        } else {
          next({ name: 'admin-login' })
        }
      }
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    next()
  }
})
export default router;