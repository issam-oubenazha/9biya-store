<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { products } from '../data/products'
import { useWishlistStore } from '../stores/wishlist'
import CartDrawer from './CartDrawer.vue'

const menuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const cart = useCartStore()
const wishlist = useWishlistStore()
const accountOpen = ref(false)
const isScrolled = ref(false)

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

function updateScrollState() {
  isScrolled.value = window.scrollY > 12
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeSearch()
    menuOpen.value = false
    accountOpen.value = false
  }
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('keydown', handleEscape)
})
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
  <header class="navbar" :class="{ 'is-scrolled': isScrolled }">
    <RouterLink to="/" class="logo" aria-label="QBIYA home">QBIYA</RouterLink>

    <nav class="desktop-nav" aria-label="Main navigation">
      <RouterLink to="/shop">NEW IN</RouterLink>
      <RouterLink to="/shop">COLLECTION</RouterLink>
      <RouterLink to="/shop?category=homme">HOMME</RouterLink>
      <RouterLink to="/shop?category=femme">FEMME</RouterLink>
      <RouterLink to="/about">ABOUT</RouterLink>
    </nav>

    <div class="actions">
      <button
        class="icon-button"
        type="button"
        aria-label="Search products"
        @click="searchOpen = true"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 4.4 4.4" /></svg>
      </button>

      <RouterLink to="/wishlist" class="icon-button wishlist-link" aria-label="Wishlist">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 8.6c0 4.2-8.4 10-8.4 10s-8.4-5.8-8.4-10a4.4 4.4 0 0 1 8.4-1.7 4.4 4.4 0 0 1 8.4 1.7Z" /></svg>
        <span v-if="wishlist.totalItems > 0" class="count-badge">{{ wishlist.totalItems }}</span>
      </RouterLink>

      <div class="account-wrap">
        <button
          class="icon-button"
          type="button"
          aria-label="Account shortcuts"
          aria-expanded="accountOpen"
          @click="accountOpen = !accountOpen"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M4.8 20c.6-3.5 3.3-5.5 7.2-5.5s6.6 2 7.2 5.5" /></svg>
        </button>
        <div v-if="accountOpen" class="account-popover">
          <p>YOUR QBIYA</p>
          <span>Saved pieces and customer care, all in one place.</span>
          <RouterLink to="/wishlist" @click="accountOpen = false">VIEW WISHLIST <span>→</span></RouterLink>
          <RouterLink to="/contact" @click="accountOpen = false">CONTACT US <span>→</span></RouterLink>
        </div>
      </div>

      <button
        class="icon-button bag-button"
        type="button"
        aria-label="Open shopping bag"
        @click="cart.openDrawer"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
        <span v-if="cart.totalItems > 0" class="count-badge">{{ cart.totalItems }}</span>
      </button>

      <button
        class="menu-button"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span>
      </button>
    </div>

    <Transition name="mobile-menu">
      <nav v-if="menuOpen" class="mobile-menu" aria-label="Mobile navigation">
        <RouterLink to="/shop" @click="menuOpen = false">NEW IN</RouterLink>
        <RouterLink to="/shop" @click="menuOpen = false">COLLECTION</RouterLink>
        <RouterLink to="/shop?category=homme" @click="menuOpen = false">HOMME</RouterLink>
        <RouterLink to="/shop?category=femme" @click="menuOpen = false">FEMME</RouterLink>
        <RouterLink to="/about" @click="menuOpen = false">ABOUT</RouterLink>
        <RouterLink to="/contact" @click="menuOpen = false">CONTACT</RouterLink>
      </nav>
    </Transition>
  </header>
  <CartDrawer />
</template>

<style scoped>
.bottom-nav {
  position: fixed;

  left: 50%;
  bottom: 22px;

  transform: translateX(-50%);

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 4px;

  padding: 7px;

  background: rgba(10, 10, 10, 0.94);

  border: 1px solid #292929;

  border-radius: 50px;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.18);

  backdrop-filter: blur(12px);

  white-space: nowrap;
}

/* ITEM */

.bottom-nav-item {
  position: relative;

  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #aaa;

  text-decoration: none;

  border-radius: 50%;

  transition:
    color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}

.bottom-nav-item span {
  font-size: 20px;
  line-height: 1;
}

/* HOVER */

.bottom-nav-item:hover {
  color: #fff;
  background: #1b1b1b;
  transform: translateY(-2px);
}

/* ACTIVE PAGE */

.bottom-nav-item.router-link-exact-active {
  background: #fff;
  color: #000;
}

.bottom-nav-item.router-link-exact-active:hover {
  background: #fff;
  color: #000;
}

/* COUNTER */

.bottom-nav-item small {
  position: absolute;

  top: 3px;
  right: 3px;

  min-width: 13px;
  height: 13px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #fff;
  color: #000;

  font-size: 7px;
  font-weight: 600;
}

/* MOBILE */

@media (max-width: 600px) {

  .bottom-nav {
    bottom: 14px;
    gap: 2px;
    padding: 6px;
  }

  .bottom-nav-item {
    width: 39px;
    height: 39px;
  }

  .bottom-nav-item span {
    font-size: 18px;
  }
}

/* SPACE FOR FIXED NAV */

:global(body) {
  padding-bottom: 90px;
}
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
  .wishlist-link {
  position: relative;
  color: #111;
  text-decoration: none;
  font-size: 22px;
  line-height: 1;
}

.wishlist-count {
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
}
</style>

<style scoped>
:global(body) {
  padding-bottom: 0;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 2000;
  height: 78px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 clamp(22px, 5vw, 76px);
  border-bottom: 1px solid rgb(23 23 20 / 7%);
  background: rgb(255 255 255 / 88%);
  backdrop-filter: blur(14px);
  transition: background 250ms ease, box-shadow 250ms ease;
}

.navbar.is-scrolled {
  background: rgb(255 255 255 / 97%);
  box-shadow: 0 5px 20px rgb(23 23 20 / 5%);
}

.logo {
  justify-self: start;
  color: var(--ink);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-decoration: none;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(18px, 2.5vw, 38px);
  margin: 0;
}

.desktop-nav a {
  position: relative;
  padding: 9px 0;
  color: var(--ink);
  font-size: 9px;
  letter-spacing: 1.6px;
  text-decoration: none;
}

.desktop-nav a::after {
  position: absolute;
  right: 0;
  bottom: 3px;
  left: 0;
  height: 1px;
  content: '';
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 250ms ease;
}

.desktop-nav a:hover::after,
.desktop-nav a.router-link-active::after {
  transform: scaleX(1);
}

.actions {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 19px;
}

.icon-button,
.wishlist-link {
  position: relative;
  width: 24px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  text-decoration: none;
}

.icon-button svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.35;
  transition: transform 200ms ease;
}

.icon-button:hover svg {
  transform: translateY(-1px);
}

.count-badge {
  position: absolute;
  top: 0;
  right: -8px;
  min-width: 15px;
  height: 15px;
  display: grid;
  place-items: center;
  padding: 0 3px;
  border-radius: 50%;
  background: var(--ink);
  color: #fff;
  font-size: 8px;
  line-height: 1;
}

.account-wrap {
  position: relative;
}

.account-popover {
  position: absolute;
  top: calc(100% + 20px);
  right: -50px;
  width: 260px;
  padding: 23px;
  border: 1px solid var(--line);
  background: #fff;
  box-shadow: 0 16px 38px rgb(23 23 20 / 10%);
  animation: popover-in 180ms ease both;
}

.account-popover > p {
  margin: 0 0 8px;
  font-size: 10px;
  letter-spacing: 1.5px;
}

.account-popover > span {
  display: block;
  margin-bottom: 18px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.6;
}

.account-popover a {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid var(--line);
  color: var(--ink);
  font-size: 9px;
  letter-spacing: 1.2px;
  text-decoration: none;
}

.account-popover a:hover {
  color: var(--accent);
}

.menu-button {
  display: none;
  width: 28px;
  height: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.menu-button span {
  width: 18px;
  height: 1px;
  background: var(--ink);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 8px 22px 20px;
  border-bottom: 1px solid var(--line);
  background: #fff;
  box-shadow: 0 12px 20px rgb(23 23 20 / 5%);
}

.mobile-menu a {
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  font-size: 10px;
  letter-spacing: 1.7px;
  text-decoration: none;
}

.mobile-menu a:last-child {
  border-bottom: 0;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 2500;
  overflow-y: auto;
  background: rgb(255 255 255 / 98%);
  animation: search-in 220ms ease both;
}

.search-box {
  width: min(850px, 100%);
  margin: 0 auto;
  padding: clamp(95px, 14vh, 150px) 28px 48px;
}

.search-top {
  border-color: var(--ink);
}

.search-top input {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 44px);
}

.search-top button {
  width: 40px;
  height: 40px;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 27px;
}

.search-results {
  gap: 16px 28px;
}

.search-result {
  align-items: center;
  border-bottom: 1px solid var(--line);
  padding-bottom: 14px;
}

.search-result img {
  width: 72px;
  height: 88px;
}

.search-result p {
  color: var(--ink);
  font-size: 10px;
  letter-spacing: 1.2px;
}

.no-results {
  font-size: 10px;
  letter-spacing: 1.4px;
}

@keyframes search-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popover-in {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .navbar {
    height: 70px;
    grid-template-columns: 1fr auto;
    padding: 0 22px;
  }

  .desktop-nav {
    display: none;
  }

  .actions {
    gap: 15px;
  }

  .menu-button {
    display: flex;
  }
}

@media (max-width: 420px) {
  .navbar {
    padding: 0 16px;
  }

  .logo {
    font-size: 17px;
  }

  .actions {
    gap: 11px;
  }

  .search-box {
    padding-right: 20px;
    padding-left: 20px;
  }
}
</style>