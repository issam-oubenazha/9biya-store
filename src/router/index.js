import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Cart from '../views/Cart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },

    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetails
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    } 
  ]
})
export default router
