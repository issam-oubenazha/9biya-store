<template>
  <main class="contact-page">

    <div class="contact-card">

      <p class="brand">QBIYA</p>

      <h1>CONTACT</h1>

      <p class="subtitle">
        GET IN TOUCH WITH US
      </p>

      <div class="contact-links">

        <a href="https://instagram.com/qbiya" target="_blank">
          <span>INSTAGRAM</span>
          <strong>@qbiya</strong>
        </a>

        <a href="https://tiktok.com/@qbiya" target="_blank">
          <span>TIKTOK</span>
          <strong>@qbiya</strong>
        </a>

        <a href="mailto:contact@qbiya.ma">
          <span>EMAIL</span>
          <strong>contact@qbiya.ma</strong>
        </a>

        <a href="tel:+212600000000">
          <span>PHONE</span>
          <strong>+212 6 00 00 00 00</strong>
        </a>

      </div>

      <RouterLink to="/shop" class="shop-link">
        SHOP COLLECTION →
      </RouterLink>

    </div>

  </main>
</template>

<style scoped>
.contact-page {
  min-height: calc(100vh - 80px);
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

/* CARD */

.contact-card {
  width: 100%;
  max-width: 430px;
  padding: 55px 50px;
  border: 1px solid #333;
  background: #050505;
  color: white;
  text-align: center;
}

/* BRAND */

.brand {
  font-size: 9px;
  letter-spacing: 5px;
  color: #888;
  margin: 0 0 20px;
}

/* TITLE */

h1 {
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -2px;
  margin: 0;
}

.subtitle {
  font-size: 8px;
  letter-spacing: 3px;
  color: #777;
  margin: 15px 0 45px;
}

/* LINKS */

.contact-links {
  border-top: 1px solid #292929;
}

.contact-links a {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 19px 0;

  border-bottom: 1px solid #292929;

  color: white;
  text-decoration: none;

  transition: opacity 0.25s ease;
}

.contact-links a:hover {
  opacity: 0.5;
}

.contact-links span {
  font-size: 8px;
  letter-spacing: 2px;
  color: #777;
}

.contact-links strong {
  font-size: 11px;
  font-weight: 400;
}

/* SHOP */

.shop-link {
  display: inline-block;
  margin-top: 40px;

  color: white;
  text-decoration: none;

  font-size: 8px;
  letter-spacing: 2px;

  border-bottom: 1px solid white;
  padding-bottom: 7px;
}

/* MOBILE */

@media (max-width: 600px) {

  .contact-page {
    padding: 25px 15px;
  }

  .contact-card {
    padding: 45px 25px;
  }

  h1 {
    font-size: 40px;
  }

  .contact-links a {
    padding: 17px 0;
  }

  .contact-links strong {
    font-size: 10px;
  }
}
</style>