import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./nav.module.scss"
import Image from "../../images/nav/luhao_mobile_logo.png"
import language from '../../images/nav/language_web_icon.png'
import { globalHistory } from "@reach/router"

export const navtitle_tw = [
  { id: 1, title: "遊戲機", title2: "", href: "/machine/" },
  // { id: 2, title: "iPickPro", title2: "入口網", href: "/iPickPro/" },
  // { id: 3, title: "iPickPro", title2: "愛撿寶", href: "/iPickProEnter/" },
  // { id: 4, title: "WINPRO", title2: "吸粉服務", href: "/winpro/" },
  // { id: 5, title: "查帳系統", title2: "", href: "/system/" },
  // { id: 6, title: "多媒設計", title2: "", href: "/multi/" },
  // { id: 7, title: "第三方支付", title2: "", href: "/3pp/" },
  { id: 8, title: "關於我們", title2: "", href: "/about/" },
]

export const navtitle_us = [
  { id: 1, title: "Game", title2: "Machine", href: "/en-us/machine/" },
  // { id: 2, title: "iPickPro", title2: "Enter", href: "/en-us/iPickPro/" },
  // {
  //   id: 3,
  //   title: "iPickPro",
  //   title2: "Cloud Claw Machine",
  //   href: "/en-us/iPickProEnter/",
  // },
  // { id: 4, title: "WINPRO", title2: "Absorb Fan", href: "/en-us/winpro/" },
  // { id: 5, title: "Audit", title2: "System", href: "/en-us/system/" },
  // { id: 6, title: "Multi", title2: "Media", href: "/en-us/multi/" },
  // { id: 7, title: "3PP", title2: "", href: "/en-us/3pp/" },
  { id: 8, title: "About", title2: "Us", href: "/en-us/about/" },
]

export const navtitle_es = [
  { id: 1, title: "Máquina", title2: "de juegos", href: "/es/machine/" },
  // { id: 2, title: "iPickPro", title2: "La entrada", href: "/es/iPickPro/" },
  // { id: 3, title: "iPickPro", title2: "", href: "/es/iPickProEnter/" },
  // { id: 4, title: "WINPRO", title2: "", href: "/es/winpro/" },
  // { id: 5, title: "Sistema", title2: "de auditoría", href: "/es/system/" },
  // { id: 6, title: "Diseño", title2: "multimedia", href: "/es/multi/" },
  // { id: 7, title: "pagos de", title2: "terceros", href: "/es/3pp/" },
  { id: 8, title: "Contáctenos", title2: "", href: "/es/about/" },
]

function languageBtn() {
  let url = globalHistory.location.pathname.split("/").find(function(e) {
    return e === "en-us" || e === "es"
  })
  return (<img src={language} alt="" />);
  
  // switch (url) {
  //   case "":
  //     return "語言"
  //   case "es":
  //     return "language"
  //   case "en-us":
  //     return "language"
  //   default:
  //     return "語言"
  // }
}
function choose() {
  //  console.log(globalHistory.location.pathname.split('/',2)[1])
  let url = globalHistory.location.pathname.split("/").find(function(e) {
    return e === "en-us" || e === "es"
  })
  let navtitle
  if (url === "") {
    navtitle = navtitle_tw
  } else if (url === "es") {
    navtitle = navtitle_es
  } else if (url === "en-us") {
    navtitle = navtitle_us
  } else {
    navtitle = navtitle_tw
  }
  return navtitle.map(data => (
    <li key={data.id}>
      <Link to={data.href}>
        {data.title}
        <br />
        {data.title2}
      </Link>
    </li>
  ))
}

export default class nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      url: globalHistory.location.pathname,
      home: "",
    }
  }

  taggle() {
    this.setState(old => ({
      show: !old.show,
    }))
    this.check()
  }

  //判斷當前語系
  check() {
    // console.log('first:'+this.state.url)
    let url_N = this.state.url.split("/")[1]
    if (url_N === "es" || url_N === "en-us") {
      url_N = this.state.url
        .split("/")
        .slice(2, this.state.url.length - 1)
        .join("/")
      console.log(url_N)
      this.setState({
        url: "/" + url_N,
      })
    } else {
      this.setState(old => ({
        url: old.url,
      }))
    }
  }

  //回到首頁
  homeLink() {
    let home = globalHistory.location.pathname.split("/").find(function(e) {
      return e === "en-us" || e === "es"
    })
    if (home === "es" || home === "en-us") {
      this.setState({
        home: "/" + home + "/",
      })
    }
  }

  render() {
    const { show, url, home } = this.state
    return (
      <React.Fragment>
        <input
          className={styles["NavCheck"]}
          type="checkbox"
          name="NavCheck"
          id="NavCheck"
        />
        <nav className={styles["nav"]}>
          <Link to={home}>
            <img
              src={Image}
              alt="luhaoLogo"
              onMouseEnter={() => this.homeLink()}
            />
          </Link>
          <ul>
            {choose()}
            <li onClick={() => this.taggle()} data-filetype="language">
              <p>{languageBtn()}</p>
            </li>
            <li
              data-filetype="languageChoose"
              className={`${show ? `${styles.openM}` : ""}`}
            >
              <Link to={url}>中文</Link>
              <Link to={"/en-us" + url}>English</Link>
              <Link to={"/es" + url}>español</Link>
            </li>
          </ul>
          <label htmlFor="NavCheck" onClick={() => this.check()}>
            <div className={styles["bar1"]} />
            <div className={styles["bar2"]} />
          </label>
        </nav>
        <div className={`${styles.language} ${show ? `${styles.open}` : ""}`}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Link to={url}>中文</Link>
                </td>
                <td>
                  <Link to={"/en-us" + url}>English</Link>
                </td>
                <td>
                  <Link to={"/es" + url}>español</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}
