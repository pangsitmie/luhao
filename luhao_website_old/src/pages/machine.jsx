import React, { Component } from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { globalHistory } from "@reach/router"
import { machineList as machineListApi } from "../components/backstageapi/machine"
// import axios from "axios"
import ResponImg from "../components/ResponImg"
import SEO from "../components/seo"
import Opening from "../components/Index/opening"
import styles from "./machine.module.scss"
import Img_1 from "../images/machinedata/0101/主照片/showindex.png"

export default class machine extends Component {
  state = {
    error: "",
    Type: [
      { id: 1, type_name: "選物販賣機", subtitle: "Vending Machine" },
      { id: 2, type_name: "兌幣機", subtitle: "COIN Exchange Machine" },
      { id: 3, type_name: "禮品機", subtitle: "Gift Vending Machine" },
      { id: 4, type_name: "打擊&騎乘類", subtitle: "Blow & Riding Machine" },
      { id: 5, type_name: "進口機台", subtitle: "Imported Machine" },
    ],
    machinedata: null,
  }

  componentDidUpdate() {
    !!this.state.machinedata && ResponImg()
  }

  componentDidMount() {
    var machineData = machineListApi()
    machineData
      .then(res => {
        return res.data
      })
      .then(json => {
        json.push({
          id:29,
          type: 1,
          machine_name: "自訂機台",
          subtitle: "customize",
          image: "cJj0ZzK.png"
        })
        this.setState({
          machinedata: json,
        })
    })
      .catch(err => {
        return err
      })
  }

  handleLink(id,image){
    const url = globalHistory.location.pathname.split("/", 2)[1]
    if(id===29){
      return(
        <Link
          to={
            (url === "es" || url === "en-us" ? url : "") +
            "/machineform"
          }
        >
          <img
            src={"http://luckygame777.com.tw/static_data/image/" + image}
            alt=""
          />
        </Link>
      )
    }
    else{
      return(
        <Link
          to={
            (url === "es" || url === "en-us" ? url : "") +
            "/machine/product-" +
            id +
            "/"
          }
        >
          <img
            // className="lazy"
            src={"http://luckygame777.com.tw/static_data/image/" + image}
            alt=""
          />
        </Link>
      )
    }
  }

  render() {
    // const url = globalHistory.location.pathname.split("/", 2)[1]
    return (
      <Layout>
        <SEO title="machine" keywords={[`machine`, `陸豪`, `娃娃機`]} />
        <Opening
          number="machine"
          left={
            <div className={styles["lefttext"]}>
              <h1>遊戲機</h1>
              <h3>Arcade</h3>
              <p>娃娃機 自動販賣機 禮物機 連線遊戲機</p>
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
        <article className={styles["main"]}>
          {this.state.Type &&
            this.state.Type.map(data => (
              <div key={data.id}>
                <div className={styles["title"]}>
                  <div>{data.type_name}</div>
                  <div>{data.subtitle}</div>
                  {this.state.machinedata &&
                    this.state.machinedata.map(
                      mcdata =>
                        mcdata.type === data.id && (
                          <div className={styles["rwdtable"]} key={mcdata.id}>
                            {this.handleLink(mcdata.id,mcdata.image)}
                            <p>{mcdata.machine_name}</p>
                            <span>{mcdata.subtitle}</span>
                          </div>
                        )
                    )}
                </div>
              </div>
            ))}
        </article>
      </Layout>
    )
  }
}
