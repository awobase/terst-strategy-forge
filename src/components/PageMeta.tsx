import { useEffect } from "react";

import { BRAND_NAME } from "@/config/brand";
import { OG_IMAGE_URL, SITE_ORIGIN } from "@/config/site";

const SITE_NAME = BRAND_NAME;

type PageMetaProps = {
  title: string;
  description: string;
  /** Chemin canonique sans domaine (ex. /offres). Par défaut : pathname courant. */
  canonicalPath?: string;
};

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkRel(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const PageMeta = ({ title, description, canonicalPath }: PageMetaProps) => {
  useEffect(() => {
    const fullTitle = `${title} · ${SITE_NAME}`;
    document.title = fullTitle;

    const path = canonicalPath ?? window.location.pathname;
    const canonicalUrl = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;

    setMetaByName("description", description);
    setLinkRel("canonical", canonicalUrl);

    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", canonicalUrl);
    setMetaByProperty("og:image", OG_IMAGE_URL);
    setMetaByProperty("og:image:alt", `${SITE_NAME} — cabinet de conseil`);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", OG_IMAGE_URL);
  }, [title, description, canonicalPath]);

  return null;
};

export default PageMeta;
