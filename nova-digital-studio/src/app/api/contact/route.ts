import { NextResponse } from "next/server";
import { validateContactForm, hasErrors, type ContactFormValues } from "@/lib/validation";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Merci de réessayer dans quelques instants." },
      { status: 429 }
    );
  }

  let body: Partial<ContactFormValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const values: ContactFormValues = {
    name: String(body.name ?? "").slice(0, 200),
    email: String(body.email ?? "").slice(0, 200),
    company: String(body.company ?? "").slice(0, 200),
    service: String(body.service ?? "").slice(0, 200),
    budget: String(body.budget ?? "").slice(0, 100),
    message: String(body.message ?? "").slice(0, 4000),
    consent: Boolean(body.consent),
    website: String(body.website ?? ""),
  };

  // Honeypot: a real visitor never fills this hidden field.
  if (values.website.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const errors = validateContactForm(values);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: "Merci de vérifier les champs indiqués.", errors }, { status: 422 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const forwarded = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          service: values.service,
          budget: values.budget,
          message: values.message,
          receivedAt: new Date().toISOString(),
        }),
      });

      if (!forwarded.ok) {
        throw new Error(`Webhook responded with status ${forwarded.status}`);
      }
    } catch (error) {
      console.error("[contact] Failed to forward submission:", error);
      return NextResponse.json(
        { error: "Impossible d'envoyer votre message pour le moment. Merci de réessayer." },
        { status: 502 }
      );
    }
  } else {
    console.info("[contact] New submission received", {
      name: values.name,
      email: values.email,
      service: values.service,
    });
  }

  return NextResponse.json({ success: true });
}
