import React, { useState, useEffect, useMemo } from 'react';

import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';

import { getGraphsByClassify, batchDeleteGraph } from '@/service/draw.js';

import PreviewModal from "../../preview-modal";

import { Checkbox, Space, Divider, message, Modal, Empty } from 'antd';

import {
    DeleteOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';

export default function Diagrams(props) {

    const [isManageState, setIsManageState] = useOutletContext();

    const graphClassifyData = {
        "history": {
            key: 0,
            view: "最近",
            en: "The recent"
        },
        "template_create": {
            key: 1,
            view: "模板",
            en: "The template"
        },
        "diagrams": {
            key: 2,
            view: "我的",
            en: "My graph"
        },
        "fav": {
            key: 3,
            view: "收藏",
            en: "The favorites"
        },
        "my_template": {
            key: 4,
            view: "我的模板",
            en: "My template"
        },
        "template_community": {
            key: 5,
            view: "模板社区",
            en: "The community"
        },
        "trash": {
            key: 6,
            view: "回收站",
            en: "The trash"
        },
    }

    const typeOptions = [
        {
            value: 0,
            label: '空白绘图',
        },
        {
            value: 1,
            label: '流程图'
        },
        {
            value: 2,
            label: 'UML',
        },
        {
            value: 3,
            label: '思维导图',
        },
        {
            value: 4,
            label: '组织结构图',
        },
    ]

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [graphList, setGraphList] = useState([]);

    const [total, setTotal] = useState(0);

    const [hasNext, setHasNext] = useState(false);

    const [graphClassify, setGraphClassify] = useState("");//图表分类

    const [query, setQuery] = useState({
        page: 1,
        rows: 20
    })

    const [isShowPreviewModal, setIsShowPreviewModal] = useState(false);

    const [templateInfo, setTemplateInfo] = useState(null);

    const [checkboxItems, setCheckboxItems] = useState([]);

    const [isCheckAll, setIsCheckAll] = useState(false);

    const [deleteIds, setDeleteIds] = useState([]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [])

    useEffect(() => {
        let type = pathname.split('/')[3]
        setGraphClassify(type);
        getData(graphClassifyData[type].key, query.page, query.rows)
    }, [pathname]);

    useEffect(() => {
        if (checkboxItems.findIndex(item => item === false) === -1) {
            setIsCheckAll(true);
        } else {
            setIsCheckAll(false);
        }
        let res = findIdsByIndexCondition(checkboxItems, graphList);
        setDeleteIds(res)

    }, [checkboxItems])

    function findIdsByIndexCondition(array1, array2) {
        const result = array1
            .map((value, index) => value && array2[index])
            .filter(Boolean)
            .map(obj => obj.id);

        return result;
    }

    async function getData(classify, page, rows, loadingMore) {
        let res = await getGraphsByClassify(classify, page, rows);
        console.log("获取图列表数据的接口为：", res)
        if (res.code === 200) {
            if (loadingMore) {
                setGraphList((data) => {
                    return data.concat(res.data.records)
                });
                const initialCheckedState = res.data.records.map(() => false);
                setCheckboxItems((data) => {
                    return data.concat(initialCheckedState);
                })
            } else {
                setGraphList(res.data.records);
                const initialCheckedState = res.data.records.map(() => false);
                setCheckboxItems(initialCheckedState)
            }
            if (res.data.records.length < res.data.total) {
                setHasNext(true);
            } else {
                setHasNext(false);
            }
            setTotal(res.data.total);
        }
    }

    function toDiagramming(id, title, score, index) {
        if (isManageState) {
            setCheckboxItems((data) => {
                data[index] = !data[index];
                return data.concat();
            })
            return;
        }
        if (graphClassify === "template_create" || graphClassify === "template_community" || graphClassify === "my_template") {
            console.log("打开有可编辑按钮和预览画布的modal")
            setIsShowPreviewModal(true);
            setTemplateInfo({
                id,
                title,
                score
            });
        } else {
            navigate(`/demo/draw/diagramming/${id}`)
        }
    }

    function closePreviewModal() {
        setIsShowPreviewModal(false);
    }

    function onDeleteChange(e, id) {
        // console.log(`checked = ${e.target.checked}`, id);
    }

    function onBatchChange() {
        if (isCheckAll) {
            setCheckboxItems((data) => {
                return data.map(i => false)
            })
        } else {
            setCheckboxItems((data) => {
                return data.map(i => true)
            })
        }
    }

    function batchDelete() {
        if (!deleteIds?.length) {
            message.info("请选择图表！");
            return;
        }
        Modal.confirm({
            title: '是否确定批量删除？',
            centered: true,
            async onOk() {
                let res = await batchDeleteGraph(deleteIds.join(','));
                console.log("批量删除用户图表数据的接口：", res);
                if (res.code === 200) {
                    message.success("删除成功");
                    getData(graphClassifyData[graphClassify].key, query.page, query.rows)
                } else {
                    message.error("删除失败");
                }
            },
        })

    }


    return (
        <>
            <div className='gallery-list template'>
                <div className='template-header'>
                    <div className="sub-title">
                        <h2>{graphClassifyData[graphClassify]?.view}</h2>
                        <h4>{graphClassifyData[graphClassify]?.en}</h4>
                    </div>
                    {isManageState ? <div className='batch-delete'>
                        <Space split={<Divider type="vertical" />} size={6}>
                            <Space>
                                <span>全选</span>
                                <Checkbox onChange={onBatchChange} checked={isCheckAll} style={{ marginRight: "6px" }}></Checkbox>
                            </Space>
                            <Space size={18}>
                                <span>已选择 {checkboxItems?.reduce((count, currentValue) => {
                                    if (currentValue === true) {
                                        return count + 1;
                                    } else {
                                        return count;
                                    }
                                }, 0)}/{graphList?.length}</span>
                                <span className='delete-btn' onClick={() => batchDelete()} >
                                    <DeleteOutlined className='delete-icon' />
                                    <span>删除</span>
                                </span>
                                <span className='delete-btn' onClick={() => setIsManageState(false)}>
                                    <CloseCircleOutlined className='delete-icon' />
                                    <span>取消批量操作</span>
                                </span>
                            </Space>
                        </Space>
                    </div> : null}
                </div>
                {graphList?.length === 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : <div className='case-wrap'>
                    {graphList?.map((item, index) => {
                        return <div className='case-item' key={item.id} onClick={() => toDiagramming(item.id, item.title, item.score, index)}>
                            <div className='case-thumbnail' style={{ backgroundImage: `url(${item.cover})` }}>
                                {/* {item.cover ? <img src={item.cover}></img> : null} */}
                            </div>
                            <div className='case-name'>
                                <div className='name'>
                                    {isManageState ? <Checkbox checked={checkboxItems[index]} onChange={(e) => onDeleteChange(e, item.id)} style={{ marginRight: "6px" }}></Checkbox> : null}
                                    <span className='title' title={item.title}>{item.title}</span>
                                </div>
                                <div className='type'>{typeOptions[item.graphType].label}</div>
                            </div>
                        </div>
                    })}
                </div>}
            </div>
            <PreviewModal isShowPreviewModal={isShowPreviewModal} closePreviewModal={closePreviewModal} templateInfo={templateInfo} />
        </>
    )
}
