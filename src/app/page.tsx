'use client'

import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Checkbox, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const { Title } = Typography

const App: React.FC = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const onFinish = (values: any) => {
    console.log('values:', values)
    setIsLoading(true)
    signIn('credentials', { username: values.username, password: values.password, redirect: false })
      .then((result) => {
        console.log('result:', result)
        setIsLoading(false)
        if (result?.error) {
          setError(result.error)
        } else {
          router.push('/admin/overview')
        }
      })
      .catch((err) => {
        setIsLoading(false)
        console.log('err:', err)
      })
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card>
        <Title>Login</Title>
        {error && <Alert message={error} type="error" />}
        <Typography.Paragraph>
          Use username: &quot;atuny0&quot; and password: &quot;9uQFF1Lh&quot;
        </Typography.Paragraph>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <br></br>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={isLoading}
            >
              Log in
            </Button>{' '}
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default App
