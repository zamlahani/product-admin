import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('https://dummyjson.com/products?limit=0')
      return data
    },
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get('https://dummyjson.com/products/categories')
      return data
    },
  })
}
