import React, { useState, useRef, useEffect } from 'react'

import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'

import { Modal, Input, Select, message } from 'antd'

import { CreateFormWrapper } from './style'

import { insertGraph, getTemplates } from '@/service/draw.js'


export default function CreateForm(props) {

    const navigate = useNavigate();

    const { isShowCreateModel, closeCreateModal } = props

    const typeOptions = [
        {
            value: 0,
            label: '空白绘图',
        },
        {
            value: 1,
            label: '流程图'
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
    ]

    const [loginLoading, setLoginLoading] = useState(false);

    const [title, setTitle] = useState("");

    const [graphType, setGraphType] = useState(0)

    const [keywords, setKeywords] = useState("");

    const [templateData, setTemplateData] = useState({});

    const [templateType, setTemplateType] = useState(0);

    const [isCreateByTemplateId, setIsCreateByTemplateId] = useState(1);//从模板中创建的id

    useEffect(() => {
        getTemplatesData(0)
    }, [])

    async function createGraph() {
        if (title !== "" && graphType !== null) {
            let res = await insertGraph({ title, graphType, cover: templateData.cover, templatesId: isCreateByTemplateId });
            console.log("创建图数据的接口：", res)
            if (res.code === 200) {
                navigate(`/demo/draw/diagramming/${res.data.id}`)
            }
        } else {
            message.error("标题不能为空！");
        }
    }

    function titleChange(value) {
        setTitle(value.target.value);
    }

    function typeChange(value) {
        setGraphType(value)
    }

    function keywordsChange(value) {

    }

    function switchTemplatesType(type) {
        setTemplateType(type);
        if (templateData.hasOwnProperty(type)) {

        } else {
            getTemplatesData(type);
        }
    }

    async function getTemplatesData(type) {
        let res = await getTemplates(type, "");
        console.log("根据分类获取模板的接口", res);
        if (res.code === 200) {
            setTemplateData((data) => {
                data[type] = res.data
                return Object.assign({}, data);
            })
        }
    }

    function changeTempalge(id, type) {
        setGraphType(type);
        setIsCreateByTemplateId(id);
    }

    return (
        <Modal
            open={isShowCreateModel}
            onCancel={() => closeCreateModal()}
            onOk={() => createGraph()}
            centered={true}
            title={
                null
            }
            okText={"创建"}
            confirmLoading={loginLoading}
            wrapClassName="createGraphModalWrapper">

            <CreateFormWrapper>
                <div className='graph-input'>
                    <div className='input'>
                        <span>文件名</span>
                        <Input value={title} maxLength={200} onChange={titleChange} placeholder="请输入文件名" style={{ width: "160px" }}></Input>
                    </div>
                    <div className='input'>
                        <span>类型</span>
                        <Select
                            value={graphType}
                            options={typeOptions}
                            onChange={typeChange}
                            style={{ width: "160px" }}>
                        </Select>
                    </div>
                </div>
                <div className='graph-type'>
                    <div className='graph-type-left'>
                        <div className='search'>
                            <Input value={keywords} onChange={keywordsChange} placeholder='搜索...'></Input>
                        </div>
                        <div className='classify'>
                            <div className={'classify-item' + ' ' + (templateType === 0 ? 'active' : '')} onClick={() => switchTemplatesType(0)}>基本(6)</div>
                            <div className={'classify-item' + ' ' + (templateType === 1 ? 'active' : '')} onClick={() => switchTemplatesType(1)}>流程图(7)</div>
                            <div className={'classify-item' + ' ' + (templateType === 2 ? 'active' : '')} onClick={() => switchTemplatesType(2)}>UML(5)</div>
                            <div className={'classify-item' + ' ' + (templateType === 3 ? 'active' : '')} onClick={() => switchTemplatesType(3)}>思维导图(2)</div>
                            <div className={'classify-item' + ' ' + (templateType === 4 ? 'active' : '')} onClick={() => switchTemplatesType(4)}>组织结构图(0)</div>
                            <div className={'classify-item' + ' ' + (templateType === 5 ? 'active' : '')} onClick={() => switchTemplatesType(5)}>工程(0)</div>
                            <div className={'classify-item' + ' ' + (templateType === 6 ? 'active' : '')} onClick={() => switchTemplatesType(6)}>软件(0)</div>
                            <div className={'classify-item' + ' ' + (templateType === 7 ? 'active' : '')} onClick={() => switchTemplatesType(7)}>图形表格(0)</div>
                            <div className={'classify-item' + ' ' + (templateType === 8 ? 'active' : '')} onClick={() => switchTemplatesType(8)}>网络拓扑图(0)</div>
                            <div className={'classify-item' + ' ' + (templateType === 9 ? 'active' : '')} onClick={() => switchTemplatesType(9)}>Venn(0)</div>
                            <div className={'classify-item' + ' ' + (templateType === 10 ? 'active' : '')} onClick={() => switchTemplatesType(10)}>其它(0)</div>
                        </div>
                    </div>
                    <div className='graph-type-right'>
                        <div className='template-list'>
                            {templateData[templateType]?.map((item, index) => {
                                return <div className={'template-item' + ' ' + (isCreateByTemplateId === item.id ? "active" : "")} key={item.id} onClick={() => changeTempalge(item.id, item.graphType)}>
                                    <div className='template-item-mask'>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className='template-item-img'>
                                        {item.cover ? <img src={item.cover}></img> : null}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </CreateFormWrapper>
        </Modal>
    )
}
