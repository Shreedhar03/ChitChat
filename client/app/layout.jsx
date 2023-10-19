import ContextProvider, { ChatContext } from './Context/ChatContext'
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'ChitChat',
  description: 'Messaging App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="../manifest.json" />
      <link rel="shortcut icon" href="Assets/logo.svg" type="image/x-icon" />
      <body className={montserrat.className}>
        <div id="root" className='max-w-[450px] mx-auto'>
          <ContextProvider>
            {children}
          </ContextProvider>
        </div>
      </body>
    </html>
  )
}
