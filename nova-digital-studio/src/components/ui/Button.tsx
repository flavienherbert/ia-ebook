import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-electric disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-electric to-violet text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.55)] hover:shadow-[0_12px_40px_-8px_rgba(124,58,237,0.7)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-border bg-surface text-foreground hover:border-electric/60 hover:bg-surface-2 hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-foreground hover:bg-surface",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-[3.25rem] px-8 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _variant, size: _size, className: _className, children: _children, ...buttonProps } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
