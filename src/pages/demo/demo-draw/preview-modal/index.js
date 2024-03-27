import React, { useState, useEffect, useRef } from 'react'

import { PreviewModalWrapper } from './style'

import { Modal, Button, Rate, Space } from 'antd'

import { insertGraph, getTemplates, getTemplatesOneById } from '@/service/draw.js'

import LogicFlow from "@logicflow/core";

import { registerCustomElement } from '../child-pages/components/node'

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom'


export default function PreviewModal(props) {

    const navigate = useNavigate();

    const { isShowPreviewModal, closePreviewModal, templateInfo } = props;

    const [graphData, setGraphData] = useState(null);

    const previewGraphRef = useRef();

    const [logicflow, setLogicflow] = useState(null);//画布实例

    // redux
    const { profile, isLogin } = useSelector((state) => ({
        profile: state.loginState.get("profile"),
        isLogin: state.loginState.get("isLogin")
    }), shallowEqual)

    useEffect(() => {
        if (isShowPreviewModal && logicflow === null) {
            console.log("第一次初始化lf")
            initLogicFlow();
        }
    }, [templateInfo?.id])

    useEffect(() => {
        if (templateInfo?.id) {
            getPreviewGraphData(templateInfo?.id);
        }
    }, [templateInfo?.id])

    useEffect(() => {
        if (logicflow) {
            if (graphData) {
                logicflow.render(JSON.parse(graphData));
                logicflow.fitView();
            }
        }
    }, [logicflow, graphData])


    async function getPreviewGraphData(id) {
        let res = await getTemplatesOneById(id);
        console.log("根据id获取模板数据的接口：", res);
        if (res.code === 200) {
            setGraphData(res.data.graph);
        }
    }

    function initLogicFlow() {
        const lf = new LogicFlow({
            width: 752,
            height: 540,
            container: previewGraphRef.current,
            isSilentMode: true,
            keyboard: {
                enabled: true
            },
            grid: {
                size: 5,
                visible: true,
                type: "mesh",
                config: {
                    color: "#e2e2e2", // 网格颜色
                    thickness: 1, // 网格线宽度
                }
            },
        });
        // 注册自定义元素
        registerCustomElement(lf)
        lf.render();
        setLogicflow(lf);
    }

    function updateTemplate() {
        if (templateInfo) {
            navigate(`/demo/draw/diagramTemp/${templateInfo.id}`)
        }
    }


    return (
        <Modal
            open={isShowPreviewModal}
            onCancel={() => closePreviewModal()}
            centered={true}
            title={
                "模板预览"
            }
            footer={
                null
            }
            width={800}
            wrapClassName="previewModalWrapper">
            <PreviewModalWrapper>
                <div className='preview-info'>
                    <div className='preivew-info-left'>
                        <Space>
                            <div className='title'>{templateInfo?.title}</div>
                            <div className='score'>
                                <Rate disabled defaultValue={templateInfo?.score} />
                            </div>
                        </Space>
                    </div>
                    <div className='preivew-info-right'>
                        <Space>
                            <div className='update-template-btn'>
                                {isLogin && profile.id === 1 ? <Button type="primary" ghost onClick={() => updateTemplate()}>编辑</Button> : null}
                            </div>
                            <div className='use-template-btn'>
                                <Button type="primary">使用</Button>
                            </div>
                        </Space>
                    </div>
                </div>
                <div className='preview-graph'>
                    <div ref={previewGraphRef} className='graph'></div>
                </div>
            </PreviewModalWrapper>
        </Modal>

    )
}
