import { FC } from "react"

const Layout: FC = (props) => {
  return (
    <div className="layout">
      {props.children}
    </div>
  )
}

export default Layout
