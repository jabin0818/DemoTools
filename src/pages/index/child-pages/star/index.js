import React from 'react'

import { ToolListWrapper } from '../toolList/style'

import {
    LikeOutlined,
    StarOutlined
} from '@ant-design/icons'

export default function StarList() {
    return (
        <ToolListWrapper>
            <ul className='toolList starList'>
                <li className='toolItem'>
                    <div className='title'>地理测试器</div>
                    <div className='desc'>中国地图地理位置测试</div>
                    <div className='actions'>
                        <div className='actionItem like'>
                            <LikeOutlined className='icon' />
                        </div>
                        <div className='actionItem star'>
                            <StarOutlined className='icon' />
                        </div>
                    </div>
                </li>
                <li className='toolItem'>
                    <div className='title'>密码生成器</div>
                    <div className='desc'>为你生成最适合你的密码</div>
                    <div className='actions'>
                        <div className='actionItem like'>
                            <LikeOutlined className='icon' />
                        </div>
                        <div className='actionItem star'>
                            <StarOutlined className='icon' />
                        </div>
                    </div>
                </li>
                <li className='toolItem'>
                    <div className='title'>化学元素周期表</div>
                    <div className='desc'>元素周期表各特性</div>
                    <div className='actions'>
                        <div className='actionItem like'>
                            <LikeOutlined className='icon' />
                        </div>
                        <div className='actionItem star'>
                            <StarOutlined className='icon' />
                        </div>
                    </div>
                </li>
            </ul>
        </ToolListWrapper>
    )
}
