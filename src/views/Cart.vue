<script setup>
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>

<template>
  <main class="cart-page">

    <div class="cart-header">
      <p>YOUR BAG</p>

      <h1>
        Panier
      </h1>
    </div>

    <div v-if="cart.items.length === 0" class="empty-cart">
      <h2>Votre panier est vide</h2>

      <RouterLink to="/shop">
        CONTINUER MES ACHATS
      </RouterLink>
    </div>

    <div v-else class="cart-content">

      <section class="cart-items">

        <article
          v-for="item in cart.items"
          :key="`${item.id}-${item.size}`"
          class="cart-item"
        >

          <img
            :src="item.image"
            :alt="item.name"
          />

          <div class="item-info">

            <h2>{{ item.name }}</h2>

            <p>
              Taille : {{ item.size }}
            </p>

            <strong>
              {{ item.price }} DH
            </strong>

            <div class="quantity">

              <button
                @click="cart.decreaseQuantity(item.id, item.size)"
              >
                −
              </button>

              <span>
                {{ item.quantity }}
              </span>

              <button
                @click="cart.increaseQuantity(item.id, item.size)"
              >
                +
              </button>

            </div>

            <button
              class="remove"
              @click="cart.removeFromCart(item.id, item.size)"
            >
              REMOVE
            </button>

          </div>

        </article>

      </section>

      <aside class="summary">

        <h2>Résumé</h2>

        <div class="summary-row">
          <span>Articles</span>
          <span>{{ cart.totalItems }}</span>
        </div>

        <div class="summary-row">
          <span>Sous-total</span>
          <span>{{ cart.totalPrice }} DH</span>
        </div>

        <div class="summary-row">
          <span>Livraison</span>
          <span>À calculer</span>
        </div>

        <div class="total">
          <span>TOTAL</span>

          <strong>
            {{ cart.totalPrice }} DH
          </strong>
        </div>

        <button class="checkout">
          PASSER LA COMMANDE
        </button>

      </aside>

    </div>

  </main>
</template>

<style scoped>

.cart-page {
  padding: 60px 7%;
}

.cart-header {
  margin-bottom: 50px;
}

.cart-header p {
  font-size: 10px;
  letter-spacing: 3px;
  color: #777;
}

.cart-header h1 {
  font-size: 42px;
  font-weight: 400;
  margin-top: 10px;
}

.empty-cart {
  text-align: center;
  padding: 100px 0;
}

.empty-cart h2 {
  font-weight: 400;
  margin-bottom: 30px;
}

.empty-cart a {
  background: #111;
  color: white;
  text-decoration: none;
  padding: 15px 25px;
  font-size: 11px;
  letter-spacing: 1px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 60px;
}

.cart-item {
  display: flex;
  gap: 25px;
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #ddd;
}

.cart-item img {
  width: 180px;
  height: 220px;
  object-fit: cover;
  background: #f3f3f3;
}

.item-info {
  flex: 1;
}

.item-info h2 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

.item-info p {
  font-size: 12px;
  color: #777;
  margin-bottom: 15px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.remove {
  border: none;
  background: none;
  margin-top: 20px;
  font-size: 10px;
  letter-spacing: 1px;
  text-decoration: underline;
  cursor: pointer;
}

.summary {
  padding: 30px;
  background: #f7f7f7;
  height: fit-content;
}

.summary h2 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 30px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 20px;
}

.total {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
}

.checkout {
  width: 100%;
  height: 50px;
  margin-top: 30px;
  background: #111;
  color: white;
  border: none;
  cursor: pointer;
  letter-spacing: 1px;
}

@media (max-width: 800px) {

  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item img {
    width: 130px;
    height: 170px;
  }
}

</style>