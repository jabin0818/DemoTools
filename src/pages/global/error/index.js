import React, { memo } from 'react'
import { Result, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { ErrorPageWrapper } from './style'

export default memo(function ErrorPage(props) {
    // props/state
    const { history } = props
    const navigate = useNavigate()
    // other function
    const handleGoHomeBack = () => {
        // history.push('/')
        navigate('/')
    }

    return (
        // <Result
        //     status="404"
        //     title="404"
        //     subTitle="对不起，您访问的页面不存在。"
        //     extra={<Button type="primary" icon={<RollbackOutlined />} onClick={handleGoHomeBack}>返回首页</Button>}
        // />
        <ErrorPageWrapper>
            <div className='fof'>
                <h1 data-title='404'>404</h1>
            </div>
            <p className='tip'>对不起，您访问的页面不存在。</p>
            <Button type="primary" icon={<RollbackOutlined />} onClick={handleGoHomeBack}>返回首页</Button>
        </ErrorPageWrapper>
    )
})
