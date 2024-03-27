import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  NavbarWrapper,
  SidebarBtnWrapper,
  SidebarWrapper,
  SidebarTop,
  SidebarMenu,
  SidebarFooter,
  WeatherPopover
} from './style'
import { Drawer, Button, Space, Popover } from 'antd'
import {
  UserOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  StarOutlined,
  UnorderedListOutlined,
  MessageOutlined,
  MenuFoldOutlined,
  BulbFilled,
  BulbOutlined,
  SettingOutlined,
  LeftOutlined
} from '@ant-design/icons';

import { getThemeIsLight, setThemeIsLight } from '@/utils/localstorage.js'

import { getLocalInfo, setLocalInfo } from "@/utils/localstorage.js";

import { he_feng_key } from '@/common/constant.js'

import { useLocation } from 'react-router-dom';

export default function NavBar(props) {

  // 监听路径
  const { pathname } = useLocation()

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  const [cityName, setCityName] = useState('')
  const [weatherNowData, setWeatherNowDate] = useState(null)
  const [weatherNowUpdateTime, setWeatherNowUpdateTime] = useState('')
  const [weatherNowLink, setWeatherNowLink] = useState('')

  const [weatherData, setWeatherDate] = useState(null)
  const [weatherUpdateTime, setWeatherUpdateTime] = useState('')
  const [weatherLink, setWeatherLink] = useState('')

  const [isShowWeather, setIsShowWeather] = useState(false);

  const localUrl = `https://geoapi.qweather.com/v2/city/lookup`;// 用于获取本地的城市id

  const getWeatherUrlNow = `https://devapi.qweather.com/v7/weather/now`;

  const getWeatherUrl3Day = `https://devapi.qweather.com/v7/weather/3d`;

  const renderTime = (date) => {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  }

  const content = (
    <WeatherPopover>
      <div className='weather-header'>
        <div className='weather-header-city'>{cityName}</div>
        <div className='weather-header-sources'><a href={weatherNowLink}>和风天气</a></div>
      </div>
      <div className='weather-center'>
        <div className='weather-center-left'>
          <div className='weather-center-temp'>{weatherNowData ? weatherNowData.temp + '°' : ''}</div>
          <div className='weather-center-time'>{weatherNowData ? renderTime(weatherNowData.obsTime) : ''}</div>
        </div>
        <div className='weather-center-right'>
          <div className='wcr-text'>
            <i className={'qi-' + weatherNowData?.icon}></i>
            <span>{weatherNowData ? weatherNowData.text : ''}</span>
          </div>
          <div className='wcr-text'>云量：{weatherNowData ? weatherNowData.cloud : ''}</div>
          <div className='wcr-text'>能见度：{weatherNowData ? weatherNowData.vis : ''}</div>
        </div>
      </div>
      <div className='weather-footer'>
        <ul className='weather-footer-ul'>
          <li className='footer-li'>
            <div className='content'>{weatherNowData ? weatherNowData.windScale + '级' : ''}</div>
            <div className='title'>{weatherNowData ? weatherNowData.windDir : ''}</div>
          </li>
          <li className='footer-li'>
            <div className='content'>{weatherNowData ? weatherNowData.humidity + '%' : ''}</div>
            <div className='title'>湿度</div>
          </li>
          <li className='footer-li'>
            <div className='content'>{weatherNowData ? weatherNowData.feelsLike + '°C' : ''}</div>
            <div className='title'>体感</div>
          </li>
          <li className='footer-li'>
            <div className='content'>{weatherNowData ? weatherNowData.pressure + 'hPa' : ''}</div>
            <div className='title'>气压</div>
          </li>
        </ul>
      </div>
    </WeatherPopover>
  );

  useEffect(() => {
    if (getLocalInfo() && Object.keys(getLocalInfo()).length !== 0) {
      getWeatherNowData(getLocalInfo())
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((res, err) => {
          let longitude = res.coords.longitude.toFixed(2)
          let latitude = res.coords.latitude.toFixed(2)
          let location = longitude + ',' + latitude
          window.fetch(`${localUrl}?location=${location}&key=${he_feng_key}`).then((data) => {
            if (data.ok) {
              return data.text();
            } else {
              return Promise.reject()
            }
          }).then((res) => {
            const data = JSON.parse(res);
            if (data.code === "200") {
              setLocalInfo({
                name: data.location[0].name,
                id: data.location[0].id
              })
              getWeatherNowData({
                name: data.location[0].name,
                id: data.location[0].id
              })
            }
          }).catch((err) => {
            console.log(err)
            // error('发生错误！请重试')
          });
        });
      } else {
        console.log('获取本地信息失败，你的浏览器不支持Geolocation API。');
      }
    }
    return () => {

    }
  }, [])

  useEffect(() => {
    if (pathname.split('/')[1] === 'index') {
      setIsShowWeather(true);
    } else {
      setIsShowWeather(false);
    }
  }, [pathname])
  const getWeatherNowData = ({ name, id }) => {
    window.fetch(`${getWeatherUrlNow}?location=${id}&key=${he_feng_key}`).then((data) => {
      if (data.ok) {
        return data.text();
      } else {
        return Promise.reject()
      }
    }).then((res) => {
      const data = JSON.parse(res);
      if (data.code === "200") {
        setWeatherNowDate(data.now)
        setWeatherNowUpdateTime(data.updateTime)
        setWeatherNowLink(data.fxLink)
        setCityName(name)
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  const getWeatherThreeData = (location) => {
    window.fetch(`${getWeatherUrl3Day}?location=${location}&key=${he_feng_key}`).then((data) => {
      if (data.ok) {
        return data.text();
      } else {
        return Promise.reject()
      }
    }).then((res) => {
      const data = JSON.parse(res);
      if (data.code === "200") {
        setWeatherDate(data.daily)
        setWeatherUpdateTime(data.updateTime)
        setWeatherLink(data.fxLink)
      }
    }).catch((err) => {
      console.log(err)
      // error('发生错误！请重试')
    });
  }

  //用于页面颜色mode的切换
  const setDocumentTheme = () => {
    const docElm = document.documentElement
    // !docElm.hasAttribute('theme')
    // docElm.removeAttribute('theme')
    if (docElm.getAttribute('theme') === 'light') {
      docElm.setAttribute('theme', 'dark')
      props.setIsLight(false)
      setThemeIsLight(false)
    } else if (docElm.getAttribute('theme') === 'dark') {
      docElm.setAttribute('theme', 'light')
      props.setIsLight(true)
      setThemeIsLight(true)
    }
  }

  function componentWillReceiveProps(newProps) {
    console.log(newProps)
  }

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  return (
    <NavbarWrapper>
      <SidebarBtnWrapper>
        <Space>
          <div className='sidebarBtn' onClick={showDrawer}>
            <MenuFoldOutlined />
          </div>
          {weatherNowData ? <Popover placement="bottomLeft" content={content} trigger="hover">
            {/* <Button>Hover me</Button> */}
            <div className='weatherPanel' style={{ display: isShowWeather ? "" : "none" }}>
              {/* <LeftOutlined /> */}
              <span>{cityName}</span>
              <i className={'qi-' + weatherNowData?.icon}></i>
              {/* <i className='qi-100'></i> */}
              <span>{weatherNowData ? weatherNowData?.temp + '°C' : ''}</span>
            </div>
          </Popover> : null}

        </Space>
      </SidebarBtnWrapper>
      <Drawer
        width={260}
        placement={placement}
        closable={true}
        onClose={onClose}
        open={open}
        key={placement}
        className="DrawerWrapper"
        // getContainer={false}
        headerStyle={
          { "borderBottom": 'none' }
        }
        bodyStyle={
          { "padding": "4px 0 0 0" }
        }
      >
        <SidebarWrapper>
          <SidebarTop>
            <div className='Login'>
              <h1>DemoTools</h1>
            </div>
            <div className='dark-theme text-primary' onClick={() => setDocumentTheme()}>
              {props.isLight ? <BulbOutlined /> : <BulbFilled />}
            </div>
          </SidebarTop>
          <SidebarMenu>
            <ul>
              <li>
                <Link to="/mine">
                  <UserOutlined className='NavIcon' />
                  <span className='NavText'>
                    用户中心
                  </span>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/share">
                  <ReloadOutlined className='NavIcon' />
                  <span className='NavText'>
                    更新日志
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/star">
                  <UnorderedListOutlined className='NavIcon' />
                  <span className='NavText'>
                    ToDoList
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/star">
                  <MessageOutlined className='NavIcon' />
                  <span className='NavText'>
                    留言反馈
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/star">
                  <StarOutlined className='NavIcon' />
                  <span className='NavText'>
                    我的收藏
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/star">
                  <QuestionCircleOutlined className='NavIcon' />
                  <span className='NavText'>
                    帮助
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/star">
                  <SettingOutlined className='NavIcon' />
                  <span className='NavText'>
                    设置
                  </span>
                </Link>
              </li>
            </ul>
          </SidebarMenu>
          <SidebarFooter>

          </SidebarFooter>
        </SidebarWrapper>
      </Drawer>
    </NavbarWrapper>


  )
}
