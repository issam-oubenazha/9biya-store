<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()

const selectedCategory = ref('Tous')
const selectedSize = ref('Tous')
const maxPrice = ref(1000)
const sortBy = ref('default')

/* Read category from URL */
function loadCategoryFromUrl() {
  const category = route.query.category

  if (category === 'homme') {
    selectedCategory.value = 'Homme'
  } else if (category === 'femme') {
    selectedCategory.value = 'Femme'
  } else {
    selectedCategory.value = 'Tous'
  }
}

loadCategoryFromUrl()

/* Update when URL changes */
watch(
  () => route.query.category,
  () => {
    loadCategoryFromUrl()
  }
)

/* Products filtering */
const filteredProducts = computed(() => {
  let result = [...products]

  if (selectedCategory.value !== 'Tous') {
    result = result.filter(
      product => product.category === selectedCategory.value
    )
  }

  if (selectedSize.value !== 'Tous') {
    result = result.filter(
      product => product.sizes.includes(selectedSize.value)
    )
  }

  result = result.filter(
    product => product.price <= maxPrice.value
  )

  if (sortBy.value === 'price-low') {
    result.sort((a, b) => a.price - b.price)
  }

  if (sortBy.value === 'price-high') {
    result.sort((a, b) => b.price - a.price)
  }

  if (sortBy.value === 'name') {
    result.sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }

  return result
})

/* Reset */
function resetFilters() {
  selectedCategory.value = 'Tous'
  selectedSize.value = 'Tous'
  maxPrice.value = 1000
  sortBy.value = 'default'

  router.push('/shop')
}
</script>

<template>
  <main class="shop-page">

    <!-- Header -->
    <section class="shop-header" v-reveal>

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
    <section class="filters" v-reveal>

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
    <div class="results-info" v-reveal>

      <span>
        {{ filteredProducts.length }} PRODUCTS
      </span>

      <button
        @click="resetFilters"
      >
        RESET FILTERS
      </button>

    </div>

    <!-- Products -->
    <section v-if="filteredProducts.length" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
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
  background: var(--paper, #fbfaf8);
  min-height: 100vh;
  padding-bottom: 96px;
}

/* =========================
   HEADER
========================= */

.shop-header {
  display: grid;
  grid-template-columns: 1fr minmax(260px, 0.55fr);
  align-items: end;
  column-gap: 48px;
  max-width: 1380px;
  margin: 0 auto;
  padding: 86px 6% 54px;
  border-bottom: 1px solid #e5e1da;
}

.eyebrow {
  grid-column: 1 / -1;
  margin: 0 0 18px;
  color: #827d74;
  font-size: 9px;
  letter-spacing: 2.5px;
}

.shop-header h1 {
  font-family: var(--font-display);
  font-size: clamp(72px, 11vw, 148px);
  font-weight: 400;
  line-height: 0.78;
  letter-spacing: 0;
  margin: 0;
}

.intro {
  max-width: 390px;
  margin: 0 0 4px auto;
  color: #706e68;
  font-size: 14px;
  line-height: 1.9;
}

/* =========================
   FILTERS
========================= */

.filters {
  max-width: 1240px;
  margin: 28px auto 0;
  padding: 20px 24px;
  background: #f1efeb;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 9px;
}

.filter-group label {
  color: #817d75;
  font-size: 8px;
  letter-spacing: 1.6px;
}

.filter-group select {
  width: 100%;
  padding: 4px 18px 7px 0;
  border: 0;
  border-bottom: 1px solid #d4d0c8;
  border-radius: 0;
  background: transparent;
  color: #24231f;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}

.filter-group select:focus-visible {
  outline: 1px solid #94735e;
  outline-offset: 4px;
}

.price-filter input {
  width: 100%;
  accent-color: #80634f;
}

/* =========================
   RESULTS
========================= */

.results-info {
  max-width: 1240px;
  margin: 0 auto;
  padding: 34px 0 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #77736c;
  font-size: 9px;
  letter-spacing: 1.6px;
}

.results-info button {
  background: none;
  border: none;
  border-bottom: 1px solid #aaa49a;
  padding: 0 0 4px;
  color: #393731;
  cursor: pointer;
  font-size: 9px;
  letter-spacing: 1.2px;
  transition: color 180ms ease, border-color 180ms ease;
}

.results-info button:hover {
  color: #94735e;
  border-color: #94735e;
}

/* =========================
   PRODUCT GRID
========================= */

.product-grid {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 44px 22px;
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

  .filters,
  .results-info,
  .product-grid {
    margin-right: 28px;
    margin-left: 28px;
  }

  .filters {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 650px) {

  .shop-header {
    grid-template-columns: 1fr;
    row-gap: 20px;
    padding: 60px 22px 38px;
  }

  .eyebrow {
    margin-bottom: 0;
  }

  .shop-header h1 {
    font-size: clamp(64px, 18vw, 100px);
  }

  .intro {
    margin: 0;
    font-size: 13px;
  }

  .filters {
    margin: 20px 15px 0;
    padding: 16px;
    grid-template-columns: 1fr 1fr;
    gap: 20px 16px;
  }

  .results-info {
    margin: 0 15px;
    padding: 26px 0 15px;
  }

  .product-grid {
    margin: 0 15px;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 12px;
  }

}

</style>