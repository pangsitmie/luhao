/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Nav from "./nav/nav"
import Footer from "./footer/footer"
import Msg from "./msg/msg"
import Scroll from "./scroll/goTop"
import Helmet from "react-helmet"

import "./layout.css"


const Layout = ({ children }) => (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
        <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138655812-1"></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-138655812-1');
          `}
        </script>
        </Helmet>
          <Nav/>
          {children}
          <Msg/>
          <Scroll />
          <Footer />
        </>
      )}
    />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
