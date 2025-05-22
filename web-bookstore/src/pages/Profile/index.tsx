import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import SettingsCard from './SettingCard'
import axiosAccount from '../../configs/services/http'

interface UserInformation {
  userId: string
  name: string
  username: string
  email: string
  password: string
  role: string
}

const Profile = () => {
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null)

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId')
        if (userId) {
          const response = await axiosAccount.get(`user/${userId}`)
          setUserInformation(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch user information', error)
      }
    }

    fetchUserInformation()
  }, [])

  if (!userInformation) {
    return <div>Loading...</div>
  }

  return (
    <Grid container spacing={3} sx={{ p: 1, minHeight: '100vh' }}>
      <Grid item xs={12} md={12}>
        <SettingsCard userInformation={userInformation} setUserInformation={setUserInformation} />
      </Grid>
    </Grid>
  )
}

export default Profile
