import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useEffectOnce, isDefined } from "utility";

import Header from "components/Header";
import Helmet from "react-helmet";
import Footer from "components/Footer";
import SideNav from "components/SideNav";
import Icon from "components/Icon";
import SEO from "components/SEO";

import "scss/main.scss";
import "./style.scss";

function Layout({
  title,
  children,
  headerProps,
  footerProps,
  footer,
  navRoot,
  noDrawer,
  description
}) {
  // Nav drawer logic
  const [showDrawer, setShowDrawer] = useState(false);
  const expandClick = useCallback(() => setShowDrawer(!showDrawer), [
    showDrawer
  ]);
  const closeDrawer = useCallback(() => setShowDrawer(false));
  useEffectOnce(() => {
    function loadDocsearch() {
       algoliasearchNetlify({
         appId: '1P3AE2PHXW',
         apiKey: process.env.ALGOLIA_API_KEY,
         siteId: 'c4574357-2d72-45dc-95f4-cb4899f50b2e',
         branch: 'master',
         selector: 'input#docs-search-box',
         theme: {
            mark: '#fff',
            background: '#23263b',
            selected: '#111432',
            text: '#d6d6e7',
            colorSourceIcon: '#d6d6e7'
          }
      });
    }

    if (!isDefined(process.env.ALGOLIA_API_KEY)) return;
    if (isDefined(window.docsearch)) loadDocsearch();
    else {
      const retryTimer = useInterval(() => {
        if (isDefined(window.docsearch)) {
          clearInterval(retryTimer);
          loadDocsearch();
        }
      }, 1000);
    }
  });

  return (
    <>
      <SEO title={title} description={description} />
      <Header {...headerProps} />
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css" />
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"></script>
      </Helmet>
      <div className={classNames("docs-root", { "show-drawer": showDrawer })}>
        {noDrawer ? null : (
          <div className="docs-root--nav">
            <SideNav navRoot={navRoot} />
          </div>
        )}
        <div className="drawer-expand">
          <button className="drawer-expand--button" onClick={expandClick}>
            {showDrawer ? <Icon name="times" /> : <Icon name="bars" />}
          </button>
        </div>
        <button className="docs-root--overlay-button" onClick={closeDrawer} />
        <main className="docs-root--main">
          <div children={children} />
          <Footer {...footerProps} />
          {footer}
        </main>
      </div>
    </>
  );
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  headerProps: PropTypes.object,
  footerProps: PropTypes.object,
  title: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  navRoot: PropTypes.object,
  noDrawer: PropTypes.bool,
  description: PropTypes.string
};

Layout.defaultProps = {
  headerProps: {},
  footerProps: {},
  noDrawer: false,
  description: null
};

Layout.displayName = "Layout";
