import React, {Component} from 'react'
import axios from 'axios'
import {Launcher} from 'react-chat-window'
import messageHistory from './messageHistory';

let url = "https://cloudprogrammingonline.com/error_reply/winproBackstage/luhao"

class msg extends Component {

  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false
    };
    this.lastId = messageHistory[messageHistory.length - 1].id
  }

  async handleMsg(sendmsg) {
    return await axios({
      method: 'POST',
      url:url,
      headers: {
          'Content-Type': 'application/json'
      },
      data:sendmsg
    })
    .then(response => {
      console.log(response);
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
  }

  async _onMessageWasSent(message) {
    const msg1 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"請輸入您的的問題" } }
    const msg3 ={ id: this.lastId + 2, author: "them", type: 'file', data: { fileName:"兌幣機調整圖 ",url:"http://www.luckygame777.com.tw/test_official_web_server/files/manual/%E5%85%8C%E5%B9%A3%E6%A9%9F%E4%B8%89%E4%BB%A3-%E8%AA%BF%E6%95%B4%E5%9C%96.pdf" } }
    const msg4 ={ id: this.lastId + 2, author: "them", type: 'file', data: { fileName:"機台說明書下載 ",url:"https://drive.google.com/drive/u/1/folders/1UOXGcVsbZSoteYfJyWPff9O9Z2qZU_cN" } }
    const msg5 ={ id: this.lastId + 2, author: "them", type: 'file', data: { fileName:"馬卡龍四合一故障排除 ",url:"https://i.imgur.com/NOIRG7o.jpg" } }
    const msg6 ={ id: this.lastId + 2, author: "them", type: 'file', data: { fileName:"1對1人工客服(LINE) ",url:"https://line.me/R/ti/p/%40brs3220y" } }
    const msg7 ={ id: this.lastId + 2, author: "them", type: 'file', data: { fileName:"零件採購/業務諮詢(LINE) ",url:"https://line.me/R/ti/p/%40528chuoz" } }
    const msg8 ={ id: this.lastId + 2, author: "them", type: 'file', data: { fileName:"遷移公告 ",url:"https://i.imgur.com/nVIPfHY.jpg" } }
    const msg9 ={ id: this.lastId + 2, author: "them", type: 'file', data: { fileName:"法規/公文下載 ",url:"https://drive.google.com/drive/u/1/folders/1lLJmiIEImIQGJp2NBO0oKpCa5oyx885i" } }
    const errmsg0 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nD01、天車上微動異常\nD02、上下馬達異常\nD03、天車爪子不會上\nD04、當機" } }
    const errmsg1 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nD11、天車下微動異常\nD12、上下馬達異常\nD13、天車爪子不會下"} }
    const errmsg2 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nD21、天車前微動異常\nD22、前後馬達異常\nD23、天車爪子不會往前"} }
    const errmsg3 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nD31、天車後微動異常\nD32、前後馬達異常\nD33、天車爪子不會往後"} }
    const errmsg4 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nD41、天車左微動異常\nD42、左右馬達異常\nD43、天車爪子不會往左"} }
    const errmsg5 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nD51、天車右微動異常\nD52、左右馬達異常\nD53、天車爪子不會往右"} }
    const errmsg6 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nD61、爪子不合爪伏特錶無電壓\nD62、爪子不合爪伏特錶有電壓\nD63、爪子合爪不放"} }
    const errmsg8 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nE01、投幣器1訊號線異常"} }
    const errmsg9 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nE02、投幣器2訊號線異常"} }
    const errmsg10 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nE11、連接線有無接好1\nE12、投幣器1損壞\nE13、未偵測到投幣器訊號"} }
    const errmsg11 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nE21、連接線有無接好2\nE22、投幣器2損壞\nE23、未偵測到投幣器訊號"} }
    const errmsg12 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"輸入您所遇到的狀況\nE31、光眼旋鈕\nE32、檢查連接線\nE33、光眼損壞"} }
    const solve000 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n出現ER10 遊戲均正常 但遊戲時間過長 或重量過載 偶發停機當ER10\n\n原因：\n因更換大爪過重 或夾物商品過重 導致保護裝置開啟\n\n解決辦法：主機板需回廠修正配置"} }
    const solve00 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查上微動\n\n原因：\n天車歸位時未碰到上微動\n\n解決辦法：更換上微動"} }
    const solve01 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查下微動\n\n原因：\n天車歸位時未碰到下微動\n\n解決辦法：更換下微動"} }
    const solve02 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查前微動\n\n原因：\n天車歸位時未碰到前微動\n\n解決辦法：更換前微動"} }
    const solve03 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查後微動\n\n原因：\n天車歸位時未碰到後微動\n\n解決辦法：更換後微動"} }
    const solve04 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查左微動\n\n原因：\n天車歸位時未碰到左微動\n\n解決辦法：更換左微動"} }
    const solve05 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查右微動\n\n原因：\n天車歸位時未碰到右微動\n\n解決辦法：更換右微動"} }
    const solve10 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n天車前後左右運作正常只有上下不運作\n\n原因：\n檢查上下馬達\n\n解決辦法：進入IO測試6-4天車是否上下正常運作 如不正常請更換上下馬達"} }
    const solve11 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n天車上下左右運作正常 只有前後不運作\n\n原因：\n檢查前後馬達\n\n解決辦法：進入IO測試6-3天車是否前後正常運作 如不正常請更換前後馬達"} }
    const solve12 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n天車上下前後運作正常 只有左右不運作\n\n原因：\n檢查左右馬達\n\n解決辦法：進入IO測試6-3天車是否左右正常運作 如不正常請更換左右馬達"} }
    const solve20 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\nIO測試正常 馬達單向運轉\n\n解決辦法：檢查主板D18 LED是否正常亮或者閃一下主板更換上繼電器"} }
    const solve21 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\nIO測試正常 馬達單向運轉\n\n解決辦法：檢查主板D17 LED是否正常亮或者閃一下主板更換下繼電器(上繼電器優先更換)"} }
    const solve22 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\nIO測試正常 馬達單向運轉\n\n解決辦法：檢查主板D15 LED是否正常亮或者閃一下主板更換前繼電器"} }
    const solve23 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\nIO測試正常 馬達單向運轉\n\n解決辦法：檢查主板D16 LED是否正常亮或者閃一下主板更換後繼電器(前繼電器優先更換)"} }
    const solve24 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\nIO測試正常 馬達單向運轉\n\n解決辦法：檢查主板D20 LED是否正常亮或者閃一下主板更換左繼電器"} }
    const solve25 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\nIO測試正常 馬達單向運轉\n\n解決辦法：檢查主板D19 LED是否正常亮或者閃一下主板更換右繼電器(左繼電器優先更換)"} }
    const solve31 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"原因：\n保線絲燒掉導致不合爪\n\n解決辦法：更換5A保險絲\n\n原因：\n繼電器燒掉\n\n解決辦法：主機板需回廠修正配置\n\n原因：\n天車接頭接觸不良\n\n解決辦法：機台及天車的配線接頭 檢查有無內縮或鏽蝕\n\n原因：\n天車配線斷路\n\n解決辦法：更換新品主機板是否同樣問題\n\n"} }
    const solve32 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"原因：\n爪子線圈燒毀導致不合爪\n\n解決辦法：更換線圈\n\n"} }
    const solve33 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"原因：\n繼電器，電晶體燒毀\n\n解決辦法：更換/維修主板\n\n"} }
    const solve41 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n投幣器1異常\n\n原因：\n投幣速度過快導致投幣器1異常\n\n解決辦法：偵測到異常投幣現象"} }
    const solve42 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n投幣器2異常\n\n原因：\n投幣速度過快導致投幣器2異常\n\n解決辦法：偵測到異常投幣現象"} }
    const solve43 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查投幣器1連接線有無接好\n\n原因：\n投幣時投幣器1未偵測到投幣訊號\n\n解決辦法：投幣器1連接線接好重新開機即可"} }
    const solve44 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查投幣器2連接線有無接好\n\n原因：\n投幣時投幣器2未偵測到投幣訊號\n\n解決辦法：投幣器2連接線接好重新開機即可"} }
    const solve45 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n投幣器1損壞\n\n解決辦法：更換投幣器1或檢查線路"} }
    const solve46 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n投幣器2損壞\n\n解決辦法：更換投幣器2或檢查線路"} }
    const solve47 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n未偵測到投幣器訊號\n\n解決辦法：更換投幣器無效 請開啟系統設定 IO測試6-6項"} }
    const solve50 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n轉動光眼旋鈕是否由滅轉亮或亮轉滅\n\n原因：\n開機後光眼未偵測到訊號\n\n解決辦法：訊號線接好並將光眼旋鈕轉至適當位置再重新開機即可"} }
    const solve51 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n檢查連接線\n\n解決辦法：更換連接線"} }
    const solve52 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:"描述：\n光眼損壞\n\n解決辦法：更換光眼"} }
    
    const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
    var msglist = {"message":{"type":"text","content":message.data.text}}
    var msgtext = message.data.text
    let msg = await this.handleMsg(msglist)
    if(msgtext==="客服列表"||msgtext==="0"){
      console.log(msg)
      let msg1 = msg[1].message.template.actions[1].label
      let msg2 = msg[1].message.template.actions[2].label
      let msg3 = msg[1].message.template.actions[3].label
      let msg4 = msg[2].message.template.actions[0].label
      let msg5 = msg[2].message.template.actions[1].label
      let msg6 = msg[2].message.template.actions[2].label
      let msg7 = msg[3].message.template.actions[0].label
      const  AR1 ={ id: this.lastId + 2, author: "them", type: 'text', data: { text: "歡迎使用 \n請輸入您遇到的問題: \nA1、" + msg1 + "\nA2、" + msg2 + "\nA3、" + msg3} }
      const  AR2 ={ id: this.lastId + 3, author: "them", type: 'text', data: { text: "人工客服 \n請輸入您遇到的問題: \nB1、" + msg4 + "\nB2、" + msg5 + "\nB3、" + msg6} }
      const  AR3 ={ id: this.lastId + 4, author: "them", type: 'text', data: { text: "下載 \n請輸入您遇到的問題: \nC1、" + msg7} }
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},AR1,AR2,AR3]
      })
      this.lastId += 4
    }
    else if(msgtext==="雲端版娃娃機Ai故障排除"||msgtext==="a1"||msgtext==="A1"){
      const msg2 ={
        id: this.lastId + 2,
        author: 'them', 
        type: 'text', 
        data: { 
          text:"Er10:檢查上微動上下馬達\nEr11:檢查下微動上下馬達\nEr12:檢查前微動前後馬達\nEr13:檢查後微動前後馬達\nEr14:檢查左微動左右馬達\nEr15:檢查右微動左右馬達\nEr16:爪子供電異常\nEr30:投幣器1訊號線異常\nEr31:投幣器2訊號線異常\nEr32:投幣器 1 故障\nEr33:投幣器 2 故障\nEr40:光眼連接線故障或異常\n\n輸入故障碼\n例如10即可顯示維修對策\n\n查看馬卡龍四合一故障說明請輸入2"
        } 
      }
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg2]
      })
      this.lastId += 2
    }
    else if(msgtext==="00"){
      const msg0 ={ id: this.lastId + 2, author: 'them', type: 'text', data: { text:msg[1].message+"\n"+msg[2].message } }
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg0]
      })
      this.lastId += 2
    }
    else if(msgtext==="10"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg0]
      })
      this.lastId += 2
    }
    else if(msgtext==="11"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg1]
      })
      this.lastId += 2
    }
    else if(msgtext==="12"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg2]
      })
      this.lastId += 2
    }
    else if(msgtext==="13"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg3]
      })
      this.lastId += 2
    }
    else if(msgtext==="14"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg4]
      })
      this.lastId += 2
    }
    else if(msgtext==="15"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg5]
      })
      this.lastId += 2
    }
    else if(msgtext==="16"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg6]
      })
      this.lastId += 2
    }
    else if(msgtext==="30"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg8]
      })
      this.lastId += 2
    }
    else if(msgtext==="31"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg9]
      })
      this.lastId += 2
    }
    else if(msgtext==="32"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg10]
      })
      this.lastId += 2
    }
    else if(msgtext==="33"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg11]
      })
      this.lastId += 2
    }
    else if(msgtext==="40"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},errmsg12]
      })
      this.lastId += 2
    }
    else if(msgtext==="當機"||msgtext==="D04"||msgtext==="d04"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve000]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車上微動異常"||msgtext==="D01"||msgtext==="d01"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve00]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車下微動異常"||msgtext==="D11"||msgtext==="d11"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve01]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車前微動異常"||msgtext==="D21"||msgtext==="d21"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve02]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車後微動異常"||msgtext==="D31"||msgtext==="d31"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve03]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車左微動異常"||msgtext==="D41"||msgtext==="d41"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve04]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車右微動異常"||msgtext==="D51"||msgtext==="d51"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve05]
      })
      this.lastId += 2
    }
    else if(msgtext==="上下馬達異常"||msgtext==="D12"||msgtext==="D02"||msgtext==="d12"||msgtext==="d02"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve10]
      })
      this.lastId += 2
    }
    else if(msgtext==="前後馬達異常"||msgtext==="D32"||msgtext==="D22"||msgtext==="d32"||msgtext==="d22"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve11]
      })
      this.lastId += 2
    }
    else if(msgtext==="左右馬達異常"||msgtext==="D52"||msgtext==="D42"||msgtext==="d52"||msgtext==="d42"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve12]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車爪子不會上"||msgtext==="D03"||msgtext==="d03"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve20]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車爪子不會下"||msgtext==="D13"||msgtext==="d13"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve21]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車爪子不會往前"||msgtext==="D23"||msgtext==="d23"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve22]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車爪子不會往後"||msgtext==="D33"||msgtext==="d33"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve23]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車爪子不會往左"||msgtext==="D43"||msgtext==="d43"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve24]
      })
      this.lastId += 2
    }
    else if(msgtext==="天車爪子不會往右"||msgtext==="D53"||msgtext==="d53"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve25]
      })
      this.lastId += 2
    }
    else if(msgtext==="爪子不合爪伏特錶無電壓"||msgtext==="D61"||msgtext==="d61"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve31]
      })
      this.lastId += 2
    }
    else if(msgtext==="爪子不合爪伏特錶有電壓"||msgtext==="D62"||msgtext==="d62"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve32]
      })
      this.lastId += 2
    }
    else if(msgtext==="爪子合爪不放"||msgtext==="D63"||msgtext==="d63"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve33]
      })
      this.lastId += 2
    }
    else if(msgtext==="投幣器1訊號線異常"||msgtext==="E01"||msgtext==="e01"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve41]
      })
      this.lastId += 2
    }
    else if(msgtext==="投幣器2訊號線異常"||msgtext==="E02"||msgtext==="e02"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve42]
      })
      this.lastId += 2
    }
    else if(msgtext==="連接線有無接好1"||msgtext==="E11"||msgtext==="e11"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve43]
      })
      this.lastId += 2
    }
    else if(msgtext==="連接線有無接好2"||msgtext==="E21"||msgtext==="e21"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve44]
      })
      this.lastId += 2
    }
    else if(msgtext==="投幣器1損壞"||msgtext==="E12"||msgtext==="e12"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve45]
      })
      this.lastId += 2
    }
    else if(msgtext==="投幣器2損壞"||msgtext==="E22"||msgtext==="e22"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve46]
      })
      this.lastId += 2
    }
    else if(msgtext==="未偵測到投幣器訊號"||msgtext==="E23"||msgtext==="e23"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve47]
      })
      this.lastId += 2
    }
    else if(msgtext==="光眼旋鈕"||msgtext==="E31"||msgtext==="e31"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve50]
      })
      this.lastId += 2
    }
    else if(msgtext==="檢查連接線"||msgtext==="E32"||msgtext==="e32"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve51]
      })
      this.lastId += 2
    }
    else if(msgtext==="光眼損壞"||msgtext==="E33"||msgtext==="e33"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},solve52]
      })
      this.lastId += 2
    }
    else if(msgtext==="兌幣機故障排除"||msgtext==="a2"||msgtext==="A2"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg3]
      })
      this.lastId += 2
    }
    else if(msgtext==="機台說明書下載"||msgtext==="a3"||msgtext==="A3"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg4]
      })
      this.lastId += 2
    }
    else if(msgtext==="2"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg5]
      })
      this.lastId += 2
    }
    else if(msgtext==="1對1人工客服"||msgtext==="b1"||msgtext==="B1"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg6]
      })
      this.lastId += 2
    }
    else if(msgtext==="零件採購/業務諮詢"||msgtext==="b2"||msgtext==="B2"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg7]
      })
      this.lastId += 2
    }
    else if(msgtext==="最新消息"||msgtext==="b3"||msgtext==="B3"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg8]
      })
      this.lastId += 2
    }
    else if(msgtext==="法規/公文下載"||msgtext==="c1"||msgtext==="C1"){
      this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg9]
      })
      this.lastId += 2
    }
    else{
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {id: this.lastId + 1, ...message},msg1]
      })
      this.lastId += 2
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }

  onKeyPress = (userInput) => {
    console.log(userInput)
  }

  onDelete = (msg) => {
    this.setState({messageList: this.state.messageList.filter(({id}) => id!==msg.id)})
  }

  render() {
    return <div>
      <Launcher
        agentProfile={{
          teamName: 'Luhao 線上客服',
          imageUrl: 'https://i.imgur.com/tvUdXF4.jpg'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        onKeyPress={this.onKeyPress}
        // onDelete={this.onDelete}
        showEmoji
        showFile
      />
    </div>
  }
}
export default msg;