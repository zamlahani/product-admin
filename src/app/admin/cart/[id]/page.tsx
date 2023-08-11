'use client'
import React from 'react'
import { Table, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Descriptions, { DescriptionsProps } from 'antd/es/descriptions'
import { Currency, NumericNumber } from '@/components'
import { ColumnType } from 'antd/es/table'
// import Link from 'next/link'

const { Title } = Typography

const Page = ({ params }: { params: { id: string } }) => {
  const columns: ColumnType<any>[] = [
    {
      title: 'Product Name',
      dataIndex: 'title',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'right',
      render: (val: any) => <NumericNumber value={val} />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'right',
      render: (val: any) => <Currency value={val} />,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'right',
      render: (val: any) => <Currency value={val} />,
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discountPercentage',
      align: 'right',
      render: (val: any) => <NumericNumber value={val} />,
    },
    {
      title: 'Discounted Price',
      dataIndex: 'discountedPrice',
      align: 'right',
      render: (val: any) => <Currency value={val} />,
    },
  ]
  // const queryClient = useQueryClient()
  const { isLoading, data, error } = useQuery({
    queryKey: ['cart', params.id],
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
      children: <NumericNumber value={data?.totalQuantity} />,
    },
    {
      key: '3',
      label: 'Added On',
      children: '-',
    },
    {
      key: '4',
      label: 'Total Amount',
      children: <Currency value={data?.discountedTotal} />,
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
            <div style={{ marginTop: '16px' }}>
              <Table columns={columns} dataSource={data?.products} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
