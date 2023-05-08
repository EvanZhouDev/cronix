import './globals.css'
import { Providers } from "@redux/provider"
import Footer from "./components/marginals/footer"
import Titlebar from "./components/marginals/titlebar"
export const metadata = {
  title: 'Cronix Timer',
  description: 'The Next-Generation Timer, Powered by Next-Generation Software',
}
import { Fira_Code } from 'next/font/google'

const firacode = Fira_Code({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={firacode.className}>
      <body>
        <Providers>
          <Titlebar />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
