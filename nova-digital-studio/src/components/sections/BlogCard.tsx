import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-electric/50 hover:shadow-lifted"
    >
      <PlaceholderArt
        label={`Illustration de l'article ${post.title}`}
        from={post.cover.from}
        to={post.cover.to}
        className="aspect-[16/10] w-full rounded-none"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Badge>{post.category}</Badge>
        <h3 className="text-lg font-semibold leading-snug text-foreground">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {post.readingTime} de lecture
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-electric">
          Lire l&apos;article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
