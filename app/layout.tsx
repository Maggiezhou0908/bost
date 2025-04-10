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
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Property%201=Frame%201.33996d24.png"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Property%201=Frame%202.c7ffb5af.png"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Property%201=Frame%203.7255d0a6.png"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Property%201=Frame%204.25bf89ee.png"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Property%201=Frame%205.cce93598.png"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Property%201=Frame%206.b6d8c69e.png"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Property%201=Frame%207.d41f9cfc.png"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Property%201=Frame%208.3218982f.png"/>
    </head>
    <body className={'h-full'}>
    <>
      {children}
        <Toaster/>
      </>
      <script defer src="https://umami.qdkf.net/script.js" data-website-id="41153c60-a307-4987-a01e-c17a1433cfcb"></script>
    </body>
    </html>
  )
}
