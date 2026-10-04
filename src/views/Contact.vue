<template>
  <main class="contact-page">
    <section class="contact-layout">
      <div class="contact-image" v-reveal>
        <img src="/products/hello.jpg" alt="QBIYA contemporary collection" />
        <p class="image-caption">MADE WITH A SENSE OF PLACE</p>
      </div>

      <div class="contact-content" v-reveal>
        <p class="eyebrow"><span></span> QBIYA / CONTACT</p>
        <h1>LET'S START<br />A CONVERSATION.</h1>
        <p class="intro">
          Questions about a piece, an order, or working together? We would
          love to hear from you.
        </p>

        <div class="contact-links" aria-label="Contact information">
          <a href="https://instagram.com/qbiya" target="_blank" rel="noopener noreferrer">
            <span class="contact-type">01 / INSTAGRAM</span>
            <strong>@qbiya</strong>
            <span class="contact-arrow" aria-hidden="true">↗</span>
          </a>

          <a href="https://tiktok.com/@qbiya" target="_blank" rel="noopener noreferrer">
            <span class="contact-type">02 / TIKTOK</span>
            <strong>@qbiya</strong>
            <span class="contact-arrow" aria-hidden="true">↗</span>
          </a>

          <a href="mailto:contact@qbiya.ma">
            <span class="contact-type">03 / EMAIL</span>
            <strong>contact@qbiya.ma</strong>
            <span class="contact-arrow" aria-hidden="true">↗</span>
          </a>

          <a href="tel:+212600000000">
            <span class="contact-type">04 / PHONE</span>
            <strong>+212 6 00 00 00 00</strong>
            <span class="contact-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <RouterLink to="/shop" class="shop-link">
          <span>EXPLORE THE COLLECTION</span>
          <span aria-hidden="true">→</span>
        </RouterLink>
    </div>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  min-height: calc(100vh - 80px);
  padding: 56px 7%;
  background: #f5f3ef;
  color: #171714;
}

.contact-layout {
  width: 100%;
  max-width: 1240px;
  min-height: 680px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  align-items: center;
  gap: clamp(48px, 8vw, 120px);
}

.contact-image {
  position: relative;
  min-height: 610px;
  overflow: hidden;
  background: #ded8cf;
}

.contact-image::after {
  position: absolute;
  inset: 45% 0 0;
  content: '';
  background: linear-gradient(transparent, rgb(0 0 0 / 42%));
  pointer-events: none;
}

.contact-image img {
  width: 100%;
  height: 100%;
  min-height: 610px;
  display: block;
  object-fit: cover;
  object-position: center;
}

.image-caption {
  position: absolute;
  z-index: 1;
  right: 28px;
  bottom: 24px;
  left: 28px;
  margin: 0;
  color: #fff;
  font-size: 9px;
  letter-spacing: 2px;
}

.contact-content {
  padding: 36px 0;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 30px;
  color: #77756f;
  font-size: 9px;
  letter-spacing: 2px;
}

.eyebrow span {
  width: 22px;
  height: 1px;
  background: #94735e;
}

h1 {
  font-family: var(--font-display);
  margin: 0;
  font-size: clamp(46px, 5.3vw, 76px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: 0;
}

.intro {
  max-width: 390px;
  margin: 24px 0 42px;
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
  min-height: 66px;
  border-bottom: 1px solid #d9d5ce;
  color: inherit;
  text-decoration: none;
  transition: color 180ms ease, padding 180ms ease;
}

.contact-links a:hover {
  padding-right: 4px;
  padding-left: 4px;
  color: #94735e;
}

.contact-type {
  flex: 1;
  color: #77756f;
  font-size: 9px;
  letter-spacing: 1.5px;
}

.contact-links strong {
  font-size: 13px;
  font-weight: 400;
}

.contact-arrow {
  color: #94735e;
  font-size: 14px;
}

.shop-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 235px;
  margin-top: 32px;
  padding-bottom: 10px;
  border-bottom: 1px solid #94735e;
  color: #171714;
  text-decoration: none;
  font-size: 9px;
  letter-spacing: 1.5px;
  transition: color 180ms ease;
}

.shop-link:hover {
  color: #94735e;
}

@media (max-width: 760px) {
  .contact-page {
    padding: 28px 20px 56px;
  }

  .contact-layout {
    min-height: 0;
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .contact-image,
  .contact-image img {
    min-height: 0;
    height: min(105vw, 470px);
  }

  .contact-image img {
    object-position: center 35%;
  }

  .contact-content {
    padding: 0;
  }

  .eyebrow {
    margin-bottom: 22px;
  }

  h1 {
    font-size: clamp(42px, 11vw, 64px);
    letter-spacing: 0;
  }

  .intro {
    margin: 20px 0 30px;
  }
}

@media (max-width: 420px) {
  .contact-links a {
    gap: 8px;
  }

  .contact-type {
    font-size: 8px;
    letter-spacing: 1px;
  }

  .contact-links strong {
    font-size: 11px;
  }
}
</style>