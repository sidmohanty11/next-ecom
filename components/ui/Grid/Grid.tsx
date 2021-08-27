import s from "./Grid.module.css"
import { FC, ReactNode } from "react"
import cn from "classnames"

interface Props {
  children: ReactNode[]
  layout?: "A" | "B"
}

const Grid: FC<Props> = ({children, layout = "A"}) => {
  const rootClassName = cn(
    s.r,
    {
      [s.layoutA]: layout === "A",
      [s.layoutB]: layout === "B",
    }
  )
  
  return (
    <div className={rootClassName}>
      {children}
    </div>
  )
}

export default Grid
