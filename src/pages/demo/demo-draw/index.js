import React, { useState, useEffect, useRef } from 'react'

import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'

import { DemoDrawWrapper } from "./style"

import { Input, Select, Space, Button, Tooltip } from 'antd';

import {
    ClockCircleOutlined,
    DiffOutlined,
    LeftOutlined,
    RightOutlined,
    SearchOutlined,
    FilterOutlined,
    SwapOutlined,
    SettingOutlined,
    AppstoreAddOutlined,
    FolderOpenOutlined,
    FolderAddOutlined,
    StarOutlined,
    GlobalOutlined,
    UploadOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import { insertGraph } from '@/service/draw.js'

import CreateForm from "./create-form"

import { shallowEqual, useDispatch, useSelector } from 'react-redux';


export default function DemoDraw() {

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [graphType, setGraphType] = useState("");

    const [isClose, setIsClose] = useState(false);

    const [isShowCreateModel, setIsShowCreateModel] = useState(false);

    const [isManageState, setIsManageState] = useState(false);

    // redux
    const { profile, isLogin } = useSelector((state) => ({
        profile: state.loginState.get("profile"),
        isLogin: state.loginState.get("isLogin")
    }), shallowEqual)

    useEffect(() => {
        setGraphType(pathname.split('/')[3])
    }, [pathname]);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const changeCloseStatus = () => {
        setIsClose(!isClose);
    }

    async function creatNewGraph({ title, graphType }) {
        let res = await insertGraph(title, graphType);
        console.log("创建图数据的接口：", res)
        if (res.code === 200) {
            navigate(`/demo/draw/diagramming/${res.data.id}`)
        }
    }

    function showCreateModel() {
        setIsShowCreateModel(true);
    }


    function toDrawRoute(route) {
        navigate(route)
    }

    function closeCreateModal() {
        setIsShowCreateModel(false);
    }

    function changeManageState() {
        setIsManageState(!isManageState);
    }

    return (
        <DemoDrawWrapper>
            <div className={"gallery-menu" + " " + (isClose ? "gallery-menu-close" : "")}>
                <div className='menu-container'>
                    <span className='menu-close-btn' onClick={() => changeCloseStatus()}>
                        {isClose ? <RightOutlined /> : <LeftOutlined />}
                    </span>
                    <div className='menu-header'>
                        <Button type='primary' onClick={() => showCreateModel()} style={{ width: "130px" }}>新建</Button>
                    </div>
                    <div className='menu-list'>
                        <div className='menu-list-wrapper'>
                            <div className={'menu-itme' + ' ' + (graphType === 'history' ? 'active' : '')} onClick={() => toDrawRoute("history")}>
                                <div className='menu-icon'>
                                    {/* <DiffOutlined /> */}
                                    <ClockCircleOutlined />
                                </div>
                                <div className='menu-text'>
                                    最近
                                </div>
                            </div>
                            <div className={'menu-itme' + ' ' + (graphType === 'template_create' ? 'active' : '')} onClick={() => toDrawRoute("template_create")}>
                                <div className='menu-icon'>
                                    {/* <DiffOutlined /> */}
                                    <AppstoreAddOutlined />
                                </div>
                                <div className='menu-text'>
                                    模板
                                </div>
                            </div>
                            <div className={'menu-itme' + ' ' + (graphType === 'diagrams' ? 'active' : '')} onClick={() => toDrawRoute("diagrams")}>
                                <div className='menu-icon'>
                                    {/* <FolderAddOutlined /> */}
                                    <FolderOpenOutlined />
                                </div>
                                <div className='menu-text' >
                                    我的
                                </div>
                            </div>
                            <div className={'menu-itme' + ' ' + (graphType === 'fav' ? 'active' : '')} onClick={() => toDrawRoute("fav")}>
                                <div className='menu-icon'>
                                    <StarOutlined />
                                </div>
                                <div className='menu-text'>
                                    收藏
                                </div>
                            </div>
                            <div className='menu-itme-divider'></div>
                            <div className={'menu-itme' + ' ' + (graphType === 'my_template' ? 'active' : '')} onClick={() => toDrawRoute("my_template")}>
                                <div className='menu-icon'>
                                    <FolderAddOutlined />
                                </div>
                                <div className='menu-text'>
                                    我的模板
                                </div>
                            </div>
                            <div className={'menu-itme' + ' ' + (graphType === 'template_community' ? 'active' : '')} onClick={() => toDrawRoute("template_community")}>
                                <div className='menu-icon'>
                                    {/* <GlobalOutlined /> */}
                                    {/* <UsergroupAddOutlined /> */}
                                    <UploadOutlined />
                                </div>
                                <div className='menu-text'>
                                    模板社区
                                </div>
                            </div>
                            <div className='menu-itme-divider'></div>
                            <div className={'menu-itme' + ' ' + (graphType === 'trash' ? 'active' : '')} onClick={() => toDrawRoute("trash")}>
                                <div className='menu-icon'>
                                    <DeleteOutlined />
                                </div>
                                <div className='menu-text'>
                                    回收站
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallery-main">
                <div className="gallery-container">
                    <div className='gallery-sh-query'>
                        <div className='search'>
                            <Input placeholder="搜索" prefix={<SearchOutlined />} />
                        </div>
                        <div className='query'>
                            <Space wrap>
                                <Select
                                    defaultValue={'none'}
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleChange}
                                    suffixIcon={<FilterOutlined />}
                                    options={[
                                        {
                                            value: 'none',
                                            label: '无',
                                        },
                                        {
                                            value: 0,
                                            label: '空白绘图',
                                        },
                                        {
                                            value: 1,
                                            label: '流程图',
                                        },
                                        {
                                            value: 2,
                                            label: 'UML',
                                        },
                                        {
                                            value: 3,
                                            label: '思维导图',
                                        },
                                        {
                                            value: 4,
                                            label: '组织结构图',
                                        },
                                    ]}
                                />
                                <Select
                                    defaultValue={0}
                                    suffixIcon={<SwapOutlined />}
                                    options={[
                                        {
                                            value: 0,
                                            label: '正序',
                                        },
                                        {
                                            value: 1,
                                            label: '倒序',
                                        },
                                    ]}
                                />
                                {(isLogin && graphType !== "template_create" && graphType !== "template_community") || profile?.id === 1 ? <Button icon={<SettingOutlined />} type={isManageState ? "primary" : "default"} onClick={() => changeManageState()}>
                                    管理
                                </Button> : null}
                            </Space>
                        </div>
                    </div>
                    <div className='gallery scrollbar-default-styles'>
                        <Outlet context={[isManageState, setIsManageState]} />
                    </div>
                </div>
            </div>
            <CreateForm isShowCreateModel={isShowCreateModel} closeCreateModal={closeCreateModal} />
        </DemoDrawWrapper>
    )
}
