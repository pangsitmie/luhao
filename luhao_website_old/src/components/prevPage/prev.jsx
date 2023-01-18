import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./prev.module.scss"
// import back from "./back.svg"
import { globalHistory } from "@reach/router"

export default class prev extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listen: 0,
      url: globalHistory.location.pathname.split("/", 2)[1],
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    try {
      window.addEventListener("scroll", this.handleScroll, true)
    } catch (error) {}
  }
  handleScroll() {
    let scroll = window.pageYOffset
    this.setState({
      listen: scroll,
    })
  }

  render() {
    const { listen, url } = this.state

    return (
      <div
        className={`${styles.back} ${listen > 300 ? `${styles.backShow}` : ""}`}
      >
        <Link to={(url === "es" || url === "en-us" ? url : "") + "/machine/"}>
          ↵
        </Link>
      </div>
    )
  }
}
