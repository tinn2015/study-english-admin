import { request } from '@umijs/max';

const isDev = process.env.NODE_ENV === 'development';
const BaseUrl = isDev ? '' : 'https://api.itso123.com';

console.log('BaseUrl', BaseUrl);

/** 发送验证码 POST /api/login/captcha */
export function getLessonList(
  params: {
    page: number;
    size: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>(BaseUrl + '/v1/admin/lesson/list', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
