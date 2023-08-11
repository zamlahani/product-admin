"use client"
import StyledComponentsRegistry from '@/lib/AntdRegistry'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

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
