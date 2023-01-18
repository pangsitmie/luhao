import React, { Component } from 'react'
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Opening from "../../components/Index/opening"
import styles from "./multi.module.scss"



import GflyDjump from '../stiick/GflyDjump'
import Ipopo from '../stiick/Ipopo'
import RockerG from '../stiick/RockerG'
import Littleboy from '../stiick/Littleboy'
import Littlegirl from '../stiick/Littlegirl'
import Papac from '../stiick/Papac'
import Round from '../stiick/Round'

export default class multi extends Component {
  constructor(props){
    super(props)
    this.state={
      count: 0,
      display: false,
    }
  }
  toggle=(e)=>{
    this.setState(prev=>({
      count: e,
      display: !prev.display,
    }))
  }
  render() {
    return (
      <Layout>
        <SEO title="multi" keywords={[`multi`, `陸豪`, `多媒體設計`]} />
        <Opening
          number="multi"
          left={
            <div className={styles["lefttext"]}>
              <h1>Multimedia Design</h1>
              <p>Miltimedia list of WINPRO cloud products.</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                  See more >
                </a>
              </div>
            </div>
          }
          right={
            <div className={styles["rightimage"]}>
              <div className={styles["ofFlex"]}>

              </div>
            </div>
          }
        />
        <article className={styles["body"]}>
          <Mid />
          <div>
            <h2>StickersDesign</h2>
            <p>貼圖設計</p>
          </div>
          <Bottom display={this.state.display} openLightbox={this.toggle}/>
          <Lightbox display={this.state.display} count={this.state.count} closeLightbox={this.toggle}/>
        </article>
      </Layout>
    )
  }
}

function Mid(){
  return(
    <div>
      <div>
        <div>
          <div>
            <h1>Advertising shooting</h1>
            <p>Commercial Videos</p>
          </div>
        </div>
        <div>
          <div>
            <h1>Advertising video shooting</h1>
            <a  href='https://www.youtube.com/watch?v=5TXfW2EPSI8&feature=youtu.be'
                target='_blank'
                rel='noopener noreferrer'>
              <div>
                  <p>See video</p>
              </div>
            </a>
          </div>
          <div>
            <h1>Advertising video-01</h1>
            <a  href='https://www.youtube.com/watch?v=5TXfW2EPSI8&feature=youtu.be'
                target='_blank'
                rel='noopener noreferrer'>
                <div>
                    <p>See video</p>
                </div>
            </a>
          </div>
        </div>
        <div>
          <div>
            <h1>Advertising video-02</h1>
              <a  href='https://www.youtube.com/watch?v=5TXfW2EPSI8&feature=youtu.be'
                  target='_blank'
                  rel='noopener noreferrer'>
                <div>
                    <p>See video</p>
                </div>
              </a>
          </div>
          <div>
            <h1>Advertising video-03</h1>
            <a  href='https://www.youtube.com/watch?v=5TXfW2EPSI8&feature=youtu.be'
                target='_blank'
                rel='noopener noreferrer'>
                <div>
                    <p>See video</p>
                </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
class Bottom extends Component{
  constructor(props){
    super(props)
    this.headleChange = this.headleChange.bind(this)
  }

  headleChange(e){
    this.props.openLightbox(e);
  }

  render(){
    return(
    <div>
      <div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,1)}>
          <div>
            <div className={styles["littleboy"]}></div>
          </div>
          <div>
            <h2>Littleboy</h2>
            <p>Author's words
              <br/>
              <span>Author</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,2)}>
          <div>
            <div className={styles["Ipopo"]}></div>
          </div>
          <div>
            <h2>Ipopo</h2>
            <p>Author's words
              <br/>
              <span>Author</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,3)}>
          <div>
            <div className={styles["RockerG"]}></div>
          </div>
          <div>
            <h2>RockerG</h2>
            <p>Author's words
              <br/>
              <span>Author</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,4)}>
          <div>
            <div className={styles["round"]}></div>
          </div>
          <div>
            <h2>Round</h2>
            <p>A soft cloud of the round, the most intriguing thing is that his round body, friends arealso in the cloud of a series of rolling, the family has many brothers and sisters, is the eldest daughter of the family.
              <br/>
              <span>——李瑜庭/楊芸茹</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,5)}>
          <div>
            <div className={styles["papac"]}></div>
          </div>
          <div>
            <h2>PAPAC</h2>
              <p>PAPAC thought he was fierce, but in fact it was a natural and lovely boy in the eyes of others. The cloak on Papak was originally intended to cover his distrust of the dinosaur body, but he found......
                <br/>
              <span>Author</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,6)}>
          <div>
            <div className={styles["GflyDjump"]}></div>
          </div>
          <div>
            <h2>Chicken Flying Dog Jump</h2>
            <p>Author's words
              <br/>
              <span>Author</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,7)}>
          <div>
            <div className={styles["littlegirl"]}></div>
          </div>
          <div>
            <h2>Littlegirl</h2>
            <p>Author's words
              <br/>
              <span>Author</span>
            </p>
          </div>
        </div>
        <div className={`${styles.imgBox}  ${styles.commingSoon}`}>
          <p>commingSoon...</p>
        </div>
      </div>
    </div>
    )
  }
}
class Lightbox extends Component{
  constructor(props){
    super(props)
    this.headleChange = this.headleChange.bind(this)
  }

  headleChange(e){
    this.props.closeLightbox(e);
  }
  render(){
    const { display } = this.props
    const { count } = this.props
    return(
      <div className={`${styles.lightBox}  ${display ? `${styles.lightboxShowing}` : ``}` }>
        <div onClick={this.headleChange.bind(this,0)} className={`${styles.lightboxClose}`}></div>
        <div className={`${styles.stickersShowing}`}>{table(count)}</div>
      </div>
    )
  }
}
function table(props){
  switch (props) {
    case 1:
      return(
        <div>
          <div className='stickersshowLeft'>
            <Littleboy/>
          </div>
          <div className='stickersshowRight'>
            <h1>Littleboy</h1>
            <p>Author's words</p>
            <p>Author</p>
          </div>
        </div>
      )
    case 2:
      return(
        <div>
          <div className='stickersshowLeft'>
            <Ipopo/>
          </div>
          <div className='stickersshowRight'>
            <h1>Ipopo</h1>
            <p>Author's words</p>
            <p>Author</p>
          </div>
        </div>
      )
    case 3:
      return(
        <div>
          <div className='stickersshowLeft'>
            <RockerG/>
          </div>
          <div className='stickersshowRight'>
            <h1>RockerG</h1>
            <p>Author's words</p>
            <p>Author</p>
          </div>
        </div>
      )
    case 4:
      return(
        <div>
          <div className='stickersshowLeft'>
            <Round/>
          </div>
          <div className='stickersshowRight'>
            <h1>Round</h1>
            <p>A soft cloud of the round, the most intriguing thing is that his round body, friends are also in the cloud of a series of rolling, the family has many brothers and sisters, is the eldest daughter of the family.</p>
            <p>——李瑜庭/楊芸茹</p>
          </div>
        </div>
      )
    case 5:
      return(
        <div>
          <div className='stickersshowLeft'>
            <Papac/>
          </div>
          <div className='stickersshowRight'>
            <h1>PAPAC</h1>
            <p>
              PAPAC thought he was fierce, but in fact it was a natural and lovely boy in the eyes of others. The cloak on Papak
              was originally intended to cover his distrust of the dinosaur's body, but he found that as long as there is
              a good heart, it can be as powerful as Superman! Therefore, the cloak is no longer meant to cover itself,
              but a symbol of Papak's positive energy!
            </p>
            <p>Author</p>
          </div>
        </div>
      )
    case 6:
      return(
        <div>
          <div className='stickersshowLeft'>
            <GflyDjump/>
          </div>
          <div className='stickersshowRight'>
            <h1>Chicken Flying Dog Jump</h1>
            <p>Author's words</p>
            <p>Author</p>
          </div>
        </div>
      )
    case 7:
      return(
        <div>
          <div className='stickersshowLeft'>
            <Littlegirl/>
          </div>
          <div className='stickersshowRight'>
            <h1>Littlegirl</h1>
            <p>Author's words</p>
            <p>Author</p>
          </div>
        </div>
      )
    default:
      break;
  }
}