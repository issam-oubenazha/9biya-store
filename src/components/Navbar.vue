<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { products } from '../data/products'

const menuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')

const cart = useCartStore()

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.toLowerCase()

  return products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.color.toLowerCase().includes(query)
  )
})

function closeSearch() {
  searchOpen.value = false
  searchQuery.value = ''
}
</script>

<template>
    <!-- SEARCH -->
        <div
        v-if="searchOpen"
        class="search-overlay"
        >
        <div class="search-box">

            <div class="search-top">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="SEARCH PRODUCTS..."
                autofocus
            />

            <button @click="closeSearch">
                ×
            </button>
            </div>

            <div
            v-if="searchQuery"
            class="search-results"
            >

            <RouterLink
                v-for="product in searchResults"
                :key="product.id"
                :to="`/product/${product.id}`"
                class="search-result"
                @click="closeSearch"
            >
                <img
                :src="product.images?.[0]"
                :alt="product.name"
                />

                <div>
                <p>{{ product.name }}</p>
                <span>{{ product.price }} DH</span>
                </div>
            </RouterLink>

            <p
                v-if="searchResults.length === 0"
                class="no-results"
            >
                NO PRODUCTS FOUND
            </p>

            </div>

        </div>
        </div>
  <header class="navbar">

    <!-- LOGO -->
    <RouterLink to="/" class="logo">
      QBIYA
    </RouterLink>

    <!-- DESKTOP NAV -->
    <nav class="desktop-nav">
      <RouterLink to="/">NEW IN</RouterLink>
      <RouterLink to="/shop">SHOP</RouterLink>
      <RouterLink to="/shop?category=homme">HOMME</RouterLink>
      <RouterLink to="/shop?category=femme">FEMME</RouterLink>
      <RouterLink to="/about">ABOUT</RouterLink>
    </nav>

    <!-- ACTIONS -->
    <div class="actions">

        <button class="icon-button"
             aria-label="Search"
            @click="searchOpen = !searchOpen"
        >
             ⌕
        </button>

      <RouterLink
        to="/account"
        class="icon-button"
        aria-label="Account"
      >
        ♙
      </RouterLink>

      <RouterLink
        to="/cart"
        class="cart"
      >
        ♧

        <span
          v-if="cart.totalItems > 0"
          class="cart-count"
        >
          {{ cart.totalItems }}
        </span>
      </RouterLink>

      <button
        class="menu-button"
        @click="menuOpen = !menuOpen"
        aria-label="Menu"
      >
        ☰
      </button>

    </div>

    <!-- MOBILE MENU -->
    <div
      v-if="menuOpen"
      class="mobile-menu"
    >
      <RouterLink
        to="/"
        @click="menuOpen = false"
      >
        NEW IN
      </RouterLink>

      <RouterLink
        to="/shop"
        @click="menuOpen = false"
      >
        SHOP
      </RouterLink>

      <RouterLink
        to="/shop?category=homme"
        @click="menuOpen = false"
      >
        HOMME
      </RouterLink>

      <RouterLink
        to="/shop?category=femme"
        @click="menuOpen = false"
      >
        FEMME
      </RouterLink>

      <RouterLink
        to="/about"
        @click="menuOpen = false"
      >
        ABOUT
      </RouterLink>
    </div>

  </header>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(255, 255, 255, 0.98);
}

.search-box {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 30px 40px;
}

.search-top {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #111;
}

.search-top input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;

  font-size: 28px;
  font-weight: 400;
  padding: 20px 0;
}

.search-top input::placeholder {
  color: #aaa;
}

.search-top button {
  border: none;
  background: none;
  font-size: 32px;
  cursor: pointer;
}

.search-results {
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.search-result {
  display: flex;
  gap: 15px;
  color: #111;
  text-decoration: none;
}

.search-result img {
  width: 90px;
  height: 110px;
  object-fit: cover;
  background: #f5f5f5;
}

.search-result p {
  font-size: 12px;
  margin: 10px 0;
  letter-spacing: 1px;
}

.search-result span {
  font-size: 12px;
  color: #666;
}

.no-results {
  color: #777;
  font-size: 11px;
  letter-spacing: 2px;
}

@media (max-width: 600px) {
  .search-box {
    padding: 80px 20px;
  }

  .search-top input {
    font-size: 20px;
  }

  .search-results {
    grid-template-columns: 1fr;
  }
}
.navbar {
  height: 78px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  color: #111;
  text-decoration: none;
  font-size: 23px;
  font-weight: 600;
  letter-spacing: 5px;
}

.desktop-nav {
  display: flex;
  gap: 35px;
  margin-left: auto;
  margin-right: 45px;
}

.desktop-nav a {
  color: #111;
  text-decoration: none;
  font-size: 10px;
  letter-spacing: 2px;
}

.desktop-nav a:hover {
  opacity: 0.5;
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-button,
.cart {
  border: none;
  background: none;
  color: #111;
  text-decoration: none;
  cursor: pointer;
  font-size: 21px;
  padding: 0;
}

.cart {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -9px;
  right: -10px;

  min-width: 16px;
  height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: #111;
  color: white;

  font-size: 8px;
  line-height: 1;
}

.menu-button {
  display: none;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}

.mobile-menu {
  display: none;
}

/* MOBILE */

@media (max-width: 800px) {
  .navbar {
    height: 70px;
    padding: 0 20px;
  }

  .desktop-nav {
    display: none;
  }

  .menu-button {
    display: block;
  }

  .mobile-menu {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: white;
    border-bottom: 1px solid #eee;

    display: flex;
    flex-direction: column;
  }

  .mobile-menu a {
    padding: 20px;
    color: #111;
    text-decoration: none;
    font-size: 11px;
    letter-spacing: 2px;
    border-bottom: 1px solid #eee;
  }

  .actions {
    gap: 15px;
  }
}
</style>