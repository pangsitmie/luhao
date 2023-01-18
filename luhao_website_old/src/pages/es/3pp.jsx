import React, { Component } from 'react'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Opening from "../../components/Index/opening"
import styles from "./3pp.module.scss"

import Img from "../../images/fifth/fifth_3.png"

export default class Threepp extends Component {
  render() {
    return (
      <Layout>
        <SEO title="3pp" keywords={[`3pp`, `陸豪`, `吸粉服務`]} />
        <Opening
          number="3pp"
          left={
            <div className={styles["lefttext"]}>
              <h1>Integrar pagos de terceros.</h1>
              <p>WINPRO cloud integra a los sistemas principales de pago de terceros de distintos paises, el mercado de los comrciantes se expanderá hacia los consumidores domésticos e internacionales. Esto dejará gran aumento de ganancia.</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                Ver video >
                </a>
              </div>
            </div>
          }
          right={
            <div className={styles["rightimage"]}>
              <div className={styles["ofFlex"]}>
              </div>
            </div>
          }
        />
        <article className={styles["body"]}>
          <div>
            <h1>Integrar pagos de terceros.</h1>
            <p>WINPRO cloud integra a los sistemas principales de pago de terceros de distintos paises, el mercado de los comrciantes se expanderá hacia los consumidores domésticos e internacionales. Esto dejará gran aumento de ganancia.</p>
          </div>
          <div>
            <img src={Img} alt=''/>
          </div>
        </article>
      </Layout>
    )
  }
}
