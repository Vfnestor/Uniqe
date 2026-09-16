import "@/components/profile/profile.css";

import ProfileHero from "@/components/profile/ProfileHero";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfilePreferences from "@/components/profile/ProfilePreferences";
import ProfileCTA from "@/components/profile/ProfileCTA";

import {
  profilePreferences,
  profileStats,
} from "@/components/profile/profile";

export default function ProfilePage() {
  return (
    <main className="profile-page">
      <ProfileHero />

      <ProfileOverview
        stats={profileStats}
      />

      <ProfilePreferences
        preferences={profilePreferences}
      />

      <ProfileCTA />
    </main>
  );
}