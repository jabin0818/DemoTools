import React, { useEffect, useState, useRef, useCallback } from 'react'
// import ReactChinaMap from 'react-echarts-chinamap'
import { ChinaMapWrapper, TextHistory } from './style'

// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';

// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';

import 'echarts/lib/chart/map';
import 'echarts/lib/chart/treemap';
import "echarts/map/js/china.js";

// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/heatmap';

// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';

import 'echarts/lib/component/title';

// import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/visualMap';

// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';

// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

// import 'zrender/lib/vml/vml';

import {
    RightOutlined,
    LeftOutlined,
} from '@ant-design/icons'

import { color } from 'echarts/lib/theme/light';

import SetForm from './set-form'
import TestResults from './test-results'
import CountDown from './count-down'

import { message } from 'antd';

import { cityOfChinaOptions } from '@/config/map-data.js'

import { changeHelpComponentsName } from '@/store/actions/global';


const requestPrefix = 'https://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/children';

export default function DemoChainMap() {

    const [messageApi, contextHolder] = message.useMessage();

    //模式Index
    const [modelIndex, setModelIndex] = useState(0)

    //难度 1-低 2-中 3-高
    const [hard, setHard] = useState(1);

    //测试时间 1~10分钟
    const [time, setTime] = useState(6);

    //模式的题目总数
    // const [allSubNum, setAllSubNum] = useState(34)

    //是否停止
    const [isStop, setIsStop] = useState(true)

    //地图数据
    let data = [
        { name: '北京', selected: false, value: 1, emphasis: { itemStyle: { areaColor: '#cfc5de' } } },
        { name: '天津', selected: false, value: 2, emphasis: { itemStyle: { areaColor: '#f1ebd1' } } },
        { name: '上海', selected: false, value: 3, emphasis: { itemStyle: { areaColor: '#feffdb' } } },
        { name: '重庆', selected: false, value: 4, emphasis: { itemStyle: { areaColor: '#e0cee4' } } },
        { name: '河北', selected: false, value: 5, emphasis: { itemStyle: { areaColor: '#fde8cd' } } },
        { name: '河南', selected: false, value: 6, emphasis: { itemStyle: { areaColor: '#e4f1d7' } } },
        { name: '云南', selected: false, value: 7, emphasis: { itemStyle: { areaColor: '#fffed7' } } },
        { name: '辽宁', selected: false, value: 8, emphasis: { itemStyle: { areaColor: '#e4f1d7' } } },
        { name: '黑龙江', selected: false, value: 9, emphasis: { itemStyle: { areaColor: '#e4f1d7' } } },
        { name: '湖南', selected: false, value: 10, emphasis: { itemStyle: { areaColor: '#fffed7' } } },
        { name: '安徽', selected: false, value: 11, emphasis: { itemStyle: { areaColor: '#fffed8' } } },
        { name: '山东', selected: false, value: 12, emphasis: { itemStyle: { areaColor: '#dccee7' } } },
        { name: '新疆', selected: false, value: 13, emphasis: { itemStyle: { areaColor: '#fffed7' } } },
        { name: '江苏', selected: false, value: 14, emphasis: { itemStyle: { areaColor: '#fce8cd' } } },
        { name: '浙江', selected: false, value: 15, emphasis: { itemStyle: { areaColor: '#ddceeb' } } },
        { name: '江西', selected: false, value: 16, emphasis: { itemStyle: { areaColor: '#e4f1d3' } } },
        { name: '湖北', selected: false, value: 17, emphasis: { itemStyle: { areaColor: '#fde8cd' } } },
        { name: '广西', selected: false, value: 18, emphasis: { itemStyle: { areaColor: '#fde8cd' } } },
        { name: '甘肃', selected: false, value: 19, emphasis: { itemStyle: { areaColor: '#fde8cd' } } },
        { name: '山西', selected: false, value: 20, emphasis: { itemStyle: { areaColor: '#fffdd6' } } },
        { name: '内蒙古', selected: false, value: 21, emphasis: { itemStyle: { areaColor: '#ddcfe6' } } },
        { name: '陕西', selected: false, value: 22, emphasis: { itemStyle: { areaColor: '#fad8e9' } } },
        { name: '吉林', selected: false, value: 23, emphasis: { itemStyle: { areaColor: '#fce8cd' } } },
        { name: '福建', selected: false, value: 24, emphasis: { itemStyle: { areaColor: '#fad8e8' } } },
        { name: '贵州', selected: false, value: 25, emphasis: { itemStyle: { areaColor: '#fad8e8' } } },
        { name: '广东', selected: false, value: 26, emphasis: { itemStyle: { areaColor: '#ddcfe8' } } },
        { name: '青海', selected: false, value: 27, emphasis: { itemStyle: { areaColor: '#fad8e9' } } },
        { name: '西藏', selected: false, value: 28, emphasis: { itemStyle: { areaColor: '#ddcfe6' } } },
        { name: '四川', selected: false, value: 29, emphasis: { itemStyle: { areaColor: '#e4f1d5' } } },
        { name: '宁夏', selected: false, value: 30, emphasis: { itemStyle: { areaColor: '#fefcd5' } } },
        { name: '海南', selected: false, value: 31, emphasis: { itemStyle: { areaColor: '#fad8e9' } } },
        { name: '台湾', selected: false, value: 32, emphasis: { itemStyle: { areaColor: '#fce8cd' } } },
        { name: '香港', selected: false, value: 33, emphasis: { itemStyle: { areaColor: '#dc9bbb' } } },
        // { name: '澳门', selected: false, value: 34, emphasis: { itemStyle: { areaColor: '#e0f7cc' } } },
        { name: '南海诸岛', selected: false, value: 34, emphasis: { itemStyle: { areaColor: '#e0f7cc' } } }
    ]
    const [chartData, setChartData] = useState(data)

    //测试模式视图
    const modelOptions = [
        {
            value: '0',
            label: '中国省份',
        },
        {
            value: '1',
            label: '中国地级市',
        },
        {
            value: '2',
            label: '中国地区练习',
        },
        {
            value: '3',
            label: '世界国家',
        },
        {
            value: '4',
            label: '七大洲四大洋',
        },
    ]

    // const [selectName, setSelectName] = useState('');
    // const [echarts_react, setEchartsReact] = useState(null);//echarts-for-react dom
    // const [myChart, setMyChart] = useState(null);//echarts 实例

    //测试设置模态框是否显示
    const [isShowModel, setIsShowModel] = useState(false)

    //测试结果模态框是否显示
    const [isShowResults, setIsShowResults] = useState(false)

    //题目数组
    let subjectArrayIdData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
    const [subjectAry, setSubjectAry] = useState(subjectArrayIdData)
    const subjectAryRef = useRef(subjectAry);

    //当前题目索引
    const [subjectIndex, setSubjectIndex] = useState(0)

    //答对的题目索引数组
    const [rightSubAry, setRightSubAry] = useState([])
    //用于解决测试结果中数组最后一个元素不会立即更新的BUG
    const rightSubAryRef = useRef(rightSubAry);

    //答错的题目索引数组
    const [wrongSubAry, setWrongSubAry] = useState([])
    //用于解决测试结果中数组最后一个元素不会立即更新的BUG
    const wrongSubAryRef = useRef(wrongSubAry);

    //测试结果数据
    const [testResultsData, setTestResultsData] = useState({})

    //测试是否结束
    const [isTestOver, setIsTestOver] = useState(false)

    //是否重置时间
    const [isResetTime, setIsResetTime] = useState(false)

    //测试是否开始（用于第一次显示开始按钮，此后都显示重新开始按键）
    const [isStart, setIsStart] = useState(false)

    //是否还没到设置的时间测试就结束
    const [isTestOverBeforeTimeUp, setIsTestOverBeforeTimeUp] = useState(false)

    //测试所用时间
    const [usedTime, setUsedTime] = useState(null)

    //上一个点击的省份的id,用于难度为高时的地图单点模式
    const [lastClickId, setLastClickId] = useState(null)

    //中国地级市模式的城市adcode
    const [adCode, setAdCode] = useState(null)

    //用于存储测试模式的地图配置项
    const [mapObject, setMapObject] = useState({})

    //用于在测试结束后加载中不让用户点击任何按钮
    const [isLoading, setIsLoading] = useState(false)

    //用于练习模式点击的层级记录
    const [clickItemName, setClickItemName] = useState([])

    //用于练习模式下点击返回时不重新请求地图配置（提前）
    const [clickItemArray, setClickItemArray] = useState([])

    // 用于打开历史记录
    const [isOpenHistory, setIsOpenHistory] = useState(false);

    const echartsEl = useRef(null);

    //中国地级市模式各地级市的颜色模块
    const colorSelector = ['#cfc5de', '#f1ebd1', '#feffdb', '#e0cee4', '#fde8cd', '#e4f1d7', '#fffed7', '#e4f1d7', '#e0cee4', '#e0cee4', '#feffdb', '#e0cee4', '#fde8cd', '#e4f1d7']

    //地级市数据,用于adCode对应的视图
    const cityOptions = cityOfChinaOptions

    // 获取echart实例
    useEffect(() => {
        getOption(hard, modelIndex, adCode)
    }, []);

    //消息提示
    const success = (content) => {
        messageApi.open({
            type: 'success',
            content: content,
            duration: 1,
        });
    };

    const error = (content) => {
        messageApi.open({
            type: 'error',
            content: content,
            duration: 1,
        });
    };

    const warning = (content) => {
        messageApi.open({
            type: 'warning',
            content: content,
            duration: 1,
        });
    };

    const loading = (cb, duration) => {
        messageApi.open({
            type: 'loading',
            content: '加载中...',
            duration: duration,
        }).then(cb);
        // setTimeout(messageApi.destroy, );
    };

    //将数组打乱
    const randArr = (arr) => {
        let length = arr.length;
        let r = length;
        let rand = 0;
        while (r) {
            rand = Math.floor(Math.random() * (r--));
            [arr[r], arr[rand]] = [arr[rand], arr[r]];
        }
        return arr;
    }

    //生成1~n的顺序数组
    const createOrderArr = (length) => {
        return Array.from({ length }).map((v, k) => k)
    }

    //生成max~min之间的随机数
    // const randNum = (max, min) => {
    //     return Math.floor(Math.random() * (max - min + 1)) + min
    // }

    //生成中国地级市地图配置
    const createMapOption = (data, clickMapId, hard, isPractice) => {
        const mapData = data.features.map((item, index) => {
            return {
                selected: false,
                name: item.properties.name,
                value: item.properties.id || item.properties.adcode,
                lastLevel: item.properties.childrenNum === 0,//是否是最后一级
                emphasis: { itemStyle: { areaColor: colorSelector[index % colorSelector.length] } }
            }
        })

        setChartData(mapData)

        if (!isPractice) {
            //生成乱序的题目
            console.log('地图个数数据：2', mapData.length)
            let subjectIndexAry = createOrderArr(mapData.length)//生成1~length的顺序数组
            let subject = randArr(subjectIndexAry)//生成并随机题目
            setTimeout(() => {
                console.log("重新设置了subjectAry", subject.length)
                setSubjectAry(subject);
            }, 0);
            subjectAryRef.current = subject.concat()
        }

        const defaultMapObject = {
            width: "100%",
            // height: '1000px',
            colorBy: "data",
            label: {
                show: false,
                textBorderColor: "#fff",
                backgroundColor: "#fff",
                color: "#f4f8fb",
                opacity: 0
            },
            tooltip: {
                show: false,
                trigger: 'none'
            },
            geo: {
                id: 0,
                show: isPractice ? false : true,//是否显示地理坐标系组件。
                map: clickMapId,
                zoom: 0.56,
                top: -180,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false
                    }
                },
                roam: isPractice ? true : false,
                itemStyle: {
                    normal: {
                        areaColor: '#f4f8fb',//设置整个视图默认颜色
                        borderWidth: hard === 1 ? 0.5 : 0.5, //设置外层边框
                        borderColor: '#000',
                    },
                    emphasis: {
                        show: false,//无效
                        areaColor: '#f4f8fb',//有效,藏在下面
                        color: '#f4f8fb',
                        // borderWidth: hard === 1 ? 0.5 : 2,
                    }
                },
                silent: false, //禁用地图的hover和点击事件
            },
            series: [{
                type: 'map',
                map: clickMapId,
                aspectScale: 0.75,//长宽比
                zoom: 0.56,
                top: -180,
                roam: isPractice ? true : false, //是否开启鼠标缩放和平移漫游
                label: {
                    normal: {
                        show: false, //是否显示标签。
                    },
                    emphasis: {
                        show: true, //是否显示标签。
                        color: '#fff',
                        backgroundColor: '#c33e3f',
                        verticalAlign: 'center',
                        borderRadius: 6,
                        padding: [3, 4],
                    }
                },
                itemStyle: {
                    normal: {
                        show: false,
                        borderColor: hard === 1 ? '#000' : '#d7dadf',
                        borderWidth: hard === 1 ? 0.5 : 0.5,
                        // areaColor: '#fff',//设置整个视图默认颜色
                        areaColor: '#d7dadf',//设置整个视图默认颜色
                    },
                    emphasis: {
                        show: true,
                        areaColor: '#fff',//item的颜色
                        borderColor: '#000',
                        borderWidth: 0.5
                    }
                },
                selectedMode: 'multiple', //选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
                silent: isPractice ? false : true, //禁用地图的hover和点击事件
                data: mapData,
            }]
        };
        switch (clickMapId) {
            case 1: {
                //console.log('是中国')
                defaultMapObject.geo.zoom = 0.75
                defaultMapObject.geo.top = -120
                defaultMapObject.series[0].zoom = 0.75
                defaultMapObject.series[0].top = -120
                break;
            }
            case 100000: {
                //console.log('是中国')
                defaultMapObject.geo.zoom = 0.75
                defaultMapObject.geo.top = -90
                defaultMapObject.series[0].zoom = 0.75
                defaultMapObject.series[0].top = -90
                break;
            }
            case 110000: {
                //console.log('是北京')
                defaultMapObject.geo.zoom = 0.56
                defaultMapObject.geo.top = -230
                defaultMapObject.series[0].zoom = 0.56
                defaultMapObject.series[0].top = -230
                break;
            }
            case 120000: {
                //console.log('天津市')
                defaultMapObject.geo.zoom = 0.54
                defaultMapObject.geo.top = -410
                defaultMapObject.series[0].zoom = 0.54
                defaultMapObject.series[0].top = -410
                break;
            }
            case 130000: {
                //console.log('河北省')
                defaultMapObject.geo.zoom = 0.56
                defaultMapObject.geo.top = -310
                defaultMapObject.series[0].zoom = 0.56
                defaultMapObject.series[0].top = -310
                break;
            }
            case 140000: {
                //console.log('山西省')
                defaultMapObject.geo.zoom = 0.46
                defaultMapObject.geo.top = -530
                defaultMapObject.series[0].zoom = 0.46
                defaultMapObject.series[0].top = -530
                break;
            }
            case 150000: {
                //console.log('内蒙古自治区')
                defaultMapObject.geo.zoom = 0.75
                defaultMapObject.geo.top = -80
                defaultMapObject.series[0].zoom = 0.75
                defaultMapObject.series[0].top = -80
                break;
            }
            case 210000: {
                //console.log('辽宁省')
                defaultMapObject.geo.zoom = 0.64
                defaultMapObject.geo.top = -170
                defaultMapObject.series[0].zoom = 0.64
                defaultMapObject.series[0].top = -170
                break;
            }
            case 220000: {
                //console.log('吉林省')
                defaultMapObject.geo.zoom = 0.75
                defaultMapObject.geo.top = -80
                defaultMapObject.series[0].zoom = 0.75
                defaultMapObject.series[0].top = -80
                break;
            }
            case 230000: {
                //console.log('黑龙江省')
                defaultMapObject.geo.top = -200
                defaultMapObject.series[0].top = -200
                break;
            }
            case 310000: {
                //console.log('上海市')
                defaultMapObject.geo.zoom = 0.66
                defaultMapObject.geo.top = -200
                defaultMapObject.series[0].zoom = 0.66
                defaultMapObject.series[0].top = -200
                break;
            }
            case 320000: {
                //console.log('上海市')
                defaultMapObject.geo.zoom = 0.58
                defaultMapObject.geo.top = -220
                defaultMapObject.series[0].zoom = 0.58
                defaultMapObject.series[0].top = -220
                break;
            }
            case 330000: {
                //console.log('浙江省')
                defaultMapObject.geo.top = -260
                defaultMapObject.series[0].top = -260
                break;
            }
            case 350000: {
                //console.log('福建省')
                defaultMapObject.geo.top = -306
                defaultMapObject.series[0].top = -306
                break;
            }
            case 360000: {
                //console.log('江西省')
                defaultMapObject.geo.top = -340
                defaultMapObject.series[0].top = -340
                break;
            }
            case 370000: {
                //console.log('山东省')
                defaultMapObject.geo.zoom = 0.76
                defaultMapObject.geo.top = -68
                defaultMapObject.series[0].zoom = 0.76
                defaultMapObject.series[0].top = -68
                break;
            }
            case 410000: {
                //console.log('河南省')
                defaultMapObject.geo.top = -230
                defaultMapObject.series[0].top = -230
                break;
            }
            case 420000: {
                //console.log('湖北省')
                defaultMapObject.geo.zoom = 0.76
                defaultMapObject.geo.top = -68
                defaultMapObject.series[0].zoom = 0.76
                defaultMapObject.series[0].top = -68
                break;
            }
            case 430000: {
                //console.log('湖南省')
                defaultMapObject.geo.top = -300
                defaultMapObject.series[0].top = -300
                break;
            }
            case 440000: {
                //console.log('广东省')
                defaultMapObject.geo.zoom = 0.60
                defaultMapObject.geo.top = -200
                defaultMapObject.series[0].zoom = 0.60
                defaultMapObject.series[0].top = -200
                break;
            }
            case 450000: {
                //console.log('广西壮族自治区')
                defaultMapObject.geo.zoom = 0.60
                defaultMapObject.geo.top = -190
                defaultMapObject.series[0].zoom = 0.60
                defaultMapObject.series[0].top = -190
                break;
            }
            case 460000: {
                //console.log('海南省')
                defaultMapObject.geo.zoom = 1.8
                defaultMapObject.geo.top = 1050
                defaultMapObject.geo.left = 720
                defaultMapObject.series[0].zoom = 1.8
                defaultMapObject.series[0].top = 1050
                defaultMapObject.series[0].left = 720
                break;
            }
            case 500000: {
                //console.log('重庆市')
                defaultMapObject.geo.zoom = 0.8
                defaultMapObject.geo.top = -100
                defaultMapObject.series[0].zoom = 0.8
                defaultMapObject.series[0].top = -100
                break;
            }
            case 510000: {
                //console.log('四川省')
                defaultMapObject.geo.zoom = 0.64
                defaultMapObject.geo.top = -170
                defaultMapObject.series[0].zoom = 0.64
                defaultMapObject.series[0].top = -170
                break;
            }
            case 520000: {
                //console.log('贵州省')
                defaultMapObject.geo.top = -230
                defaultMapObject.series[0].top = -230
                break;
            }
            case 530000: {
                //console.log('贵州省')
                defaultMapObject.geo.top = -290
                defaultMapObject.series[0].top = -290
                break;
            }
            case 540000: {
                //console.log('西藏自治区')
                defaultMapObject.geo.zoom = 0.65
                defaultMapObject.geo.top = -60
                defaultMapObject.series[0].zoom = 0.65
                defaultMapObject.series[0].top = -60
                break;
            }
            case 610000: {
                //console.log('陕西省')
                defaultMapObject.geo.zoom = 0.47
                defaultMapObject.geo.top = -490
                defaultMapObject.series[0].zoom = 0.47
                defaultMapObject.series[0].top = -490
                break;
            }
            case 620000: {
                //console.log('甘肃省')
                defaultMapObject.geo.zoom = 0.74
                defaultMapObject.geo.top = -110
                defaultMapObject.series[0].zoom = 0.74
                defaultMapObject.series[0].top = -110
                break;
            }
            case 630000: {
                //console.log('青海省')
                defaultMapObject.geo.zoom = 0.62
                defaultMapObject.geo.top = -60
                defaultMapObject.series[0].zoom = 0.62
                defaultMapObject.series[0].top = -60
                break;
            }
            case 640000: {
                //console.log('宁夏回族自治区')
                defaultMapObject.geo.zoom = 0.4
                defaultMapObject.geo.top = -510
                defaultMapObject.series[0].zoom = 0.4
                defaultMapObject.series[0].top = -510
                break;
            }
            case 650000: {
                //console.log('新疆维吾尔自治区')
                defaultMapObject.geo.zoom = 0.66
                defaultMapObject.geo.top = -150
                defaultMapObject.series[0].zoom = 0.66
                defaultMapObject.series[0].top = -150
                break;
            }
            case 810000: {
                //console.log('香港特别行政区')
                defaultMapObject.geo.zoom = 0.66
                defaultMapObject.geo.top = -150
                defaultMapObject.series[0].zoom = 0.66
                defaultMapObject.series[0].top = -150
                break;
            }
            case 820000: {
                //console.log('澳门特别行政区')
                defaultMapObject.geo.zoom = 0.38
                defaultMapObject.geo.top = -650
                defaultMapObject.series[0].zoom = 0.38
                defaultMapObject.series[0].top = -650
                break;
            }
            default:
                break;
        }
        if (isPractice) {
            //console.log('练习模式存入配置数组')
            setClickItemArray((data) => {
                data.push(defaultMapObject)
                return data
            })
        }
        echarts.registerMap(clickMapId, data);
        setMapObject(defaultMapObject)
        // let echartDom = echartsEl.current.getDom()
        // let echarts_instance = echartsEl.current.getEchartsInstance();
    }

    const getOption = (hard, modelIndex, adCode) => {
        switch (modelIndex) {
            case 0:
                // 中国省份模式
                const copyData = JSON.parse(JSON.stringify(data))
                setChartData(copyData)
                const option = {
                    width: "100%",
                    colorBy: "data",
                    label: {
                        show: false,
                        textBorderColor: "#fff",
                        backgroundColor: "#fff",
                        color: "#f4f8fb",
                        opacity: 0
                    },
                    tooltip: {
                        show: false,
                        trigger: 'none'
                    },
                    emphasis: {
                        //这个就是不能放进series
                        // 鼠标移入时高亮
                        // disabled: false,
                        // focus: "self", //突出选中的区域 其它区域谈化效果
                        // itemStyle: {
                        //     opacity: 1,
                        //     borderColor: "#f18355",//省份边缘颜色
                        //     borderWidth: 0,
                        //     areaColor: "#000",//省份颜色无效，去series.itemStyle.emphasis设置
                        // }
                    },
                    geo: {
                        id: 0,
                        show: true,//是否显示地理坐标系组件。
                        map: 'china',
                        zoom: 0.75,
                        top: -90,
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#f4f8fb',//设置整个视图默认颜色
                                borderWidth: hard === 1 ? 0.5 : 0.5, //设置外层边框
                                borderColor: '#000',
                            },
                            emphasis: {
                                show: false,//无效
                                areaColor: '#f4f8fb',//有效,藏在下面
                                color: '#f4f8fb',
                                // borderWidth: hard === 1 ? 0.5 : 2,
                            }
                        },
                        // regions: [{
                        //     name: '广东',
                        //     selected: true,
                        //     emphasis: {
                        //         itemStyle: {
                        //             areaColor: '#EFF1FF'
                        //         }
                        //     }
                        // }],
                        silent: false, //禁用地图的hover和点击事件
                    },
                    series: [{
                        type: 'map',
                        map: 'china',
                        aspectScale: 0.75,//长宽比
                        zoom: 0.75,
                        top: -90,
                        roam: false, //是否开启鼠标缩放和平移漫游
                        // nameMap: {
                        //     'China': '中国'
                        // },
                        // geoIndex: 0,//理解就是多个组件都能用option里配置的geo地图，类似于坐标轴里的yAxisIndex:numder,也就是说你可以配置多个geo，也可以多个组件共用geo
                        label: {
                            normal: {
                                show: false, //是否显示标签。
                            },
                            emphasis: {
                                show: true, //是否显示标签。
                                color: '#fff',
                                backgroundColor: '#c33e3f',
                                verticalAlign: 'center',
                                borderRadius: 6,
                                padding: [3, 4],
                            }
                        },
                        itemStyle: {
                            normal: {
                                show: false,
                                borderColor: hard === 1 ? '#000' : '#d7dadf',
                                borderWidth: hard === 1 ? 0.5 : 0.5,
                                // areaColor: '#fff',//设置整个视图默认颜色
                                areaColor: '#d7dadf',//设置整个视图默认颜色
                            },
                            emphasis: {
                                show: true,
                                areaColor: '#fff',//item的颜色
                                borderColor: '#000',
                                borderWidth: 0.5
                            }
                        },
                        // emphasis: {
                        //     // disabled: true, //是否关闭高亮状态。从 v5.3.0 开始支持,我用的是4.1  
                        //     itemStyle: {
                        //         opacity: 0
                        //     }
                        // },
                        selectedMode: 'multiple', //选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
                        silent: true, //禁用地图的hover和点击事件
                        data: copyData,
                    }]
                }
                // echarts.registerMap('china', option);
                setMapObject(option)

                //生成乱序的题目
                console.log('地图个数数据：3', copyData.length)
                let subjectIndexAry = createOrderArr(copyData.length)//生成1~length的顺序数组
                let subject = randArr(subjectIndexAry)//生成并随机题目
                setTimeout(() => {
                    console.log("重新设置了subjectAry", subject.length)
                    setSubjectAry(subject);
                }, 0);
                subjectAryRef.current = subject.concat()

                break;
            case 1:
                window.fetch(`${requestPrefix}/${adCode}.json`).then((data) => {
                    if (data.ok) {
                        return data.text();
                    } else {
                        return Promise.reject()
                    }
                }).then((res) => {
                    const data = JSON.parse(res);
                    createMapOption(data, adCode, hard)
                }).catch((err) => {
                    console.log(err)
                    error('发生错误！请重试')
                });
                break;
            case 2: {
                if (!adCode) {
                    window.fetch(`../noIslandJson.json`).then((data) => {
                        if (data.ok) {
                            return data.text();
                        } else {
                            return Promise.reject()
                        }
                    }).then((res) => {
                        const data = JSON.parse(res);
                        // 显示南海岛屿及轮廓线
                        createMapOption(data, 1, 1, true);

                    }).catch((err) => {
                        console.log(err)
                        error('发生错误！请重试')
                    });
                } else {
                    window.fetch(`${requestPrefix}/${adCode}.json`).then((data) => {
                        if (data.ok) {
                            return data.text();
                        } else {
                            return Promise.reject()
                        }
                    }).then((res) => {
                        const data = JSON.parse(res);
                        createMapOption(data, adCode, 1, true);
                    }).catch((err) => {
                        console.log(err)
                        error('发生错误！请重试')
                    });
                }
                break;
            }
            default:
                break;
        }
    }

    const onChartReadyCallback = () => {

    }

    //地图点击事件
    const clickMap = (params) => {
        if (modelIndex === 2) {
            // 点击后要跳到下一级
            if (params && params.data) {
                const { data: { name, value, lastLevel } } = params;
                if (!lastLevel) {
                    getOption(1, 2, value)
                    const len = clickItemName.length;
                    if (len < 2) {
                        // this.state.clickItemName.push(name);
                        setClickItemName((data) => {
                            data.push(name)
                            return data
                        })
                    } else {
                        // this.state.clickItemName[1] = name;
                        setClickItemName((data) => {
                            data[1] = name
                            return data
                        })
                    }
                    // this.props.onChange(this.state.clickItemName);
                } else {
                    // this.setState({ toastVisible: true }, () => {
                    //     setTimeout(() => {
                    //         this.setState({ toastVisible: false });
                    //     }, 1000);
                    // });
                    //console.log('暂无下一级数据')
                    error('暂无下一级数据')
                }
            }
            return
        }
        if (isStop) return //地图禁用点击事件

        const data = chartData
        let index = data.findIndex((item) => {
            return item.name === params.name
        })
        if (index === subjectAry[subjectIndex]) {
            success('答对了！')

            setRightSubAry((data) => {
                let newAry = data.concat();
                newAry.push(subjectAry[subjectIndex])
                return newAry
            })
            rightSubAryRef.current.push(subjectAry[subjectIndex])

            data[index].selected = true

            // 不用重新渲染
            // setChartData(data)
            // let option = getOption(hard)
            // let echarts_instance = echartsEl.current.getEchartsInstance();
            // echarts_instance.setOption(option)

        } else {
            error('答错了！')

            setWrongSubAry((data) => {
                let newAry = data.concat();
                newAry.push(subjectAry[subjectIndex])
                return newAry
            })
            wrongSubAryRef.current.push(subjectAry[subjectIndex])

            //console.log(subjectIndex)
            data[subjectAry[subjectIndex]].selected = true

            //不用重新渲染
            // setChartData(data)
            // let option = getOption(hard)
            // let echarts_instance = echartsEl.current.getEchartsInstance();
            // echarts_instance.setOption(option)
        }

        // 难度为高时
        if (lastClickId && hard === 3) {
            //console.log('上次点击的地图index为', lastClickId)
            data[lastClickId].selected = false
        }

        //跳转下一个
        //console.log('跳转下一个')
        setSubjectAry((data) => {
            let newAry = data.concat();
            let id = newAry.splice(subjectIndex, 1)
            //存储这次点击的index,用于下次取消高亮,因为setSubjectAry是异步所以放要这里
            setLastClickId(id)
            return newAry
        })

        //因为前面用了Array.concat()深拷贝故不会影响原数组
        subjectAryRef.current.splice(subjectIndex, 1)

        next()

    };

    const goBack = () => {
        setClickItemArray((data) => {
            data.pop()
            const mapObject = data[data.length - 1];
            setMapObject(mapObject)
            return data
        })

        setClickItemName((data) => {
            data.pop()
            return data
        })

        // const mapObject = clickItemArray[clickItemArray.length - 1];
        // //console.log('返回时要设置上一级的配置', mapObject)
        // setMapObject(mapObject)
    }

    const EventsDict = {
        click: clickMap,
    };

    //关闭设置的模态框
    const closeModal = () => {

        setIsShowModel(false)
    }

    //关闭测试结果的模态框
    const closeResultsModal = () => {
        setIsTestOverBeforeTimeUp(false) //关闭模态框时将变量（是否在设置的时间内完成测试）改回来
        setUsedTime(null) // 关闭模态框时将测试结果所用时间重置
        setLastClickId(null) //关闭模态框时将上个点击的地图id设置为null(难度为困难有用)
        setIsShowResults(false)
    }

    //设置完成点击确定的回调
    const handleOk = (modelIndex, adcode, hard, time) => {
        if (modelIndex === 2) {
            // 是练习模式
            setIsLoading(true)//禁用按钮
            setIsShowModel(false)//关闭设置的模态框
            setModelIndex(modelIndex)//测试的模式 0-中国省级行政区 1-中国地级市 2-练习模式

            getOption(hard, modelIndex, null)

            setHard(0)//难度显示为'-'
            return
        } else {
            setIsLoading(false)
        }
        //是否是在开始后并且在测试过程中暂停时的重新设置，是则直接按设置的模式开始测试，不是则需要点击开始按钮才能开始测试
        if (isStart && isStop) {
            //console.log('是在开始后并且在测试过程中暂停时的重新设置完成')

            //重置答对和答错的数组
            setRightSubAry([])
            rightSubAryRef.current = []
            setWrongSubAry([])
            wrongSubAryRef.current = []
        } else {
            //console.log('是在未开始的设置完成')

            //显示重新开始
            setIsStart(true)
        }
        //初始化上一个点击的省份index
        setLastClickId(null)

        //测试未结束
        setIsTestOver(false)

        //重置测试时间
        setIsResetTime(true)

        //取反地图开关（关闭），为什么？因为子组件countDown要变化，分在答题过程中和测试结束后等四个状态
        setIsStop(!isStop)

        setIsShowModel(false)//关闭设置的模态框
        setModelIndex(modelIndex)//测试的模式 0-中国省级行政区 1-中国地级市 2-练习模式
        if (modelIndex === 1) {
            // console.log('中国地级市模式')

            setAdCode(adcode)
            getOption(hard, modelIndex, adcode)
        } else {
            //console.log('中国省级行政区模式')

            //清除高亮, 放到getOption中了
            // setChartData((data) => {
            //     const copyData = JSON.parse(JSON.stringify(data))
            //     let newAry = copyData.map((item) => {
            //         return {
            //             ...item,
            //             selected: false,
            //         }
            //     })
            //     return newAry
            // })

            setAdCode(null)
            getOption(hard, modelIndex, adcode)
        }
        setHard(hard)
        setTime(time)
    }

    const starTest = () => {
        if (isLoading || !isStop) return
        //console.log('开始测试')

        //显示重新开始
        setIsStart(true)

        //下面这步在getOptions中做了
        // let subjectIndexAry = createOrderArr(chartData.length)//生成1~length的顺序数组
        // let subject = randArr(subjectIndexAry)//生成并随机题目
        // setSubjectAry(subject)

        //打开地图点击开关
        setIsStop(false)
    }

    const pauseTest = () => {
        if (isLoading || isStop) return
        //console.log('暂停测试')
        setIsStop(true)
    }

    const showSetTestModel = () => {
        if (isLoading || !isStop) return
        setIsShowModel(true)
    }

    const showSetTestModelByOther = () => {
        if (modelIndex === 2) {
            setIsShowModel(true)
        }
    }

    const overTest = (isOver) => {
        if (isOver) {
            // console.log('对的数组id：', rightSubAryRef.current)
            // console.log('错的数组id：', wrongSubAryRef.current)
            let rightSubView = rightSubAryRef.current.map((item, index) => {
                return chartData[item].name
            })
            let wrongSubView = wrongSubAryRef.current.map((item, index) => {
                return chartData[item].name
            })

            let notTextSubView = [];//没有测试到的
            // console.log('原数组',subjectAry)
            // console.log('原数组长度',subjectAry.length)
            // console.log('原数组ref',subjectAryRef.current)
            // console.log('原数组ref长度', subjectAryRef.current.length)
            if (subjectAryRef.current.length) {
                notTextSubView = subjectAryRef.current.map((item, index) => {
                    return chartData[item].name
                })
            }
            //弹出测试结果框
            let timeView = time < 10 ? `0${time}:00` : `${time}:00`
            let modelLevelView = ''
            if (modelIndex === 1) {
                modelLevelView = provinceView()
                // console.log(modelLevelView)
            }
            setTestResultsData((date) => {
                let newObj = Object.assign({}, date)
                newObj.model = modelIndex
                newObj.modelLevel = modelLevelView
                newObj.hard = hard
                newObj.time = timeView
                newObj.rightAry = rightSubView
                newObj.wrongAry = wrongSubView
                newObj.notTextAry = notTextSubView
                newObj.allNum = chartData.length
                return newObj
            })
            //禁止用户点击
            setIsStop(true)

            //测试结束
            setIsTestOver(true)

            setIsLoading(true)
            loading(() => {
                //显示测试结果面板
                setIsShowResults(true)
                setIsLoading(false)
            }, 2.5)

        }

    }

    const newRef = useRef()
    newRef.current = overTest

    const newRefTarget = useCallback(() => {
        newRef.current.apply(null, arguments)
    }, [])

    const next = () => {

        console.log("subjectAry:", subjectAry.length)
        if (subjectAry.length === 1) {
            console.log('已无题目', subjectAry.length)
            setIsTestOverBeforeTimeUp(true)//用于接收子组件的剩下时间
            overTest(true)
            return
        }
    }

    const skip = () => {
        if (isLoading || isStop) return
        //console.log(subjectIndex)
        //console.log(subjectAry.length)
        if (subjectAry.length === 0) {
            return
        }
        setSubjectAry((data) => {
            let newAry = data.concat()
            let firstSubject = newAry.shift();
            newAry.push(firstSubject)

            let fistSubRef = subjectAryRef.current.shift()
            subjectAryRef.current.push(fistSubRef)

            return newAry
        })

    }

    const restart = () => {
        if (isLoading) return
        if (isResetTime) return //如果是在重置时间中则返回

        // console.log('重新开始')

        //消除地图高亮
        let newChartData; //新的地图数据项
        setChartData((data) => {
            const copyData = JSON.parse(JSON.stringify(data))
            let newAry = copyData.map((item) => {
                return {
                    ...item,
                    selected: false,
                }
            })
            newChartData = newAry
            return newAry
        })
        //因为地图的options没配置为一个函数，而是一个state，故要修改这个地图配置项的seriee中的data才能消除地图高亮
        setMapObject((data) => {
            let newData = JSON.parse(JSON.stringify(data))
            newData.series[0].data = newChartData
            return newData
        })

        //测试开始
        setIsTestOver(false)

        //重置测试时间
        setIsResetTime(true)

        //重置答对和答错的数组
        setRightSubAry([])
        rightSubAryRef.current = []

        setWrongSubAry([])
        wrongSubAryRef.current = []

        //取反地图开关（关闭），为什么？因为子组件countDown要变化，分在答题过程中和测试结束后等四个状态
        setIsStop(!isStop)

        console.log('地图个数数据：1', newChartData.length)
        let subjectIndexAry = createOrderArr(newChartData.length)//生成1~length的顺序数组
        let subject = randArr(subjectIndexAry)//生成并随机题目
        setTimeout(() => {
            console.log("重新设置了subjectAry", subject.length)
            setSubjectAry(subject)
        }, 0)
        subjectAryRef.current = subject.concat()

    }

    const isStopBeFalse = (isStop) => {
        //console.log('重置IsStop恢复为false', isStop)
        setIsStop(isStop)
    }

    const isResetTimeBeFalse = (isResetTime) => {
        // console.log('重置IsResetTime恢复为false', isResetTime)
        setIsResetTime(isResetTime)
    }

    const isOverBeforeTimeUpFunc = (usedTime) => {
        // //console.log('是否接收到所用的时间：', usedTime)
        setUsedTime(usedTime)
    }

    const provinceView = () => {
        if (adCode) return cityOptions.find(item => item.value === adCode).label
    }

    return (
        <>
            {contextHolder}
            <ChinaMapWrapper>
                <div className='mapHeader-container'>
                    <ul className='mapHeader-list'>
                        {modelIndex === 2 ? <li className='mapHeader-btn mapHeader-left' style={{ display: 'flex' }}>
                            {clickItemName.length !== 0 ?
                                <div className='btn' onClick={goBack}>
                                    <LeftOutlined className='rightIcon' />
                                    返回
                                </div> : <div className='empty-btn'></div>}
                            <span>{clickItemName.length !== 0 ? clickItemName[clickItemName.length - 1] : '中国'}</span>
                            <div className='btn mapHeader-setBtn' onClick={showSetTestModelByOther}>设置</div>
                        </li> : null}
                        <li className='mapHeader-btn' style={{ display: isStop && modelIndex !== 2 ? 'flex' : 'none' }}>
                            {isTestOver ? '' : <div className='btn mapHeader-startBtn' onClick={starTest}>开始</div>}
                            <div className='btn mapHeader-setBtn' onClick={showSetTestModel}>设置</div>
                        </li>
                        <li className='mapHeader-btn mapHeader-left' style={{ display: isStop ? 'none' : 'flex' }}>
                            <div className='btn' onClick={pauseTest}>
                                {/* <LeftOutlined className='leftIcon' /> */}
                                暂停
                            </div>
                            <span>{chartData[subjectAry[subjectIndex]]?.name}</span>
                            <div className='btn' onClick={skip}>
                                <RightOutlined className='rightIcon' />
                            </div>
                        </li>
                        <li className='mapHeader-labelBox'>
                            <div className='label-box-label'>模式</div>
                            <div className='label-box-text label-text-model'>{modelIndex === 0 || modelIndex === 2 ? modelOptions[modelIndex].label : ''}{adCode ? provinceView() : ''}</div>
                        </li>
                        <li className='mapHeader-labelBox'>
                            <div className='label-box-label'>难度</div>
                            <div className='label-box-text label-text-model'>{hard === 1 ? '简单' : hard === 2 ? '普通' : hard === 3 ? '困难' : '-'}</div>
                        </li>
                        <li className='mapHeader-labelBox'>
                            <div className='label-box-label'>正确/总计</div>
                            <div className='label-box-text'>
                                {modelIndex === 2 ? '-' : <>
                                    <span className="score">{rightSubAry.length}</span>
                                    <span className='sum'>/{chartData.length}</span>
                                </>}

                            </div>
                        </li>
                        <li className='mapHeader-labelBox'>
                            <div className='label-box-label'>剩余时间</div>
                            <div className='label-box-text'>
                                {modelIndex === 2 ? '-' : <CountDown
                                    continuous={time}
                                    isStop={isStop}
                                    showDomStruct={true}
                                    overTest={newRefTarget}
                                    isResetTime={isResetTime}
                                    isStopBeFalse={isStopBeFalse}
                                    isResetTimeBeFalse={isResetTimeBeFalse}
                                    isTestOverBeforeTimeUp={isTestOverBeforeTimeUp}
                                    isOverBeforeTimeUpFunc={isOverBeforeTimeUpFunc}
                                />}

                            </div>
                        </li>
                        {isStart ? <li className='mapHeader-btn'>
                            <div className='btn mapHeader-againBtn' onClick={restart}>重新开始</div>
                        </li> : ''}

                    </ul>
                </div>
                <ReactEChartsCore
                    id="echarts"
                    className="mapMain-container"
                    echarts={echarts}
                    // option={modelIndex ? mapObject :getOption(hard, modelIndex)}
                    option={mapObject}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={onChartReadyCallback}
                    onEvents={EventsDict}
                    // opts={document.getElementById('map')}
                    ref={echartsEl}
                />
                {/* {clickItemName.length !== 0 ? (
                    <div onClick={goBack} className="goBackBtn">返回</div>
                ) : null} */}
                <SetForm
                    isShowModel={isShowModel}
                    closeModal={closeModal}
                    handleOk={handleOk}
                    resetData={{
                        model: modelIndex,
                        hard: hard,
                        time: time
                    }}
                />
                <TestResults
                    isShowResults={isShowResults}
                    testResultsData={testResultsData}
                    closeResultsModal={closeResultsModal}
                    usedTime={usedTime}
                />
            </ChinaMapWrapper>
            <TextHistory>
                <div className='history-handle' onClick={() => { setIsOpenHistory(!isOpenHistory) }}>
                    <div className='icons'></div>
                </div>
                <div className={'history' + ' ' + (isOpenHistory ? '' : 'hidden')}>
                    <div className='history-header'>
                        <div className='hori-selector'></div>
                        <div className='nav-item'>全部</div>
                        <div className='nav-item'></div>
                        <div className='nav-item'></div>
                        <div className='nav-item'></div>
                    </div>
                    <div className='history-main'>
                        <div className='history-list'>
                            <div className='history-list'>
                                <div className='history-item'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TextHistory>
        </>
    )
}