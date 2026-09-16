import "@/components/uweb/uweb.css";

import UWebHero from "@/components/uweb/UWebHero";
import WebsitesGrid from "@/components/uweb/WebsitesGrid";
import UWebCTA from "@/components/uweb/UWebCTA";

import { uwebProjects } from "@/components/uweb/websites";

export default function UWebPage() {
  return (
    <main className="uweb-page">
      <UWebHero />

      <WebsitesGrid projects={uwebProjects} />

      <UWebCTA />
    </main>
  );
}