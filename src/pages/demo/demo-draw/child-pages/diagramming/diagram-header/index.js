import React, { useState, useEffect } from 'react'

import {
    LeftOutlined,
    DownOutlined,
    SmileOutlined,
    DownloadOutlined,
    UndoOutlined,
    RedoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined,
    PicRightOutlined,
    ExpandOutlined,
    CompressOutlined,
    SearchOutlined,
    CaretRightOutlined,
    LockOutlined,
    UnlockOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import { Dropdown, Space, message, Tooltip, Divider, Input, Collapse, theme, Button } from 'antd';

import { translationNodeData, translationEdgeData } from '@/utils/draw/translation.js';

import { useParams, useNavigate } from 'react-router-dom'

import { insertGraph, saveOfficialTemplate } from '@/service/draw.js'

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export default function DiagramHeader(props) {

    const { lf, activeNodes, activeEdges, selectedRef, setSelectedRef, formatPainter, changeFormatPainter, setStyle, setShapeStyle, title, updateGraphData, updateTempGraphData, diagramType, changeTitle } = props;

    const { id } = useParams();

    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();

    const menuStyle = {
        item: {
            display: "flex",
            alignItems: "center",
            width: "100%",
        },
        icon: {
            width: "20px",
            fontSize: "16px"
        },
        left: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "calc(100% - 20px)",
            paddingLeft: "14px",
        },
        text: {
            fontSize: "14px",
            marginRight: "40px",
        },
        shortcuts: {
            fontSize: "13px",
            color: "#808080"
        },
    }

    const fileMenu = [
        {
            key: '1',
            label: (
                <div>
                    新建
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    保存
                </div>
            ),
            icon: <SmileOutlined />,
        },
        {
            key: '3',
            label: (
                <div>
                    保存为模板
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            label: (
                <div>
                    重命名
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div>
                    创建副本
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '6',
            label: (
                <div>
                    导出为
                </div>
            ),
        },
        {
            key: '7',
            label: (
                <div>
                    发布
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '8',
            label: (
                <div>
                    首选项
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '9',
            label: (
                <div>
                    关闭
                </div>
            ),
        },
    ];

    const canvasMenu = [
        {
            key: '1',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.text}>背景颜色</div>
                    <div style={menuStyle.shortcuts}>Ctrl+Shift+C</div>
                </div>
            ),
            icon: <SmileOutlined />
        },
        {
            key: '2',
            label: (
                <div>
                    显示网格
                </div>
            ),
            icon: <SmileOutlined />,
        },
        {
            key: '3',
            label: (
                <div>
                    网格大小
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div>
                    网格颜色
                </div>
            ),
        },
        {
            type: "divider"
        },
        {
            key: '5',
            label: (
                <div>
                    文本拖拽
                </div>
            ),
        },
        {
            key: '6',
            label: (
                <div>
                    线条选中动画
                </div>
            ),
        },
        {
            key: '7',
            label: (
                <div>
                    其它设置
                    {/* 对齐线 */}
                </div>
            ),
        },
    ];

    const insertMenu = [
        {
            key: 'pro-rect',
            label: (
                <div>
                    矩形
                </div>
            ),
        },
        {
            key: 'pro-ellipse',
            label: (
                <div>
                    椭圆形
                </div>
            ),
        },
        {
            key: 'pro-diamond',
            label: (
                <div>
                    菱形
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'pro-text',
            label: (
                <div>
                    文本
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div>
                    线条
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '6',
            label: (
                <div>
                    图片
                </div>
            ),
            display: "none"
        },
    ];

    const ohterMenu = [
        {
            key: '1',
            label: (
                <div>
                    自动保存
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    预览模式
                </div>
            ),
            icon: <SmileOutlined />,
        },
    ];

    const helpMenu = [
        {
            key: '1',
            label: (
                <div>
                    欢迎指引
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    快捷键
                </div>
            ),
            icon: <SmileOutlined />,
        },
        {
            key: '3',
            label: (
                <div>
                    说明文档
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div>
                    意见反馈
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div>
                    支持我们
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div>
                    关于我们
                </div>
            ),
        },
    ];

    const [dropdownTrigger, setDropdownTrigger] = useState("click");//下拉菜单的触发方式，默认是click，当点击其中一个后且鼠标没有移出header list则改为hover

    const [undoAble, setUndoAble] = useState(false);

    const [redoAble, setRedoAble] = useState(false);

    const [deleteAble, setDeleteAble] = useState(false);//能否删除

    const [editAble, setEditAble] = useState(false);//能否复制剪切克隆

    const [checkAll, setCheckAll] = useState(false);//是否全选

    const [titleAble, setTitleAble] = useState(true);//标题是否只读

    const editMenu = [
        {
            key: 'undo',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}>
                        <i className='iconfont icon-caozuo-chexiao toolIcon'></i>
                    </div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>撤销</div>
                        <div style={menuStyle.shortcuts}>Ctrl+Z</div>
                    </div>
                </div>
            ),
            disabled: !undoAble
        },
        {
            key: 'redo',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}>
                        <i style={menuStyle.icon} className='iconfont icon-caozuo-zhongzuo toolIcon'></i>
                    </div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>重做</div>
                        <div style={menuStyle.shortcuts}>Ctrl+Y</div>
                    </div>
                </div>
            ),
            disabled: !redoAble
        },
        {
            type: "divider"
        },
        {
            key: 'shear',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}></div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>剪切</div>
                        <div style={menuStyle.shortcuts}>Ctrl+X</div>
                    </div>
                </div>
            ),
            disabled: !editAble
        },
        {
            key: 'copy',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}></div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>复制</div>
                        <div style={menuStyle.shortcuts}>Ctrl+C</div>
                    </div>
                </div>
            ),
            disabled: !editAble
        },
        {
            key: 'copyToimage',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}></div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>复制为图像</div>
                        <div style={menuStyle.shortcuts}></div>
                    </div>
                </div>
            ),
            disabled: !editAble
        },
        {
            key: 'paste',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}></div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>粘贴</div>
                        <div style={menuStyle.shortcuts}>Ctrl+V</div>
                    </div>
                </div>
            ),
            disabled: !selectedRef?.current?.nodes
        },
        {
            key: 'clone',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}></div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>克隆</div>
                        <div style={menuStyle.shortcuts}>Ctrl+D</div>
                    </div>
                </div>
            ),
            disabled: !editAble
        },
        {
            type: "divider"
        },
        {
            key: 'formatPainter',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}>
                        <i className='iconfont icon-geshishua1 toolIcon'></i>
                    </div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>格式刷</div>
                        <div style={menuStyle.shortcuts}>Ctrl+Shift+C</div>
                    </div>
                </div>
            ),
            disabled: !deleteAble
        },
        {
            key: '8',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}>
                        <i className='iconfont icon-a-Property1mofabang toolIcon'></i>
                    </div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>一键美化</div>
                        <div style={menuStyle.shortcuts}></div>
                    </div>
                </div>
            ),
        },
        {
            key: '9',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}></div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>默认样式</div>
                        <div style={menuStyle.shortcuts}></div>
                    </div>
                </div>
            ),
            disabled: !deleteAble
        },
        {
            type: "divider"
        },
        {
            key: 'changeSelectStatus',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}></div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>全选/全不选</div>
                        <div style={menuStyle.shortcuts}></div>
                    </div>
                </div>
            ),
        },
        {
            type: "divider"
        },
        {
            key: 'changeLockStatus',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}>
                        <LockOutlined />
                        {/* <UnlockOutlined /> */}
                    </div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>锁定/解锁</div>
                        <div style={menuStyle.shortcuts}></div>
                    </div>
                </div>
            ),
            disabled: !editAble
        },
        {
            key: 'deleteBtn',
            label: (
                <div style={menuStyle.item}>
                    <div style={menuStyle.icon}>
                        <DeleteOutlined />
                    </div>
                    <div style={menuStyle.left}>
                        <div style={menuStyle.text}>删除</div>
                        <div style={menuStyle.shortcuts}>Backspace/Delete</div>
                    </div>
                </div>
            ),
            disabled: !deleteAble
        },
    ];

    // redux
    const { profile, isLogin } = useSelector((state) => ({
        profile: state.loginState.get("profile"),
        isLogin: state.loginState.get("isLogin")
    }), shallowEqual)

    useEffect(() => {
        lf?.on('history:change', ({ data: { undoAble, redoAble } }) => {
            setUndoAble(undoAble)
            setRedoAble(redoAble)
        })
    }, [lf])

    useEffect(() => {
        if (!lf) return;
        if (activeNodes?.length || activeEdges?.length) {
            setDeleteAble(true);
        } else {
            setDeleteAble(false);
            setCheckAll(false);
        }
        if (activeNodes?.length) {
            setEditAble(true);
        } else {
            setEditAble(false);
        }
    }, [lf, activeNodes, activeEdges])

    function backPage() {
        navigate(-1)
    }

    function menuClick() {
        setDropdownTrigger("hover")
    }

    function editMenuClick(val) {
        const keyName = val.key;
        switch (keyName) {
            case "undo":
                if (undoAble) {
                    lf.undo()
                }
                break;
            case "redo":
                if (redoAble) {
                    lf.redo()
                }
                break;
            case "shear": {
                const { graphModel } = lf;
                const elements = graphModel.getSelectElements(false);
                lf.clearSelectElements();
                elements.edges.forEach(edge => lf.deleteEdge(edge.id));
                elements.nodes.forEach(node => lf.deleteNode(node.id));
                elements.nodes.forEach(node => translationNodeData(node, 40));
                elements.edges.forEach(edge => translationEdgeData(edge, 40));
                setSelectedRef(elements)
                break;
            }
            case "copy": {
                const { graphModel } = lf;
                const elements = graphModel.getSelectElements(false);
                elements.nodes.forEach(node => translationNodeData(node, 40));
                elements.edges.forEach(edge => translationEdgeData(edge, 40));
                setSelectedRef(elements)
                break;
            }
            case "paste":
                if (selectedRef.current && (selectedRef.current.nodes || selectedRef.current.edges)) {
                    lf.clearSelectElements();
                    const addElements = lf.addElements(selectedRef.current);
                    if (!addElements) return true;
                    addElements.nodes.forEach(node => lf.selectElementById(node.id, true));
                    addElements.edges.forEach(edge => lf.selectElementById(edge.id, true));
                    selectedRef.current.nodes.forEach(node => translationNodeData(node, 40));
                    selectedRef.current.edges.forEach(edge => translationEdgeData(edge, 40));
                }
                break;
            case "clone": {
                const { edges, nodes } = lf.getSelectElements(true);
                let nodeIdMap = {};
                nodes.forEach((e) => {
                    let newNodeInfo = lf.cloneNode(e.id);
                    nodeIdMap[e.id] = newNodeInfo.id
                })
                edges?.forEach((e) => {
                    lf.graphModel.addEdge({
                        type: e.type,
                        sourceNodeId: nodeIdMap[e.sourceNodeId],
                        targetNodeId: nodeIdMap[e.targetNodeId],
                        text: e.text,
                    });
                })
                break;
            }
            case "formatPainter": {
                const { graphModel } = lf;
                const { nodes, edges } = graphModel.getSelectElements(false);
                let edgesPro = { ...edges[0]?.properties }
                if (edges[0]?.type) {
                    edgesPro[type] = edges[0]?.type
                }
                changeFormatPainter({
                    nodes: nodes[0]?.properties,
                    edges: edgesPro
                })
                break;
            }
            case "changeSelectStatus": {
                const { graphModel } = lf;
                if (checkAll) {
                    graphModel.clearSelectElements();
                    setCheckAll(false);
                } else {
                    graphModel.clearSelectElements();
                    for (const edgeKey in graphModel.edgesMap) {
                        graphModel.selectEdgeById(edgeKey, true)
                    }
                    for (const nodeKey in graphModel.nodesMap) {
                        // if (Object.hasOwnProperty.call(graphModel.nodesMap, key)) {
                        //     const element = graphModel.nodesMap[key];
                        //     console.log(element.model)
                        // }
                        graphModel.selectNodeById(nodeKey, true)
                    }

                    setCheckAll(true);
                }
                break;
            }
            case "changeLockStatus": {
                const elements = lf.graphModel.getSelectElements(true);
                let isAllLockStatus = true;//是否全都锁定了
                elements.nodes.forEach(node => {
                    if (node.properties?.status !== "lock") {
                        isAllLockStatus = false;
                    }
                })
                elements.edges.forEach(edge => {
                    if (edge.properties?.status !== "lock") {
                        isAllLockStatus = false;
                    }
                })
                setStyle({ status: isAllLockStatus ? "unlock" : "lock" })
                setShapeStyle({ status: isAllLockStatus ? "unlock" : "lock" })
                break;
            }
            case "deleteBtn": {
                if (deleteAble) {
                    const elements = lf.graphModel.getSelectElements(true);
                    lf.clearSelectElements();
                    elements.edges.forEach(edge => lf.deleteEdge(edge.id));
                    elements.nodes.forEach(node => lf.deleteNode(node.id));
                    setDeleteAble(false);
                }
                break;
            }
            default:
                break;
        }
    }

    async function saveGraphBtn() {
        let data = lf.getGraphRawData();
        let res = await lf.getSnapshotBlob("#fff")

        let fileName = new Date().getTime() + ".png";
        let coverFile = new File([res.data], fileName, { type: 'image/png' });
        if (diagramType === "diagramming") {
            updateGraphData({ id: id, title: title, graphType: 0, graph: JSON.stringify(data), coverFile })
        } else if (diagramType === "diagramTemp") {
            updateTempGraphData({ id: id, title: title, graphType: 0, templateType: 0, graph: JSON.stringify(data), coverFile })
        }
    }

    async function asTempGraphBtn() {
        messageApi.open({
            key: 'saveAsTemp',
            type: 'loading',
            content: '加载中...',
        });
        let data = lf.getGraphRawData();
        let cover = await lf.getSnapshotBlob("#fff")
        let fileName = new Date().getTime() + ".png";
        let coverFile = new File([cover.data], fileName, { type: 'image/png' });
        let res = await insertGraph({ title, graphType: 0, graph: JSON.stringify(data), template: 1, coverFile });
        console.log("保存为模板接口：", res);
        if (res.code === 200) {
            messageApi.open({
                key: 'saveAsTemp',
                type: 'success',
                content: '保存成功!前往查看',
                duration: 3,
                onClick: () => {
                    navigate(`/demo/draw/template_create`)
                },
                style: {
                    cursor: 'pointer',
                },
            });
        }
    }

    async function asOfficialTempGraphBtn() {
        messageApi.open({
            key: 'saveAsTemp',
            type: 'loading',
            content: '加载中...',
        });
        let data = lf.getGraphRawData();
        let cover = await lf.getSnapshotBlob("#fff");
        let fileName = new Date().getTime() + ".png";
        let coverFile = new File([cover.data], fileName, { type: 'image/png' });
        console.log(coverFile)
        let res = await saveOfficialTemplate({ title, graphType: 0, templateType: 1, graph: JSON.stringify(data), coverFile: coverFile });
        console.log("保存为官方模板接口：", res);
        if (res.code === 200) {
            messageApi.open({
                key: 'saveAsTemp',
                type: 'success',
                content: '保存成功!',
                duration: 3,
                // onClick: () => {
                //     navigate(`/demo/draw/template_create`)
                // },
                // style: {
                //     cursor: 'pointer',
                // },
            });
        }
    }

    async function getSnapshot() {
        lf.getSnapshot()
        // let res = await lf.getSnapshotBase64("#fff")
        // let res = await lf.getSnapshotBlob("#fff")
        // let coverFile = new File(res, 'any');
        // let res = lf.extension.snapshot.getSvgRootElement(lf)
        // console.log(res)
    }

    return (
        <>
            {contextHolder}
            <div className='diagramming-header-left'>
                <div className='back' onClick={() => backPage()}>
                    <LeftOutlined />
                    <span>返回</span>
                </div>
                <div className='title-menu'>
                    <div className='title'>
                        <input value={title} readOnly={titleAble} onChange={changeTitle} onDoubleClick={() => setTitleAble(false)} onBlur={() => setTitleAble(true)} />
                    </div>
                    <div className='menu' onMouseLeave={() => setDropdownTrigger("click")}>
                        <Space>
                            <div className='menu-button'>
                                <Dropdown menu={{ items: fileMenu }} trigger={[dropdownTrigger]} onClick={() => menuClick()}>
                                    <a onClick={(e) => e.preventDefault()}>文件</a>
                                </Dropdown>
                            </div>
                            <div className='menu-button'>
                                <Dropdown menu={{ items: editMenu, onClick: editMenuClick }} trigger={[dropdownTrigger]} onClick={() => menuClick()}>
                                    <a onClick={(e) => e.preventDefault()}>编辑</a>
                                </Dropdown>
                            </div>
                            {/* <div className='menu-button'>
                                <Dropdown menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>视图</a>
                                </Dropdown>
                            </div> */}
                            <div className='menu-button'>
                                <Dropdown menu={{ items: insertMenu }} trigger={[dropdownTrigger]} onClick={() => menuClick()}>
                                    <a onClick={(e) => e.preventDefault()}>插入</a>
                                </Dropdown>
                            </div>
                            <div className='menu-button'>
                                <Dropdown menu={{ items: canvasMenu }} trigger={[dropdownTrigger]} onClick={() => menuClick()}>
                                    <a onClick={(e) => e.preventDefault()}>画布</a>
                                </Dropdown>
                            </div>
                            <div className='menu-button'>
                                <Dropdown menu={{ items: ohterMenu }} trigger={[dropdownTrigger]} onClick={() => menuClick()}>
                                    <a onClick={(e) => e.preventDefault()}>其它</a>
                                </Dropdown>
                            </div>
                            <div className='menu-button'>
                                <Dropdown menu={{ items: helpMenu }} trigger={[dropdownTrigger]} onClick={() => menuClick()}>
                                    <a onClick={(e) => e.preventDefault()}>帮助</a>
                                </Dropdown>
                            </div>
                        </Space>
                    </div>
                </div>
            </div>
            <div className='diagramming-header-right'>
                <Space>
                    <div className='download-btn save' onClick={() => saveGraphBtn()}>
                        <span>保存</span>
                    </div>
                    <div className='download-btn asTemp' onClick={() => asTempGraphBtn()}>
                        <span>保存为模板</span>
                    </div>
                    {isLogin && profile.id === 1 ? <div className='download-btn asTemp' onClick={() => asOfficialTempGraphBtn()}>
                        <span>保存为官方模板</span>
                    </div> : null}
                    <div className='download-btn exportTo' onClick={() => getSnapshot()}>
                        <DownloadOutlined />
                    </div>
                </Space>
            </div>
        </>
    )
}
