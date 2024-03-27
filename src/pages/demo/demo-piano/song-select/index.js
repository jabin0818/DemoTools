import React, { useState, useEffect } from 'react'

import { Modal, Input, Button, Space, List, Divider } from 'antd'

import { LikeOutlined, MessageOutlined, StarOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { SongSelectorWrapper } from './style'

import event from '@/utils/event';

import { OBEvent } from "@/config";

import { Notes, scoremidi } from "@/utils/piano/constant";

import { changeSong, changeScore } from '@/store/actions/piano';

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getMusicScoreList } from '@/service/musicscore'

const { Search } = Input;

const count = 3;

export default function SongSelect(props) {

    const { isShowSongSelect, closeSelectModal } = props

    const [initLoading, setInitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [data, setData] = useState([]);
    // const [list, setList] = useState([
    //     {
    //         isPlay: false,
    //         loading: false,
    //         name: '童话镇',
    //         picture: '',
    //         like: 0,
    //         star: 0
    //     },
    //     {
    //         isPlay: false,
    //         loading: false,
    //         name: '贝加尔湖畔',
    //         picture: '',
    //         like: 0,
    //         star: 0
    //     },
    //     {
    //         isPlay: false,
    //         loading: false,
    //         name: '天空之城',
    //         picture: '',
    //         like: 0,
    //         star: 0
    //     },
    //     {
    //         isPlay: false,
    //         loading: false,
    //         name: 'D大调卡农',
    //         picture: '',
    //         like: 0,
    //         star: 0
    //     },
    //     {
    //         isPlay: false,
    //         loading: false,
    //         name: '小星星',
    //         picture: '',
    //         like: 0,
    //         star: 0
    //     },
    //     {
    //         isPlay: false,
    //         loading: false,
    //         name: '欢乐颂',
    //         picture: '',
    //         like: 0,
    //         star: 0
    //     }
    // ]);
    const [midiList, setMidiList] = useState(scoremidi)
    const [scoreList, setScoreList] = useState(null);

    const [lastPlayIndex, setLastPlayIndex] = useState(null)//记录上一个自动播放的项，用于播放状态图标的恢复

    const dispatch = useDispatch()
    const { mode, songIndex } = useSelector(
        (state) => ({
            mode: state.pianoState.get('mode'),
            songIndex: state.pianoState.get('songIndex'),
        }),
        shallowEqual
    )

    useEffect(() => {
        if (mode === 1 && scoreList == null) {
            // 为简谱模式，发送请求获取乐谱列表
            getScoreListData()
        } else {

        }
    }, [mode])

    const getScoreListData = async () => {
        let res = await getMusicScoreList(1, 5);
        console.log('获取乐谱列表的接口', res)
        if (res.code === 200) {
            setScoreList(res.data.records)
        }
    }

    const cancelSongSelect = () => {
        closeSelectModal()
    }

    const onSearch = (value) => console.log(value);

    const onLoadMore = () => {
        console.log('加载更多')
        // setLoading(true);
        // setList(
        //     data.concat(
        //         [...new Array(count)].map(() => ({
        //             loading: true,
        //             name: {},
        //             picture: {},
        //         })),
        //     ),
        // );
    }
    // 打字模式下选择新歌曲
    const clickSongItem = (item, index) => {
        if (!item || !item.name || index === songIndex) return
        dispatch(changeSong(item.name, index))
        event.emit(OBEvent.MUSIC_REFRESH, {
            isReStar: false,
            index: index
        })
    }
    // 简谱模式下选择新乐谱
    const clickScoreItem = (item, index) => {
        if (!item) return
        console.log(item.id)
        dispatch(changeScore(item.id))
        // event.emit(OBEvent.MUSIC_REFRESH, {
        //     isReStar: false,
        //     index: index
        // })
    }
    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const plyaAutoPiano = (item, index, type) => {
        if (midiList[index].isPlay === false) {

            if (!item || !item.name) return
            // setList((data) => {
            //     data[index].isPlay = true;
            //     return data.concat();
            // })
            setMidiList((data) => {
                if (lastPlayIndex !== null) {
                    data[lastPlayIndex].isPlay = false;
                }
                data[index].isPlay = true;
                return data.concat();
            })

            setLastPlayIndex(index)
            if (type === "numscore") {
                // 自定义简谱的方式自动播放
                // event.emit(OBEvent.AUTO_PLAY_NUM_SCORE, item.name);

            } else if (type === "midi") {
                // midi的方式自动播放
                event.emit(OBEvent.AUTO_PLAY_MIDI, item.url);

            } else if (type === "musicxml") {

            }

        }
    }
    const pauseAutoPiano = (index) => {
        // setList((data) => {
        //     data[index].isPlay = false;
        //     return data.concat();
        // })
        setMidiList((data) => {
            data[index].isPlay = false;
            return data.concat();
        })
        event.emit(OBEvent.STOP_AUTO_PLAY)
    }

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>加载更多</Button>
            </div>
        ) : null;

    return (
        <Modal
            open={isShowSongSelect}
            onCancel={() => cancelSongSelect()}
            centered={true}
            title={
                <div style={{ fontSize: '19px', textAlign: 'center' }}>
                    选择乐谱
                </div>
            }
            footer={null}
            className="songSelectModal"
        >
            <SongSelectorWrapper>
                <Search
                    placeholder="搜索乐谱"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={onSearch}
                    className="song-search"
                />
                {/* <List
                    className="music-score-list scrollbar-default-styles"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    locale={{ emptyText: '暂无乐谱' }}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <Button onClick={() => clickSongItem(item)}>选择</Button>
                            ]}
                            className='music-score-item'
                        >
                            <Space>
                                <span>{item.name}</span>
                                {item.isPlay ? <PauseCircleOutlined onClick={() => pauseAutoPiano(index)} /> : <PlayCircleOutlined onClick={() => plyaAutoPiano(item, index, "numscore")} />}
                            </Space>
                        </List.Item>
                    )}
                /> */}
                {mode === 0 ? <List
                    className="music-score-list scrollbar-default-styles"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={midiList}
                    locale={{ emptyText: '暂无乐谱' }}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Button onClick={() => clickSongItem(item, index)}>选择</Button>
                            ]}
                            className='music-score-item'
                        >
                            <Space>
                                <span>{item.name}</span>
                                {item.isPlay ? <PauseCircleOutlined onClick={() => pauseAutoPiano(index)} /> : <PlayCircleOutlined onClick={() => plyaAutoPiano(item, index, "midi")} />}
                            </Space>
                        </List.Item>
                    )}
                /> : <List
                    className="music-score-list scrollbar-default-styles"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={scoreList}
                    locale={{ emptyText: '暂无乐谱' }}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <IconText icon={StarOutlined} text={item.starNum} key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text={item.thumbsNum} key="list-vertical-like-o" />,
                                <Button onClick={() => clickScoreItem(item, index)}>选择</Button>
                            ]}
                            className='music-score-item'
                        >
                            <Space>
                                <span>{item.name}</span>
                                {item?.isPlay ? <PauseCircleOutlined onClick={() => pauseAutoPiano(index)} /> : <PlayCircleOutlined onClick={() => plyaAutoPiano(item, index, "midi")} />}
                            </Space>
                        </List.Item>
                    )}
                />}
            </SongSelectorWrapper>
        </Modal>

    )
}
