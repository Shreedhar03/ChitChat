import ContextProvider, { ChatContext } from './Context/ChatContext'
import './globals.css'
import { Poppins } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import 'primeicons/primeicons.css';
const montserrat = Poppins({ subsets: ['latin'] ,weight: ["400", "500", "600", "700", "800", "900"]})

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
            <NextTopLoader color='#1c274c' showSpinner={false} initialPosition={0.2}/>
            {children}
          </ContextProvider>
        </div>
      </body>
    </html>
  )
}
