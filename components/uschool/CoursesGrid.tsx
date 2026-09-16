import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type { USchoolCourse } from "./courses";

type CoursesGridProps = {
  courses: USchoolCourse[];
};

function Status({
  status,
  label,
}: {
  status: USchoolCourse["status"];
  label: string;
}) {
  return (
    <span
      className={`uschool-status uschool-status-${status}`}
    >
      <span className="uschool-status-dot" />
      {label}
    </span>
  );
}

export default function CoursesGrid({
  courses,
}: CoursesGridProps) {
  return (
    <section
      id="courses"
      className="uschool-courses section"
    >
      <Container>
        <Reveal animation="up">
          <div className="uschool-section-heading">
            <div>
              <span className="section-eyebrow">
                USchool Collection
              </span>

              <h2 className="section-title">
                Explore the
                <br />
                learning paths.
              </h2>
            </div>

            <p className="section-description">
              Discover learning paths, educational
              experiences and knowledge being built
              inside the USchool ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="uschool-grid">
          {courses.map((course, index) => (
            <Reveal
              key={course.id}
              animation="up"
              delay={120 + index * 80}
            >
              <Card
                hover
                className="uschool-card"
              >
                <a
                  href={course.href}
                  className="uschool-card-link"
                >
                  <div className="uschool-card-top">
                    <span className="uschool-card-number">
                      {course.number}
                    </span>

                    <span className="uschool-card-icon">
                      {course.icon}
                    </span>
                  </div>

                  <div className="uschool-card-content">
                    <div className="uschool-card-meta">
                      <span className="uschool-card-category">
                        {course.categoryLabel}
                      </span>

                      <Status
                        status={course.status}
                        label={course.statusLabel}
                      />
                    </div>

                    <h3 className="uschool-card-title">
                      {course.name}
                    </h3>

                    <p className="uschool-card-description">
                      {course.description}
                    </p>
                  </div>

                  <div className="uschool-card-bottom">
                    <span>
                      Explore learning path
                    </span>

                    <span className="uschool-card-arrow">
                      ↗
                    </span>
                  </div>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}