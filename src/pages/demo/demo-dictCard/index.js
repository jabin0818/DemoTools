import React, { useState, useRef, useEffect } from 'react'

import { DictCardWrapper } from './style'

import ModelStar from './model-star'

import ModelWubi from './model-wubi'

import DictCardSet from './dictCard-set'

import {
    SearchOutlined,
    StarOutlined,
    RollbackOutlined,
    SettingOutlined,
    ReloadOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
    EllipsisOutlined,
    ShareAltOutlined,
    CopyOutlined,
    FullscreenOutlined
} from '@ant-design/icons'

import useLocalPersistState from '@/hooks/useLocalPersistState'

import { useNavigate, useSearchParams } from "react-router-dom";

export default function DemoDictCard() {

    const navigate = useNavigate();

    const [getSearchArr] = useSearchParams();

    const wubiType = getSearchArr.getAll('type')[0]

    const starType = getSearchArr.getAll('starType')[0]

    const urlKeywords = getSearchArr.getAll('keywords')[0]

    const [dictCardModel, setDictCardModel] = useLocalPersistState(
        "wubi",
        "dictCardModel"
    )

    // previous forward refresh
    const [wubiEvent, setWubiEvent] = useState("");

    const [starEvent, setStarEvent] = useState("");

    const [isShowSetModel, setIsShowSetModel] = useState(false)

    const [setData, setSetData] = useState(null);

    const [keywords, setKeywords] = useState("");

    const [isSearch, setIsSearch] = useState(false);

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (urlKeywords) {
            setKeywords(urlKeywords);
            setIsSearch(true);
        }
    }, [])

    function closeModal(formData) {
        setSetData(formData)
        setIsShowSetModel(false)
    }
    function clearEvent(isToPinyi) {
        if (isToPinyi) {
            setWubiEvent("")
        } else {
            setStarEvent("")
        }
    }

    function changeDictCardModel() {
        if (isSearch) {
            backWubiModel(true)
        }
        if (dictCardModel === "wubi") {
            clearEvent(false)
            setDictCardModel("star");
        } else if (dictCardModel === "star") {
            clearEvent(true)
            setDictCardModel("wubi");
        } else {
            setDictCardModel("wubi");
        }
    }

    function backWubiModel(isFromSearch) {
        if (isFromSearch) {
            setStarEvent("")
            setWubiEvent("")
            setIsSearch(false);
            setKeywords("");
            searchInputRef.current.blur()
            if (wubiType && starType) {
                navigate(`/demo/dictCard?type=${wubiType}&starType=${starType}`)
            } else if (wubiType && !starType) {
                navigate(`/demo/dictCard?type=${wubiType}`)
            } else if (!wubiType && starType) {
                navigate(`/demo/dictCard?starType=${starType}`)
            } else {
                navigate(`/demo/dictCard?type=oneLevel`)
            }
        } else {
            clearEvent(true)
            setDictCardModel("wubi");
        }
    }

    function toPreviousChar() {
        if (isSearch) {
            setStarEvent("previous")
        } else {
            if (dictCardModel === "wubi") {
                setWubiEvent("previous")
            } else if (dictCardModel === "star") {
                setStarEvent("previous")
            }
        }
    }

    function toForwardChar() {
        if (isSearch) {
            setStarEvent("forward")
        } else {
            if (dictCardModel === "wubi") {
                setWubiEvent("forward")
            } else if (dictCardModel === "star") {
                setStarEvent("forward")
            }
        }
    }

    function toRefreshChar() {
        if (isSearch) {
            setStarEvent("refresh")
        } else {
            if (dictCardModel === "wubi") {
                setWubiEvent("refresh")
            } else if (dictCardModel === "star") {
                setStarEvent("refresh")
            }
        }
    }

    function searchInputOnchange(e) {
        setKeywords(e.target.value);
    }

    function searchBtn() {
        if (keywords) {
            if (wubiType) {
                if (starType) {
                    navigate(`/demo/dictCard?type=${wubiType}&starType=${starType}&keywords=${keywords}`)
                } else {
                    navigate(`/demo/dictCard?type=${wubiType}&starType=char&keywords=${keywords}`)
                }
            } else {
                navigate(`/demo/dictCard?starType=${starType}&keywords=${keywords}`)
            }
        } else {
            if (wubiType) {
                if (starType) {
                    navigate(`/demo/dictCard?type=${wubiType}&starType=${starType}`)
                } else {
                    navigate(`/demo/dictCard?type=${wubiType}&starType=char`)
                }
            } else {
                navigate(`/demo/dictCard?starType=${starType}`)
            }
        }
        setIsSearch(true);
    }

    return (
        <DictCardWrapper>
            <div className="phone">
                <div className="search">
                    <div className="search-inner">
                        <button className="search-button" onClick={() => searchBtn()}>
                            <SearchOutlined />
                        </button>
                        <input type="text" className="search-input" placeholder="搜索字词" value={keywords} onChange={(e) => searchInputOnchange(e)} ref={searchInputRef} />
                    </div>
                </div>
                {isSearch && <ModelStar clearEvent={clearEvent} event={starEvent} setData={setData} backWubiModel={backWubiModel} searchData={{ isSearch, keywords }} />}
                {!isSearch && dictCardModel === "star" && <ModelStar clearEvent={clearEvent} event={starEvent} setData={setData} backWubiModel={backWubiModel} searchData={{ isSearch, keywords }} />}
                {!isSearch && dictCardModel === "wubi" && <ModelWubi clearEvent={clearEvent} event={wubiEvent} setData={setData} />}
                <footer className="menu">
                    <div className="menu-inner">
                        {/* <a className="menu-item active"> */}
                        {/* <a className="menu-item" onClick={changeDictCardModel}>
                            {dictCardModel === "wubi" ? '五' : dictCardModel === "pinyin" ? '拼' : ''}
                        </a> */}
                        <a className="menu-item" onClick={() => toPreviousChar()}>
                            <LeftCircleOutlined />
                        </a>
                        <a className="menu-item" onClick={() => toForwardChar()}>
                            <RightCircleOutlined />
                        </a>
                        <a className="menu-item" onClick={() => toRefreshChar()}>
                            <ReloadOutlined />
                        </a>
                        <a className="menu-item" onClick={() => changeDictCardModel()}>
                            {dictCardModel === "wubi" ? <StarOutlined /> : dictCardModel === "star" ? <RollbackOutlined /> : ''}
                        </a>
                        <a className="menu-item" onClick={() => setIsShowSetModel(true)}>
                            <SettingOutlined />
                        </a>
                    </div>
                </footer>
            </div>
            <DictCardSet isShowSetModel={isShowSetModel} closeModal={closeModal} />
        </DictCardWrapper>
    )
}
