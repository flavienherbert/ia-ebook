import Marquee from "@/components/Marquee";
import { marqueeItems } from "@/config";

export default function MarqueeSection() {
  return (
    <section className="border-y border-hairline py-[clamp(2.5rem,6vh,4rem)]">
      <Marquee items={marqueeItems} />
    </section>
  );
}
