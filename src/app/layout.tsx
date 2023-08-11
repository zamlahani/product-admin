import StyledComponentsRegistry from '@/lib/AntdRegistry'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'E-commerce admin dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
