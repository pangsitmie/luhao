import React, { Component } from 'react'
import styles from "../multi.module.scss"

import littlegirl1 from '../../images/fourth/strick/littlegirl/01.png'
import littlegirl2 from '../../images/fourth/strick/littlegirl/02.png'
import littlegirl3 from '../../images/fourth/strick/littlegirl/03.png'
import littlegirl4 from '../../images/fourth/strick/littlegirl/01.png'
import littlegirl5 from '../../images/fourth/strick/littlegirl/05.png'
import littlegirl6 from '../../images/fourth/strick/littlegirl/06.png'
import littlegirl7 from '../../images/fourth/strick/littlegirl/07.png'
import littlegirl8 from '../../images/fourth/strick/littlegirl/08.png'


export default class Littlegirl extends Component{
  render(){
    return(
      <div className={styles.stick}>
        <img src={littlegirl1} alt='littlegirl'/>
        <img src={littlegirl2} alt='littlegirl'/>
        <img src={littlegirl3} alt='littlegirl'/>
        <img src={littlegirl4} alt='littlegirl'/>
        <img src={littlegirl5} alt='littlegirl'/>
        <img src={littlegirl6} alt='littlegirl'/>
        <img src={littlegirl7} alt='littlegirl'/>
        <img src={littlegirl8} alt='littlegirl'/>
      </div>
    )
  }
}