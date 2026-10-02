<script setup>
import { computed, ref } from 'vue'
import { products } from '../data/products'

const selectedCategory = ref('Tous')
const selectedSize = ref('Tous')
const maxPrice = ref(1000)
const sortBy = ref('default')

const filteredProducts = computed(() => {
  let result = [...products]

  // Category filter
  if (selectedCategory.value !== 'Tous') {
    result = result.filter(
      product => product.category === selectedCategory.value
    )
  }

  // Size filter
  if (selectedSize.value !== 'Tous') {
    result = result.filter(
      product => product.sizes.includes(selectedSize.value)
    )
  }

  // Price filter
  result = result.filter(
    product => product.price <= maxPrice.value
  )

  // Sorting
  if (sortBy.value === 'price-low') {
    result.sort((a, b) => a.price - b.price)
  }

  if (sortBy.value === 'price-high') {
    result.sort((a, b) => b.price - a.price)
  }

  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  }

  return result
})
</script>

<template>
  <main class="shop-page">

    <!-- Header -->
    <section class="shop-header">

      <p class="eyebrow">
        QBIYA COLLECTION
      </p>

      <h1>
        SHOP
      </h1>

      <p class="intro">
        Découvrez notre collection de pièces
        inspirées du style marocain contemporain.
      </p>

    </section>

    <!-- Filters -->
    <section class="filters">

      <!-- Category -->
      <div class="filter-group">

        <label>
          CATEGORY
        </label>

        <select v-model="selectedCategory">

          <option value="Tous">
            Tous
          </option>

          <option value="Homme">
            Homme
          </option>

          <option value="Femme">
            Femme
          </option>

        </select>

      </div>

      <!-- Size -->
      <div class="filter-group">

        <label>
          SIZE
        </label>

        <select v-model="selectedSize">

          <option value="Tous">
            Toutes
          </option>

          <option value="S">
            S
          </option>

          <option value="M">
            M
          </option>

          <option value="L">
            L
          </option>

          <option value="XL">
            XL
          </option>

        </select>

      </div>

      <!-- Price -->
      <div class="filter-group price-filter">

        <label>
          MAX PRICE: {{ maxPrice }} DH
        </label>

        <input
          v-model.number="maxPrice"
          type="range"
          min="100"
          max="1000"
          step="50"
        />

      </div>

      <!-- Sort -->
      <div class="filter-group">

        <label>
          SORT
        </label>

        <select v-model="sortBy">

          <option value="default">
            Featured
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="name">
            Name
          </option>

        </select>

      </div>

    </section>

    <!-- Results -->
    <div class="results-info">

      <span>
        {{ filteredProducts.length }} PRODUCTS
      </span>

      <button
        @click="
          selectedCategory = 'Tous';
          selectedSize = 'Tous';
          maxPrice = 1000;
          sortBy = 'default'
        "
      >
        RESET FILTERS
      </button>

    </div>

    <!-- Products -->
    <section
      v-if="filteredProducts.length"
      class="product-grid"
    >

      <RouterLink
        v-for="product in filteredProducts"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="product-card"
      >

        <div class="product-image">

          <img
            :src="product.image"
            :alt="product.name"
          />

          <div class="quick-view">
            VIEW PRODUCT
          </div>

        </div>

        <div class="product-info">

          <div>
            <p class="category">
              {{ product.category }}
            </p>

            <h2>
              {{ product.name }}
            </h2>
          </div>

          <p class="price">
            {{ product.price }} DH
          </p>

        </div>

      </RouterLink>

    </section>

    <!-- Empty -->
    <section
      v-else
      class="empty"
    >

      <h2>
        Aucun produit trouvé
      </h2>

      <p>
        Essayez de modifier vos filtres.
      </p>

    </section>

  </main>
</template>

<style scoped>

.shop-page {
  background: #fff;
  min-height: 100vh;
  padding-bottom: 100px;
}

/* =========================
   HEADER
========================= */

.shop-header {
  text-align: center;
  padding: 80px 20px 60px;
}

.eyebrow {
  font-size: 10px;
  letter-spacing: 4px;
  color: #777;
  margin-bottom: 20px;
}

.shop-header h1 {
  font-size: 50px;
  font-weight: 400;
  letter-spacing: 3px;
  margin-bottom: 20px;
}

.intro {
  max-width: 500px;
  margin: auto;
  color: #777;
  font-size: 13px;
  line-height: 1.8;
}

/* =========================
   FILTERS
========================= */

.filters {
  margin: 0 35px;
  padding: 20px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-group label {
  font-size: 9px;
  letter-spacing: 2px;
  color: #777;
}

.filter-group select {
  border: none;
  background: white;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}

.price-filter input {
  width: 100%;
}

/* =========================
   RESULTS
========================= */

.results-info {
  padding: 25px 35px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 10px;
  letter-spacing: 2px;
}

.results-info button {
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  font-size: 9px;
  letter-spacing: 1px;
}

/* =========================
   PRODUCT GRID
========================= */

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;

  background: #eee;
}

.product-card {
  background: #fff;
  text-decoration: none;
  color: #111;
}

.product-image {
  position: relative;
  aspect-ratio: 0.78;
  background: #f3f3f3;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  display: block;

  transition: transform 0.5s ease;
}

.product-card:hover img {
  transform: scale(1.03);
}

.quick-view {
  position: absolute;

  left: 15px;
  right: 15px;
  bottom: 15px;

  padding: 13px;

  text-align: center;

  background: white;

  font-size: 9px;
  letter-spacing: 2px;

  opacity: 0;
  transform: translateY(10px);

  transition: all 0.3s ease;
}

.product-card:hover .quick-view {
  opacity: 1;
  transform: translateY(0);
}

/* =========================
   PRODUCT INFO
========================= */

.product-info {
  padding: 16px;

  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.category {
  font-size: 8px;
  letter-spacing: 2px;
  color: #888;
  margin-bottom: 7px;
}

.product-info h2 {
  font-size: 13px;
  font-weight: 400;
}

.price {
  font-size: 12px;
  white-space: nowrap;
}

/* =========================
   EMPTY
========================= */

.empty {
  text-align: center;
  padding: 100px 20px;
}

.empty h2 {
  font-weight: 400;
  margin-bottom: 10px;
}

.empty p {
  color: #777;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1000px) {

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .filters {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 650px) {

  .shop-header {
    padding: 50px 20px;
  }

  .shop-header h1 {
    font-size: 38px;
  }

  .filters {
    margin: 0 15px;
    grid-template-columns: 1fr 1fr;
  }

  .results-info {
    padding: 20px 15px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-info {
    padding: 12px;
  }

  .product-info h2 {
    font-size: 11px;
  }

  .price {
    font-size: 10px;
  }

}

</style>