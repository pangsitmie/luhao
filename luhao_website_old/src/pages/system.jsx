import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Opening from "../components/Index/opening"
import styles from "./system.module.scss"
import Icon from "../images/third/third_1_app.png"
import ManBoard1 from "../images/third/third_2.png"
import ManBoard2 from "../images/third/third_3.png"
import ManBoard3 from "../images/third/third_4.png"
import plus from '../images/third/third_8.png'
import backM3 from "../images/mobile/third/third_3.png"


export default class system extends Component {
  render() {
    return (
      <Layout>
        <SEO title="system" keywords={[`system`, `陸豪`, `查帳系統`]} />
        <Opening
          number="system"
          left={
            <div className={styles["lefttext"]}>
              <h1>雲端查帳系統</h1>
              <p>讓您隨時隨地輕鬆地查詢營收</p>
            </div>
          }
          right={
            <div className={styles["rightimage"]}>
              <div className={styles["ofFlex"]}>
                <img src={Icon} alt='查帳'/>
                <div>
                  中華民國專利所有<br/>
                  M514620機台查帳系統<br/>
                  M533292機台查帳系統<br/>
                </div>
              </div>
            </div>
          }
        />
        <article className={styles["body"]}>
          <div>
            <div>
              <h1>服務範圍</h1>
            </div>
            <div>
              <div>
                <div>
                  <img src={ManBoard1} alt='主機板'/>
                  <div>
                    <h1>-01-</h1>
                    <p>陸豪二代主機板</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <img src={ManBoard2} alt='主機板'/>
                  <div>
                    <h1>-02-</h1>
                    <p>各型號兌幣機</p>
                  </div>            
                </div>
              </div>
              <div>
                <div>
                  <img src={ManBoard3} alt='主機板'/>
                  <div>
                    <h1>-03-</h1>
                    <p>各廠牌娃娃機</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='sysleftB'>
              <div>
                <h1>選用WINPRO雲端產品和服務以擴展您的業務</h1>
                <div className='sysmore'>
                  <p>想了解更多? </p>
                  <a className=''
                    href='https://ipickpro.cloudprogrammingonline.com/index'
                    target='_blank'
                    rel='noopener noreferrer'
                  ><div><p>下載說明書</p></div></a>
                </div>
              </div>
            </div>
            <div className='sysrightB'>
              <div>
                <h1>查帳APP操作說明</h1>
                <h1>選用WINPRO雲端產品和服務以擴展您的業務</h1>
                <div className='sysbtn'>
                  <a
                    className='btnTop'
                    href='https://www.youtube.com/watch?v=j-dXJu7nH3E'
                    target='_blank'
                    rel='noopener noreferrer'
                  >ios APP</a>
                  <a
                    className='btnBom'
                    href='https://www.youtube.com/watch?v=Qz9D0YBRvvc'
                    target='_blank'
                    rel='noopener noreferrer'
                  >Android APP</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={backM3} alt=''/>
          </div>
          <div></div>
          <div>
            <div className='sysleftC'>
              <div className='programTop'>
                <h1>常見問題</h1>
                <p>Question&Answer</p>
              </div>
              <div className='programBom'>
                <h6>如果還有其他問題，請至「雲程LineBot」詢問，本公司將為您解決問題。</h6>
              </div>
            </div>
            <div className='sysrightC'>
              <Answer/>
            </div>
          </div>
        </article>
      </Layout>
    )
  }
}

class Answer extends Component{
  render(){
    return(
      <div className='answer'>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            如何下載娃娃機查帳系統APP？
          </h1>
          <p>使用安卓系統的顧客請至「Google play」搜尋「娃娃機查帳系統」下載。使用ios系統的顧客請至「App Store」搜尋「娃娃機查帳系統」下載。</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            忘記密碼
          </h1>
          <p>用註冊時註冊的行動號碼，透過簡訊發出的驗證碼找回密碼。如有更換行動電話，請透過「雲程在線Line bot」詢問，找回密碼。</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            如何收回「商店帳號」、「子帳號」?
          </h1>
          <p>目前不支援此功能，請至「雲程Line bot 」詢問，本公司將為您解決問題。</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            主機板是否有提供無線服務
          </h1>
          <p>商家若未提供有線網路，建議自行購買4G有線路由器，目前暫不提供無線服務</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            有接上有線網路卻無法連線時怎麼辦?
          </h1>
          <p>請先確認有線網路是否有撥接問題。</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            機台已被綁定如何解綁?
          </h1>
          <p>請透過「雲程Line bot 」，本公司將為顧客解決此問題。</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            查帳系統與實際營收不相符時怎麼辦?
          </h1>
          <p>請先確認連線品質狀況。後續「娃娃機查帳系統」將會提供連線品質狀況功能。</p>
        </div>
      </div>
    )
  }
}
