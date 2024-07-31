import './globals.css'
import type {ReactNode} from 'react'
import {Toaster} from 'react-hot-toast'
import Head from "next/head";


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
    <Head>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Logo.671a2d4d.jpeg"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Logo-1.1af157fb.jpeg"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Logo-2.d1e6c5d9.jpeg"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Logo-3.8cf243e3.jpeg"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Logo-4.8a74a330.jpeg"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Logo-5.f0513c7c.jpeg"/>
      <link rel="preload" as="image" href="https://bost.qdkf.net/_next/static/media/Logo-6.a7c1f127.jpeg"/>
    </Head>
    <body className={'h-full'}>
    <>
      {children}
        <Toaster/>
      </>
    </body>
    </html>
  )
}
