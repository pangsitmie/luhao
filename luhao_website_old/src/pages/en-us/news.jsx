import React, { Component } from 'react'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import styles from "./news.module.scss"
import Photo1 from "../../images/news/show1.jpg"
import Photo2 from "../../images/news/show2.jpg"
import Photo3 from "../../images/news/show3.jpg"
import Photo4 from "../../images/news/show4.jpg"
import Photo5 from "../../images/news/show5.jpg"
import Photo6 from "../../images/news/show6.jpg"
import Photo7 from "../../images/news/show7.jpg"
import Photo8 from "../../images/news/show8.jpg"
import Photo9 from "../../images/news/show9.jpg"


export default class news extends Component {

  render() {
    return (
      <Layout>
        <SEO title="news" keywords={[`news`, `陸豪`, `新聞報導`]} />
        <div className={`${styles.newsTitle}`}>
          <h1>News</h1>
        </div>
        <div className={`${styles.newsBody}`}>
          <div>
            <h3>Last News</h3>
            {/* <p>Last News</p> */}
          </div>
          <div className={`${styles.newsCont}`}>
            <h1>Heading to the future, GTI Taipei Expo 2019 opens the new amusement format for you!
              <span>2019/4/27</span>
            </h1>
            <p>
              On April 25-27, the 26th GTI Asia Taipei Expo was grandly inaugurated at A Zone, Hall 1, Taipei World Trade Center (TWTC), Taipei City. Jointly organized by TAMA, TDEA and GTI,the show was themed by “integrating into a new chapter, heading to the future”. Though the development of the global game & amusement industry is imbalance, and the needs of the market drop down, GTI Asia Taipei Expo still covered various kinds of products, including video game, online game, VR/AR, inflatable, children amusement equipment, sport amusement equipment, games’ R&D, solution, parts and other related products. It hoped to expand the amusement’s diversity, and focused on the internationalization and quality to create a worldwide “name card” - MIT, and leads the industry to follow a new format of pan-amusement.(2019/04/27)
            </p>
          </div>
          <div className={`${styles.newsImage}`}>
            <img src={Photo1} alt="Photo1" />
            <img src={Photo2} alt="Photo2" />
            <img src={Photo3} alt="Photo3" />
            <img src={Photo4} alt="Photo4" />
            <img src={Photo5} alt="Photo5" />
          </div>
          <div className={`${styles.newsCont}`}>
            <h4>Exhibition info</h4>
            <p>
              Exhibition Name：The 26th GTI Asia Taipei Expo<br />
              Exhibition hours：10am-6pm, April 25-26<br />
              10am -4pm, April 27<br />
              Address：A Zone, Hall 1, Taipei World Trade Center (TWTC), Taipei City<br />
              Organizers：GTI, TAMA, TDEA, Taiwan Slot, Game Time International Magazine, China Amuse
            </p>
          </div>
          <div className={`${styles.newsImage}`}>
            <img src={Photo6} alt="Photo6" />
            <img src={Photo7} alt="Photo7" />
            <img src={Photo8} alt="Photo8" />
            <img src={Photo9} alt="Photo9" />
          </div>
          <div className={`${styles.newsCont}`}>
            <h4>Exhibitors’ activities:</h4>
            <p>
              1.36 large video games including “Monster Eye 2”, as well as 5 classic online games to make you enjoy the new amusement experiences from IGS ——A90<br />
              2.Honey Wars, the knockout match of “Clear Eyes and Nimble Hands” from Feiloli ——A28<br />
              3.The initial competition of novel basketball game from Wu Mar Harng & Paokai. ——A100<br />
              4.The 10th audition of “China Cup” from Saint-Fun International ——A42<br />
              5.The latest pinball machine and popcorn machine from Wee Chin ——A30<br />
              6.The lucky draw + dancing performance from Yuanmei ——A89<br />
              7.Lord Of The World, an interactive game experience from Bingotimes Digital——A17<br />
              8.New games experience and live lucky draw——A102<br />
            </p>
          </div>
          <div style={{ 'margin': '3% 0' }}></div>
        </div>
      </Layout>
    )
  }
}