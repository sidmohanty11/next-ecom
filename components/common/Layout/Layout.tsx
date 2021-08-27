import { FC } from "react"
import Footer from "../Footer"
import Navbar from "../Navbar"
import styles from "./Layout.module.css" 

const Layout: FC = (props) => {
  return (
    <div className={styles.root}>
      <Navbar />
      <main className="fit">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
