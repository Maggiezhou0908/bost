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
    <head>
      <link rel="preload" as="image" href="../public/index/Logo.jpeg"/>
      <link rel="preload" as="image" href="../public/index/Logo-1.jpeg"/>
      <link rel="preload" as="image" href="../public/index/Logo-2.jpeg"/>
      <link rel="preload" as="image" href="../public/index/Logo-3.jpeg"/>
      <link rel="preload" as="image" href="../public/index/Logo-4.jpeg"/>
      <link rel="preload" as="image" href="../public/index/Logo-5.jpeg"/>
      <link rel="preload" as="image" href="../public/index/Logo-6.jpeg"/>
    </head>
    <body className={'h-full'}>
    <>
      {children}
        <Toaster/>
      </>
    </body>
    </html>
  )
}
