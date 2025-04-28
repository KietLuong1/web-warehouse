import { Box, Container, Link, Stack, Typography } from '@mui/material'
import { Button, Checkbox, Form, Input } from 'antd'
import Image from 'material-ui-image'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IMAGES } from '../../configs/images'
import { useAuth } from '../../context/AuthContext'
import { loginApi } from '../../queries/Login/api'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import './styles.scss'
import { Toastify } from '../../components/Toastify'
import { axiosAccount } from '../../configs/services/http'

export type FieldType = {
  email: string
  password: string
  remember: boolean
}

const Login: React.FC = () => {
  const { login } = useAuth()

  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FieldType>({
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  })

  // Handle form submission
  const onSubmit: SubmitHandler<FieldType> = async (data) => {
    try {
      const response = await loginApi(data)
      const { accessToken, userRole } = response
      if (accessToken) {
        login(accessToken)
        const storage = data.remember ? localStorage : sessionStorage
        storage.setItem('accessToken', accessToken)
        storage.setItem('userRole', userRole)

        // Set default Authorization header for Axios
        axiosAccount.defaults.headers.Authorization = `Bearer ${accessToken}`

        Toastify('success', 'Login successfully')
        navigate('/dashboard')
      } else {
        Toastify('error', 'Invalid credentials')
      }
    } catch (error) {
      Toastify('error', 'An error occurred during login')
      console.error('Login error:', error)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container maxWidth='xs' className='login-container'>
      <Box className='login-container_box'>
        <Stack className='img-container' sx={{ flexDirection: 'row' }}>
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
          <Stack>
            <Typography color='#009DC3' fontWeight={700} variant='h5' fontFamily={'Poppins'}>
              WMS
            </Typography>
          </Stack>
        </Stack>

        <Typography fontWeight={600} variant='h4' fontFamily={'Poppins'} marginBottom={3}>
          Sign in
        </Typography>

        <Form layout='vertical' initialValues={{ remember: true }} onFinish={handleSubmit(onSubmit)} autoComplete='off'>
          <Form.Item
            required
            label='Email'
            validateStatus={errors.email ? 'error' : ''}
            help={
              errors.email ? <span style={{ textAlign: 'left', display: 'block' }}>{errors.email.message}</span> : null
            }
          >
            <Controller
              name='email'
              control={control}
              rules={{ required: 'Please input your email!' }}
              render={({ field }) => <Input {...field} placeholder='Email' />}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            required
            label='Password'
            validateStatus={errors.password ? 'error' : ''}
            help={
              errors.email ? <span style={{ textAlign: 'left', display: 'block' }}>{errors.email.message}</span> : null
            }
          >
            <Controller
              name='password'
              control={control}
              rules={{ required: 'Please input your password!' }}
              render={({ field }) => <Input.Password {...field} placeholder='Password' />}
            />
          </Form.Item>

          {/* Checkbox */}
          <Form.Item>
            <Controller
              name='remember'
              control={control}
              render={({ field }) => (
                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                  <Checkbox {...field} checked={field.value}>
                    Remember me
                  </Checkbox>

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
                    Forgot password?
                  </Link>
                  <ForgotPassword open={open} handleClose={handleClose} />
                </Stack>
              )}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </Container>
  )
}

export default Login
