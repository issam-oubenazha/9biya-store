<script setup>
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>

<template>
  <main class="cart-page">

    <!-- HEADER -->
    <section class="cart-header" v-reveal>
      <p>QBIYA / CART</p>
      <h1>YOUR CART</h1>
    </section>

    <!-- EMPTY CART -->
    <section
      v-if="cart.items.length === 0"
      class="empty-cart"
      v-reveal
    >
      <h2>YOUR CART IS EMPTY</h2>

      <p>
        Discover our latest collection and find your next piece.
      </p>

      <RouterLink to="/shop">
        CONTINUE SHOPPING →
      </RouterLink>
    </section>

    <!-- CART -->
    <section
      v-else
      class="cart-content"
      v-reveal
    >

      <!-- PRODUCTS -->
      <div class="cart-items">

        <article
          v-for="item in cart.items"
          :key="`${item.id}-${item.size}`"
          class="cart-item"
          v-reveal
        >

          <div class="item-image">
            <img
              :src="item.image"
              :alt="item.name"
            />
          </div>

          <div class="item-info">

            <p class="item-category">
              QBIYA
            </p>

            <h2>
              {{ item.name }}
            </h2>

            <p class="item-size">
              SIZE: {{ item.size }}
            </p>

            <p class="item-price">
              {{ item.price }} DH
            </p>

            <!-- QUANTITY -->
            <div class="quantity">

              <button
                type="button"
                :aria-label="`Decrease ${item.name} quantity`"
                @click="
                  cart.decreaseQuantity(
                    item.id,
                    item.size
                  )
                "
              >
                −
              </button>

              <span>
                {{ item.quantity }}
              </span>

              <button
                type="button"
                :aria-label="`Increase ${item.name} quantity`"
                @click="
                  cart.increaseQuantity(
                    item.id,
                    item.size
                  )
                "
              >
                +
              </button>

            </div>

            <!-- REMOVE -->
            <button
              class="remove"
              type="button"
              :aria-label="`Remove ${item.name} from cart`"
              @click="
                cart.removeFromCart(
                  item.id,
                  item.size
                )
              "
            >
              REMOVE
            </button>

          </div>

          <!-- ITEM TOTAL -->
          <div class="item-total">
            {{ item.price * item.quantity }} DH
          </div>

        </article>

      </div>

      <!-- SUMMARY -->
      <aside class="summary">

        <p class="summary-label">
          ORDER SUMMARY
        </p>

        <div class="summary-line">
          <span>SUBTOTAL</span>
          <span>{{ cart.totalPrice }} DH</span>
        </div>

        <div class="summary-line">
          <span>DELIVERY</span>
          <span>FREE</span>
        </div>

        <div class="summary-total">
          <span>TOTAL</span>
          <strong>{{ cart.totalPrice }} DH</strong>
        </div>

        <button class="checkout" type="button">
          PROCEED TO CHECKOUT
        </button>

        <RouterLink
          to="/shop"
          class="continue"
        >
          CONTINUE SHOPPING
        </RouterLink>

      </aside>

    </section>

  </main>
</template>

<style scoped>
.cart-page {
  padding: 64px clamp(20px, 6vw, 88px) 90px;
  min-height: calc(100vh - 78px);
  background: #fff;
  color: #111;
}

/* HEADER */

.cart-header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 35px;
  margin-bottom: 50px;
}

.cart-header p {
  font-size: 9px;
  letter-spacing: 3px;
  color: #777;
  margin-bottom: 15px;
}

.cart-header h1 {
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 400;
  letter-spacing: 0;
  margin: 0;
}

/* EMPTY */

.empty-cart {
  text-align: center;
  padding: 120px 20px;
}

.empty-cart h2 {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 20px;
}

.empty-cart p {
  color: #777;
  margin-bottom: 35px;
}

.empty-cart a {
  color: #111;
  text-decoration: none;
  font-size: 10px;
  letter-spacing: 2px;
  border-bottom: 1px solid #111;
  padding-bottom: 6px;
}

/* CONTENT */

.cart-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(290px, 340px);
  gap: clamp(35px, 7vw, 90px);
}

/* ITEM */

.cart-item {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) auto;
  gap: 22px;
  padding-bottom: 28px;
  margin-bottom: 28px;
  border-bottom: 1px solid var(--line);
}

.item-image {
  width: 150px;
  aspect-ratio: 3 / 4;
  background: var(--paper);
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms cubic-bezier(0.2, 0.65, 0.3, 1);
}

.item-image:hover img {
  transform: scale(1.035);
}

.item-category {
  font-size: 9px;
  letter-spacing: 2px;
  color: #777;
  margin: 5px 0 10px;
}

.item-info h2 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  margin: 0 0 15px;
}

.item-size {
  font-size: 10px;
  letter-spacing: 1px;
  color: #666;
}

.item-price {
  font-size: 13px;
  margin: 15px 0;
}

/* QUANTITY */

.quantity {
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid var(--line);
  margin: 20px 0;
}

.quantity button {
  width: 35px;
  height: 35px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 16px;
  transition: background 180ms ease;
}

.quantity button:hover {
  background: var(--paper);
}

.quantity span {
  width: 35px;
  text-align: center;
  font-size: 12px;
}

/* REMOVE */

.remove {
  border: none;
  background: none;
  padding: 0;
  font-size: 9px;
  letter-spacing: 2px;
  text-decoration: underline;
  cursor: pointer;
}

/* ITEM TOTAL */

.item-total {
  font-size: 13px;
  white-space: nowrap;
  padding-top: 10px;
}

/* SUMMARY */

.summary {
  position: sticky;
  top: 110px;
  height: fit-content;
  border: 1px solid var(--line);
  padding: 30px;
  background: #fff;
}

.summary-label {
  font-size: 10px;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.summary-line,
.summary-total {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  font-size: 11px;
}

.summary-total {
  border-top: 1px solid var(--line);
  margin-top: 10px;
  padding-top: 20px;
  font-size: 13px;
}

.summary-total strong {
  font-weight: 500;
}

/* CHECKOUT */

.checkout {
  width: 100%;
  border: none;
  background: var(--ink);
  color: white;
  padding: 18px;
  margin-top: 25px;
  cursor: pointer;
  font-size: 10px;
  letter-spacing: 2px;
}

.checkout:hover {
  background: var(--accent);
}

.continue {
  display: block;
  text-align: center;
  color: #111;
  text-decoration: none;
  font-size: 9px;
  letter-spacing: 2px;
  margin-top: 20px;
  transition: color 180ms ease;
}

.continue:hover {
  color: var(--accent);
}

/* MOBILE */

@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .summary {
    position: static;
  }
}

@media (max-width: 600px) {
  .cart-page {
    padding: 45px 20px;
  }

  .cart-item {
    grid-template-columns: 100px minmax(0, 1fr);
    gap: 15px;
  }

  .item-image {
    width: 100px;
  }

  .item-total {
    display: none;
  }

  .item-info h2 {
    font-size: 15px;
  }
}
</style>