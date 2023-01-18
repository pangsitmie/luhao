import React, { Component } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Opening from "../components/Index/opening"
import styles from "./iPickProEnter.module.scss"
import Img_1 from "../images/home/home_5.png"
import GoogleApp from "../images/footer/googleplay.png"
import IosApp from "../images/footer/iosapp.png"

export default class iPickProEnter extends Component {

  render() {
    return (
      <Layout>
        <SEO title="iPickProEnter" keywords={[`iPickPro`, `陸豪`, `娃娃機`]} />
        <Opening
          number="iPickPro"
          left={
            <div className={styles["lefttext"]}>
              <h1>iPickPro愛撿寶</h1>
              <p>下雨天不想出門又想夾娃娃?I PickPro聽到了你的心聲，讓您在家也能享受夾娃娃的樂趣！</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                  進入iPickPro >
                </a>
              </div>
            </div>
          }
          right={
            <div className={styles["rightimage"]}>
              <img
                className={styles["iPickProMobile"]}
                src={Img_1}
                alt="iPickPro"
              />
            </div>
          }
        />
        <article className={styles["iPickPro"]}>
          <div>
            <div>
              <h1>不用出門，也能線上夾娃娃</h1>
              <p>Andriod/ios 同步上線！</p>
            </div>
            <div>
              <a href='https://play.google.com/store/apps/details?id=com.ipickpro.livedollmachine'
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={GoogleApp} alt="GoogleApp"/>
                </a>
              <a href='https://itunes.apple.com/tw/app/ipickpro-%E5%B0%B1%E6%98%AF%E6%84%9B%E6%92%BF%E5%AF%B6/id1414137182?mt=8'
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={IosApp} alt="IosApp"/>
                </a>
            </div>
          </div>
          <div><img src={Img_1} alt="iPickPro"/></div>
        </article>
      </Layout>
    )
  }
}