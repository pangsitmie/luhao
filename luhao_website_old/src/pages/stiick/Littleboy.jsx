import React, { Component } from 'react'
import styles from "../multi.module.scss"

import littleboy1 from '../../images/fourth/strick/littleboy/littleboy_01.png'
import littleboy2 from '../../images/fourth/strick/littleboy/littleboy_02.png'
import littleboy3 from '../../images/fourth/strick/littleboy/littleboy_03.png'
import littleboy4 from '../../images/fourth/strick/littleboy/littleboy_01.png'
import littleboy5 from '../../images/fourth/strick/littleboy/littleboy_05.png'
import littleboy6 from '../../images/fourth/strick/littleboy/littleboy_06.png'
import littleboy7 from '../../images/fourth/strick/littleboy/littleboy_07.png'
import littleboy8 from '../../images/fourth/strick/littleboy/littleboy_08.png'
import littleboy9 from '../../images/fourth/strick/littleboy/littleboy_09.png'
import littleboy10 from '../../images/fourth/strick/littleboy/littleboy_10.png'
import littleboy11 from '../../images/fourth/strick/littleboy/littleboy_11.png'
import littleboy12 from '../../images/fourth/strick/littleboy/littleboy_12.png'


export default class Littleboy extends Component{
  render(){
    return(
      <div className={styles.stick}>
        <img src={littleboy1} alt='littleboy'/>
        <img src={littleboy2} alt='littleboy'/>
        <img src={littleboy3} alt='littleboy'/>
        <img src={littleboy4} alt='littleboy'/>
        <img src={littleboy5} alt='littleboy'/>
        <img src={littleboy6} alt='littleboy'/>
        <img src={littleboy7} alt='littleboy'/>
        <img src={littleboy8} alt='littleboy'/>
        <img src={littleboy9} alt='littleboy'/>
        <img src={littleboy10} alt='littleboy'/>
        <img src={littleboy11} alt='littleboy'/>
        <img src={littleboy12} alt='littleboy'/>
      </div>
    )
  }
}