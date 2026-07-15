"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { blogCategories } from "@/data/blog";
import { BlogCard } from "@/components/sections/BlogCard";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 4;

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Tous");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "Tous" || post.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const updateCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6">
        <label htmlFor="blog-search" className="sr-only">
          Rechercher un article
        </label>
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Rechercher un article, un mot-clé…"
            className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus-visible:border-electric"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
          {["Tous", ...blogCategories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                category === cat
                  ? "border-transparent bg-gradient-to-r from-electric to-violet text-white"
                  : "border-border bg-surface text-muted hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {paginated.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-border bg-surface p-10 text-center text-sm text-muted">
          Aucun article ne correspond à votre recherche. Essayez un autre mot-clé ou une autre
          catégorie.
        </p>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination des articles" className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;
            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Page ${pageNumber}`}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                  isActive
                    ? "border-transparent bg-gradient-to-r from-electric to-violet text-white"
                    : "border-border bg-surface text-muted hover:text-foreground"
                )}
              >
                {pageNumber}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
