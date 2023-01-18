import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./mailsend.module.scss"

export default class mailsend extends Component {
    render() {
      return (
        <Layout>
            <SEO title="mailsend" keywords={[`mailsend`, `陸豪`, `聯絡我們`]} />
            <div className = {`${styles.mailsend}`}>
              <div>
                  <h1>感謝您的回覆</h1>
              </div>
            </div>
        </Layout>
      )
    }
  }
