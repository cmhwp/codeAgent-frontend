// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 清除应用缓存 清除指定应用的AI服务缓存 DELETE /cache/evict/${param0} */
export async function evictCache(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.evictCacheParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/cache/evict/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 清除所有缓存 清除所有AI服务缓存（管理员功能） DELETE /cache/evict/all */
export async function evictAllCache(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/cache/evict/all', {
    method: 'DELETE',
    ...(options || {}),
  })
}

/** 获取缓存统计 获取AI服务缓存的统计信息（管理员） GET /cache/stats */
export async function getCacheStats(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringObject>('/cache/stats', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 预热缓存 为指定应用预热AI服务缓存 POST /cache/warmup/${param0} */
export async function warmupCache(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.warmupCacheParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/cache/warmup/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  })
}
