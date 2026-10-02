<script setup>
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const featuredProducts = products.slice(0, 4)
</script>

<template>
  <main class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <p class="hero-label">NEW COLLECTION</p>

        <h1>
          MOROCCAN
          <br />
          ESSENCE
        </h1>

        <p class="hero-description">
          Modern Moroccan pieces designed for a timeless style.
        </p>

        <RouterLink to="/shop" class="hero-button">
          SHOP COLLECTION
        </RouterLink>
      </div>
    </section>

    <!-- INTRO -->
    <section class="intro">
      <p class="section-label">QBIYA</p>

      <h2>
        ROOTED IN MOROCCO.
        <br />
        MADE FOR TODAY.
      </h2>

      <p>
        We create contemporary pieces inspired by Moroccan culture,
        combining tradition, simplicity and modern fashion.
      </p>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="featured">
      <div class="section-header">
        <div>
          <p class="section-label">DISCOVER</p>
          <h2>FEATURED PIECES</h2>
        </div>

        <RouterLink to="/shop" class="view-all">
          VIEW ALL →
        </RouterLink>
      </div>

      <div class="products-grid">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="categories">

      <RouterLink
        to="/shop?category=homme"
        class="category-card category-men"
      >
        <div>
          <p>COLLECTION</p>
          <h2>HOMME</h2>
          <span>DISCOVER →</span>
        </div>
      </RouterLink>

      <RouterLink
        to="/shop?category=femme"
        class="category-card category-women"
      >
        <div>
          <p>COLLECTION</p>
          <h2>FEMME</h2>
          <span>DISCOVER →</span>
        </div>
      </RouterLink>

    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter">
      <p class="section-label">STAY CONNECTED</p>

      <h2>
        JOIN THE QBIYA
        <br />
        COMMUNITY
      </h2>

      <p>
        Subscribe to receive new collection announcements
        and exclusive updates.
      </p>

      <form class="newsletter-form" @submit.prevent>
        <input
          type="email"
          placeholder="YOUR EMAIL ADDRESS"
        />

        <button type="submit">
          SUBSCRIBE
        </button>
      </form>
    </section>

  </main>
</template>

<style scoped>
.home {
  background: #fff;
  color: #111;
}

/* HERO */

.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: flex-end;
  padding: 80px 7%;
  position: relative;

  background:
    linear-gradient(
      to top,
      rgba(0, 0, 0, 0.65),
      rgba(0, 0, 0, 0.05)
    ),
    url('/products/hero.jpg') center / cover no-repeat;

  color: white;
}

.hero-content {
  max-width: 650px;
}

.hero-label,
.section-label {
  font-size: 11px;
  letter-spacing: 3px;
  font-weight: 500;
  margin-bottom: 18px;
}

.hero h1 {
  font-size: clamp(55px, 9vw, 130px);
  line-height: 0.85;
  letter-spacing: -5px;
  font-weight: 500;
  margin: 0 0 30px;
}

.hero-description {
  font-size: 15px;
  max-width: 420px;
  line-height: 1.7;
  margin-bottom: 35px;
}

.hero-button {
  display: inline-block;
  padding: 16px 30px;
  background: white;
  color: #111;
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 2px;
  transition: 0.3s;
}

.hero-button:hover {
  background: #111;
  color: white;
}

/* INTRO */

.intro {
  padding: 130px 7%;
  text-align: center;
  max-width: 850px;
  margin: auto;
}

.intro h2 {
  font-size: clamp(35px, 5vw, 65px);
  line-height: 0.95;
  font-weight: 500;
  letter-spacing: -2px;
  margin-bottom: 30px;
}

.intro > p:last-child {
  max-width: 550px;
  margin: auto;
  color: #666;
  line-height: 1.8;
}

/* FEATURED */

.featured {
  padding: 80px 7%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.section-header h2 {
  margin: 0;
  font-size: 35px;
  font-weight: 500;
  letter-spacing: -1px;
}

.view-all {
  color: #111;
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 2px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* CATEGORIES */

.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 80px;
}

.category-card {
  min-height: 600px;
  display: flex;
  align-items: flex-end;
  padding: 50px;
  text-decoration: none;
  color: white;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.category-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    transparent,
    rgba(0, 0, 0, 0.65)
  );
}

.category-card > div {
  position: relative;
  z-index: 1;
}

.category-card p {
  font-size: 10px;
  letter-spacing: 3px;
}

.category-card h2 {
  font-size: 55px;
  font-weight: 500;
  margin: 10px 0 20px;
}

.category-card span {
  font-size: 10px;
  letter-spacing: 2px;
}

.category-men {
  background-image: url('/products/men.jpg');
}

.category-women {
  background-image: url('/products/women.jpg');
}

/* NEWSLETTER */

.newsletter {
  padding: 140px 20px;
  text-align: center;
  max-width: 700px;
  margin: auto;
}

.newsletter h2 {
  font-size: clamp(40px, 6vw, 70px);
  line-height: 0.9;
  font-weight: 500;
  letter-spacing: -3px;
  margin-bottom: 30px;
}

.newsletter > p:not(.section-label) {
  color: #666;
  line-height: 1.7;
  margin-bottom: 35px;
}

.newsletter-form {
  display: flex;
  border-bottom: 1px solid #111;
}

.newsletter-form input {
  flex: 1;
  border: none;
  outline: none;
  padding: 15px 0;
  font-size: 12px;
}

.newsletter-form button {
  border: none;
  background: none;
  font-size: 10px;
  letter-spacing: 2px;
  cursor: pointer;
}

/* RESPONSIVE */

@media (max-width: 1000px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-card {
    min-height: 500px;
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: 80vh;
    padding: 40px 25px;
  }

  .hero h1 {
    letter-spacing: -3px;
  }

  .intro,
  .featured {
    padding: 80px 25px;
  }

  .section-header {
    align-items: flex-start;
    gap: 20px;
  }

  .section-header h2 {
    font-size: 28px;
  }

  .categories {
    grid-template-columns: 1fr;
  }

  .category-card {
    min-height: 450px;
    padding: 30px;
  }

  .category-card h2 {
    font-size: 45px;
  }

  .newsletter {
    padding: 100px 25px;
  }
}
</style>