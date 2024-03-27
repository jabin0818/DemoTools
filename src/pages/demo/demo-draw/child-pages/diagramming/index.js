import React, { useRef, useEffect, useState, useCallback } from 'react'

import { DiagrammingWrapper } from './style'

import LogicFlow from "@logicflow/core";

import { SelectionSelect, MiniMap, Snapshot } from '@logicflow/extension'

import "@logicflow/core/dist/style/index.css";

import '@logicflow/extension/lib/style/index.css'

import DiagramSidebar from './diagram-sidebar';

import PropertyPanel from './property-panel';

import DiagramToolbar from './diagram-toolbar';

import DiagramHeader from './diagram-header';

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
    CaretRightOutlined
} from '@ant-design/icons';

import { Dropdown, Space, Tooltip, Divider, Input, Collapse, theme, Button, message } from 'antd';

import { registerCustomElement } from '../components/node'

import { translationNodeData, translationEdgeData } from '@/utils/draw/translation.js';

import formatPointer from '@/assets/img/icon/formatPointer.svg'

import { useNavigate, useLocation, useParams } from 'react-router-dom'

import { getGraphById, updateGraph, getTemplatesOneById, updateTemplateGraph } from '@/service/draw.js'

export default function Diagramming() {

    const { id } = useParams();

    const navigate = useNavigate()

    const { pathname } = useLocation();

    const [messageApi, contextHolder] = message.useMessage();

    const refContainer = useRef();

    const sidebar = useRef();

    const [logicflow, setLogicflow] = useState(null);//画布实例

    const [isShowProPanel, setIsShowProPanel] = useState(false);//是否显示属性面板

    const [isShowHeaderPanel, setIsShowHeaderPanel] = useState(true);//是否显示头部面板

    const [isShowSidebarPanel, setIsShowSidebarPanel] = useState(true);//是否显示图形面板

    const [activeNodes, setActiveNodes] = useState([]);//节点数据

    const [activeEdges, setActiveEdges] = useState([]);//边数据

    const [properties, setProperties] = useState({});//某个节点的全部属性数据

    const enableShiftKeyRef = useRef(false);

    const enableCtrlKeyRef = useRef(false);

    const [enableCtrlKey, setEnableCtrlKey] = useState(false);

    const [enableSpaceKey, setEnableSpaceKey] = useState(false);//是否按下空格键

    const isEnterCanvasRef = useRef(false);// 鼠标是否进入画布

    const selectedRef = useRef();//复制的粘贴板

    const [formatPainter, setFormatPainter] = useState(null);//格式刷内容

    const [graphData, setGraphData] = useState(null);

    const [title, setTitle] = useState("");

    const [diagramType, setDiagramType] = useState("")

    // const [globalProperties, setGlobalProperties] = useState(null);
    const globalPropertiesRef = useRef(null);


    useEffect(() => {
        let type = pathname.split('/')[3];
        console.log(type);
        if (type === "diagramming") {
            getGraphData();
        } else if (type === "diagramTemp") {
            getTempGraphData();
        }
        setDiagramType(type);
        initLogicFlow();
        document.body.style.overflow = "hidden";
        return () => {
            removeShiftMouseEvent();
            document.body.style.overflow = "auto";
        }
    }, []);

    useEffect(() => {
        if (isShowSidebarPanel) {
            sidebar.current.style.flexBasis = "300px";
        } else {
            sidebar.current.style.flexBasis = "0px";
        }
    }, [isShowSidebarPanel]);

    useEffect(() => {
        // logicflow?.on('selection:selected,node:click,blank:click,edge:click', () => {
        //     setTimeout(() => {
        //         const { nodes, edges } = logicflow.getSelectElements()
        //         setActiveNodes(nodes);
        //         setActiveEdges(edges);
        //         obtainProperty(logicflow)
        //     }, 0)
        // })
        if (logicflow) {
            bindShiftMouseEvent()
            if (graphData) {
                logicflow.render(graphData);
            }
        }
    }, [logicflow, graphData])

    useEffect(() => {
        if (!logicflow) return;
        if (enableCtrlKey) {
            logicflow.updateEditConfig({
                stopZoomGraph: false,
            })
        } else {
            logicflow.updateEditConfig({
                stopZoomGraph: true,
            })
        }

        if (enableSpaceKey) {
            logicflow.updateEditConfig({
                stopMoveGraph: false,
            })
        } else {
            logicflow.updateEditConfig({
                stopMoveGraph: true,
            })
        }
    }, [enableCtrlKey, enableSpaceKey, logicflow])

    useEffect(() => {
        if (formatPainter) {
            changeMouseStyle(true)
        } else {
        }
    }, [formatPainter])

    useEffect(() => {
        if (activeNodes?.length === 0 && activeEdges?.length === 0) {
            message.destroy("closeFormatPainterTip")
            changeMouseStyle(false)
            setFormatPainter(null);
            return;
        }
        if (formatPainter) {

            if (formatPainter.nodes) {
                activeNodes.forEach((node) => {
                    logicflow.setProperties(node.id, formatPainter.nodes)
                })
            }
            if (formatPainter.edges) {
                activeNodes.forEach((node) => {
                    logicflow.setProperties(node.id, formatPainter.edges)
                })
            }
        }
    }, [activeNodes, activeEdges])

    function changeMouseStyle(format) {
        if (format) {
            refContainer.current.style.cursor = `url(${formatPointer}) 6 6, auto`
        } else {
            refContainer.current.style.cursor = "auto"
        }
    }


    function moveByScroll(val) {
        if (!isEnterCanvasRef.current) return;
        const { transformModel } = logicflow.graphModel;
        if (enableShiftKeyRef.current) {
            transformModel.translate(val, 0);
        } else if (enableCtrlKeyRef.current) {
            // 放大
        } else {
            transformModel.translate(0, -val);
        }
    }

    function moveByKeyBoard(direction) {
        const { transformModel } = logicflow.graphModel;
        if (direction === 'bottom') {
            transformModel.translate(0, 20);
        } else if (direction === 'right') {
            transformModel.translate(20, 0);
        } else if (direction === 'top') {
            transformModel.translate(0, -20);
        } else if (direction === 'left') {
            transformModel.translate(-20, 0);
        }
    }
    // const scrollFunc = useCallback((e) => {
    //     e = e || window.event;
    //     if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
    //         if (e.wheelDelta > 0) { //当滑轮向上滚动时
    //             // moveByScroll(-10)
    //         }
    //         if (e.wheelDelta < 0) { //当滑轮向下滚动时
    //             // moveByScroll(10)
    //         }
    //     } else if (e.detail) {  //Firefox滑轮事件
    //         if (e.detail > 0) { //当滑轮向上滚动时
    //             // moveByScroll(-10)
    //         }
    //         if (e.detail < 0) { //当滑轮向下滚动时
    //             // moveByScroll(10)
    //         }
    //     }
    // }, [])
    function scrollFunc(e) {
        e = e || window.event;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                moveByScroll(-20)
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                moveByScroll(20)
            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail > 0) { //当滑轮向上滚动时
                moveByScroll(-20)
            }
            if (e.detail < 0) { //当滑轮向下滚动时
                moveByScroll(20)
            }
        }
    }

    // const shortcutsKeyDown = useCallback((e) => {
    //     let keyCode = e.keyCode;
    //     if (keyCode === 16) {
    //         // shift
    //         enableShiftKeyRef.current = true;
    //     } else if (keyCode === 17) {
    //         // ctrl
    //         enableCtrlKeyRef.current = true;
    //         setEnableCtrlKey(true);
    //     } else if (keyCode === 32) {
    //         // space
    //         setEnableSpaceKey(true);
    //     } else if (keyCode === 40) {
    //         // ↓
    //         moveByKeyBoard("bottom");
    //     } else if (keyCode === 39) {
    //         // →
    //         moveByKeyBoard("right");
    //     } else if (keyCode === 38) {
    //         // ↑
    //         moveByKeyBoard("top");
    //     } else if (keyCode === 37) {
    //         // ←
    //         moveByKeyBoard("left");
    //     }
    // }, []);
    const keyCodeMap = {
        91: true, // command
        61: true,
        68: true, //d 收藏网址
        // 83: true, //s 保存网页
        107: true, // 数字键盘 +
        109: true, // 数字键盘 -
        173: true, // 火狐 - 号
        187: true, // +
        189: true // -
    }

    function shortcutsKeyDown(event) {
        // 禁用ctrl||command + ‘+’/‘-’ 缩放
        const e = event || window.event
        const ctrlKey = e.ctrlKey || e.metaKey
        if (ctrlKey && keyCodeMap[e.keyCode]) {
            e.preventDefault()
        } else if (e.detail) { // Firefox
            event.returnValue = false
        }

        if (ctrlKey && e.keyCode == 83) {
            // 节流
            console.log("保存逻辑")
            e.preventDefault()
        }

        let keyCode = event.keyCode;
        if (keyCode === 16) {
            // shift
            enableShiftKeyRef.current = true;
        } else if (keyCode === 17) {
            // ctrl
            enableCtrlKeyRef.current = true;
            setEnableCtrlKey(true);
        } else if (keyCode === 32) {
            // space
            setEnableSpaceKey(true);
        }
        // 取消自己绑定,使用logic官方自定义快捷键
        // else if (keyCode === 40) {
        //     // ↓
        //     moveByKeyBoard("bottom");
        // } else if (keyCode === 39) {
        //     // →
        //     moveByKeyBoard("right");
        // } else if (keyCode === 38) {
        //     // ↑
        //     moveByKeyBoard("top");
        // } else if (keyCode === 37) {
        //     // ←
        //     moveByKeyBoard("left");
        // }
    }

    const shortcutsKeyup = useCallback((e) => {
        let keyCode = e.keyCode;
        // 松开Shfit键
        if (keyCode === 16) {
            enableShiftKeyRef.current = false;
        } else if (keyCode === 17) {
            enableCtrlKeyRef.current = false;
            setEnableCtrlKey(false);
        } else if (keyCode === 32) {
            // space
            setEnableSpaceKey(false);
        } else if (keyCode) {

        }


    }, [])

    function bindShiftMouseEvent() {
        // 覆盖鼠标滑动
        // 禁用网页鼠标滚轮缩放
        document.body.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                if (e.deltaY < 0) {
                    e.preventDefault()
                    return false
                }
                if (e.deltaY > 0) {
                    e.preventDefault()
                    return false
                }
            }
        }, { passive: false })
        if (document.addEventListener) { //火狐使用DOMMouseScroll绑定
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        //其他浏览器直接绑定滚动事件
        window.onmousewheel = document.onmousewheel = scrollFunc;

        document.addEventListener('keydown', shortcutsKeyDown, false)
        document.addEventListener('keyup', shortcutsKeyup, false)
    }

    //销毁事件
    const removeShiftMouseEvent = () => {
        document.removeEventListener('DOMMouseScroll', scrollFunc, false);

        document.removeEventListener('keydown', shortcutsKeyDown, false);
        document.removeEventListener('keyup', shortcutsKeyup, false);
    }

    async function getGraphData() {
        let res = await getGraphById(id)
        console.log("获取图详细信息的接口：", res)
        if (res.code === 200) {
            setGraphData(JSON.parse(res.data.graph));
            setTitle(res.data.title);
        } else {
            navigate('/errorPage/404')
        }
    }

    async function getTempGraphData() {
        let res = await getTemplatesOneById(id)
        console.log("获取模板图详细信息的接口：", res)
        if (res.code === 200) {
            setGraphData(JSON.parse(res.data.graph));
            setTitle(res.data.title);
        } else {
            navigate('/errorPage/404')
        }
    }

    function initLogicFlow() {
        // LogicFlow.use(SelectionSelect);
        // MiniMap.setOption({
        //     width: 188,
        //     height: 200
        // })
        // LogicFlow.use(MiniMap);
        const lf = new LogicFlow({
            // width: 2000,
            // height: 1000,
            container: refContainer.current,
            overlapMode: 1,
            // autoWrap: true,
            autoExpand: false,
            adjustEdgeStartAndEnd: true,
            edgeTextDraggable: true,
            nodeTextDraggable: false,
            multipleSelectKey: "ctrl",
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
            background: {
                // backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")',
                // backgroundRepeat: 'repeat',
                // backgroundColor: "rgba(220, 224, 227, 1)"
            },
            stopScrollGraph: true,
            stopZoomGraph: true,
            stopMoveGraph: true,
            plugins: [SelectionSelect, MiniMap, Snapshot],
            // pluginsOptions: {
            //     miniMap: {
            //         width: 188,
            //         height: 200
            //     }
            // }
            // plugins: [
            //     [
            //         MiniMap, {
            //             width: 200,
            //             height: 80
            //         }
            //     ]
            // ]
            keyboard: {
                enabled: true,
                shortcuts: [
                    {
                        keys: ["left"],
                        callback: () => {
                            const { transformModel } = lf.graphModel;
                            transformModel.translate(-20, 0);
                        },
                    },
                    {
                        keys: ["right"],
                        callback: () => {
                            const { transformModel } = lf.graphModel;
                            transformModel.translate(20, 0);
                        },
                    },
                    {
                        keys: ["up"],
                        callback: () => {
                            const { transformModel } = lf.graphModel;
                            transformModel.translate(0, -20);
                        },
                    },
                    {
                        keys: ["down"],
                        callback: () => {
                            const { transformModel } = lf.graphModel;
                            transformModel.translate(0, 20);
                        },
                    },
                    {
                        keys: ["ctrl + ="],
                        callback: () => {
                            lf.zoom(true)
                        },
                    },
                    {
                        keys: ["ctrl + -"],
                        callback: () => {
                            lf.zoom(false)
                        },
                    },
                    {
                        keys: ["ctrl + 0"],
                        callback: () => {
                            lf.zoom(1)
                        },
                    },
                    {
                        keys: ["ctrl + d"],
                        callback: () => {
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
                        },
                    },
                    // 复制
                    {
                        keys: ['cmd + c', 'ctrl + c'],
                        callback: () => {
                            const { graphModel } = lf;
                            const elements = graphModel.getSelectElements(false);
                            selectedRef.current = elements;
                            selectedRef.current.nodes.forEach(node => translationNodeData(node, 40));
                            selectedRef.current.edges.forEach(edge => translationEdgeData(edge, 40));
                        },
                    },
                    // 粘贴
                    {
                        keys: ['cmd + v', 'ctrl + v'],
                        callback: () => {
                            if (selectedRef.current && (selectedRef.current.nodes || selectedRef.current.edges)) {
                                lf.clearSelectElements();
                                const addElements = lf.addElements(selectedRef.current);
                                if (!addElements) return true;
                                addElements.nodes.forEach(node => lf.selectElementById(node.id, true));
                                addElements.edges.forEach(edge => lf.selectElementById(edge.id, true));
                                selectedRef.current.nodes.forEach(node => translationNodeData(node, 40));
                                selectedRef.current.edges.forEach(edge => translationEdgeData(edge, 40));
                            }
                        },
                    },
                    // 剪切
                    {
                        keys: ['cmd + x', 'ctrl + x'],
                        callback: () => {
                            const { graphModel } = lf;
                            const elements = graphModel.getSelectElements(false);
                            lf.clearSelectElements();
                            elements.edges.forEach(edge => lf.deleteEdge(edge.id));
                            elements.nodes.forEach(node => lf.deleteNode(node.id));
                            selectedRef.current = elements;
                            selectedRef.current.nodes.forEach(node => translationNodeData(node, 0));
                            selectedRef.current.edges.forEach(edge => translationEdgeData(edge, 0));
                        },
                    },
                    // 克隆
                    {
                        keys: ['cmd + d', 'ctrl + d'],
                        callback: () => {
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
                        },
                    },
                ],
            },
        });
        //自定义事件 shift + 鼠标滚轮 左右滑动
        // lf.graphModel.eventCenter.emit("graph:left-right-move", {

        // });
        // lf.setTheme({
        //     outline: {
        //         fill: 'transparent',
        //         stroke: '#dd001b',
        //         strokeDasharray: '3,3',
        //         hover: {
        //             stroke: '#949494',
        //         },
        //     },
        //     arrow: {
        //         offset: 20,// 箭头长度
        //         verticalLength: 15,// 箭头宽度
        //     },
        // })
        // 注册自定义元素
        registerCustomElement(lf)
        lf.setDefaultEdgeType('pro-polyline')
        lf.render();
        setLogicflow((data) => {
            lf.on('selection:selected,node:click,blank:click,edge:click', () => {
                setTimeout(() => {
                    const { nodes, edges } = lf.getSelectElements()
                    setActiveNodes(nodes);
                    setActiveEdges(edges);
                    console.log("点击的节点:", nodes)
                    console.log("点击的边:", edges)
                    obtainProperty(lf)
                }, 0)
            })
            lf.on('edge:add', (data) => {
                setTimeout(() => {
                    // const { nodes, edges } = lf.getSelectElements()
                    // setActiveNodes(nodes);
                    // setActiveEdges(edges);
                    // console.log("点击的节点:", nodes)
                    // console.log("点击的边:", edges)
                    // obtainProperty(lf)
                    if (globalPropertiesRef.current) {
                        lf.setProperties(data.data.id, globalPropertiesRef.current)
                    }
                }, 0)
            })
            /**
             lf.getPointByClient
             获取事件位置相对于画布左上角的坐标
 
             画布所在的位置可以是页面任何地方，原生事件返回的坐标是相对于页面左上角的，
             该方法可以提供以画布左上角为原点的准确位置。
             * 
             */
            // getPointByClient(x: number, y: number)
            // lf.on('selection:mousemove', (e, position) => {
            //     setTimeout(() => {
            //         console.log(e.x, e.y, position)
            //     }, 0)
            // })
            return lf
        });
    }

    // 获取可以进行设置的属性
    function obtainProperty(lf) {
        let newProperties = {}
        if (lf) {
            const { nodes, edges } = lf?.getSelectElements();
            nodes.forEach(node => {
                let nodeModel = lf.getModelById(node.id)
                let width = nodeModel.width;
                let height = nodeModel.height;
                let radius = nodeModel.radius;
                newProperties = { ...newProperties, ...node.properties, width: width, height: height, radius: radius, x: node.x, y: node.y }
            })
            edges.forEach(edge => {
                newProperties = { ...newProperties, ...edge.properties, edgeType: edge.type }
            })
            setProperties(newProperties)
            return newProperties
        }
    }

    function resize(e) {
        if (e.x < 680) {
            const size = `${e.x}px`;
            sidebar.current.style.flexBasis = size;

            if (e.x === 0) {
                setIsShowSidebarPanel(false);
            } else {
                setIsShowSidebarPanel(true);
            }
        }
    }

    function resizerMouseDown() {
        sidebar.current.style.transition = 'none';
        document.addEventListener("mousemove", resize, false);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", resize, false);
            sidebar.current.style.transition = '';
        }, false);
    }

    function dragInNode(type) {
        logicflow.dnd.startDrag({
            type
        })
    }

    //用于toolbar左边的切换
    function toolbarChangeState(val) {
        if (val.type === "changeIsShowProPanel") {
            setIsShowProPanel(val.isShowProPanel);
        } else if (val.type === "changeIsShowHeaderPanel") {
            setIsShowHeaderPanel(val.isShowHeaderPanel);
        } else if (val.type === "changeIsShowSidebarPanel") {
            setIsShowSidebarPanel(val.isShowSidebarPanel);
        } else if (val.type === "changeIsFullScreen") {
            setIsShowProPanel(val.isShowProPanel);
            setIsShowHeaderPanel(val.isShowHeaderPanel);
            setIsShowSidebarPanel(val.isShowSidebarPanel);
        }
    }

    function setStyle(item) {
        if (item?.status === "lock") {
            item = { status: "lock" };
        }
        activeNodes.forEach(({ id, properties }) => {
            if (properties.status !== "lock") {
                logicflow.setProperties(id, item)
            } else if (properties.status === "lock" && item?.status === "unlock") {
                logicflow.setProperties(id, { status: "unlock" })
                updataAction()
            }
        })
        activeEdges.forEach(({ id, properties }) => {
            if (properties.status !== "lock") {
                logicflow.setProperties(id, item)
            } else if (properties.status === "lock" && item?.status === "unlock") {
                logicflow.setProperties(id, { status: "unlock" })
                updataAction()
            }
        })
        if (item?.isGlobal) {
            console.log(item)
            let golbalPro;
            if (globalPropertiesRef.current) {
                golbalPro = Object.assign(globalPropertiesRef.current, item)
            } else {
                golbalPro = item
            }
            // let freshProperties = obtainProperty(logicflow);
            console.log("是全局设置，进行记忆", golbalPro)
            // setGlobalProperties(freshProperties)
            globalPropertiesRef.current = golbalPro
        }
    }

    function updataAction() {
        const { nodes, edges } = logicflow.getSelectElements()
        setActiveNodes(nodes);
        setActiveEdges(edges);
    }

    // 修改宽 高 圆角 是否可拖拽
    function setShapeStyle(item) {
        activeNodes.forEach(({ id }) => {
            let nodeModel = logicflow.getNodeModelById(id);
            if (nodeModel.properties?.status === "lock") {
                if (item?.status === "unlock") {
                    console.log("解锁")
                    nodeModel.setAttributes({ status: "unlock" })
                    updataAction()
                } else if (item?.status === "lock") {
                    console.log("上锁1")
                    nodeModel.setAttributes({ status: "lock" })
                    updataAction()
                }
            } else if (!nodeModel.properties?.status || nodeModel.properties?.status === "unlock") {
                if (item?.status === "lock") {
                    console.log("上锁2")
                    nodeModel.setAttributes({ status: "lock" })
                    updataAction()
                } else {
                    console.log("修改宽 高 圆角 是否可拖拽")
                    nodeModel.setAttributes(item)
                }
            }
        })
        // activeEdges.forEach(({ id }) => {
        //     console.log(id, item)
        //     logicflow.setAttributes(id, item)
        // })
        obtainProperty(logicflow);
    }

    function changeLineType(value) {
        const val = value.target.value;
        const { graphModel } = logicflow;
        // logicflow.setDefaultEdgeType(val);
        if (activeEdges && activeEdges.length > 0) {
            activeEdges.forEach(edge => {
                graphModel.changeEdgeType(edge.id, val);
                setProperties((data) => {
                    return { ...data, edgeType: val }
                })
            })
        }
    }
    // todo issue #350
    // 线条图角
    // 文本旋转
    // 鼠标右键菜单
    // ctrl + x 后 ctrl + v 的位置为鼠标点击的位置
    // 高度可配置化
    // 节点锁定setElementState
    // --背景网格
    // --是否开启节点可拖拽
    // --边选中动画
    // --图形插入边

    function setZIndex(value) {
        const type = value.target.value;
        if (type === "top" || type === "bottom") {
            activeNodes.forEach(({ id }) => {
                logicflow.setElementZIndex(id, type)
            })
            activeEdges.forEach(({ id }) => {
                logicflow.setElementZIndex(id, type)
            })
        } else if (type === "up") {
            activeNodes.forEach(({ id, zIndex }) => {
                logicflow.setElementZIndex(id, zIndex + 1)
                setActiveNodes((data) => {
                    if (data?.length) {
                        data.find(item => item.id === id).zIndex += 1
                    }
                    return data
                })
            })
        } else if (type === "down") {
            activeNodes.forEach(({ id, zIndex }) => {
                console.log(id, zIndex)
                logicflow.setElementZIndex(id, zIndex - 1)
                setActiveNodes((data) => {
                    if (data?.length) {
                        data.find(item => item.id === id).zIndex -= 1
                    }
                    return data
                })
            })
        }

    }

    function moveNodes(value, type) {
        const { graphModel } = logicflow;

        // flat()扁平化结果
        let nodeIds = activeNodes.map(node => {
            if (node.properties.status !== "lock") {
                return node.id;
            } else {
                return [];
            }
        }).flat()
        if (nodeIds?.length) {
            if (type === 'toX') {
                graphModel.moveNodes(nodeIds, value, 0)
            } else if (type === 'toY') {
                graphModel.moveNodes(nodeIds, 0, value)
            }
        }
    }

    function mouseEnterCanvas() {
        isEnterCanvasRef.current = true;
    }

    function mouseLeaveCanvas() {
        isEnterCanvasRef.current = false;
    }

    // 编辑粘贴板
    function setSelectedRef(val) {
        selectedRef.current = val;
    }

    // 修改格式刷的内容
    function changeFormatPainter(val) {
        setFormatPainter(val);
        message.info({
            content: "点击画布空白处关闭格式刷模式",
            duration: 0,
            key: "closeFormatPainterTip"
        })
    }

    async function updateGraphData(data) {
        messageApi.open({
            key: 'updatable',
            type: 'loading',
            content: '加载中...',
        });
        let res = await updateGraph(data);
        console.log("保存图数据的接口：", res);
        if (res.code === 200) {
            messageApi.open({
                key: 'updatable',
                type: 'success',
                content: '保存成功!',
                duration: 2,
            });
        }
    }
    async function updateTempGraphData(data) {
        messageApi.open({
            key: 'updatable',
            type: 'loading',
            content: '加载中...',
        });
        let res = await updateTemplateGraph(data);
        console.log("修改官方模板数据的接口：", res);
        if (res.code === 200) {
            messageApi.open({
                key: 'updatable',
                type: 'success',
                content: '保存成功!',
                duration: 2,
            });
        }
    }

    function changeTitle(val) {
        setTitle(val.target.value)
    }

    return (
        <DiagrammingWrapper>
            {contextHolder}
            <div className={'diagramming-header' + " " + (isShowHeaderPanel ? "" : "diagramming-header-out")}>
                <DiagramHeader lf={logicflow} activeNodes={activeNodes} activeEdges={activeEdges} selectedRef={selectedRef} setSelectedRef={setSelectedRef} formatPainter={formatPainter} changeFormatPainter={changeFormatPainter} setStyle={setStyle} setShapeStyle={setShapeStyle} title={title} updateGraphData={updateGraphData} updateTempGraphData={updateTempGraphData} diagramType={diagramType} changeTitle={changeTitle} />
            </div>
            <div className={'diagramming-toolbar' + " " + (isShowHeaderPanel ? "" : "diagramming-toolbar-moveRight")}>
                <DiagramToolbar isShowPanel={{ isShowProPanel, isShowHeaderPanel, isShowSidebarPanel }} toolbarChangeState={toolbarChangeState} lf={logicflow} activeNodes={activeNodes} activeEdges={activeEdges} setStyle={setStyle} formatPainter={formatPainter} changeFormatPainter={changeFormatPainter} />
            </div>
            <div className='diagramming-designer' style={{ height: isShowHeaderPanel ? "calc(100vh - 128px)" : "calc(100vh - 39px)" }}>
                <div className='designer-sidebar' style={{ flexBasis: "300px" }} ref={sidebar}>
                    <DiagramSidebar dragInNode={dragInNode} />
                </div>
                <div className='designer-split' onMouseDown={() => resizerMouseDown()}></div>
                {/* <div className='designer-viewport scrollbar-default-styles'> */}
                <div className='designer-viewport' onMouseEnter={mouseEnterCanvas} onMouseLeave={mouseLeaveCanvas}>
                    <div className='canvas-container'>
                        <div ref={refContainer} className='designer-grids'></div>
                    </div>
                </div>
                <PropertyPanel isShowProPanel={isShowProPanel} elementsStyle={properties} setStyle={setStyle} setShapeStyle={setShapeStyle} changeLineType={changeLineType} setZIndex={setZIndex} moveNodes={moveNodes} />
            </div>
        </DiagrammingWrapper>
    )
}