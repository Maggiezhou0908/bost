import './globals.css'
import type {ReactNode} from 'react'
import {Toaster} from 'react-hot-toast'


export const metadata = {
  title: 'Boost',
  description: 'With AI e-commerce operation tool',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="h-full">
    <body className={'h-full'}>
      <>
        {children}
        <Toaster/>
      </>
    </body>
    </html>
  )
}
