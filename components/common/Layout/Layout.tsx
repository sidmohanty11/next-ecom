import { FC } from "react"
import Footer from "../Footer"
import Navbar from "../Navbar"
import styles from "./Layout.module.css"
import { Sidebar } from "@components/ui"
import { CartSidebar } from "@components/cart"
import { useUI } from "@components/ui/context"

const Layout: FC = (props) => {
  const { isSidebarOpen, closeSidebar } = useUI()
  return (
    <div className={styles.root}>
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
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
