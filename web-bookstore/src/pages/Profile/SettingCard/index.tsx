import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import axiosAccount from '../../../configs/services/http'
import { Toastify } from '../../../components/Toastify'

export default function SettingsCard({ userInformation, setUserInformation }: any) {
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    form.setFieldsValue(userInformation)
  }, [userInformation, form])

  // const toggleEdit = async () => {
  //   if (isEditing) {
  //     try {
  //       const values = await form.validateFields()

  //       // Update General Information
  //       const updatedUser = {
  //         userId: userInformation.userId,
  //         name: values.name,
  //         username: values.username,
  //         email: values.email,
  //         password: userInformation.password, // Keep the old password
  //         role: userInformation.role
  //       }

  //       // Convert updated user to JSON string
  //       const userDtoObj = JSON.stringify(updatedUser)

  //       // Prepare FormData
  //       const formData = new FormData()
  //       formData.append('userDtoObj', userDtoObj) // Append the JSON string as 'userDtoObj'

  //       // Send PUT request with FormData
  //       await axiosAccount.put(`/user/${userInformation.userId}`, formData)
  //       setUserInformation(updatedUser)
  //       Toastify('success', 'General information updated successfully')

  //       // Smart Password Change
  //       if (values.newPassword || values.repeatPassword || values.password) {
  //         if (!values.password || !values.newPassword || !values.repeatPassword) {
  //           Toastify('error', 'Please fill all password fields to change password')
  //           return
  //         }

  //         if (values.newPassword !== values.repeatPassword) {
  //           Toastify('error', 'New password and repeat password do not match')
  //           return
  //         }

  //         if (values.password !== userInformation.password) {
  //           Toastify('error', 'Current password is incorrect')
  //           return
  //         }

  //         const passwordChangeBody = {
  //           password: values.newPassword,
  //           repeatPassword: values.repeatPassword
  //         }

  //         await axiosAccount.post(`forgotPassword/changePassword/${userInformation.email}`, passwordChangeBody)
  //         Toastify('success', 'Password changed successfully')
  //       }
  //     } catch (error) {
  //       console.error('Update failed:', error)
  //       Toastify('error', 'Failed to update information')
  //     }
  //   }
  //   setIsEditing(!isEditing)
  // }

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        const values = await form.validateFields()

        // Create a FormData object
        const formData = new FormData()
        formData.append('userId', userInformation.userId)
        formData.append('name', values.name)
        formData.append('username', values.username)
        formData.append('email', values.email)
        formData.append('password', userInformation.password) // old password
        formData.append('role', userInformation.role)

        const accessToken = localStorage.getItem('accessToken')
        await axiosAccount.put(`user/${userInformation.userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
          }
        })

        setUserInformation({
          ...userInformation,
          ...values
        })

        Toastify('success', 'General information updated successfully')

        // Smart Password Change
        if (values.newPassword || values.repeatPassword || values.password) {
          if (!values.password || !values.newPassword || !values.repeatPassword) {
            Toastify('error', 'Please fill all password fields to change password')
            return
          }

          if (values.newPassword !== values.repeatPassword) {
            Toastify('error', 'New password and repeat password do not match')
            return
          }

          if (values.password !== userInformation.password) {
            Toastify('error', 'Current password is incorrect')
            return
          }

          const passwordChangeBody = {
            password: values.newPassword,
            repeatPassword: values.repeatPassword
          }

          await axiosAccount.post(`forgotPassword/changePassword/${userInformation.email}`, passwordChangeBody)
          Toastify('success', 'Password changed successfully')
        }
      } catch (error) {
        console.error('Update failed:', error)
        Toastify('error', 'Failed to update information')
      }
    }
    setIsEditing(!isEditing)
  }

  return (
    <Card bordered={true} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <Form form={form} layout='vertical' initialValues={userInformation}>
        {/* Account Information */}
        <Row gutter={16}>
          <Col md={24}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>General Information</Typography>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name='userId' label='User Id'>
              <Input disabled />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='name'
              label='Full Name'
              rules={[{ required: true, message: 'Please input your full name' }]}
            >
              <Input disabled={!isEditing} placeholder='Enter your full name' />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='username'
              label='Username'
              rules={[{ required: true, message: 'Please input your username' }]}
            >
              <Input disabled={!isEditing} placeholder='Enter your username' />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name='role' label='Role'>
              <Input disabled />
            </Form.Item>
          </Col>

          <Col xs={24} md={16}>
            <Form.Item
              name='email'
              label='Email Address'
              rules={[
                { required: true, message: 'Please input your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input disabled={!isEditing} placeholder='Enter your email address' />
            </Form.Item>
          </Col>
        </Row>

        {/* Change Password */}
        <Row gutter={16}>
          <Col md={24}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Change Password</Typography>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item name='password' label='Current Password'>
              <Input.Password disabled={!isEditing} placeholder='Current password' />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item name='newPassword' label='New Password'>
              <Input.Password disabled={!isEditing} placeholder='Enter your new password' />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item name='repeatPassword' label='Repeat Password'>
              <Input.Password disabled={!isEditing} placeholder='Repeat your new password' />
            </Form.Item>
          </Col>
        </Row>

        <Col xs={24} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type='primary' onClick={toggleEdit}>
              {isEditing ? 'Save All' : 'Edit'}
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Card>
  )
}
