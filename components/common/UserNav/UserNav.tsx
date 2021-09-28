import s from "./UserNav.module.css"
import { FC } from "react"
import Link from "next/link"
import { Bag, Heart } from "@components/icons"
import { useUI } from "@components/ui/context"
import useCart from "@framework/cart/use-cart"
import { LineItem } from "@common/types/cart"

const UserNav: FC = () => {
  const { openSidebar } = useUI()
  const { data } = useCart()

  const itemsCount = data?.lineItems.reduce((count: number, item: LineItem) => {
    return count + item.quantity
  }, 0) ?? 0
  
  return (
    <nav>
      <ul className={s.list}>
      <li className={s.item}>
          <Bag onClick={openSidebar}/>
          { itemsCount > 0 &&
            <span className={s.bagCount}>
              { itemsCount }
            </span>
          }
        </li>
        <li className={s.item}>
          <Link href="/wishlist"><a><Heart /></a></Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
