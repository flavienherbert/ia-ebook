export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Chargement…</span>
      <div className="size-10 animate-spin rounded-full border-2 border-border border-t-electric" aria-hidden="true" />
    </div>
  );
}
