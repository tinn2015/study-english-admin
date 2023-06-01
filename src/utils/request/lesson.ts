import { request } from '@umijs/max';

const BaseUrl = 'https://api.itso123.com';

/** 发送验证码 POST /api/login/captcha */
export function getLessonList(
  params: {
    page: number;
    size: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/v1/admin/lesson/list', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
