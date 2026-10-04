<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

watch(
  () => cart.drawerOpen,
  isOpen => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
)

function handleKeydown(event) {
  if (event.key === 'Escape') cart.closeDrawer()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Transition name="drawer">
    <div
      v-if="cart.drawerOpen"
      class="drawer-shell"
      @click.self="cart.closeDrawer"
    >
      <aside
        class="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <header class="drawer-header">
          <div>
            <p class="drawer-eyebrow">QBIYA / YOUR BAG</p>
            <h2 id="drawer-title">SHOPPING BAG <span>({{ cart.totalItems }})</span></h2>
          </div>
          <button
            class="drawer-close"
            type="button"
            aria-label="Close shopping bag"
            @click="cart.closeDrawer"
          >
            ×
          </button>
        </header>

        <div v-if="cart.items.length" class="drawer-items">
          <article
            v-for="item in cart.items"
            :key="`${item.id}-${item.size}`"
            class="drawer-item"
          >
            <img :src="item.image" :alt="item.name" />
            <div class="drawer-item-info">
              <div>
                <p class="drawer-item-brand">QBIYA</p>
                <h3>{{ item.name }}</h3>
                <p class="drawer-item-size">SIZE: {{ item.size }}</p>
              </div>
              <div class="drawer-item-actions">
                <div class="drawer-quantity" :aria-label="`Quantity: ${item.quantity}`">
                  <button
                    type="button"
                    :aria-label="`Decrease ${item.name} quantity`"
                    @click="cart.decreaseQuantity(item.id, item.size)"
                  >−</button>
                  <span>{{ item.quantity }}</span>
                  <button
                    type="button"
                    :aria-label="`Increase ${item.name} quantity`"
                    @click="cart.increaseQuantity(item.id, item.size)"
                  >+</button>
                </div>
                <button
                  class="drawer-remove"
                  type="button"
                  :aria-label="`Remove ${item.name} from bag`"
                  @click="cart.removeFromCart(item.id, item.size)"
                >
                  REMOVE
                </button>
              </div>
            </div>
            <p class="drawer-item-price">{{ item.price * item.quantity }} DH</p>
          </article>
        </div>

        <div v-else class="drawer-empty">
          <p>Your bag is waiting for something special.</p>
          <RouterLink to="/shop" @click="cart.closeDrawer">
            DISCOVER THE COLLECTION <span aria-hidden="true">→</span>
          </RouterLink>
        </div>

        <footer v-if="cart.items.length" class="drawer-footer">
          <div class="drawer-subtotal">
            <span>SUBTOTAL</span>
            <strong>{{ cart.totalPrice }} DH</strong>
          </div>
          <p>Delivery and taxes calculated at checkout.</p>
          <RouterLink
            to="/cart"
            class="drawer-checkout"
            @click="cart.closeDrawer"
          >
            VIEW BAG & CHECKOUT <span aria-hidden="true">→</span>
          </RouterLink>
        </footer>
      </aside>
    </div>
  </Transition>
</template>

<style scoped>
.drawer-shell {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  justify-content: flex-end;
  background: rgb(23 23 20 / 44%);
}

.cart-drawer {
  width: min(480px, 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px clamp(22px, 4vw, 38px);
  background: #fff;
  box-shadow: -12px 0 40px rgb(0 0 0 / 8%);
}

.drawer-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 23px;
  border-bottom: 1px solid var(--line);
}

.drawer-eyebrow,
.drawer-item-brand {
  margin: 0 0 9px;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 1.8px;
}

.drawer-header h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.1px;
}

.drawer-header h2 span {
  color: var(--muted);
  font-weight: 400;
}

.drawer-close {
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  font-size: 25px;
  line-height: 1;
}

.drawer-items {
  flex: 1;
  overflow-y: auto;
}

.drawer-item {
  position: relative;
  display: grid;
  grid-template-columns: 92px 1fr auto;
  align-items: start;
  gap: 17px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}

.drawer-item > img {
  width: 92px;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  background: var(--paper);
}

.drawer-item-brand {
  margin-bottom: 7px;
  font-size: 8px;
}

.drawer-item-info h3 {
  margin: 0 0 7px;
  font-size: 12px;
  font-weight: 500;
}

.drawer-item-size {
  margin: 0;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 1px;
}

.drawer-item-price {
  margin: 2px 0 0;
  font-size: 11px;
  white-space: nowrap;
}

.drawer-item-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 18px;
}

.drawer-quantity {
  display: flex;
  align-items: center;
  height: 30px;
  border: 1px solid var(--line);
}

.drawer-quantity button {
  width: 29px;
  height: 28px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.drawer-quantity span {
  min-width: 20px;
  text-align: center;
  font-size: 10px;
}

.drawer-remove {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 8px;
  letter-spacing: 1px;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.drawer-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.drawer-empty p {
  margin: 0 0 24px;
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 28px;
}

.drawer-empty a,
.drawer-checkout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 16px 18px;
  background: var(--ink);
  color: #fff;
  font-size: 9px;
  letter-spacing: 1.4px;
  text-decoration: none;
  transition: background 180ms ease;
}

.drawer-empty a:hover,
.drawer-checkout:hover {
  background: var(--accent);
}

.drawer-footer {
  padding-top: 20px;
  border-top: 1px solid var(--line);
}

.drawer-subtotal {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  letter-spacing: 1px;
}

.drawer-subtotal strong {
  font-weight: 500;
  letter-spacing: 0;
}

.drawer-footer > p {
  margin: 10px 0 18px;
  color: var(--muted);
  font-size: 10px;
}

.drawer-checkout {
  width: 100%;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: background 350ms ease;
}

.drawer-enter-active .cart-drawer,
.drawer-leave-active .cart-drawer {
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  background: rgb(23 23 20 / 0%);
}

.drawer-enter-from .cart-drawer,
.drawer-leave-to .cart-drawer {
  transform: translateX(100%);
}

@media (max-width: 520px) {
  .cart-drawer {
    padding: 24px 18px;
  }

  .drawer-item {
    grid-template-columns: 76px minmax(0, 1fr);
    gap: 13px;
  }

  .drawer-item > img {
    width: 76px;
  }

  .drawer-item-price {
    position: absolute;
    top: 24px;
    right: 0;
  }

  .drawer-item-info h3 {
    padding-right: 66px;
  }

  .drawer-item-actions {
    gap: 10px;
  }
}
</style>