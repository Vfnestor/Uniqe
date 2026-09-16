import "@/components/activity/activity.css";

import ActivityHero from "@/components/activity/ActivityHero";
import ActivityFilters from "@/components/activity/ActivityFilters";
import ActivityFeed from "@/components/activity/ActivityFeed";
import ActivityCTA from "@/components/activity/ActivityCTA";

import { activityItems } from "@/components/activity/activity";

export default function ActivityPage() {
  return (
    <main className="activity-page">
      <ActivityHero />

      <section className="activity-controls">
        <Container />
      </section>

      <ActivityFilters />

      <ActivityFeed
        activities={activityItems}
      />

      <ActivityCTA />
    </main>
  );
}