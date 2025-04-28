import { Button, Card, Col, Form, Input, Row, Select, Tabs, Typography } from 'antd'
import { useEffect, useState } from 'react'

export default function SettingsCard(props: any) {
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const onFinish = (values: any) => {
    console.log('Submitted values:', values)
  }

  return (
    <Card bordered={true} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          userId: props.userId,
          name: props.name,
          username: props.username,
          email: props.email,
          password: props.password,
          role: props.role
        }}
      >
        {/* Account Information */}
        <Row gutter={16}>
          <Col md={24}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>General Information</Typography>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='userId'
              label='User Id'
              rules={[{ required: true, message: '' }]}
            >
              <Input placeholder='' disabled={!isEditing} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='name'
              label='Full Name'
              rules={[
                { required: true, message: 'Please input your full name' },
              ]}
            >
              <Input placeholder='Enter your full name' />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='username'
              label='Username'
              rules={[
                { required: true, message: 'Please input your username' },
              ]}
            >
              <Input placeholder='Enter your username' />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name='role' label='Role'>
              <Input placeholder='' disabled={!isEditing} />
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
            <Form.Item
              name='password'
              label='Current Password'
              rules={[
                { required: true, message: 'Please input your current password' },
              ]}
            >
              <Input placeholder='Enter your current password' />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              name='newPassword'
              label='New Password'
              rules={[
                { required: true, message: 'Please input your new password' },
              ]}
            >
              <Input placeholder='Enter your new password' />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              name='repeatPassword'
              label='Repeat Password'
              rules={[
                { required: true, message: 'Please input the repeat password' },
              ]}
            >
              <Input placeholder='Enter your the repeat password' />
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
