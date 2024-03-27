import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { activateAccount } from '@/service/login'
import { Alert, Spin, message } from 'antd';
import { ActivationWrapper } from './style'
export default function Activation() {

    const [seaech, setSeach] = useSearchParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [messageText, setMessageText] = useState("激活中...")
    const [description, setDescription] = useState("请确保输入的用户邮箱账号和本人一致")
    useEffect(() => {
        let timer = null;
        const axiosData = async () => {
            const confirmCode = seaech.get("confirmCode")
            if (confirmCode) {
                let result = await activateAccount(confirmCode)
                console.log(result)
                if (result.code === 200) {
                    message.success(result.msg)
                    setLoading(false)
                    setMessageText(result.msg)
                    let countdown = 5
                    timer = setInterval(() => {
                        if (countdown > 0) {
                            countdown--
                            setDescription(countdown + "秒后返回首页")
                        } else {
                            clearInterval(timer)
                            navigate(`/index/tool`, { replace: true })
                        }
                    }, 1000);

                } else {
                    message.error(result.msg)
                    setLoading(false)
                    setMessageText(result.msg)
                    navigate(`/index/tool`, { replace: true })
                }
            } else {
                navigate(`/index/tool`, { replace: true })
            }
        }
        axiosData()
        return () => {
            clearInterval(timer)
        }
    }, []);
    return (
        <ActivationWrapper>
            <Spin spinning={loading} tip="Loading...">
                <Alert
                    message={messageText}
                    description={description}
                    type="info"
                />
            </Spin>
        </ActivationWrapper>
    )
}
