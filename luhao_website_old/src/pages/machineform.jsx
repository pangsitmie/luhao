import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./machineform.module.scss"

var data = [],list = [],check=0;
var matorud = [],matorlr = [],matorba = [],line = [],gear = [],claw = [],part1 = [],power = [],socket = [],part2 = [],freight = [],install =[]
var matorpc = [],linepc = [],gearpc = [],clawpc = [],part1pc = [],powerpc = [],socketpc = [],part2pc = [],freightpc = [],installpc =[]
var msg = ["請選擇天車"," 你沒有選則馬達"," 你沒有選則馬達"," 你沒有選則馬達"," 你沒有選則捲線器"," 你沒有選擇齒輪"," 你沒有選擇爪子",""," 你沒有選擇電源供應器"," 你沒有選擇排插" ,"","選擇運送地方","選擇安裝地方"];
var iptmsg = ["請輸入標題","請輸入數量","","","請輸入聯絡人","請輸入聯絡電話","請輸入送貨地址","請輸入名字","請輸入電話","請輸入地址"]
var cranevalues = ["標準天車","客制化天車"]
var matorvalues = ["2800轉 馬達","3000轉 馬達","3500轉 馬達","上停上拉馬達"];
var linevalues = ["標準捲線輪","加大捲線輪"];
var gearvalues = ["塑鋼齒輪","銅製齒輪"];
var clawvalues = ["標準線圈3.5CM S號爪","標準線圈3.5CM M號爪","標準線圈3.5CM L號爪","加大線圈5CM L號爪","標準線圈5CM XL號爪","JS爪"];
var partsvalues1 =["L型檔版","背光鏡子","高亮度LED燈*1","100*100粉紅絨布","4CM 保麗龍","8CM 保麗龍","升高器"];
var powervalues = ["25W標準電源供應器","35W加大電源供應器","雙電源供應器"];
var socketvalues = ["防電型排插座","標準排插座"];
var partsvalues2 = ["加大自復型保險絲","查帳連網套件"];
var freightvalues = ["台中市運送","台北市運送","高雄市運送","東部運送","離島運送","其他縣市運送","自取"];
var installvalues = ["台中市安裝","台北市安裝","高雄市安裝","東部安裝","離島安裝","其他縣市安裝","免安裝"];
var contentvalue = [cranevalues,matorvalues,matorvalues,matorvalues,linevalues,gearvalues,clawvalues,partsvalues1,powervalues,socketvalues,partsvalues2,freightvalues,installvalues]
var conele = ["crane","matorud","matorlr","matorba","line","gear","claw","part1","power","socket","part2","freight","install"]
var coninput = ["title","quantity","other1","other2","contact","cellphone","address"]

export default class machineform extends Component {
    constructor() {
        super();
        this.state = {
            stdform: [],
            values: [],
            forms: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
    }

    handleName(){
        if(list!==undefined){
            list.name = document.getElementById("name").value
        }
    }
    handlePhone(){
        if(list!==undefined){
            list.phone = document.getElementById("phone").value
        }
    }
    handleAddress(){
        if(list!==undefined){
            list.name = document.getElementById("address").value
        }
    }
    //檢查並新增第一章表單
    ShowForm(){
        if(document.getElementById("name").value===""){
            alert(iptmsg[7]);
            return false;
        }
        else if(document.getElementById("phone").value===""){
            alert(iptmsg[8]);
            return false;
        }
        else if(document.getElementById("address").value===""){
            alert(iptmsg[9]);
            return false;
        }
        else{
            this.setState(prevState => ({ forms: [...prevState.forms, '']}))
            setTimeout(
                function(){
                    this.DefaultValue(0)
                }.bind(this),
                0
            )
            window.location.href = "#customizeform0"
            document.getElementById("CFbtn").style.display = "none"
        }
    }
    //新增第2張以後的表單
    addForm(idx){
        this.setState(prevState => ({ forms: [...prevState.forms, '']}))
        setTimeout(
            function(){
                this.DefaultValue(idx+1)
            }.bind(this),
            0
        )
    }

    Standard(idx){
        this.DefaultValue(idx)
        this.normal(idx)
        document.getElementById("crane"+idx+"0").checked = true
        document.getElementById("cust"+idx).style.display = "none"
        document.getElementById("st"+idx).style.display = "block"
        document.getElementById("ct"+idx).style.display = "none"
    }
    Customized(idx){
        this.DefaultValue(idx)
        this.player(idx)
        document.getElementById("crane"+idx+"1").checked = true
        document.getElementById("cust"+idx).style.display = "block"
        document.getElementById("st"+idx).style.display = "none"
        document.getElementById("ct"+idx).style.display = "block"
    }
    //默認設置
    DefaultValue(idx){
        document.getElementById("title"+idx).value = "表單"+(idx+1) 
        document.getElementById("crane"+idx+"1").checked = true
        document.getElementById("matorud"+idx+"0").checked = true
        document.getElementById("matorlr"+idx+"0").checked = true
        document.getElementById("matorba"+idx+"0").checked = true
        document.getElementById("gear"+idx+"0").checked = true
        document.getElementById("line"+idx+"0").checked = true
        document.getElementById("claw"+idx+"0").checked = true
        document.getElementById("part1"+idx+"0").checked = false
        document.getElementById("part1"+idx+"1").checked = false
        document.getElementById("part1"+idx+"2").checked = true
        document.getElementById("part1"+idx+"3").checked = true
        document.getElementById("part1"+idx+"4").checked = true
        document.getElementById("part1"+idx+"5").checked = true
        document.getElementById("part1"+idx+"6").checked = true
        document.getElementById("part1"+idx+"count2").value = "1"
        document.getElementById("part1"+idx+"count3").value = "1"
        document.getElementById("part1"+idx+"count4").value = "3"
        document.getElementById("part1"+idx+"count5").value = "3"
        document.getElementById("part1"+idx+"count6").value = "1"
        document.getElementById("power"+idx+"0").checked = true
        document.getElementById("socket"+idx+"0").checked = true
        document.getElementById("part2"+idx+"0").checked = true
        document.getElementById("part2"+idx+"1").checked = false
        document.getElementById("freight"+idx+"6").checked = true
        document.getElementById("install"+idx+"6").checked = true
        this.PriceSum(idx)
    }
    //鎖天車部的input
    normal(idx) {     
        var i,j;
        var craneclass = []
        for(i = 1 ; i < 7 ; i++){
            document.getElementById(conele[i]+idx+"0").checked=true
        }
        for(i = 1 ; i < 7 ; i++){
            craneclass[i] = document.getElementsByName(conele[i]+idx)
            for(j = 0 ; j < craneclass[i].length ; j++){
                craneclass[i][j].disabled = true;
            }
        }
        this.PriceSum(idx) 
        this.handleRadio(idx) 
    }
    //打開天車部的input
    player(idx) {   
        var i,j;
        var craneclass = []
        for(i = 1 ; i < 7 ; i++){
            craneclass[i] = document.getElementsByName(conele[i]+idx)
            for(j = 0 ; j < craneclass[i].length ; j++){
                craneclass[i][j].disabled = false;
            }
        }
    }
    //顯示價錢後面的"X數量" 
    handleRadio(idx){
        this.PriceSum(idx)
        var i , j , quantity , value ,c = [1,1,1,1,3,3,1]
        for(i = 1 ; i < contentvalue.length ; i++){
            for(j = 0 ; j < contentvalue[i].length ; j++){
                var getvalue = document.getElementById(conele[i]+idx+j)
                if(getvalue.checked===true&&getvalue.name==="part1"+idx&&document.getElementById(conele[i]+idx+"count"+j)!==null){
                    quantity = document.getElementById("quantity"+idx).value
                    var count = document.getElementById(conele[i]+idx+"count"+j).value
                    value = document.getElementById(conele[i]+idx+"pricediv"+j)
                    value.innerText = "X"+quantity*(count-c[j])
                    value.setAttribute("style","color:red")
                }
                else if(getvalue.checked===true&&getvalue.name!=="freight"+idx){
                    quantity = document.getElementById("quantity"+idx).value
                    value = document.getElementById(conele[i]+idx+"pricediv"+j)
                    value.innerText = "X"+quantity
                    value.setAttribute("style","color:red")
                }
                if(getvalue.checked===false){
                    document.getElementById(conele[i]+idx+"pricediv"+j).innerText = ""
                }
            }
        }
    }

    FormValues(){
        //修改價格
        var mapc = ["0","10","20","30"],
        lipc = ["0","10"],gepc = ["0","10"],
        clpc = ["0","10","20","30","30","30"],
        p1pc = ["10","10","10","10","10","10","10"],
        popc = ["0","10","10"],sopc = ["0","10"],p2pc = ["0","10"],
        frpc = ["10","10","10","10","10","10","0"],
        inpc = ["10","10","10","10","10","10","0"]
        return this.state.forms.map((el, idx) => (
            <div className={`${styles.formWidth}`} style = {{display:"block"}} id = {"customizeform"+idx} key = {idx} >
                <div className={`${styles.formBG}`} >
                    <input type='button' value='標準機台' onClick = {this.Standard.bind(this,idx)} className={`${styles.button}`}/>
                    <input type='button' value='客製機台' onClick = {this.Customized.bind(this,idx)} className={`${styles.button}`}/>
                    <h1 style = {{textAlign : "center"}} className = {`${styles.page}`}>{idx+1}</h1>
                    <h1 id = {"st"+idx} style = {{display:"none"}} className = {`${styles.title}`}>標準機台</h1>
                    <h1 id = {"ct"+idx} className = {`${styles.title}`}>客製機台</h1>
                    <br/><Button type="text" id = {`title`+idx} placeholder="輸入您的標題" style = {{display:"none"}}/>
                    <Button class = {`${styles.quantity}`} type="number" min="1" max="1000" id = {`quantity`+idx} placeholder="數量" onChange = {this.handleRadio.bind(this,idx)}/>
                    <div id = {"cust"+idx}>
                        <h3>天車部</h3>
                        <h4>
                            <InputElement type = "radio" name = {"crane"+idx} id = {"crane"+idx+"0"} value = {cranevalues[0]}  classdiv = {`${styles.crane}`} iddiv = {"cranediv"} onClick = {this.normal.bind(this,idx)}/>
                            <InputElement type = "radio" name = {"crane"+idx} id = {"crane"+idx+"1"} value = {cranevalues[1]}  classdiv = {`${styles.crane}`} iddiv = {"cranediv"} onClick = {this.player.bind(this,idx)}/>
                        </h4>
                        <p>上下馬達</p>
                        <RadioInput type = "radio" name = {"matorud"+idx} id = {"matorud"+idx} le = {matorvalues.length} price = {mapc} value = {matorvalues} class = {`${styles.matorremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {matorud} pcele = {matorpc} down = "補差價："/><br/>
                        <p>左右馬達</p>
                        <RadioInput type = "radio" name = {"matorlr"+idx} id = {"matorlr"+idx} le = {matorvalues.length} price = {mapc} value = {matorvalues} class = {`${styles.matorremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {matorlr} pcele = {matorpc} down = "補差價："/><br/>
                        <p>前後馬達</p>
                        <RadioInput type = "radio" name = {"matorba"+idx} id = {"matorba"+idx} le = {matorvalues.length} price = {mapc} value = {matorvalues} class = {`${styles.matorremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {matorba} pcele = {matorpc} down = "補差價："/><br/><hr/><br/>
                        <RadioInput type = "radio" name = {"line"+idx} id = {"line"+idx} le = {linevalues.length} price = {lipc} value = {linevalues} class = {`${styles.lineremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {line} pcele = {linepc} down = "補差價："/><br/><hr/><br/>
                        <RadioInput type = "radio" name = {"gear"+idx} id = {"gear"+idx} le = {gearvalues.length} price = {gepc} value = {gearvalues} class = {`${styles.gearremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {gear} pcele = {gearpc} down = "補差價："/><br/><hr/><br/>
                        <RadioInput type = "radio" name = {"claw"+idx} id = {"claw"+idx} le = {clawvalues.length} price = {clpc} value = {clawvalues} class = {`${styles.clawremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {claw} pcele = {clawpc} down = "補差價："/><br/>
                        <Inputtext id = {"other1"+idx} class={`${styles.inputcs}`} value = "其他"/>
                        <h3>配件部</h3>
                        <RadioInput type = "checkbox" name = {"part1"+idx} id = {"part1"+idx} le = {partsvalues1.length} price = {p1pc} value = {partsvalues1} class = {`${styles.part1remark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {part1} pcele = {part1pc} count = {"1"} down = "補差價："/><br/><hr/><br/>
                        <RadioInput type = "radio" name = {"power"+idx} id = {"power"+idx} le = {powervalues.length} price = {popc} value = {powervalues} class = {`${styles.powerremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {power} pcele = {powerpc} down = "補差價："/><br/><hr/><br/>
                        <RadioInput type = "radio" name = {"socket"+idx} id = {"socket"+idx} le = {socketvalues.length} price = {sopc} value = {socketvalues} class = {`${styles.socketremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {socket} pcele = {socketpc} down = "補差價："/><br/><hr/><br/>
                        <RadioInput type = "checkbox" name = {"part2"+idx} id = {"part2"+idx} le = {partsvalues2.length} price = {p2pc} value = {partsvalues2} class = {`${styles.part2remark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {part2} pcele = {part2pc} down = "補差價："/><br/>
                        <Inputtext id = {"other2"+idx} class={`${styles.inputcs}`} value = "其他"/>
                    </div>
                    <h3>運送</h3>
                    <RadioInput type = "radio" name = {"freight"+idx} id = {"freight"+idx} le = {freightvalues.length} price = {frpc} value = {freightvalues} class = {`${styles.freightremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {freight} pcele = {freightpc} down = "運費："/><br/><hr/><br/>
                    <h3>安裝</h3>
                    <RadioInput type = "radio" name = {"install"+idx} id = {"install"+idx} le = {installvalues.length} price = {inpc} value = {installvalues} class = {`${styles.installremark}`} classdiv = {`${styles.radioset}`} onClick = {this.PriceSum.bind(this,idx)} onChange = {this.handleRadio.bind(this,idx)} aaa = {idx} ele = {install} pcele = {installpc} down = "安裝費："/><br/>
                    <Contact 
                        type = "text" 
                        name = "contact" 
                        id = {"contact"+idx} 
                        placeholder="聯絡人 "
                        topname = "聯絡人 ："
                        onClick = {this.SameValue.bind(this,idx)}
                        stopstyle = {{width : "20%", display:"inline-block"}} 
                    />
                    <Contact 
                        type = "text" 
                        name = "cellphone" 
                        id = {"cellphone"+idx} 
                        placeholder="聯絡電話" 
                        topname = "聯絡電話 ："
                        onClick = {this.SameValue.bind(this,idx)}
                        stopstyle = {{width : "20%", display:"inline-block"}} 
                    />
                    <Contact 
                        type = "text" 
                        name = "address" 
                        id = {"address"+idx} 
                        placeholder="送貨地址" 
                        topname = "送貨地址 ："
                        onClick = {this.SameValue.bind(this,idx)}
                        style = {{width:"60%"}} 
                        stopstyle = {{width : "20%", display:"inline-block"}} 
                    />
                    <br/>補差價總額：
                    <input id = {"lumpsum"+idx} className = {`${styles.sum}`} disabled/>元
                    <br/>
                    <Button class={`${styles.formButton}`} type = "button" id = {`checkbtn`+idx} value="確定" onClick={this.CheckForm.bind(this,idx)}/>
                    <Button class={`${styles.formButton}`} type = "button" id = {`cancelbtn`+idx} value="取消" onClick={this.FormCancel.bind(this,idx)}/> 
                    <Button class={`${styles.formButton}`} type = "button" id = {`fixbtn`+idx} value="修改" onClick={this.FixForm.bind(this,idx)}/><br/>
                    <p style = {{color:"red",fontSize:"0.8rem"}}>*按下確定後才會儲存表單哦！</p>
                    <h1 style = {{textAlign : "center"}} className = {`${styles.page}`}>{idx+1}</h1><br/>
                </div>
                <input className={`${styles.formButton}`} type = "button" id = {`previousbtn`+idx} value="上一頁" onClick={this.Previous.bind(this,idx)}/>
                <input className={`${styles.formButton}`} type = "button" id = {`nextbtn`+idx} value = "新增/下一頁" disabled/><br/>
                <input className={`${styles.submit}`} type="button" value="儲存或送出"  onClick = {this.addClick.bind(this)}/>
                </div>
        ))
    }
    //計算總價
    PriceSum(idx){
        var sum = document.getElementById("lumpsum"+idx)
        var crane = document.getElementById("crane"+idx+"0")
        var crane1 = document.getElementById("crane"+idx+"1")
        var price = [0,0,0,0,0,0,0,0,0,0,0,0,0],count = []
        var countprice = 0,i,j,c=[1,1,1,1,3,3,1];
        if(crane.checked){
            countprice = 0;
            for(i = 0 ; i< 7 ; i++){
                price[i] = 0
            }
        }
        else{
            crane1.checked = true
            for(i = 1 ; i < 7 ; i++){
                for(j = 0 ; j < contentvalue[i].length ; j++){
                    if(document.getElementById(conele[i]+idx+j).checked){
                        price[i] = 1 * document.getElementById(conele[i]+idx+j).getAttribute('price');
                        price[i] = parseInt(price[i])
                    }
                }
            }
        }
        for(i = 7 ; i < conele.length ; i++){
            if(i>7&&i!==10){
                for(j = 0 ; j < contentvalue[i].length ; j++){
                    if(document.getElementById(conele[i]+idx+j).checked){
                        price[i] = 1 * document.getElementById(conele[i]+idx+j).getAttribute('price');
                        price[i] = parseInt(price[i])
                    }
                }
            }
            else{
                for(j = 2;j<partsvalues1.length;j++){
                    count[j] = document.getElementById("part1"+idx+"count"+j).value
                }
                for(j = 0;j<contentvalue[i].length;j++){
                    if(i===7&&j>1){
                        if(document.getElementById(conele[i]+idx+j).checked){
                            price[i] = price[i] + (count[j]-c[j]) * document.getElementById(conele[i]+idx+j).getAttribute('price');
                            price[i] = parseInt(price[i])
                        }
                    }
                    else{
                        if(document.getElementById(conele[i]+idx+j).checked){
                            price[i] = price[i] + 1 * document.getElementById(conele[i]+idx+j).getAttribute('price');
                            price[i] = parseInt(price[i])
                        }
                    }    
                }
            }
        }
        var quantity = document.getElementById("quantity"+idx).value
        countprice = Math.round(price[1]+price[2]+price[3]+price[4]+price[5]+price[6]+price[7]+price[8]+price[9]+price[10]+price[12])
        sum.value = countprice*quantity+price[11]
    }

    SameValue(idx){
        if(document.getElementById("contact"+idx+"same").checked===true){
            document.getElementById("contact"+idx).value = document.getElementById("name").value
            document.getElementById("contact"+idx).disabled = true
        }else{document.getElementById("contact"+idx).disabled = false}
        if(document.getElementById("cellphone"+idx+"same").checked===true){
            document.getElementById("cellphone"+idx).value = document.getElementById("phone").value
            document.getElementById("cellphone"+idx).disabled = true
        }else{document.getElementById("cellphone"+idx).disabled = false}
        if(document.getElementById("address"+idx+"same").checked===true){
            document.getElementById("address"+idx).value = document.getElementById("address").value
            document.getElementById("address"+idx).disabled = true
        }else{document.getElementById("address"+idx).disabled = false}
    }
    //上一頁
    Previous(idx){
        if(document.getElementById("customizeform"+(idx-1))!==null){
            if(check===1){
                document.getElementById("customizeform"+idx).style.display = "none"
                document.getElementById("customizeform"+(idx-1)).style.display = "block"
                window.location.href="#customizeform"+(idx-1)
                document.getElementById("checkbtn"+(idx-1)).disabled = false
                document.getElementById("cancelbtn"+(idx-1)).disabled = false
            }

            if(document.getElementById("customizeform"+(idx-2))===null){
                document.getElementById("previousbtn"+(idx-1)).disabled = true
            }
        }
    }
    //下一頁
    Next(idx){
        if(document.getElementById("customizeform"+(idx+1))!==null){
            if(check===1){
                document.getElementById("customizeform"+idx).style.display = "none"
                document.getElementById("customizeform"+(idx+1)).style.display = "block"
                window.location.href="#customizeform"+(idx+1)
                document.getElementById("checkbtn"+(idx+1)).disabled = false
                document.getElementById("cancelbtn"+(idx+1)).disabled = false
            }
        }
        else{
            document.getElementById("customizeform"+idx).style.display = "none"
            this.addForm(idx)
            window.location.href="#customizeform"+(idx+1)
        }
    }
    //取消鈕
    FormCancel(idx){
        var i,j;
        window.location.href="#myform"
        document.getElementById("crane"+idx+"0").checked=false;
        document.getElementById("crane"+idx+"1").checked=false;
        for(i = 0 ; i < coninput.length ; i++){
            document.getElementById(coninput[i]+idx).value = ""
            document.getElementById(coninput[i]+idx).disabled = false
            if(i>3){
                document.getElementById(coninput[i]+idx+"same").checked = false
            }
        }
        for(i = 1 ; i < contentvalue.length ; i++){
            document.getElementById(conele[i]+idx+"remark").value = ""
        }
        for(i = 0 ; i < contentvalue.length ; i++){
            for(j = 0 ; j < contentvalue[i].length ; j++){
                document.getElementById(conele[i]+idx+j).checked = false
            }
        }
        this.player(idx)
    }
    //修改鈕
    FixForm(idx){
        if(document.getElementById("customizeform"+(idx+1))!==null){
            if(check===1){
                document.getElementById("customizeform"+idx).style.display = "none"
                document.getElementById("customizeform"+idx).style.display = "block"
                document.getElementById("checkbtn"+idx).disabled = false
                document.getElementById("cancelbtn"+idx).disabled = false
                window.location.href="#customizeform"+idx
            }
        }
        else{
            document.getElementById("checkbtn"+idx).disabled = false
            document.getElementById("cancelbtn"+idx).disabled = false
            document.getElementById("customizeform"+idx).style.display = "none"
            this.addForm(idx)
            document.getElementById("customizeform"+idx).style.display = "block"
            window.location.href="#customizeform"+idx
            setTimeout(()=>document.getElementById("customizeform"+(idx+1)).style.display = "none",0)
        }
    }
    //確認鈕
    CheckForm(idx){
        check=1
        var i , j , a , miss = [] ,remark = [] , dataval = [] , partval1 = [],partval2 = [],count = [],price = [] ,priceval = [],partpc1 = [],partpc2 = []
        for(i = 0 ; i < contentvalue.length ; i++){
            miss[i] = false
            miss[7]=true
            miss[10] = true
            for(j = 0 ; j < contentvalue[i].length ; j++){
                if(contentvalue[i]===partsvalues1&&document.getElementById(conele[i]+idx+j).checked===true){
                    partval1.push(document.getElementById(conele[i]+idx+j).value)
                    partpc1.push(document.getElementById(conele[i]+idx+j).getAttribute("price"))
                    if(j>1){
                        count.push(document.getElementById(conele[i]+idx+"count"+j).value)
                    }
                    else{
                        count.push("1")
                    }
                }
                else if(contentvalue[i]===partsvalues2&&document.getElementById(conele[i]+idx+j).checked===true){
                    partval2.push(document.getElementById(conele[i]+idx+j).value)
                    partpc2.push(document.getElementById(conele[i]+idx+j).getAttribute("price"))
                }
                if(document.getElementById("crane"+idx+"0").checked===true){
                    var standardvalue = ["標準天車","2800轉 馬達","2800轉 馬達","2800轉 馬達","標準捲線器","塑鋼齒輪","標準線圈3.5CM S號爪",]
                    for(a = 0 ; a < 7 ; a++){
                        miss[a] = true
                        dataval[a] = standardvalue[a]
                        priceval[a] = "0"
                        dataval[0] = document.getElementById("crane"+idx+"0").value
                    }
                    if(document.getElementById(conele[i]+idx+j).checked===true){
                        miss[i]=true
                        dataval[i] = document.getElementById(conele[i]+idx+j).value
                        priceval[i] = document.getElementById(conele[i]+idx+j).getAttribute("price")
                    }
                }
                else if(document.getElementById(conele[i]+idx+j).checked===true){
                    miss[i]=true
                    dataval[i] = document.getElementById(conele[i]+idx+j).value
                    priceval[i] = document.getElementById(conele[i]+idx+j).getAttribute("price")
                }
            }
            if(miss[i]!==true){
                window.location.href="#"+conele[i]+idx;
                alert(msg[i]);
                check=0
                return false;
            }
        }
        for(i = 0 ; i < coninput.length-3 ; i++){
            if(document.getElementById(coninput[i]+idx).value===""&&i!==2&&i!==3){
                window.location.href = "#"+coninput[i]+idx;
                alert(iptmsg[i])
                check = 0
                return false
            }
        }
        for(i = coninput.length-3 ; i<coninput.length ; i++){
            if(document.getElementById(coninput[i]+idx).value===""&&document.getElementById(coninput[i]+idx+"same").checked===false){
                window.location.href = "#"+coninput[i]+idx;
                alert(iptmsg[i])
                check = 0
                return false
            }
        }
        if(check===1){
            alert("儲存成功")
            document.getElementById("checkbtn"+idx).disabled = true
            document.getElementById("cancelbtn"+idx).disabled = true
            const n = document.getElementById("nextbtn"+idx);
            n.disabled = false
            n.addEventListener('click',this.Next.bind(this,idx))
            remark = {
                matorudremark:document.getElementById("matorud"+idx+"remark").value,
                matorlrremark:document.getElementById("matorlr"+idx+"remark").value,
                matorbaremark:document.getElementById("matorba"+idx+"remark").value,
                lineremark:document.getElementById("line"+idx+"remark").value,
                gearremark:document.getElementById("gear"+idx+"remark").value,
                clawremark:document.getElementById("claw"+idx+"remark").value,
                part1remark:document.getElementById("part1"+idx+"remark").value,
                powerremark:document.getElementById("power"+idx+"remark").value,
                socketremark:document.getElementById("socket"+idx+"remark").value,
                part2remark:document.getElementById("part2"+idx+"remark").value,
                freightremark:document.getElementById("freight"+idx+"remark").value,
                installremark:document.getElementById("install"+idx+"remark").value
            }
            price = {
                matorudprice:priceval[1],
                matorlrprice:priceval[2],
                matorbaprice:priceval[3],
                lineprice:priceval[4],
                gearprice:priceval[5],
                clawprice:priceval[6],
                part1price:partpc1,
                powerprice:priceval[8],
                socketprice:priceval[9],
                part2price:partpc2,
                freightprice:priceval[11],
                installprice:priceval[12],
            }
            data.push({
                title:document.getElementById("title"+idx).value,
                quantity:document.getElementById("quantity"+idx).value,
                crane:dataval[0],
                matorud:dataval[1],
                matorlr:dataval[2],
                matorba:dataval[3],
                line:dataval[4],
                gear:dataval[5],
                claw:dataval[6],
                part1:partval1,
                count:count,
                power:dataval[8],
                socket:dataval[9],
                part2:partval2,
                freight:dataval[11],
                install:dataval[12],
                other1:document.getElementById("other1"+idx).value,
                other2:document.getElementById("other2"+idx).value,
                contact:document.getElementById("contact"+idx).value,
                cellphone:document.getElementById("cellphone"+idx).value,
                address:document.getElementById("address"+idx).value,
                sumprice:document.getElementById("lumpsum"+idx).value,
                remark,price
            })
            if(document.getElementById("customizeform"+(idx+1))!==null){
                data[idx]=data[data.length-1]
                data.splice(data.length-1,1);
            }
            console.log("Data:")
            console.log(data)
        }
    
    }
    //送出
    handleSubmit(event) {
        // alert("功能尚未推出")
        // event.preventDefault()
        // window.location.reload();
        return fetch('/test_official_web_server/email/email_form', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(list),
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(response => {
            return response.json();
        }).then(myJson => {
            console.log(myJson);
        }).catch(err => err)
    }
    //新增確認表單
    addClick(){
        if(document.getElementById("name").value===""){
            window.location.href="#name";
            alert(iptmsg[7]);
            return false;
        }
        else if(document.getElementById("phone").value===""){
            window.location.href="#phone";
            alert(iptmsg[8]);
            return false;
        }
        else if(document.getElementById("address").value===""){
            window.location.href="#address";
            alert(iptmsg[9]);
            return false;
        }
        else{
            window.location.href="#___gatsby";
            this.setState(prevState => ({ values: [...prevState.values, '']}))
            document.getElementById("hidelist").style.display = "block"
            var name ,phone ,address
                name = document.getElementById("name").value
                phone = document.getElementById("phone").value
                address = document.getElementById("address").value
            list={name , phone ,address ,data}
        }
        console.log("List:")
        console.log(list)
    }
    //確認表單
    OpenList(){
        var remark = [] ,datalist = [] ,price = [],total = 0
        for(let index in data){
            var quantity = data[index].quantity
            var pricepart1 = [] ,pricepart2 = []
            var count1 =[] ,count2 =[] ,count1value = []
            price[index] = data[index].price
            remark[index] = data[index].remark
            for(let idx in data[index].part1){
                if(data[index].part1[idx]==="L型檔版"||data[index].part1[idx]==="背光鏡子"){
                    count1[idx] = data[index].count[idx]
                }
                else if(data[index].part1[idx]==="4CM 保麗龍"||data[index].part1[idx]==="8CM 保麗龍"){
                    count1[idx] = data[index].count[idx]-3
                }
                else{
                    count1[idx] = data[index].count[idx]-1
                }
                count1value[idx] = count1[idx]+" X "+quantity
                pricepart1[idx] = quantity*count1[idx]*data[index].price.part1price[idx]
            }
            for(let idx in data[index].part2){
                count2[idx] = "1 X "+quantity
                pricepart2[idx] = data[index].price.part2price[idx]*quantity
            }
            datalist[index]=<div key = {index}>
                <LastForm title = {"標題"} stand = {data[index].title}/>
                <LastForm title = {"數量"} stand = {data[index].quantity}/>
                <Titledisplay/>
                <LastForm title = {"天車"} cust = {data[index].crane}/>
                <LastForm title = {"上下馬達"} stand = {"2800轉 馬達"} cust = {data[index].matorud} count = {"1 X "+quantity} remark = {remark[index].matorudremark} price = {price[index].matorudprice*quantity}/>
                <LastForm title = {"左右馬達"} stand = {"2800轉 馬達"} cust = {data[index].matorlr} count = {"1 X "+quantity} remark = {remark[index].matorlrremark} price = {price[index].matorlrprice*quantity}/>
                <LastForm title = {"前後馬達"} stand = {"2800轉 馬達"} cust = {data[index].matorba} count = {"1 X "+quantity} remark = {remark[index].matorbaremark} price = {price[index].matorbaprice*quantity}/>
                <LastForm title = {"捲線器"} stand = {"標準捲線器"} cust = {data[index].line} count = {"1 X "+quantity} remark = {remark[index].lineremark} price = {price[index].lineprice*quantity}/>
                <LastForm title = {"齒輪"} stand = {"塑鋼齒輪"} cust = {data[index].gear} count = {"1 X "+quantity} remark = {remark[index].gearremark} price = {price[index].gearprice*quantity}/>
                <LastForm title = {"爪子"} stand = {"標準線圈3.5CM S號爪"} cust = {data[index].claw} count = {"1 X "+quantity} remark = {remark[index].clawremark} price = {price[index].clawprice*quantity}/>
                <LastForm title = {"電源供應器"} stand = {"25W標準電源供應器"} cust = {data[index].power} count = {"1 X "+quantity} remark = {remark[index].powerremark} price = {price[index].powerprice*quantity}/>
                <LastForm title = {"排插座"} stand = {"防電排插座"} cust = {data[index].socket} count = {"1 X "+quantity} remark = {remark[index].socketremark} price = {price[index].socketprice*quantity}/>
                <LastForm title = {"運送地方"} stand = {"自取"} cust = {data[index].freight} count = {"-"} remark = {remark[index].freightremark} price = {price[index].freightprice}/>
                <LastForm title = {"安裝方法"} stand = {"免安裝"} cust = {data[index].install} count = {"1 X "+quantity} remark = {remark[index].installremark} price = {price[index].installprice*quantity}/>
                <Part title = {"配件1"} cust = {data[index].part1} count = {count1value}  remark = {remark[index].part1remark} price = {pricepart1}/>
                <Part title = {"配件2"} cust = {data[index].part2} count = {count2}  remark = {remark[index].part2remark} price = {pricepart2}/>
                <LastForm title = {"其他1"} stand = {data[index].other1}/>
                <LastForm title = {"其他2"} stand = {data[index].other2}/>
                <LastForm title = {"補差價總額"} price = {data[index].sumprice}/>
                <LastForm title = {"聯絡人"} stand = {data[index].contact}/>
                <LastForm title = {"聯絡電話"} stand = {data[index].cellphone}/>
                <LastForm title = {"送貨地址"} stand = {data[index].address}/>
                <hr style = {{height:"30px"}}/>
                <p style={{pageBreakAfter:"always"}}>&nbsp;</p>
            </div>
            total = total+parseInt(data[index].sumprice)
        }
        return this.state.values.map((el,idx) => 
            <div key={idx} id = "delbody">
                <Client name = {list.name} phone = {list.phone} address = {list.address}/>
                {datalist}
                <LastForm title = {"補差價總額"} price = {total}/>
            </div>          
        )
    }
    CloseList(){
        var deltitle = document.getElementById("delbody")
        deltitle.remove()
        document.getElementById("hidelist").style.display = "none"
    }

    SaveList(){
        window.print(); 
    }

    render() {
        return (
            <Layout>
                <SEO title="machineform" keywords={[`machineform`, `陸豪`, `吸粉服務`]} />
                <form id="myform"  name="myform"
                    // target="_blank"
                    // onSubmit = {this.handleSubmit}
                    >
                    <div className={`${styles.formborder}`}>
                        <div id = "info" >
                            <h1>ST-08R</h1>
                            <h2>基本資料</h2>
                            <div className={`${styles.inputValue}`}>客戶名稱:
                                <Button 
                                    class={`${styles.inputMain}`}
                                    id = "name"
                                    type="text" 
                                    placeholder="客戶名稱" 
                                    onChange = {this.handleName.bind(this)}
                                />
                            </div>
                            <div className={`${styles.inputValue}`}>客戶電話:
                                <Button 
                                    class={`${styles.inputMain}`}
                                    id = "phone"
                                    type="text" 
                                    placeholder="客戶電話" 
                                    onChange = {this.handlePhone.bind(this)}
                                />
                            </div>
                            <div className={`${styles.inputValue}`}>客戶地址:
                                <Button 
                                    class={`${styles.inputMain}`}
                                    id = "address"
                                    type="text" 
                                    placeholder="客戶地址" 
                                    onChange = {this.handleAddress.bind(this)}
                                />
                            </div>
                            <div id = "customizetitle"></div>
                            <input type='button' value='開始填寫' id='CFbtn' onClick={this.ShowForm} className={`${styles.submit}`}/><br/>
                            {/* <input className={`${styles.submit}`} type="button" value="儲存或送出"  onClick = {this.addClick.bind(this)}/> */}
                        </div>
                        {this.FormValues()}
                    </div>
                    <div id = "hidelist" className = {`${styles.hideclass}`}>
                        <div className = {`${styles.hidecontent}`}>
                            <span className = {`${styles.close}`}  onClick = {this.CloseList.bind(this)}>x</span>
                            <div className={`${styles.listborder}`}>
                                <h1>ST-08R</h1>
                                <h2>基本資料</h2>
                                <div id = "listbody">
                                    {this.OpenList()}
                                </div>
                            </div>
                            <input className={`${styles.submit}`} type="button" value="儲存" onClick = {this.SaveList.bind(this)}/>
                            <input className={`${styles.submit}`} type="submit" value="送出" onClick = {this.handleSubmit.bind(this)}/>
                            <input className={`${styles.submit}`} type="button" value="取消" onClick = {this.CloseList.bind(this)}/>
                        </div>    
                    </div>
                </form>
            </Layout>
        )
    }
}


function Titledisplay(){
    return(
        <div className = {`${styles.aligneddiv}`}>
            <span className = {`${styles.aligned}`}>標題</span>
            <span className = {`${styles.exaligned}`}>標準配置</span>
            <span className = {`${styles.conaligned}`}>你的配置</span>
            <span className = {`${styles.countaligned}`}>數量</span>
            <span className = {`${styles.pricealigned}`}>補差價</span>
            <span className = {`${styles.remarkaligned}`}>備註</span>
        </div>
    )
}
function LastForm(props){
    return(
        <div className = {`${styles.aligneddiv}`}>
            <span className = {`${styles.aligned}`}>{props.title}</span>
            <span className = {`${styles.exaligned}`}>{props.stand}</span>
            <span className = {`${styles.conaligned}`}>{props.cust}</span>
            <span className = {`${styles.countaligned}`}>{props.count}</span>
            <span className = {`${styles.pricealigned}`}>{props.price}</span>
            <span className = {`${styles.remarkaligned}`}>{props.remark}</span>
        </div>
    )
}
function Part(props){
    var part1 = [],count = [],price = []
    for(let idx in props.cust){
        part1[idx] = <p key = {`${idx}`}>{props.cust[idx]}</p>
        count[idx] = <p key = {`${idx}`}>{props.count[idx]}</p>
        price[idx] = <p key = {`${idx}`}>{props.price[idx]}</p>
    }
    return(
        <div className = {`${styles.aligneddiv}`}>
            <span className = {`${styles.aligned}`}>{props.title}</span>
            <span className = {`${styles.exaligned}`}>{props.stand}</span>
            <span className = {`${styles.conaligned}`}>{part1}</span>
            <span className = {`${styles.countaligned}`} style = {{fontSize:"1rem"}}>{count}</span>
            <span className = {`${styles.pricealigned}`} style = {{fontSize:"1rem"}}>{price}</span>
            <span className = {`${styles.remarkaligned}`}>{props.remark}</span>
        </div>
    )
}
function Client(props){
    return(
        <div className = {`${styles.aligneddiv}`}>
            <div>客戶名稱：{props.name}</div>
            <div>客戶電話：{props.phone}</div>
            <div>客戶地址：{props.address}</div>
        </div>
    )
}
function RadioInput(props){
    var i ,partele = [];
    for(i = 0 ; i < props.le ; i++){
        props.ele[i]=
            <InputElement 
                key = {props.aaa+i}
                type = {props.type} 
                name = {props.name} 
                id = {props.id+i} 
                price = {props.price[i]} 
                value = {props.value[i]} 
                classdiv = {props.classdiv} 
                iddiv = {props.iddiv} 
                onClick = {props.onClick}
                onChange = {props.onChange}
            />
        props.pcele[i] = 
            <Price 
                key = {props.aaa+i}
                id = {props.id+"price"+i} 
                price = {props.price[i]} 
                downname = {props.down} 
                onClick = {props.onClick}
                disabled = {true}
                pcdiv = {props.id+"pricediv"+i}
            />
        if(props.count==="1"&&i>1){
            partele[i] = 
            <InputElement 
                key = {props.aaa+i}
                type = "number" 
                id = {props.id+"count"+i} 
                downname = "數量：" 
                min = "0" 
                max = "5" 
                onClick = {props.onClick}
                onChange = {props.onChange}
            />
        }
    }
    return(
        <div>
            <div style = {{display:"inline-block"}} className = {`${styles.inputdiv}`}>{props.ele}</div>
            <div style = {{display:"inline-block"}} className = {`${styles.pricediv}`}>{props.pcele}</div>
            <div style = {{display:"inline-block"}} className = {`${styles.count}`}>{partele}</div>
            <div style = {{display:"inline-block"}} className = {props.class}>
                <span>備註：</span>
                <textarea id = {props.id+"remark"}></textarea>
            </div>
        </div>
    )            
}
function InputElement(props){
    return(
        <div className = {props.classdiv} id = {props.iddiv}>
            <span style = {props.stopstyle}>{props.topname}</span>
            <Button
                type = {props.type}
                name = {props.name}
                id = {props.id}
                onClick = {props.onClick}
                onChange = {props.onChange}
                value = {props.value}
                placeholder = {props.placeholder}
                style = {props.style}
                min = {props.min}
                max = {props.max}
                price = {props.price}
                disabled = {props.disabled}
            />
            <label htmlFor = {props.id}>{props.value}</label>
            <span >{props.downname}</span>
        </div>
    )
}

function Contact(props){
    return(
        <div className = {props.classdiv} id = {props.iddiv}>
            <span style = {props.stopstyle}>{props.topname}</span>
            <Button
                type = {props.type}
                name = {props.name}
                id = {props.id}
                placeholder = {props.placeholder}
                style = {props.style}
            />
            <input style = {{margin:"4px"}} type = "checkbox" id = {props.id+"same"} value = "同基本資料" onClick = {props.onClick}/>
            <label htmlFor = {props.id+"same"}>同基本資料</label>
        </div>
    )
}
function Price(props){
    return(
        <div className = {props.classdiv}>
            <span >{props.downname}</span>
            <Button
                type = {props.type}
                id = {props.id}
                defaultValue = {props.price+"元"}
                price = {props.price}
                disabled = {props.disabled}
            />
            <span id = {props.pcdiv}></span>
        </div>
    )
}
function Inputtext(props){
    return(
        <span className = {props.classdiv}>
            {props.value}<br/>
            <textarea
                id = {props.id}
                className = {props.class}
            />
        </span>
    )
}
function Button(props){
    return(
            <input
                defaultValue = {props.defaultValue}
                type = {props.type}
                name = {props.name}
                id = {props.id}
                onClick = {props.onClick}
                onChange = {props.onChange}
                value = {props.value}
                placeholder = {props.placeholder}
                style = {props.style}
                className = {props.class}
                min = {props.min}
                max = {props.max}
                price = {props.price}
                disabled = {props.disabled}
            />
    )
}
