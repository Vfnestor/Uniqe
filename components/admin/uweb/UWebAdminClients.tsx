import type {
  UWebAdminClient,
} from "@/lib/uweb/admin-data";

type Props = {
  clients: UWebAdminClient[];
};

export default function UWebAdminClients({
  clients,
}: Props) {
  return (
    <section className="uweb-admin-panel">
      <div className="uweb-admin-panel-header">
        <div>
          <span className="section-eyebrow">
            Clients
          </span>

          <h2>
            مشتریان
          </h2>
        </div>
      </div>

      <div className="uweb-admin-card-grid">
        {clients.map(
          (client) => (
            <article
              key={client.id}
              className="uweb-admin-card"
            >
              <span className="uweb-admin-badge">
                {client.status}
              </span>

              <h3>
                {client.name}
              </h3>

              <p>
                {client.email}
              </p>

              <strong>
                {client.projectsCount}
              </strong>

              <small>
                پروژه
              </small>
            </article>
          ),
        )}
      </div>
    </section>
  );
}