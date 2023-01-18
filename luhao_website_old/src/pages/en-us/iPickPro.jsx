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
              <h1>iPickPro Entrance</h1>
              <p>Integrate each doll machine manufacturers,Let you One-finger tour.</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                  Go to iPickPro >
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
                <h1>Catch and gift it to you</h1>
              </div>
            </div>
            <div className={styles["bottom"]}>
              <div>
                <p>Can send the doll to the hand without going out</p>
              </div>
              <div>
                <p>No longer have to worry doll full hand</p>
              </div>
              <div>
                <p>Play anywhere, no matter where you are</p>
              </div>
            </div>
          </div>
          <div className={styles["iPickPro_auto"]}>
            <div className={styles["auto_1"]}>
              <div onClick={this.handleSwitchBulb} className={styles["top"]}>
                <img id="bulb" src={Ipickpro_1} alt="開燈" />
              </div>
              <div className={styles["bottom"]}>
                <h1>Outdoor, at home, anywhere</h1>
                <p>I Pick Pro can accompany you through every moment.</p>
              </div>
            </div>
            <div className={styles["auto_2"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_2} alt="爪子手" />
              </div>
              <div className={styles["right"]}>
                <h1>Guaranteed pickup</h1>
                <p>Online doll machine, guarantee each</p>
              </div>
            </div>
            <div className={styles["auto_3"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_3} alt="兩個人開心歡呼" />
              </div>
              <div className={styles["right"]}>
                <h1>Online instant conversation</h1>
                <p>Watching players while playing can also join a conversation or give a gift</p>
              </div>
            </div>
            <div className={styles["auto_4"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_4} alt="拼圖" />
              </div>
              <div className={styles["right"]}>
                <h1>cooperate with us</h1>
                <p>Easily manage the machine on the line, no longer have to worry about finding a good position for the machine</p>
              </div>
            </div>
            <div className={styles["auto_5"]}>
              <div className={styles["title"]}>
                <h1>Six guarantees</h1>
              </div>
              <div className={styles["table"]}>
                <div className={styles["top"]}>
                  <div>
                    <img src={Ipickpro_5} alt="禮物" />
                    <div>
                      Guaranteed pickup
                    </div>
                  </div>
                  <div>
                    <img src={Ipickpro_6} alt="多裝置同步處理" />
                    <div>
                      chatroom
                    </div>
                  </div>
                  <div>
                    <img src={Ipickpro_7} alt="搜尋手寫文字" />
                    <div>
                      Daily login to send points
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles["bottom"]}>
                    <img src={Ipickpro_8} alt="記事本 & 標籤" />
                    <div>
                      Home delivery
                    </div>
                  </div>
                  <div>
                    <img src={Ipickpro_9} alt="資訊版" />
                    <div>
                      More favorable prices
                    </div>
                  </div>
                  <div>
                    <img src={Ipickpro_10} alt="錢錢" />
                    <div>
                      Purchase points and bonus feedback
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
