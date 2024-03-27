import React, { useState } from 'react'

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

import { Dropdown, Space, Tooltip, Divider, Input, Collapse, theme, Button } from 'antd';

import Circle from "../../components/icon/circle"
import Rect from "../../components/icon/rect"
import RectRadius from "../../components/icon/rect-radius"
import Actor from "../../components/icon/actor"
import Cylinde from "../../components/icon/cylinde"
import Diamond from "../../components/icon/diamond"
import Ellipse from '../../components/icon/ellipse'
import Parallelogram from "../../components/icon/parallelogram"
import Text from "../../components/icon/text"
import Triangle from "../../components/icon/triangle"
import LeftArrow from "../../components/icon/left-arrow"
import RightArrow from "../../components/icon/right-arrow"
import HorizontalArrow from "../../components/icon/horizontal-arrow"
import UpArrow from "../../components/icon/up-arrow"
import DownArrow from "../../components/icon/down-arrow"
import VerticalArrow from "../../components/icon/vertical-arrow"
import Pentagon from "../../components/icon/pentagon"
import Hexagon from "../../components/icon/hexagon"
import Septagon from "../../components/icon/septagon"
import Heptagon from "../../components/icon/heptagon"
import Trapezoid from "../../components/icon/trapezoid"
import Cross from "../../components/icon/cross"
import Minus from "../../components/icon/minus"
import Times from "../../components/icon/times"
import IconDivider from "../../components/icon/divide"

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default function DiagramSidebar(props) {

    const [isShape, setIsShape] = useState(true);

    const panelStyle = {
        background: "rgba(0, 0, 0, 0.02)",
        border: 'none',
        borderBottom: "1px solid var(--color-text-placeholder)",
        transition: ".2s"
    };

    function switchSldebarTabber(isChangeShape) {
        if (isChangeShape) {
            setIsShape(true);
        } else {
            setIsShape(false);
        }
    }

    function dragInNode(type) {
        props.dragInNode(type);
    }

    return (
        <>
            <div className="designer-tabbar">
                <div className={"tabbar-item" + " " + (isShape ? "active" : "")} onClick={() => switchSldebarTabber(true)}>图形库</div>
                <div className={"tabbar-item" + " " + (isShape ? "" : "active")} onClick={() => switchSldebarTabber(false)}>主题库</div>
            </div>
            <div className='designer-panel'>
                {isShape ?
                    <div className='shape-panel scrollbar-default-styles'>
                        <div className='shape-search'>
                            <Input placeholder="搜索" prefix={<SearchOutlined />} />
                        </div>
                        <div className='shape-main'>
                            <Collapse
                                bordered={false}
                                defaultActiveKey={['1']}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{

                                }}
                            >
                                <Panel header="基本图形" key="1" style={panelStyle} className='shape-classify-panel'>
                                    <div className="node-list">
                                        <div className="node-item" onMouseDown={() => dragInNode('pro-circle')}>
                                            <Circle />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('pro-rect')}>
                                            <Rect />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('rect-radius')}>
                                            <RectRadius />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('actor')}>
                                            <Actor />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('cylinde')}>
                                            <Cylinde />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('pro-diamond')}>
                                            <Diamond />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('pro-ellipse')}>
                                            <Ellipse />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('parallelogram')}>
                                            <Parallelogram />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('pro-text')}>
                                            <Text />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('triangle')}>
                                            <Triangle />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('left-arrow')}>
                                            <LeftArrow />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('right-arrow')}>
                                            <RightArrow />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('horizontal-arrow')}>
                                            <HorizontalArrow />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('up-arrow')}>
                                            <UpArrow />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('down-arrow')}>
                                            <DownArrow />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('vertical-arrow')}>
                                            <VerticalArrow />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('pentagon')}>
                                            <Pentagon />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('hexagon')}>
                                            <Hexagon />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('septagon')}>
                                            <Septagon />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('heptagon')}>
                                            <Heptagon />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('trapezoid')}>
                                            <Trapezoid />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('cross')}>
                                            <Cross />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('minus')}>
                                            <Minus />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('times')}>
                                            <Times />
                                        </div>
                                        <div className="node-item" onMouseDown={() => dragInNode('divide')}>
                                            <IconDivider />
                                        </div>
                                    </div>
                                </Panel>
                                <Panel header="流程图" key="2" style={panelStyle} className='shape-classify-panel'>
                                    <p>{text}</p>
                                </Panel>
                                <Panel header="思维导图" key="3" style={panelStyle} className='shape-classify-panel'>
                                    <p>{text}</p>
                                </Panel>
                                <Panel header="ER图" key="4" style={panelStyle} className='shape-classify-panel'>
                                    <p>{text}</p>
                                </Panel>
                                <Panel header="UML" key="5" style={panelStyle} className='shape-classify-panel'>
                                    <p>{text}</p>
                                </Panel>
                                <Panel header="关系图" key="6" style={panelStyle} className='shape-classify-panel'>
                                    <p>{text}</p>
                                </Panel>
                                <Panel header="泳池/泳道" key="7" style={panelStyle} className='shape-classify-panel'>
                                    <p>{text}</p>
                                </Panel>
                            </Collapse>
                        </div>
                    </div> :
                    <div className='themes-panel'><Button type="primary">Primary Button</Button></div>}
            </div>
        </>
    )
}
