import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    drawerOpen: false
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
  },

  actions: {
    addToCart(product, size = 'M', quantity = 1) {
      const existingItem = this.items.find(
        item => item.id === product.id && item.size === size
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || product.image,
          size,
          quantity
        })
      }

      this.drawerOpen = true
    },

    openDrawer() {
      this.drawerOpen = true
    },

    closeDrawer() {
      this.drawerOpen = false
    },

    removeFromCart(id, size) {
      this.items = this.items.filter(
        item => !(item.id === id && item.size === size)
      )
    },

    increaseQuantity(id, size) {
      const item = this.items.find(
        item => item.id === id && item.size === size
      )

      if (item) {
        item.quantity++
      }
    },

    decreaseQuantity(id, size) {
      const item = this.items.find(
        item => item.id === id && item.size === size
      )

      if (item && item.quantity > 1) {
        item.quantity--
      }
    }
  }
})