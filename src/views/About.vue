<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const aboutPhotos = [
  { src: '/products/about.jpg', alt: 'QBIYA contemporary collection' },
  { src: '/products/modelwomen.jpg', alt: 'QBIYA womenswear campaign' },
  { src: '/products/about1.jpg', alt: 'QBIYA menswear campaign' }
]
const currentPhoto = ref(0)
let photoTimer = 0

onMounted(() => {
  aboutPhotos.slice(1).forEach(photo => {
    const image = new Image()
    image.src = photo.src
  })

  photoTimer = window.setInterval(() => {
    currentPhoto.value = (currentPhoto.value + 1) % aboutPhotos.length
  }, 3000)
})

onUnmounted(() => window.clearInterval(photoTimer))
</script>

<template>
  <main class="about-page">

    <!-- HERO -->
    <section class="about-hero" v-reveal>
      <p class="eyebrow">ABOUT QBIYA</p>

      <h1>
        ROOTED IN<br />
        MOROCCAN CULTURE.
      </h1>

      <p class="hero-text">
        QBIYA is a contemporary fashion brand inspired by Moroccan identity,
        combining traditional inspiration with modern design.
      </p>
    </section>

    <!-- STORY -->
    <section class="about-story" v-reveal>
      <div class="story-image">
        <Transition name="about-photo">
          <img
            :key="aboutPhotos[currentPhoto].src"
            :src="aboutPhotos[currentPhoto].src"
            :alt="aboutPhotos[currentPhoto].alt"
          />
        </Transition>
      </div>

      <div class="story-content">
        <p class="section-label">OUR STORY</p>

        <h2>
          TRADITION.<br />
          REDEFINED.
        </h2>

        <p>
          QBIYA was created with a simple idea: bring Moroccan style into
          contemporary fashion.
        </p>

        <p>
          Every piece is designed to balance comfort, simplicity and
          character while keeping a connection with Moroccan culture.
        </p>

        <p>
          Our goal is to create timeless pieces that can be worn today,
          tomorrow and beyond.
        </p>
      </div>
    </section>

    <!-- VALUES -->
    <section class="values" v-reveal>

      <div class="values-header">
        <p class="section-label">WHAT WE BELIEVE IN</p>

        <h2>
          SIMPLE.<br />
          AUTHENTIC.<br />
          TIMELESS.
        </h2>
      </div>

      <div class="values-grid">

        <div class="value">
          <span>01</span>
          <h3>QUALITY</h3>
          <p>
            We focus on creating pieces with attention to materials,
            details and finishing.
          </p>
        </div>

        <div class="value">
          <span>02</span>
          <h3>IDENTITY</h3>
          <p>
            Moroccan culture is part of our inspiration and our visual
            language.
          </p>
        </div>

        <div class="value">
          <span>03</span>
          <h3>MODERNITY</h3>
          <p>
            We reinterpret traditional inspiration through a contemporary
            perspective.
          </p>
        </div>

      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta" v-reveal>
      <p class="section-label">DISCOVER QBIYA</p>

      <h2>
        FIND YOUR<br />
        PIECE.
      </h2>

      <RouterLink to="/shop">
        SHOP COLLECTION →
      </RouterLink>
    </section>

  </main>
</template>

<style scoped>
.about-page {
  background: var(--paper, #fbfaf8);
  color: #171714;
}

/* HERO */

.about-hero {
  min-height: min(76vh, 780px);
  max-width: 1480px;
  margin: 0 auto;
  padding: 100px 7%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(250px, 0.48fr);
  align-content: center;
  align-items: end;
  column-gap: 7%;
}

.eyebrow,
.section-label {
  color: #827d74;
  font-size: 9px;
  letter-spacing: 2.5px;
  margin: 0 0 24px;
}

.about-hero .eyebrow {
  grid-column: 1 / -1;
}

.about-hero h1 {
  font-family: var(--font-display);
  font-size: clamp(58px, 8.2vw, 120px);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: 0;
  margin: 0;
}

.hero-text {
  max-width: 380px;
  margin: 0 0 5px auto;
  color: #706e68;
  font-size: 14px;
  line-height: 1.9;
}

/* STORY */

.about-story {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  min-height: 650px;
}

.story-image {
  position: relative;
  min-height: 650px;
  overflow: hidden;
  background: #e7e5e0;
}

.story-image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  display: block;
}

.about-photo-enter-active,
.about-photo-leave-active {
  transition: opacity 750ms ease;
}

.about-photo-enter-active {
  z-index: 1;
  animation: about-photo-zoom 3s ease-out both;
}

.about-photo-enter-from,
.about-photo-leave-to {
  opacity: 0;
}

@keyframes about-photo-zoom {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.045);
  }
}

.story-content {
  padding: clamp(64px, 8vw, 120px) 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f1efeb;
}

.story-content h2 {
  font-family: var(--font-display);
  font-size: clamp(42px, 4.2vw, 64px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0;
  margin: 0 0 30px;
}

.story-content p:not(.section-label) {
  max-width: 450px;
  color: #706e68;
  font-size: 13px;
  line-height: 1.9;
  margin: 0 0 16px;
}

/* VALUES */

.values {
  max-width: 1480px;
  margin: 0 auto;
  padding: 130px 7%;
}

.values-header {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: start;
  gap: 30px;
}

.values-header h2 {
  font-family: var(--font-display);
  font-size: clamp(48px, 6.5vw, 92px);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: 0;
  margin: 0 0 76px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px;
}

.value span {
  font-size: 10px;
  color: #94735e;
}

.value h3 {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1.7px;
  margin: 22px 0 14px;
}

.value p {
  max-width: 280px;
  color: #706e68;
  font-size: 13px;
  line-height: 1.9;
  margin: 0;
}

.value::before {
  display: block;
  width: 100%;
  height: 1px;
  background: #dedad3;
  content: '';
}

/* CTA */

.about-cta {
  padding: 120px 7%;
  background: #f1efeb;
  color: #171714;
}

.about-cta .section-label {
  color: #827d74;
}

.about-cta h2 {
  font-family: var(--font-display);
  font-size: clamp(60px, 9vw, 126px);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: 0;
  margin: 0 0 42px;
}

.about-cta a {
  display: inline-block;
  color: #171714;
  text-decoration: none;
  font-size: 9px;
  letter-spacing: 1.8px;
  border-bottom: 1px solid #94735e;
  padding-bottom: 9px;
  transition: color 180ms ease;
}

.about-cta a:hover {
  color: #94735e;
}

/* MOBILE */

@media (max-width: 800px) {

  .about-hero {
    min-height: 0;
    grid-template-columns: 1fr;
    row-gap: 24px;
    padding: 92px 6%;
  }

  .about-hero h1 {
    letter-spacing: 0;
  }

  .hero-text {
    margin: 0;
    max-width: 460px;
  }

  .about-story {
    grid-template-columns: 1fr;
  }

  .story-image {
    height: min(105vw, 620px);
    min-height: 0;
  }

  .story-content {
    padding: 72px 7%;
  }

  .story-content h2 {
    font-size: clamp(42px, 8vw, 58px);
  }

  .values {
    padding: 90px 7%;
  }

  .values-header {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .values-header h2 {
    margin-bottom: 52px;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .about-cta {
    padding: 90px 7%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-photo-enter-active,
  .about-photo-leave-active {
    transition: none;
    animation: none;
  }
}
</style>