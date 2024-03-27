import React, { useEffect } from 'react'

import { ModalDetailWrapper } from "./style"


import {
    FullscreenExitOutlined,
    SoundFilled
} from '@ant-design/icons'

export default function ModalDetail(props) {

    const { moreWordCard, wordDetail } = props

    function exitMoreWordCard(e) {
        moreWordCard(e)
    }

    function soundText(e) {
        let msg = new SpeechSynthesisUtterance(wordDetail?.text);
        speechSynthesis.speak(msg)
    }

    return (
        <ModalDetailWrapper>
            <div id="modal-container">
                <div className="modal-background">
                    <div className="modal">
                        <div className='card-external'>
                            <div className="exit-detail" onClick={(e) => exitMoreWordCard(e)}>
                                <FullscreenExitOutlined />
                            </div>
                        </div>
                        <div className="card-detail">
                            <div className="card-detail-header">
                                <div className='cd-header-left'>
                                    <span className='char-text'>{wordDetail?.text}</span>
                                    <div className='char-background'>
                                        <div className='dashed dashed-topLeft'></div>
                                        <div className='dashed dashed-topCenter'></div>
                                        <div className='dashed dashed-topRight'></div>
                                        <div className='dashed dashed-center'></div>
                                    </div>
                                </div>
                                <div className='cd-header-right'>
                                    <div className='pinyin-info'>
                                        <span className='pinyin-info-text'>{wordDetail?.pinyin}</span>
                                        <SoundFilled className='soundIcon' onClick={(e) => soundText(e)} />
                                        <div className="pinyin-background">
                                            <div className="line solidOne"></div>
                                            <div className="line solidTwo"></div>
                                            <div className="line solidThree"></div>
                                            <div className="line solidFour"></div>
                                        </div>
                                    </div>
                                    <div className='other-info'>
                                        <div className='line-list'>
                                            <div className='line-item'>
                                                <div className='line-label'>五笔编码</div>
                                                <div className='line-text'>{wordDetail?.code}</div>
                                            </div>
                                            <div className='line-item'>
                                                <div className='line-label'>笔画数</div>
                                                <div className='line-text'>{wordDetail?.strokes}</div>
                                            </div>
                                        </div>
                                        <div className='line-list'>
                                            <div className='line-item'>
                                                <div className='line-label'>繁体</div>
                                                <div className='line-text'>{wordDetail?.traditional}</div>
                                            </div>
                                            <div className='line-item'>
                                                <div className='line-label'>偏旁</div>
                                                <div className='line-text'>{wordDetail?.radicals}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-detail-footer'>
                                <div className='cd-footer-label'>释义:</div>
                                <div className='cd-footer-text'>{wordDetail?.explanation}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalDetailWrapper>
    )
}
