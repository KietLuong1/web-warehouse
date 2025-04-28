/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Form, Input, Row, Select, Tabs, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { fetchDistrictsByProvince, fetchWardsByDistrict } from '../../../queries/Setting/api'
import { District, Province, Ward } from '../../../queries/Setting/helpers'
import { useProvinces } from '../../../queries/Setting/useGetProvinces'

const { TabPane } = Tabs
const { Option } = Select

export default function SettingsCard(props: any) {
  const [form] = Form.useForm()
  const { provinces } = useProvinces()

  const [districts, setDistricts] = useState<District | null>(null)
  const [wards, setWards] = useState<Ward | null>(null)

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const data = await fetchDistrictsByProvince(Number(selectedProvince))
          setDistricts(data)
        } catch (err) {
          console.error('Error fetching districts:', err)
          setDistricts(null)
        }
        setSelectedDistrict('')
        setSelectedWard('')
        setWards(null)
      }
    }

    fetchDistricts()
  }, [selectedProvince])

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const data = await fetchWardsByDistrict(Number(selectedDistrict))
          setWards(data)
        } catch (err) {
          console.error('Error fetching wards:', err)
          setWards(null)
        }
        setSelectedWard('')
      }
    }

    fetchWards()
  }, [selectedDistrict])

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value)
    form.setFieldsValue({ district: undefined, ward: undefined })
  }

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value)
    form.setFieldsValue({ ward: undefined })
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const onFinish = (values: any) => {
    console.log('Submitted values:', values)
    // Add your update logic here
  }

  return (
    <Card bordered={true} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          firstName: props.firstName,
          lastName: props.lastName,
          midName: props.midName,
          gender: props.gender,
          phone: props.phone,
          email: props.email
        }}
      >
        {/* Generation Information */}
        <Row gutter={16}>
          <Col md={24}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>General Information</Typography>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='firstName'
              label='First Name'
              rules={[{ required: true, message: 'Please input your first name' }]}
            >
              <Input placeholder='Enter first name' disabled={!isEditing} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='lastName'
              label='Last Name'
              rules={[{ required: true, message: 'Please input your last name' }]}
            >
              <Input placeholder='Enter last name' disabled={!isEditing} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name='midName' label='Middle Name'>
              <Input placeholder='Enter middle name' disabled={!isEditing} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name='gender' label='Gender' rules={[{ required: true, message: 'Please select your gender' }]}>
              <Select placeholder='Select gender' disabled={!isEditing}>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </Select>
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
              <Input placeholder='Enter email address' disabled={!isEditing} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='phone'
              label='Phone Number'
              rules={[{ required: true, message: 'Please input your phone number' }]}
            >
              <Input addonBefore='+84' placeholder='Enter phone number' disabled={!isEditing} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='dateOfBirth'
              label='Date of Birth'
              rules={[{ required: true, message: 'Please input your date of birth' }]}
            >
              <Input type='date' placeholder='Enter your date of birth' />
            </Form.Item>
          </Col>
        </Row>

        {/* Address */}
        <Row gutter={16}>
          <Col md={24}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Address Information</Typography>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name='province'
              label='Province'
              rules={[{ required: true, message: 'Please select a province' }]}
            >
              <Select placeholder='Select province' onChange={handleProvinceChange}>
                {provinces?.map((prov: Province) => (
                  <Option key={prov.id} value={prov.id}>
                    {prov.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name='district'
              label='District'
              rules={[{ required: true, message: 'Please select a district' }]}
            >
              <Select placeholder='Select district' onChange={handleDistrictChange} disabled={!selectedProvince}>
                {districts?.data.map((dist) => (
                  <Option key={dist.id} value={dist.id}>
                    {dist.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name='ward' label='Ward' rules={[{ required: true, message: 'Please select a ward' }]}>
              <Select placeholder='Select ward' disabled={!selectedDistrict}>
                {wards?.data.map((ward) => (
                  <Option key={ward.id} value={ward.id}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={16}>
            <Form.Item
              name='address'
              label='Address'
              rules={[{ required: true, message: 'Please input your address' }]}
            >
              <Input type='text' placeholder='Enter your address' />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item name='No' label='No.'>
              <Input placeholder='No.' />
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
