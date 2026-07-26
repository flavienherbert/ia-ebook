"use client";

import { useState } from "react";
import { DemoProvider } from "./_components/DemoContext";
import Toast from "./_components/Toast";
import ConciergerieView from "./_components/ConciergerieView";
import IntervenantView from "./_components/IntervenantView";

export default function DemoPage() {
  const [isModeIntervenant, setIsModeIntervenant] = useState(false);

  return (
    <DemoProvider>
      {isModeIntervenant ? (
        <IntervenantView onSwitchMode={() => setIsModeIntervenant(false)} />
      ) : (
        <ConciergerieView onSwitchMode={() => setIsModeIntervenant(true)} />
      )}
      <Toast />
    </DemoProvider>
  );
}
