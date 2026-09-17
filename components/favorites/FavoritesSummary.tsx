"use client";

type FavoritesSummaryProps = {
  total: number;
  visible: number;
};

export default function FavoritesSummary({
  total,
  visible,
}: FavoritesSummaryProps) {
  return (
    <section className="favorites-summary section">
      <div className="container">
        <div className="favorites-summary-grid">
          <div className="favorite-summary-card surface">
            <span className="favorite-summary-icon">
              ★
            </span>

            <div>
              <span className="favorite-summary-label">
                Total favorites
              </span>

              <strong className="favorite-summary-value">
                {total.toString().padStart(2, "0")}
              </strong>
            </div>
          </div>

          <div className="favorite-summary-card surface">
            <span className="favorite-summary-icon">
              ◇
            </span>

            <div>
              <span className="favorite-summary-label">
                Currently shown
              </span>

              <strong className="favorite-summary-value">
                {visible.toString().padStart(2, "0")}
              </strong>
            </div>
          </div>

          <div className="favorite-summary-card surface">
            <span className="favorite-summary-icon">
              U
            </span>

            <div>
              <span className="favorite-summary-label">
                Storage
              </span>

              <strong className="favorite-summary-status">
                Local
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}