import "@/components/ucore/ucore.css";

import UCoreHero from "@/components/ucore/UCoreHero";
import CoreModulesGrid from "@/components/ucore/CoreModulesGrid";
import UCoreCTA from "@/components/ucore/UCoreCTA";

import { ucoreModules } from "@/components/ucore/core-modules";

export default function UCorePage() {
  return (
    <main className="ucore-page">
      <UCoreHero />
      <CoreModulesGrid modules={ucoreModules} />
      <UCoreCTA />
    </main>
  );
}