'use client'
import { useProducts } from '@/service'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Typography } from 'antd'
import randomColor from 'randomcolor'
// import {UseQueryResult} from "@tanstack/react-query"

ChartJS.register(ArcElement, Tooltip, Legend)

type Product = {
  brand: string
  stock: number
}

const { Title } = Typography

const Page = () => {
  const { isLoading, data, error } = useProducts()
  const { products }: { products: Product[] } = data || { products: [] }
  // console.log('products:', products)
  const brands = [...new Set<string>(products.map((val: Product) => val.brand))]

  const datasetsData = brands.map((brand) => {
    return products.reduce((prev, cur) => {
      return cur.brand === brand ? prev + cur.stock : prev
    }, 0)
  })
  return (
    <div>
      <Title>Products Overview</Title>
      {isLoading ? (
        'Loading Products Data'
      ) : error ? (
        <>{error}</>
      ) : (
        <Doughnut
          data={{
            labels: brands,
            datasets: [
              {
                label: 'Stock',
                data: datasetsData,
                backgroundColor: randomColor({
                  count: 100,
                }),
                hoverOffset: 4,
              },
            ],
          }}
        />
      )}
    </div>
  )
}

export default Page
