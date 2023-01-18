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
            <p>La empresa es un fabricante profesional de consolas de juegos electrónicos. Fundada en 1998, ha sido reformada y reformada a partir de industrias tradicionales. Software. El hardware para los productos terminados es el ámbito de negocio de la empresa. La compañía también ha aterrizado en 2 orillas y 3 lugares, especializándose en la industria de las máquinas de juego a un ritmo constante, abriendo un nuevo espacio de juego. Las máquinas producidas se han marcado en programas de variedades de TV muchas veces, ganando a menudo las consolas de juegos más populares de Taiwan. Bienvenido a la red y los juegos con un compañero apasionado, junto con el juego y el mundo en línea, para crear un parque infantil feliz.</p>
          </div>
        </article>
        <article className={`${styles.body} ${styles.all}`}>
          <div className={styles["left"]}>
            <img src={cloud} alt=''/>
          </div>
          <div className={styles["cut"]}>{/* 分割線 */}</div>
          <div className={styles["right"]}>
          <h1>Contáctenos</h1>
              <p>
                {/* <span>Facebook：</span><a href='https://www.facebook.com/luckygame777/'>Página oficial de Luhao</a><br/> */}
                <span>Servicio al Cliente：</span>luckygame777@gmail.com <br/>
                {/* <span>Cuenta oficial del LINE：</span>servicio de atención al cliente en línea de Luhao. */}
              </p>
          </div>
        </article>
      </Layout>
    )
  }
}
