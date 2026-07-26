import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center gap-4 py-10 sm:flex-row sm:justify-between">
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          Prêt.
        </span>

        <nav className="flex items-center gap-6">
          <a
            href="#mentions-legales"
            className="rounded-sm text-sm text-ink-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Mentions légales
          </a>
          <a
            href="#contact"
            className="rounded-sm text-sm text-ink-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Contact
          </a>
        </nav>

        <span className="font-mono text-xs text-ink-soft">© 2026</span>
      </Container>
    </footer>
  );
}
