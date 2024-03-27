import React, { useRef, useState, useEffect } from 'react'

import PropTypes from 'prop-types'

export default function CountDown(props) {

    const countDownTimer = useRef(); // 倒计时标记
    const [timeView, setTimeView] = useState(); // 倒计时显示
    const [timeRemain, setTimeRemain] = useState(null); // 倒计时剩下多少时间,单位秒

    //初始化
    useEffect(() => {
        // console.log('重置时间检测得到吗？',props.continuous)
        const times = parseInt(`${props.continuous * 60}`)
        setTimeRemain(times)

        if (props.continuous) {
            clearTimeout(countDownTimer.current);
            // const h = parseInt(`${(times / 60 / 60) % 24}`); //计算小时数 转化为整数
            const m = parseInt(`${(times / 60) % 60}`); //计算分钟数 转化为整数
            const s = parseInt(`${times % 60}`); //计算描述 转化为整数

            //初始化时间格式
            setTimeView({
                // h: h < 10 ? `0${h}` : `${h}`,
                m: m < 10 ? `0${m}` : `${m}`,
                s: s < 10 ? `0${s}` : `${s}`,
            });
        }
    }, [props.continuous]);

    //重新开始
    // useEffect(() => {
    //     if(props.isResetTime) {
    //         const times = parseInt(`${props.continuous * 60}`)
    //         setTimeRemain(times)

    //         if (props.continuous) {
    //             clearTimeout(countDownTimer.current);
    //             // const h = parseInt(`${(times / 60 / 60) % 24}`); //计算小时数 转化为整数
    //             const m = parseInt(`${(times / 60) % 60}`); //计算分钟数 转化为整数
    //             const s = parseInt(`${times % 60}`); //计算描述 转化为整数

    //             //初始化时间格式
    //             setTimeView({
    //                 // h: h < 10 ? `0${h}` : `${h}`,
    //                 m: m < 10 ? `0${m}` : `${m}`,
    //                 s: s < 10 ? `0${s}` : `${s}`,
    //             });

    //             props.reSetTimeFalse(false)
    //         }
    //     }

    // }, [props.isResetTime]);

    useEffect(() => {
        if (props.isStop === true && props.isResetTime === true) {
            console.log('在测试过程中重新开始')
            // 如果是重新开始按键则需要重置timeView后才开始
            console.log('如果是重新开始按键则需要重置timeView后才开始')

            const times = parseInt(`${props.continuous * 60}`)
            setTimeRemain(times)
            clearTimeout(countDownTimer.current);
            // const h = parseInt(`${(times / 60 / 60) % 24}`); //计算小时数 转化为整数
            const m = parseInt(`${(times / 60) % 60}`); //计算分钟数 转化为整数
            const s = parseInt(`${times % 60}`); //计算描述 转化为整数

            //初始化时间格式
            setTimeView({
                // h: h < 10 ? `0${h}` : `${h}`,
                m: m < 10 ? `0${m}` : `${m}`,
                s: s < 10 ? `0${s}` : `${s}`,
            });

            props.isStopBeFalse(false)
            props.isResetTimeBeFalse(false)
        } else if (props.isStop === false && props.isResetTime === true) {
            console.log('在测试结束后或测试暂停的过程中重新设置了测试难度、模式和时间 重新开始')

            const times = parseInt(`${props.continuous * 60}`)
            setTimeRemain(times)
            clearTimeout(countDownTimer.current);
            // const h = parseInt(`${(times / 60 / 60) % 24}`); //计算小时数 转化为整数
            const m = parseInt(`${(times / 60) % 60}`); //计算分钟数 转化为整数
            const s = parseInt(`${times % 60}`); //计算描述 转化为整数

            //初始化时间格式
            setTimeView({
                // h: h < 10 ? `0${h}` : `${h}`,
                m: m < 10 ? `0${m}` : `${m}`,
                s: s < 10 ? `0${s}` : `${s}`,
            });

            props.isResetTimeBeFalse(false)

        } else if (props.isStop === true && props.isResetTime === false) {
            console.log('在测试过程中暂停')
            clearTimeout(countDownTimer.current);
        } else if (props.isStop === false && props.isResetTime === false) {
            console.log('在测试过程中停止暂停')
            if (props.continuous) {
                countDown(timeRemain);
            }
            // return () => {
            //     clearTimeout(countDownTimer.current);
            // };

        }
        // if (props.isStop) {
        //     console.log('停')
        //     clearTimeout(countDownTimer.current);
        // } else {
        //     console.log('始')
        //     console.log('要不要归零时间？',props.isResetTime)
        //     if(props.isResetTime) {

        //         //如果是重新开始按键则需要重置timeView后才开始
        //         console.log('如果是重新开始按键则需要重置timeView后才开始')
        //         const times = parseInt(`${props.continuous * 60}`)
        //         setTimeRemain(times)
        //         clearTimeout(countDownTimer.current);
        //         // const h = parseInt(`${(times / 60 / 60) % 24}`); //计算小时数 转化为整数
        //         const m = parseInt(`${(times / 60) % 60}`); //计算分钟数 转化为整数
        //         const s = parseInt(`${times % 60}`); //计算描述 转化为整数

        //         //初始化时间格式
        //         setTimeView({
        //             // h: h < 10 ? `0${h}` : `${h}`,
        //             m: m < 10 ? `0${m}` : `${m}`,
        //             s: s < 10 ? `0${s}` : `${s}`,
        //         });

        //         props.reSetTimeFalse(false)

        //     }
        //     if (props.continuous) {
        //         countDown(timeRemain);
        //     } 
        //     return () => {
        //         clearTimeout(countDownTimer.current);
        //     };
        // }

        return () => {
            clearTimeout(countDownTimer.current);
        };
    }, [props.isStop, props.isResetTime]);

    //用于测试结果传个所用时间
    useEffect(() => {
        if (props.isTestOverBeforeTimeUp) {
            //还没到设置的时间测试就已结束
            // console.log('isTestOverBeforeTimeUp为true')
            // console.log(timeView)
            let minutes = props.continuous - 1 - timeView.m
            let seconds = (60 - timeView.s)
            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
            seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
            // console.log('所用分钟数', minutes)
            // console.log('所用秒数', seconds)
            let usedTime = minutes + ':' + seconds
            console.log('所用时间', usedTime)
            props.isOverBeforeTimeUpFunc(usedTime)
        } else {
            console.log('isTestOverBeforeTimeUp为false')
        }

    }, [props.isTestOverBeforeTimeUp])

    const countDown = (times) => {
        // const nowTime = +new Date(); //获取当前时间的时间戳（单位毫秒）
        // const times = parseInt(`${(props.expire - nowTime) / 1000}`); //把剩余时间毫秒数转化为秒

        // const h = parseInt(`${(times / 60 / 60) % 24}`); //计算小时数 转化为整数
        const m = parseInt(`${(times / 60) % 60}`); //计算分钟数 转化为整数
        const s = parseInt(`${times % 60}`); //计算描述 转化为整数

        //设置时间格式
        setTimeView({
            // h: h < 10 ? `0${h}` : `${h}`,
            m: m < 10 ? `0${m}` : `${m}`,
            s: s < 10 ? `0${s}` : `${s}`,
        });

        //时间判断
        if (times <= 0) {
            //测试结束
            props.overTest(true)
            clearTimeout(countDownTimer.current);
            // setTimeView({ h: '00', m: '00', s: '00' });
            setTimeView({ m: '00', s: '00' });
        } else {
            const time = times - 1
            setTimeRemain(time)
            countDownTimer.current = setTimeout(() => {
                // console.log('循环中...')
                countDown(time);
            }, 1000);
        }
    };
    return (
        <>
            {props.showDomStruct ?? true ? (
                <>
                    {/* {timeView?.h}:{timeView?.m}:{timeView?.s} */}
                    {timeView?.m}:{timeView?.s}
                </>
            ) : (
                <>

                </>
            )}
        </>
    )
}

CountDown.propTypes = {
    // expire: PropTypes.number.isRequired,
    continuous: PropTypes.number.isRequired,//持续时间，单位分钟
    isStop: PropTypes.bool.isRequired,//是否停止倒计时
    showDomStruct: PropTypes.bool,//是否显示倒计时
    overTest: PropTypes.func,//测试结果
    isResetTime: PropTypes.bool,//是否重置时间
    isStopBeFalse: PropTypes.func,//回调isResetTime为false
    isResetTimeBeFalse: PropTypes.func,//回调isResetTime为false
    isTestOverBeforeTimeUp: PropTypes.bool,//是否还没到设置的时间测试就结束，是的话触发isOverBeforeTimeUpFunc用于将剩下的时间传给父组件
    isOverBeforeTimeUpFunc: PropTypes.func,//用于将剩下的时间传给父组件


}
