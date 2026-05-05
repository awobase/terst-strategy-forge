import { useEffect } from "react";

const SITE_NAME = "CAYRIBE Partners";

const SITE_ORIGIN = "https://www.cayribepartners.com";

type PageMetaProps = {
  title: string;
  description: string;
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

const PageMeta = ({ title, description }: PageMetaProps) => {
  useEffect(() => {
    const fullTitle = `${title} · ${SITE_NAME}`;
    document.title = fullTitle;

    setMetaByName("description", description);
    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);

    const path = window.location.pathname + window.location.search;
    setMetaByProperty("og:url", `${SITE_ORIGIN}${path === "/" ? "/" : path}`);
  }, [title, description]);

  return null;
};

export default PageMeta;
