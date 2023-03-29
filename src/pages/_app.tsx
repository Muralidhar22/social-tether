import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { useEffect } from "react";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import Script from 'next/script'
import { Toaster } from "react-hot-toast"

import { SessionUserProvider } from '@/context/SessionUser';
import { authenticatedRoute } from '@/utils/redirection';

const inter = Inter({ subsets: ['latin'], weight: ["400","500","600","700"],variable: "--font-inter"  })


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const sessionUserId = pageProps.sessionUserId

  return (
    <>
      <Script 
         id="first-script"
         dangerouslySetInnerHTML={{
          __html: `// Check for preferred theme in local storage  
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
     <div className={`${inter.variable} font-sans min-h-screen`}>
      <Toaster />
          <SessionUserProvider sid={sessionUserId ?? ""} >
            {
              getLayout(
                <Component {...pageProps} />
                )
              }
          </SessionUserProvider>
      </div>
    </>
  )
}
