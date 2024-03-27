import React, { useState, useRef, useEffect } from 'react'

import { useNavigate, useSearchParams, useParams, useLocation } from "react-router-dom";

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getUserStarList, starDictcard, cancelStarDictcard, getUserStarCharDetails, getCharDetails, getCharBySearch } from "@/service/dictCard"

import { message } from 'antd';

import { ModelWrapper } from '../style'

import useLocalPersistState from '@/hooks/useLocalPersistState'

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
    LeftOutlined,
    FrownOutlined
} from '@ant-design/icons'

export default function ModelPinyin(props) {

    const dispatch = useDispatch()

    const { isLogin, profile } = useSelector(
        (state) => ({
            isLogin: state.loginState.get('isLogin'),
            profile: state.loginState.get('profile'),
        }),
        shallowEqual
    )

    const { event, clearEvent, setData, backWubiModel, searchData } = props;

    const navigate = useNavigate();

    const [getSearchArr] = useSearchParams();

    const wubiType = getSearchArr.getAll('type')[0]

    const starType = getSearchArr.getAll('starType')[0]

    const keywords = getSearchArr.getAll('keywords')[0]

    const [formData, setFormData] = useLocalPersistState(
        { isShowPinyin: true, isRandom: true, tip: 1, difficulty: 1, sum: 100 },
        "dictCard_set"
    )

    const [formSetData, setFormSetData] = useState(formData)

    const tabbarRef = useRef(null);

    const [cardRefList, setCardRefList] = useState(
        [React.createRef(), React.createRef(), React.createRef(), React.createRef()]
    )

    const [inputRefList, setInputRefList] = useState(
        [React.createRef(), React.createRef(), React.createRef(), React.createRef()]
    );

    const [wordList, setWordList] = useState(null);

    const [wordIndex, setWordIndex] = useState(null);

    const [userInput, setUserInput] = useState("")

    // 分页相关的数据
    const [query, setQuery] = useState({
        page: 1,
        rows: 5,
        keywrods: ""
    });
    const [count, setCount] = useState(null);
    const [hasNext, setHasNext] = useState(false);

    const [isStarDataNull, setIsStarDataNull] = useState(false);

    const [isScreenOut, setIsScreenOut] = useState(false);

    const [wordDetailList, setWordDetailList] = useState(null);

    const [isSearchModal, setIsSearchModal] = useState(false);

    useEffect(() => {
        if (!starType) {
            if (wubiType) {
                navigate(`/demo/dictCard?type=${wubiType}&starType=char`)
            } else {
                navigate(`/demo/dictCard?starType=char`)
            }
        }
        if (keywords) {
            setIsSearchModal(true);
        }
    }, [])

    useEffect(() => {
        setIsStarDataNull(false);
        // if (isSearchModal && keywords) {
        if (keywords) {
            getSearchData(keywords)
        } else {
            getData(starType, false)
        }
    }, [starType, keywords])

    useEffect(() => {
        if (event === "" || isStarDataNull) return;
        if (event === "previous") {
            if (wordIndex === 0) {
                setWordIndex(wordList.length - 1)
            } else {
                setWordIndex(wordIndex - 1)
            }
            lastCard()
        } else if (event === "forward") {
            if (wordIndex === count - 1) {
                setWordIndex(0)
            } else if (wordIndex === wordList.length - 1) {
                // if(isSearchModal) {
                //     setWordIndex(wordIndex + 1)
                // }
                setQuery((data) => {
                    data.page += 1
                    return data
                })
                getData(starType, true)
                setWordIndex(wordIndex + 1)
            } else {
                setWordIndex(wordIndex + 1)
            }
            nextCard()
        } else if (event === "refresh") {
            if (isSearchModal) {
                getSearchData(keywords)
            } else {
                getData(starType, false)
            }
            restoreCard()
        }
        setTimeout(() => {
            clearEvent(false)
        }, 20)
    }, [event])

    useEffect(() => {
        if (userInput !== "") {
            if (wordIndex === count - 1) {
                // 结束
                if (userInput.trim() === wordList[wordIndex].text) {
                    // 结束时答对了
                    setWordIndex(0)
                    nextCard()
                }
            } else if (wordIndex === wordList.length - 1) {
                if (userInput.trim() === wordList[wordIndex].text) {
                    // why 这里和上面的不一样,setQuery不能及时更新!!! ???
                    setQuery((data) => {
                        data.page += 1
                        return data
                    })
                    setTimeout(() => {
                        getData(starType, true)
                        setWordIndex(wordIndex + 1)
                    }, 0)
                    nextCard()
                }
            } else {
                if (userInput.trim() === wordList[wordIndex].text) {
                    setWordIndex(wordIndex + 1)
                    nextCard()
                }
            }
        }
    }, [userInput])

    useEffect(() => {
        if (setData) {
            setFormSetData(setData)
        }
    }, [setData])

    useEffect(() => {
        if (searchData.isSearch) {
            setIsSearchModal(true);
        }
    }, [searchData.isSearch])

    function backBtn() {
        if (isSearchModal) {
            restoreToStar()
        }
        backWubiModel(isSearchModal)
    }

    async function getSearchData(keywords) {
        let wordType = 0;
        if (starType === "word") {
            wordType = 1;
        } else if (starType === "idiom") {
            wordType = 2;
        }
        let res = await getCharBySearch(keywords, wordType);
        // console.log("获取搜索的内容的接口", res)
        if (res.code === 200) {
            if (res.data?.length > 0) {
                setWordList(res.data);
                setWordIndex(0);
                setCount(res.data.length)
            } else {
                setIsStarDataNull(true);
                setWordList(null);
                setWordIndex(null);
                setCount(null)
            }
        }
    }

    async function getData(type, isLoadingMore) {
        if (!isLoadingMore) {
            setQuery((data) => {
                data.page = 1
                return data
            })
        }
        let starType;
        if (type === "char") {
            starType = 0;
        } else if (type === "word") {
            starType = 1;
        } else if (type === "idiom") {
            starType = 2;
        } else {
            return;
        }
        // console.log(query.page, query.rows)
        let res = await getUserStarList(query.page, query.rows, starType);
        // console.log("获取用户收藏的接口：", res)
        if (res.code === 200) {
            if (!isLoadingMore) {
                if (res.data.records.length === 0) {
                    restoreCard()
                    setWordIndex(null);
                    setWordList(null);
                    setIsStarDataNull(true);
                    return;
                }
                setWordList(res.data.records);
                setWordIndex(0);
            } else {
                setWordList((data) => {
                    return data.concat(res.data.records);
                });
            }
            setCount(res.data.total);
            if (res.data.total > res.data.records.length) {
                setHasNext(true);
            } else {
                setHasNext(false);
            }
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
                inputRefList[index].current?.focus()
            }
        }
        setUserInput("")
    }

    function nextCard(e) {
        for (let index = 0; index < 4; index++) {
            let oldClassName = cardRefList[index].current.classList[1]
            let cardNum = Number(oldClassName.split("-")[1])
            let newNum = (cardNum - 1) || 4
            let newClass = "card-" + newNum
            cardRefList[index].current.classList.replace(oldClassName, newClass)
            if (newNum === 1) {
                inputRefList[index].current?.focus()
            }
        }
        setUserInput("")
    }

    function restoreCard(e) {
        for (let index = 0; index < 4; index++) {
            let oldClassName = cardRefList[index].current.classList[1]
            let newNum = index + 1
            let newClass = "card-" + newNum
            cardRefList[index].current.classList.replace(oldClassName, newClass)
            if (newNum === 1) {
                inputRefList[index].current?.focus()
            }
        }
        setUserInput("")
    }

    function toStarType(e, typeName) {
        if (typeName === starType) {
            return;
        }
        let navAry = tabbarRef.current.children;
        for (let index = 0; index < navAry.length; index++) {
            const element = navAry[index];
            element.classList.remove("active");
        }
        e.currentTarget.classList.add("active");
        if (wubiType && keywords) {
            navigate(`/demo/dictCard?type=${wubiType}&starType=${typeName}&keywords=${keywords}`)
        } else if (wubiType && !keywords) {
            navigate(`/demo/dictCard?type=${wubiType}&starType=${typeName}`)
        } else if (!wubiType && keywords) {
            navigate(`/demo/dictCard?starType=${typeName}&keywords=${keywords}`)
        } else if (!wubiType && !keywords) {
            navigate(`/demo/dictCard?starType=${typeName}`)
        }
    }

    function restoreToStar() {
        setIsStarDataNull(false);
        setIsSearchModal(false);
        setWordList(null);
        setWordIndex(null);
        setCount(null);
    }

    async function getWordDetail(wordId, userId, text) {
        let res = await getUserStarCharDetails(wordId, userId, text);
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

    async function getSearchWordDetail(id, text) {
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
                let text = wordList[wordIndex].text;
                if (isSearchModal) {
                    let id = wordList[wordIndex].id
                    await getSearchWordDetail(id, text)
                } else {
                    let wordId = wordList[wordIndex].wordId;
                    let userId = wordList[wordIndex].userId;
                    await getWordDetail(wordId, userId, text)
                }
                getWordDetailItem()
            }
        }
    }

    async function moreWordCard(e) {
        let dom = document.getElementById("modal-container")
        e.stopPropagation();
        if (starType === "word" || starType === "idiom") {
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
        if (isSearchModal) {
            let isStar = wordList[wordIndex]?.isStar;
            if (isStar) {
                message.error("添加收藏失败，你已收藏")
            } else {
                let cardInfo = wordList[wordIndex];
                let wordType = 0;
                if (starType === "idiom") {
                    wordType = 2;
                } else if (starType === "expression") {
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
                    dom.classList.add("dictCard-wubi-stared");
                    setWordList((data) => {
                        data[wordIndex].isStar = 1;
                        let newData = [];
                        return newData.concat(data)
                    })
                } else {
                    message.error(res.msg)
                }
            }
        } else {
            if (isLogin) {
                let isStar = wordList[wordIndex]?.isStar;
                if (isStar) {
                    let wordId = wordList[wordIndex].wordId;
                    let userId = profile.id;
                    let res = await cancelStarDictcard(wordId, userId);
                    // console.log("取消收藏卡片的接口：", res);
                    if (res.code === 200) {
                        message.success("取消收藏成功！")
                        dom.classList.remove("dictCard-wubi-stared");
                        setWordList((data) => {
                            data[wordIndex].isStar = 0;
                            let newData = [];
                            return newData.concat(data)
                        })
                    } else {
                        message.error(res.msg)
                    }

                } else {
                    let cardInfo = wordList[wordIndex];
                    let res = await starDictcard(
                        profile.id,
                        cardInfo.wordId,
                        cardInfo.text,
                        cardInfo.code,
                        cardInfo.pinyin,
                        cardInfo.pinyinLazy,
                        cardInfo.wordType,
                        cardInfo.type,
                        cardInfo?.frequency,
                        cardInfo?.traditional,
                        cardInfo?.radicals,
                        cardInfo?.explanation,
                        cardInfo?.strokes,
                    );
                    // console.log("收藏卡片的接口", res);
                    if (res.code === 200) {
                        message.success("收藏成功！")
                        dom.classList.add("dictCard-wubi-stared");
                        setWordList((data) => {
                            data[wordIndex].isStar = 1;
                            let newData = [];
                            return newData.concat(data)
                        })
                    } else {
                        message.error(res.msg)
                    }
                }
            } else {
                message.error("登录后才可以进行操作哦！")
            }
        }
    }

    function inputChange(e) {
        setUserInput(e.target.value);
    }

    function getCardWidth() {
        if (starType === "word") {
            return "460px";
        } else if (starType === "idiom") {
            return "560px";
        } else {
            return "325px";
        }
    }

    function getCardTxtClass() {
        let text = wordIndex !== null ? wordList[wordIndex]?.text : null;
        if (!text) return;
        if (starType === "idiom") {
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
        }
    }



    return (
        <ModelWrapper>
            <div className="navigation" ref={tabbarRef}>
                <a className="navigation-item" onClick={() => backBtn()}>
                    <LeftOutlined />
                    返回
                </a>
                <a onClick={(e) => toStarType(e, "char")} className={"navigation-item" + " " + (starType === "char" ? "active" : "")}>单字</a>
                <a onClick={(e) => toStarType(e, "word")} className={"navigation-item" + " " + (starType === "word" ? "active" : "")}>词语</a>
                <a onClick={(e) => toStarType(e, "idiom")} className={"navigation-item" + " " + (starType === "idiom" ? "active" : "")}>成语</a>
            </div>
            <div className="currently-playing">
                <div className="container" style={{ width: getCardWidth() }}>
                    {wordIndex !== null && <div className="progress">
                        <span>{wordIndex + 1}</span>
                        <span>/</span>
                        <span>{count ? count : "0"}</span>
                    </div>}
                    <div ref={cardRefList[0]} className="card card-1" >
                        {isStarDataNull ? <>
                            <div className='card-external'>
                                <span className="card-pin"></span>
                            </div>
                            <div className="x content-1">
                                <div className='nullData'>
                                    <span className='nullData-text'>无数据</span>
                                    <FrownOutlined />
                                </div>
                            </div>
                        </> : (
                            <>
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
                                                <FullscreenOutlined />
                                            </button>
                                            <button title='收藏' className={"fas" + " " + ((wordIndex !== null && wordList[wordIndex]?.isStar) ? "dictCard-wubi-stared" : "")} onClick={(e) => starWordCard(e)}>
                                                {(wordIndex !== null && wordList[wordIndex]?.isStar) ? <StarFilled /> : <StarOutlined />}
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
                            </>)}
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
                                        <FullscreenOutlined />
                                    </button>
                                    <button title='收藏' className={"fas" + " " + ((wordIndex !== null && wordList[wordIndex]?.isStar) ? "dictCard-wubi-stared" : "")} onClick={(e) => starWordCard(e)}>
                                        {(wordIndex !== null && wordList[wordIndex]?.isStar) ? <StarFilled /> : <StarOutlined />}
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
                                        <FullscreenOutlined />
                                    </button>
                                    <button title='收藏' className={"fas" + " " + ((wordIndex !== null && wordList[wordIndex]?.isStar) ? "dictCard-wubi-stared" : "")} onClick={(e) => starWordCard(e)}>
                                        {(wordIndex !== null && wordList[wordIndex]?.isStar) ? <StarFilled /> : <StarOutlined />}
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
                                        <FullscreenOutlined />
                                    </button>
                                    <button title='收藏' className={"fas" + " " + ((wordIndex !== null && wordList[wordIndex]?.isStar) ? "dictCard-wubi-stared" : "")} onClick={(e) => starWordCard(e)}>
                                        {(wordIndex !== null && wordList[wordIndex]?.isStar) ? <StarFilled /> : <StarOutlined />}
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
        </ModelWrapper >
    )
}
