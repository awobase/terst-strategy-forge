import { useEffect } from "react";

const SITE_NAME = "CAYRIBE Partners";

type PageMetaProps = {
  title: string;
  description: string;
};

const PageMeta = ({ title, description }: PageMetaProps) => {
  useEffect(() => {
    document.title = `${title} · ${SITE_NAME}`;

    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "description");
      document.head.appendChild(el);
    }
    el.setAttribute("content", description);
  }, [title, description]);

  return null;
};

export default PageMeta;
