'use client'
import React, { useState } from 'react'
import { Col, Input, Row, Table, Typography } from 'antd'
import { useProducts } from '@/service'

const { Title } = Typography

const Page = () => {
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
  ]
  const [searchQuery, setSearchQuery] = useState('')
  const { isLoading, data, error } = useProducts()
  // console.log('data:', data)
  const tableData = data?.products
  return (
    <div>
      <Title>Products</Title>
      <Row>
        <Col span={8} offset={16}>
          <Input
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>
      <div style={{ marginTop: '16px' }}>
        {isLoading ? (
          'Loading Table Data'
        ) : error ? (
          <>{error}</>
        ) : (
          <Table columns={columns} dataSource={tableData} />
        )}
      </div>
    </div>
  )
}

export default Page
