import React, { Component } from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Opening from "../../components/Index/opening"
import styles from "./iPickProEnter.module.scss"
import Img_1 from "../../images/home/home_5.png"
import GoogleApp from "../../images/footer/googleplay.png"
import IosApp from "../../images/footer/iosapp.png"

export default class iPickProEnter extends Component {

  render() {
    return (
      <Layout>
        <SEO title="iPickProEnter" keywords={[`iPickProEnter`, `陸豪`, `娃娃機`]} />
        <Opening
          number="iPickPro"
          left={
            <div className={styles["lefttext"]}>
              <h1>iPickPro</h1>
              <p>Don't want to go out and want to play the claw machine on a rainy day?iPickPro heard your voice and let you enjoy the fun of playing the claw machine at home.</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                  Descargar >
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
              <h1>You can also claw dolls online at home.</h1>
              <p>Android/ios Synchronous Online!</p>
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