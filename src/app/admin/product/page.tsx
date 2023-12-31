'use client'
import React, { useState } from 'react'
import { Button, Col, Input, Row, Select, Slider, Table, Typography } from 'antd'
import { useCategories, useProducts } from '@/service'
import useLocalStorage from 'use-local-storage'
import { Currency, NumericNumber } from '@/components'
import { ColumnType } from 'antd/es/table'

const { Title } = Typography

type Product = {
  brand: string
  stock: number
  price: number
  title: string
  category: string
  id: number
}

type Range = [number, number]

const Page = () => {
  const columns: ColumnType<Product>[] = [
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
      align: 'right',
      render: (val: any) => <Currency value={val} />,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      align: 'right',
      render: (val: any) => <NumericNumber value={val} />,
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
  ]
  const initialPriceRange: Range = [0, 10000]
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '')
  const [selectedBrand, setSelectedBrand] = useLocalStorage('selectedBrand', '')
  const [priceRange, setPriceRange] = useLocalStorage<Range>('priceRange', initialPriceRange)
  const [selectedCategory, setSelectedCategory] = useLocalStorage('selectedCategory', '')
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
    .map((val) => ({ ...val, key: val.id }))

  const maxPrice = Math.max(...products.map((val) => val.price))

  return (
    <div>
      <Title>Products</Title>
      <Row gutter={[16, 16]} justify={'end'}>
        <Col xs={{ span: 24 }} md={{ span: 8, offset: 16 }}>
          <Input
            placeholder="Search Product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Typography.Text>Brand :</Typography.Text>
          <Select
            style={{ width: '100%' }}
            onChange={(val) => setSelectedBrand(val)}
            value={selectedBrand}
            options={brands.map((val) => ({ label: val, value: val }))}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Typography.Text>Price Range :</Typography.Text>
          <Slider
            range
            min={0}
            max={maxPrice}
            defaultValue={[0, maxPrice]}
            onChange={onChangeSlider}
            value={priceRange}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Typography.Text>Category :</Typography.Text>
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
