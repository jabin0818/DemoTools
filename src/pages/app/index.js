import React, { useState, useEffect, useCallback } from 'react'
import routes from '@/router'

import { useRoutes } from 'react-router-dom';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getLoginProfileInfo } from "@/store/actions/login"
import {
  AppWrapper
} from './style'

import { Layout } from 'antd';

import 'qweather-icons/font/qweather-icons.css';//和风天气图标

import {
  UserOutlined,
} from '@ant-design/icons';

import Login from '@/components/login'

import HelpModal from '@/components/help-modal'

const { Header, Content } = Layout;



export default function Appwrapper() {

  const element = useRoutes(routes)
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUserInfo = useCallback(() => {
    dispatch(getLoginProfileInfo())
  }, [dispatch])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <AppWrapper>
      <Layout className='LayoutMian'>
        {/* <Header>
          <h1 className='title'>DemoTools - 工具集合</h1>
          <p className='userName' onClick={() => dispatch(changeIsVisible(true))}>
            <UserOutlined />
            未登录
          </p>
        </Header> */}
        <Content>
          {element}
        </Content>
        <HelpModal />
      </Layout>
      <Login />
    </AppWrapper>

  )
}
