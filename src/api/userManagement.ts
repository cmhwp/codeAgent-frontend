// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 封禁用户 封禁指定用户 POST /user/admin/ban */
export async function banUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.banUserParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>('/user/admin/ban', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 批量操作用户 批量删除、封禁、解封用户 POST /user/admin/batch-operation */
export async function batchOperateUsers(
  body: API.BatchUserOperationRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseMapStringObject>('/user/admin/batch-operation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 管理员删除用户 管理员删除指定用户 POST /user/admin/delete */
export async function deleteUserByAdmin(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/admin/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 强制用户下线 强制指定用户下线 POST /user/admin/kickout */
export async function kickoutUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.kickoutUserParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>('/user/admin/kickout', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 管理员用户列表 管理员分页获取用户列表 POST /user/admin/list/page/vo */
export async function listUserVoByPageByAdmin(
  body: API.UserQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserVO>('/user/admin/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户统计 获取用户统计信息 GET /user/admin/stats */
export async function getUserStats(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringObject>('/user/admin/stats', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 解封用户 解封指定用户 POST /user/admin/unban */
export async function unbanUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unbanUserParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>('/user/admin/unban', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 管理员更新用户 管理员更新用户信息 POST /user/admin/update */
export async function updateUserByAdmin(
  body: API.UserAdminUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>('/user/admin/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 绑定邮箱 绑定邮箱到当前用户 POST /user/bind-email */
export async function bindEmail(body: API.BindEmailRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/bind-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改密码 修改当前用户密码 POST /user/change-password */
export async function changePassword(
  body: API.ChangePasswordRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>('/user/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据id获取用户 根据id获取用户（仅管理员） GET /user/get */
export async function getUserById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUser>('/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取当前登录用户 获取当前登录用户 GET /user/get/login */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/user/get/login', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 根据id获取用户信息 根据id获取脱敏的用户信息 GET /user/get/vo */
export async function getUserVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO>('/user/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 用户登录 用户登录 POST /user/login */
export async function userLogin(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户注销 用户注销 POST /user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

/** 获取我的权限 获取当前登录用户的角色和权限 GET /user/my-permissions */
export async function getMyPermissions(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringObject>('/user/my-permissions', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 获取用户权限 获取指定用户的权限列表 GET /user/permissions/${param0} */
export async function getUserPermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserPermissionsParams,
  options?: { [key: string]: any }
) {
  const { userId: param0, ...queryParams } = params
  return request<API.BaseResponseListString>(`/user/permissions/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 用户注册 用户注册 POST /user/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 重置密码 通过邮箱验证码重置密码 POST /user/reset-password */
export async function resetPassword(
  body: API.ResetPasswordRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>('/user/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取用户角色 获取指定用户的角色列表 GET /user/roles/${param0} */
export async function getUserRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserRolesParams,
  options?: { [key: string]: any }
) {
  const { userId: param0, ...queryParams } = params
  return request<API.BaseResponseListString>(`/user/roles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 发送验证码 发送邮箱验证码 POST /user/send-code */
export async function sendCode(body: API.SendCodeRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/send-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新用户角色 更新指定用户的角色（仅管理员） POST /user/update-role */
export async function updateUserRole(
  body: API.UpdateUserRoleRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>('/user/update-role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 更新个人信息 更新当前登录用户的个人信息 POST /user/update/my */
export async function updateMyUser(
  body: API.UserUpdateMyRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>('/user/update/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
