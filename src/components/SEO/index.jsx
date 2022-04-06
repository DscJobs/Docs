import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { isNil } from "utility";

import Helmet from "react-helmet";

// Adds all meta/link tags to the document <head> using Helmet, including those
// geared towards SEO
function SEO({ description, lang, meta, title }) {
  const {
    title: globalTitle,
    description: globalDescription,
    author,
    themeColor,
    msTileColor,
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            themeColor
            msTileColor
          }
        }
      }
    `
  ).site.siteMetadata;

  const metaDescription = description || globalDescription;
  const formattedTitle = isNil(title)
    ? globalTitle
    : `${title} | ${globalTitle}`;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={formattedTitle}
      meta={[
        {
          "http-equiv": "Content-Type",
          content: "text/html; charset=UTF-8",
        },
        // Web crawler
        {
          name: "robots",
          content: "index, follow",
        },
        // Misc. display meta
        {
          name: "theme-color",
          content: themeColor,
        },
        {
          name: "msapplication-config",
          content: "/browserconfig.xml",
        },
        {
          name: "msapplication-TileColor",
          content: msTileColor,
        },
        // Open Graph (Facebook)
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: "https://dscjobs.org/secret/assets/imgs/DscJobsNewLogo.png",
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:site_name`,
          content: globalTitle,
        },
        // Twitter
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: formattedTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        // Other
        {
          name: `description`,
          content: metaDescription,
        },
        ...meta,
      ]}
      link={[
        // PWA
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        // Favicons
        {
          rel: "mask-icon",
          color: themeColor,
          href: "https://dscjobs.org/secret/assets/imgs/DscJobsNewLogo.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "https://dscjobs.org/secret/assets/imgs/DscJobsNewLogo.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "https://dscjobs.org/secret/assets/imgs/DscJobsNewLogo.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "https://dscjobs.org/secret/assets/imgs/DscJobsNewLogo.png",
        },
        {
          rel: "shortcut icon",
          href: "https://dscjobs.org/secret/assets/imgs/DscJobsNewLogo.png",
        },
      ]}
    />
  );
}

export default SEO;

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  title: null,
};

SEO.displayName = "SEO";
