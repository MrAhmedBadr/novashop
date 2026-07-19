import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "product" | "article";
  /** JSON-LD structured data object(s) for rich results. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSONLD_ID = "seo-jsonld";

/**
 * Document-head + SEO manager: title, description, Open Graph, Twitter cards,
 * canonical URL, robots, and JSON-LD structured data for rich search results.
 */
export function useSeo({ title, description, image, keywords, type = "website", jsonLd, noindex }: SeoOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:type", type);
    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }
    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }
    if (keywords?.length) upsertMeta("name", "keywords", keywords.join(", "));
    upsertMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");

    const url = window.location.href.split("#")[0];
    upsertMeta("property", "og:url", url);
    upsertLink("canonical", url);

    // JSON-LD structured data
    let script = document.getElementById(JSONLD_ID) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = JSONLD_ID;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }

    return () => {
      document.title = prevTitle;
      document.getElementById(JSONLD_ID)?.remove();
    };
  }, [title, description, image, type, noindex, keywords, jsonLd]);
}
