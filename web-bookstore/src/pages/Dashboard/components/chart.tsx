import { Column } from '@ant-design/charts'
import { Card, CardContent } from '@mui/material'
import React from 'react'

const Chart: React.FC = () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 }
  ]

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    width: 800,
    height: 400,
    autoFit: false,
    xField: 'year',
    yField: 'value',
    color: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864'],
    point: {
      size: 5,
      shape: 'diamond'
    },
    label: {
      type: 'outer',
      content: '{name} {percentage}'
    },
    interactions: [
      {
        type: 'pie-legend-active'
      },
      {
        type: 'element-active'
      }
    ]
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Column {...config} />
      </CardContent>
    </Card>
  )
}
export default Chart
