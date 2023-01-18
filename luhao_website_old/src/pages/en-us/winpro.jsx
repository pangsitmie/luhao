import React, { Component } from 'react'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Opening from "../../components/Index/opening"
import styles from "./winpro.module.scss"
import FB from "../../images/second/FB_icon.svg"
import Line from "../../images/second/LINE_logo.svg"
import WeChat from "../../images/second/wechat.svg"
import WhatApp from "../../images/second/whatsapp-icon.svg"
import Zalo from "../../images/second/zalo-1.svg"
import Talk from "../../images/second/kakaotalk-logo-svg-vector.svg"
import backM2 from "../../images/mobile/second/second_2.png"
import backM3 from "../../images/mobile/second/second_3.png"
import backM4 from "../../images/mobile/second/second_4.png"

export default class winpro extends Component {
  render() {
    return (
      <Layout>
        <SEO title="winpro" keywords={[`winpro`, `陸豪`, `吸粉服務`]} />
        <Opening
          number="winpro"
          left={
            <div className={styles["lefttext"]}>
              <h1>WINPRO Absorb Fan Sevice</h1>
              <p>Tailor-made advertising push service based on merchants needs.</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                  See More >
                </a>
              </div>
            </div>
          }
          right={
            <div className={styles["rightimage"]}>
              <div className={styles["ofFlex"]}>
                <img src={FB} alt='FB'/>
                <img src={Line} alt='Line'/>
                <img src={WeChat} alt='WeChat'/>
                <img src={WhatApp} alt='WhatApp'/>
                <img src={Zalo} alt='Zalo'/>
                <img src={Talk} alt='Talk'/>
              </div>
            </div>
          }
        />
        <article className={styles["body"]}>
          <div><img src={backM2} alt=''/></div>
          <div><img src={backM3} alt=''/></div>
          <div><img src={backM4} alt=''/></div>
        </article>
      </Layout>
    )
  }
}
