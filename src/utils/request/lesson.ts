import { request } from '@umijs/max';

const isDev = process.env.APP_ENV === 'development';
const BaseUrl = isDev ? 'http://devapi.itso123.com:8091/v1' : '/v1';

console.log('process.env.APP_ENV', process.env.APP_ENV);
console.log('BaseUrl', BaseUrl);

/** 发送验证码 POST /api/login/captcha */
export function getLessonList(
  params: {
    page: number;
    size: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>(BaseUrl + '/admin/lesson/list', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 添加课程
 * @param params
 * @param options
 * @returns
 */
export function addLesson(
  params: {
    title: string;
    level: string;
    class: string;
    img: string;
    descript: string;
    sections: {
      title: string;
      descript: string;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>(BaseUrl + '/admin/lesson/add', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 获取课程详情
 * @param id
 * @returns
 */
export function getLessonDetail(id: number) {
  return request(`${BaseUrl}/admin/lesson/detail/${id}`, {
    method: 'POST',
    data: {
      id,
    },
  });
}

/**
 * 添加、修改章节
 * @param id
 * @returns
 */
export function sectionAdd(data: {
  lessonId: number;
  sections: {
    id: string;
    title: string;
    contexts: string;
  }[];
}) {
  return request(`${BaseUrl}/admin/section/add`, {
    method: 'POST',
    data,
  });
}

/**
 * 课程状态更新
 * @param id
 * @returns
 */
export function updateLessonStatus(data: { id: number; inUse: number }) {
  return request(`${BaseUrl}/admin/lesson/state/update`, {
    method: 'POST',
    data,
  });
}

/**
 * 生成tts和翻译
 * @param id
 * @returns
 */
export function genTtsCn(id: number) {
  return request(`${BaseUrl}/admin/lesson/ttscn/generate/${id}`, {
    method: 'POST',
    data: {
      id,
    },
  });
}
