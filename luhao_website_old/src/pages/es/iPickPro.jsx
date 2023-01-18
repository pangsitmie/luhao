import React, { Component } from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Opening from "../../components/Index/opening"
import styles from "./iPickPro.module.scss"
import Img_1 from "../../images/home/home_5.png"
import Ipickpro from "../../images/home/ipickpro.svg"
import Ipickpro_1 from "../../images/home/ipickpro_1.svg"
import Ipickpro_2 from "../../images/home/ipickpro_2.svg"
import Ipickpro_3 from "../../images/home/ipickpro_3.svg"
import Ipickpro_4 from "../../images/home/ipickpro_4.svg"
import Ipickpro_5 from "../../images/home/ipickpro_5.svg"
import Ipickpro_6 from "../../images/home/ipickpro_6.svg"
import Ipickpro_7 from "../../images/home/ipickpro_7.svg"
import Ipickpro_8 from "../../images/home/ipickpro_8.svg"
import Ipickpro_9 from "../../images/home/ipickpro_9.svg"
import Ipickpro_10 from "../../images/home/ipickpro_10.svg"
import Ipickpro_11 from "../../images/home/ipickpro_11.svg"

export default class iPickPro extends Component {
  handleSwitchBulb() {
    const bulb = document.querySelector("#bulb")
    if (bulb.alt === "開燈") {
      document.body.setAttribute("bulb-temp", "close")
      bulb.src = Ipickpro_11
      bulb.alt = "關燈"
    } else {
      document.body.removeAttribute("bulb-temp")
      bulb.src = Ipickpro_1
      bulb.alt = "開燈"
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="iPickPro" keywords={[`iPickPro`, `陸豪`, `娃娃機`]} />
        <Opening
          number="iPickPro"
          left={
            <div className={styles["lefttext"]}>
              <h1>La entrada iPickPro</h1>
              <p>Integrado a los fabricantes de máquina de garra peluches, dejaarte recorriendolo con un dedo</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                  Entra al ipickpro >
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
          <div className={styles["iPickPro_1"]}>
            <div className={styles["top"]}>
              <div className={styles["titleImg"]}>
                <img src={Ipickpro} alt="ipickpro" />
              </div>
              <div className={styles["title"]}>
                <h1>atrapar y regalo a usted</h1>
              </div>
            </div>
            <div className={styles["bottom"]}>
              <div>
                  <p>Manda la muñeca a la mano</p>
              </div>
              <div>
                  <p>Ya no tiene que preocuparse de las manos están llenas de muñecas</p>
              </div>
              <div>
                  <p>Juega en cualquier lugar, no importa donde estés.</p>
              </div>
            </div>
          </div>
          <div className={styles["iPickPro_auto"]}>
            <div className={styles["auto_1"]}>
              <div onClick={this.handleSwitchBulb} className={styles["top"]}>
                <img id="bulb" src={Ipickpro_1} alt="開燈" />
              </div>
              <div className={styles["bottom"]}>
                <h1>Al aire libre, en casa, en cualquier lugar.</h1>
                <p>I Pick Pro le acompañará a través de cada momento.</p>
              </div>
            </div>
            <div className={styles["auto_2"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_2} alt="爪子手" />
              </div>
              <div className={styles["right"]}>
                <h1>extracto garantizada</h1>
                <p>Máquina de muñecas online, garantizamos cada una.</p>
              </div>
            </div>
            <div className={styles["auto_3"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_3} alt="兩個人開心歡呼" />
              </div>
              <div className={styles["right"]}>
                <h1>Conversación instantánea en línea</h1>
                <p>Observar a los jugadores mientras juegan también puede unirse a una conversación o dar un regalo.</p>
              </div>
            </div>
            <div className={styles["auto_4"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_4} alt="拼圖" />
              </div>
              <div className={styles["right"]}>
                <h1>Trabaja con nosotros</h1>
                <p>Administre fácilmente la máquina en línea, ya no tendrá que preocuparse por encontrar una buena posición para la máquina</p>
              </div>
            </div>
            <div className={styles["auto_5"]}>
              <div className={styles["title"]}>
                <h1>Seis garantías</h1>
              </div>
              <div className={styles["table"]}>
                <div className={styles["top"]}>
                  <div>
                    <img src={Ipickpro_5} alt="禮物" />
                    <div>
                      extracto garantizada
                    </div>
                  </div>
                  <div>
                    <img src={Ipickpro_6} alt="多裝置同步處理" />
                    <div>
                      Sala de chat
                    </div>
                  </div>
                  <div>
                    <img src={Ipickpro_7} alt="搜尋手寫文字" />
                    <div>
                      Inicio de sesión diario para enviar puntos.
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles["bottom"]}>
                    <img src={Ipickpro_8} alt="記事本 & 標籤" />
                    <div>
                      La entrega a domicilio
                    </div>
                  </div>
                  <div>
                    <img src={Ipickpro_9} alt="資訊版" />
                    <div>
                      Precios mas favorables
                    </div>
                  </div>
                  <div>
                    <img src={Ipickpro_10} alt="錢錢" />
                    <div>
                      puntos de compra y retroalimentación de bonificación
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Layout>
    )
  }
}
