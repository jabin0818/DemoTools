import request from './request'


/* 邮箱登录 */
export function byEmailLogin(account, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      account,
      password
    },
  })
}

/* 注册 */
export function sendRegister(account, password, captchaVerification) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      account,
      password,
      captchaVerification,
    },
  })
}

/* 激活账号 */
export function activateAccount(confirmCode) {
  return request({
    url: '/user/activation',
    method: 'get',
    params: {
      confirmCode
    }
  })
}

/* 获取用户信息 */
export function getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
  })
}

/* 退出登录 */
export function userLogout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
