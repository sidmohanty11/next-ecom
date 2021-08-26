import { FC } from "react"
import styles from "./Layout.module.css" 

const Layout: FC = (props) => {
  return (
    <div className={styles.root}>
    <main className="fit">
      {props.children}
    </main>
    </div>
  )
}

export default Layout
