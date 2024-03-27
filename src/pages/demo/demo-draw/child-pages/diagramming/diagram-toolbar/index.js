import React, { useState, useEffect, useMemo } from 'react'

import {
    ZoomInOutlined,
    CaretDownOutlined,
    LayoutOutlined,
    ZoomOutOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined,
    PicRightOutlined,
    ExpandOutlined,
    CompressOutlined,
    CheckOutlined,
    DeleteOutlined,
    PlusOutlined,
    LeftOutlined,
    DownOutlined,
    SmileOutlined,
    DownloadOutlined,
    UndoOutlined,
    RedoOutlined,
    CaretUpOutlined,
    SearchOutlined,
    CaretRightOutlined
} from '@ant-design/icons';

import { Dropdown, Space, Tooltip, Divider, Input, Collapse, theme, Button } from 'antd';

import PickColor from "@/components/pick-color"

import { colorObj, colorStr } from '@/utils/util';


export default function DiagramToolbar(props) {

    const { isShowPanel, toolbarChangeState, lf, activeNodes, activeEdges, setStyle, formatPainter, changeFormatPainter } = props;

    const arrowStyleItemsClick = (e) => {
        let keyNum = e.key;
        setArrowStyle(keyNum)
        setStyle({ arrowStyle: keyNum, isGlobal: true })
        // switch (keyNum) {
        //     case "triangle-full1":
        //         setStyle({ arrowStyle: "full" })
        //         break;
        //     case "arrow-left":
        //         setStyle({ startArrowType: "start", endArrowType: null, arrowStyle: "full" })
        //         break;
        //     case "arrow-double":
        //         setStyle({ startArrowType: "start", endArrowType: "end", arrowStyle: "full" })
        //         break;
        //     case "arrow-none":
        //         setStyle({ startArrowType: null, endArrowType: null, })
        //         break;
        //     default:
        //         break;
        // }
    }

    const arrowImgStyle = {
        fontSize: "14px",
        marginRight: "4px",
        transform: "scaleX(-1)"
    }

    const setArrowStyleItems = [
        {
            key: 'triangle-full1',
            icon: <img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAzMiAyMCIgdmVyc2lvbj0iMS4xIj48cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LDIpIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0gMCA4IEwgOCAyIEwgOCAxNCBaIE0gMCA4IEwgMjQgOCIgc3Ryb2tlPSIjNDA0MDQwIiBmaWxsPSIjNDA0MDQwIi8+PC9zdmc+" style={arrowImgStyle}></img>,
        },
        {
            key: 'triangle-full2',
            icon: <img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAzMiAyMCIgdmVyc2lvbj0iMS4xIj48cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LDIpIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0gMCA4IEwgMTAgMiBMIDUgOCBMIDEwIDE0IFogTSAwIDggTCAyNCA4IiBzdHJva2U9IiM0MDQwNDAiIGZpbGw9IiM0MDQwNDAiLz48L3N2Zz4=" style={arrowImgStyle}></img>,
        },
        {
            key: 'triangle-hollow',
            icon: <img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAzMiAyMCIgdmVyc2lvbj0iMS4xIj48cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LDIpIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0gMCA4IEwgOCAyIEwgOCAxNCBaIE0gOCA4IEwgMjQgOCIgc3Ryb2tlPSIjNDA0MDQwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjwvc3ZnPg==" style={arrowImgStyle}></img>,
        },
        {
            key: 'triangle-solid',
            icon: <img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAzMiAyMCIgdmVyc2lvbj0iMS4xIj48cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LDIpIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0gOCAwIEwgMCA4IEwgOCAxNiBNIDAgOCBMIDI0IDgiIHN0cm9rZT0iIzQwNDA0MCIgZmlsbD0idHJhbnNwYXJlbnQiLz48L3N2Zz4=" style={arrowImgStyle}></img>,
        },
        {
            key: 'round-full',
            icon: <img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAzMiAyMCIgdmVyc2lvbj0iMS4xIj48cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LDIpIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0gMCA4IEEgNSA1IDAgMCAxIDUgMyBBIDUgNSAwIDAgMSAxMSA4IEEgNSA1IDAgMCAxIDUgMTMgQSA1IDUgMCAwIDEgMCA4IFogTSAxMCA4IEwgMjQgOCIgc3Ryb2tlPSIjNDA0MDQwIiBmaWxsPSIjNDA0MDQwIi8+PC9zdmc+" style={arrowImgStyle}></img>,
        },
        {
            key: 'round-hollow',
            icon: <img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMHB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAzMiAyMCIgdmVyc2lvbj0iMS4xIj48cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LDIpIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0gMCA4IEEgNSA1IDAgMCAxIDUgMyBBIDUgNSAwIDAgMSAxMSA4IEEgNSA1IDAgMCAxIDUgMTMgQSA1IDUgMCAwIDEgMCA4IFogTSAxMCA4IEwgMjQgOCIgc3Ryb2tlPSIjNDA0MDQwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjwvc3ZnPg==" style={arrowImgStyle}></img>,
        },
        {
            key: 'none',
            icon: <span style={{ fontSize: "14px", marginRight: "4px", }}>无</span>
        },
    ];

    const [isShowThumbnail, setIsShowThumbnail] = useState(false);

    const [isFullScreen, setIsFullScreen] = useState(false);

    const [undoAble, setUndoAble] = useState(false);

    const [redoAble, setRedoAble] = useState(false);

    const [scale, setScale] = useState(100);

    const [deleteAble, setDeleteAble] = useState(false);

    const [backgroundColor, setBackgroundColor] = useState({
        r: '255',
        g: '255',
        b: '255',
        a: '1',
    });

    const [isShowBGCPicker, setIsShowBGCPicker] = useState(false); // 是否显示画布背景颜色选择器的tooltip

    const [lineType, setLineType] = useState("pro-polyline");//连接线的类型 折线 pro-polyline、直线 pro-line、曲线 pro-bezier

    const lineTypeIconClass = useMemo(() => {
        if (lineType === "pro-polyline") {
            return "iconfont icon-brokenLine"
        } else if (lineType === "pro-line") {
            return "iconfont icon-straight"
        } else if (lineType === "pro-bezier") {
            return "iconfont icon-curve"
        } else if (lineType === "pro-curved") {
            return "iconfont icon-curved"
        }
    }, [lineType])

    const [arrowType, setArrowType] = useState("arrow-none");//箭头类型 arrow-right arrow-left arrow-double arrow-none

    const arrowTypeIconClass = useMemo(() => {
        switch (arrowType) {
            case "arrow-right":
                return "iconfont icon-arrow-right"
            case "arrow-left":
                return "iconfont icon-arrow-left"
            case "arrow-double":
                return "iconfont icon-arrow-double"
            case "arrow-none":
                return "iconfont icon-arrow-line"
            default:
                return "iconfont icon-arrow-right"
        }
    }, [arrowType])

    const [arrowStyle, setArrowStyle] = useState("none");//箭头样式 triangle-full1

    const arrowStyleIcon = useMemo(() => {
        // if (arrowStyle === "none") {
        //     return <span style={{ fontSize: "14px", marginRight: "4px" }}>无</span>
        // }
        return setArrowStyleItems.find((item) => item.key === arrowStyle).icon
    }, [arrowStyle])

    const layoutItemsClick = (e) => {
        let keyNum = e.key;
        switch (keyNum) {
            case "1":
                changeIsShowSidebarPanel()
                break;
            case "2":
                changeIsShowProPanel()
                break;
            case "3":
                changeIsShowThumbnail()
                break;
            case "4":
                changeFullScreen()
                break;
            default:
                break;
        }
    }

    const layoutItemStyle = {
        item: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "3px",
        },
        selectedIcon: {

        },
        text: {
            fontSize: "14px",
            marginRight: "10px",
        },
        shortcuts: {
            fontSize: "13px",
            color: "#808080"
        },
    }

    const setLayoutItems = [
        {
            key: '1',
            label: (
                <div style={layoutItemStyle.item}>
                    <div style={layoutItemStyle.text}>图形</div>
                    <div style={layoutItemStyle.shortcuts}>Ctrl+Shift+K</div>
                </div>
            ),
            icon: <CheckOutlined style={{ visibility: isShowPanel.isShowSidebarPanel ? "" : "hidden" }} />,
        },
        {
            key: '2',
            label: (
                <div style={layoutItemStyle.item}>
                    <div style={layoutItemStyle.text}>样式</div>
                    <div style={layoutItemStyle.shortcuts}>Ctrl+Shift+K</div>
                </div>
            ),
            icon: <CheckOutlined style={{ visibility: isShowPanel.isShowProPanel ? "" : "hidden" }} />,
        },
        {
            key: '3',
            label: (
                <div style={layoutItemStyle.item}>
                    <div style={layoutItemStyle.text}>缩略图</div>
                    <div style={layoutItemStyle.shortcuts}>Ctrl+Shift+O</div>
                </div>
            ),
            icon: <CheckOutlined style={{ visibility: isShowThumbnail ? "" : "hidden" }} />,
        },
        {
            key: '4',
            label: (
                <div style={layoutItemStyle.item}>
                    <div style={layoutItemStyle.text}>全屏</div>
                    <div style={layoutItemStyle.shortcuts}>Ctrl+Shift+O</div>
                </div>
            ),
            icon: <CheckOutlined style={{ visibility: isFullScreen ? "" : "hidden" }} />,
        },
    ];

    const zoomItemsClick = (e) => {
        let keyNum = e.key;
        switch (keyNum) {
            case "1":
                resetTranslate()
                break;
            case "2":
                zoomByNum(0.23)
                break;
            case "3":
                zoomByNum(0.55)
                break;
            case "4":
                zoomByNum(0.75)
                break;
            case "5":
                zoomByNum(1)
                break;
            case "6":
                zoomByNum(1.52)
                break;
            case "7":
                zoomByNum(2)
                break;
            case "8":
                zoomByNum(3)
                break;
            case "9":
                positionCenter()
                break;
            case "10":
                adaptive()
                break;
            case "11":
                resetZoom()
            default:
                break;
        }
    }

    const setZoomItems = [
        {
            key: '1',
            label: (
                <div>
                    恢复画布原有位置
                </div>
            ),
        },
        {
            key: '11',
            label: (
                <div>
                    重置图形缩放比例
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: (
                <div>
                    23%
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div>
                    55%
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div>
                    75%
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div>
                    100%
                </div>
            ),
        },
        {
            key: '6',
            label: (
                <div>
                    152%
                </div>
            ),

        },
        {
            key: '7',
            label: (
                <div>
                    200%
                </div>
            ),
        },
        {
            key: '8',
            label: (
                <div>
                    300%
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
                    定位到中心
                </div>
            ),
        },
        {
            key: '10',
            label: (
                <div>
                    自适应
                </div>
            ),
        },
    ];

    const arrowItemsStyle = {
        fontSize: "22px",
        padding: "0"
    }

    const arrowTypeItemsClick = (e) => {
        let keyNum = e.key;
        setArrowType(keyNum);
        switch (keyNum) {
            case "arrow-right":
                setStyle({ startArrowType: null, endArrowType: "end", arrowStyle: arrowStyle, isGlobal: true })
                break;
            case "arrow-left":
                setStyle({ startArrowType: "start", endArrowType: null, arrowStyle: arrowStyle, isGlobal: true })
                break;
            case "arrow-double":
                setStyle({ startArrowType: "start", endArrowType: "end", arrowStyle: arrowStyle, isGlobal: true })
                break;
            case "arrow-none":
                setStyle({ startArrowType: null, endArrowType: null, arrowStyle: arrowStyle, isGlobal: true })
                break;

            default:
                break;
        }
    }

    const setArrowTypeItems = [
        {
            key: 'arrow-right',
            icon: <i className='iconfont icon-arrow-right' style={arrowItemsStyle}></i>,
        },
        {
            key: 'arrow-left',
            icon: <i className='iconfont icon-arrow-left' style={arrowItemsStyle}></i>,
        },
        {
            key: 'arrow-double',
            icon: <i className='iconfont icon-arrow-double' style={arrowItemsStyle}></i>,
        },
        {
            key: 'arrow-none',
            icon: <i className='iconfont icon-arrow-line' style={arrowItemsStyle}></i>,
        },
        // {
        //     key: '5',
        //     label: (
        //         <div>
        //             保留
        //         </div>
        //     ),
        // },
    ];



    const lineStyleItemsClick = (e) => {
        if (lf) {
            let keyNum = e.key;
            lf.setDefaultEdgeType(keyNum);
            setLineType(keyNum)
        }
    }

    const lineItemsStyle = {
        fontSize: "18px"
    }

    const setlineStyleItems = [
        {
            key: 'pro-polyline',
            label: (
                <div>
                    折线
                </div>
            ),
            icon: <i className='iconfont icon-brokenLine' style={lineItemsStyle}></i>,
        },
        {
            key: 'pro-line',
            label: (
                <div>
                    直线
                </div>
            ),
            icon: <i className='iconfont icon-straight' style={lineItemsStyle}></i>,
        },
        {
            key: 'pro-bezier',
            label: (
                <div>
                    曲线
                </div>
            ),
            icon: <i className='iconfont icon-curve' style={lineItemsStyle}></i>,
        },
        {
            key: 'pro-curved',
            label: (
                <div>
                    圆角折线
                </div>
            ),
            icon: <i className='iconfont icon-curved' style={lineItemsStyle}></i>,
        },
        // {
        //     key: '5',
        //     label: (
        //         <div>
        //             保留
        //         </div>
        //     ),
        // },
    ];

    const addShapeItemsClick = (e) => {
        let keyNum = e.key;
        lf?.addNode({
            type: keyNum,
            x: 500,
            y: 600,
            // text: {
            //     value: "test",
            //     x: 500,
            //     y: 600,
            // },
            // properties: {
            //     size: 1,
            // },
        });
    }

    const setaddShapeItems = [
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

    useEffect(() => {
        lf?.on('history:change', ({ data: { undoAble, redoAble } }) => {
            setUndoAble(undoAble)
            setRedoAble(redoAble)
        })
        lf?.on('graph:transform', (data) => {
            setScale(parseInt(data.transform.SCALE_X * 100))
        })
    }, [lf])

    useEffect(() => {
        if (isShowPanel.isShowProPanel === false && isShowPanel.isShowHeaderPanel === false && isShowPanel.isShowSidebarPanel === false) {
            setIsFullScreen(true);
        } else {
            setIsFullScreen(false);
        }
    }, [isShowPanel.isShowProPanel, isShowPanel.isShowHeaderPanel, isShowPanel.isShowSidebarPanel])

    useEffect(() => {
        if (!lf) return;
        if (activeNodes?.length || activeEdges?.length) {
            setDeleteAble(true);
        } else {
            setDeleteAble(false);
        }
    }, [lf, activeNodes, activeEdges])

    function changeIsShowProPanel() {
        toolbarChangeState({
            isShowProPanel: !isShowPanel.isShowProPanel,
            type: "changeIsShowProPanel"
        })
    }

    function changeIsShowHeaderPanel() {
        toolbarChangeState({
            isShowHeaderPanel: !isShowPanel.isShowHeaderPanel,
            type: "changeIsShowHeaderPanel"
        })
    }

    function changeIsShowSidebarPanel() {
        toolbarChangeState({
            isShowSidebarPanel: !isShowPanel.isShowSidebarPanel,
            type: "changeIsShowSidebarPanel"
        })
    }

    function changeExpandOutlined() {
        if (isFullScreen) {
            setIsFullScreen(false);
            toolbarChangeState({
                isShowProPanel: true,
                isShowHeaderPanel: true,
                isShowSidebarPanel: true,
                type: "changeIsFullScreen"
            })
        } else {
            toolbarChangeState({
                isShowProPanel: false,
                isShowHeaderPanel: false,
                isShowSidebarPanel: false,
                type: "changeIsFullScreen"
            })
            setIsFullScreen(true);
        }
    }

    function changeIsShowThumbnail() {
        if (isShowThumbnail) {
            setIsShowThumbnail(false);
            lf.extension.miniMap.hide();
        } else {
            setIsShowThumbnail(true);
            lf.extension.miniMap.show(3, 3);
        }
    }

    function fullScreen() {
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    function changeFullScreen() {
        if (isFullScreen) {
            exitFullscreen()
            setIsFullScreen(false);
            toolbarChangeState({
                isShowProPanel: true,
                isShowHeaderPanel: true,
                isShowSidebarPanel: true,
                type: "changeIsFullScreen"
            })
        } else {
            fullScreen()
            setIsFullScreen(true);
            toolbarChangeState({
                isShowProPanel: false,
                isShowHeaderPanel: false,
                isShowSidebarPanel: false,
                type: "changeIsFullScreen"
            })
        }
    }

    function undo() {
        if (undoAble) {
            lf.undo()
        }
    }

    function redo() {
        if (redoAble) {
            lf.redo()
        }
    }

    function zoomIn() {
        lf.zoom(true)
    }

    function zoomOut() {
        lf.zoom(false)
    }

    function resetTranslate() {
        lf.resetTranslate();//还原图形为初始位置
    }

    function resetZoom() {
        lf.resetZoom();//重置图形的缩放比例为默认，默认是 1。
    }

    function zoomByNum(zoomSize) {
        lf.zoom(zoomSize);
    }

    function positionCenter() {
        // 定位到画布视口中心
        const { transformModel, width, height } = lf.graphModel;
        transformModel.focusOn(100, 100, width, height);
    }

    function adaptive() {
        lf.fitView();
    }

    function deleteBtn() {
        if (deleteAble) {
            const elements = lf.graphModel.getSelectElements(true);
            lf.clearSelectElements();
            elements.edges.forEach(edge => lf.deleteEdge(edge.id));
            elements.nodes.forEach(node => lf.deleteNode(node.id));
            setDeleteAble(false);
        }
    }

    function setZIndex(value) {
        if (deleteAble) {
            if (value === "top" || value === "bottom") {
                activeNodes.forEach(({ id }) => {
                    lf.setElementZIndex(id, value)
                })
                activeEdges.forEach(({ id }) => {
                    lf.setElementZIndex(id, value)
                })
            }
        }
    }

    function backgroundColorChange(color) {
        setBackgroundColor(color.rgb);
        const { r, g, b, a } = color.rgb
        const colorStr = `rgba(${r},${g},${b},${a})`
        lf.options.background = {
            backgroundColor: colorStr
        }
        lf.render(lf.getGraphData());
    }

    function formatPainterBtn() {
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

    }

    return (
        <>
            <div className='diagramming-toolbar-left'>
                <Space size={6} split={<Divider type="vertical" />}>
                    <div className='toolbar-item'>
                        <Dropdown menu={{ items: setLayoutItems, onClick: layoutItemsClick }}>
                            {/* <a onClick={(e) => e.preventDefault()}>文件</a> */}
                            <div className='toolbar-item-wrapper'>
                                <span className='toolIcon'>
                                    <LayoutOutlined style={{ marginRight: "4px" }} />
                                    <CaretDownOutlined style={{ fontSize: "14px" }} />
                                    {/* <CaretUpOutlined /> */}
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                    <div className='toolbar-item toolbar-item-zoom'>
                        <Dropdown menu={{ items: setZoomItems, onClick: zoomItemsClick }}>
                            {/* <a onClick={(e) => e.preventDefault()}>文件</a> */}
                            <div className='toolbar-item-wrapper'>
                                <span className='toolIcon' >
                                    <span style={{ fontSize: "14px" }}>{scale}%</span>
                                    <CaretDownOutlined style={{ fontSize: "14px" }} />
                                </span>
                                {/* <CaretUpOutlined className='toolIcon' /> */}
                            </div>
                        </Dropdown>
                    </div>
                    <div className='toolbar-item'>
                        <Space size={6}>
                            <Tooltip title="放大" placement="bottomLeft" overlayStyle={{ fontSize: "13px" }}>
                                <div className='toolbar-item-wrapper' onClick={() => zoomIn()}>
                                    <ZoomInOutlined className='toolIcon' />
                                </div>
                            </Tooltip>
                            <Tooltip title="放小" placement="bottom" overlayStyle={{ fontSize: "13px" }}>
                                <div className='toolbar-item-wrapper' onClick={() => zoomOut()}>
                                    <ZoomOutOutlined className='toolIcon' />
                                </div>
                            </Tooltip>
                        </Space>
                    </div>
                    <div className='toolbar-item'>
                        <Space size={6}>
                            <Tooltip title="撤销（ctrl+Z)" placement="bottomLeft" overlayStyle={{ fontSize: "13px" }} >
                                {/* <UndoOutlined className='toolIcon' /> */}
                                <div className={'toolbar-item-wrapper' + ' ' + (undoAble ? '' : 'disabled')} onClick={() => undo()}>
                                    <i className='iconfont icon-caozuo-chexiao toolIcon'></i>
                                </div>
                            </Tooltip>
                            <Tooltip title="重做（ctrl+Y）" placement="bottom" overlayStyle={{ fontSize: "13px" }}>
                                <div className={'toolbar-item-wrapper' + ' ' + (redoAble ? '' : 'disabled')} onClick={() => redo()}>
                                    <i className='iconfont icon-caozuo-zhongzuo toolIcon'></i>
                                </div>
                                {/* <RedoOutlined className='toolIcon' /> */}
                            </Tooltip>
                        </Space>
                    </div>
                    <div className='toolbar-item'>
                        <Tooltip title="删除（Delete)" placement="bottomLeft" overlayStyle={{ fontSize: "13px" }} >
                            <div className={'toolbar-item-wrapper' + ' ' + (deleteAble ? '' : 'disabled')} onClick={() => deleteBtn()}>
                                <DeleteOutlined className='toolIcon' />
                            </div>
                        </Tooltip>
                    </div>
                    <div className='toolbar-item'>
                        <Space size={6}>
                            <Tooltip title="置于顶部" placement="bottomLeft" overlayStyle={{ fontSize: "13px" }} >
                                <div className={'toolbar-item-wrapper' + ' ' + (deleteAble ? '' : 'disabled')} onClick={() => setZIndex("top")}>
                                    <i className='iconfont icon-bringtotop toolIcon' style={{ fontSize: "14px" }}></i>
                                </div>
                            </Tooltip>
                            <Tooltip title="置于底部" placement="bottomLeft" overlayStyle={{ fontSize: "13px" }} >
                                <div className={'toolbar-item-wrapper' + ' ' + (deleteAble ? '' : 'disabled')} onClick={() => setZIndex("bottom")}>
                                    <i className='iconfont icon-bringtobottom toolIcon' style={{ fontSize: "14px" }}></i>
                                </div>
                            </Tooltip>

                        </Space>
                    </div>
                    <div className='toolbar-item'>
                        <Space size={6}>
                            <Tooltip title="格式刷" placement="bottomLeft" overlayStyle={{ fontSize: "13px" }} >
                                <div className={'toolbar-item-wrapper' + ' ' + (deleteAble ? '' : 'disabled') + ' ' + (formatPainter ? 'selected' : '')} onClick={() => formatPainterBtn()}>
                                    <i className='iconfont icon-geshishua1 toolIcon'></i>
                                </div>
                            </Tooltip>
                            <Tooltip title="一键美化" placement="bottomLeft" overlayStyle={{ fontSize: "13px" }} >
                                <div className='toolbar-item-wrapper' onClick={() => deleteBtn()}>
                                    <i className='iconfont icon-a-Property1mofabang toolIcon'></i>
                                </div>
                            </Tooltip>
                        </Space>
                    </div>
                    <div className='toolbar-item toolbar-item-bgc'>
                        <Tooltip title="背景色" placement="bottomLeft" overlayStyle={{ fontSize: "13px" }} open={isShowBGCPicker}>
                            <div className='toolbar-item-wrapper' onClick={() => deleteBtn()}>
                                <PickColor pickColorState={backgroundColor} handleChange={backgroundColorChange} >
                                    <span className='whole-bgc-icon' onMouseEnter={() => setIsShowBGCPicker(true)} onMouseLeave={() => setIsShowBGCPicker(false)}>
                                        <i className='iconfont icon-yanse toolIcon'></i>
                                        <div className='backgroundColor-line' style={{ borderBottom: `2px solid ${colorStr(backgroundColor)}` }}></div>
                                    </span>
                                </PickColor>
                            </div>
                        </Tooltip>
                    </div>
                    <div className='toolbar-item'>
                        <Space size={8}>
                            <Dropdown menu={{ items: setArrowTypeItems, onClick: arrowTypeItemsClick }}>
                                <div className='toolbar-item-wrapper'>
                                    <Tooltip title="箭头类型" placement="topLeft" overlayStyle={{ fontSize: "13px" }}>
                                        <span className='toolIcon'>
                                            <i className={arrowTypeIconClass} style={{ fontSize: "20px", marginRight: "6px" }}></i>
                                            <CaretDownOutlined style={{ fontSize: "14px" }} />
                                        </span>
                                    </Tooltip>
                                </div>
                            </Dropdown>
                            <Dropdown menu={{ items: setArrowStyleItems, onClick: arrowStyleItemsClick }}>
                                <div className='toolbar-item-wrapper'>
                                    <Tooltip title="箭头样式" placement="topLeft" overlayStyle={{ fontSize: "13px" }}>
                                        <span className='toolIcon'>
                                            {arrowStyleIcon}
                                            <CaretDownOutlined style={{ fontSize: "14px" }} />
                                        </span>
                                    </Tooltip>
                                </div>
                            </Dropdown>
                            <Dropdown menu={{ items: setlineStyleItems, onClick: lineStyleItemsClick }}>
                                <div className='toolbar-item-wrapper'>
                                    <Tooltip title="线条样式" placement="topLeft" overlayStyle={{ fontSize: "13px" }}>
                                        <span className='toolIcon'>
                                            <i className={lineTypeIconClass} style={{ fontSize: "18px", marginRight: "6px" }}></i>
                                            <CaretDownOutlined style={{ fontSize: "14px" }} />
                                        </span>
                                    </Tooltip>
                                </div>
                            </Dropdown>
                        </Space>
                    </div>
                    <div className='toolbar-item'>
                        <Dropdown menu={{ items: setaddShapeItems, onClick: addShapeItemsClick }}>
                            <div className='toolbar-item-wrapper'>
                                <Tooltip title="插入" placement="topLeft" overlayStyle={{ fontSize: "13px" }}>
                                    <span className='toolIcon'>
                                        <PlusOutlined style={{ fontSize: "16px", marginRight: "4px", fontWeight: "700" }} />
                                        <CaretDownOutlined style={{ fontSize: "14px" }} />
                                    </span>
                                </Tooltip>
                            </div>
                        </Dropdown>
                    </div>
                </Space>
            </div>
            <div className='diagramming-toolbar-right'>
                <Space size={6}>
                    <Tooltip title="全屏" placement="bottom" overlayStyle={{ fontSize: "13px" }}>
                        <div className='toolbar-item'>
                            <ExpandOutlined className='toolIcon' onClick={() => changeExpandOutlined()} style={{ display: isFullScreen ? "none" : "" }} />
                            <CompressOutlined className='toolIcon' onClick={() => changeExpandOutlined()} style={{ display: isFullScreen ? "" : "none" }} />
                        </div>
                    </Tooltip>
                    <Tooltip title="样式" placement="bottom" overlayStyle={{ fontSize: "13px" }}>
                        <div className='toolbar-item'>
                            <PicRightOutlined className='toolIcon' onClick={() => changeIsShowProPanel()} />

                        </div>
                    </Tooltip>
                    <Tooltip title="折叠/展开" placement="bottomRight" overlayStyle={{ fontSize: "13px" }}>
                        <div className='toolbar-item'>
                            <VerticalAlignTopOutlined className='toolIcon' onClick={() => changeIsShowHeaderPanel()} style={{ display: isShowPanel.isShowHeaderPanel ? "" : "none" }} />
                            <VerticalAlignBottomOutlined className='toolIcon' onClick={() => changeIsShowHeaderPanel()} style={{ display: isShowPanel.isShowHeaderPanel ? "none" : "" }} />
                        </div>
                    </Tooltip>
                </Space>
            </div>
        </>
    )
}
