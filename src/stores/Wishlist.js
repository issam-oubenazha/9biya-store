import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: []
  }),

  getters: {
    totalItems: (state) => state.items.length,

    isInWishlist: (state) => {
      return (productId) =>
        state.items.some(item => item.id === productId)
    }
  },

  actions: {
    toggleWishlist(product) {
      const index = this.items.findIndex(
        item => item.id === product.id
      )

      if (index !== -1) {
        this.items.splice(index, 1)
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.images?.[0] || product.image
        })
      }
    },

    removeFromWishlist(productId) {
      this.items = this.items.filter(
        item => item.id !== productId
      )
    }
  }
})