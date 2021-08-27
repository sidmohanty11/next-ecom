import { FC } from "react"
import { Container } from "@components/ui"
import Link from "next/link"
import s from "./Navbar.module.css"
import UserNav from "../UserNav"

const Navbar: FC = () => {
  return (
    <Container>
      <div className={s.root}>
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a className={s.logo}>
              NextEcom
            </a>
          </Link>
          <nav className="ml-6 space-x-6">
            <Link href="/">
              <a className={s.link}>
                All
              </a>
            </Link>
            <Link href="/">
              <a className={s.link}>
                Clothes
              </a>
            </Link>
            <Link href="/">
              <a className={s.link}>
                Accessories
              </a>
            </Link>
            <Link href="/">
              <a className={s.link}>
                Shoes
              </a>
            </Link>
          </nav>
          <div className="flex flex-1 justify-end">
            <UserNav />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Navbar