import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { Modal, Space, Tag } from 'antd'

import { TestResultsWrapper } from './style'

export default function TestResults(props) {

    const { isShowResults, testResultsData, closeResultsModal, usedTime } = props

    const data = ['北京','天津','上海','重庆','河北','河南','云南','辽宁','黑龙江','湖南','安徽','山东','新疆','江苏','浙江','江西','湖北','广西','甘肃','山西','内蒙古','陕西','吉林','福建','贵州','广东','青海','西藏','四川','宁夏','海南','台湾','香港','南海诸岛']

    const modelView = ['中国省份', '中国地级市', '世界国家', '七大洲四大洋']

    const hardView = ['','简单','普通','困难']

    // const subjectColorType = ['red', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']

    const cancelResults = () => {
        closeResultsModal()
    }

    // useEffect(() => {
    //     console.log(testResultsData)
    // }, []);

    return (
        <Modal
            open={isShowResults}
            onCancel={() => cancelResults()}
            centered={true}
            title={
                <div style={{ fontSize: '19px', textAlign: 'center' }}>
                    测试结果
                </div>
            }
            footer={null}
            className="testResultsModal"
        >
            <TestResultsWrapper>
                <Space align="start" size={80} className='testResults-top'>
                    <div className='testResults-col'>
                        <div className='testResults-row'>
                            <span>模式：</span>
                            <span>{modelView[testResultsData.model]}{testResultsData?.modelLevel !== '' ? '-' + testResultsData?.modelLevel : ''}</span>
                        </div>
                        <div className='testResults-row'>
                            <span>正确/总数：</span>
                            <span>{testResultsData?.rightAry?.length + '/' + testResultsData?.allNum}</span>
                        </div>
                        <div className='testResults-row'>
                            <span>所用时间<i>{'(分钟)'}</i>：</span>
                            <span>{usedTime ? usedTime : testResultsData.time ? testResultsData.time :'00:00'}</span>
                        </div>
                    </div>
                    <div className='testResults-col'>
                        <div className='testResults-row'>
                            <span>难度：</span>
                            <span>{testResultsData.hard ? hardView[testResultsData.hard] : ''}</span>
                        </div>
                        <div className='testResults-row'>
                            <span>正确率：</span>
                            <span>{Math.floor(testResultsData?.rightAry?.length / testResultsData?.allNum * 100) }%</span>
                        </div>
                    </div>
                </Space>
                <div className='testResults-bottom'>
                    <div className='tag right-tag'>
                        <div className='tag-label'>
                            <span className='tag-label-text'>正确：</span>
                            <span className='right-num'>{testResultsData?.rightAry?.length}个</span>
                        </div>
                        <Space size={[0, 8]} wrap>
                            {testResultsData?.rightAry?.map((item, index) => {
                                return <Tag key={index} color='green'>{item}</Tag>
                            })}
                        </Space>
                    </div>
                    <div className='tag wrong-tag'>
                        <div className='tag-label'>
                            <span className='tag-label-text'>错误：</span>
                            <span className='wrong-num'>{testResultsData?.wrongAry?.length}个</span>
                        </div>
                        <Space size={[0, 8]} wrap>
                            {
                                testResultsData?.wrongAry?.map((item, index) => {
                                    return <Tag color="red" key={index}>{item}</Tag>
                                    
                                })
                            }
                        </Space>
                    </div>
                    <div className='tag not-tag'>
                        <div className='tag-label'>
                            <span className='tag-label-text'>未测试：</span>
                            <span className='wrong-num'>{testResultsData?.notTextAry?.length}个</span>
                        </div>
                        <Space size={[0, 8]} wrap>
                            {
                                testResultsData?.notTextAry?.map((item, index) => {
                                    return <Tag key={index}>{item}</Tag>
                                    
                                })
                            }
                        </Space>
                    </div>
                </div>
            </TestResultsWrapper>
        </Modal>
    )
}


TestResults.propTypes = {
    isShowResults: PropTypes.bool.isRequired,
    testResultsData: PropTypes.object,
    closeResultsModal: PropTypes.func.isRequired,
    usedTime: PropTypes.string,
}
