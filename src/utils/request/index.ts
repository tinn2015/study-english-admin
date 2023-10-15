// @ts-ignore
/* eslint-disable */
// API 更新时间：
// API 唯一标识：
import * as lesson from './lesson';
import * as login from './login';
import * as user from './userManage';
export default {
  ...lesson,
  ...login,
  ...user,
};

const isDev = process.env.APP_ENV === 'development';
export const BaseUrl = isDev ? 'http://devapi.itso123.com:8091/v1' : '/v1';
