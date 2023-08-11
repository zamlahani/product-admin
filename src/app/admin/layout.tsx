'use client'

import React from 'react'
import { Layout, Menu, Typography } from 'antd'
import Link from 'next/link'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const { Header, Content, Sider } = Layout

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const menuItems = [
    {
      key: 'product',
      label: <Link href={'/admin/product'}>Product</Link>,
    },
    {
      key: 'cart',
      label: <Link href={'/admin/cart'}>Cart</Link>,
    },
  ]
  return (
    <QueryClientProvider client={queryClient}>
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['product']} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0px', color: 'white', display: 'flex', alignItems: 'center' }}>
          <Typography style={{ marginLeft: '24px', color: 'white', fontSize: '24px' }}>
            Admin Dashboard
          </Typography>
        </Header>
        <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>{children}</Content>
      </Layout>
    </Layout>
        </QueryClientProvider>
  )
}

export default App
