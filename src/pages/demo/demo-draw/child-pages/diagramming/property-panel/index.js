import React, { useState, useRef, useEffect } from 'react'

import { PropertyPanelWrapper } from "./style"

import { Divider, Carousel, Select, Space, InputNumber, Radio, Checkbox, Button } from 'antd';

import {
    LeftOutlined,
    RightOutlined,
    EnterOutlined,
    RiseOutlined,
    SwapRightOutlined,
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    StrikethroughOutlined,
    AlignRightOutlined,
    AlignCenterOutlined,
    AlignLeftOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignBottomOutlined,
    CheckOutlined
} from '@ant-design/icons';

import PickColor from "@/components/pick-color"

import { shortStyles1, shortStyles2, shortStyles3, shortStyles4, shortStyles5, borderStyles, fontFamilies, } from '@/utils/draw/constant'

import { colorObj, colorStr } from '@/utils/util';

export default function PropertyPanel(props) {

    const { isShowProPanel, elementsStyle, setStyle, setShapeStyle, changeLineType, setZIndex, moveNodes } = props;

    const [isGraph, setIsGraph] = useState(true);

    const [value3, setValue3] = useState('Apple');

    const [shapeFillColor, setShapeFillColor] = useState({
        r: '255',
        g: '255',
        b: '255',
        a: '1',
    })

    const [lineColor, setLineColor] = useState({
        r: '0',
        g: '0',
        b: '0',
        a: '1',
    })

    const [fontColor, setFontColor] = useState({
        r: '255',
        g: '255',
        b: '255',
        a: '1',
    })

    const [borderStyleValue, setBorderStyleValue] = useState("solid");

    const [borderWidth, setBorderWidth] = useState(2);

    const [lineType, setLineType] = useState("pro-polyline");//连接线的类型 折线、直线、曲线

    const [fontFamily, setFontFamily] = useState("Microsoft YaHei");

    const [textAlign, setTextAlign] = useState(""); // 文字对齐方式

    const [fontSize, setFontSize] = useState(12);

    const [fontWeight, setFontWeight] = useState("normal");

    const [textDecoration, setTextDecoration] = useState("none");

    const [fontStyle, setFontStyle] = useState("normal");

    const [widthValue, setWidthValue] = useState(70);

    const [heigthValue, setHeightValue] = useState(70);

    const [positionX, setPositionX] = useState(0);//x轴坐标

    const [positionY, setPositionY] = useState(0);//y轴坐标

    const [isConstrainProp, setIsConstrainProp] = useState(false);//是否限制比例

    const [borderRadius, setBorderRadius] = useState(0)

    const [opacity, setOpacity] = useState(100)

    const [zIndexLayer, setZIndexLayer] = useState(""); // 置于顶部或置于底部

    const swiperRef = useRef(null);

    function switchPanelTabbar(isChangeGraph) {
        if (isChangeGraph) {
            setIsGraph(true);
        } else {
            setIsGraph(false);
        }
    }

    useEffect(() => {
        if (elementsStyle.backgroundColor) {
            setShapeFillColor(colorObj(elementsStyle.backgroundColor))
        } else {
            setShapeFillColor({
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            })
        }

        if (elementsStyle.borderColor) {
            setLineColor(colorObj(elementsStyle.borderColor))
        } else {
            setLineColor({
                r: '0',
                g: '0',
                b: '0',
                a: '1',
            })
        }

        if (elementsStyle.fontColor) {
            setFontColor(colorObj(elementsStyle.fontColor))
        } else {
            setFontColor({
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            })
        }

        if (elementsStyle.borderStyle) {
            setBorderStyleValue(elementsStyle.borderStyle);
        } else {
            setBorderStyleValue("solid");
        }

        if (elementsStyle.borderWidth) {
            setBorderWidth(elementsStyle.borderWidth)
        } else {
            setBorderWidth(2);
        }

        if (elementsStyle.edgeType) {
            setLineType(elementsStyle.edgeType)
        } else {
        }

        if (elementsStyle.fontFamily) {
            setFontFamily(elementsStyle.fontFamily)
        } else {
            setFontFamily("Microsoft YaHei")
        }

        if (elementsStyle.fontSize) {
            setFontSize(elementsStyle.fontSize)
        } else {
            setFontSize(12)
        }

        if (elementsStyle.fontWeight) {
            setFontWeight(elementsStyle.fontWeight)
        } else {
            setFontWeight("normal")
        }

        if (elementsStyle.fontStyle) {
            setFontStyle(elementsStyle.fontStyle)
        } else {
            setFontStyle("normal")
        }

        if (elementsStyle.textDecoration) {
            setTextDecoration(elementsStyle.textDecoration)
        } else {
            setTextDecoration("none")
        }

        if (elementsStyle.width) {
            setWidthValue(elementsStyle.width);
        } else {
            setWidthValue(70);
        }

        if (elementsStyle.height) {
            setHeightValue(elementsStyle.height);
        } else {
            setHeightValue(70);
        }

        if (elementsStyle.x) {
            setPositionX(elementsStyle.x);
        } else {
            setPositionX(0);
        }

        if (elementsStyle.y) {
            setPositionY(elementsStyle.y);
        } else {
            setPositionY(0);
        }

        if (elementsStyle.opacity) {
            setOpacity(elementsStyle.opacity * 100)
        } else {
            setOpacity(100)
        }

    }, [elementsStyle])

    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };

    function shapeFillColorChange(color) {
        setShapeFillColor(color.rgb);
        const { r, g, b, a } = color.rgb
        const colorStr = `rgba(${r},${g},${b},${a})`
        setStyle({
            backgroundColor: colorStr
        })
    }

    function lineColorChange(color) {
        setLineColor(color.rgb);
        const { r, g, b, a } = color.rgb
        const colorStr = `rgba(${r},${g},${b},${a})`
        setStyle({
            borderColor: colorStr
        })
    }

    function fontColorChange(color) {
        setFontColor(color.rgb);
        const { r, g, b, a } = color.rgb
        const colorStr = `rgba(${r},${g},${b},${a})`
        setStyle({
            fontColor: colorStr
        })
    }

    function changeFastStyle(e, item) {
        // let lastDom = document.querySelector(".short-color-active");
        // if (lastDom) {
        //     lastDom.classList.remove("short-color-active");
        // }
        // e.currentTarget.classList.add("short-color-active");
        setStyle(item);
    }

    function changeBorderStyles(value) {
        setStyle({
            borderStyle: value
        })
        setBorderStyleValue(value);
    }

    function changeBorderWidth(value) {
        setStyle({
            borderWidth: value
        })
    }

    function changeEdgeType(value) {
        changeLineType(value);
        setLineType(value.target.value);
    }

    function changeFontFamily(value) {
        setStyle({
            fontFamily: value
        })
    }

    function changeTextAlign(value) {
        const textAlignType = value.target.value
        setShapeStyle({
            textAlign: textAlignType
        })
        setTextAlign(textAlignType)
    }

    function changeFontSize(value) {
        setStyle({
            fontSize: value
        });
        setFontSize(value);
    }

    function changeFontWeight() {
        if (fontWeight === "bold") {
            setStyle({
                fontWeight: "normal"
            });
            setFontWeight("normal")
        } else {
            setStyle({
                fontWeight: "bold"
            });
            setFontWeight("bold")
        }
    }

    function changeFontStyle() {
        if (fontStyle === "normal") {
            setStyle({
                fontStyle: "italic"
            });
            setFontStyle("italic")
        } else {
            setStyle({
                fontStyle: "normal"
            });
            setFontStyle("normal")
        }
    }

    function changeTextDecoration() {
        if (textDecoration === "underline") {
            setStyle({
                textDecoration: "none"
            });
            setTextDecoration("none")
        } else {
            setStyle({
                textDecoration: "underline"
            });
            setTextDecoration("underline")
        }
    }

    function changeStrikethrough() {
        if (textDecoration === "line-through") {
            setStyle({
                textDecoration: "none"
            });
            setTextDecoration("none")
        } else {
            setStyle({
                textDecoration: "line-through"
            });
            setTextDecoration("line-through");
        }
    }

    function changeWidth(value) {
        console.log(isConstrainProp)
        if (isConstrainProp) {
            let newHeight = (heigthValue * value / widthValue).toFixed(1);
            setShapeStyle({
                width: value,
                height: newHeight
            });
            setHeightValue(newHeight);
            setWidthValue(value);
        } else {
            setShapeStyle({
                width: value
            });
            setWidthValue(value);
        }
    }

    function changeHeight(value) {
        if (isConstrainProp) {
            let newWidth = (widthValue * value / heigthValue).toFixed(1)
            setShapeStyle({
                width: newWidth,
                height: value
            });
            setWidthValue(newWidth);
            setHeightValue(value);
        } else {
            setShapeStyle({
                height: value
            })
            setHeightValue(value);
        }
    }

    function changeIsConstrainProp(val) {
        setIsConstrainProp(val.target.checked);
    }

    function changePositionX(val) {
        setPositionX((data) => {
            moveNodes(val - data, 'toX')
            return val
        });
    }

    function changePositionY(val) {
        setPositionY((data) => {
            moveNodes(val - data, 'toY')
            return val
        });
    }

    function changeRotateDegree(value) {
        // console.log(value);
        // setStyle({
        //     rotate: value
        // })
    }

    function changeBorderRadius(value) {
        setShapeStyle({
            radius: value
        })
        setBorderRadius(value)
    }

    function changeOpacity(value) {
        setStyle({
            opacity: value / 100
        });
        setOpacity(value)
    }


    return (
        <PropertyPanelWrapper>
            <div className={"property-panel" + " " + (isShowProPanel ? "" : "property-panel-out")}>
                <div className="property-header">
                    <div className={"property-tabbar" + " " + (isGraph ? "graphic-active" : "adjust-active")}>
                        <div className={"tabbar-item" + " " + (isGraph ? "active" : "")} onClick={() => switchPanelTabbar(true)}>属性样式</div>
                        <div className={"tabbar-item" + " " + (isGraph ? "" : "active")} onClick={() => switchPanelTabbar(false)}>调整图形</div>
                    </div>
                </div>
                <div className='property-main'>
                    {isGraph ?
                        <div className='property-style scrollbar-default-styles'>
                            <div className='style-container'>
                                <div className='format-section fast-swiper'>
                                    <Divider orientation="left" plain>快捷样式</Divider>
                                    <div className="btnLeft" onClick={() => { swiperRef?.current?.prev?.() }}>
                                        <LeftOutlined />
                                    </div>
                                    <div className="btnRight" onClick={() => { swiperRef?.current?.next?.() }}>
                                        <RightOutlined />
                                    </div>
                                    <Carousel style={{ width: "250px" }} afterChange={onChange} className='format-section-fastStyle' ref={swiperRef} dotsClass="slick-dots-over">
                                        <div className='carousel-item'>
                                            <div className='color-list'>
                                                {shortStyles1.map((item, index) => {
                                                    return <div className='color-item' style={item} key={index} onClick={(e) => changeFastStyle(e, item)}>
                                                        <CheckOutlined style={{ display: colorStr(shapeFillColor) === item.backgroundColor.replaceAll(" ", "") ? "inline-block" : "none" }} />
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        <div className='carousel-item'>
                                            <div className='color-list'>
                                                {shortStyles2.map((item, index) => {
                                                    return <div className='color-item' style={item} key={index} onClick={(e) => changeFastStyle(e, item)}>
                                                        <CheckOutlined style={{ display: colorStr(shapeFillColor) === item.backgroundColor.replaceAll(" ", "") ? "inline-block" : "none" }} />
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        <div className='carousel-item'>
                                            <div className='color-list'>
                                                {shortStyles3.map((item, index) => {
                                                    return <div className='color-item' style={item} key={index} onClick={(e) => changeFastStyle(e, item)}>
                                                        <CheckOutlined style={{ display: colorStr(shapeFillColor) === item.backgroundColor.replaceAll(" ", "") ? "inline-block" : "none" }} />
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        <div className='carousel-item'>
                                            <div className='color-list'>
                                                {shortStyles4.map((item, index) => {
                                                    return <div className='color-item' style={item} key={index} onClick={(e) => changeFastStyle(e, item)}>
                                                        <CheckOutlined style={{ display: colorStr(shapeFillColor) === item.backgroundColor.replaceAll(" ", "") ? "inline-block" : "none" }} />
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        <div className='carousel-item'>
                                            <div className='color-list'>
                                                {shortStyles5.map((item, index) => {
                                                    return <div className='color-item' style={item} key={index} onClick={(e) => changeFastStyle(e, item)}>
                                                        <CheckOutlined style={{ display: colorStr(shapeFillColor) === item.backgroundColor.replaceAll(" ", "") ? "inline-block" : "none" }} />
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </Carousel>
                                </div>
                                <div className='format-section fill-style'>
                                    <Divider orientation="left" plain style={{ marginTop: "0" }}>填充</Divider>
                                    <div className='format-section-wrapper'>
                                        <Space wrap>
                                            <Select
                                                defaultValue="1"
                                                style={{
                                                    width: 140,
                                                }}
                                                onChange={handleChange}
                                                options={[
                                                    {
                                                        value: '1',
                                                        label: '纯色',
                                                    },
                                                    {
                                                        value: '2',
                                                        label: '渐变',
                                                    },
                                                    {
                                                        value: '3',
                                                        label: '图片',
                                                        disabled: true,
                                                    },
                                                ]}
                                            />
                                            <PickColor pickColorState={shapeFillColor} handleChange={shapeFillColorChange} />
                                        </Space>
                                    </div>
                                </div>
                                <div className='format-section'>
                                    <Divider orientation="left" plain>线条</Divider>
                                    <div className='format-section-wrapper'>
                                        <Space style={{ marginBottom: "10px" }}>
                                            <Select
                                                style={{
                                                    width: 140,
                                                }}
                                                onChange={changeBorderStyles}
                                                options={borderStyles}
                                                value={borderStyleValue}
                                            />
                                            <PickColor pickColorState={lineColor} handleChange={lineColorChange} />
                                        </Space>
                                        <Space>
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                formatter={(value) => `${value}px`}
                                                parser={(value) => value.replace('px', '')}
                                                onChange={changeBorderWidth}
                                                value={borderWidth}
                                                style={{ width: "70px" }}
                                            />
                                            <Radio.Group onChange={changeEdgeType} value={lineType} size="small">
                                                <Radio.Button value="pro-polyline" defaultChecked>
                                                    <i className='iconfont icon-brokenLine'></i>
                                                </Radio.Button>
                                                <Radio.Button value="pro-line">
                                                    <i className='iconfont icon-straight'></i>
                                                </Radio.Button>
                                                <Radio.Button value="pro-bezier">
                                                    <i className='iconfont icon-curve'></i>
                                                </Radio.Button>
                                                <Radio.Button value="pro-curved">
                                                    <i className='iconfont icon-curved'></i>
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Space>
                                    </div>
                                </div>
                                <div className='format-section text-style'>
                                    <Divider orientation="left" plain>文本</Divider>
                                    <div className='format-section-wrapper'>
                                        <Space style={{ marginBottom: "10px" }}>
                                            <Select
                                                style={{
                                                    width: 140,
                                                }}
                                                value={fontFamily}
                                                onChange={changeFontFamily}
                                                options={fontFamilies}
                                            />
                                            <PickColor pickColorState={fontColor} handleChange={fontColorChange} />
                                        </Space>
                                        <Space style={{ marginBottom: "10px" }} size={18}>
                                            <Radio.Group onChange={changeTextAlign} value={textAlign} size="small">
                                                <Radio.Button value="left" defaultChecked>
                                                    <AlignLeftOutlined />
                                                </Radio.Button>
                                                <Radio.Button value="center">
                                                    <AlignCenterOutlined />
                                                </Radio.Button>
                                                <Radio.Button value="right">
                                                    <AlignRightOutlined />
                                                </Radio.Button>
                                            </Radio.Group>
                                            <Radio.Group onChange={onChange3} value={value3} size="small">
                                                <Radio.Button value="a" defaultChecked>
                                                    <VerticalAlignTopOutlined />
                                                </Radio.Button>
                                                <Radio.Button value="b">
                                                    <VerticalAlignMiddleOutlined />
                                                </Radio.Button>
                                                <Radio.Button value="c">
                                                    <VerticalAlignBottomOutlined />
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Space>
                                        <Space>
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                formatter={(value) => `${value}px`}
                                                parser={(value) => value.replace('px', '')}
                                                onChange={changeFontSize}
                                                value={fontSize}
                                                style={{ width: "80px" }}
                                            />
                                            <div className="edite-text">
                                                <Button className={'boldBtn' + ' ' + (fontWeight === 'bold' ? 'active' : '')} size="small" onClick={() => changeFontWeight()}>
                                                    <BoldOutlined />
                                                </Button>
                                                <Button className={'decorationBtn' + ' ' + (fontStyle === 'italic' ? 'active' : '')} size="small" onClick={() => changeFontStyle()}>
                                                    <ItalicOutlined />
                                                </Button>
                                                <Button className={'underlineBtn' + ' ' + (textDecoration === 'underline' ? 'active' : '')} size="small" onClick={() => changeTextDecoration()}>
                                                    <UnderlineOutlined />
                                                </Button>
                                                <Button className={'strikethroughBtn' + ' ' + (textDecoration === 'line-through' ? 'active' : '')} size="small" onClick={() => changeStrikethrough()}>
                                                    <StrikethroughOutlined />
                                                </Button>
                                            </div>
                                        </Space>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className='property-style scrollbar-default-styles'>
                            <div className='style-container'>
                                <div className='format-section size-style'>
                                    <Divider orientation="left" plain>大小</Divider>
                                    <div className='format-section-wrapper'>
                                        <Space style={{ marginBottom: "10px" }}>
                                            <div className='size-label'>宽</div>
                                            <InputNumber
                                                min={0}
                                                max={5000}
                                                formatter={(value) => `${value}px`}
                                                parser={(value) => value.replace('px', '')}
                                                onChange={changeWidth}
                                                value={widthValue}
                                                step={5}
                                                style={{ width: "80px" }}
                                            />
                                            <div className='size-label'>高</div>
                                            <InputNumber
                                                min={0}
                                                max={5000}
                                                formatter={(value) => `${value}px`}
                                                parser={(value) => value.replace('px', '')}
                                                onChange={changeHeight}
                                                value={heigthValue}
                                                step={5}
                                                style={{ width: "80px" }}
                                            />
                                        </Space>
                                        <Space style={{ marginBottom: "10px" }}>
                                            <Checkbox onChange={changeIsConstrainProp}>限制比例</Checkbox>
                                        </Space>
                                    </div>
                                </div>
                                <div className='format-section'>
                                    <Divider orientation="left" plain>位置</Divider>
                                    <div className='format-section-wrapper'>
                                        <Space>
                                            <div className='size-label'>X</div>
                                            <InputNumber
                                                min={-5000}
                                                max={5000}
                                                formatter={(value) => `${value}px`}
                                                parser={(value) => value.replace('px', '')}
                                                onChange={changePositionX}
                                                step={5}
                                                value={positionX}
                                                style={{ width: "85px" }}
                                            />
                                            <div className='size-label'>Y</div>
                                            <InputNumber
                                                min={-5000}
                                                max={5000}
                                                formatter={(value) => `${value}px`}
                                                parser={(value) => value.replace('px', '')}
                                                onChange={changePositionY}
                                                step={5}
                                                value={positionY}
                                                style={{ width: "85px" }}
                                            />
                                        </Space>
                                    </div>
                                </div>
                                <div className='format-section'>
                                    <Divider orientation="left" plain>角度</Divider>
                                    <div className='format-section-wrapper'>
                                        <Space style={{ marginBottom: "10px" }}>
                                            <div className='angle-label'>旋转</div>
                                            <InputNumber
                                                defaultValue={0}
                                                min={0}
                                                max={360}
                                                formatter={(value) => `${value}°`}
                                                parser={(value) => value.replace('°', '')}
                                                onChange={changeRotateDegree}
                                                step={5}
                                                style={{ width: "120px" }}
                                            />
                                        </Space>
                                        <Space style={{ marginBottom: "10px" }}>
                                            <div className='angle-label'>圆角</div>
                                            <InputNumber
                                                min={0}
                                                max={360}
                                                formatter={(value) => `${value}px`}
                                                parser={(value) => value.replace('px', '')}
                                                onChange={changeBorderRadius}
                                                value={borderRadius}
                                                step={5}
                                                style={{ width: "120px" }}
                                            />
                                        </Space>
                                        <Space>
                                            <Radio.Group onChange={onChange3} value={value3}>
                                                <Radio.Button value="a" defaultChecked>
                                                    水平翻转
                                                </Radio.Button>
                                                <Radio.Button value="b">
                                                    垂直翻转
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Space>
                                    </div>
                                </div>
                                <div className='format-section'>
                                    <Divider orientation="left" plain>不透明度</Divider>
                                    <div className='format-section-wrapper'>
                                        <Space>
                                            <InputNumber
                                                min={0}
                                                max={100}
                                                formatter={(value) => `${value}%`}
                                                parser={(value) => value.replace('%', '')}
                                                onChange={changeOpacity}
                                                step={5}
                                                value={opacity}
                                                style={{ width: "120px" }}
                                            />
                                        </Space>
                                    </div>
                                </div>
                                <div className='format-section'>
                                    <Divider orientation="left" plain>图层</Divider>
                                    <div className='format-section-wrapper'>
                                        <Space style={{ marginBottom: "10px" }}>
                                            <Radio.Group onChange={setZIndex} value={zIndexLayer}>
                                                <Radio.Button value="top">
                                                    置于顶部
                                                </Radio.Button>
                                                <Radio.Button value="bottom">
                                                    置于底部
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Space>
                                        <Space>
                                            <Radio.Group onChange={setZIndex} value={zIndexLayer}>
                                                <Radio.Button value="up">
                                                    上移一层
                                                </Radio.Button>
                                                <Radio.Button value="down">
                                                    下移一层
                                                </Radio.Button>
                                            </Radio.Group>
                                        </Space>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
        </PropertyPanelWrapper>
    )
}
