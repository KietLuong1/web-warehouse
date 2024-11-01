import React from 'react'
import ChipStatus, { CustomChipStatus } from '../../components/ChipStatus'
import { Toastify } from '../../components/Toastify'
import Button from '@mui/material/Button';

function Dashboard() {
  return <div>This is dashboard
    <ChipStatus status={CustomChipStatus.InProgress} />
    <ChipStatus status={CustomChipStatus.Active} />
    <ChipStatus status={CustomChipStatus.Inactive} />
    <ChipStatus status={CustomChipStatus.Closed} />

    <Button variant="contained" onClick={() => Toastify('success', "test")}>success</Button>
    <Button variant="contained" onClick={() => Toastify('error', "test")}>error</Button>
    <Button variant="contained" onClick={() => Toastify('info', "test")}>info</Button>
    <Button variant="contained" onClick={() => Toastify('warning', "test")}>warning</Button>
    <Button variant="contained" onClick={() => Toastify('default', "test")}>default</Button>
  </div>
}

export default Dashboard
