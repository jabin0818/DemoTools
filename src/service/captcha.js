// import request from '@/utils/request';
import request from './request'

export async function getPicture(params) {
  return request('/captcha/get', {
    method: 'POST',
    data: params,
  });
}
export async function reqCheck(params) {
  return request('/captcha/check', {
    method: 'POST',
    data: params,
  });
}
