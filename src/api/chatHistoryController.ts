// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 添加对话历史 添加一条对话历史记录 POST /chatHistory/add */
export async function addChatHistory(
  body: API.ChatHistoryAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>('/chatHistory/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取子消息 获取指定消息的所有子回复 GET /chatHistory/children/${param0} */
export async function getChildMessages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChildMessagesParams,
  options?: { [key: string]: any }
) {
  const { parentId: param0, ...queryParams } = params
  return request<API.BaseResponseListChatHistory>(`/chatHistory/children/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 获取对话上下文 获取指定应用的对话上下文 GET /chatHistory/context/${param0} */
export async function getChatContext(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatContextParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseListChatHistory>(`/chatHistory/context/${param0}`, {
    method: 'GET',
    params: {
      // maxCount has a default value: 20
      maxCount: '20',
      ...queryParams,
    },
    ...(options || {}),
  })
}

/** 删除AI回复 删除指定用户消息的所有AI回复 DELETE /chatHistory/deleteAiReplies/${param0} */
export async function deleteAiReplies(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAiRepliesParams,
  options?: { [key: string]: any }
) {
  const { parentId: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/chatHistory/deleteAiReplies/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 删除应用对话历史 删除指定应用的所有对话历史（管理员功能） DELETE /chatHistory/deleteByApp/${param0} */
export async function deleteByAppId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByAppIdParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/chatHistory/deleteByApp/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 分页获取对话历史 分页查询指定应用的对话历史 POST /chatHistory/list/page */
export async function listChatHistoryByPage(
  body: API.ChatHistoryQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageChatHistory>('/chatHistory/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 重新生成AI回复 根据用户消息重新生成AI回复（流式返回） POST /chatHistory/retry */
export async function retryGenerate(
  body: API.ChatHistoryRetryRequest,
  options?: { [key: string]: any }
) {
  return request<string[]>('/chatHistory/retry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
