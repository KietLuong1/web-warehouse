// IMPORTS
import Grid from '@mui/material/Grid'
import { useState } from 'react'
// import './styles.css'

// FONTS
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import ProfileCard from './ProfileCard'
import SettingsCard from './SettingCard'

// STYLE & THEME
// const theme = createTheme({
//   palette: {
//     primary: { main: '#6200ee' },
//     secondary: { main: '#9c27b0' }
//   }
// })

// APP
const AccountInformation = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [text, setText] = useState('')

  const mainUser = {
    // DEFAULT VALUES
    title: 'CEO of Apple',
    dt1: 32,
    dt2: 40,
    dt3: 50,
    firstName: 'Joe',
    lastName: 'Doe',
    midName: 'Baker',
    gender: 'female',
    phone: '932-555-4247',
    email: 'janedoe@gmail.com',
    pass: 'password123'
  }

  const fullName = `${mainUser.firstName} ${mainUser.lastName}`

  return (
    <Grid
      container
      spacing={3}
      sx={{
        p: 1,
        // px: 1.5,
        // py: 2,
        minHeight: '100vh'
      }}
    >
      {/* Profile Card */}
      <Grid item xs={12} md={3}>
        <ProfileCard name={fullName} sub={mainUser.title} />
      </Grid>

      {/* Settings Card */}
      <Grid item xs={12} md={12}>
        <SettingsCard
          // expose={(v: SetStateAction<string>) => setText(v)}
          firstName={mainUser.firstName}
          lastName={mainUser.lastName}
          midName={mainUser.midName}
          phone={mainUser.phone}
          email={mainUser.email}
          pass={mainUser.pass}
          gender={mainUser.gender}
        />
      </Grid>
    </Grid>
  )
}

export default AccountInformation
