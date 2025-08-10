// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询登录状态 查询当前用户是否已登录 GET /auth/isLogin */
export async function isLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringObject>('/auth/isLogin', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 踢人下线 将指定用户踢下线 POST /auth/kickout */
export async function kickout(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.kickoutParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseString>('/auth/kickout', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 用户注销 退出登录 POST /auth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/auth/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

/** Token信息 获取当前Token的详细信息 GET /auth/tokenInfo */
export async function tokenInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringObject>('/auth/tokenInfo', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 获取用户信息 获取当前登录用户的详细信息 GET /auth/userInfo */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringObject>('/auth/userInfo', {
    method: 'GET',
    ...(options || {}),
  })
}
