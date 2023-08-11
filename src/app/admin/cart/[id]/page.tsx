'use client'
import React from 'react'
import { Table, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Descriptions, { DescriptionsProps } from 'antd/es/descriptions'
// import Link from 'next/link'

const { Title } = Typography

const Page = ({ params }: { params: { id: string } }) => {
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'title',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discountPercentage',
    },
    {
      title: 'Discounted Price',
      dataIndex: 'discountedPrice',
    },
  ]
  // const queryClient = useQueryClient()
  const { isLoading, data, error } = useQuery({
    queryKey: ['cart',params.id],
    queryFn: async () => {
      const { data } = await axios.get(`https://dummyjson.com/carts/${params.id}`)
      return data
    },
  })
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'User',
      children: data?.userId,
    },
    {
      key: '2',
      label: '# of Items',
      children: data?.totalQuantity,
    },
    {
      key: '3',
      label: 'Added On',
      children: '-',
    },
    {
      key: '4',
      label: 'Total Amount',
      children: data?.discountedTotal,
    },
  ]
  return (
    <div>
        <Title>Cart {params.id}</Title>
      <div>
        {isLoading ? (
          'Loading Cart Data...'
        ) : error ? (
          <>{error}</>
        ) : (
          <>
              <Descriptions title="Details" bordered items={items} column={2} />
            <div style={{marginTop: "16px"}}>
            <Table columns={columns} dataSource={data?.products} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
