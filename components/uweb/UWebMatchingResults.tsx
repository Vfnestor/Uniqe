import Container from "@/components/ui/Container";

import type {
  UWebProfessionalMatch,
} from "@/lib/uweb/matching-engine";

import UWebMatchingSummary from "./UWebMatchingSummary";
import UWebProfessionalMatchCard from "./UWebProfessionalMatchCard";

import type {
  UWebProject,
} from "@/lib/uweb/types";

type Props = {
  project: UWebProject;
  matches: UWebProfessionalMatch[];
};

export default function UWebMatchingResults({
  project,
  matches,
}: Props) {
  const usableMatches =
    matches.filter(
      (match) =>
        match.score >= 40,
    );

  return (
    <section className="uweb-matching-page">
      <Container>
        <UWebMatchingSummary
          project={project}
          totalProfessionals={
            matches.length
          }
          matchingProfessionals={
            usableMatches.length
          }
        />

        <div className="uweb-matching-project">
          <span>
            {project.projectNumber}
          </span>

          <strong>
            {project.title}
          </strong>
        </div>

        {usableMatches.length > 0 ? (
          <div className="uweb-matching-list">
            {usableMatches.map(
              (match, index) => (
                <UWebProfessionalMatchCard
                  key={
                    match.professional.id
                  }
                  match={match}
                  rank={index + 1}
                />
              ),
            )}
          </div>
        ) : (
          <div className="uweb-matching-empty">
            <div>U</div>

            <h2>
              متخصص مناسبی پیدا نشد
            </h2>

            <p>
              در حال حاضر متخصصی با حداقل
              میزان تطابق لازم برای این
              پروژه پیدا نشد.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}