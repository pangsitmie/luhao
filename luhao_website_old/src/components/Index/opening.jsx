import React from "react"
import styles from "./opening.module.scss"

const opening = props => (
  <div className={styles["opening"]} data-opening-number={props.number}>
    <div className={styles["opening_left"]}>
      {!!props.left && props.left}
    </div>
    <div className={styles["opening_right"]}>
      {!!props.right && props.right}
    </div>
    <div className={styles["container"]}>
      <div className={styles["chevron"]} />
      <div className={styles["chevron"]} />
    </div>
  </div>
)

export default opening
