import { FC } from "react"
import { Container } from "@components/ui"
import Link from "next/link"
import s from "./Navbar.module.css"

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
                Men&apos;s Essentials
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </Container>
  )
}

export default Navbar