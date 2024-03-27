import request from './request'

/* 获取一级简码25个 */
export function getOneLevelList() {
  return request({
    url: '/dictCard/view/getOneLevel',
    method: 'get',
  })
}

/**
 * 获取二~四级简码
 * @param {String} codeType 简码类型 2为二级简码 3为三级简码 4为全码
 * @param {String} commonType 常见程度 0为所有 1为常见 2为生僻
 * @param {String} sum 随机获取的总数 50 ~ 200 
 * @returns 
 */
export function getLevelList(codeType, commonType, sum) {
  return request({
    url: `/dictCard/view/getTwoLevel/${codeType}/${commonType}/${sum}`,
    method: 'get',
  })
}

/**
 * 获取词语
 * @param {String} sum 随机获取的总数 50 ~ 200 
 * @returns 
 */
export function getWordsList(sum) {
  return request({
    url: `/dictCard/view/getWords/${sum}`,
    method: 'get',
  })
}

/**
 * 获取成语
 * @param {String} sum 随机获取的总数 50 ~ 200 
 * @returns 
 */
export function getIdiomsList(sum) {
  return request({
    url: `/dictCard/view/getIdioms/${sum}`,
    method: 'get',
  })
}

/**
 * 添加收藏
 * @param {String} sum 随机获取的总数 50 ~ 200 
 * @returns 
 */
export function starDictcard(userId, wordId, text, code, pinyin, pinyinLazy, wordType, type, frequency, traditional, radicals, explanation, strokes) {
  return request({
    url: `/dictCard/starDictcard`,
    method: 'post',
    data: {
      userId,
      wordId,
      text,
      code,
      pinyin,
      pinyinLazy,
      wordType,
      type,
      frequency,
      traditional,
      radicals,
      explanation,
      strokes
    }
  })
}

/**
 * 取消收藏
 * @param {int} wordId
 * @param {int} userId
 * @returns 
 */
export function cancelStarDictcard(wordId, userId) {
  return request({
    url: `/dictCard/cancelStar/${wordId}/${userId}`,
    method: 'delete'
  })
}

/**
 * 获取用户收藏的词组卡片
 * @param {String} page 第几页
 * @param {String} rows 多少行
 * @param {String} keywords 关键字
 * @returns 
 */
export function getUserStarList(page, rows, wordType) {
  return request({
    url: `/dictCard/getStarWords/${page}/${rows}/${wordType}`,
    method: 'get'
  })
}

/**
 * 获取汉字详细信息（不是用户收藏的）
 * @param {String} id 汉字id
 * @param {String} text 汉字文本
 * @returns 
 */
export function getCharDetails(id, text) {
  return request({
    url: `dictCard/view/getExplanation/${id}/${text}`,
    method: 'get'
  })
}

/**
 * 获取汉字详细信息（是用户收藏的）
 * @param {String} wordId 汉字wordId
 * @param {String} userId 用户userId
 * @param {String} text 汉字文本
 * @returns 
 */
export function getUserStarCharDetails(wordId, userId, text) {
  return request({
    url: `dictCard/getExplanation/${wordId}/${userId}/${text}`,
    method: 'get'
  })
}

/**
 * 搜索
 * @param {String} keywords 
 * @param {int} type 0单字 1词语 2成语
 * @returns 
 */
export function getCharBySearch(keywords, type) {
  return request({
    url: `dictCard/view/search/${keywords}/${type}`,
    method: 'get'
  })
}