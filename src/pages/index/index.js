import React, { useState, useRef, useEffect } from 'react'

import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { changeIsVisible, logout } from '@/store/actions/login';

import { changeHelpComponentsName } from '@/store/actions/global';

import {
    IndexWrapper
} from './style'

import {
    SearchOutlined,
    ToolOutlined,
    LaptopOutlined,
    CustomerServiceOutlined,
    CompassOutlined,
    StarOutlined,
    ExperimentOutlined,
    UserOutlined
} from '@ant-design/icons'

import {
    Modal
} from 'antd';

export default function Index() {

    const [isFocus, setIsFocus] = useState(false)
    const childRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(changeHelpComponentsName('demoTools'))
    }, [])

    const { profile, isLogin } = useSelector(
        (state) => ({
            profile: state.loginState.get('profile'),
            isLogin: state.loginState.get('isLogin'),
        }),
        shallowEqual
    )

    const changTag = (e, pathName) => {
        // console.log(e.nativeEvent)
        console.log(e.currentTarget)
        // console.log(childRef.current)
        // e.target.css
        // if (e.currentTarget.classList.contains('tagActive')) return
        // const length = childRef.current.children.length
        // for (let index = 0; index < length; index++) {
        //     childRef.current.children[index].classList.remove("tagActive")
        // }
        // e.currentTarget.classList.add("tagActive")
        navigate(`${pathName}`)
    }

    const loginOrLogout = () => {
        if (isLogin) {
            Modal.confirm({
                title: '是否确认退出登录？',
                centered: true,
                onOk() {
                    dispatch(logout())
                },
            })
        } else {
            dispatch(changeIsVisible(true))
        }
    }

    return (
        <IndexWrapper>
            <div className='index-header'>
                <h1 className='title'>DemoTools - 多功能工具箱</h1>
                <p className='userName' onClick={() => loginOrLogout()}>
                    <UserOutlined />
                    {isLogin ? profile?.nickName : "未登录"}
                </p>
            </div>
            <div className='search-component'>
                <div className={isFocus ? 'search focus' : 'search'}>
                    <SearchOutlined />
                    <input type="search" onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} placeholder='搜索工具'></input>
                </div>
            </div>
            <div className='tag-component'>
                <ul className='tag-list' ref={childRef}>
                    <NavLink to={`tool`}>
                        <ToolOutlined className='tagIcon' />
                        <span>实用</span>
                    </NavLink>
                    <NavLink to={`study`}>
                        <LaptopOutlined className='tagIcon' />
                        <span>学习</span>
                    </NavLink>
                    <NavLink to={`game`}>
                        <CustomerServiceOutlined className='tagIcon' />
                        <span>游戏</span>
                    </NavLink>
                    <NavLink to={`star`}>
                        <StarOutlined className='tagIcon' />
                        <span>收藏</span>
                    </NavLink>
                    <NavLink to={`navi`}>
                        <CompassOutlined className='tagIcon' />
                        <span>导航</span>
                    </NavLink>
                    {/* <NavLink to={`test`} onClick={(e) => changTag(e, "test")}> */}
                    <NavLink to={`test`}>
                        <ExperimentOutlined className='tagIcon' />
                        <span>测试中...</span>
                    </NavLink>
                </ul>
            </div>
            <div className='toolList-component'>
                <Outlet />
            </div>
        </IndexWrapper>
    )
}
