<script setup>
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { products } from "../data/products"
import { useCartStore } from "../stores/cart"
import { useWishlistStore } from '../stores/wishlist'

const route = useRoute()
const cart = useCartStore()

const selectedSize = ref("M")
const selectedImageIndex = ref(0)
const quantity = ref(1)
const expandedSection = ref('product')

const product = computed(() => {
  return products.find(
    item => item.id === Number(route.params.id)
  )
})
const galleryImages = computed(() =>
  product.value?.images?.length
    ? product.value.images
    : product.value?.image
      ? [product.value.image]
      : []
)
const wishlist = useWishlistStore()

function toggleSection(section) {
  expandedSection.value = expandedSection.value === section ? '' : section
}

function addToCart() {
  if (!product.value) return

  cart.addToCart(
    product.value,
    selectedSize.value,
    quantity.value
  )
}
</script>

<template>

  <main
    v-if="product"
    class="product-page"
  >

    <!-- GALLERY -->

    <section class="gallery" v-reveal>
      <div class="gallery-main">
        <Transition name="product-image" mode="out-in">
          <img
            :key="galleryImages[selectedImageIndex]"
            :src="galleryImages[selectedImageIndex]"
            :alt="product.name"
          />
        </Transition>
      </div>

      <div v-if="galleryImages.length > 1" class="gallery-thumbnails" aria-label="Product images">
        <button
          v-for="(image, index) in galleryImages"
          :key="`${image}-${index}`"
          type="button"
          :class="{ active: selectedImageIndex === index }"
          :aria-label="`Show product image ${index + 1}`"
          :aria-pressed="selectedImageIndex === index"
          @click="selectedImageIndex = index"
        >
          <img :src="image" :alt="`${product.name} view ${index + 1}`" />
        </button>
      </div>
    </section>


    <!-- INFORMATION -->

    <section class="product-info" v-reveal>

      <div class="product-content">

        <p class="brand">
          QBIYA
        </p>

        <div class="title-row">

    <h1>{{ product.name }}</h1>

        <button
            class="wishlist-button"
            @click="wishlist.toggleWishlist(product)"
            :aria-label="
            wishlist.isInWishlist(product.id)
                ? 'Remove from wishlist'
                : 'Add to wishlist'
            "
        >
            {{
            wishlist.isInWishlist(product.id)
                ? '♥'
                : '♡'
            }}
        </button>

    </div>

        <p class="price">
          {{ product.price }} DH
        </p>


        <div class="separator"></div>


        <!-- COLOR -->

        <p class="label">
          COLOR
        </p>

        <p class="color">
          {{ product.color }}
        </p>


        <div class="separator"></div>


        <!-- SIZE -->

        <p class="label">
          SIZE
        </p>

        <div class="sizes">

          <button
            v-for="size in product.sizes"
            :key="size"
            type="button"
            :class="{
              active: selectedSize === size
            }"
            :aria-pressed="selectedSize === size"
            @click="selectedSize = size"
          >
            {{ size }}
          </button>

        </div>


        <div class="quantity-control" aria-label="Choose quantity">
          <span>QUANTITY</span>
          <div>
            <button
              type="button"
              aria-label="Decrease quantity"
              :disabled="quantity <= 1"
              @click="quantity = Math.max(1, quantity - 1)"
            >−</button>
            <span>{{ quantity }}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              @click="quantity += 1"
            >+</button>
          </div>
        </div>

        <button
          class="add-cart"
          type="button"
          @click="addToCart"
        >
          ADD TO BAG <span aria-hidden="true">→</span>
        </button>


        <!-- DESCRIPTION -->

        <div class="description">
        </div>


        <!-- DETAILS -->

        <div class="accordion">
          <div class="accordion-item">
            <button type="button" :aria-expanded="expandedSection === 'product'" @click="toggleSection('product')">
              PRODUCT DETAILS <span>{{ expandedSection === 'product' ? '−' : '+' }}</span>
            </button>
            <p v-if="expandedSection === 'product'">{{ product.description }}</p>
          </div>
          <div class="accordion-item">
            <button type="button" :aria-expanded="expandedSection === 'delivery'" @click="toggleSection('delivery')">
              DELIVERY <span>{{ expandedSection === 'delivery' ? '−' : '+' }}</span>
            </button>
            <p v-if="expandedSection === 'delivery'">Delivery options and timing are confirmed when your order is placed.</p>
          </div>
          <div class="accordion-item">
            <button type="button" :aria-expanded="expandedSection === 'returns'" @click="toggleSection('returns')">
              RETURNS <span>{{ expandedSection === 'returns' ? '−' : '+' }}</span>
            </button>
            <p v-if="expandedSection === 'returns'">For help with a return or exchange, please contact our team.</p>
          </div>
        </div>

      </div>

    </section>

  </main>


  <!-- PRODUCT NOT FOUND -->

  <main
    v-else
    class="not-found"
  >

    <h1>
      Produit introuvable
    </h1>

    <RouterLink to="/shop">
      RETOUR AU SHOP
    </RouterLink>

  </main>

</template>

<style scoped>

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.title-row h1 {
  margin: 0;
}

.wishlist-button {
  width: 48px;
  height: 48px;

  border: 1px solid #ddd;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  cursor: pointer;

  transition: 0.25s;
}

.wishlist-button:hover {
  border-color: #111;
  transform: scale(1.05);
}

.product-page {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr);
  gap: clamp(24px, 5vw, 72px);
  padding: 34px clamp(22px, 5vw, 76px) 80px;
  background: #fff;
}

/* =========================
   GALLERY
========================= */

.gallery {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 10px;
}

.gallery-main {
  aspect-ratio: 0.82;
  background: var(--paper);
  overflow: hidden;
}

.gallery-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-thumbnails {
  display: flex;
  gap: 9px;
  overflow-x: auto;
  padding-bottom: 3px;
}

.gallery-thumbnails button {
  width: 66px;
  aspect-ratio: 3 / 4;
  flex: 0 0 auto;
  padding: 0;
  overflow: hidden;
  border: 1px solid transparent;
  background: var(--paper);
  cursor: pointer;
  opacity: 0.68;
  transition: opacity 200ms ease, border-color 200ms ease;
}

.gallery-thumbnails button.active,
.gallery-thumbnails button:hover {
  border-color: var(--ink);
  opacity: 1;
}

.gallery-thumbnails img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-image-enter-active,
.product-image-leave-active {
  transition: opacity 200ms ease, transform 300ms ease;
}

.product-image-enter-from {
  opacity: 0;
  transform: scale(1.015);
}

.product-image-leave-to {
  opacity: 0;
}

/* =========================
   PRODUCT INFO
========================= */

.product-info {
  position: sticky;
  top: 98px;
  align-self: start;
  max-height: calc(100vh - 110px);
  overflow-y: auto;
  background: #fff;
}

.product-content {
  padding: 34px 24px 40px 0;
}

.brand {
  font-size: 11px;
  letter-spacing: 3px;
  margin-bottom: 22px;
  color: var(--muted);
}

h1 {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1;
  margin-bottom: 0;
}

.price {
  font-size: 15px;
  margin: 18px 0 25px;
}

.separator {
  height: 1px;
  background: var(--line);
  margin: 22px 0;
}

.label {
  font-size: 10px;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
}

.color {
  font-size: 13px;
  color: var(--muted);
}

.sizes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
}

.sizes button {
  height: 45px;
  border: 1px solid var(--line);
  background: white;
  cursor: pointer;
  transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
}

.sizes button:hover,
.sizes button.active {
  background: #111;
  color: white;
  border-color: #111;
}

.add-cart {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  margin-top: 22px;
  background: var(--ink);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 10px;
  letter-spacing: 1.5px;
  transition: background 200ms ease;
}

.add-cart:hover {
  background: var(--accent);
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
  font-size: 9px;
  letter-spacing: 1.5px;
}

.quantity-control > div {
  display: flex;
  align-items: center;
  height: 38px;
  border: 1px solid var(--line);
}

.quantity-control button {
  width: 38px;
  height: 36px;
  border: 0;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
}

.quantity-control button:disabled {
  color: #aaa;
  cursor: not-allowed;
}

.quantity-control div > span {
  min-width: 26px;
  text-align: center;
  font-size: 11px;
  letter-spacing: 0;
}

.description {
  margin-top: 30px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
}

.accordion {
  margin-top: 27px;
  border-top: 1px solid var(--line);
}

.accordion-item {
  border-bottom: 1px solid var(--line);
}

.accordion-item button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 17px 0;
  border: 0;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  font-size: 9px;
  letter-spacing: 1.3px;
  text-align: left;
}

.accordion-item p {
  margin: -3px 0 17px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 900px) {

  .product-page {
    grid-template-columns: 1fr;
    padding: 22px 22px 55px;
  }

  .product-info {
    position: relative;
    top: auto;
    max-height: none;
    overflow: visible;
  }

  .product-content {
    max-width: 620px;
    margin: 0 auto;
    padding: 24px 0 0;
  }
}

@media (max-width: 500px) {
  .product-page {
    padding: 14px 15px 44px;
  }

  .gallery-main {
    aspect-ratio: 0.76;
  }

  .title-row h1 {
    font-size: 31px;
  }
}
</style>