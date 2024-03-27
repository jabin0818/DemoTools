import React from 'react'

import { ToolListWrapper } from '../toolList/style'

import {
    LikeOutlined,
    StarOutlined
} from '@ant-design/icons'

import { useNavigate } from "react-router-dom";

export default function GameList() {

    const navigate = useNavigate();

    const toChinaMap = () => {
        // navigate(`/demo/chainMap`, { replace: false })
        // const w = window.open('about:blank')
        window.open('/demo/chainMap', '_blank');
    }
    const toPiano = () => {
        // navigate(`/demo/chainMap`, { replace: false })
        // const w = window.open('about:blank')
        window.open('/demo/piano', '_blank');
    }

    return (
        <ToolListWrapper>
            <ul className='toolList gameList'>
                <li className='toolItem' onClick={toChinaMap}>
                    <div className='title'>猜地图</div>
                    <div className='desc'>一个猜我国各地方的小游戏</div>
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
                    <div className='title'>弹钢琴</div>
                    <div className='desc'>一个弹钢琴小游戏</div>
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
                    <div className='title'>井字棋</div>
                    <div className='desc'>一个井字棋小游戏</div>
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
                    <div className='title'>五子棋</div>
                    <div className='desc'>一个五子棋小游戏</div>
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
                    <div className='title'>走迷宫</div>
                    <div className='desc'>找出迷宫的最短路径</div>
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
                    <div className='title'>猜性别</div>
                    <div className='desc'>根据姓名猜出性别</div>
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
                    <div className='title'>夺旗游戏</div>
                    <div className='desc'>和AI进行夺旗比赛</div>
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
                    <div className='title'>三人象棋</div>
                    <div className='desc'>创新三人象棋游戏</div>
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
                    <div className='title'>猜歌曲</div>
                    <div className='desc'>根据前奏猜出歌曲名</div>
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
