import React from 'react'
import Grid from '@mui/material/Grid'
import { useGetAccountDetail } from '../../queries/Account/useGetAccountDetail'
import SettingsCard from './SettingCard'
import { Spin } from 'antd'

const Profile: React.FC = () => {
  const userId = Number(localStorage.getItem('userId') || 0)

  const { data: account, isFetching } = useGetAccountDetail(userId, {
    enabled: !!userId,
    queryKey: ['user', userId]
  })

  if (isFetching) {
    return <Spin tip='Loading profile…' />
  }
  if (!account) {
    return <div>Unable to load your profile.</div>
  }

  return (
    <Grid container spacing={3} sx={{ p: 1, minHeight: '100vh' }}>
      <Grid item xs={12} md={12}>
        <SettingsCard account={account} />
      </Grid>
    </Grid>
  )
}

export default Profile
