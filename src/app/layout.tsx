"use client"
import StyledComponentsRegistry from '@/lib/AntdRegistry'
import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'E-commerce admin dashboard',
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </SessionProvider>
      </body>
    </html>
  )
}
