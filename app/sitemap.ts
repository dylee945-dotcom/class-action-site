import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";
import { SITE_CONFIG } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.SITE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/cases`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/firm`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/notice`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal-notice`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${base}/cases/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseRoutes];
}
