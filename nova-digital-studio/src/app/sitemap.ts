import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { portfolioProjects } from "@/data/portfolio";
import { blogPosts } from "@/data/blog";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/politique-de-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/conditions-generales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
}
