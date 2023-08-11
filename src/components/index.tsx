import React from 'react'
import { NumericFormat } from 'react-number-format'

export const NumericNumber = ({ value }: { value: any }) => {
  return <NumericFormat value={value} displayType="text" thousandSeparator />
}

export const Currency = ({ value }: { value: any }) => {
  return <NumericFormat value={value} displayType="text" prefix="$" thousandSeparator />
}
