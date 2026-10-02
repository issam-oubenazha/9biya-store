<script setup>
import Navbar from './components/Navbar.vue'
import { products } from './data/products'
import ProductCard from './components/ProductCard.vue'
</script>
<template>
  <div class="app">
    <!-- Navbar -->
    <Navbar />
    <RouterView />

    <!-- Hero -->
    <main>
      <section class="hero">
        <div class="hero-content">
          <p class="subtitle">COLLECTION 2026</p>

          <h1>
            L'élégance<br />
            <span>Marocaine</span>
          </h1>

          <p class="description">
            Découvrez notre collection de qbiya,
            conçue pour allier tradition, élégance
            et modernité.
          </p>

          <button class="shop-button">
            Découvrir la collection
          </button>
        </div>

        <div class="hero-image">
          <div class="image-placeholder">
            QBIYA
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="categories">
        <p class="section-subtitle">NOTRE COLLECTION</p>

        <h2>Découvrez nos styles</h2>

        <div class="category-grid">
          <div class="category">
            <div class="category-image">QBIYA HOMME</div>
            <h3>Qbiya Homme</h3>
          </div>

          <div class="category">
            <div class="category-image">QBIYA FEMME</div>
            <h3>Qbiya Femme</h3>
          </div>

          <div class="category">
            <div class="category-image">NOUVEAUTÉS</div>
            <h3>Nouveautés</h3>
          </div>
        </div>
      </section>
      <section class="products">
        <p class="section-subtitle">NOS PRODUITS</p>

        <h2>Nos pièces favorites</h2>

          <div class="products-grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>
      </section>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f8f5ef;
  color: #171717;
}

.navbar {
  height: 80px;
  padding: 0 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f5ef;
  border-bottom: 1px solid #e5e0d8;
}

.logo {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 5px;
}

nav {
  display: flex;
  gap: 35px;
}

nav a {
  color: #171717;
  text-decoration: none;
  font-size: 14px;
}

.cart {
  border: 1px solid #171717;
  background: transparent;
  padding: 10px 18px;
  cursor: pointer;
}

.hero {
  min-height: 650px;
  padding: 70px 7%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
}

.subtitle,
.section-subtitle {
  font-size: 12px;
  letter-spacing: 4px;
  margin-bottom: 20px;
  color: #777;
}

.hero h1 {
  font-size: 72px;
  line-height: 1;
  font-weight: 500;
  margin-bottom: 30px;
}

.hero h1 span {
  font-style: italic;
}

.description {
  max-width: 480px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 35px;
}

.shop-button {
  background: #171717;
  color: white;
  border: none;
  padding: 16px 30px;
  cursor: pointer;
  font-size: 14px;
}

.hero-image {
  height: 500px;
}

.image-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ded8cc;
  font-size: 35px;
  letter-spacing: 8px;
}

.categories {
  padding: 80px 7%;
  text-align: center;
  background: white;
}

.categories h2 {
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 50px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.category {
  text-align: left;
}

.category-image {
  height: 350px;
  background: #ded8cc;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 3px;
  color: #555;
}

.category h3 {
  margin-top: 15px;
  font-size: 18px;
  font-weight: 500;
}

@media (max-width: 768px) {
  nav {
    display: none;
  }

  .hero {
    grid-template-columns: 1fr;
    padding-top: 40px;
  }

  .hero h1 {
    font-size: 50px;
  }

  .hero-image {
    height: 400px;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }
  .products {
  padding: 90px 7%;
  background: #f8f5ef;
  text-align: center;
}

.products h2 {
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 50px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1000px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
}
</style>