<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="product-card">

    <RouterLink
      :to="`/product/${product.id}`"
      class="product-image"
    >
      <img
        :src="product.images?.[0] || product.image"
        :alt="product.name"
      />
    </RouterLink>

    <div class="product-info">

      <p class="category">
        {{ product.category }}
      </p>

      <h3>{{ product.name }}</h3>

      <p class="price">
        {{ product.price }} DH
      </p>

      <RouterLink
        :to="`/product/${product.id}`"
        class="view-product"
      >
        VIEW PRODUCT →
      </RouterLink>

    </div>

  </article>
</template>

<style scoped>
.product-card {
  min-width: 0;
}

.product-image {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.product-image:hover img {
  transform: scale(1.04);
}

.product-info {
  padding-top: 15px;
}

.category {
  font-size: 9px;
  letter-spacing: 2px;
  color: #777;
  margin-bottom: 8px;
}

.product-info h3 {
  font-size: 13px;
  font-weight: 500;
  margin: 0 0 8px;
  letter-spacing: 0.5px;
}

.price {
  font-size: 13px;
  margin: 0 0 15px;
}

.view-product {
  color: #111;
  text-decoration: none;
  font-size: 9px;
  letter-spacing: 2px;
  border-bottom: 1px solid #111;
  padding-bottom: 4px;
}

@media (max-width: 600px) {
  .product-info h3 {
    font-size: 12px;
  }
}
</style>