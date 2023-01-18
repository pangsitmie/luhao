import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./news.module.scss"
import Photo1 from "../images/news/show1.jpg"
import Photo2 from "../images/news/show2.jpg"
import Photo3 from "../images/news/show3.jpg"
import Photo4 from "../images/news/show4.jpg"
import Photo5 from "../images/news/show5.jpg"
import Photo6 from "../images/news/show6.jpg"
import Photo7 from "../images/news/show7.jpg"
import Photo8 from "../images/news/show8.jpg"
import Photo9 from "../images/news/show9.jpg"


export default class news extends Component {

  render() {
    return (
      <Layout>
        <SEO title="news" keywords={[`news`, `陸豪`, `新聞報導`]} />
        <div className={`${styles.newsTitle}`}>
          <h1>新聞報導</h1>
        </div>
        <div className={`${styles.newsBody}`}>
            <div>
                <h3>最新消息</h3>
                <p>Last News</p>
            </div>
            <div className={`${styles.newsCont}`}>
                <h1>啟幕未來，2019GTI臺北展為你打開泛娛樂的新格局！
                  <span>2019/4/27</span>
                </h1>
                <p>
                    4月25～27日，由臺灣商用電子遊戲機產業協會（TAMA）、臺灣數位休閒娛樂產業協會（TDEA）及浩基有限公司（GTI）共同主辦的第26屆GTI臺灣電子遊戲機國際產業展（下稱GTI臺北展）在臺北世界貿易中心展覽場一館A區盛大啟幕。在全球電子遊戲機產業發展不均衡和市場需求整體向下的大環境下，2019GTI臺北展以“融聚創新，啟幕未來”為主題，涵蓋商用電子遊戲機、線上手遊、VR/AR、淘氣堡、兒童娛樂設備、運動娛樂設備、遊戲研發、系統解決方案及周邊零配件等豐富的展覽專案，希望通過多元共融拓展娛樂的多樣性，聚焦品質的國際化打造MIT的世界名片，引領臺灣電子遊戲機產業走向泛娛樂的新格局。(2019/04/27)
                </p>
            </div>
            <div className={`${styles.newsImage}`}>
                <img src={Photo1} alt="Photo1"/>
                <img src={Photo2} alt="Photo2"/>
                <img src={Photo3} alt="Photo3"/>
                <img src={Photo4} alt="Photo4"/>
                <img src={Photo5} alt="Photo5"/>
            </div>
            <div className={`${styles.newsCont}`}>
                <h4>展覽資訊</h4>
                <p>
                    展覽名稱：第26屆GTI臺灣電子遊戲機國際產業展<br/>
                    展覽時間：4月25日—26日  上午10:00—下午6：00<br/>
                            4月27日       上午10:00—下午4：00<br/>
                    展覽地點：臺北世界貿易中心展覽場一館A區（地址：臺北市信義區信義路五段五號）<br/>
                    主辦單位：GTI浩基有限公司、臺灣商用電子遊戲機產業協會（TAMA）、臺灣數位<br/>休閒娛樂產業協會（TDEA）、《臺灣電玩》雜誌、《GTI國際專刊》、《GTI神州遊樂》
                </p>
            </div>
            <div className={`${styles.newsImage}`}>
              <img src={Photo6} alt="Photo6"/>
              <img src={Photo7} alt="Photo7"/>
              <img src={Photo8} alt="Photo8"/>
              <img src={Photo9} alt="Photo9"/>
            </div>
            <div className={`${styles.newsCont}`}>
                <h4>展商活動通告：</h4>
                <p>
                    1.IGS鈊象電子《巨獸浩劫2》等36款大型遊戲機和5款經典手遊，讓你感受娛樂新體驗。——A90<br/>
                    2.飛絡力x蜜蜜熊，眼明手快淘汰賽——A28<br/>
                    3.寶凱&武馬行--首發新型投籃機大賽——A100<br/>
                    4.尚芳國際第十屆大中華杯海選賽——A42<br/>
                    5.微勤電機帶來最新彈珠台和爆米花機，要給你”好看”——A30<br/>
                    6.臺灣元美現場抽獎+熱舞表演——A89<br/>
                    7.天下數位雄霸天下互動遊戲體驗——A17<br/>
                    8.名豐新機體驗和現場摸彩——A102<br/>
                </p>
            </div>
            <div style={{'margin':'3% 0'}}></div>
        </div>
      </Layout>
    )
  }
}