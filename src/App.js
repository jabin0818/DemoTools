import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux';
import store from './store';
import NavBar from '@/components/nav-bar'
import Appwriapper from '@/pages/app'
import FloatBtn from '@/components/float-btn'

import { ConfigProvider, theme } from 'antd';

import dayjs from 'dayjs';

// import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';

import { getThemeIsLight } from '@/utils/localstorage.js'

import { useLocation, useMatch } from 'react-router-dom';

dayjs.locale('zh-cn');

const defaultData = {
  borderRadius: 6,
  colorPrimary: '#249ffd',
};


export default function App() {

  const match = useMatch('/demo/draw/diagramming/:id')

  const { pathname } = useLocation()

  const [isLight, setIsLight] = useState(getThemeIsLight() === "true" ? true : false)

  const [data, setData] = useState(defaultData);

  // 是否是流程图作图，是的话FloatBtn要隐藏
  const [isDiagramming, setDiagramming] = useState(false);

  useEffect(() => {

    const docElm = document.documentElement

    if (getThemeIsLight() === "true") {
      docElm.setAttribute('theme', 'light')
    } else if (getThemeIsLight() === "false") {
      docElm.setAttribute('theme', 'dark')
    } else {
      console.log('没有localstorage')
    }
    return () => {
      // clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    // 路由切换了
    if (match) {
      setDiagramming(true);
    } else {
      setDiagramming(false);
    }
    // if (pathname === '/demo/draw/diagramming') {
    //   setDiagramming(true);
    // } else {
    //   setDiagramming(false);
    // }
  }, [pathname])

  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN} theme={{
        algorithm: getThemeIsLight() === 'true' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          colorPrimary: data.colorPrimary,
          borderRadius: data.borderRadius,
        },
      }}>
        <NavBar isLight={isLight} setIsLight={setIsLight} />
        <Appwriapper />
        {!isDiagramming && <FloatBtn />}
      </ConfigProvider>
    </Provider>

  );
}
