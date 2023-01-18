import React, { Component } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MobileOrNot from "../components/MobileOrNot"
// import POHTO from "../images/sixth.JPG"
// import Videoo from "../images/homepageeffect03.mp4"
import Web_page from "../images/index/index_page_web.png"
import Index_page from "../images/index/index_page.png"
import "./index.scss"

export default class Index extends Component {
  _isMounted = false

  state = {
    mobile: false,
  }

  componentDidMount() {
    try {
      this._isMounted = true
      if (this._isMounted) {
        if (MobileOrNot()) this.setState({ mobile: true })
        else this.setState({ mobile: false })
        window.addEventListener("resize", () => {
          if (MobileOrNot()) this.setState({ mobile: true })
          else this.setState({ mobile: false })
        })
      }
      document.querySelector("video").addEventListener("click", function() {
        if (this !== null) {
          if (this.paused) this.play()
          else this.pause()
        }
      })
    } catch (error) {}
  }

  componentWillMount() {
    this._isMounted = false
  }

  render() {
    return (
      <Layout>
        <SEO title="首頁" keywords={[`luhao`, `陸豪`, `娃娃機`]} />
        {this.state.mobile ? (
          <img className="Index_img" src={Index_page} alt="Index_page" />
        ) : (
          <img className="Index_img" src={Web_page} alt="Index_page" />
          // <video autoPlay loop playsInline muted>
          //   <source src={Videoo} type="video/mp4" />
          // </video>
        )}
      </Layout>
    )
  }
}
