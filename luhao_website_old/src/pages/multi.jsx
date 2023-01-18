import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Opening from "../components/Index/opening"
import styles from "./multi.module.scss"



import GflyDjump from './stiick/GflyDjump'
import Ipopo from './stiick/Ipopo'
import RockerG from './stiick/RockerG'
import Littleboy from './stiick/Littleboy'
import Littlegirl from './stiick/Littlegirl'
import Papac from './stiick/Papac'
import Round from './stiick/Round'

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
              <h1>多媒體設計</h1>
              <p>雲程出品多媒體一覽</p>
              <div>
                <a href="https://ipickpro.cloudprogrammingonline.com/index">
                  查看更多 >
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
            <h2>貼圖設計</h2>
            <p>StickersDesign</p>
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
            <h1>廣告拍攝</h1>
            <p>CommercialVideos</p>
          </div>
        </div>
        <div>
          <div>
            <h1>廣告投放1</h1>
            <a  href='https://www.youtube.com/watch?v=5TXfW2EPSI8&feature=youtu.be'
                target='_blank'
                rel='noopener noreferrer'>
              <div>
                  <p>觀看影片</p>
              </div>
            </a>
          </div>
          <div>
            <h1>廣告投放2</h1>
            <a  href='https://www.youtube.com/watch?v=5TXfW2EPSI8&feature=youtu.be'
                target='_blank'
                rel='noopener noreferrer'>
                <div>
                    <p>觀看影片</p>
                </div>
            </a>
          </div>
        </div>
        <div>
          <div>
            <h1>廣告投放3</h1>
              <a  href='https://www.youtube.com/watch?v=5TXfW2EPSI8&feature=youtu.be'
                  target='_blank'
                  rel='noopener noreferrer'>
                <div>
                    <p>觀看影片</p>
                </div>
              </a>
          </div>
          <div>
            <h1>廣告投放4</h1>
            <a  href='https://www.youtube.com/watch?v=5TXfW2EPSI8&feature=youtu.be'
                target='_blank'
                rel='noopener noreferrer'>
                <div>
                    <p>觀看影片</p>
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
            <h2>小男孩</h2>
            <p>作者的話
              <br/>
              <span>作者</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,2)}>
          <div>
            <div className={styles["Ipopo"]}></div>
          </div>
          <div>
            <h2>Ipopo</h2>
            <p>作者的話
              <br/>
              <span>作者</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,3)}>
          <div>
            <div className={styles["RockerG"]}></div>
          </div>
          <div>
            <h2>搖桿雞</h2>
            <p>作者的話
              <br/>
              <span>作者</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,4)}>
          <div>
            <div className={styles["round"]}></div>
          </div>
          <div>
            <h2>圓子</h2>
            <p>圓子一顆軟綿綿的雲，最療育人心的是，他圓滾滾的身體， 朋友也都屬於圓滾滾系列的雲， 家裡有許多兄弟姊妹，是家裡的長女。
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
            <h2>帕帕克</h2>
              <p>以為自己很兇猛，但其實在他人眼中是個天然呆又可愛的男孩。帕帕克身上的披風本來是為了遮掩自己對恐龍身體的不自信，但是他發現......
              <br/>
              <span>作者</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,6)}>
          <div>
            <div className={styles["GflyDjump"]}></div>
          </div>
          <div>
            <h2>雞飛狗跳</h2>
            <p>作者的話
              <br/>
              <span>作者</span>
            </p>
          </div>
        </div>
        <div className={styles["imgBox"]} onClick={this.headleChange.bind(this,7)}>
          <div>
            <div className={styles["littlegirl"]}></div>
          </div>
          <div>
            <h2>小女孩</h2>
            <p>願賭服輸
              <br/>
              <span>作者</span>
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
            <h1>小男孩</h1>
            <p>作者的話</p>
            <p>作者</p>
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
            <p>作者的話</p>
            <p>作者</p>
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
            <h1>搖桿雞</h1>
            <p>作者的話</p>
            <p>作者</p>
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
            <h1>圓子</h1>
            <p>圓子一顆軟綿綿的雲，最療育人心的是，他圓滾滾的身體， 朋友也都屬於圓滾滾系列的雲， 家裡有許多兄弟姊妹，是家裡的長女。</p>
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
            <h1>帕帕克</h1>
            <p>以為自己很兇猛，但其實在他人眼中是個天然呆又可愛的男孩。帕帕克身上的披風本來是為了遮掩自己對恐龍身體的不自信，但是他發現......</p>
            <p>作者</p>
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
            <h1>雞飛狗跳</h1>
            <p>作者的話</p>
            <p>作者</p>
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
            <h1>小女孩</h1>
            <p>願賭服輸</p>
            <p>作者</p>
          </div>
        </div>
      )
    default:
      break;
  }
}