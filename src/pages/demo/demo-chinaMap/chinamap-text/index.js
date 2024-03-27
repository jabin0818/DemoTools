import React, { Component } from 'react'

import ReactChinaMap from 'react-echarts-chinamap'


export default function Exhortation () {
    const handleOnChange = (data) => {
        console.log(data) // 此时data是用户点击的区域的名称数组
    }

    return (
        <ReactChinaMap onChange={handleOnChange} />
    )
}