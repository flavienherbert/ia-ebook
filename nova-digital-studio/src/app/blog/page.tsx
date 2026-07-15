import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Conseils, analyses et tendances sur le SEO, le marketing digital, l'intelligence artificielle et la création de sites web, par les experts de Nova Digital Studio.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Section className="pb-12 pt-16 sm:pt-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Nos meilleurs conseils digitaux, sans blabla.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            SEO, intelligence artificielle, marketing digital, création de sites web : des analyses
            concrètes rédigées par notre équipe d&apos;experts.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <BlogExplorer posts={blogPosts} />
      </Section>
    </>
  );
}
