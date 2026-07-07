const isBrowser = typeof window !== "undefined";

export const isFilePreview = isBrowser && window.location.protocol === "file:";

export function normalizePath(path) {
  const cleanPath = path.replace(/\/$/, "") || "/";
  return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
}

export function getCurrentPath() {
  if (!isBrowser) {
    return "/";
  }

  if (isFilePreview) {
    return normalizePath(window.location.hash.replace(/^#/, "") || "/");
  }

  return normalizePath(window.location.pathname);
}

export function routeHref(href) {
  if (!isFilePreview || href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) {
    return href;
  }

  return `#${href}`;
}
