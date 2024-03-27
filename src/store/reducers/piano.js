import { Map } from 'immutable'
import { MODE, TONE, scoremidi } from '@/utils/piano/constant';
import * as actionTypes from '../constant'
import SmapleLibrary from '@/lib/Tonejs-Instruments'
const defaultState = Map({
    currentIndex: 0,
    songIndex: parseInt(localStorage.getItem('piano_song_index') || 0),//当前选择的歌曲索引(打字模式)
    scoreId: parseInt(localStorage.getItem('piano_score_id') || 0),//当前选择的乐谱id(简谱模式)
    songData: scoremidi,
    get songName() {
        if (this.songIndex !== -1) {
            return this.songData[this.songIndex].name;
        } else {
            return '';
        }
    },
    thisLineFirstIndex: 0,
    mode: parseInt(localStorage.getItem('piano_mode') || MODE.TYPING),
    modes: [
        {
            choosed: false,
            mode: MODE.TYPING,
            name: '打字模式',
            desc: '根据打字速度的快慢调整音乐节奏'
        },
        {
            choosed: false,
            mode: MODE.PAINO,
            name: '乐谱模式',
            desc: '必须按对对应的按键才可弹奏曲子'
        },
        {
            choosed: false,
            mode: MODE.FREE,
            name: '自由模式',
            desc: '每个按键对应固定的声音，自由演奏'
        },
    ],
    // polySynt: SmapleLibrary.load({
    //     instruments: TONE[this.setData.tone].value
    // }).toDestination(),//播放器实例
    get polySynt() {
        if (this.setData.tone) {
            return SmapleLibrary.load({
                instruments: TONE[this.setData.tone].value,
                minify: true
            }).toDestination()//播放器实例
        } else {
            return SmapleLibrary.load({
                instruments: "piano",
                minify: true
            }).toDestination()//播放器实例
        }
    },
    typeInputData: {},//打字模式演奏完后的数据
    setData: JSON.parse(localStorage.getItem('piano_set')) || {}, //设置数据

})

function changeMode() {
    defaultState.modes.forEach(item => {
        if (item.mode === state.mode) {
            item.choosed = true;
        } else {
            item.choosed = false;
        }
    });
}

// 触发单个音符播放
const playNote = (notename = 'C4', duration = '1n') => {
    if (!defaultState.get('polySynt')) return
    let newState = defaultState.get('polySynt')
    try {
        // defaultState.get('polySynt').triggerAttack(notename);
        // console.log('不是新的吗？', newState)
        newState.triggerAttackRelease(notename, duration);
    } catch (e) {
        console.log(e)
    }
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_PIANO_THISLINEFIRSTINDEX:
            return state.set('thisLineFirstIndex', action.index)
        case actionTypes.CHANGE_PIANO_SONG:
            if (state.get("songIndex") !== action.songIndex) {
                // if (action.songIndex !== -1) {
                // state.songData[action.songIndex].choosed = false;
                // }
                localStorage.setItem('piano_song_index', action.songIndex);
                return state.merge({
                    songIndex: action.songIndex,
                    songName: action.songName,
                });
            } else {
                return state
            }
        case actionTypes.CHANGE_PIANO_SCORE:
            localStorage.setItem('piano_score_id', action.scoreId);
            return state.set('scoreId', action.scoreId)
        case actionTypes.CHANGE_PIANO_MODE:
            localStorage.setItem('piano_mode', action.mode);
            return state.set('mode', action.mode)
        case actionTypes.CHANGE_PIANO_TYPEINPUTDATA:
            return state.set('typeInputData', action.data)
        case actionTypes.CHANGE_PIANO_SETTING:
            localStorage.setItem('piano_set', JSON.stringify(action.data));
            if (action.data.tone !== state.get('setData').tone) {
                // console.log("音色不一样，要重新设置！")
                // console.log(TONE[action.data.tone].value)
                // return state.set('setData', action.data).set('polySynt', SmapleLibrary.load({
                //     instruments: TONE[action.data.tone].value
                // }).toDestination())
                return state.merge({
                    setData: action.data,
                    polySynt: SmapleLibrary.load({
                        instruments: TONE[action.data.tone].value,
                        minify: true
                    }).toDestination()
                });
            }
            return state.set('setData', action.data)
        case actionTypes.CALL_TRIGGERATTACK_FUNCTION:
            playNote(action.notename, action.duration)
            return state
        default:
            return state
    }
}

export default reducer
