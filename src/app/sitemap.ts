import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 1.0 },
    { path: "/why-hungary", changeFrequency: "monthly", priority: 0.8 },
    { path: "/highlighted-sectors", changeFrequency: "monthly", priority: 0.8 },
    { path: "/startup-overview", changeFrequency: "weekly", priority: 0.9 },
    { path: "/startup", changeFrequency: "weekly", priority: 0.9 },
    { path: "/ecosystem", changeFrequency: "weekly", priority: 0.9 },
    { path: "/legal-library", changeFrequency: "monthly", priority: 0.7 },
    {
      path: "/funding-opportunities",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { path: "/registry", changeFrequency: "monthly", priority: 0.6 },
    { path: "/felir", changeFrequency: "yearly", priority: 0.4 },
    { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
