import React, { useState, useRef, useEffect } from 'react'

import { UploadModalWrapper } from './style'

import { Modal, Form, message, Radio, InputNumber, Space, Switch, Divider, Input, Button } from 'antd'

import { changePianoSetting } from '@/store/actions/piano'

import useLocalPersistState from '@/hooks/useLocalPersistState'

import { addMusicScore } from "@/service/musicscore"

const { TextArea } = Input;

export default function PianoSet(props) {

    const [form] = Form.useForm();

    const { isShowUploadModel, closeModal, scoresContent } = props

    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        if (isShowUploadModel) {
            //显示Modal弹窗时，对form进行赋值
            form.setFieldValue('content', scoresContent)
        }
    }, [isShowUploadModel])

    const uploadScores = async () => {
        try {
            setLoginLoading(true)
            const values = await form.validateFields();
            const res = await addMusicScore(values.name, values.content, values.lyric, values.author)
            console.log("添加乐谱的接口：", res)
            if (res.code === 201) {
                message.success("上传成功！")
                setLoginLoading(false)
                closeModal()
            }

        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    return (
        <Modal
            open={isShowUploadModel}
            onCancel={() => closeModal()}
            onOk={() => uploadScores()}
            centered={true}
            title={
                <div style={{ fontSize: '19px', textAlign: 'center' }}>
                    上传曲谱
                </div>
            }
            okText={"上传"}
            className="pianoSetModal"
            confirmLoading={loginLoading}>
            <UploadModalWrapper>
                <Form form={form}>
                    <Form.Item
                        label="曲名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入曲名!',
                            },
                            {
                                min: 0,
                                max: 60,
                                message: "曲名长度在0~60之内!"
                            }
                        ]}>
                        <Input placeholder="曲名" />
                    </Form.Item>
                    <Form.Item label="内容" name="content" rules={[
                        {
                            required: true,
                            message: '请输入内容!',
                        },
                        {
                            min: 20,
                            max: 6000,
                            message: "内容长度在20~6000之内!"
                        }
                    ]}>
                        <TextArea autoSize={{ minRows: 6, maxRows: 8 }} showCount placeholder="内容" minLength={20} maxLength={6000} style={{ resize: "none" }} />
                    </Form.Item>
                    <Form.Item label="歌词" name="lyric" rules={[
                        {
                            required: true,
                            message: '请输入歌词!',
                        },
                        {
                            min: 20,
                            max: 6000,
                            message: "歌词长度在20~6000之内!"
                        }
                    ]}>
                        <TextArea autoSize={{ minRows: 6, maxRows: 8 }} showCount placeholder="歌词需要与乐谱内容一一对应" minLength={20} maxLength={6000} style={{ resize: "none" }} />
                    </Form.Item>
                    <Form.Item label="曲作者" name="author" rules={[
                        {
                            min: 0,
                            max: 50,
                            message: "曲作者字符长度在0~50之内!"
                        }
                    ]}>
                        <Input placeholder="曲作者" />
                    </Form.Item>
                </Form>
            </UploadModalWrapper>
        </Modal>
    )
}
