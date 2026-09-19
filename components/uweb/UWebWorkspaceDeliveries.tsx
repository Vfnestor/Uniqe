import type {
  UWebDelivery,
  UWebRevision,
} from "@/lib/uweb/types";

type Props = {
  deliveries: UWebDelivery[];
  revisions: UWebRevision[];
};

const deliveryStatusLabels: Record<
  UWebDelivery["status"],
  string
> = {
  submitted: "ارسال شده",
  under_review: "در حال بررسی",
  revision_requested:
    "نیازمند اصلاح",
  approved: "تأیید شده",
};

const revisionStatusLabels: Record<
  UWebRevision["status"],
  string
> = {
  requested: "درخواست شده",
  in_progress: "در حال انجام",
  submitted: "ارسال شده",
  approved: "تأیید شده",
  rejected: "رد شده",
};

export default function UWebWorkspaceDeliveries({
  deliveries,
  revisions,
}: Props) {
  return (
    <section className="uweb-workspace-panel">
      <div className="uweb-workspace-panel-heading">
        <span className="section-eyebrow">
          Deliveries & Revisions
        </span>

        <h2>
          تحویل‌ها و اصلاحات
        </h2>
      </div>

      <div className="uweb-workspace-deliveries">
        {deliveries.length > 0 ? (
          deliveries.map(
            (delivery) => (
              <article
                key={delivery.id}
                className="uweb-workspace-delivery"
              >
                <div>
                  <span className="uweb-workspace-delivery-version">
                    {delivery.version}
                  </span>

                  <h3>
                    تحویل پروژه
                  </h3>

                  <p>
                    {delivery.description}
                  </p>
                </div>

                <div className="uweb-workspace-delivery-side">
                  <span>
                    {
                      deliveryStatusLabels[
                        delivery.status
                      ]
                    }
                  </span>

                  <small>
                    {new Date(
                      delivery.createdAt,
                    ).toLocaleDateString(
                      "fa-IR",
                    )}
                  </small>
                </div>
              </article>
            ),
          )
        ) : (
          <div className="uweb-workspace-empty">
            هنوز تحویلی ثبت نشده است.
          </div>
        )}
      </div>

      <div className="uweb-workspace-revisions">
        <h3>
          سابقه اصلاحات
        </h3>

        {revisions.length > 0 ? (
          revisions.map(
            (revision) => (
              <div
                key={revision.id}
                className="uweb-workspace-revision"
              >
                <div>
                  <strong>
                    درخواست اصلاح
                  </strong>

                  <p>
                    {revision.description}
                  </p>
                </div>

                <span>
                  {
                    revisionStatusLabels[
                      revision.status
                    ]
                  }
                </span>
              </div>
            ),
          )
        ) : (
          <div className="uweb-workspace-empty">
            سابقه اصلاحی وجود ندارد.
          </div>
        )}
      </div>
    </section>
  );
}