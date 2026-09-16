import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import type { ProfilePreference } from "./profile";

type ProfilePreferencesProps = {
  preferences: ProfilePreference[];
};

export default function ProfilePreferences({
  preferences,
}: ProfilePreferencesProps) {
  return (
    <section className="profile-preferences section">
      <Container>
        <Reveal animation="up">
          <div className="profile-section-heading">
            <div>
              <span className="section-eyebrow">
                Preferences
              </span>

              <h2 className="section-title">
                Shape your
                <br />
                experience.
              </h2>
            </div>

            <p className="section-description">
              Your preferences will eventually be
              stored and synchronized across the
              Uniqe ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="profile-preferences-grid">
          {preferences.map((preference, index) => (
            <Reveal
              key={preference.id}
              animation="up"
              delay={100 + index * 80}
            >
              <Card
                hover
                className="profile-preference-card"
              >
                <div className="profile-preference-top">
                  <span className="profile-preference-icon">
                    {preference.icon}
                  </span>

                  <span className="profile-preference-value">
                    {preference.value}
                  </span>
                </div>

                <div className="profile-preference-content">
                  <h3>
                    {preference.name}
                  </h3>

                  <p>
                    {preference.description}
                  </p>
                </div>

                <div className="profile-preference-bottom">
                  <span>
                    Preference
                  </span>

                  <span>
                    ↗
                  </span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}