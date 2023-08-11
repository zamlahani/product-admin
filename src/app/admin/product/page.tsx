'use client'
import React, { useState } from 'react'
import { Button, Col, Input, Row, Select, Slider, Table, Typography } from 'antd'
import { useCategories, useProducts } from '@/service'

const { Title } = Typography

type Product = {
  brand: string
  stock: number
  price: number
  title: string
  category: string
}

type Range = [number, number]

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
  const initialPriceRange: Range = [0, 10000]
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [priceRange, setPriceRange] = useState<Range>(initialPriceRange)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [appliedFilter, setAppliedFilter] = useState<{
    searchQuery?: string
    selectedBrand?: string
    priceRange: Range
    selectedCategory?: string
  }>({ priceRange: initialPriceRange })
  const { isLoading, data, error } = useProducts()
  const {
    // isLoading: isLoadingCategories,
    data: dataCategories,
    // error: errorCategories,
  } = useCategories()
  // console.log('data:', data)
  const { products }: { products: Product[] } = data || { products: [] }
  // console.log('products:', products)
  const brands = [...new Set<string>(products.map((val: Product) => val.brand))]

  const onChangeSlider = (val: Range) => {
    setPriceRange(val)
  }

  const handleClickApply = () => {
    setAppliedFilter({ searchQuery, selectedBrand, priceRange, selectedCategory })
  }

  const filteredProducts = products
    .filter((val) => {
      return appliedFilter.searchQuery
        ? val.title.toLowerCase().includes(appliedFilter.searchQuery)
        : val
    })
    .filter((val) => {
      return appliedFilter.selectedBrand ? val.brand === appliedFilter.selectedBrand : val
    })
    .filter((val) => {
      return appliedFilter.selectedCategory ? val.category === appliedFilter.selectedCategory : val
    })
    .filter((val) => {
      const [min, max] = appliedFilter.priceRange
      return min <= val.price && val.price <= max
    })

  const maxPrice = Math.max(...products.map((val) => val.price))

  return (
    <div>
      <Title>Products</Title>
      <Row gutter={[16, 16]} justify={'end'}>
        <Col span={8} offset={16}>
          <Input
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Typography>Brand :</Typography>
          <Select
            style={{ width: '100%' }}
            onChange={(val) => setSelectedBrand(val)}
            value={selectedBrand}
            options={brands.map((val) => ({ label: val, value: val }))}
          />
        </Col>
        <Col span={8}>
          <Typography>Price Range :</Typography>
          <Slider
            range
            min={0}
            max={maxPrice}
            defaultValue={[0, maxPrice]}
            onChange={onChangeSlider}
            value={priceRange}
          />
        </Col>
        <Col span={8}>
          <Typography>Category :</Typography>
          <Select
            style={{ width: '100%' }}
            onChange={(val) => setSelectedCategory(val)}
            value={selectedCategory}
            options={
              dataCategories ? dataCategories.map((val: any) => ({ label: val, value: val })) : []
            }
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleClickApply}>
            Apply
          </Button>
        </Col>
      </Row>
      <div style={{ marginTop: '16px' }}>
        {isLoading ? (
          'Loading Table Data'
        ) : error ? (
          <>{error}</>
        ) : (
          <Table columns={columns} dataSource={filteredProducts} />
        )}
      </div>
    </div>
  )
}

export default Page
