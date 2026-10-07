<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const featuredProducts = products.slice(0, 4)
const heroSlides = [
  { src: '/products/home4.jpg', alt: 'QBIYA womenswear campaign' },
  { src: '/products/home7.png', alt: 'QBIYA menswear campaign' },
  { src: '/products/home6.png', alt: 'QBIYA monochrome fashion portrait' }
]
const currentSlide = ref(0)
const heroOffset = ref(0)
let scrollFrame = 0
let autoplayTimer = 0
let swipeStartX = null

function scheduleAutoplay(delay = 3000) {
  window.clearTimeout(autoplayTimer)
  autoplayTimer = window.setTimeout(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.length
    scheduleAutoplay()
  }, delay)
}

function goToSlide(index) {
  currentSlide.value = (index + heroSlides.length) % heroSlides.length
  scheduleAutoplay(5000)
}

function changeSlide(direction) {
  goToSlide(currentSlide.value + direction)
}

function startHeroSwipe(event) {
  if ((event.pointerType === 'mouse' && event.button !== 0) || event.target.closest('button, a')) return
  swipeStartX = event.clientX
}

function endHeroSwipe(event) {
  if (swipeStartX === null) return

  const distance = event.clientX - swipeStartX
  swipeStartX = null

  if (Math.abs(distance) >= 48) {
    changeSlide(distance < 0 ? 1 : -1)
  }
}

function cancelHeroSwipe() {
  swipeStartX = null
}

function updateHeroParallax() {
  if (scrollFrame) return

  scrollFrame = requestAnimationFrame(() => {
    heroOffset.value = Math.min(window.scrollY * 0.08, 70)
    scrollFrame = 0
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateHeroParallax, { passive: true })
  scheduleAutoplay()
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateHeroParallax)
  cancelAnimationFrame(scrollFrame)
  window.clearTimeout(autoplayTimer)
})
</script>

<template>
  <main class="home">

    <!-- HERO -->
    <section
      class="hero"
      aria-label="QBIYA fashion campaign"
      aria-roledescription="carousel"
      tabindex="0"
      @pointerdown="startHeroSwipe"
      @pointerup="endHeroSwipe"
      @pointercancel="cancelHeroSwipe"
      @keydown.left.prevent="changeSlide(-1)"
      @keydown.right.prevent="changeSlide(1)"
    >
      <div
        class="hero-media"
        :style="{ transform: `translate3d(0, -${heroOffset}px, 0) scale(1.08)` }"
        aria-hidden="true"
      >
        <div
          v-for="(slide, index) in heroSlides"
          :key="slide.src"
          class="hero-slide"
          :class="{ 'is-active': index === currentSlide }"
        >
          <img
            :src="slide.src"
            alt=""
            :fetchpriority="index === 0 ? 'high' : 'low'"
            decoding="async"
            draggable="false"
          />
        </div>
      </div>
      <div :key="currentSlide" class="hero-content">
        <p class="hero-label">NEW COLLECTION</p>

        <h1>
          MOROCCAN
          <br />
          ESSENCE
        </h1>

        <p class="hero-description">
          Modern Moroccan pieces designed for a timeless style.
        </p>

        <RouterLink to="/shop" class="hero-button">
          SHOP NOW
        </RouterLink>
      </div>

      <div class="hero-controls" aria-label="Campaign slides">
        <button
          class="hero-arrow"
          type="button"
          aria-label="Previous campaign image"
          @click.stop="changeSlide(-1)"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div class="hero-dots">
          <button
            v-for="(slide, index) in heroSlides"
            :key="slide.src"
            class="hero-dot"
            :class="{ 'is-active': index === currentSlide }"
            type="button"
            :aria-label="`Show campaign image ${index + 1}`"
            :aria-current="index === currentSlide ? 'true' : undefined"
            @click.stop="goToSlide(index)"
          ></button>
        </div>

        <button
          class="hero-arrow"
          type="button"
          aria-label="Next campaign image"
          @click.stop="changeSlide(1)"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>

    <!-- INTRO -->
    <section class="intro" v-reveal>
      <p class="section-label">QBIYA</p>

      <h2>
        ROOTED IN MOROCCO.
        <br />
        MADE FOR TODAY.
      </h2>

      <p>
        We create contemporary pieces inspired by Moroccan culture,
        combining tradition, simplicity and modern fashion.
      </p>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="featured" v-reveal>
      <div class="section-header">
        <div>
          <p class="section-label">DISCOVER</p>
          <h2>FEATURED PIECES</h2>
        </div>

        <RouterLink to="/shop" class="view-all">
          VIEW ALL →
        </RouterLink>
      </div>

      <div class="products-grid">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="categories">

      <RouterLink
        to="/shop?category=homme"
        class="category-card category-men"
        v-reveal
      >
        <div>
          <p>COLLECTION</p>
          <h2>HOMME</h2>
          <span>DISCOVER →</span>
        </div>
      </RouterLink>

      <RouterLink
        to="/shop?category=femme"
        class="category-card category-women"
        v-reveal
      >
        <div>
          <p>COLLECTION</p>
          <h2>FEMME</h2>
          <span>DISCOVER →</span>
        </div>
      </RouterLink>

    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter" v-reveal>
      <p class="section-label">STAY CONNECTED</p>

      <h2>
        JOIN THE QBIYA
        <br />
        COMMUNITY
      </h2>

      <p>
        Subscribe to receive new collection announcements
        and exclusive updates.
      </p>

      <form class="newsletter-form" @submit.prevent>
        <input
          type="email"
          placeholder="YOUR EMAIL ADDRESS"
        />

        <button type="submit">
          SUBSCRIBE
        </button>
      </form>
    </section>
    <section class="home-contact">
      <div class="home-contact-layout">
        <div class="home-contact-image" v-reveal>
          <img src="/products/contact.jpg" alt="QBIYA contemporary collection" />
          <p>MADE WITH A SENSE OF PLACE</p>
        </div>

        <div class="home-contact-content" v-reveal>
          <p class="contact-brand"><span></span> QBIYA / STAY IN TOUCH</p>
          <h2>LET'S TALK.</h2>
          <p class="contact-intro">
            Have a question or just want to say hello? Our door is always open.
          </p>

          <div class="contact-links" aria-label="Contact information">
            <a
              href="https://instagram.com/qbiya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>01 / INSTAGRAM</span>
              <strong>@qbiya</strong>
              <span class="contact-arrow" aria-hidden="true">↗</span>
            </a>

            <a
              href="https://tiktok.com/@qbiya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>02 / TIKTOK</span>
              <strong>@qbiya</strong>
              <span class="contact-arrow" aria-hidden="true">↗</span>
            </a>

            <a href="mailto:contact@qbiya.ma">
              <span>03 / EMAIL</span>
              <strong>contact@qbiya.ma</strong>
              <span class="contact-arrow" aria-hidden="true">↗</span>
            </a>

            <a href="tel:+212600000000">
              <span>04 / PHONE</span>
              <strong>+212 6 00 00 00 00</strong>
              <span class="contact-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.home {
  background: #fff;
  color: #111;
}

/* HERO */

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 7% 120px;
  position: relative;
  overflow: hidden;
  background: #252728;
  color: white;
  touch-action: pan-y;
  user-select: none;
}

.hero::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(0deg, rgb(0 0 0 / 42%), transparent 70%),
    rgb(0 0 0 / 28%);
  pointer-events: none;
}

.hero-media {
  position: absolute;
  inset: -8% -3%;
  will-change: transform;
}

.hero-slide {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 1200ms cubic-bezier(0.2, 0.65, 0.3, 1);
  will-change: opacity;
}

.hero-slide.is-active {
  opacity: 1;
}

.hero-slide img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center 38%;
  transform: scale(1.04);
}

.hero-slide.is-active img {
  animation: hero-ken-burns 5s ease-out both;
}

@keyframes hero-ken-burns {
  from {
    transform: scale(1.04);
  }

  to {
    transform: scale(1.1);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
  animation: hero-copy-in 650ms both;
}

@keyframes hero-copy-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-label,
.section-label {
  font-size: 11px;
  letter-spacing: 3px;
  font-weight: 500;
  margin-bottom: 18px;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(55px, 9vw, 130px);
  line-height: 0.88;
  letter-spacing: 0;
  font-weight: 400;
  margin: 0 0 30px;
}

.hero-description {
  font-size: 15px;
  max-width: 460px;
  line-height: 1.7;
  margin: 24px auto 35px;
}

.hero-button {
  display: inline-block;
  min-width: 150px;
  padding: 16px 28px;
  border: 1px solid #fff;
  background: white;
  color: #111;
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 2px;
  transition: color 250ms ease, background-color 250ms ease;
}

.hero-button:hover {
  background: transparent;
  color: #fff;
}

.hero-controls {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 36px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
}

.hero-arrow {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 45%);
  border-radius: 50%;
  background: transparent;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  transition: background-color 200ms ease, color 200ms ease;
}

.hero-arrow:hover {
  background: #fff;
  color: #111;
}

.hero-dots {
  display: flex;
  align-items: center;
  gap: 9px;
}

.hero-dot {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.hero-dot::after {
  width: 7px;
  height: 7px;
  border: 1px solid #fff;
  border-radius: 50%;
  content: '';
  transition: width 250ms ease, height 250ms ease, border-radius 250ms ease,
    background-color 250ms ease;
}

.hero-dot.is-active::after {
  width: 20px;
  height: 6px;
  border-radius: 6px;
  background: #fff;
}

/* INTRO */

.intro {
  padding: 130px 7%;
  text-align: center;
  max-width: 850px;
  margin: auto;
}

.intro h2 {
  font-family: var(--font-display);
  font-size: clamp(35px, 5vw, 65px);
  line-height: 0.95;
  font-weight: 400;
  letter-spacing: 0;
  margin-bottom: 30px;
}

.intro > p:last-child {
  max-width: 550px;
  margin: auto;
  color: #666;
  line-height: 1.8;
}

/* FEATURED */

.featured {
  padding: 80px 7%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.section-header h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 35px;
  font-weight: 400;
  letter-spacing: 0;
}

.view-all {
  color: #111;
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 2px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* CATEGORIES */

.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 80px;
}

.category-card {
  min-height: 600px;
  display: flex;
  align-items: flex-end;
  padding: 50px;
  text-decoration: none;
  color: white;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.category-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    transparent,
    rgba(0, 0, 0, 0.65)
  );
}

.category-card > div {
  position: relative;
  z-index: 1;
}

.category-card p {
  font-size: 10px;
  letter-spacing: 3px;
}

.category-card h2 {
  font-size: 55px;
  font-weight: 500;
  margin: 10px 0 20px;
}

.category-card span {
  font-size: 10px;
  letter-spacing: 2px;
}

.category-men {
  background-image: url('/products/cool Jacket.jpg');
}

.category-women {
  background-image: url('/products/modelwomen.jpg');
}

/* NEWSLETTER */

.newsletter {
  padding: 140px 20px;
  text-align: center;
  max-width: 700px;
  margin: auto;
}

.newsletter h2 {
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 70px);
  line-height: 0.9;
  font-weight: 400;
  letter-spacing: 0;
  margin-bottom: 30px;
}

.newsletter > p:not(.section-label) {
  color: #666;
  line-height: 1.7;
  margin-bottom: 35px;
}

.newsletter-form {
  display: flex;
  border-bottom: 1px solid #111;
}

.newsletter-form input {
  flex: 1;
  border: none;
  outline: none;
  padding: 15px 0;
  font-size: 12px;
}

.newsletter-form button {
  border: none;
  background: none;
  font-size: 10px;
  letter-spacing: 2px;
  cursor: pointer;
}

/* RESPONSIVE */

@media (max-width: 1000px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-card {
    min-height: 500px;
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: 100svh;
    padding: 100px 25px 112px;
  }

  .hero h1 {
    letter-spacing: 0;
  }

  .intro,
  .featured {
    padding: 80px 25px;
  }

  .section-header {
    align-items: flex-start;
    gap: 20px;
  }

  .section-header h2 {
    font-size: 30px;
  }

  .categories {
    grid-template-columns: 1fr;
  }

  .category-card {
    min-height: 450px;
    padding: 30px;
  }

  .category-card h2 {
    font-size: 45px;
  }

  .newsletter {
    padding: 100px 25px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide,
  .hero-button,
  .hero-arrow,
  .hero-dot::after {
    transition-duration: 0.01ms;
  }

  .hero-slide.is-active img,
  .hero-content {
    animation: none;
  }
}
.home-contact {
  padding: 80px 7%;
  background: #f5f3ef;
  color: #171714;
}

.home-contact-layout {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(48px, 8vw, 120px);
}

.home-contact-image {
  position: relative;
  height: 500px;
  overflow: hidden;
  background: #ded8cf;
}

.home-contact-image::after {
  position: absolute;
  inset: 45% 0 0;
  content: '';
  background: linear-gradient(transparent, rgb(0 0 0 / 42%));
  pointer-events: none;
}

.home-contact-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

.home-contact-image p {
  position: absolute;
  z-index: 1;
  right: 24px;
  bottom: 20px;
  left: 24px;
  margin: 0;
  color: #fff;
  font-size: 9px;
  letter-spacing: 2px;
}

.home-contact-content {
  padding: 24px 0;
}

.contact-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 24px;
  color: #77756f;
  font-size: 9px;
  letter-spacing: 2px;
}

.contact-brand span {
  width: 22px;
  height: 1px;
  background: #94735e;
}

.home-contact-content h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 78px);
  line-height: 0.95;
  font-weight: 400;
  letter-spacing: 0;
}

.contact-intro {
  max-width: 390px;
  margin: 20px 0 34px;
  color: #706e68;
  font-size: 14px;
  line-height: 1.8;
}

.contact-links {
  border-top: 1px solid #d9d5ce;
}

.contact-links a {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 60px;
  border-bottom: 1px solid #d9d5ce;
  color: #171714;
  text-decoration: none;
  transition: color 180ms ease, padding 180ms ease;
}

.contact-links span {
  flex: 1;
  color: #77756f;
  font-size: 9px;
  letter-spacing: 1.5px;
}

.contact-links strong {
  font-size: 13px;
  font-weight: 400;
}

.contact-links a:hover {
  padding-right: 4px;
  padding-left: 4px;
  color: #94735e;
}

.contact-links .contact-arrow {
  flex: initial;
  color: #94735e;
  font-size: 14px;
}

@media (max-width: 760px) {
  .home-contact {
    padding: 56px 20px;
  }

  .home-contact-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .home-contact-image {
    height: min(105vw, 460px);
  }

  .home-contact-content {
    padding: 0;
  }

  .contact-brand {
    margin-bottom: 20px;
  }

  .home-contact-content h2 {
    font-size: clamp(48px, 11vw, 70px);
  }
}

@media (max-width: 420px) {
  .contact-links a {
    gap: 8px;
  }

  .contact-links span {
    font-size: 8px;
    letter-spacing: 1px;
  }

  .contact-links strong {
    font-size: 11px;
  }
}
</style>