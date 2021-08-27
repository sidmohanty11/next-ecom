import s from "./Marquee.module.css"
import { FC, ReactNode } from "react"
import Ticker from "react-ticker"

interface Props {
  children: ReactNode[]
}

const Marquee: FC<Props> = ({children}) => {
  return (
    <div className={s.root}>
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
