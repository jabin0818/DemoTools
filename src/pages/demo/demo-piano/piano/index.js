import React, { useState, useEffect, useRef, useCallback } from 'react'

import { PianoWrapper } from './style'

import { OBEvent } from "@/config";

import { Notes, MODE } from '@/utils/piano/constant';

import event from '@/utils/event';

import usePlayMixin from '@/hooks/piano/pianoPlayMixin'

import useMidiPlayMixin from '@/hooks/piano/midiPlayMixin'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { playNoteByNotename, changeInputData } from '@/store/actions/piano';

import {
    ReloadOutlined,
    RollbackOutlined,
} from '@ant-design/icons'

function Piano(props) {

    const dispatch = useDispatch()
    const { mode, typeInputData, setData } = useSelector(
        (state) => ({
            mode: state.pianoState.get('mode'),
            typeInputData: state.pianoState.get('typeInputData'),
            setData: state.pianoState.get('setData'),
        }),
        shallowEqual
    )

    const autoPlayMixin = usePlayMixin() // 自定义简谱的mixin

    const midiPlayMixin = useMidiPlayMixin() // midi的mixin

    const [NotesList, setNotes] = useState(Notes)

    const [enableBlackKey, setEnableBlackKey] = useState(false);// 启用黑色按键

    const enableBlackKeyRef = useRef(enableBlackKey);

    const lastKeyCodeRef = useRef(null);// 上一个键，用于节流and延音

    const keyLockRef = useRef(false);// 节流用
    const keydowTimerRef = useRef(null);

    const synthRef = useRef(null);

    useEffect(() => {
        initPiano()
    }, [mode])

    const initPiano = () => {
        // 钢琴初始化
        if (mode === 0) {
            removeKeyBoradEvent()
            setListener()
        } else if (mode === 1 || mode === 2) {
            bindKeyBoradEvent()
        }
    }


    // 触发单个音符播放
    const playNote = (notename, duration) => {
        dispatch(playNoteByNotename(notename, duration))
    }

    const setListener = () => {
        // XML乐谱自动播放
        event.regist(OBEvent.AUTO_PLAY_NUM_SCORE, (scorename) => {
            autoPlayMixin.playScoreByName(scorename)
        });
        // MIDI 自动播放
        event.regist(OBEvent.AUTO_PLAY_MIDI, (midiUrl) => {
            midiPlayMixin.loadMidiAndPlay(midiUrl)
        })
        // 暂停自动播放
        event.regist(OBEvent.STOP_AUTO_PLAY, () => {
            autoPlayMixin.pauseAutoPlay()
            midiPlayMixin.stopMidiPlay()
        })
    }

    const getNoteByKeyCode = (keyCode) => {
        // 改为更高性能的写法
        let target
        let len = NotesList.length || 0
        for (let i = 0; i < len; i++) {
            let note = Notes[i]
            if (note.keyCode == keyCode) {
                target = note
                break
            }
        }
        return target
    }

    // 根据键值播放音符
    const playNoteByKeyCode = (keyCode) => {
        let pressedNote = getNoteByKeyCode(keyCode)
        if (pressedNote) {
            playNote(pressedNote.name)
            let keyType = pressedNote.type;
            if (keyType == 'white') {
                document.querySelector(`div[data-keycode='${pressedNote.keyCode}']`).classList.add('wkey-active');

            } else if (keyType == 'black') {
                document.querySelector(`div[data-keycode='${pressedNote.keyCode}']`).classList.add('bkey-active')
            }
        }
    }

    const ShiftKeyCode = 16;

    const keydownCallback = useCallback((e) => {
        let keyCode = e.keyCode;
        // 按住Shift键，则启用黑色按键
        if (keyCode == ShiftKeyCode) {
            setEnableBlackKey(true);
            enableBlackKeyRef.current = true
        }
        if (enableBlackKeyRef.current) {
            keyCode = 'b' + keyCode
        }

        if (keyCode == lastKeyCodeRef.current) {
            // 连续触发同一个键时，应节流 + 延音
            if (!keyLockRef.current) {
                // 这里应该延音
                lastKeyCodeRef.current = keyCode
                keyLockRef.current = true
            }
            if (keydowTimerRef.current) {
                clearTimeout(keydowTimerRef.current)
                keydowTimerRef.current = null
            }
            keydowTimerRef.current = setTimeout(() => {
                keyLockRef.current = false
            }, 120)
        } else {
            playNoteByKeyCode(keyCode)
            lastKeyCodeRef.current = keyCode
        }
    }, []);

    const keyupCallback = useCallback((e) => {
        lastKeyCodeRef.current = null
        let keyCode = e.keyCode;
        // 松开Shfit键，则禁用黑色按键
        if (keyCode == ShiftKeyCode) {
            setEnableBlackKey(false);
            enableBlackKeyRef.current = false
        }
        if (enableBlackKeyRef.current) {
            document.querySelector(`div[data-keycode='b${keyCode}']`)?.classList.remove('bkey-active');
        } else {
            document.querySelector(`div[data-keycode='${keyCode}']`)?.classList.remove('wkey-active');
        }
    }, []);

    // 键盘操作
    const bindKeyBoradEvent = () => {
        //简谱模式和自由模式
        document.addEventListener('keydown', keydownCallback, false)
        document.addEventListener('keyup', keyupCallback, false)
    }

    //销毁keydown 和 keyup 事件
    const removeKeyBoradEvent = () => {
        document.removeEventListener('keydown', keydownCallback, false);
        document.removeEventListener('keyup', keyupCallback, false);
    }

    // 鼠标操作，点击按键播放
    const clickPianoKey = (e, keyCode) => {
        let pressedNote = getNoteByKeyCode(keyCode)
        if (pressedNote) {
            playNote(pressedNote.name)
        }
    }

    const refresh = (e) => {
        let dom = e.currentTarget
        dom.classList.add("active")
        event.emit(OBEvent.MUSIC_REFRESH, { isReStar: false, modeIndex: mode })
        setTimeout(() => {
            dom.classList.remove("active")
        }, 500)
    }

    const reStar = () => {
        event.emit(OBEvent.MUSIC_REFRESH, { isReStar: true, modeIndex: mode })
    }

    const showSingNotation = (index) => {
        let num = index % 7;
        if (setData.showRollcall) {
            if (num === 0) {
                return 'do'
            } else if (num === 1) {
                return 're'
            } else if (num === 2) {
                return 'mi'
            } else if (num === 3) {
                return 'fa'
            } else if (num === 4) {
                return 'sa'
            } else if (num === 5) {
                return 'la'
            } else if (num === 6) {
                return 'si'
            }
            return ''
        } else if (setData.showNotation) {
            if (index < 7) {
                return `<div style="line-height: 10px;font-size: 12px;font-weight: 700;">${num + 1}</div>
                        <div style="height: 1px;line-height: 2px;">·</div>
                        <div style="position: relative;bottom: -2px;height: 1px;line-height: 2px;">·</div>`
            } else if (index >= 7 && index < 14) {
                return `<div style="line-height: 10px;font-size: 12px;font-weight: 700;">${num + 1}</div>
                        <div style="height: 5px;line-height: 2px;">·</div>`
            } else if (index >= 14 && index < 21) {
                return `<div style="line-height: 10px;font-size: 12px;font-weight: 700;">${num + 1}</div>`
            } else if (index >= 21 && index < 28) {
                return `<div style="height: 5px;line-height: 2px;">·</div>
                        <div style="line-height: 10px;font-size: 12px;font-weight: 700;">${num + 1}</div>`
            } else if (index >= 28 && index < 35) {
                return `<div style="height: 5px;line-height: 2px;">·</div><div style="height: 5px;line-height: 2px;">·</div>
                        <div style="line-height: 10px;font-size: 12px;font-weight: 700;">${num + 1}</div>`
            } else if (index === 35) {
                return `<div style="position: relative;top: -2px;line-height: 2px;">·</div>
                        <div style="height: 5px;line-height: 2px;">·</div>
                        <div style="height: 3px;line-height: 2px;">·</div>
                        <div style="line-height: 10px;font-size: 12px;font-weight: 700;">${num + 1}</div>`
            }
            return ''
        }
    }
    return (
        <PianoWrapper>
            <div className='component-autopiano'>
                <div className="piano-options responsive-section-a">
                    <div className="option-item-wrap">
                        <div className="option-item">
                            <div className="label">重来</div>
                            <div className='text'>
                                <RollbackOutlined onClick={(e) => reStar(e)} />
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="label">刷新</div>
                            <div className='text'>
                                <ReloadOutlined onClick={(e) => refresh(e)} />
                            </div>
                        </div>
                        <div className="option-item">
                            <div className="label">速度：</div>
                            <div className='text'>{typeInputData?.speed ? typeInputData.speed : '0'} WPM</div>
                        </div>
                        <div className="option-item">
                            <div className="label">正确率：</div>
                            <div className='text'>{typeInputData?.correct ? typeInputData.correct : '0'}%</div>
                        </div>
                        <div className="option-item">
                            <div className="label">用时：</div>
                            <div className='text'>{typeInputData?.time ? typeInputData.time : '00:00'}</div>
                        </div>

                    </div>
                </div>

                <div className='piano-scroll-wrap'>
                    <div className='piano-wrap responsive-section-a' style={{ opacity: '1' }}>
                        <div className='piano-band'>
                            {/* <img className="piano-band-img" :src="bandImg" alt="" /> */}
                            {/* <div className="piano-tip"></div> */}
                        </div>
                        <div className='piano-key-wrap'>
                            {NotesList.map((item, index) => {
                                return item.type == 'white' ? <div className="piano-key wkey" key={item.keyCode} data-keycode={item.keyCode} data-name={item.name} onClick={(e) => clickPianoKey(e, item.keyCode)}>
                                    <div className="keytip">
                                        <div className="keyname" style={{ display: setData.keyTip ? 'block' : 'none' }}>{item.key}</div>
                                        <div className="notename" style={{ display: setData.showPitch ? 'block' : 'none' }}>{item.name}</div>
                                        <div className="singname" style={{ display: (setData.showRollcall || setData.showNotation) ? 'inline-block' : 'none' }}>
                                            <span dangerouslySetInnerHTML={{ __html: showSingNotation(index) }}></span>
                                        </div>
                                    </div>
                                </div> : null
                            })}
                            <div className="bkey-wrap bkey-wrap1">
                                {NotesList.map((item, index) => {
                                    return item.type == "black" && item.id >= 36 && item.id <= 40 ? <div className="piano-key bkey" key={item.keyCode} data-keycode={item.keyCode} data-name={item.name} onClick={(e) => clickPianoKey(e, item.keyCode)}>
                                        <div className="keytip">
                                            <div
                                                className="keyname"
                                                style={{ display: setData.keyTip ? 'block' : 'none' }}
                                                dangerouslySetInnerHTML={{ __html: item.key }}></div>
                                        </div>
                                    </div> : null
                                })}
                            </div>
                            <div className="bkey-wrap bkey-wrap2">
                                {NotesList.map((item, index) => {
                                    return item.type == "black" && item.id >= 41 && item.id <= 45 ? <div className="piano-key bkey" key={item.keyCode} data-keycode={item.keyCode} data-name={item.name} onClick={(e) => clickPianoKey(e, item.keyCode)}>
                                        <div className="keytip">
                                            <div
                                                className="keyname"
                                                style={{ display: setData.keyTip ? 'block' : 'none' }}
                                                dangerouslySetInnerHTML={{ __html: item.key }}></div>
                                        </div>
                                    </div> : null
                                })}
                            </div>
                            <div className="bkey-wrap bkey-wrap3">
                                {NotesList.map((item, index) => {
                                    return item.type == "black" && item.id >= 46 && item.id <= 50 ? <div className="piano-key bkey" key={item.keyCode} data-keycode={item.keyCode} data-name={item.name} onClick={(e) => clickPianoKey(e, item.keyCode)}>
                                        <div className="keytip">
                                            <div
                                                className="keyname"
                                                style={{ display: setData.keyTip ? 'block' : 'none' }}
                                                dangerouslySetInnerHTML={{ __html: item.key }}></div>
                                        </div>
                                    </div> : null
                                })}
                            </div>
                            <div className="bkey-wrap bkey-wrap4">
                                {NotesList.map((item, index) => {
                                    return item.type == "black" && item.id >= 51 && item.id <= 55 ? <div className="piano-key bkey" key={item.keyCode} data-keycode={item.keyCode} data-name={item.name} onClick={(e) => clickPianoKey(e, item.keyCode)}>
                                        <div className="keytip">
                                            <div
                                                className="keyname"
                                                style={{ display: setData.keyTip ? 'block' : 'none' }}
                                                dangerouslySetInnerHTML={{ __html: item.key }}></div>
                                        </div>
                                    </div> : null
                                })}
                            </div>
                            <div className="bkey-wrap bkey-wrap5">
                                {NotesList.map((item, index) => {
                                    return item.type == "black" && item.id >= 56 && item.id <= 60 ? <div className="piano-key bkey" key={item.keyCode} data-keycode={item.keyCode} data-name={item.name} onClick={(e) => clickPianoKey(e, item.keyCode)}>
                                        <div className="keytip">
                                            <div
                                                className="keyname"
                                                style={{ display: setData.keyTip ? 'block' : 'none' }}
                                                dangerouslySetInnerHTML={{ __html: item.key }}></div>
                                        </div>
                                    </div> : null
                                })}
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </PianoWrapper>
    )
}

export default Piano
