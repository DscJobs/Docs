import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import classNames from "classnames";
import useDarkMode from "use-dark-mode";
import Helmet from "react-helmet";

import Link from "components/Link";
import Icon from "components/Icon";
import { Navbar, Container, Nav } from "react-bootstrap";


import LogoIconSvg from "assets/DscJobs.svg";
import "./style.scss";

function Header({ sticky, leftChildren, ...rest }) {
  const { links, rightLinks } = useStaticQuery(graphql`
    query HeaderLinks {
      file(name: { eq: "header" }, extension: { in: ["yaml", "yml"] }) {
        childDataYaml {
          links {
            ...Links
          }
          rightLinks {
            ...Links
          }
        }
      }
    }
  `).file.childDataYaml;

  // Dark/light theme selection
  const { value, toggle } = useDarkMode(true);

  return (
    <Navbar
      bg="primary"
      expand="sm"
      variant="dark"
      collapseOnSelect
      sticky={sticky ? "top" : null}
      {...rest}
    >
      {leftChildren}
      <Brand className="mr-auto mr-md-3" />
      <div className="main-nav-wrapper d-none d-sm-flex">
        <Nav className="mr-auto">
          {links.map(({ href, ...rest }) => (
            <Nav.Link
              as={Link}
              href={href}
              {...rest}
              key={href}
              partiallyActive={false}
            />
          ))}
        </Nav>
      </div>
      <div className="search-nav-wrapper">
        <div className="search">
          <span className="search--icon-wrapper">
            <Icon name="search" className="search--icon" />
          </span>
          <input
            className="search--input"
            id="docs-search-box"
            placeholder="Search the DscJobs Docs"
          />
          <Helmet>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css" />
              <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"></script>
              <script type="text/javascript">
                        algoliasearchNetlify({
                              appId: '1P3AE2PHXW',
                              apiKey: process.env.ALGOLIA_API_KEY,
                              siteId: 'c4574357-2d72-45dc-95f4-cb4899f50b2e',
                              branch: 'master',
                              selector: '#docs-search-box',
                              theme: {
                                 mark: '#fff',
                                 background: '#23263b',
                                 selected: '#111432',
                                 text: '#d6d6e7',
                                 colorSourceIcon: '#d6d6e7'
                                }
                             });
                 </script>
          </Helmet>
        </div>
        <Nav className="right-links">
          <span className="nav-divider"></span>
          {rightLinks.map(({ href, ...rest }) => (
            <Link href={href} {...rest} key={href} partiallyActive={false} />
          ))}
          <span className="nav-divider"></span>
          <button className="dark-mode-button" onClick={toggle}>
            {!value && <Icon name="sun" />}
            {value && <Icon name="moon" />}
          </button>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;

Header.displayName = "Header";

Header.propTypes = {
  leftChildren: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  sticky: PropTypes.bool
};

Header.defaultProps = {
  sticky: true
};

const Brand = ({ className, ...rest }) => {
  return (
    <Link
      className={classNames("nav-link brand", className)}
      href="/"
      {...rest}
    >
      <LogoIconSvg className="brand--icon"/>
    </Link>
  );
};

Header.Brand = Brand;

Brand.displayName = "Header.Brand";
