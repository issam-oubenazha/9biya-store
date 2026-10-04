<script setup>
import { useCartStore } from '../stores/cart'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cart = useCartStore()
</script>

<template>
  <article class="product-card" v-reveal>
    <RouterLink
      :to="`/product/${product.id}`"
      class="product-image"
      :aria-label="`View ${product.name}`"
    >
      <img
        class="primary-image"
        :src="product.images?.[0] || product.image"
        :alt="product.name"
      />
      <img
        v-if="product.images?.[1] && product.images[1] !== product.images[0]"
        class="secondary-image"
        :src="product.images[1]"
        :alt="`${product.name}, alternate view`"
        loading="lazy"
      />
    </RouterLink>

    <div class="product-info">
      <div class="product-copy">
        <p class="category">{{ product.category }}</p>
        <h3>{{ product.name }}</h3>
        <p class="price">{{ product.price }} DH</p>
      </div>
      <button
        class="quick-add"
        type="button"
        :aria-label="`Add ${product.name} to bag`"
        @click="cart.addToCart(product, product.sizes?.[0] || 'M')"
      >
        <span>ADD TO BAG</span><span aria-hidden="true">+</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  min-width: 0;
}

.product-image {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--paper);
}

.product-image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 850ms cubic-bezier(0.2, 0.65, 0.3, 1), opacity 500ms ease;
}

.product-image .secondary-image {
  opacity: 0;
}

.product-card:hover .product-image img {
  transform: scale(1.045);
}

.product-card:hover .product-image .secondary-image {
  opacity: 1;
}

.product-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding-top: 15px;
}

.category {
  margin: 0 0 7px;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.product-info h3 {
  margin: 0 0 7px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.8px;
}

.price {
  margin: 0;
  font-size: 12px;
}

.quick-add {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding: 3px 0 5px;
  border: 0;
  border-bottom: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  font-size: 8px;
  letter-spacing: 1.2px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 250ms ease, transform 250ms ease, border-color 250ms ease;
}

.product-card:hover .quick-add,
.quick-add:focus-visible {
  border-color: var(--ink);
  opacity: 1;
  transform: translateY(0);
}

.quick-add span:last-child {
  font-size: 15px;
  line-height: 0.7;
}

@media (max-width: 760px) {
  .quick-add {
    opacity: 1;
    transform: none;
  }

  .product-info h3 {
    font-size: 11px;
  }

  .product-info {
    flex-direction: column;
    gap: 10px;
  }
}
</style>