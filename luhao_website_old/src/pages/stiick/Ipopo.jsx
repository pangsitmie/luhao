import React, { Component } from 'react'
import styles from "../multi.module.scss"

import Ipopo1 from '../../images/fourth/strick/Ipopo/Ipopo_01.png'
import Ipopo2 from '../../images/fourth/strick/Ipopo/Ipopo_02.png'
import Ipopo3 from '../../images/fourth/strick/Ipopo/Ipopo_03.png'
import Ipopo4 from '../../images/fourth/strick/Ipopo/Ipopo_01.png'
import Ipopo5 from '../../images/fourth/strick/Ipopo/Ipopo_05.png'
import Ipopo6 from '../../images/fourth/strick/Ipopo/Ipopo_06.png'
import Ipopo7 from '../../images/fourth/strick/Ipopo/Ipopo_07.png'
import Ipopo8 from '../../images/fourth/strick/Ipopo/Ipopo_08.png'
import Ipopo9 from '../../images/fourth/strick/Ipopo/Ipopo_09.png'
import Ipopo10 from '../../images/fourth/strick/Ipopo/Ipopo_10.png'
import Ipopo11 from '../../images/fourth/strick/Ipopo/Ipopo_11.png'


export default class Ipopo extends Component{
  render(){
    return(
      <div className={styles.stick}>
        <img src={Ipopo1} alt='Ipopo'/>
        <img src={Ipopo2} alt='Ipopo'/>
        <img src={Ipopo3} alt='Ipopo'/>
        <img src={Ipopo4} alt='Ipopo'/>
        <img src={Ipopo5} alt='Ipopo'/>
        <img src={Ipopo6} alt='Ipopo'/>
        <img src={Ipopo7} alt='Ipopo'/>
        <img src={Ipopo8} alt='Ipopo'/>
        <img src={Ipopo9} alt='Ipopo'/>
        <img src={Ipopo10} alt='Ipopo'/>
        <img src={Ipopo11} alt='Ipopo'/>
      </div>
    )
  }
}