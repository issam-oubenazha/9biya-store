<script setup>
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { products } from "../data/products"
import { useCartStore } from "../stores/cart"

const route = useRoute()
const cart = useCartStore()

const selectedSize = ref("M")

const product = computed(() => {
  return products.find(
    item => item.id === Number(route.params.id)
  )
})

function addToCart() {
  if (!product.value) return

  cart.addToCart(
    product.value,
    selectedSize.value
  )

  alert("Produit ajouté au panier ✓")
}
</script>

<template>

  <main
    v-if="product"
    class="product-page"
  >

    <!-- GALLERY -->

    <section class="gallery">

      <div
        v-for="(image, index) in product.images"
        :key="index"
        class="gallery-image"
      >

        <img
          :src="image"
          :alt="product.name"
        />

      </div>

    </section>


    <!-- INFORMATION -->

    <section class="product-info">

      <div class="product-content">

        <p class="brand">
          QBIYA
        </p>

        <h1>
          {{ product.name }}
        </h1>

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

            :class="{
              active: selectedSize === size
            }"

            @click="selectedSize = size"
          >

            {{ size }}

          </button>

        </div>


        <!-- ADD TO CART -->

        <button
          class="add-cart"
          @click="addToCart"
        >

          ADD TO CART

        </button>


        <!-- DESCRIPTION -->

        <div class="description">

          <p>
            {{ product.description }}
          </p>

        </div>


        <!-- DETAILS -->

        <div class="accordion">

          <div>
            PRODUCT DETAILS

            <span>+</span>
          </div>

          <div>
            DELIVERY

            <span>+</span>
          </div>

          <div>
            RETURNS

            <span>+</span>
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

.product-page {
  display: grid;
  grid-template-columns: 65% 35%;
  background: #fff;
}

/* =========================
   GALLERY
========================= */

.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: #eee;
}

.gallery-image {
  aspect-ratio: 0.78;
  background: #f4f4f4;
  overflow: hidden;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* =========================
   PRODUCT INFO
========================= */

.product-info {
  position: sticky;
  top: 0;
  height: 100vh;
  background: #fff;
}

.product-content {
  padding: 70px 55px;
}

.brand {
  font-size: 11px;
  letter-spacing: 3px;
  margin-bottom: 25px;
  color: #777;
}

h1 {
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.price {
  font-size: 16px;
  margin-bottom: 30px;
}

.separator {
  height: 1px;
  background: #ddd;
  margin: 25px 0;
}

.label {
  font-size: 10px;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.color {
  font-size: 13px;
  color: #555;
}

.sizes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
}

.sizes button {
  height: 45px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
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
  margin-top: 25px;
  background: #111;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 2px;
}

.description {
  margin-top: 30px;
  font-size: 13px;
  line-height: 1.8;
  color: #555;
}

.accordion {
  margin-top: 35px;
  border-top: 1px solid #ddd;
}

.accordion div {
  padding: 18px 0;
  border-bottom: 1px solid #ddd;
  font-size: 11px;
  letter-spacing: 1px;
  display: flex;
  justify-content: space-between;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 900px) {

  .product-page {
    grid-template-columns: 1fr;
  }

  .product-info {
    position: relative;
    height: auto;
  }

  .product-content {
    padding: 40px 25px;
  }

  .gallery {
    grid-template-columns: 1fr 1fr;
  }

}

@media (max-width: 500px) {

  .gallery {
    grid-template-columns: 1fr;
  }

}
</style>