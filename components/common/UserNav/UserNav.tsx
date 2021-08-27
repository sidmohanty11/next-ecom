import s from "./UserNav.module.css"
import { FC } from "react"
import Link from "next/link"
import { Bag, Heart } from "@components/icons"

const UserNav: FC = () => {
  return (
    <nav>
      <ul className={s.list}>
        <li className={s.item}>
          <Link href="/"><a><Bag /></a></Link>
        </li>
        <li className={s.item}>
          <Link href="/"><a><Heart /></a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
