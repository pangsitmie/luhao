import React, { Component } from 'react'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import styles from "./joinus.module.scss"

export default class joinus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
    }
  }
  choose = (e) => {
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
              <h1>We Need You</h1>
            </div>
          </div>
          <div>
            <h1>Luhao Technology is recruiting</h1>
            <p>We are a professional manufacturer of electronic game consoles. Founded in 1998, it has been reforming and innovating traditional industries up to now. We are always looking for passionate and requirements partners to join us.</p>
          </div>
          <div>
            <div>
              <h1>What We Need</h1>
              <p>We are looking for partners who are passionate about technology, have requirements for products, and have the following characteristics.</p>
              <ul>
                <li>Can implement efficient, highly scalable, and highly testable programs and designs.</li>
                <li>Ability to complete tasks independently and efficiently.</li>
                <li>Proactively solve problems and look for improvements.</li>
                <li>Building a stable infrastructure for international use.</li>
              </ul>
            </div>
            <div>{/* 右邊 */}</div>
          </div>
          <div>
            <div>
              <div className={`${page === 1 ? `${styles.foucs}` : ''}`} onClick={() => this.choose(1)}><p>Must Have</p></div>
              <div className={`${page === 2 ? `${styles.foucs}` : ''}`} onClick={() => this.choose(2)}><p>Bonus Skills</p></div>
            </div>
            {change(page)}
          </div>
          <div>
            {/* <div>
              <h1>還在等甚麼</h1>
            </div> */}
            <div>
              <h1>Email us for more information</h1>
              <p>
                {/* <span>Facebook粉絲團： </span>陸豪官方粉絲專頁<br/> */}
                <span>E-mail： </span><a href='/en-us/mailus'>luckygame777@gmail.com</a> <br />
                {/* <span>line官方帳號： </span>陸豪線上客服 */}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function change(props) {
  switch (props) {
    case 1:
      return (
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
      return (
        <div>
          <ul>
            <li>Javascript ES6 and above</li>
            <li>Multiplayer real-time online game design experience</li>
            <li>Familiar with other programming languages, such as Golang, Python, iOS, android App development experience</li>
            <li>Familiar with C++</li>
            <li>Have used MongoDB / or PostgreSQL</li>
          </ul>
        </div>
      )
    default:
      break;
  }
}
