import React from 'react'

import { ToolListWrapper } from '../toolList/style'

import {
    LikeOutlined,
    StarOutlined
} from '@ant-design/icons'

export default function StudyList() {
    const toDemoChinaMap = () => {
        window.open('/demo/chainMap', '_blank');
    }

    const toDictCard = () => {
        // navigate(`/demo/chainMap`, { replace: false })
        // const w = window.open('about:blank')
        window.open('/demo/dictCard', '_blank');
    }


    return (
        <ToolListWrapper>
            <ul className='toolList'>
                <li className='toolItem' onClick={() => toDemoChinaMap()}>
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
                <li className='toolItem' onClick={() => toDictCard}>
                    <div className='title'>汉字字典</div>
                    <div className='desc'>一个实用的学习工具</div>
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
                    <div className='title'>番茄时钟</div>
                    <div className='desc'>开始专注学习时刻</div>
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
                <li className='toolItem'>
                    <div className='title'>在线前端编码器</div>
                    <div className='desc'>编辑、保存、分享你的页面演示</div>
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
                    <div className='title'>动植物科普</div>
                    <div className='desc'>用图片解析叙述知识</div>
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
                    <div className='title'>教学资源分享</div>
                    <div className='desc'>分享PPT、Word文本</div>
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
