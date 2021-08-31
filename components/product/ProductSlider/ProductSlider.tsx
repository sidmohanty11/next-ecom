import s from "./ProductSlider.module.css"
import { FC } from "react"

const ProductSlider: FC = ({ children }) => {
  return (
    <div className={s.root}>
      <div className="h-full transition-opacity">
        {children}
      </div>
    </div>
  )
}

export default ProductSlider
