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

    <div class="product-image">
      <img
        :src="product.image"
        :alt="product.name"
      />
    </div>

    <div class="product-info">
      <p class="category">
        {{ product.category }}
      </p>

      <h3>{{ product.name }}</h3>

      <p class="price">
        {{ product.price }} DH
      </p>

      <button>
        Voir le produit
      </button>
    </div>

  </article>
</template>

<style scoped>
.product-card {
  background: white;
  overflow: hidden;
}

.product-image {
  height: 400px;
  background: #eee;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.category {
  font-size: 11px;
  letter-spacing: 2px;
  color: #888;
  text-transform: uppercase;
}

h3 {
  margin: 8px 0;
  font-size: 18px;
  font-weight: 500;
}

.price {
  font-weight: 600;
  margin-bottom: 15px;
}

button {
  width: 100%;
  padding: 12px;
  background: #171717;
  color: white;
  border: none;
  cursor: pointer;
}
</style>