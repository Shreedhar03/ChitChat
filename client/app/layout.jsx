import ContextProvider, { ChatContext } from './Context/ChatContext'
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'ChitChat',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
