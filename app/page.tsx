import UAppsHero from "@/components/uapps/UAppsHero";
import AppsGrid from "@/components/uapps/AppsGrid";
import UAppsCTA from "@/components/uapps/UAppsCTA";

import {
  uapps,
} from "@/components/uapps/apps";

export default function UAppsPage() {
  return (
    <main className="uapps-page">
      <UAppsHero />

      <AppsGrid apps={uapps} />

      <UAppsCTA />
    </main>
  );
}