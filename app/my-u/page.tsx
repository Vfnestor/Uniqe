import "@/components/my-u/my-u.css";

import MyUHero from "@/components/my-u/MyUHero";
import MyUOverview from "@/components/my-u/MyUOverview";
import MyUActivity from "@/components/my-u/MyUActivity";
import MyUCTA from "@/components/my-u/MyUCTA";

import {
  myUActivity,
  myUQuickActions,
  myUServices,
} from "@/components/my-u/dashboard";

export default function MyUPage() {
  return (
    <main className="my-u-page">
      <MyUHero />

      <MyUOverview
        services={myUServices}
        actions={myUQuickActions}
      />

      <MyUActivity
        activities={myUActivity}
      />

      <MyUCTA />
    </main>
  );
}
