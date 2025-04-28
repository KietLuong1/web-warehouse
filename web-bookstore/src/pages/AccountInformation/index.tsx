import Grid from '@mui/material/Grid'
import { useState } from 'react'

import SettingsCard from './SettingCard'

const AccountInformation = () => {

  const userInformation = {
    userId: '01',
    name: 'Admin',
    username: 'admin',
    email: 'admin@gmail.com',
    password: '',
    role: 'Admin',
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        p: 1,
        minHeight: '100vh'
      }}
    >
      {/* Settings Card */}
      <Grid item xs={12} md={12}>
        <SettingsCard
          userId={userInformation.userId}
          name={userInformation.name}
          username={userInformation.username}
          email={userInformation.email}
          password={userInformation.password}
          role={userInformation.role}
        />
      </Grid>
    </Grid>
  )
}

export default AccountInformation
