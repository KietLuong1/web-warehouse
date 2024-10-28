import React from 'react'
import ChipStatus, {CustomChipStatus} from '../../components/ChipStatus'

function Dashboard() {
  return <div>This is dashboard
    <ChipStatus status={CustomChipStatus.InProgress} />
    <ChipStatus status={CustomChipStatus.Active} />
    <ChipStatus status={CustomChipStatus.Inactive} />
    <ChipStatus status={CustomChipStatus.Closed} />
  </div>
}

export default Dashboard
