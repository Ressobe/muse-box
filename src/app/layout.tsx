import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Muse Box',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">  
      <link rel="icon" type="image/x-icon" href="/favicon.png"/>
      <body>
        {children}
      </body>
    </html>
  )
}
