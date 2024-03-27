import React, { useState, useEffect, useRef } from 'react'

import PropTypes from 'prop-types'

import { SetFormWrapper } from './style'

import { Modal, Form, Select, Radio, InputNumber, Space } from 'antd'

import { ClockCircleOutlined } from '@ant-design/icons'

import { cityOfChinaOptions } from '@/config/map-data.js'

export default function SetForm(props) {

    const formRef = useRef();

    const [form] = Form.useForm();

    const { isShowModel, closeModal, handleOk, resetData } = props

    const modelOptions = [
        {
            value: 0,
            label: '中国省份',
        },
        {
            value: 1,
            label: '中国地级市',
        },
        {
            value: 2,
            label: '中国地区练习',
        },
        {
            value: 3,
            label: '世界国家',
            disabled: true,
        },
        {
            value: 4,
            label: '七大洲四大洋',
            disabled: true,
        },
    ]

    const cityOptions = cityOfChinaOptions
    //是否是地级市模式
    const [isShowLevelSelect, setIsShowLevelSelect] = useState(false)

    //是否是练习模式
    const [isPracticeMode, setIsPracticeMode] = useState(false)

    const modelChange = (value) => {
        if (value === 1) {
            setIsShowLevelSelect(true)
            setIsPracticeMode(false)
        } else if (value === 2) {
            setIsPracticeMode(true)
            setIsShowLevelSelect(false)
        } else {
            setIsPracticeMode(false)
            setIsShowLevelSelect(false)
        }
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const submitSetOption = (e) => {
        const { model, levelModel, hard, time } = form.getFieldsValue(true)
        handleOk(model, levelModel, hard, time)
    }

    const cancelSubmit = () => {
        form.setFieldsValue(resetData)
        closeModal()
    }

    return (
        <SetFormWrapper>
            <Modal
                title="设置"
                open={isShowModel}
                onOk={(e) => submitSetOption(e)}
                onCancel={() => cancelSubmit()}
                centered={true}
                wrapClassName="ChinaSetFormModal"
            // getContainer={false}
            >
                <Form form={form} ref={formRef} style={{ paddingTop: '2rem' }} initialValues={{ model: 0, levelModel: 110000, hard: 1, time: 6 }}>
                    <Form.Item label="模式" name="model" style={{ float: 'left', marginRight: '2.4rem' }}>
                        <Select
                            style={{
                                width: 140,
                            }}
                            options={modelOptions}
                            onChange={modelChange}
                        />
                    </Form.Item>
                    <Form.Item label="省份" name="levelModel" style={{ display: isShowLevelSelect ? 'block' : 'none' }}>
                        <Select
                            style={{
                                width: 150,
                            }}
                            showSearch
                            placeholder="请输入省份"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={cityOptions}
                            disabled={(!isShowLevelSelect) || isPracticeMode}
                        />
                    </Form.Item>
                    <Form.Item label="难度" name="hard" style={{ clear: 'both' }}>
                        <Radio.Group disabled={isPracticeMode}>
                            <Radio value={1}>简单</Radio>
                            <Radio value={2}>普通</Radio>
                            <Radio value={3}>困难</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="时间" name="time">
                        <InputNumber disabled={isPracticeMode} style={{ width: '6.6rem' }} min={1} max={10} addonAfter="分钟" />
                    </Form.Item>
                </Form>
            </Modal>
        </SetFormWrapper>
    )
}

SetForm.propTypes = {
    isShowModel: PropTypes.bool.isRequired,
    closeModal: PropTypes.func,
    handleOk: PropTypes.func.isRequired,
    resetData: PropTypes.object,
}
