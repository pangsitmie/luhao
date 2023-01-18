import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Opening from "../components/Index/opening"
import styles from "./about.module.scss"
import cloud from "../images/sixth/sixth_1.png"


export default class about extends Component {
  render() {
    return (
      <Layout>
        <SEO title="about" keywords={[`about`, `陸豪`, `關於我們`]} />
        <article className={`${styles.title} ${styles.all}`}>
          <div className={`${styles.left}`}>
            <img src={cloud} alt=''/>
          </div>
          <div className={styles["cut"]}>{/* 分割線 */}</div>
          <div className={styles["right"]}>
            <h1>陸豪科技有限公司</h1>
            <p>本公司為一家專業製造電子遊戲機公司。創立於1998年，自傳統產業一路改革創新至今。軟件.硬體至成品均為公司經營範圍。公司並跨足兩岸三地，專研遊戲機產業本著穩健的步伐，開創新的遊戲空間。所生產的機器曾多次上電視綜藝節目播出，常常榮登全台最流行的遊戲機。歡迎對網路及遊戲有熱誠的夥伴，一起開創即時的線上線下遊樂園。</p>
          </div>
        </article>
        <article className={`${styles.body} ${styles.all}`}>
          <div className={styles["left"]}>
            <img src={cloud} alt=''/>
          </div>
          <div className={styles["cut"]}>{/* 分割線 */}</div>
          <div className={styles["right"]}>
          <h1>聯絡我們</h1>
              <p>
                {/* <span>Facebook粉絲團：</span><a href="https://www.facebook.com/luckygame777/">陸豪官方粉絲專頁</a><br/> */}
                <span>客服信箱：</span>luckygame777@gmail.com <br/>
                {/* <span>line官方帳號：</span>陸豪線上客服 */}
              </p>
          </div>
        </article>
      </Layout>
    )
  }
}
