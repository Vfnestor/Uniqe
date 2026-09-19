type CatalogItem = {
  id: string;
  name: string;
  status: string;
  projects?: number;
  type?: string;
  platform?: string;
};

type Props = {
  title: string;
  eyebrow: string;
  items: CatalogItem[];
};

export default function UWebAdminCatalog({
  title,
  eyebrow,
  items,
}: Props) {
  return (
    <section className="uweb-admin-panel">
      <div className="uweb-admin-panel-header">
        <div>
          <span className="section-eyebrow">
            {eyebrow}
          </span>

          <h2>
            {title}
          </h2>
        </div>
      </div>

      <div className="uweb-admin-card-grid">
        {items.map(
          (item) => (
            <article
              key={item.id}
              className="uweb-admin-card"
            >
              <span className="uweb-admin-badge">
                {item.status}
              </span>

              <h3>
                {item.name}
              </h3>

              {item.type && (
                <p>
                  نوع: {item.type}
                </p>
              )}

              {item.platform && (
                <p>
                  پلتفرم:{" "}
                  {item.platform}
                </p>
              )}

              {typeof item.projects ===
                "number" && (
                <small>
                  {item.projects} پروژه
                </small>
              )}
            </article>
          ),
        )}
      </div>
    </section>
  );
}