import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import Script from 'next/script'
import Layout from '@/layout/Layout'

const inter = Inter({ subsets: ['latin'], weight: ["400","500","600","700"],variable: "--font-inter"  })


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page) => page)
  
  return (
    <>
      <Script 
         id="first-script"
         dangerouslySetInnerHTML={{
          __html: `// Check for preferred theme in local storage  
          console.log("asdasd");
          if(typeof prefersDark == "undefined") {
            const prefersDark = JSON.parse(localStorage.getItem("prefers-dark"))

            // Set the theme based on the value in local storage
            if (prefersDark === true) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          }
          `
         }}
      />
    
     <div className={`${inter.variable} font-sans p-2`}>
        <SessionProvider session={pageProps.session}>
          {
            getLayout(
              <Component {...pageProps} />
            )
          }
        </SessionProvider>
      </div>
    </>
  )
}
