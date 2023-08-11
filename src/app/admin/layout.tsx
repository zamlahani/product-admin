'use client'

import React from 'react'
import { Layout, Menu, Typography } from 'antd'
import Link from 'next/link'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { useRouter } from "next/navigation"
// import { usePathname } from 'next/navigation'

const queryClient = new QueryClient()

const { Header, Content, Sider } = Layout

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const pathname = usePathname()
  // const router=useRouter()
  const menuItems = [
    {
      key: 'overview',
      pathname: '/admin/overview',
      label: 'Overview',
    },
    {
      key: 'product',
      pathname: '/admin/product',
      label: 'Product',
    },
    {
      key: 'cart',
      pathname: '/admin/cart',
      label: 'Cart',
    },
  ]
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems.map((val) => ({
              ...val,
              label: <Link key={val.key} href={val.pathname}>{val.label}</Link>,
            }))}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: '0px', color: 'white', display: 'flex', alignItems: 'center' }}>
            <Typography.Text style={{ marginLeft: '24px', color: 'white', fontSize: '24px' }}>
              Admin Dashboard
            </Typography.Text>
          </Header>
          <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
            {children}</Content>
        </Layout>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
