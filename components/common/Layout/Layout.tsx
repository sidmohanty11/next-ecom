import { FC } from "react"
import Footer from "../Footer"
import Navbar from "../Navbar"
import styles from "./Layout.module.css"
import { Sidebar } from "@components/ui"
import { CartSidebar } from "@components/cart"

const Layout: FC = (props) => {
  return (
    <div className={styles.root}>
      <Navbar />
      <Sidebar>
        <CartSidebar />
      </Sidebar>
      <main className="fit">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
