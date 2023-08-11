'use client'
import React from 'react'
import { Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'

const Page = () => {
  const columns = [
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
    },
    {
      title: 'Total Qty.',
      dataIndex: 'totalQuantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Discounted Total',
      dataIndex: 'discountedTotal',
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
  const tableData = data?.carts
  return (
    <div>
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
