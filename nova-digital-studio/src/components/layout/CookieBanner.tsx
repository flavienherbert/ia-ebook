"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMounted } from "@/hooks/useMounted";

const STORAGE_KEY = "nova-cookie-consent";

export function CookieBanner() {
  const mounted = useMounted();
  const [dismissed, setDismissed] = useState(false);
  const hasStoredConsent = mounted && window.localStorage.getItem(STORAGE_KEY) !== null;
  const visible = mounted && !hasStoredConsent && !dismissed;

  const respond = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 p-5 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border sm:shadow-lifted"
    >
      <div className="flex gap-3">
        <Cookie className="mt-0.5 size-5 shrink-0 text-electric" aria-hidden="true" />
        <div className="space-y-3 text-sm">
          <p className="text-foreground">
            Nous utilisons des cookies pour améliorer votre expérience et mesurer l&apos;audience du
            site. Vous pouvez accepter ou refuser les cookies non essentiels.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="md" className="h-9 px-4 text-xs" onClick={() => respond("accepted")}>
              Accepter
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="h-9 px-4 text-xs"
              onClick={() => respond("declined")}
            >
              Refuser
            </Button>
            <Link
              href="/politique-de-confidentialite"
              className="text-xs text-muted underline underline-offset-4 hover:text-foreground"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
