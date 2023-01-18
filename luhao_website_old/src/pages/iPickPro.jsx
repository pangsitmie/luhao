import React, { Component } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Opening from "../components/Index/opening"
import styles from "./iPickPro.module.scss"
import Img_1 from "../images/home/home_5.png"
import Ipickpro from "../images/home/ipickpro.svg"
import Ipickpro_1 from "../images/home/ipickpro_1.svg"
import Ipickpro_2 from "../images/home/ipickpro_2.svg"
import Ipickpro_3 from "../images/home/ipickpro_3.svg"
import Ipickpro_4 from "../images/home/ipickpro_4.svg"
import Ipickpro_5 from "../images/home/ipickpro_5.svg"
import Ipickpro_6 from "../images/home/ipickpro_6.svg"
import Ipickpro_7 from "../images/home/ipickpro_7.svg"
import Ipickpro_8 from "../images/home/ipickpro_8.svg"
import Ipickpro_9 from "../images/home/ipickpro_9.svg"
import Ipickpro_10 from "../images/home/ipickpro_10.svg"
import Ipickpro_11 from "../images/home/ipickpro_11.svg"

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
              <h1>iPickPro入口網</h1>
              <p>整合各家娃娃機廠商，讓您一指遨遊</p>
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
          <div className={styles["iPickPro_1"]}>
            <div className={styles["top"]}>
              <div className={styles["titleImg"]}>
                <img src={Ipickpro} alt="ipickpro" />
              </div>
              <div className={styles["title"]}>
                <h1>夾到宅配到家</h1>
              </div>
            </div>
            <div className={styles["bottom"]}>
              <div>
                <p>不用出門也能將娃娃送到手中</p>
              </div>
              <div>
                <p>再也不用煩惱夾到娃娃大包小包的困擾</p>
              </div>
              <div>
                <p>不管在哪都可以盡情遊玩</p>
              </div>
            </div>
          </div>
          <div className={styles["iPickPro_auto"]}>
            <div className={styles["auto_1"]}>
              <div onClick={this.handleSwitchBulb} className={styles["top"]}>
                <img id="bulb" src={Ipickpro_1} alt="開燈" />
              </div>
              <div className={styles["bottom"]}>
                <h1>在戶外、在家、在任何地方</h1>
                <p>I Pick Pro都能陪你歡度每一個時刻。</p>
              </div>
            </div>
            <div className={styles["auto_2"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_2} alt="爪子手" />
              </div>
              <div className={styles["right"]}>
                <h1>保證取物</h1>
                <p>線上夾娃娃機台、每台保證取物</p>
              </div>
            </div>
            <div className={styles["auto_3"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_3} alt="兩個人開心歡呼" />
              </div>
              <div className={styles["right"]}>
                <h1>線上即時對話</h1>
                <p>遊玩時觀看玩家也可加入對話或是送禮</p>
              </div>
            </div>
            <div className={styles["auto_4"]}>
              <div className={styles["left"]}>
                <img src={Ipickpro_4} alt="拼圖" />
              </div>
              <div className={styles["right"]}>
                <h1>與我們合作</h1>
                <p>線上輕鬆管理機台、再也不用擔心找機台好位置</p>
              </div>
            </div>
            <div className={styles["auto_5"]}>
              <div className={styles["title"]}>
                <h1>六大保證</h1>
              </div>
              <div className={styles["table"]}>
                <div className={styles["top"]}>
                  <div>
                    <img src={Ipickpro_5} alt="禮物" />
                    <div>保證取物</div>
                  </div>
                  <div>
                    <img src={Ipickpro_6} alt="多裝置同步處理" />
                    <div>夾娃娃聊天室</div>
                  </div>
                  <div>
                    <img src={Ipickpro_7} alt="搜尋手寫文字" />
                    <div>每日登入送積分</div>
                  </div>
                </div>
                <div>
                  <div className={styles["bottom"]}>
                    <img src={Ipickpro_8} alt="記事本 & 標籤" />
                    <div>禮物宅配到家</div>
                  </div>
                  <div>
                    <img src={Ipickpro_9} alt="資訊版" />
                    <div>價格更優惠</div>
                  </div>
                  <div>
                    <img src={Ipickpro_10} alt="錢錢" />
                    <div>購點紅利回饋</div>
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
