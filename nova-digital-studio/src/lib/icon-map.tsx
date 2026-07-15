import {
  Globe,
  Palette,
  Search,
  Megaphone,
  TrendingUp,
  Workflow,
  Brain,
  PenLine,
  Users,
  Rocket,
  Target,
  ShieldCheck,
  Sparkles,
  BarChart,
  Clock,
  HeartHandshake,
  Layers,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "./types";

export const iconMap: Record<IconName, LucideIcon> = {
  globe: Globe,
  palette: Palette,
  search: Search,
  megaphone: Megaphone,
  "trending-up": TrendingUp,
  workflow: Workflow,
  brain: Brain,
  "pen-line": PenLine,
  users: Users,
  rocket: Rocket,
  target: Target,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  "bar-chart": BarChart,
  clock: Clock,
  "heart-handshake": HeartHandshake,
  layers: Layers,
  zap: Zap,
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = iconMap[name];
  return <Icon className={className} aria-hidden="true" />;
}
