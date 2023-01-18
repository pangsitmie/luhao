import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./productDetail.module.scss"
import Back from "../components/prevPage/prev"
import ReactTouchEvents from "react-touch-events"
import {
  machineInfo as machineInfoApi,
  machineList as machineListApi,
} from "../components/backstageapi/machine"
import lineAT from "../images/machinedata/_icon/icon.png"
import youtube from "../images/machinedata/_icon/youtube.png"

export default class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      machineInfo: null,
      machineList: null,
      display: false,
      txt: {
        /* 文字敘述/說明 */
        name: "馬卡龍單機",
        english: "MacaronClawMachine-1",
        model: "MINI-0101",
        introduction:
          "1、台灣最暢銷的迷你機型<br/>2、最卓越的空間設計<br/>3、共有5種爪型設計<br/>4、天車全速可調整<br/>5、全LED照明最節能",
        power: "待機: 77W/Hr <br/>下爪瞬間: 242W/Hr",
        Specification: "Ｗ350xＤ459xＨ692xKG",
      },
    }
  }

  componentDidMount() {
    try {
      const url = window.location.pathname.split("/")
      let urlpath = url[url.length - 2].split("-")
      urlpath = urlpath[urlpath.length - 1]
      const machineInfo = machineInfoApi(
        urlpath,
        window.location.pathname.split("/").find(function(e) {
          return e === "en-us" || e === "es"
        })
      )
      const machineData = machineListApi(
        window.location.pathname.split("/").find(function(e) {
          return e === "en-us" || e === "es"
        })
      )
      machineData
        .then(res => {
          this.setState({
            machineList: res.data,
          })
          return res.data
        })
        .catch(err => {
          return err
        })
      machineInfo.then(res => {
        this.setState({
          machineInfo: res.data,
        })
        return res.data
      })
    } catch (error) {
      console.log(error)
      return error
    }
  }

  toggle = () => {
    this.setState(prev => ({
      display: !prev.display,
    }))
  }

  render() {
    const product = this.props.data.product
    // const txt = this.state.txt
    const MCList = this.state.machineList
    const MCInfo = this.state.machineInfo
    return (
      <Layout>
        <SEO
          title="product"
          keywords={[`product`, `陸豪`, `選務販賣機`, `抓娃娃機`]}
        />
        <Back />
        <article className={`${styles.onTop}`}>
          <div>
            <div>
              <h1>
                {console.log(MCList)}
                {/* {MCList} */}
              </h1>
              <p>{product.name}</p>
            </div>
            <div>
              <ul>
                <li>
                  <h1>型號</h1>
                  <p>{!!MCInfo && MCInfo.type}</p>
                </li>
                <li>
                  <h1>介紹</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: !!MCInfo && MCInfo.introduction,
                    }}
                  />
                </li>
              </ul>
              <div>{!!MCInfo && <Main smail_image={MCInfo.small_image} />}</div>
              <ul>
                <li>
                  <h1>功率</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: !!MCInfo && MCInfo.power,
                    }}
                  />
                </li>
                <li>
                  <h1>規格</h1>
                  <p>{!!MCInfo && MCInfo.norm}</p>
                </li>
              </ul>
            </div>
            <div>
              <div>
                <img
                  src={
                    !!MCInfo
                      ? "http://luckygame777.com.tw/static_data/image/" + MCInfo.nickname_img
                      : null
                  }
                  alt="nickname_img"
                />
              </div>
              <div>
                {!!MCInfo &&
                  MCInfo.drawings.map(data => (
                    <img
                      key={data.id}
                      src={"http://luckygame777.com.tw/static_data/image/" + data.url}
                      alt="drawings"
                    />
                  ))}
              </div>
            </div>
            <div>
              {!!MCInfo && (
                <Btn
                  display={this.state.display}
                  openLightbox={this.toggle}
                  bunData={{
                    manual: !!MCInfo && MCInfo.machine_manual,
                    document: !!MCInfo && MCInfo.machine_document,
                    component: !!MCInfo && MCInfo.machine_component,
                    FBLAAA: !!MCInfo && MCInfo.fb,
                  }}
                />
              )}
              <div>
                <a
                  className=""
                  href={
                    !!MCInfo ? "https://line.me/zh-hant/" + MCInfo.line : null
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={lineAT} alt="line@" />
                </a>
                <a
                  className=""
                  href={
                    !!MCInfo
                      ? "https://www.youtube.com/watch?v=" + MCInfo.youtube
                      : null
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={youtube} alt="youtube" />
                </a>
              </div>
            </div>
          </div>
          <div>{!!MCInfo && <Main smail_image={MCInfo.small_image} />}</div>
        </article>
        <article className={`${styles.onBottom}`}>
          {!!MCInfo && <Activity big_image={MCInfo.big_image} />}
        </article>
        {!!MCInfo && (
          <Demo
            display={this.state.display}
            closeLightbox={this.toggle}
            menu_image={MCInfo.menu_image}
          />
        )}
      </Layout>
    )
  }
}

//五個BT OK OK
class Btn extends Component {
  constructor(props) {
    super(props)
    this.headleChange = this.headleChange.bind(this)
    console.log(props)
  }

  headleChange() {
    this.props.openLightbox()
  }

  hrefBtn(url) {
    try {
      window.open(
        "https://www.facebook.com/luckygame777/posts/" + url,
        "_blank"
      )
    } catch (error) {
      console.log(error)
      return error
    }
  }

  render() {
    const bunData = this.props.bunData
    return (
      <div>
        <div className={styles.mydropdown}>
          <button className={styles.mybutton}>說明書</button>
          <div>
            {!!bunData.manual & !!bunData.manual.length ? (
              bunData.manual.map(data => (
                <a
                  key={data.id}
                  href={"http://www.luckygame777.com.tw/test_official_web_server/" + data.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.name + " "}
                </a>
              ))
            ) : (
              <a href="#">暫無資料</a>
            )}
          </div>
        </div>
        <div className={styles.mydropdown}>
          <button className={styles.mybutton}>公文</button>
          <div>
            {!!bunData.document & !!bunData.document.length ? (
              bunData.document.map(data => (
                <a
                  key={data.id}
                  href={"http://www.luckygame777.com.tw/test_official_web_server/" + data.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.name}
                </a>
              ))
            ) : (
              <a href="#">暫無資料</a>
            )}
          </div>
        </div>
        <div className={styles.mydropdown}>
          <button className={styles.mybutton}>零件表</button>
          <div>
            {!!bunData.component & !!bunData.component.length ? (
              bunData.component.map(data => (
                <a
                  key={data.id}
                  href={"http://www.luckygame777.com.tw/test_official_web_server/" + data.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.name}
                </a>
              ))
            ) : (
              <a href="#">暫無資料</a>
            )}
          </div>
        </div>
        <div className={styles.mydropdown}>
          <button
            className={styles.mybutton}
            onClick={this.headleChange.bind(this)}
          >
            型錄
          </button>
        </div>
        <div className={styles.mydropdown}>
          <button
            className={styles.mybutton}
            onClick={this.hrefBtn.bind(this, bunData.FBLAAA)}
          >
            FB技術討論
          </button>
        </div>
      </div>
    )
  }
}

//型錄 OK
class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      demoCount: 1,
      limitDemo: this.props.menu_image.length,
    }
    this.headleChange = this.headleChange.bind(this)
  }

  headleChange() {
    this.props.closeLightbox()
  }

  toggle(e) {
    if (this.state.demoCount === 1 && e === -1) {
      this.setState(old => ({
        demoCount: old.limitDemo,
      }))
      return
    }
    if (this.state.demoCount === this.state.limitDemo && e === 1) {
      this.setState({
        demoCount: 1,
      })
      return
    }
    this.setState(old => ({
      demoCount: old.demoCount + e,
    }))
  }

  handleSwipe(direction) {
    switch (direction) {
      case "left":
        this.toggle(1)
        break
      case "right":
        this.toggle(-1)
        break
      default:
        break
    }
  }

  render() {
    const { display, menu_image } = this.props
    const { demoCount, limitDemo } = this.state
    let arrayImg =
      !!menu_image &&
      menu_image.map((list, index) => (
        <div
          key={list.id}
          className={`${styles.chooseDemo} ${
            demoCount === index + 1 ? `${styles.chooseDemoShow}` : ""
          }`}
        >
          <img src={"http://luckygame777.com.tw/static_data/image/" + list.url} alt="Demo" />
        </div>
      ))
    return (
      <ReactTouchEvents onSwipe={this.handleSwipe.bind(this)}>
        <div className={`${styles.demo} ${display ? `${styles.Showing}` : ""}`}>
          <div onClick={this.headleChange.bind(this)} />
          <div>
            <div className={styles.prev} onClick={() => this.toggle(-1)}>
              &#10094;
            </div>
            {arrayImg}
            <div className={styles.next} onClick={() => this.toggle(1)}>
              &#10095;
            </div>
            <div className={styles.textCount}>
              {demoCount}／{limitDemo}
            </div>
          </div>
        </div>
      </ReactTouchEvents>
    )
  }
}

//右邊的主圖片
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainCount: 1,
      limitMain: props.smail_image.length,
    }
  }

  toggle(e) {
    if (this.state.mainCount === 1 && e === -1) {
      this.setState(old => ({
        mainCount: old.limitMain,
      }))
      return
    }
    if (this.state.mainCount === this.state.limitMain && e === 1) {
      this.setState({
        mainCount: 1,
      })
      return
    }
    this.setState(old => ({
      mainCount: old.mainCount + e,
    }))
  }

  handleSwipe(direction) {
    switch (direction) {
      case "left":
        this.toggle(1)
        break
      case "right":
        this.toggle(-1)
        break
      default:
        break
    }
  }

  render() {
    const { smail_image } = this.props
    const { mainCount } = this.state
    let arrayImg =
      !!smail_image &&
      smail_image.map((list, index) => (
        <div
          key={list.id}
          className={`${styles.mainImg} ${
            mainCount === index + 1 ? `${styles.imgShowing}` : ""
          }`}
        >
          <img src={"http://luckygame777.com.tw/static_data/image/" + list.url} alt="Main" />
        </div>
      ))
    return (
      <ReactTouchEvents onSwipe={this.handleSwipe.bind(this)}>
        <div className={`${styles.main}`}>
          <div onClick={() => this.toggle(-1)}>&#10094;</div>
          {arrayImg}
          <div onClick={() => this.toggle(1)}>&#10095;</div>
        </div>
      </ReactTouchEvents>
    )
  }
}

//底下的圖片
class Activity extends Component {
  constructor(props) {
    super(props)
    // console.log("Activity")
    // console.log(props)
    this.state = {
      actCount: 1,
      limitAct: Math.floor(this.props.big_image.length / 4),
      big_image_data: null,
    }
  }

  toggle(e) {
    if (this.state.actCount === 1 && e === -1) {
      this.setState(old => ({
        actCount: old.limitAct,
      }))
      return
    }
    if (this.state.actCount === this.state.limitAct && e === 1) {
      this.setState({
        actCount: 1,
      })
      return
    }
    this.setState(old => ({
      actCount: old.actCount + e,
    }))
  }

  render() {
    const { actCount } = this.state
    const { big_image } = this.props
    let big_image_count = 0,
      totally = 0
    let big_image_arr = []
    let big_image_obj_temp = {}
    let big_image_arr_temp = []
    // console.log(big_image)
    !!big_image &&
      big_image.map(data => {
        if (big_image_count < 4) {
          big_image_arr_temp.push(data.url)
        } else {
          big_image_obj_temp["id"] = totally++
          big_image_obj_temp["url"] = big_image_arr_temp
          // console.log("big_image_obj_temp")
          // console.log(big_image_obj_temp)
          big_image_arr.push(big_image_obj_temp)
          big_image_obj_temp = {}
          big_image_arr_temp = []
          big_image_count = 0
          big_image_arr_temp.push(data.url)
        }
        big_image_count++
      })
    // console.log(big_image_arr)
    return (
      <div className={`${styles.main}`}>
        <div onClick={() => this.toggle(-1)}>&#10094;</div>
        {!!big_image_arr &&
          big_image_arr.map((list, index) => (
            <div
              key={list.id}
              className={`${styles.actImg} ${
                actCount === index + 1 ? `${styles.imgShowing}` : ""
              }`}
            >
              {list.url.map((lists, index) => {
                return (
                  <img
                    key={index}
                    src={"http://luckygame777.com.tw/static_data/image/" + lists}
                    alt="Activity"
                  />
                )
              })}
            </div>
          ))}
        <div onClick={() => this.toggle(1)}>&#10095;</div>
      </div>
    )
  }
}

export const query = graphql`
  query ProductDetails($productId: String!) {
    product(id: { eq: $productId }) {
      id
      name
      stock
      price
    }
  }
`
