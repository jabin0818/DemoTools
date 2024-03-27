import request from './request'

export function insertGraph(data) {
    return request({
        url: '/graph/diagramming',
        method: 'post',
        data: data
    })
}

export function getGraphsByClassify(classify, page, rows) {
    return request({
        url: `/graph/getDiagrams/${classify}/${page}/${rows}`,
        method: 'get',
    })
}

export function getGraphById(id) {
    return request({
        url: `/graph/getDiagram/${id}`,
        method: 'get',
    })
}

export function updateGraph(data) {
    return request({
        url: `/graph/updateDiagram`,
        method: 'put',
        data: data,
        headers: {
            'content-type': 'multipart/form-data'
        },
    })
}

export function getTemplates(type, keywords) {
    return request({
        url: `/graph/getTemplates`,
        method: 'get',
        params: {
            type,
            keywords
        }
    })
}

export function saveOfficialTemplate(data) {
    return request({
        url: '/graph/addTemplate',
        method: 'post',
        data: data,
        headers: {
            'content-type': 'multipart/form-data'
        },
    })
}

export function getTemplatesOneById(id) {
    return request({
        url: `/graph/getTemplatesById/${id}`,
        method: 'get',
    })
}

export function updateTemplateGraph(data) {
    return request({
        url: `/graph/updateTemplate`,
        method: 'put',
        data: data,
        headers: {
            'content-type': 'multipart/form-data'
        },
    })
}

export function batchDeleteGraph(ids) {
    return request({
        url: `/graph/deleteDiagrams`,
        method: 'delete',
        params: { ids }
    })
}