import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import PieChart from './pieChart'
import Chart from './chart'
import Table from './table'
import StatCard, { StatCardProps } from './statCard'
import Typography from '@mui/material/Typography'
import SessionsChart from './sessionsChart'
import PageViewsBarChart from './pageViewsBarChart'
import ReportCard from './reportCard'

function Item({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: 'grey.200',
        textAlign: 'center',
        borderRadius: 1,
        width: '100%'
      }}
    >
      {children}
    </Box>
  )
}

const data: StatCardProps[] = [
  {
    title: 'Inventory',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380, 360, 400, 380, 420, 400, 640, 340,
      460, 440, 480, 460, 600, 880, 920
    ]
  },
  {
    title: 'Consignment',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820, 780, 800, 760, 380, 740, 660, 620,
      840, 500, 520, 480, 400, 360, 300, 220
    ]
  },
  {
    title: 'Transactions',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530, 520, 610, 530, 520,
      610, 530, 420, 510, 430, 520, 510
    ]
  }
]

export default function MainStack() {
  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        maxWidth: '1700px',
        margin: '0 auto',
        paddingX: 2
      }}
    >
      <Typography component='h2' variant='h5' sx={{ mb: 2 }}>
        Overview
      </Typography>

      <Stack direction='row' spacing={2}>
        {data.map((card, index) => (
          <Item key={index}>
            <StatCard {...card} />
          </Item>
        ))}
        <Item>
          <ReportCard />
        </Item>
      </Stack>

      <Stack direction='row' spacing={2}>
        <Item>
          <SessionsChart />
        </Item>
        <Item>
          <PageViewsBarChart />
        </Item>
      </Stack>

      <Stack direction='row' spacing={2}>
        <Item>
          <PieChart />
        </Item>
        <Item>
          <Chart />
        </Item>
      </Stack>

      <Table />
    </Stack>
  )
}
