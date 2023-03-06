import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import Script from 'next/script'
import Layout from '@/layout/Layout'

const inter = Inter({ subsets: ['latin'], weight: ["400","500","600","700"],variable: "--font-inter"  })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Script 
         dangerouslySetInnerHTML={{
          __html: `// Check for preferred theme in local storage
          let preferredTheme = localStorage.getItem('prefers-dark');

          // Set the theme based on the value in local storage
          if (preferredTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }`
         }}
         strategy="beforeInteractive"
      /> */}
    
     <div className={`${inter.variable} font-sans`}>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </div>
    </>
  )
}
