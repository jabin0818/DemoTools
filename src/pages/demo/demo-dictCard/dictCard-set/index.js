import React, { useState, useRef } from 'react'

import { DictCardSetWrapper } from './style'

import { Modal, Form, Select, Radio, InputNumber, Space, Switch, Divider } from 'antd'

import useLocalPersistState from '@/hooks/useLocalPersistState'

export default function DictCardSet(props) {

    const [form] = Form.useForm();

    const { isShowSetModel, closeModal } = props

    const [formData, setFormData] = useLocalPersistState(
        { isShowPinyin: true, isRandom: true, tip: 1, difficulty: 1, sum: 100 },
        "dictCard_set"
    )

    const onChange = (checked) => {
        // console.log(`switch to ${checked}`);
    };

    const onCancel = async () => {
        try {
            const values = await form.validateFields();
            setFormData(values)
            closeModal(values)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    return (
        <Modal
            open={isShowSetModel}
            onCancel={() => onCancel()}
            centered={true}
            title={
                <div style={{ fontSize: '19px', textAlign: 'center' }}>
                    设置
                </div>
            }
            footer={null}>
            <DictCardSetWrapper>
                <Form form={form} initialValues={formData}>
                    <Form.Item label="显示拼音" name="isShowPinyin" valuePropName="checked" style={{ float: "left", marginRight: "40px" }}>
                        <Switch onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="是否随机" name="isRandom" valuePropName="checked">
                        <Switch defaultChecked onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="提示" name="tip">
                        <Radio.Group>
                            <Radio value={0}>不显示</Radio>
                            <Radio value={1}>显示五笔编码</Radio>
                            <Radio value={2}>显示拼音提示</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="难度" name="difficulty">
                        <Radio.Group>
                            <Radio value={0}>所有</Radio>
                            <Radio value={1}>常见</Radio>
                            <Radio value={2}>生僻</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="数量">
                        <Form.Item name="sum" noStyle rules={[{ required: true }]}>
                            <InputNumber min={50} max={200} step={50} onChange={onChange} />
                        </Form.Item>
                    </Form.Item>
                </Form>
            </DictCardSetWrapper>
        </Modal>
    )
}