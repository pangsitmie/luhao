import React, { Component } from 'react'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
// import Opening from "../components/Index/opening"
import styles from "./about.module.scss"
import cloud from "../../images/sixth/sixth_1.png"


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
            <h1>Lu Hao Technology Co., Ltd.</h1>
            <p>The company is a professional manufacturer of electronic game consoles. Founded in 1998, it has been reformed and reformed from traditional industries. Software. Hardware to finished products are the company's business scope. The company has also landed on 2 shores and 3 places, specializing in the game machine industry in a steady pace, opening up new game space. The machines produced have been dialed out on TV variety shows many times, often winning the most popular game consoles in Taiwan. Welcome to the network and games with a passionate partner, together with the game and the online world, to create a happy children's playground.</p>
          </div>
        </article>
        <article className={`${styles.body} ${styles.all}`}>
          <div className={styles["left"]}>
            <img src={cloud} alt=''/>
          </div>
          <div className={styles["cut"]}>{/* 分割線 */}</div>
          <div className={styles["right"]}>
          <h1>Contact us</h1>
              <p>
                {/* // <span>Facebook：</span><a href='https://www.facebook.com/luckygame777/'>Luhao official fan page</a><br/> */}
                <span>Customer Service：</span>luckygame777@gmail.com <br/>
                {/* // <span>LineOfficial account：</span>Luhao online customer service */}
              </p>
          </div>
        </article>
      </Layout>
    )
  }
}
