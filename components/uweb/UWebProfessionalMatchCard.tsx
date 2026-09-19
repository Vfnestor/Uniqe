import type {
  UWebProfessionalMatch,
} from "@/lib/uweb/matching-engine";

type Props = {
  match: UWebProfessionalMatch;
  rank: number;
};

export default function UWebProfessionalMatchCard({
  match,
  rank,
}: Props) {
  const {
    professional,
    score,
    matchedRequiredSkills,
    missingRequiredSkills,
    matchedPreferredSkills,
    platformMatch,
    experienceMatch,
    availabilityMatch,
    breakdown,
  } = match;

  return (
    <article className="uweb-match-card">
      <div className="uweb-match-card-top">
        <div className="uweb-match-rank">
          #{rank}
        </div>

        <div className="uweb-match-score">
          <strong>
            {score}%
          </strong>

          <span>
            تطابق
          </span>
        </div>
      </div>

      <div className="uweb-match-card-content">
        <span className="uweb-match-status">
          {availabilityMatch
            ? "آماده همکاری"
            : "دسترسی محدود"}
        </span>

        <h2>
          {professional.headline}
        </h2>

        <p>
          {professional.bio}
        </p>

        <div className="uweb-match-facts">
          <span>
            {platformMatch
              ? "✓ پلتفرم منطبق"
              : "× پلتفرم نامنطبق"}
          </span>

          <span>
            {experienceMatch
              ? "✓ تجربه کافی"
              : "× تجربه کمتر از نیاز"}
          </span>

          <span>
            {availabilityMatch
              ? "✓ در دسترس"
              : "× در دسترس نیست"}
          </span>
        </div>
      </div>

      <div className="uweb-match-skills">
        <div>
          <strong>
            مهارت‌های موردنیاز
          </strong>

          <div className="uweb-match-tags">
            {matchedRequiredSkills.map(
              (skill) => (
                <span
                  key={skill}
                  className="matched"
                >
                  ✓ {skill}
                </span>
              ),
            )}

            {missingRequiredSkills.map(
              (skill) => (
                <span
                  key={skill}
                  className="missing"
                >
                  × {skill}
                </span>
              ),
            )}
          </div>
        </div>

        {matchedPreferredSkills.length >
          0 && (
          <div>
            <strong>
              مهارت‌های ترجیحی
            </strong>

            <div className="uweb-match-tags">
              {matchedPreferredSkills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="preferred"
                  >
                    ✓ {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      <div className="uweb-match-breakdown">
        <div>
          <span>
            مهارت‌های الزامی
          </span>
          <strong>
            {breakdown.requiredSkillsScore}
          </strong>
        </div>

        <div>
          <span>
            مهارت‌های ترجیحی
          </span>
          <strong>
            {breakdown.preferredSkillsScore}
          </strong>
        </div>

        <div>
          <span>
            پلتفرم
          </span>
          <strong>
            {breakdown.platformScore}
          </strong>
        </div>

        <div>
          <span>
            تجربه
          </span>
          <strong>
            {breakdown.experienceScore}
          </strong>
        </div>

        <div>
          <span>
            دسترسی
          </span>
          <strong>
            {breakdown.availabilityScore}
          </strong>
        </div>
      </div>
    </article>
  );
}