import React, { useState, useRef } from 'react'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import { byEmailLogin } from '@/service/login'
import Verify from '../captcha/verify';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeCheckSuccess, changeShowCaptchaStatus } from '@/store/actions/slider';
import { changeIsVisible, changeUserRegisterInfo, login } from '@/store/actions/login';

export default function LoginForm(props) {

    const dispatch = useDispatch();
    const [loginLoading, setLoginLoading] = useState(false);
    // const [registerLoading, setRegisterLoading] = useState(false);
    const ref = useRef();

    // redux
    const { isShow, registerLoading, isLogin } = useSelector(
        (state) => ({
            isShow: state.sliderState.get('isShow'),
            registerLoading: state.loginState.get('registerLoading'),
            isLogin: state.loginState.get('isLogin'),
        }),
        shallowEqual
    )

    const onLoginFinish = async (values) => {
        setLoginLoading(true)
        console.log('登录前isLogin', isLogin)
        await dispatch(login(values.email, values.password))
        console.log('登录后isLogin', isLogin)
        setLoginLoading(false)
    }

    const onRegisterFinish = (values) => {
        dispatch(changeCheckSuccess('init'))
        dispatch(changeShowCaptchaStatus(true))
        let registerInfo = {
            account: values.email,
            password: values.password
        }
        dispatch(changeUserRegisterInfo(registerInfo))
    };
    return (
        <>
            <Form
                style={{
                    display: props.isLogin === true ? 'block' : 'none',
                }}
                name="normal_login"
                className="login-form"
                size="large"
                initialValues={{
                    remember: true,
                }}
                onFinish={onLoginFinish}
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱格式不正确!',
                        },
                        {
                            required: true,
                            message: '请输入你的邮箱!',
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="邮箱" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入你的密码!',
                        },
                        {
                            min: 6,
                            max: 16,
                            message: "密码长度在6~16之内!"
                        }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <span className='login-form-forgot'>忘记密码</span>
                </Form.Item>
                <Form.Item style={{ 'marginBottom': '0' }}>
                    <Space>
                        <Button size='default' key="submit" type="primary" htmlType="submit" loading={loginLoading}>登录</Button>
                        <Button key="link" onClick={() => props.toLoginOrRegister()} size='default'>前往注册</Button>
                    </Space>
                </Form.Item>
            </Form>
            <Form
                style={{
                    display: props.isLogin === false ? 'block' : 'none',
                }}
                name="register"
                className="register-form"
                size="large"
                initialValues={{
                    remember: true,
                }}
                onFinish={onRegisterFinish}
                layout="vertical">
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱格式不正确!',
                        },
                        {
                            required: true,
                            message: '请输入你的邮箱!',
                        },
                    ]}
                >
                    <Input prefix={< MailOutlined className="site-form-item-icon" />} placeholder="邮箱" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入你的密码!',
                        },
                        {
                            min: 6,
                            max: 16,
                            message: "密码长度在6~16之内!"
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
                </Form.Item>

                <Form.Item
                    name="rePassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次输入你的密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('你输入的两个密码不匹配!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="确认密码" />
                </Form.Item>
                <Form.Item name="agreement" valuePropName="checked"
                    rules={[
                        {
                            validator: (regExpObj, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议和隐私条款!')),
                        },
                    ]}
                    hasFeedback>
                    <Checkbox>阅读并同意DemoTools<span style={{ color: "var(--theme)" }}>用户协议和隐私条款</span></Checkbox>
                </Form.Item>
                <Form.Item style={{ 'marginBottom': '0' }}>
                    <Space>
                        <Button size='default' key="submit" type="primary" htmlType="submit" loading={registerLoading}>
                            注册
                        </Button>
                        <Button key="link" onClick={() => props.toLoginOrRegister()} size='default'>
                            返回登录
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            {isShow ? <Verify captchaType='blockPuzzle' /> : ''}
        </>
    )
}
