import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'], weight: ["400","500","600","700"],variable: "--font-inter"  })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>
  </div>
  )
}
