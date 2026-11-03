import { useEffect } from "react";
import {
  INDEX_ROBOTS,
  NOINDEX_ROBOTS,
  SHARE_IMAGE,
  SHARE_IMAGE_ALT,
  canonicalFor,
  notFoundMetadata,
  pageMetadata,
} from "../data/seo.js";

function setMeta(attribute, name, content) {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!href) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function Seo({ pathname }) {
  useEffect(() => {
    const known = Boolean(pageMetadata[pathname]);
    const metadata = known ? pageMetadata[pathname] : notFoundMetadata;
    const canonicalUrl = known ? canonicalFor(pathname) : null;
    const robots = metadata.noindex ? NOINDEX_ROBOTS : INDEX_ROBOTS;

    document.title = metadata.title;
    setCanonical(canonicalUrl);
    setMeta("name", "description", metadata.description);
    setMeta("name", "robots", robots);
    setMeta("name", "googlebot", robots);

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "R-MANAC");
    setMeta("property", "og:locale", "ja_JP");
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    if (canonicalUrl) setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", SHARE_IMAGE);
    setMeta("property", "og:image:alt", SHARE_IMAGE_ALT);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", SHARE_IMAGE);
  }, [pathname]);

  return null;
}
