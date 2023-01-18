import React, { Component } from "react"
import styles from "./goTop.module.scss"
import toTOP from "./ToTop.svg"

export default class goTop extends Component {
  render() {
    return (
      <div>
        <ScollBtn scrollStepInPx="50" delayInMs={2.66} />
      </div>
    )
  }
}

class ScollBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      intervalId: 0,
      listen: 0,
    }
    // this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    try {
      window.addEventListener("scroll", this.handleScroll, false)
    } catch (error) {}
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, false)
  }

  handleScroll = () => {
    let scroll = window.pageYOffset
    this.setState({
      listen: scroll,
    })
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId)
    }

    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
  }

  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    )
    this.setState({
      intervalId: intervalId,
    })
  }

  render() {
    const { listen } = this.state
    return (
      <div
        className={`${styles.scollBtn} ${
          listen > 300 ? `${styles.scollBtnShow}` : ""
        }`}
        onClick={() => {
          this.scrollToTop()
        }}
      >
        <img src={toTOP} alt="toTOP" />
      </div>
    )
  }
}
