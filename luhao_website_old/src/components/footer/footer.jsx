import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./footer.module.scss"
// import Image from "../../images/nav/luhao_mobile_logo.png"
import LuhaoLittleLogo from "../../images/nav/luhao_Logo_not_font.svg"
import FBimg from "../../images/footer/facebook.svg"
import Lineimg from "../../images/footer/line.svg"
import Lineimg2 from "../../images/footer/normal.png"
import { globalHistory } from "@reach/router"
import { navtitle_tw, navtitle_es, navtitle_us } from "../nav/nav"
//navlist

//footerlist

const footertitle_tw = [
  // { id: 0, title: "公司簡介", subtitle: "About us", href: "/about" },
  {id: 0,title: "遊戲機", subtitle: "News", href: "/machine" },
  // {
  //   id: 3,
  //   title: "下載專區",
  //   subtitle: "Download",
  //   href: "/",
  //   extra: [
  //     { id: 0, title: "Ipick Pro", href: "/iPickProEnter" },
  //     { id: 1, title: "Win Pro", href: "/" },
  //     { id: 2, title: "查帳專區", href: "/system" },
  //   ],
  // },
  { id: 4, title: "新聞報導", subtitle: "News", href: "/news" },
  { id: 5, title: "招募人才", subtitle: "Join us", href: "/joinus" },
  { id: 6, title: "業務合作", subtitle: "Cooperation", href: "/" },
  { id: 7, title: "聯絡我們", subtitle: "Contact us", href: "/about" },
]
const footertitle_us = [
  { id: 0, title: "About us", subtitle: "公司簡介", href: "/en-us/about" },
  {
    id: 2,
    title: "Product",
    subtitle: "產品中心",
    href: "/",
    extra: navtitle_us,
  },
  // {
  //   id: 3,
  //   title: "Download",
  //   subtitle: "下載專區",
  //   href: "/",
  //   extra: [
  //     { id: 0, title: "Ipick Pro", href: "/en-us/iPickProEnter/" },
  //     { id: 1, title: "Win Pro", href: "/" },
  //     { id: 2, title: "查帳專區", href: "/en-us/system/" },
  //   ],
  // },
  { id: 4, title: "News", subtitle: "新聞報導", href: "/news" },
  { id: 5, title: "Join us", subtitle: "招募人才", href: "/en-us/joinus" },
  { id: 6, title: "Cooperation", subtitle: "業務合作", href: "/" },
  { id: 7, title: "Contact us", subtitle: "聯絡我們", href: "/en-us/about" },
]
const footertitle_es = [
  //西班牙文
  { id: 0, title: "Sobre nosotros", subtitle: "About us", href: "/es/about" },
  {
    id: 2,
    title: "Producto",
    subtitle: "Product",
    href: "/",
    extra: navtitle_es,
  },
  // {
  //   id: 3,
  //   title: "Descargar",
  //   subtitle: "Download",
  //   href: "/",
  //   extra: [
  //     { id: 0, title: "Ipick Pro", href: "/es/iPickProEnter/" },
  //     { id: 1, title: "Win Pro", href: "/" },
  //     { id: 2, title: "查帳專區", href: "/es/system/" },
  //   ],
  // },
  { id: 4, title: "Noticias", subtitle: "News", href: "/news" },
  { id: 5, title: "Únete a nosotros", subtitle: "Join us", href: "/es/joinus" },
  { id: 6, title: "Cooperación", subtitle: "Cooperation", href: "/" },
  { id: 7, title: "Contáctenos", subtitle: "Contact us", href: "/es/about" },
]

function footertitle() {
  //  console.log(globalHistory.location.pathname.split('/',2)[1])
  let url = globalHistory.location.pathname.split("/").find(function(e) {
    return e === "en-us" || e === "es"
  })
  if (url === "") {
    return footertitle_tw
  } else if (url === "es") {
    return footertitle_es
  } else if (url === "en-us") {
    return footertitle_us
  } else {
    return footertitle_tw
  }
}

const inwhere_tw = [
  {
    id: 0,
    row: "總部/HQ: 陸豪科技有限公司",
    space: "",
  },
  {
    id: 1,
    row: "電話/Tel: 04-23387696",
    space: "",
  },
  {
    id: 2,
    row: "新址/add： 台中市烏日區高鐵五路156號六樓",
    space: "",
  },
  {
    id: 3,
    row: "郵件/E-mail: ",
    space: <a href = "/mailus">luckygame777@gmail.com</a>,
  },
  { id: 4, row: "Copyright © 2019 Luhao 陸豪科技有限公司", space: "" },
]
const inwhere_es = [
  //西班牙文
  {
    id: 0,
    row: "LuHao Technology Co.,Ltd. ",
    space:"",
  },
  {
    id: 1,
    row: "Office: 04-23387696. ",
    space:"",
  },
  {
    id: 2,
    row: "Address: 6F., No. 156, Gaotie 5th Rd., Wuri Dist., Taichung City 414",
    space: "",
  },
  {
    id: 3,
    row: "E-mail: ",
    space: <a href = "/es/mailus">luckygame777@gmail.com</a>,
  },
  { id: 4, row: "Copyright © 2019 Luhao Technology Co., Ltd.", space: "" },
]
const inwhere_us = [
  {
    id: 0,
    row: "LuHao Technology Co.,Ltd.",
    space:"",
  },
  {
    id: 1,
    row: "Office: 04-23387696",
    space:"",
  },
  {
    id: 2,
    row: "Address: 6F., No. 156, Gaotie 5th Rd., Wuri Dist., Taichung City 414",
    space:"",
  },
  {
    id: 3,
    row: "E-mail: ",
    space: <a href = "/en-us/mailus">luckygame777@gmail.com</a>,
  },
  { id: 4, row: "Copyright © 2019 Luhao Technology Co., Ltd.", space: "" },
]

function inwhere() {
  //  console.log(globalHistory.location.pathname.split('/',2)[1])
  let url = globalHistory.location.pathname.split("/").find(function(e) {
    return e === "en-us" || e === "es"
  })
  if (url === "") {
    return inwhere_tw
  } else if (url === "es") {
    return inwhere_es
  } else if (url === "en-us") {
    return inwhere_us
  } else {
    return inwhere_tw
  }
}
export default class footer extends Component {
  handleSwitchWeb(temp) {
    const meta = document.getElementsByTagName("meta")
    for (let i = 0; i < meta.length; i++) {
      if (meta[i].name === "viewport") {
        meta[i].content = ""
      }
    }
    if (temp === "on") {
      for (let i = 0; i < meta.length; i++) {
        if (meta[i].name === "viewport") {
          meta[i].content =
            "width=1280,initial-scale=0.5,maximum-scale=3.0,user-scalable=1"
        }
      }
    } else if (temp === "off") {
      for (let i = 0; i < meta.length; i++) {
        if (meta[i].name === "viewport") {
          meta[i].content = "width=device-width, initial-scale=1.0"
        }
      }
    }
  }

  render() {
    return (
      <footer className={styles["footer"]}>
        {/* <Link to={"/"}>
         <img src={Image} alt="luhaoLogo" />
        </Link> */}
        <div className={styles["footer_top"]}>
          <ul>
            {footertitle().map((data, index) =>
              data.extra ? (
                <div key={data.id}>
                  <input
                    type="checkbox"
                    name={"footer_checkbox_" + index}
                    id={"footer_checkbox_" + index}
                  />
                  <li className={styles["product"]}>
                    <label htmlFor={"footer_checkbox_" + index}>
                      {data.title}
                      <br />
                      <span>{data.subtitle}</span>
                    </label>
                    <div className={styles["navlist"]}>
                      <ul>
                        {data.extra.map(extraData => (
                          <li key={extraData.id}>
                            <Link to={extraData.href}>{extraData.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </div>
              ) : (
                <li key={data.id}>
                  <Link to={data.href}>
                    {data.title}
                    <br />
                    <span>{data.subtitle}</span>
                  </Link>
                </li>
              )
            )}
            <li onClick={this.handleSwitchWeb.bind(this, "on")}>
              <Link to="/">
                電腦版
                <br />
                PC
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles["footer_middle"]}>
          <div className={styles["footer_left"]}>
            {inwhere().map(data => (
              <p key={data.id}>
                {data.row}
                <br />
                {data.space}
              </p>
            ))}
          </div>
          <div className={styles["footer_right"]}>
            <div className={styles["footer_Logo_top"]}>
              <img src={LuhaoLittleLogo} alt="LuhaoLogo" />
            </div>
            <div className={styles["footer_Logo_bottom"]}>
              <a href="https://zh-tw.facebook.com/luckygame777/">
                <img src={FBimg} alt="facebook" />
              </a>
              <a href="http://line.me/ti/p/@iqn7511w">
                <img src={Lineimg} alt="Line" />
              </a>
              <a href="http://line.me/ti/p/@528chuoz">
                <img src={Lineimg2} alt="Line" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles["footer_bottom"]}>
          <div onClick={this.handleSwitchWeb.bind(this, "off")}>
            返回手機板
            <br />
            <span>back to Mobile</span>
          </div>
        </div>
      </footer>
    )
  }
}
