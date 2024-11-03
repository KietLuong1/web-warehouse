import { Column, Pie } from '@ant-design/charts'
import { Grid } from '@mui/material'
import React from 'react'

const Dashboard: React.FC = () => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let chart

  return (
    <Grid container m={2} gap={2}>
      <Grid item xs={6}>
        <Column {...config} />
      </Grid>
      <Grid item xs={6}>
        <Pie {...config} />
      </Grid>
    </Grid>
  )
}
export default Dashboard
