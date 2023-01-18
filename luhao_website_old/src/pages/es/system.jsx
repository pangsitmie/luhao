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
              <h1>Sistema de auditoria en la nube</h1>
              <p>Le permite verificar fácilmente los ingresos en cualquier momento y en cualquier lugar</p>
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
              <h1>Área de servicio</h1>
            </div>
            <div>
              <div>
                <div>
                  <img src={ManBoard1} alt='主機板'/>
                  <div>
                    <h1>-01-</h1>
                    <p>La placa base luhao de las 2da generación</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <img src={ManBoard2} alt='主機板'/>
                  <div>
                    <h1>-02-</h1>
                    <p>Varios tipos de la máquina de cambio de mondas</p>
                  </div>            
                </div>
              </div>
              <div>
                <div>
                  <img src={ManBoard3} alt='主機板'/>
                  <div>
                    <h1>-03-</h1>
                    <p>Varias marcas de la máquina de garra peluches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='sysleftB'>
              <div>
                <h1>Elija los productos y servicios en la nube de WINPRO para expandir su negocio.</h1>
                <div className='sysmore'>
                  <p>Más detalle? </p>
                  <a className=''
                    href='https://ipickpro.cloudprogrammingonline.com/index'
                    target='_blank'
                    rel='noopener noreferrer'
                  ><div><p>Descargar manual de instrucciones</p></div></a>
                </div>
              </div>
            </div>
            <div className='sysrightB'>
              <div>
                <h1>Sistema de auditoria en la nube</h1>
                <h1>Elija los productos y servicios en la nube de WINPRO para expandir su negocio.</h1>
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
                <h1>Preguntas más frecuentes</h1>
                <p>preguntas y respuestas</p>
              </div>
              <div className='programBom'>
                <h6>Si tiene otras preguntas, vaya a Lin WINPRO cloud Linebot 」y resolveremos el problema por usted.</h6>
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
            ¿Cómo descargar la APP 娃娃機查帳系統?
          </h1>
          <p>Los clientes que utilizan Android, por favor, vaya a  「Google play」 para buscar 娃娃機查帳系統 y descargar.Los clientes que utilizan IOS, por favor, vaya a 「App Store」 para buscar 娃娃機查帳系統 y descargar.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            Forget password
          </h1>
          <p>Recupere la contraseña utilizando el código de verificación enviado por el SMS con el número de teléfono registrado en el registro. Si ha cambiado su número de teléfono celular, solicite su contraseña a través de「WINPRO cloud Linebot」.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            ¿Cómo recuperar 「cuenta de tienda」、「 Sub-cuenta」?
          </h1>
          <p>Esta función actualmente no es compatible, vaya a 「WINPRO cloud Linebot」y resolveremos el problema por usted.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            ¿La placa base proporciona servicio inalámbrico?
          </h1>
          <p>Si el comerciante no proporciona una red cableada, se recomienda comprar un enrutador cableado 4G. Actualmente, no hay servicio inalámbrico disponible.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            ¿Qué debo hacer si tengo una red cableada pero no puedo conectarme?
          </h1>
          <p>Por favor confirme si la red cableada tiene un problema de acceso telefónico.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            La máquina ha sido atada. ¿Cómo desatarse?
          </h1>
          <p>Vaya a 「WINPRO cloud Linebot」 y resolveremos el problema por usted.</p>
        </div>
        <div>
          <h1>
            <img src={plus} alt="plus"/>
            ¿Qué debo hacer si el sistema de auditoría no coincide con los ingresos reales?
          </h1>
          <p>Por favor, confirme la cualidad de la conexión primero. El siguiente 「娃娃機系統」proporcionará la característica de calidad de conectividad.</p>
        </div>
      </div>
    )
  }
}
