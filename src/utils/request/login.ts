import { request } from '@umijs/max';
import * as CryptoJS from 'crypto-js';

const isDev = process.env.NODE_ENV === 'development';
const BaseUrl = isDev ? '' : 'https://api.itso123.com';

/** 发送验证码 POST /api/login/captcha */
export function login(
  params: {
    // query
    /** 手机号 */
    username: string;
    password: string;
    type?: string;
  },
  options?: { [key: string]: any },
) {
  console.log('user pwd', params, CryptoJS);
  const user = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(params.username));
  const pwd = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(params.password));
  return request<API.FakeCaptcha>(BaseUrl + '/v1/user/manager/login', {
    method: 'POST',
    data: {
      user,
      pwd,
    },
    ...(options || {}),
  });
}
