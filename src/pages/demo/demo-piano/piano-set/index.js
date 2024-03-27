import React, { useState, useRef } from 'react'

import { PianoSetWrapper } from './style'

import { Modal, Form, Select, Radio, InputNumber, Space, Switch, Divider } from 'antd'

import { changePianoSetting } from '@/store/actions/piano'

import useLocalPersistState from '@/hooks/useLocalPersistState'

export default function PianoSet(props) {

    const [form] = Form.useForm();

    const { isShowSetModel, closeModal } = props

    const onChange = (checked) => {
        // console.log(`switch to ${checked}`);
    };

    const showNotationOnChange = (checked) => {
        console.log(`showNotationOnChange to ${checked}`);
        if (checked) {
            form.setFieldValue('showRollcall', false)
        } else {
            form.setFieldValue('showRollcall', true)
        }
    };

    const showRollcallOnChange = (checked) => {
        console.log(`showRollcallOnChange ${checked}`);
        if (checked) {
            form.setFieldValue('showNotation', false)
        } else {
            form.setFieldValue('showNotation', true)
        }
    };


    const [formData, setFormData] = useLocalPersistState(
        { keyTip: true, showPitch: true, showNotation: true, showRollcall: false, typeDifficulty: 1, wordDifficulty: 1, pluck: 1, tone: 0, scroesDifficulty: 0 },
        "piano_set"
    )

    return (
        <Modal
            open={isShowSetModel}
            onCancel={() => closeModal(form.getFieldsValue(true))}
            centered={true}
            title={
                <div style={{ fontSize: '19px', textAlign: 'center' }}>
                    设置
                </div>
            }
            footer={null}
            className="pianoSetModal">
            <PianoSetWrapper>
                <Form form={form} initialValues={formData}>
                    <Form.Item label="按键提示" name="keyTip" valuePropName="checked" style={{ float: "left", marginRight: "40px" }}>
                        <Switch defaultChecked onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="显示音名" name="showPitch" valuePropName="checked">
                        <Switch onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="显示简谱名" name="showNotation" valuePropName="checked" style={{ float: "left", marginRight: "40px" }}>
                        <Switch onChange={showNotationOnChange} />
                    </Form.Item>
                    <Form.Item label="显示唱名" name="showRollcall" valuePropName="checked">
                        <Switch onChange={showRollcallOnChange} />
                    </Form.Item>
                    <Form.Item label="音色设置" name="tone">
                        <Radio.Group>
                            <Radio value={0}>钢琴</Radio>
                            <Radio value={1}>吉他原声</Radio>
                            <Radio value={2}>大提琴</Radio>
                            <Radio value={3}>风琴</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Divider orientation="left" plain style={{ fontWeight: "600" }}>
                        打字模式设置
                    </Divider>
                    <Form.Item label="打字难度" name="typeDifficulty">
                        <Radio.Group>
                            <Radio value={1}>简易</Radio>
                            <Radio value={2}>严格</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="单词难度" name="wordDifficulty">
                        <Radio.Group>
                            <Radio value={1}>一般</Radio>
                            <Radio value={2}>困难</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="弹奏设置" name="pluck">
                        <Radio.Group>
                            <Radio value={1}>当按下一个字母时</Radio>
                            <Radio value={2}>当打完一个单词时</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Divider orientation="left" plain style={{ fontWeight: "600" }}>
                        简谱模式设置
                    </Divider>
                    <Form.Item label="难度" name="scroesDifficulty">
                        <Radio.Group>
                            <Radio value={1}>简易</Radio>
                            <Radio value={2}>严格</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </PianoSetWrapper>
        </Modal>
    )
}
