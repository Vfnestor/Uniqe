import "@/components/lab/lab.css";

import LabHero from "@/components/lab/LabHero";
import ExperimentsGrid from "@/components/lab/ExperimentsGrid";
import LabCTA from "@/components/lab/LabCTA";

import { labExperiments } from "@/components/lab/experiments";

export default function LabPage() {
  return (
    <main className="lab-page">
      <LabHero />
      <ExperimentsGrid experiments={labExperiments} />
      <LabCTA />
    </main>
  );
}