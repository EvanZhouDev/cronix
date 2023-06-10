import './globals.css'
import { Providers } from "@redux/provider"
import Footer from "./components/marginals/footer"
import Titlebar from "./components/marginals/titlebar"
import { Toaster } from 'react-hot-toast';
import { Fira_Code } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import dev from './utils/dev';

let preview = process.env.VERCEL_ENV
let title = "Cronix Timer"
if (dev) title = "Cronix Dev"
else if (preview === "preview") title = "Cronix Nightly Build"

export const metadata = {
  title: title,
  description: 'The Next-Generation Timer, Powered by Next-Generation Software',
}

const firacode = Fira_Code({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {


  return (
    <html lang="en" className={firacode.className}>
      <body>
        <Toaster position="top-right" />
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
