import React, { Component } from 'react'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import styles from "./mailus.module.scss"

export default class mailus extends Component {
        
    handleSubmit() {
        window.location = '/es/mailsend';
    }
    
    handleOnload() {

    }

    render() {
      return (
        <Layout>
            <SEO title="mailus" keywords={[`mailus`, `陸豪`, `聯絡我們`]} />
            <div className="ss-form">
            <iframe name="iframe_luhaoda8" id="iframe_luhaoda8" style={{display:'none'}} onload={this.handleOnload}></iframe>
                <form action="https://docs.google.com/forms/u/1/d/e/1FAIpQLSfzZPV6rKH8Gw8wvY9fSyj1w3Qw5YYMGSiqFMw2vPgsH0F7gQ/formResponse" 
                      method="POST" id="ss-form" target="iframe_luhaoda8" onSubmit={this.handleSubmit}>
                    <ol role="list">
                        <div className = {`${styles.mailus}`}>
                            <div>

                                <div>
                                    <p style = {{color :'rgb(206, 228, 110)'}}>welcome</p>
                                    <h1>Contáctanos</h1>
                                    <p>*Requerido</p>
                                </div>

                                <div role="listitem">
                                    <div dir="auto" >
                                        <div >
                                            <label for="entry_1142646756">
                                                <div >Nombre
                                                    <label for="itemView.getDomIdToLabel()" aria-label="(必填欄位)"></label>
                                                    <span  aria-hidden="true">*</span>
                                                </div>
                                                <div  dir="auto"></div>
                                            </label>

                                            <input type="text" name="entry.1142646756" defaultvalue=""  id="entry_1142646756" dir="auto" aria-label="您的名字  " aria-required="true" required="name" title=""/>
                                            <div id="1217211881_errorMessage"></div>
                                            {/* <div >這是必填問題</div> */}
                                        </div>
                                    </div>
                                </div> 
                                <div role="listitem">
                                    <div dir="auto" >
                                        <div >
                                            <label for="entry_1028105107">
                                                <div >MAIL
                                                    <label for="itemView.getDomIdToLabel()" aria-label="(必填欄位)"></label>
                                                    <span aria-hidden="true">*</span>
                                                </div>
                                                <div dir="auto"></div>
                                            </label>

                                            <input type="text" name="entry.1028105107" defaultvalue="" id="entry_1028105107" dir="auto" aria-label="您的信箱  " aria-required="true" required="email" title=""/>
                                            <div id="1303447732_errorMessage"></div>
                                            {/* <div >這是必填問題</div> */}
                                        </div>
                                    </div>
                                </div> 
                                <div role="listitem">
                                    <div dir="auto" >
                                        <div >
                                            <label for="entry_1251535213">
                                                <div >Tu pregunta
                                                    <label for="itemView.getDomIdToLabel()" aria-label="(必填欄位)"></label>
                                                    <span aria-hidden="true">*</span>
                                                </div>
                                                <div dir="auto"></div>
                                            </label>

                                            <input type="text" name="entry.1251535213" defaultvalue="" id="entry_1251535213" dir="auto" aria-label="您的問題  " aria-required="true" required="text" title=""/>
                                            <div id="1650558708_errorMessage"></div>
                                            {/* <div >這是必填問題</div> */}
                                        </div>
                                    </div>
                                </div> 
                                <div role="listitem">
                                    <div dir="auto" >
                                        <div >
                                            <label  for="entry_35960830">
                                                <div >Descripción detallada</div>
                                                <div dir="auto"></div>
                                            </label>

                                            <textarea name="entry.35960830" rows="10" cols="0" id="entry_35960830" dir="auto" aria-label="詳細描述  "></textarea>
                                            <div id="1987385103_errorMessage"></div>
                                            {/* <div >這是必填問題</div> */}
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" name="draftResponse" value="[null,null,&quot;1080702900784343619&quot;]"/>
                                <input type="hidden" name="pageHistory" value="0"/>
                                <input type="hidden" name="fbzx" value="1080702900784343619"/>

                                <div  dir="ltr">
                                    <label for="emailReceipt" ></label>
                                </div>
                                <center> 
                                    <div >
                                        <table id="navigation-table">
                                            <tbody>
                                                <tr>
                                                    <td id="navigation-buttons" dir="ltr">
                                                        <center>
                                                            <input type="submit" name="submit" value="ENVIAR" id="ss-submit" 
                                                                   style = {{width :'100px', height:'30px',fontSize:'15px'}}/>
                                                            <div >No use los formularios de para enviar su contraseña.</div>
                                                        </center>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </ol>
                </form>
            </div>
        </Layout>
      )
    }
  }
