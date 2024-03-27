import React, { useState } from 'react'

import { LoginWrapper } from './style'

import { Button, Modal, Checkbox, Form, Input, Space } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { changeIsVisible } from '@/store/actions/login';
import LoginForm from '../login-form'
// const [isModalOpen, setIsModalOpen] = useState(false);

// const showModal = () => {
//   setIsModalOpen(true);
// };
// const handleOk = () => {
//   setIsModalOpen(false);
// };
// const handleCancel = () => {
//   setIsModalOpen(false);
// };

export default function Login(props) {

  const [isLogin, setIsLogin] = useState(true)

  const toLoginOrRegister = () => {
    setIsLogin(!isLogin)
  }

  // redux
  const dispatch = useDispatch()
  const { isVisible } = useSelector(
    (state) => ({
      isVisible: state.loginState.get('isVisible'),
    }),
    shallowEqual
  )

  const handleOk = () => {
  };

  return (
    <LoginWrapper>
      <Modal
        title={isLogin ? '登录' : '注册'}
        open={isVisible}
        onOk={handleOk}
        onCancel={() => dispatch(changeIsVisible(false))}
        centered={true}
        wrapClassName="LoginModalWrapper"
        getContainer={false}
        footer={null}
      >
        <LoginForm isLogin={isLogin} toLoginOrRegister={toLoginOrRegister}></LoginForm>
      </Modal>
    </LoginWrapper>
  )
}
