import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { BlogCard } from "@/components/sections/BlogCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { buildMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: "Nova Digital Studio" },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <Section className="pb-10 pt-16 sm:pt-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour au blog
        </Link>
        <Reveal className="mx-auto mt-8 max-w-3xl">
          <Badge>{post.category}</Badge>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet text-[10px] font-semibold text-white">
                {post.author.initials}
              </span>
              <span>
                {post.author.name} · {post.author.role}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {post.readingTime} de lecture
            </span>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <Reveal className="mx-auto max-w-3xl">
          <PlaceholderArt
            label={`Illustration de l'article ${post.title}`}
            from={post.cover.from}
            to={post.cover.to}
            className="aspect-[16/9] w-full shadow-soft"
          />
        </Reveal>
      </Section>

      <Section>
        <article className="prose-content mx-auto max-w-3xl space-y-10">
          {post.content.map((block) => (
            <div key={block.heading}>
              <h2 className="text-2xl font-semibold tracking-tight">{block.heading}</h2>
              <div className="mt-4 space-y-4">
                {block.body.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </article>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>#{tag}</Badge>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-surface p-8">
          <NewsletterForm />
        </div>
      </Section>

      {relatedPosts.length > 0 && (
        <Section className="bg-surface" ariaLabelledBy="related-posts-heading">
          <h2 id="related-posts-heading" className="text-center text-2xl font-semibold tracking-tight">
            À lire aussi
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogCard key={related.slug} post={related} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
