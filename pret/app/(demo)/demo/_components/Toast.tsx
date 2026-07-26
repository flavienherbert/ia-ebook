"use client";

import { useDemo } from "./DemoContext";

export default function Toast() {
  const { toast } = useDemo();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
      aria-live="polite"
    >
      {toast && (
        <div className="pointer-events-auto rounded-full bg-ink px-4 py-2.5 text-center font-mono text-xs text-paper shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
