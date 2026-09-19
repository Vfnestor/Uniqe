import type {
  UWebProfessionalProfile,
} from "@/lib/uweb/types";

type Props = {
  professionals: UWebProfessionalProfile[];
};

export default function UWebAdminProfessionals({
  professionals,
}: Props) {
  return (
    <section className="uweb-admin-panel">
      <div className="uweb-admin-panel-header">
        <div>
          <span className="section-eyebrow">
            Professionals
          </span>

          <h2>
            متخصصان
          </h2>
        </div>
      </div>

      <div className="uweb-admin-card-grid">
        {professionals.map(
          (professional) => (
            <article
              key={professional.id}
              className="uweb-admin-card"
            >
              <span className="uweb-admin-badge">
                {professional.availability}
              </span>

              <h3>
                {professional.headline}
              </h3>

              <p>
                {professional.bio}
              </p>

              <div className="uweb-admin-tags">
                {professional.skillIds.map(
                  (skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ),
                )}
              </div>

              <small>
                سطح:{" "}
                {professional.experienceLevel}
              </small>
            </article>
          ),
        )}
      </div>
    </section>
  );
}