import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./joinus.module.scss"

export default class joinus extends Component {
  constructor(props){
    super(props)
    this.state={
      page: 1,
    }
  }
  choose =(e)=> {
    this.setState({
      page: e,
    })
  }
  render() {
    const { page } = this.state
    return (
      <Layout>
        <SEO title="joinus" keywords={[`joinus`, `陸豪`, `吸粉服務`]} />
        <div className={`${styles.joinus}`}>
          <div>
            <div>
              <h1>徵的是你</h1>
            </div>
          </div>
          <div>
            <h1>陸豪科技招募中</h1>
            <p>本公司是一家專業製造電子遊戲機公司。創立於1998年，自傳統產業一路改革創新至今。我們一直在尋找具有熱情並對自身有要求的夥伴，加入成為我們的一份子。</p>
          </div>
          <div>
            <div>
              <h1>We Need You</h1>
              <p>公司正在尋找對技術有熱情、對產品有要求並具有以下特質的夥伴加入</p>
              <ul>
                <li>能實作出高效，高擴展性和高可測試性的程式和設計</li>
                <li>具有獨立並有效率地完成任務的能力</li>
                <li>主動積極地解決問題並尋找可改善的地方</li>
                <li>構建穩定的基礎結構符合跨國使用</li>
              </ul>
            </div>
            <div>{/* 右邊 */}</div>
          </div>
          <div>
            <div>
              <div className={`${page === 1 ?`${styles.foucs}`:''}`} onClick={()=>this.choose(1)}><p>Must Have</p></div>
              <div className={`${page === 2 ?`${styles.foucs}`:''}`} onClick={()=>this.choose(2)}><p>Bonus Skills</p></div>
            </div>
            {change(page)}
          </div>
          <div>
            {/* <div>
              <h1>還在等甚麼</h1>
            </div> */}
            <div>
              <h1>歡迎來信，讓我們為您做更詳細的介紹</h1>
              <p>
                {/* <span>Facebook粉絲團： </span>陸豪官方粉絲專頁<br/> */}
                <span>客服信箱： </span><a href = "/mailus">luckygame777@gmail.com</a> <br/>
                {/* <span>line官方帳號： </span>陸豪線上客服 */}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function change(props){
  switch (props) {
    case 1:
      return(
        <div>
          <ul>
            <li>1. python / or PHP / or Javascript</li>
            <li>2. Django / or Ruby on rails / or Express</li>
            <li>3. Mqtt / or socket / Redis</li>
            <li>4. Restful APIs</li>
            <li>5. Android / or Objective-c / or Swift</li>
            <li>6. AWS / or Google Cloud platform / or Azure</li>
            <li>7. MySQL / or MariaDB</li>
          </ul>
        </div>
      )
    case 2:
      return(
        <div>
          <ul>
            <li>Javascript ES6 以上</li>
            <li>多人即時連線遊戲設計經驗</li>
            <li>熟悉其他程式語言，例如Golang, Python,iOS, android App開發經驗</li>
            <li>熟悉C++</li>
            <li>使用過 MongoDB / or PostgreSQL</li>
          </ul>
        </div>
      )
    default:
      break;
  }
}
