import './globals.css'
import { Providers } from "@redux/provider"
import Footer from "./components/marginals/footer"
import Titlebar from "./components/marginals/titlebar"
export const metadata = {
  title: 'Cronix Timer',
  description: 'The Next-Generation Timer, Powered by Next-Generation Software',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Titlebar />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
