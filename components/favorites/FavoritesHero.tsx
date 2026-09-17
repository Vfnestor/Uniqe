"use client";

export default function FavoritesHero() {
  return (
    <section className="favorites-hero section">
      <div className="container">
        <div className="favorites-hero-grid">
          <div className="favorites-hero-content">
            <span className="section-eyebrow">
              My U / Favorites
            </span>

            <h1 className="favorites-hero-title">
              Keep what matters.
            </h1>

            <p className="favorites-hero-description">
              Save the parts of Uniqe you want to return to
              quickly and keep your personal collection in one
              place.
            </p>
          </div>

          <div className="favorites-hero-visual">
            <div className="favorites-star-field">
              <span className="favorites-star favorites-star-one">
                ★
              </span>

              <span className="favorites-star favorites-star-two">
                ☆
              </span>

              <span className="favorites-star favorites-star-three">
                ✦
              </span>

              <div className="favorites-star-core">
                ★
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}