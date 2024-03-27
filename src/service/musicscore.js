import request from './request'

// 获取乐谱列表
export function getMusicScoreList(page, rows, keywords) {
    return request({
        url: `/musicscore/view/${page}/${rows}`,
        method: 'GET',
        // params: keywords
    })
}

// 获取乐谱详情
export function getMusicScoreById(id) {
    return request({
        url: `/musicscore/view/${id}`,
        method: 'GET',
    })
}

// 添加乐谱
export function addMusicScore(name, content, lyric, author) {
    return request({
        url: `/musicscore`,
        method: 'POST',
        data: { name, content, lyric, author }
    })
}