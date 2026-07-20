import Marquee from "@/components/Marquee";
import { marqueeItems } from "@/config";

export default function MarqueeSection() {
  return (
    <section className="border-y border-white/10 py-10">
      <Marquee items={marqueeItems} />
    </section>
  );
}
