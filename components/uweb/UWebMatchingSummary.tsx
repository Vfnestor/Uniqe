import type {
  UWebProject,
} from "@/lib/uweb/types";

type Props = {
  project: UWebProject;
  totalProfessionals: number;
  matchingProfessionals: number;
};

export default function UWebMatchingSummary({
  project,
  totalProfessionals,
  matchingProfessionals,
}: Props) {
  return (
    <div className="uweb-matching-summary">
      <div className="uweb-matching-summary-main">
        <span className="section-eyebrow">
          UWeb Matching Engine
        </span>

        <h1>
          متخصص مناسب پروژه
        </h1>

        <p>
          سیستم UWeb متخصصان فعال را بر
          اساس مهارت، پلتفرم، سطح تجربه و
          وضعیت دسترسی بررسی می‌کند.
        </p>
      </div>

      <div className="uweb-matching-summary-stats">
        <div>
          <strong>
            {project.requiredSkills.length}
          </strong>
          <span>
            مهارت موردنیاز
          </span>
        </div>

        <div>
          <strong>
            {totalProfessionals}
          </strong>
          <span>
            متخصص فعال
          </span>
        </div>

        <div>
          <strong>
            {matchingProfessionals}
          </strong>
          <span>
            گزینه قابل بررسی
          </span>
        </div>
      </div>
    </div>
  );
}