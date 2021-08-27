import s from "./Marquee.module.css"
import { FC, ReactNode } from "react"
import Ticker from "react-ticker"
import cn from "classnames"

interface Props {
  children: ReactNode[]
  variant?: "primary" | "secondary"
}

const Marquee: FC<Props> = ({children, variant = "primary"}) => {
  const rootClasses = cn(
    s.root,
    {
      [s.secondary]: variant === "secondary"
    }
  )
  return (
    <div className={rootClasses}>
      <Ticker>
        {() => (
          <div className={s.container}>
            {children}
          </div>
        )}
      </Ticker>
      
    </div>
  )
}

export default Marquee
