'use client'
import React from 'react'
import { Table, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { Currency, NumericNumber } from '@/components'
import { ColumnType } from 'antd/es/table'

const { Title } = Typography

const Page = () => {
  const columns: ColumnType<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id: number) => <Link href={`/admin/cart/${id}`}>{id}</Link>,
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
    {
      title: 'Total Products',
      dataIndex: 'totalProducts',
      align: 'right',
      render: (val: any) => <NumericNumber value={val} />,
    },
    {
      title: 'Total Qty.',
      dataIndex: 'totalQuantity',
      align: 'right',
      render: (val: any) => <NumericNumber value={val} />,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'right',
      render: (val: any) => <Currency value={val} />,
    },
    {
      title: 'Discounted Total',
      dataIndex: 'discountedTotal',
      align: 'right',
      render: (val: any) => <Currency value={val} />,
    },
  ]
  // const queryClient = useQueryClient()
  const { isLoading, data, error } = useQuery({
    queryKey: ['carts'],
    queryFn: async () => {
      const { data } = await axios.get('https://dummyjson.com/carts?limit=0')
      return data
    },
  })
  // console.log('data:', data)
  const tableData = data?.carts.map((val: any) => ({ ...val, key: val.id }))
  return (
    <div>
      <Title>Carts</Title>
      <Link href={'/admin/product'}>product</Link>
      <div>
        {isLoading ? (
          'Loading Cart Table Data'
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
