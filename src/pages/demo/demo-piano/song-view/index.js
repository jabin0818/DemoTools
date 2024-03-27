import React, { useEffect, useState, useMemo, useRef } from 'react'

import { SongViewWrapper } from './style'

import {
    wordsGenerator,
} from "@/utils/piano/wordsGenerator";

import {
    CloseCircleOutlined,
    SettingOutlined
} from '@ant-design/icons'

import { DEFAULT_WORDS_COUNT } from '@/utils/piano/constant'

import SongSelect from '../song-select'

import PianoSet from '../piano-set'

import UploadModal from '../upload-modal'

import { changePianoMode, changeInputData, changePianoSetting } from '@/store/actions/piano';

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import event from '@/utils/event';

import { OBEvent } from "@/config";

import usePlayMixin from '@/hooks/piano/pianoPlayMixin';

import useMidiPlayMixin from '@/hooks/piano/midiPlayMixin';

import useLocalPersistState from '@/hooks/useLocalPersistState'

import { message } from 'antd'

import { getMusicScoreById } from '@/service/musicscore'


export default function SongView() {

    const manualPlayMixin = usePlayMixin()//mixin

    const midiPlayMixin = useMidiPlayMixin()//midi mixin

    const [formData, setFormData] = useLocalPersistState(
        { keyTip: true, showPitch: true, showNotation: true, showRollcall: false, typeDifficulty: 1, wordDifficulty: 1, pluck: 1, tone: 0, scroesDifficulty: 0 },
        "piano_set"
    )

    const [capsLocked, setCapsLocked] = useState(false);

    /**
     * 打字模式的数据
     */
    const [wordsDict, setWordsDict] = useState(() => {
        let wordDif = 'normal';
        if (formData?.wordDifficulty && formData.wordDifficulty === 2) {
            wordDif = 'hard'
        }
        return wordsGenerator(DEFAULT_WORDS_COUNT, wordDif, 'ENGLISH_MODE');
    }); // 单词列表
    const words = useMemo(() => {
        return wordsDict.map((e) => e.val);
    }, [wordsDict]);
    const wordSpanRefs = useMemo(
        () =>
            Array(words.length)
                .fill(0)
                .map((i) => React.createRef()),
        [words]
    );
    const [starTimeStamp, setStarTimeStamp] = useState(null)//开始的时间戳
    const [status, setStatus] = useState("waiting");
    const [currInput, setCurrInput] = useState("");//当前单词
    const [currWordIndex, setCurrWordIndex] = useState(0);//第几个单词
    const [currCharIndex, setCurrCharIndex] = useState(-1);//单词中字母的索引
    const [prevInput, setPrevInput] = useState("");//前面输入错误的单词

    const [wordsCorrect, setWordsCorrect] = useState(new Set());//打对的单词或字母
    const [wordsInCorrect, setWordsInCorrect] = useState(new Set());//打错的单词或字母
    // 设置字符检查hisotry
    const [inputWordsHistory, setInputWordsHistory] = useState({});
    const [history, setHistory] = useState({});
    const [currChar, setCurrChar] = useState("");
    const keyString = currWordIndex + "." + currCharIndex;

    const textInputRef = useRef(null);


    /**
     * 简谱模式的数据
     */
    const [scoresName, setScoresName] = useState("");
    const [scoresKey, setScoreKey] = useState(null);
    const [scoresValue, setScoresValue] = useState(null);
    const [scoresStatus, setScoresStatus] = useState("waiting");
    const [scoresCurrIndex, setScoresCurrIndex] = useState(0);//当前index
    const [scoresHistory, setScoresHistory] = useState({});
    const [scoresCurrChar, setScoresCurrChar] = useState("");// 当前输入的一个key
    const [scoresCurrInput, setScoresCurrInput] = useState("");//input输入框输入的内容

    const scoresInputRef = useRef(null);

    const wordDivRefs = useMemo(() =>
        Array(scoresValue?.length)
            .fill(0)
            .map((i) => React.createRef()), [scoresValue]);


    const [freeContent, setFreeContent] = useState("")
    const freeInputRef = useRef(null);

    // 是否显示选择简谱模态框
    const [isShowSongSelect, setIsShowSongSelect] = useState(false);

    // 是否显示设置框
    const [isShowSetModal, setIsShowSetModal] = useState(false);

    // 是否显示上传曲谱框
    const [isShowUploadModal, setIsShowUploadModal] = useState(false);

    const focusTextInput = () => {
        if (mode === 0) {
            !isShowSongSelect && textInputRef.current && textInputRef.current.focus();
        } else if (mode === 1) {
            !isShowSongSelect && scoresInputRef.current && scoresInputRef.current.focus();
        }
    };

    // // 输入时的时间
    // const [startTime, setStartTime] = useState(null)
    // // 用于判断输入停止的定时器
    // const stopTimer = useRef(null)
    // //上一个键的速度
    // const [lastSpeed, setLastSpeed] = useState(null)

    const dispatch = useDispatch()
    const { mode, songName, songIndex, scoreId, songData, setData } = useSelector(
        (state) => ({
            mode: state.pianoState.get('mode'),
            songName: state.pianoState.get('songName'),
            songIndex: state.pianoState.get('songIndex'),
            scoreId: state.pianoState.get('scoreId'),
            songData: state.pianoState.get('songData'),
            setData: state.pianoState.get('setData'),
        }),
        shallowEqual
    )
    useEffect(() => {
        if (mode === 0) {
            focusTextInput()
            let url = songData[songIndex].url
            if (!url) return;
            midiPlayMixin.loadMidiAndPlayByKey(url)
        } else if (mode === 1) {
            focusTextInput()
            // 发请求获取简谱详细信息
            getMusicScoreDetails(scoreId)
        } else if (mode === 2) {
            freeInputRef.current.focus()
        }

    }, [mode, scoreId])

    useEffect(() => {
        //注册刷新事件 和 更换曲谱事件
        event.regist(OBEvent.MUSIC_REFRESH, ({ isReStar, index, modeIndex }) => {
            if (modeIndex === 0) {
                reset(isReStar, index)
            } else if (modeIndex === 1) {
                resetScores(wordDivRefs)
            }
        })
    }, [mode, scoreId, wordDivRefs])

    useEffect(() => {
        if (currWordIndex === DEFAULT_WORDS_COUNT - 1) {
            const generatedEng = wordsGenerator(
                DEFAULT_WORDS_COUNT,
                'normal',
                'ENGLISH_MODE'
            );
            setWordsDict((currentArray) => [...currentArray, ...generatedEng]);
            return
        }
        if (
            currWordIndex !== 0 &&
            currWordIndex !== DEFAULT_WORDS_COUNT &&
            wordSpanRefs[currWordIndex].current.offsetLeft <
            wordSpanRefs[currWordIndex - 1].current.offsetLeft
        ) {
            wordSpanRefs[currWordIndex - 1].current.scrollIntoView();
        } else {
            return;
        }
    }, [currWordIndex])

    useEffect(() => {
        if (
            scoresCurrIndex > 0 &&
            scoresCurrIndex < scoresValue?.length &&
            wordDivRefs[scoresCurrIndex].current.offsetLeft <
            wordDivRefs[scoresCurrIndex - 1].current.offsetLeft
        ) {
            wordDivRefs[scoresCurrIndex + 1].current.scrollIntoView();
        } else {
            return;
        }
    }, [scoresCurrIndex])

    const getMusicScoreDetails = async (id) => {
        let res = await getMusicScoreById(id);
        // console.log('获取乐谱详情的接口', res);
        if (res.code === 200) {
            setScoreKey(res.data.lyric.split(""))
            setScoresValue(res.data.content.split(""))
            setScoresName(res.data.name)
        }
    }
    const reset = (isReStar, index = songIndex) => {
        console.log("reset");
        dispatch(changeInputData({ speed: null, correct: null, time: null }))
        setStatus("waiting");
        if (!isReStar) {
            setWordsDict(wordsGenerator(DEFAULT_WORDS_COUNT, 'normal', 'ENGLISH_MODE'));
        }
        midiPlayMixin.clearMidiPlayByKey()
        let songUrl = songData[index].url
        console.log(songUrl)
        if (!songUrl) return;
        midiPlayMixin.loadMidiAndPlayByKey(songUrl)
        setCurrInput("");
        setPrevInput("");
        setCurrWordIndex(0);
        setCurrCharIndex(-1);
        setCurrChar("");
        setHistory({});
        setInputWordsHistory({});
        setWordsCorrect(new Set());
        setWordsInCorrect(new Set());
        textInputRef.current.focus();
        // 完全复位，等待下一次输入
        if (wordSpanRefs[0]?.current) {
            wordSpanRefs[0].current.scrollIntoView();
        }
    };

    const resetScores = (ref) => {
        setScoresStatus("waiting");
        setScoresCurrIndex(0);
        setScoresHistory({});
        setScoresCurrChar("");
        setScoresCurrInput("");
        scoresInputRef.current.focus();
        if (wordDivRefs[0]?.current) {
            wordDivRefs[0].current.scrollIntoView();
        }
    }

    const start = () => {
        if (status === "finished") {
            setCurrInput("");
            setPrevInput("");
            setCurrWordIndex(0);
            setCurrCharIndex(-1);
            setCurrChar("");
            setHistory({});
            setInputWordsHistory({});
            setWordsCorrect(new Set());
            setWordsInCorrect(new Set());
            setStatus("waiting");
            textInputRef.current.focus();
        }

        if (status !== "started") {
            setStatus("started");
            setStarTimeStamp(+new Date());
        }
    };

    const playSound = () => {
        if (mode !== 0) return;
        let isEnd = midiPlayMixin.playLoopByKey()
        if (isEnd === true) {
            message.info("曲目结束")
            setStatus("finished")
            const endTimeStamp = +new Date()
            const correctCount = Object.values(history).filter(
                (e) => e === true
            ).length;
            const charCount = Object.keys(history).length
            const seconds = (endTimeStamp - starTimeStamp) / 1000;//用了多少秒？
            const h = parseInt((seconds / 60 / 60) % 24); //计算小时数 转化为整数
            const m = parseInt((seconds / 60) % 60); //计算分钟数 转化为整数
            const s = parseInt(seconds % 60); //计算描述 转化为整数
            const speed = Math.round((correctCount / 5) / m)
            const correct = Math.round((correctCount / charCount) * 100)
            const time = `${h < 10 ? `0${h}` : `${h}`}:${m < 10 ? `0${m}` : `${m}`}:${s < 10 ? `0${s}` : `${s}`}`
            dispatch(changeInputData({ speed, correct, time }))
            return;
        }
    }

    const handleKeyDown = (e) => {
        if (mode !== 0) return;
        const key = e.key;
        const keyCode = e.keyCode;
        // 禁用大写锁定键、alt、ctrl、table
        setCapsLocked(e.getModifierState("CapsLock"));
        if (keyCode === 20 || (keyCode >= 16 && keyCode <= 18 || keyCode === 9)) {
            e.preventDefault();
            return;
        }

        if (status === "finished") {
            setCurrInput("");
            setPrevInput("");
            message.error("该曲目已结束，请刷新或重新选择曲目")
            return;
        }

        // 开始
        if (status !== "started" && status !== "finished") {
            start();
        }

        if (setData.typeDifficulty === 2) {
            //严格模式输入错误return
            if (currCharIndex + 1 === words[currWordIndex].length) {
                //下一个单词，要输入空格
                if (keyCode !== 32) {
                    return;
                }
            } else {
                if (key !== words[currWordIndex][currCharIndex + 1]) {
                    return;
                }
            }
        }
        if (keyCode === 32) {
            // 空格键
            const prevCorrectness = checkPrev();
            // 前进到下一个，无论前一个是否正确
            if (prevCorrectness === true || prevCorrectness === false) {
                // 重置 currInput
                if (setData.pluck === 2) {
                    // 当弹奏设置为当打完一个单词时
                    playSound()
                }
                setCurrInput("");
                // 前进到下一个
                setCurrWordIndex(currWordIndex + 1);
                setCurrCharIndex(-1);
                return;
            } else {
                // 不允许跳过整个单词
                return;
            }
        } else if (keyCode === 8) {
            // 删除键
            delete history[keyString];

            // 避免删除
            if (currCharIndex < 0) {
                // 只允许删除前一个词
                if (wordsInCorrect.has(currWordIndex - 1)) {

                    const prevInputWord = inputWordsHistory[currWordIndex - 1];
                    setCurrInput(prevInputWord + " ");
                    setCurrCharIndex(prevInputWord.length - 1);
                    setCurrWordIndex(currWordIndex - 1);
                    setPrevInput(prevInputWord);
                }
                return;
            }
            setCurrCharIndex(currCharIndex - 1);
            setCurrChar("");
            return;
        } else {
            if (currCharIndex > 12) return;
            if (setData.pluck === 1 || !setData?.pluck) {
                // 当弹奏设置为当按下一个字母时
                playSound()
            }
            setCurrCharIndex(currCharIndex + 1);
            setCurrChar(key);
            return;
        }
    };

    const handleKeyUp = (e) => {
        if (mode !== 0) return;
        setCapsLocked(e.getModifierState("CapsLock"));
    };

    const updateInput = (e) => {
        if (mode !== 0) return;
        if (status === "finished" || currCharIndex > 12) return;
        setCurrInput(e.target.value);
        inputWordsHistory[currWordIndex] = e.target.value.trim();
        setInputWordsHistory(inputWordsHistory);

        // if (!startTime) {
        //     setStartTime(new Date());
        // } else {
        //     const endTime = new Date();
        //     let diff = endTime.getTime() - startTime.getTime();
        //     let speed = 0;
        //     if (lastSpeed) {
        //         diff = (lastSpeed + diff) / 2
        //     }
        //     if (diff < 100) { // 连续输入的判定时间为 1 秒
        //         speed = 140;
        //         console.log('用户正在连续输入中，速度140');
        //     } else if (diff < 200) {
        //         speed = 120;
        //         console.log('用户正在连续输入中，速度120', diff);
        //     } else if (diff < 300) {
        //         speed = 100;
        //         console.log('用户正在连续输入中，速度100', diff);
        //     } else if (diff < 400) {
        //         speed = 80;
        //         console.log('用户正在连续输入中，速度80', diff);
        //     } else if (diff < 600) {
        //         speed = 60;
        //         console.log('用户正在连续输入中，速度60', diff);
        //     } else if (diff < 1000) {
        //         speed = 40;
        //         console.log('用户正在连续输入中，速度60', diff);
        //     } else {
        //         speed = 10;
        //         console.log('用户正在输入，速度慢', diff);
        //     }
        //     setLastSpeed(speed)
        //     setStartTime(endTime)
        //     clearTimeout(stopTimer.current)
        //     stopTimer.current = setTimeout(() => {
        //         if (new Date().getTime() - endTime.getTime() > 2000) {// 超过两秒则判定为停止输入
        //             speed = 0;
        //             dispatch(changeInputSpeed(speed))
        //         }
        //     }, 2000)
        //     if (lastSpeed && lastSpeed === speed) {
        //     } else {
        //         dispatch(changeInputSpeed(speed))
        //     }
        // }
    };


    const handleScoreKeyDown = (e) => {
        if (mode !== 1) return;
        const key = e.key;
        const keyCode = e.keyCode;
        // 禁用大写锁定键、alt、ctrl、table
        if (keyCode === 20 || (keyCode >= 16 && keyCode <= 18 || keyCode === 9)) {
            e.preventDefault();
            return;
        }

        if (scoresStatus === "finished") {
            console.log(wordDivRefs)
            console.log(wordDivRefs[0])
            message.error("该曲目已结束，请刷新或重新选择曲目")
            return;
        }

        // 开始
        if (scoresStatus !== "started" && scoresStatus !== "finished") {
            setScoresStatus("started");
        }
        if (setData.scroesDifficulty === 2) {
            //严格模式输入错误return
            if (keyCode !== 8 && key !== scoresValue[scoresCurrIndex]) {
                return;
            }
        }

        if (keyCode === 8) {
            // 删除键
            if (scoresCurrIndex > 0) {
                delete scoresHistory[scoresCurrIndex - 1];

                setScoresCurrIndex(scoresCurrIndex - 1);
                setScoresCurrChar("");
                return;
            }
        } else {
            if (scoresCurrIndex >= scoresValue.length - 1) {
                if (scoresCurrIndex == scoresValue.length - 1) {
                    message.info("曲目结束")
                    setScoresStatus("finished")
                } else {
                    message.error("该曲目已结束，请刷新或重新选择曲目")
                }
            }
            setScoresCurrIndex(scoresCurrIndex + 1);
            setScoresCurrChar(key);
            return;
        }
    }
    const handleScoreKeyUp = (e) => {

    }
    const updateScoreInput = (e) => {
        setScoresCurrInput(e.target.value);
    }

    const freeInputChange = (e) => {
        setFreeContent(e.target.value)
    }

    const getExtraCharClassName = (i, idx, extra) => {
        if (
            currWordIndex === i &&
            idx === extra.length - 1
        ) {
            return "caret-extra-char-right-error";
        }
        return "error-char";
    };

    const getExtraCharsDisplay = (word, i) => {
        if (setData.typeDifficulty === 2) {
            return;
        }
        let input = inputWordsHistory[i];
        if (!input) {
            input = currInput.trim();
        }
        if (i > currWordIndex) {
            return null;
        }
        if (input.length <= word.length) {
            return null;
        } else {
            const extra = input.slice(word.length, input.length).split("");
            history[i] = extra.length;
            return extra.map((c, idx) => (
                <span key={idx} className={getExtraCharClassName(i, idx, extra)}>
                    {c}
                </span>
            ));
        }
    };

    const getFreeCharsDisplay = (word, i) => {
        if (setData.typeDifficulty === 2) {
            return;
        }
        let input = inputWordsHistory[i];
        if (!input) {
            input = currInput.trim();
        }
        if (i > currWordIndex) {
            return null;
        }
        if (input.length <= word.length) {
            return null;
        } else {
            const extra = input.slice(word.length, input.length).split("");
            history[i] = extra.length;
            return extra.map((c, idx) => (
                <span key={idx} className={getExtraCharClassName(i, idx, extra)}>
                    {c}
                </span>
            ));
        }
    };

    // 用于检测前面一个单词是否正确输入
    const checkPrev = () => {
        const wordToCompare = words[currWordIndex];
        const currInputWithoutSpaces = currInput.trim();
        const isCorrect = wordToCompare === currInputWithoutSpaces;
        if (!currInputWithoutSpaces || currInputWithoutSpaces.length === 0) {
            return null;
        }
        if (isCorrect) {
            wordsCorrect.add(currWordIndex);
            wordsInCorrect.delete(currWordIndex);
            let inputWordsHistoryUpdate = { ...inputWordsHistory };
            inputWordsHistoryUpdate[currWordIndex] = currInputWithoutSpaces;
            setInputWordsHistory(inputWordsHistoryUpdate);
            // 将prevInput重置为空（不会返回）
            setPrevInput("");

            return true;
        } else {
            wordsInCorrect.add(currWordIndex);
            wordsCorrect.delete(currWordIndex);
            let inputWordsHistoryUpdate = { ...inputWordsHistory };
            inputWordsHistoryUpdate[currWordIndex] = currInputWithoutSpaces;
            setInputWordsHistory(inputWordsHistoryUpdate);
            // 将currInput附加到prevInput
            setPrevInput(prevInput + " " + currInputWithoutSpaces);
            return false;
        }
    };

    const getChineseWordClassName = (wordIdx, char) => {
        if (wordIdx + 1 === scoresCurrIndex) {
            if (char === scoresCurrChar) {
                scoresHistory[wordIdx] = true;
            } else {
                if (scoresCurrChar !== "") {
                    scoresHistory[wordIdx] = false;
                }
            }
        }
        if (wordIdx === scoresCurrIndex && scoresStatus !== "finished") {
            return "active-word";
        }
        if (scoresHistory[wordIdx] === true) {
            return "actived-word";
        }
        if (scoresHistory[wordIdx] === false) {
            return "error-word"
        }
        return "";
    };

    const getCharClassName = (wordIdx, charIdx, char, word) => {
        const keyString = wordIdx + "." + charIdx;
        if (
            // pacingStyle === PACING_CARET &&
            wordIdx === currWordIndex &&
            charIdx === currCharIndex + 1 &&
            status !== "finished"
        ) {
            return "caret-char-left";
        }
        if (history[keyString] === true) {
            if (
                // pacingStyle === PACING_CARET &&
                wordIdx === currWordIndex &&
                word.length - 1 === currCharIndex &&
                charIdx === currCharIndex &&
                status !== "finished"
            ) {
                return "caret-char-right-correct";
            }
            return "actived";
        }
        if (history[keyString] === false) {
            if (
                // pacingStyle === PACING_CARET &&
                wordIdx === currWordIndex &&
                word.length - 1 === currCharIndex &&
                charIdx === currCharIndex &&
                status !== "finished"
            ) {
                return "caret-char-right-error";
            }
            return "error-char";
        }
        if (
            wordIdx === currWordIndex &&
            charIdx === currCharIndex &&
            currChar && status !== "finished"
        ) {
            if (char === currChar) {
                history[keyString] = true;
                return "actived";
            } else {
                history[keyString] = false;
                return "error-char";
            }
        } else {
            if (wordIdx < currWordIndex) {
                // 缺失的字符
                history[keyString] = undefined;
            }
            return "char";
        }
    };

    // 关闭简谱模态框
    const closeSelectModal = () => {
        setIsShowSongSelect(false)
    }

    // 关闭设置模态框
    const closeSetModal = (data) => {
        dispatch(changePianoSetting(data))
        setIsShowSetModal(false)
    }

    // 关闭上传曲谱模态框
    const closeUploadModal = () => {
        setIsShowUploadModal(false)
    }

    const uploadScores = () => {
        setIsShowUploadModal(true);
    }

    const changeMode = (modeNum) => {
        if (modeNum !== mode) {
            dispatch(changePianoMode(modeNum))
        }
    }

    return (
        <SongViewWrapper onClick={focusTextInput}>
            <div className='songView-inner'>
                <div className='songView-header'>
                    <div className='header-left'>
                        {mode === 0 && <span onClick={() => setIsShowSongSelect(true)}>{songName === "" ? "请选择曲谱" : songName}</span>}
                        {mode === 1 && <span onClick={() => setIsShowSongSelect(true)}>{scoresName === "" ? "请选择曲谱" : scoresName}</span>}
                        {mode === 2 && <span onClick={() => uploadScores()}>上传曲谱</span>}
                    </div>
                    <div className='header-center'>
                        <div className="tabs">
                            <input type="radio" name="tab" id="tab-01" defaultChecked={mode === 0} />
                            <label htmlFor="tab-01" onClick={() => changeMode(0)}>
                                <div className="wave"></div>
                                <span>打字模式</span>
                            </label>
                            <input type="radio" name="tab" id="tab-02" defaultChecked={mode === 1} />
                            <label htmlFor="tab-02" onClick={() => changeMode(1)}>
                                <div className="wave"></div>
                                <span>简谱模式</span>
                            </label>
                            <input type="radio" name="tab" id="tab-03" defaultChecked={mode === 2} />
                            <label htmlFor="tab-03" onClick={() => changeMode(2)}>
                                <div className="wave"></div>
                                <span>自由模式</span>
                            </label>
                        </div>
                    </div>
                    {/* <div className='header-right'>
                        <span>隐藏</span>
                        <CloseCircleOutlined />
                    </div> */}
                    <div className='header-right' onClick={() => setIsShowSetModal(true)}>
                        <span>设置</span>
                        <SettingOutlined />
                    </div>
                </div>
                {mode === 0 && (<div className='songView-words scrollbar-default-styles'>
                    {words.map((word, index) => {
                        return <span className='songView-word' key={index} ref={wordSpanRefs[index]}>
                            {word.split("").map((char, idx) => {
                                return <span key={"word" + idx} className={getCharClassName(index, idx, char, word)}>{char}</span>
                            })}
                            {getExtraCharsDisplay(word, index)}
                        </span>

                    })}
                </div>)}
                {mode === 1 && (<div className='songView-words scrollbar-default-styles'>
                    {scoresValue?.map((word, index) => {
                        return <div key={index + "word"} className={getChineseWordClassName(index, word)} ref={wordDivRefs[index]}>
                            <span key={index + "anchor"} className='chinese-word-key' ref={wordSpanRefs[index]}>
                                {" "}
                                {scoresKey[index]}
                            </span>
                            <span key={index + "val"} className='chinese-word'>
                                {word}
                            </span>
                        </div>
                    })}
                </div>)}
                {mode === 2 && (<div className='freeModel-words'>
                    <textarea ref={freeInputRef} value={freeContent} onChange={(e) => freeInputChange(e)} className='scrollbar-default-styles' cols="8" rows="20" style={{ resize: "none" }}></textarea>
                </div>)}
                {mode === 0 && <input
                    key="hidden-input"
                    ref={textInputRef}
                    type="text"
                    className="hidden-input"
                    onKeyDown={(e) => handleKeyDown(e)}
                    onKeyUp={(e) => handleKeyUp(e)}
                    value={currInput}
                    onChange={(e) => updateInput(e)}
                />}
                {mode === 1 && <input
                    key="hidden-input"
                    ref={scoresInputRef}
                    type="text"
                    className="hidden-input"
                    onKeyDown={(e) => handleScoreKeyDown(e)}
                    onKeyUp={(e) => handleScoreKeyUp(e)}
                    value={scoresCurrInput}
                    onChange={(e) => updateScoreInput(e)}
                />}
            </div>
            <SongSelect
                isShowSongSelect={isShowSongSelect}
                closeSelectModal={closeSelectModal}
            />
            <PianoSet
                isShowSetModel={isShowSetModal}
                closeModal={closeSetModal}
            />
            <UploadModal
                isShowUploadModel={isShowUploadModal}
                closeModal={closeUploadModal}
                scoresContent={freeContent}
            />
        </SongViewWrapper>
    )
}
