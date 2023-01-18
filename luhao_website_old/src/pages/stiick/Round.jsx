import React, { Component } from 'react'
import styles from "../multi.module.scss"

import round1 from '../../images/fourth/strick/round/round_01.png'
import round2 from '../../images/fourth/strick/round/round_02.png'
import round3 from '../../images/fourth/strick/round/round_03.png'
import round4 from '../../images/fourth/strick/round/round_01.png'
import round5 from '../../images/fourth/strick/round/round_05.png'
import round6 from '../../images/fourth/strick/round/round_06.png'
import round7 from '../../images/fourth/strick/round/round_07.png'
import round8 from '../../images/fourth/strick/round/round_08.png'
import round9 from '../../images/fourth/strick/round/round_09.png'
import round10 from '../../images/fourth/strick/round/round_10.png'
import round11 from '../../images/fourth/strick/round/round_11.png'
import round12 from '../../images/fourth/strick/round/round_12.png'
import round13 from '../../images/fourth/strick/round/round_13.png'
import round14 from '../../images/fourth/strick/round/round_14.png'
import round15 from '../../images/fourth/strick/round/round_15.png'
import round16 from '../../images/fourth/strick/round/round_16.png'
import round17 from '../../images/fourth/strick/round/round_17.png'
import round18 from '../../images/fourth/strick/round/round_18.png'
import round19 from '../../images/fourth/strick/round/round_19.png'
import round20 from '../../images/fourth/strick/round/round_20.png'


export default class Round extends Component{
  render(){
    return(
      <div className={styles.stick}>
        <img src={round1} alt='round'/>
        <img src={round2} alt='round'/>
        <img src={round3} alt='round'/>
        <img src={round4} alt='round'/>
        <img src={round5} alt='round'/>
        <img src={round6} alt='round'/>
        <img src={round7} alt='round'/>
        <img src={round8} alt='round'/>
        <img src={round9} alt='round'/>
        <img src={round10} alt='round'/>
        <img src={round11} alt='round'/>
        <img src={round12} alt='round'/>
        <img src={round13} alt='round'/>
        <img src={round14} alt='round'/>
        <img src={round15} alt='round'/>
        <img src={round16} alt='round'/>
        <img src={round17} alt='round'/>
        <img src={round18} alt='round'/>
        <img src={round19} alt='round'/>
        <img src={round20} alt='round'/>
      </div>
    )
  }
}