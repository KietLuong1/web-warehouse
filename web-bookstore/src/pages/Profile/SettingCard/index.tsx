import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { Toastify } from '../../../components/Toastify'
import { AccountKey } from '../../../queries'
import { AccountTypes, UserDto } from '../../../queries/Account/types'
import { useChangePassword } from '../../../queries/Account/useChangePassword'
import { useUpdateAccount } from '../../../queries/Account/useUpdateAccount'

interface Props {
  account: AccountTypes
}

interface FormValues extends UserDto {
  newPassword?: string
  repeatPassword?: string
}

const SettingsCard: React.FC<Props> = ({ account }) => {
  const [form] = Form.useForm<FormValues>()

  const { mutateAsync: updateAccount, isPending: updatingProfile } = useUpdateAccount()
  const { mutateAsync: changePassword, isPending: changingPwd } = useChangePassword()

  useEffect(() => {
    form.setFieldsValue({
      [AccountKey.NAME]: account.name,
      [AccountKey.USERNAME]: account.username,
      [AccountKey.EMAIL]: account.email,
      [AccountKey.ROLE]: account.role
    })
  }, [account, form])

  const onFinish = async (values: FormValues) => {
    try {
      // 1) Profile update (omit password entirely)
      await updateAccount({
        userId: account.userId,
        name: values.name,
        username: values.username,
        email: values.email,
        role: account.role
      })

      // 2) Change password if they filled it
      if (values.newPassword || values.repeatPassword) {
        if (!values.newPassword || !values.repeatPassword) {
          Toastify('error', 'Please fill both password fields')
          return
        }
        if (values.newPassword !== values.repeatPassword) {
          Toastify('error', 'Passwords must match')
          return
        }
        await changePassword({
          email: account.email,
          payload: {
            password: values.newPassword,
            repeatPassword: values.repeatPassword
          }
        })
      }
    } catch (e) {
      // Hooks already toastify on error
      console.error(e)
    }
  }

  return (
    <Card bordered={true} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <Form<UserDto> form={form} layout='vertical' onFinish={onFinish} initialValues={{}}>
        <Row gutter={16}>
          <Col md={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>General Information</Typography>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label='User Id'>
              <Input value={account.userId} disabled />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name={AccountKey.NAME}
              label='Full Name'
              rules={[{ required: true, message: 'Please input your full name' }]}
            >
              <Input placeholder='Enter your full name' />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name={AccountKey.USERNAME}
              label='Username'
              rules={[{ required: true, message: 'Please input your username' }]}
            >
              <Input placeholder='Enter your username' />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name={AccountKey.ROLE} label='Role'>
              <Input disabled />
            </Form.Item>
          </Col>

          <Col xs={24} md={16}>
            <Form.Item
              name={AccountKey.EMAIL}
              label='Email Address'
              rules={[
                { required: true, message: 'Please input your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder='Enter your email address' />
            </Form.Item>
          </Col>
        </Row>
        {/* Change Password */}
        <Row gutter={16}>
          <Col md={24}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Change Password</Typography>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item name='currentPassword' label='Current Password'>
              <Input.Password placeholder='Enter your current password' />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item name='newPassword' label='Repeat New Password'>
              <Input.Password placeholder='Enter your new password' />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item name='repeatPassword' label='Repeat Password'>
              <Input.Password placeholder='Enter your repeat password' />
            </Form.Item>
          </Col>
        </Row>
        <Col xs={24} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={updatingProfile || changingPwd}>
              Save Changes
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Card>
  )
}
export default SettingsCard
