'use client'
import React, { useState } from 'react'
import { Col, Input, Row, Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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
  // const queryClient = useQueryClient()
  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('https://dummyjson.com/products?limit=0')
      return data
    },
  })
  // console.log('data:', data)
  const tableData = data?.products
  return (
    <div>
      <Row>
        <Col span={8} offset={16}>
          <Input
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>
      <div style={{marginTop:"16px"}}>
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
