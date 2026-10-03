<template>
  <main class="about-page">

    <!-- HERO -->
    <section class="about-hero">
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
    <section class="about-story">
      <div class="story-image">
        <img src="/products/hero.jpg" alt="QBIYA" />
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
    <section class="values">

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
    <section class="about-cta">
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
  background: #fff;
  color: #111;
}

/* HERO */

.about-hero {
  min-height: 80vh;
  padding: 120px 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.eyebrow,
.section-label {
  font-size: 9px;
  letter-spacing: 3px;
  color: #777;
  margin-bottom: 25px;
}

.about-hero h1 {
  font-size: clamp(55px, 9vw, 130px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -5px;
  margin: 0;
}

.hero-text {
  max-width: 520px;
  margin-top: 45px;
  font-size: 15px;
  line-height: 1.8;
  color: #666;
}

/* STORY */

.about-story {
  display: grid;
  grid-template-columns: 55% 45%;
  min-height: 700px;
}

.story-image {
  overflow: hidden;
}

.story-image img {
  width: 100%;
  height: 100%;
  min-height: 700px;
  object-fit: cover;
}

.story-content {
  padding: 100px 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.story-content h2 {
  font-size: 55px;
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -2px;
  margin: 0 0 40px;
}

.story-content p:not(.section-label) {
  max-width: 450px;
  font-size: 14px;
  line-height: 1.9;
  color: #666;
  margin-bottom: 20px;
}

/* VALUES */

.values {
  padding: 140px 7%;
}

.values-header h2 {
  font-size: clamp(50px, 7vw, 100px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -4px;
  margin: 0 0 100px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  border-top: 1px solid #ddd;
  padding-top: 40px;
}

.value span {
  font-size: 10px;
  color: #888;
}

.value h3 {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 2px;
  margin: 30px 0 20px;
}

.value p {
  max-width: 280px;
  color: #666;
  font-size: 13px;
  line-height: 1.8;
}

/* CTA */

.about-cta {
  padding: 150px 7%;
  background: #111;
  color: #fff;
}

.about-cta .section-label {
  color: #aaa;
}

.about-cta h2 {
  font-size: clamp(60px, 10vw, 140px);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: -5px;
  margin: 0 0 60px;
}

.about-cta a {
  display: inline-block;
  color: #fff;
  text-decoration: none;
  font-size: 9px;
  letter-spacing: 2px;
  border-bottom: 1px solid #fff;
  padding-bottom: 8px;
}

/* MOBILE */

@media (max-width: 800px) {

  .about-hero {
    min-height: 70vh;
    padding: 80px 6%;
  }

  .about-hero h1 {
    letter-spacing: -3px;
  }

  .about-story {
    grid-template-columns: 1fr;
  }

  .story-image img {
    min-height: 500px;
  }

  .story-content {
    padding: 80px 6%;
  }

  .story-content h2 {
    font-size: 45px;
  }

  .values {
    padding: 90px 6%;
  }

  .values-header h2 {
    margin-bottom: 60px;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .about-cta {
    padding: 100px 6%;
  }
}
</style>