<script setup>
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'

const wishlist = useWishlistStore()
const cart = useCartStore()

function addToCart(item) {
  cart.addToCart({
    id: item.id,
    name: item.name,
    price: item.price,
    images: [item.image]
  })

  wishlist.removeFromWishlist(item.id)
}
</script>

<template>
  <main class="wishlist-page">

    <!-- HEADER -->
    <section class="wishlist-header" v-reveal>
      <p>QBIYA / WISHLIST</p>

      <h1>
        YOUR WISHLIST
      </h1>

      <span>
        {{ wishlist.totalItems }}
        {{ wishlist.totalItems === 1 ? 'ITEM' : 'ITEMS' }}
      </span>
    </section>

    <!-- EMPTY -->
    <section
      v-if="wishlist.items.length === 0"
      class="empty"
      v-reveal
    >
      <h2>YOUR WISHLIST IS EMPTY</h2>

      <p>
        Save your favorite pieces and find them here later.
      </p>

      <RouterLink to="/shop">
        DISCOVER COLLECTION →
      </RouterLink>
    </section>

    <!-- PRODUCTS -->
    <section
      v-else
      class="wishlist-grid"
      v-reveal
    >

      <article
        v-for="item in wishlist.items"
        :key="item.id"
        class="wishlist-card"
        v-reveal
      >

        <div class="image-wrapper">

          <RouterLink
            :to="`/product/${item.id}`"
          >
            <img
              :src="item.image"
              :alt="item.name"
            />
          </RouterLink>

          <button
            class="remove"
            @click="wishlist.removeFromWishlist(item.id)"
          >
            ×
          </button>

        </div>

        <div class="product-info">

          <p>
            {{ item.category }}
          </p>

          <h2>
            {{ item.name }}
          </h2>

          <span>
            {{ item.price }} DH
          </span>

          <button
            class="add-cart"
            @click="addToCart(item)"
          >
            ADD TO CART
          </button>

        </div>

      </article>

    </section>

  </main>
</template>

<style scoped>
.wishlist-page {
  min-height: calc(100vh - 78px);
  padding: 70px 6%;
  background: #fff;
  color: #111;
}

/* HEADER */

.wishlist-header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 35px;
  margin-bottom: 50px;
}

.wishlist-header p {
  font-size: 9px;
  letter-spacing: 3px;
  color: #777;
  margin-bottom: 15px;
}

.wishlist-header h1 {
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 400;
  letter-spacing: 0;
  margin: 0 0 15px;
}

.wishlist-header span {
  font-size: 10px;
  letter-spacing: 2px;
  color: #777;
}

/* EMPTY */

.empty {
  text-align: center;
  padding: 120px 20px;
}

.empty h2 {
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 20px;
}

.empty p {
  color: #777;
  margin-bottom: 35px;
}

.empty a {
  color: #111;
  text-decoration: none;
  font-size: 10px;
  letter-spacing: 2px;
  border-bottom: 1px solid #111;
  padding-bottom: 6px;
}

/* GRID */

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.image-wrapper {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--paper);
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 800ms cubic-bezier(0.2, 0.65, 0.3, 1);
}

.image-wrapper:hover img {
  transform: scale(1.04);
}

/* REMOVE */

.remove {
  position: absolute;
  top: 12px;
  right: 12px;

  width: 32px;
  height: 32px;

  border: none;
  border-radius: 0;

  background: white;
  cursor: pointer;

  font-size: 20px;
}

/* INFO */

.product-info {
  padding-top: 15px;
}

.product-info > p {
  font-size: 9px;
  letter-spacing: 2px;
  color: #777;
  margin-bottom: 8px;
}

.product-info h2 {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 10px;
}

.product-info > span {
  font-size: 13px;
}

/* ADD */

.add-cart {
  display: block;
  width: 100%;
  margin-top: 18px;

  padding: 14px;

  border: 1px solid var(--ink);
  background: white;
  color: var(--ink);

  font-size: 9px;
  letter-spacing: 2px;

  cursor: pointer;
  transition: background 220ms ease, color 220ms ease;
}

.add-cart:hover {
  background: var(--ink);
  color: white;
}

/* RESPONSIVE */

@media (max-width: 1000px) {
  .wishlist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 700px) {
  .wishlist-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 450px) {
  .wishlist-page {
    padding: 45px 20px;
  }

  .wishlist-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>