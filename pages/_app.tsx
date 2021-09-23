import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'
import UIProvider from "@components/ui/context"
import { AppProps } from "next/app"
import { FC } from "react"

const Noop: FC = ({ children }) => {
  return <>{children}</>
}

export default function App({
  Component, pageProps
}: AppProps & { Component: { Layout: FC } }) {

  const Layout = Component.Layout ? Component.Layout : Noop

  return (
    <UIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
  )
}
