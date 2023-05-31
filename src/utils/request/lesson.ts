import { request } from '@umijs/max';

const BaseUrl = 'https://api.itso123.com/v1';

/** 发送验证码 POST /api/login/captcha */
export function getLessonList(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/admin/login', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
