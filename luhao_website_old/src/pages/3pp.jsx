import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Opening from "../components/Index/opening"
import styles from "./3pp.module.scss"

import Img from "../images/fifth/fifth_3.png"

export default class Threepp extends Component {
  render() {
    return (
      <Layout>
        <SEO title="3pp" keywords={[`3pp`, `陸豪`, `吸粉服務`]} />
        <Opening
          number="3pp"
          left={
            <div className={styles["lefttext"]}>
              <h1>整合第三方支付</h1>
              <p>雲程整合各國主要之第三方支付系統，商家、市場將能跨擊國內外消費者，收益大大提升</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                  查看更多 >
                </a>
              </div>
            </div>
          }
          right={
            <div className={styles["rightimage"]}>
              <div className={styles["ofFlex"]}>
              </div>
            </div>
          }
        />
        <article className={styles["body"]}>
          <div>
            <h1>整合第三方支付</h1>
            <p>雲程整合各國主要之第三方支付系統，商家、市場將能跨擊國內外消費者，收益大大提升</p>
          </div>
          <div>
            <img src={Img} alt=''/>
          </div>
        </article>
      </Layout>
    )
  }
}
