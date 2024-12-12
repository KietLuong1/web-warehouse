import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { verifyEmail, verifyOtp, changePassword } from '../../../queries/Login/api'
import { Toastify } from '../../../components/Toastify'
import './styles.scss'

interface ForgotPasswordProps {
  open: boolean
  handleClose: () => void
}

export type ChangePasswordFieldType = {
  password: string
  repeatPassword: string
  email: string
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ open, handleClose }) => {
  const [email, setEmail] = React.useState('')
  const [otp, setOtp] = React.useState('')
  const [step, setStep] = React.useState(1) // 1: Enter Email, 2: Enter OTP, 3: Enter New Password
  const [password, setPassword] = React.useState('')
  const [repeatPassword, setRepeatPassword] = React.useState('')

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await verifyEmail(email)
    if (response) {
      Toastify('success', 'The OTP has sent to your email!')
      setStep(2)
    } else {
      Toastify('error', 'Failed to send OTP. Please try again.')
    }
  }

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await verifyOtp(parseInt(otp), email)
    if (response) {
      Toastify('success', 'Verify the OTP successfully!')
      setStep(3)
    } else {
      Toastify('error', 'Invalid OTP. Please try again.')
    }
  }

  const handleChangePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password !== repeatPassword) {
      Toastify('error', 'Passwords do not match!')
      return
    }
    const response = await changePassword({ email, password, repeatPassword })
    if (response) {
      Toastify('success', 'Password changed successfully!')
      handleClose()
      setStep(1)
    } else {
      Toastify('error', 'Failed to change password. Please try again.')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: step === 1 ? handleEmailSubmit : step === 2 ? handleOtpSubmit : handleChangePasswordSubmit,
        className: 'forgot-password-dialog'
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent className='forgot-password-content'>
        {step === 1 && (
          <>
            <DialogContentText>
              Enter your account&apos;s email address, and we&apos;ll send you an OTP to reset your password.
            </DialogContentText>
            <TextField
              id='email'
              label='Email'
              placeholder='your@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='text-field-input'
            />
          </>
        )}

        {step === 2 && (
          <>
            <DialogContentText>Enter the OTP sent to your email address.</DialogContentText>
            <TextField
              id='otp'
              label='OTP'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='text-field-input'
            />
          </>
        )}

        {step === 3 && (
          <>
            <DialogContentText>Enter your new password and confirm it.</DialogContentText>
            <TextField
              id='password'
              label='New Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-field-input'
            />
            <TextField
              id='repeatPassword'
              label='Repeat Password'
              type='password'
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className='text-field-input'
            />
          </>
        )}
      </DialogContent>
      <DialogActions className='forgot-password-actions'>
        <Button onClick={handleClose} className='cancel-button'>
          Cancel
        </Button>
        <Button type='submit' variant='contained' className='submit-button'>
          {step === 1 ? 'Continue' : step === 2 ? 'Verify' : 'Change Password'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ForgotPassword
