import React from 'react'

import { DemoPianoWrapper } from './style'

import Piano from './piano'
import SongView from './song-view'

export default function DemoPiano() {
    return (
        <DemoPianoWrapper>
            {/* <div className='pianoHeader-container'>
                <ul className='pianoHeader-list'>
                    <li className='pianoHeader-btn'>
                        <div className='btn'>设置</div>
                    </li>
                    <li className='pianoHeader-labelBox'>
                        <div className="label-box-label">模式</div>
                        <div classNmae="label-box-text"></div>
                    </li>
                    <li className='pianoHeader-labelBox'>
                        <div className="label-box-label">歌曲</div>
                        <div classNmae="label-box-text">请选择</div>
                    </li>
                </ul>
            </div> */}
            <SongView />
            <Piano />

        </DemoPianoWrapper>
    )
}
