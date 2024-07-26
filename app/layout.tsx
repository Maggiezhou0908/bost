import './globals.css'
import type {ReactNode} from 'react'

export const metadata = {
  title: 'Vercel Blob Starter',
  description: 'A simple Next.js app with Vercel Blob for image uploads',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-zinc-100/60">
      <body className={'h-full'}>{children}</body>
    </html>
  )
}
