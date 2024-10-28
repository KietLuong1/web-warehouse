import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

interface ForgotPasswordProps {
  open: boolean
  handleClose: () => void
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          handleClose()
        },
        sx: { padding: '20px', overflow: 'hidden', maxHeight: '400px' }
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
        </DialogContentText>
        <TextField
          id='outlined-textarea'
          label='Email'
          placeholder='your@email.com'
          fullWidth
          sx={{
            maxWidth: '550px'
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: '#006882'
          }}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          sx={{
            mt: 1,
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
      </DialogActions>
    </Dialog>
  )
}
