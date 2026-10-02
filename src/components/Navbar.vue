<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<template>
  <header class="navbar">

    <!-- Logo -->
    <RouterLink to="/" class="logo">
      QBIYA
    </RouterLink>

    <!-- Desktop Navigation -->
    <nav class="desktop-nav">
      <RouterLink to="/">NEW IN</RouterLink>
      <RouterLink to="/shop">SHOP</RouterLink>
      <RouterLink to="/shop?category=homme">HOMME</RouterLink>
      <RouterLink to="/shop?category=femme">FEMME</RouterLink>
      <RouterLink to="/about">ABOUT</RouterLink>
    </nav>

    <!-- Actions -->
    <div class="actions">

      <button aria-label="Search">
        ⌕
      </button>

      <RouterLink to="/account" aria-label="Account">
        ♙
      </RouterLink>

      <RouterLink to="/cart" class="cart">
        ♧
        <span>0</span>
      </RouterLink>

      <button
        class="menu-button"
        @click="menuOpen = !menuOpen"
        aria-label="Menu"
      >
        ☰
      </button>

    </div>

    <!-- Mobile Menu -->
    <div
      v-if="menuOpen"
      class="mobile-menu"
    >
      <RouterLink to="/" @click="menuOpen = false">
        NEW IN
      </RouterLink>

      <RouterLink to="/shop" @click="menuOpen = false">
        SHOP
      </RouterLink>

      <RouterLink to="/shop?category=homme" @click="menuOpen = false">
        HOMME
      </RouterLink>

      <RouterLink to="/shop?category=femme" @click="menuOpen = false">
        FEMME
      </RouterLink>

      <RouterLink to="/about" @click="menuOpen = false">
        ABOUT
      </RouterLink>
    </div>

  </header>
</template>

<style scoped>

.navbar {
  height: 70px;
  padding: 0 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fff;

  border-bottom: 1px solid #e5e5e5;

  position: sticky;
  top: 0;
  z-index: 1000;
}

/* LOGO */

.logo {
  color: #111;

  text-decoration: none;

  font-size: 22px;
  font-weight: 800;

  letter-spacing: 4px;

  min-width: 150px;
}

/* NAV */

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.desktop-nav a {
  color: #111;

  text-decoration: none;

  font-size: 10px;
  letter-spacing: 1.5px;

  position: relative;
}

.desktop-nav a::after {
  content: "";

  position: absolute;

  left: 0;
  bottom: -7px;

  width: 0;
  height: 1px;

  background: #111;

  transition: width 0.25s ease;
}

.desktop-nav a:hover::after {
  width: 100%;
}

/* ACTIONS */

.actions {
  min-width: 150px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 18px;
}

.actions button,
.actions a {
  color: #111;

  text-decoration: none;

  background: transparent;

  border: none;

  cursor: pointer;

  font-size: 18px;
}

.cart {
  position: relative;
}

.cart span {
  position: absolute;

  top: -8px;
  right: -8px;

  width: 15px;
  height: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #111;
  color: #fff;

  font-size: 8px;
}

/* MOBILE BUTTON */

.menu-button {
  display: none;
}

/* MOBILE MENU */

.mobile-menu {
  display: none;
}

/* RESPONSIVE */

@media (max-width: 900px) {

  .navbar {
    padding: 0 20px;
  }

  .desktop-nav {
    display: none;
  }

  .logo {
    min-width: auto;
  }

  .actions {
    min-width: auto;
  }

  .menu-button {
    display: block !important;
  }

  .mobile-menu {
    position: absolute;

    top: 70px;
    left: 0;

    width: 100%;

    display: flex;
    flex-direction: column;

    background: #fff;

    border-bottom: 1px solid #ddd;
  }

  .mobile-menu a {
    padding: 20px;

    color: #111;

    text-decoration: none;

    font-size: 12px;

    letter-spacing: 2px;

    border-bottom: 1px solid #eee;
  }
}

</style>