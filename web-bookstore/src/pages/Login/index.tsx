import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material'
import Image from 'material-ui-image'
import { IMAGES } from './../../configs/images'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ForgotPassword from './ForgotPassword'

const Login: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collapsed, setCollapsed] = useState(false)

  //
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      maxWidth='xs'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
    >
      <Box
        sx={{
          width: '100%',
          p: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          backgroundColor: '#fff'
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: collapsed ? 'column' : 'row'
          }}
        >
          <Image
            src={IMAGES.logo}
            style={{
              display: 'block',
              paddingTop: '2px',
              backgroundColor: 'transparent'
            }}
            imageStyle={{
              height: '45px',
              width: 'auto',
              position: 'relative',
              borderRadius: '30%'
            }}
            disableSpinner={true}
            disableTransition={true}
          />
          {!collapsed && (
            <Stack className='cmp-sidebar__heading-text'>
              <Typography color='#009DC3' fontWeight={700} variant='h5' fontFamily={'Poppins'}>
                WMS
              </Typography>
            </Stack>
          )}
        </Stack>

        <Typography fontWeight={600} variant='h4' fontFamily={'Poppins'} marginBottom={3}>
          Sign in
        </Typography>

        <Box component='form' noValidate sx={{ mt: 2 }}>
          {/* Email Input */}
          <TextField
            id='outlined-textarea'
            label='Email'
            placeholder='your@email.com'
            fullWidth
            sx={{
              mb: 2,
              fontFamily: 'Poppins',
              '& .MuiInputBase-input': { fontFamily: 'Poppins' },
              '& .MuiInputLabel-root': { fontFamily: 'Poppins' }
            }}
          />

          {/* Password Input */}
          <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
              sx={{ fontFamily: 'Poppins' }}
            />
          </FormControl>

          {/* Remember me and Forgot password */}
          <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mb: 2 }}>
            <Box display='flex' alignItems='center'>
              <Checkbox color='primary' size='small' />
              <Typography variant='body2' color='textSecondary'>
                Remember me
              </Typography>
            </Box>
            <Link
              href='#'
              variant='body2'
              color='textSecondary'
              sx={{
                fontWeight: 500,
                '&:hover': {
                  color: '#006882'
                }
              }}
              onClick={handleClickOpen}
            >
              Forgot your password?
            </Link>
            <ForgotPassword open={open} handleClose={handleClose} />
          </Box>

          {/* Sign In Button */}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: '#009DC3',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '16px',
              py: 1.5,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#006882',
                color: '#fff',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            Sign in
          </Button>

          {/* Sign Up Link */}
          <Typography variant='body2' color='textSecondary' sx={{ mb: 2 }}>
            Don't have an account?{' '}
            <Link
              href='#'
              variant='body2'
              sx={{
                fontWeight: 500,
                '&:hover': {
                  color: '#006882'
                }
              }}
            >
              Sign up
            </Link>
          </Typography>

          <Divider sx={{ my: 2 }}>or</Divider>

          {/* Social Login Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='outlined'
                sx={{
                  color: '#000',
                  borderColor: '#ddd',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  py: 1.2,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    borderColor: '#ccc'
                  }
                }}
              >
                Sign in with Google
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
