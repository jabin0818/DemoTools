import React, { useState, useRef, useEffect } from 'react'

import { useNavigate, useSearchParams, useParams, useLocation } from "react-router-dom";

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { ModelWrapper } from '../style'

import ModalDetail from '../modal-detail'

import {
    SearchOutlined,
    StarOutlined,
    StarFilled,
    SettingOutlined,
    ReloadOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
    EllipsisOutlined,
    ShareAltOutlined,
    CopyOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined
} from '@ant-design/icons'

import { getOneLevelList, getLevelList, getWordsList, getIdiomsList, starDictcard, getCharDetails } from "@/service/dictCard"

import { message } from 'antd';

import ziGen from "@/assets/data/wubi/zigen.json"

import { oneLevelCode, wholeRoot, firstWord, strokes } from "@/assets/data/wubi/other"

import useLocalPersistState from '@/hooks/useLocalPersistState'

export default function ModelWubi(props) {

    const dispatch = useDispatch()

    const { isLogin, profile } = useSelector(
        (state) => ({
            isLogin: state.loginState.get('isLogin'),
            profile: state.loginState.get('profile'),
        }),
        shallowEqual
    )

    const radicalData = ziGen;

    const { event, clearEvent, setData } = props;

    const navigate = useNavigate();

    const [getSearchArr] = useSearchParams();

    const type = getSearchArr.getAll('type')[0]

    const [formData, setFormData] = useLocalPersistState(
        { isShowPinyin: true, isRandom: true, tip: 1, difficulty: 1, sum: 100 },
        "dictCard_set"
    )

    const [formSetData, setFormSetData] = useState(formData)

    const tabbarRef = useRef(null);

    const tabbarOtherRef = useRef(null);

    const [cardRefList, setCardRefList] = useState(
        [React.createRef(), React.createRef(), React.createRef(), React.createRef()]
    );

    const [inputRefList, setInputRefList] = useState(
        [React.createRef(), React.createRef(), React.createRef(), React.createRef()]
    );

    const [wordList, setWordList] = useState(null);

    const [wordIndex, setWordIndex] = useState(null);

    const [userInput, setUserInput] = useState("")

    const [isStar, setIsStar] = useState(false);

    const [isStarDom, setIsStarDom] = useState(null);//点了收藏的dom，用于清除高亮

    const [isScreenOut, setIsScreenOut] = useState(false);

    const [wordDetailList, setWordDetailList] = useState(null);

    const typeNumberView = {
        "firstWord": "0",
        "oneLevel": "1",
        "secondLevel": "2",
        "threeLevel": "3",
        "fullCode": "4",
    }

    useEffect(() => {
        if (!type) {
            navigate(`/demo/dictCard?type=oneLevel`)
            getData("oneLevel")
        }
    }, [])

    useEffect(() => {
        getData(type)
    }, [type])

    useEffect(() => {
        if (event === "") return;
        if (event === "previous") {
            if (wordIndex === 0) {
                setWordIndex(wordList.length - 1)
            } else {
                setWordIndex(wordIndex - 1)
            }
            lastCard()
        } else if (event === "forward") {
            if (wordIndex === wordList.length - 1) {
                setWordIndex(0)
            } else {
                setWordIndex(wordIndex + 1)
            }
            nextCard()
        } else if (event === "refresh") {
            getData(type)
            restoreCard()
        }
        setTimeout(() => {
            clearEvent(true)
        }, 20)
    }, [event])

    useEffect(() => {
        if (userInput !== "") {
            if (wordIndex < wordList.length - 1) {
                if (type !== "radical") {
                    if (userInput.trim() === wordList[wordIndex].text) {
                        nextCard()
                        setWordIndex(wordIndex + 1)
                    }
                } else {
                    // 在字根模式下用code判断
                    if (userInput.trim() === wordList[wordIndex].code) {
                        nextCard()
                        setWordIndex(wordIndex + 1)
                    }
                }
            } else {
                // 结束
                if (type !== "radical") {
                    if (userInput.trim() === wordList[wordIndex].text) {
                        // 结束时答对了
                        nextCard()
                        setWordIndex(0)
                    }
                } else {
                    if (userInput.trim() === wordList[wordIndex].code) {
                        // 结束时答对了
                        nextCard()
                        setWordIndex(0)
                    }
                }
            }
        }
    }, [userInput])

    useEffect(() => {
        if (setData) {
            setFormSetData(setData)
        }
    }, [setData])

    //将数组打乱
    function randArr(arr) {
        let length = arr.length;
        let r = length;
        let rand = 0;
        while (r) {
            rand = Math.floor(Math.random() * (r--));
            [arr[r], arr[rand]] = [arr[rand], arr[r]];
        }
        return arr;
    }

    function handleOneLevelCodeData(isRandom) {
        if (isRandom) {
            return randArr(oneLevelCode)
        } else {
            return oneLevelCode
        }
    }
    function handleRadicalData(isRandom) {
        let radicalList = [];
        for (let radicalKey in radicalData) {
            radicalData[radicalKey].forEach((item, index) => {
                radicalList.push({
                    text: item,
                    code: radicalKey,
                    pinyin: ""
                })
            })
        }
        if (isRandom) {
            return randArr(radicalList)
        } else {
            return radicalList
        }
    }
    function handleWholeRootData(isRandom) {
        if (isRandom) {
            return randArr(wholeRoot)
        } else {
            return wholeRoot
        }
    }
    function handleFirstWordData(isRandom) {
        if (isRandom) {
            return randArr(firstWord)
        } else {
            return firstWord
        }
    }
    function handleStrokesData(isRandom) {
        if (isRandom) {
            return randArr(strokes)
        } else {
            return strokes
        }
    }

    async function getData(type) {
        if (type === "oneLevel") {
            let res = await getOneLevelList()
            // console.log("获取一级简码的接口：", res)
            if (res.code === 200) {
                setWordList(res.data)
                setWordIndex(0)
            }
            // setWordList(handleOneLevelCodeData(formSetData.isRandom))
            // setWordIndex(0)
        } else if (type === "secondLevel") {
            let res = await getLevelList("2", formSetData.difficulty, formSetData.sum)
            // console.log("获取二级简码的接口：", res)
            if (res.code === 200) {
                setWordList(res.data)
                setWordIndex(0)
            }
        } else if (type === "threeLevel") {
            let res = await getLevelList("3", formSetData.difficulty, formSetData.sum)
            // console.log("获取三级简码的接口：", res)
            if (res.code === 200) {
                setWordList(res.data)
                setWordIndex(0)
            }
        } else if (type === "fullCode") {
            let res = await getLevelList("4", formSetData.difficulty, formSetData.sum)
            // console.log("获取全码的接口：", res)
            if (res.code === 200) {
                setWordList(res.data)
                setWordIndex(0)
            }
        } else if (type === "expression") {
            let res = await getWordsList(formSetData.sum)
            // console.log("获取词语的接口：", res)
            if (res.code === 200) {
                setWordList(res.data)
                setWordIndex(0)
            }
        } else if (type === "idiom") {
            let res = await getIdiomsList(formSetData.sum)
            // console.log("获取成语的接口：", res)
            if (res.code === 200) {
                setWordList(res.data)
                setWordIndex(0)
            }
        } else if (type === "radical") {
            setWordList(handleRadicalData(formSetData.isRandom))
            setWordIndex(0)
        } else if (type === "wholeRoot") {
            setWordList(handleWholeRootData(formSetData.isRandom))
            setWordIndex(0)
        } else if (type === "firstWord") {
            setWordList(handleFirstWordData(formSetData.isRandom))
            setWordIndex(0)
        } else if (type === "strokes") {
            setWordList(handleStrokesData(formSetData.isRandom))
            setWordIndex(0)
        }
    }
    function lastCard(e) {
        for (let index = 0; index < 4; index++) {
            let oldClassName = cardRefList[index].current.classList[1]
            let cardNum = Number(oldClassName.split("-")[1])
            let newNum = ((cardNum + 1) === 5) ? 1 : cardNum + 1
            let newClass = "card-" + newNum
            cardRefList[index].current.classList.replace(oldClassName, newClass)
            if (newNum === 1) {
                inputRefList[index].current.focus()
            }
        }
        switchType();
    }

    function nextCard(e) {
        for (let index = 0; index < 4; index++) {
            let oldClassName = cardRefList[index].current.classList[1]
            let cardNum = Number(oldClassName.split("-")[1])
            let newNum = (cardNum - 1) || 4
            let newClass = "card-" + newNum
            cardRefList[index].current.classList.replace(oldClassName, newClass)
            if (newNum === 1) {
                inputRefList[index].current.focus()
            }
        }
        switchType();
    }

    function restoreCard(e) {
        for (let index = 0; index < 4; index++) {
            let oldClassName = cardRefList[index].current.classList[1]
            let newNum = index + 1
            let newClass = "card-" + newNum
            cardRefList[index].current.classList.replace(oldClassName, newClass)
            if (newNum === 1) {
                inputRefList[index].current.focus()
            }
        }
        switchType();
    }

    async function switchType() {
        isStarDom && isStarDom.classList.remove("dictCard-wubi-stared")
        setIsStarDom(null);
        setIsStar(false);
        setUserInput("")
        if (isScreenOut) {
            moreWordCard()
        }
        getWordDetailItem()
    }

    function toWordCardType(e, typeName) {
        if (typeName === type) {
            return;
        }
        let navAry = tabbarRef.current.children;
        for (let index = 0; index < navAry.length; index++) {
            const element = navAry[index];
            element.classList.remove("active");
        }
        let navOtherAry = tabbarOtherRef.current.children;
        for (let index = 0; index < navOtherAry.length; index++) {
            const element = navOtherAry[index];
            element.classList.remove("active");
        }
        e.currentTarget.classList.add("active");
        navigate(`/demo/dictCard?type=${typeName}`)
        switchType()
    }

    function toOtherType(e, typeName) {
        if (typeName === type) {
            return;
        }
        let navAry = tabbarRef.current.children;
        for (let index = 0; index < navAry.length; index++) {
            const element = navAry[index];
            element.classList.remove("active");
            if (index === navAry.length - 1) {
                element.classList.add("active");
            }
        }
        let navOtherAry = tabbarOtherRef.current.children;
        for (let index = 0; index < navOtherAry.length; index++) {
            const element = navOtherAry[index];
            element.classList.remove("active");
        }
        e.currentTarget.classList.add("active");
        navigate(`/demo/dictCard?type=${typeName}`)
        switchType()
        if (typeName === "radical") {
            message.info("当前为字根模式，请切换为英文输入法")
        }
    }

    function typeName() {
        return getSearchArr.getAll('type')[0]
    }

    async function getWordDetail(id, text) {
        let res = await getCharDetails(id, text);
        // console.log("获取汉字详细信息的接口：", res);
        if (res.code === 200) {
            setWordDetailList((data) => {
                if (data?.length) {
                    data.push(res.data);
                    return data
                } else {
                    return [res.data]
                }
            });
        }
    }

    function getWordDetailItem() {
        if (wordIndex !== null) {
            return wordDetailList?.find((item) => item.id === wordList[wordIndex].id)
        }
    }

    function shareWordCard(e) {
        e.stopPropagation();
        message.info("分享功能正在开发中~")
    }

    function copyWordCard(e) {
        e.stopPropagation();
        let text = wordList[wordIndex]?.text
        navigator.clipboard.writeText(text).then(function () {
            message.success(`已成功复制“${text}”到剪贴板`)
        }, function (err) {
            message.error(`复制失败`)
        });
    }

    async function addWordDetailList() {
        if (!getWordDetailItem()) {
            if (wordList[wordIndex].isUpdated === 1) {
                setWordDetailList((data) => {
                    if (data?.length) {
                        data.push(wordList[wordIndex]);
                        return data
                    } else {
                        return [wordList[wordIndex]]
                    }
                });
            } else {
                let id = wordList[wordIndex].id;
                let text = wordList[wordIndex].text;
                await getWordDetail(id, text)
                getWordDetailItem()
            }
        }
    }

    async function moreWordCard(e) {
        let dom = document.getElementById("modal-container")
        e.stopPropagation();
        if (typeName() === "radical" || typeName() === "strokes" || typeName() === "idiom" || typeName() === "expression") {
            message.error("暂不支持查看")
            return;
        }
        if (isScreenOut) {
            dom.classList.add("out")
            setTimeout(() => {
                dom.classList.remove("out")
                dom.classList.remove("four")
            }, 300)
            setIsScreenOut(false);
        } else {
            await addWordDetailList()
            dom.classList.add("four")
            setIsScreenOut(true);
        }
    }

    async function starWordCard(e) {
        let dom = e.currentTarget
        e.stopPropagation();
        if (isLogin) {
            if (typeName() === "radical" || typeName() === "strokes") {
                message.error("暂不支持收藏")
                return;
            }
            let cardInfo = wordList[wordIndex];
            let wordType = 0;
            if (typeName() === "idiom") {
                wordType = 2;
            } else if (typeName() === "expression") {
                wordType = 1;
            }
            let res = await starDictcard(
                profile.id,
                cardInfo.id,
                cardInfo.text,
                cardInfo.code,
                cardInfo.pinyin,
                cardInfo.pinyinLazy,
                wordType,
                cardInfo.code.length,
                cardInfo?.frequency,
                cardInfo?.traditional,
                cardInfo?.radicals,
                cardInfo?.explanation,
                cardInfo?.strokes,
            );
            // console.log("收藏卡片的接口", res);
            if (res.code === 200) {
                message.success("收藏成功！")
                setIsStar(true);
                setIsStarDom(dom);
                dom.classList.add("dictCard-wubi-stared");
            } else {
                message.error(res.msg)
            }
        } else {
            message.error("登录后才可以收藏哦！")
        }


    }

    function inputChange(e) {
        setUserInput(e.target.value);
    }

    function getCardWidth() {
        if (typeName() === "expression") {
            return "460px";
        } else if (typeName() === "idiom") {
            return "560px";
        } else {
            return "325px";
        }
    }

    function getCardTxtClass() {
        let text = wordIndex !== null ? wordList[wordIndex]?.text : null;
        if (!text) return;
        if (typeName() === "idiom") {
            if (text.length === 5) {
                return { fontSize: "110px" };
            } else if (text.length === 6) {
                return { fontSize: "86px" };
            } else if (text.length === 7) {
                return { fontSize: "74px" };
            } else if (text.length === 8) {
                return { fontSize: "68px" };
            } else if (text.length === 9) {
                return { fontSize: "60px" };
            } else {
                return { fontSize: "120px" };
            }
        } else if (typeName() === "radical") {
            return { fontFamily: "HanZiRootFont" }
        }

    }

    return (
        <ModelWrapper>
            <div className="navigation" ref={tabbarRef}>
                <a onClick={(e) => toWordCardType(e, "oneLevel")} className={"navigation-item" + " " + (typeName() === "oneLevel" ? "active" : "")}>一级简码</a>
                <a onClick={(e) => toWordCardType(e, "secondLevel")} className={"navigation-item" + " " + (typeName() === "secondLevel" ? "active" : "")}>二级简码</a>
                <a onClick={(e) => toWordCardType(e, "threeLevel")} className={"navigation-item" + " " + (typeName() === "threeLevel" ? "active" : "")}>三级简码</a>
                <a onClick={(e) => toWordCardType(e, "fullCode")} className={"navigation-item" + " " + (typeName() === "fullCode" ? "active" : "")}>全码</a>
                <a onClick={(e) => toWordCardType(e, "expression")} className={"navigation-item" + " " + (typeName() === "expression" ? "active" : "")}>词语</a>
                <a onClick={(e) => toWordCardType(e, "idiom")} className={"navigation-item" + " " + (typeName() === "idiom" ? "active" : "")}>成语</a>
                <a className={"navigation-item navigation-item-other" + " " + ((typeName() === "radical" || typeName() === "wholeRoot" || typeName() === "firstWord" || typeName() === "strokes") ? "active" : "")}>
                    <span>其它</span>
                    <div className='drop-menu'>
                        <div className='drop-menu-wrapper' ref={tabbarOtherRef}>
                            <span onClick={(e) => toOtherType(e, "radical")} className={"navigation-item drop-menu-item" + " " + (typeName() === "radical" ? "active" : "")}>字根</span>
                            <span onClick={(e) => toOtherType(e, "wholeRoot")} className={"navigation-item drop-menu-item" + " " + (typeName() === "wholeRoot" ? "active" : "")}>成字字根</span>
                            <span onClick={(e) => toOtherType(e, "firstWord")} className={"navigation-item drop-menu-item" + " " + (typeName() === "firstWord" ? "active" : "")}>键名汉字</span>
                            <span onClick={(e) => toOtherType(e, "strokes")} className={"navigation-item drop-menu-item" + " " + (typeName() === "strokes" ? "active" : "")}>单笔画</span>
                        </div>
                    </div>
                </a>
            </div>
            <div className="currently-playing">
                <div className="container" style={{ width: getCardWidth() }}>
                    {wordIndex !== null && <div className="progress">
                        <span>{wordIndex + 1}</span>
                        <span>/</span>
                        <span>{wordList.length}</span>
                    </div>}
                    <div ref={cardRefList[0]} className="card card-1" >
                        <div className='card-external'>
                            <span className="card-pin"></span>
                            <div className="card-more">
                                <EllipsisOutlined />
                                <div className="multi-button card-1-button">
                                    <button title='分享' className="fas" onClick={(e) => shareWordCard(e)}>
                                        <ShareAltOutlined />
                                    </button>
                                    <button title='复制' className="fas" onClick={(e) => copyWordCard(e)}>
                                        <CopyOutlined />
                                    </button>
                                    <button title='注释' className="fas" onClick={(e) => moreWordCard(e)}>
                                        {isScreenOut ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                                    </button>
                                    <button title='收藏' className="fas" onClick={(e) => starWordCard(e)}>
                                        {isStar ? <StarFilled /> : <StarOutlined />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="x content-1">
                            {formSetData.isShowPinyin !== false && <div className='tipBox'>
                                <span>{wordIndex !== null && wordList[wordIndex]?.pinyin}</span>
                            </div>}
                            <div className='wordBox'>
                                <span style={getCardTxtClass()}>{wordIndex !== null && wordList[wordIndex]?.text}</span>
                            </div>
                            <div className='codeBox'>
                                <div className='codeBox-input'>
                                    <input ref={inputRefList[0]} value={userInput} onChange={(e) => inputChange(e)} />
                                    <span className="bar"></span>
                                    {(wordIndex !== null && formSetData.tip === 1) && <label>{wordList[wordIndex]?.code}</label>}
                                    {(wordIndex !== null && formSetData.tip === 2) && <label>{wordList[wordIndex]?.pinyinLazy}</label>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={cardRefList[1]} className="card card-2" >
                        <div className='card-external'>
                            <span className="card-pin"></span>
                            <div className="card-more">
                                <EllipsisOutlined />
                                <div className="multi-button card-2-button">
                                    <button title='分享' className="fas" onClick={(e) => shareWordCard(e)}>
                                        <ShareAltOutlined />
                                    </button>
                                    <button title='复制' className="fas" onClick={(e) => copyWordCard(e)}>
                                        <CopyOutlined />
                                    </button>
                                    <button title='注释' className="fas" onClick={(e) => moreWordCard(e)}>
                                        {isScreenOut ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                                    </button>
                                    <button title='收藏' className="fas" onClick={(e) => starWordCard(e)}>
                                        {isStar ? <StarFilled /> : <StarOutlined />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="x content-2">
                            {formSetData.isShowPinyin !== false && <div className='tipBox'>
                                <span>{wordIndex !== null && wordList[wordIndex]?.pinyin}</span>
                            </div>}
                            <div className='wordBox'>
                                <span style={getCardTxtClass()}>{wordIndex !== null && wordList[wordIndex]?.text}</span>
                            </div>
                            <div className='codeBox'>
                                <div className='codeBox-input'>
                                    <input ref={inputRefList[1]} value={userInput} onChange={(e) => inputChange(e)} />
                                    <span className="bar"></span>
                                    {(wordIndex !== null && formSetData.tip === 1) && <label>{wordList[wordIndex]?.code}</label>}
                                    {(wordIndex !== null && formSetData.tip === 2) && <label>{wordList[wordIndex]?.pinyinLazy}</label>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={cardRefList[2]} className="card card-3" >
                        <div className='card-external'>
                            <span className="card-pin"></span>
                            <div className="card-more">
                                <EllipsisOutlined />
                                <div className="multi-button card-3-button">
                                    <button title='分享' className="fas" onClick={(e) => shareWordCard(e)}>
                                        <ShareAltOutlined />
                                    </button>
                                    <button title='复制' className="fas" onClick={(e) => copyWordCard(e)}>
                                        <CopyOutlined />
                                    </button>
                                    <button title='注释' className="fas" onClick={(e) => moreWordCard(e)}>
                                        {isScreenOut ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                                    </button>
                                    <button title='收藏' className="fas" onClick={(e) => starWordCard(e)}>
                                        {isStar ? <StarFilled /> : <StarOutlined />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="x content-3">
                            {formSetData.isShowPinyin !== false && <div className='tipBox'>
                                <span>{wordIndex !== null && wordList[wordIndex]?.pinyin}</span>
                            </div>}
                            <div className='wordBox'>
                                <span style={getCardTxtClass()}>{wordIndex !== null && wordList[wordIndex]?.text}</span>
                            </div>
                            <div className='codeBox'>
                                <div className='codeBox-input'>
                                    <input ref={inputRefList[2]} value={userInput} onChange={(e) => inputChange(e)} />
                                    <span className="bar"></span>
                                    {(wordIndex !== null && formSetData.tip === 1) && <label>{wordList[wordIndex]?.code}</label>}
                                    {(wordIndex !== null && formSetData.tip === 2) && <label>{wordList[wordIndex]?.pinyinLazy}</label>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={cardRefList[3]} className="card card-4" >
                        <div className='card-external'>
                            <span className="card-pin"></span>
                            <div className="card-more">
                                <EllipsisOutlined />
                                <div className="multi-button card-4-button">
                                    <button title='分享' className="fas" onClick={(e) => shareWordCard(e)}>
                                        <ShareAltOutlined />
                                    </button>
                                    <button title='复制' className="fas" onClick={(e) => copyWordCard(e)}>
                                        <CopyOutlined />
                                    </button>
                                    <button title='注释' className="fas" onClick={(e) => moreWordCard(e)}>
                                        {isScreenOut ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                                    </button>
                                    <button title='收藏' className="fas" onClick={(e) => starWordCard(e)}>
                                        {isStar ? <StarFilled /> : <StarOutlined />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="x content-4">
                            {formSetData.isShowPinyin !== false && <div className='tipBox'>
                                <span>{wordIndex !== null && wordList[wordIndex]?.pinyin}</span>
                            </div>}
                            <div className='wordBox'>
                                <span style={getCardTxtClass()}>{wordIndex !== null && wordList[wordIndex]?.text}</span>
                            </div>
                            <div className='codeBox'>
                                <div className='codeBox-input'>
                                    <input ref={inputRefList[3]} value={userInput} onChange={(e) => inputChange(e)} />
                                    <span className="bar"></span>
                                    {(wordIndex !== null && formSetData.tip === 1) && <label>{wordList[wordIndex]?.code}</label>}
                                    {(wordIndex !== null && formSetData.tip === 2) && <label>{wordList[wordIndex]?.pinyinLazy}</label>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalDetail moreWordCard={moreWordCard} wordDetail={getWordDetailItem()} />
        </ModelWrapper>
    )
}
