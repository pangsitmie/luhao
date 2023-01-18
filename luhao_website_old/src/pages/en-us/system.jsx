import React, { Component } from 'react'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Opening from "../../components/Index/opening"
import styles from "./system.module.scss"
import Icon from "../../images/third/third_1_app.png"
import ManBoard1 from "../../images/third/third_2.png"
import ManBoard2 from "../../images/third/third_3.png"
import ManBoard3 from "../../images/third/third_4.png"
import plus from '../../images/third/third_8.png'
import backM3 from "../../images/mobile/third/third_4.png"


export default class system extends Component {
  render() {
    return (
      <Layout>
        <SEO title="system" keywords={[`system`, `陸豪`, `查帳系統`]} />
        <Opening
          number="system"
          left={
            <div className={styles["lefttext"]}>
              <h1>Cloud auditing system</h1>
              <p>Let you to easily check revenue anytime,anywhere</p>
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
              <h1>Service Area</h1>
            </div>
            <div>
              <div>
                <div>
                  <img src={ManBoard1} alt='主機板'/>
                  <div>
                    <h1>-01-</h1>
                    <p>Luhao II MB</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <img src={ManBoard2} alt='主機板'/>
                  <div>
                    <h1>-02-</h1>
                    <p>Various types of coin exchanger</p>
                  </div>            
                </div>
              </div>
              <div>
                <div>
                  <img src={ManBoard3} alt='主機板'/>
                  <div>
                    <h1>-03-</h1>
                    <p>Various brands of claw machine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='sysleftB'>
              <div>
                <h1>Choose WINPRO cloud products and services to expand your business.</h1>
                <div className='sysmore'>
                  <p>More detail? </p>
                  <a className=''
                    href='https://ipickpro.cloudprogrammingonline.com/index'
                    target='_blank'
                    rel='noopener noreferrer'
                  ><div><p>Download instruction manual</p></div></a>
                </div>
              </div>
            </div>
            <div className='sysrightB'>
              <div>
                <h1>Cloud auditing system</h1>
                <h1>Choose WINPRO cloud products and services to expand your business.</h1>
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
                <h1>FAQ</h1>
                <p>Question&Answer</p>
              </div>
              <div className='programBom'>
                <h6>If there are other questions,please go to 「WINPRO cloud Linebot」 and we will solve the problem for you.</h6>
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
            How to download the 娃娃機查帳系統APP?
          </h1>
          <p>Customers using Android please go to 「Google play」 to search for 娃娃機查帳系統 and download.Customers using IOS please go to 「App Store」 to search for 娃娃機查帳系統 and download.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            Forget password
          </h1>
          <p>Get back the password by using the verification code sent by the SMS with the cellphone number registered at registration.If you have changed your cellphone number,please ask for your password through 「WINPRO cloud Linebot」.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            How to recover 「store account」、「sub-account」?
          </h1>
          <p>This feature is currently not supported,please go to 「WINPRO cloud Linebot」 and we will solve the problem for you.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            Does the motherboard provide wireless service?
          </h1>
          <p>If the merchant does not provide a wired network,it is recommended to purchase a 4G wired router.Currently,no wireless service is available.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            What should I do if I have a wired network but I can't connect?
          </h1>
          <p>Please confirm if the wired network has a dial-up problem.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            The machine has been bound.How to unbind?
          </h1>
          <p>Please go to 「WINPRO cloud Linebot」 and we will solve the problem for you.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            What should I do if the auditing system does not match the actual revenue.
          </h1>
          <p>Pleasse confirm the quality of the connection first.Subsequent 「娃娃機查帳系統」 will provide connectivity quality feature.</p>
        </div>
      </div>
    )
  }
}
