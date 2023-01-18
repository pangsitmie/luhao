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
              <p>"¿No tienes ganas de salir cuando llueve?Es mejor quedate en casa jugando con la máquina de garra peluches. IPICKPRO te comprende y ofrece la gran diversión con la máquina de garra peluches. ¡ Qué la disfrutes ¡"</p>
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
              <h1>También puedes ganar peluches por online en casa..</h1>
              <p>Android/ios sincrónico online.</p>
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