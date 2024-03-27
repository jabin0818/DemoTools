import React from 'react'

import { ToolListWrapper } from '../toolList/style'

import {
    LikeOutlined,
    StarOutlined
} from '@ant-design/icons'

import { useNavigate } from "react-router-dom";

export default function Navi() {

    const toChinaMap = () => {
        window.open('/demo/chainMap', '_blank');
    }
    const toPiano = () => {
        window.open('/demo/piano', '_blank');
    }

    return (
        <ToolListWrapper>
            <ul className='toolList gameList'>
                <li className='toolItem' onClick={toChinaMap}>
                    <div className='title'>百度</div>
                    <div className='desc'>百度一下，你就知道</div>
                    <div className='actions'>
                        <div className='actionItem like'>
                            <LikeOutlined className='icon' />
                        </div>
                        <div className='actionItem star'>
                            <StarOutlined className='icon' />
                        </div>
                    </div>
                </li>
                <li className='toolItem' onClick={toPiano}>
                    <div className='title'>知乎</div>
                    <div className='desc'>有问题，就会有答案</div>
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
                    <div className='title'>微博</div>
                    <div className='desc'>随时随地，发现新鲜事！</div>
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
                    <div className='title'>Bilibili</div>
                    <div className='desc'>哔哩哔哩 (゜-゜)つロ 干杯~-bilibili</div>
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
