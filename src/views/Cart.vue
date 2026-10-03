<script setup>
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>

<template>
  <main class="cart-page">

    <!-- HEADER -->
    <section class="cart-header">
      <p>QBIYA / CART</p>
      <h1>YOUR CART</h1>
    </section>

    <!-- EMPTY CART -->
    <section
      v-if="cart.items.length === 0"
      class="empty-cart"
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
    >

      <!-- PRODUCTS -->
      <div class="cart-items">

        <article
          v-for="item in cart.items"
          :key="`${item.id}-${item.size}`"
          class="cart-item"
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

        <button class="checkout">
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
  padding: 70px 6%;
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
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 400;
  letter-spacing: -3px;
  margin: 0;
}

/* EMPTY */

.empty-cart {
  text-align: center;
  padding: 120px 20px;
}

.empty-cart h2 {
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
  grid-template-columns: 1fr 360px;
  gap: 80px;
}

/* ITEM */

.cart-item {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 25px;
  padding-bottom: 35px;
  margin-bottom: 35px;
  border-bottom: 1px solid #ddd;
}

.item-image {
  width: 180px;
  aspect-ratio: 3 / 4;
  background: #f5f5f5;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-category {
  font-size: 9px;
  letter-spacing: 2px;
  color: #777;
  margin: 5px 0 10px;
}

.item-info h2 {
  font-size: 18px;
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
  border: 1px solid #ddd;
  margin: 20px 0;
}

.quantity button {
  width: 35px;
  height: 35px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 16px;
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
  border: 1px solid #ddd;
  padding: 30px;
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
  border-top: 1px solid #ddd;
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
  background: #111;
  color: white;
  padding: 18px;
  margin-top: 25px;
  cursor: pointer;
  font-size: 10px;
  letter-spacing: 2px;
}

.checkout:hover {
  opacity: 0.8;
}

.continue {
  display: block;
  text-align: center;
  color: #111;
  text-decoration: none;
  font-size: 9px;
  letter-spacing: 2px;
  margin-top: 20px;
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
    grid-template-columns: 100px 1fr;
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