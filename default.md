# OpenAPI definition


**简介**:OpenAPI definition


**HOST**:http://localhost:8123


**联系人**:


**Version**:v0


**接口路径**:/v3/api-docs/default


[TOC]






# appManagement


## 创建应用


**接口地址**:`/app/add`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建新的应用</p>



**请求示例**:


```javascript
{
  "initPrompt": "",
  "cover": "",
  "codeGenType": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appAddRequest|应用创建请求|body|true|AppAddRequest|AppAddRequest|
|&emsp;&emsp;initPrompt|应用初始化的 prompt||true|string||
|&emsp;&emsp;cover|应用封面URL||false|string||
|&emsp;&emsp;codeGenType|代码生成类型：html-原生HTML模式，multi_file-原生多文件模式||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseLong|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||integer(int64)|integer(int64)|
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": 0,
	"message": "",
	"success": true
}
```


## 管理员删除应用


**接口地址**:`/app/admin/delete`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员删除指定应用</p>



**请求示例**:


```javascript
{
  "id": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|deleteRequest|DeleteRequest|body|true|DeleteRequest|DeleteRequest|
|&emsp;&emsp;id|||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 管理员获取应用详情


**接口地址**:`/app/admin/get/vo`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员根据ID获取应用详细信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseAppVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||AppVO|AppVO|
|&emsp;&emsp;id|id|integer(int64)||
|&emsp;&emsp;appName|应用名称|string||
|&emsp;&emsp;cover|应用封面|string||
|&emsp;&emsp;initPrompt|应用初始化的 prompt|string||
|&emsp;&emsp;codeGenType|代码生成类型|string||
|&emsp;&emsp;deployKey|部署标识|string||
|&emsp;&emsp;deployedTime|部署时间|string(date-time)||
|&emsp;&emsp;priority|优先级|integer(int32)||
|&emsp;&emsp;userId|创建用户id|integer(int64)||
|&emsp;&emsp;editTime|编辑时间|string(date-time)||
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;user|用户信息|UserVO|UserVO|
|&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer||
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;lastLoginTime|最后登录时间|string||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"id": 0,
		"appName": "",
		"cover": "",
		"initPrompt": "",
		"codeGenType": "",
		"deployKey": "",
		"deployedTime": "",
		"priority": 0,
		"userId": 0,
		"editTime": "",
		"createTime": "",
		"updateTime": "",
		"user": {
			"id": 0,
			"userAccount": "",
			"userName": "",
			"userAvatar": "",
			"userProfile": "",
			"userEmail": "",
			"userRole": "",
			"userStatus": 0,
			"createTime": "",
			"updateTime": "",
			"lastLoginTime": ""
		}
	},
	"message": "",
	"success": true
}
```


## 管理员应用列表


**接口地址**:`/app/admin/list/page/vo`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员分页获取应用列表</p>



**请求示例**:


```javascript
{
  "pageNum": 0,
  "pageSize": 0,
  "sortField": "",
  "sortOrder": "",
  "id": 0,
  "appName": "",
  "initPrompt": "",
  "codeGenType": "",
  "priority": 0,
  "userId": 0,
  "searchText": "",
  "ascending": true,
  "offset": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appQueryRequest|应用查询请求|body|true|AppQueryRequest|AppQueryRequest|
|&emsp;&emsp;pageNum|||false|integer(int32)||
|&emsp;&emsp;pageSize|||false|integer(int32)||
|&emsp;&emsp;sortField|||false|string||
|&emsp;&emsp;sortOrder|||false|string||
|&emsp;&emsp;id|应用ID||false|integer(int64)||
|&emsp;&emsp;appName|应用名称||false|string||
|&emsp;&emsp;initPrompt|应用初始化的 prompt||false|string||
|&emsp;&emsp;codeGenType|代码生成类型：html-原生HTML模式，multi_file-原生多文件模式||false|string||
|&emsp;&emsp;priority|优先级||false|integer(int32)||
|&emsp;&emsp;userId|创建用户ID||false|integer(int64)||
|&emsp;&emsp;searchText|搜索关键词||false|string||
|&emsp;&emsp;ascending|||false|boolean||
|&emsp;&emsp;offset|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponsePageAppVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageAppVO|PageAppVO|
|&emsp;&emsp;records|应用信息|array|AppVO|
|&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;appName|应用名称|string||
|&emsp;&emsp;&emsp;&emsp;cover|应用封面|string||
|&emsp;&emsp;&emsp;&emsp;initPrompt|应用初始化的 prompt|string||
|&emsp;&emsp;&emsp;&emsp;codeGenType|代码生成类型|string||
|&emsp;&emsp;&emsp;&emsp;deployKey|部署标识|string||
|&emsp;&emsp;&emsp;&emsp;deployedTime|部署时间|string||
|&emsp;&emsp;&emsp;&emsp;priority|优先级|integer||
|&emsp;&emsp;&emsp;&emsp;userId|创建用户id|integer||
|&emsp;&emsp;&emsp;&emsp;editTime|编辑时间|string||
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;user|用户信息|UserVO|UserVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;lastLoginTime|最后登录时间|string||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageAppVO|PageAppVO|
|&emsp;&emsp;searchCount||PageAppVO|PageAppVO|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [
			{
				"id": 0,
				"appName": "",
				"cover": "",
				"initPrompt": "",
				"codeGenType": "",
				"deployKey": "",
				"deployedTime": "",
				"priority": 0,
				"userId": 0,
				"editTime": "",
				"createTime": "",
				"updateTime": "",
				"user": {
					"id": 0,
					"userAccount": "",
					"userName": "",
					"userAvatar": "",
					"userProfile": "",
					"userEmail": "",
					"userRole": "",
					"userStatus": 0,
					"createTime": "",
					"updateTime": "",
					"lastLoginTime": ""
				}
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	},
	"message": "",
	"success": true
}
```


## 管理员更新应用


**接口地址**:`/app/admin/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员更新应用信息</p>



**请求示例**:


```javascript
{
  "id": 0,
  "appName": "",
  "cover": "",
  "initPrompt": "",
  "codeGenType": "",
  "priority": 0,
  "userId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appAdminUpdateRequest|应用更新请求（管理员）|body|true|AppAdminUpdateRequest|AppAdminUpdateRequest|
|&emsp;&emsp;id|应用ID||true|integer(int64)||
|&emsp;&emsp;appName|应用名称||false|string||
|&emsp;&emsp;cover|应用封面URL||false|string||
|&emsp;&emsp;initPrompt|应用初始化的 prompt||false|string||
|&emsp;&emsp;codeGenType|代码生成类型：html-原生HTML模式，multi_file-原生多文件模式||false|string||
|&emsp;&emsp;priority|优先级||false|integer(int32)||
|&emsp;&emsp;userId|创建用户ID||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 对话生成代码


**接口地址**:`/app/chat/gen/code`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`text/event-stream`


**接口描述**:<p>通过对话生成应用代码（流式响应）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appId||query|true|integer(int64)||
|message||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ServerSentEventString|


**响应参数**:


暂无


**响应示例**:
```javascript
[
	null
]
```


## 删除应用


**接口地址**:`/app/delete`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>删除应用（用户只能删除自己的应用）</p>



**请求示例**:


```javascript
{
  "id": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|deleteRequest|DeleteRequest|body|true|DeleteRequest|DeleteRequest|
|&emsp;&emsp;id|||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 应用部署


**接口地址**:`/app/deploy`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>部署应用并返回访问URL</p>



**请求示例**:


```javascript
{
  "appId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appDeployRequest|应用部署请求|body|true|AppDeployRequest|AppDeployRequest|
|&emsp;&emsp;appId|应用ID||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||string||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": "",
	"message": "",
	"success": true
}
```


## 下载应用代码


**接口地址**:`/app/download/{appId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>下载应用代码</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK||


**响应参数**:


暂无


**响应示例**:
```javascript

```


## 获取应用详情


**接口地址**:`/app/get/vo`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据ID获取应用详细信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseAppVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||AppVO|AppVO|
|&emsp;&emsp;id|id|integer(int64)||
|&emsp;&emsp;appName|应用名称|string||
|&emsp;&emsp;cover|应用封面|string||
|&emsp;&emsp;initPrompt|应用初始化的 prompt|string||
|&emsp;&emsp;codeGenType|代码生成类型|string||
|&emsp;&emsp;deployKey|部署标识|string||
|&emsp;&emsp;deployedTime|部署时间|string(date-time)||
|&emsp;&emsp;priority|优先级|integer(int32)||
|&emsp;&emsp;userId|创建用户id|integer(int64)||
|&emsp;&emsp;editTime|编辑时间|string(date-time)||
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;user|用户信息|UserVO|UserVO|
|&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer||
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;lastLoginTime|最后登录时间|string||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"id": 0,
		"appName": "",
		"cover": "",
		"initPrompt": "",
		"codeGenType": "",
		"deployKey": "",
		"deployedTime": "",
		"priority": 0,
		"userId": 0,
		"editTime": "",
		"createTime": "",
		"updateTime": "",
		"user": {
			"id": 0,
			"userAccount": "",
			"userName": "",
			"userAvatar": "",
			"userProfile": "",
			"userEmail": "",
			"userRole": "",
			"userStatus": 0,
			"createTime": "",
			"updateTime": "",
			"lastLoginTime": ""
		}
	},
	"message": "",
	"success": true
}
```


## 精选应用列表


**接口地址**:`/app/good/list/page/vo`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>分页获取精选应用列表</p>



**请求示例**:


```javascript
{
  "pageNum": 0,
  "pageSize": 0,
  "sortField": "",
  "sortOrder": "",
  "id": 0,
  "appName": "",
  "initPrompt": "",
  "codeGenType": "",
  "priority": 0,
  "userId": 0,
  "searchText": "",
  "ascending": true,
  "offset": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appQueryRequest|应用查询请求|body|true|AppQueryRequest|AppQueryRequest|
|&emsp;&emsp;pageNum|||false|integer(int32)||
|&emsp;&emsp;pageSize|||false|integer(int32)||
|&emsp;&emsp;sortField|||false|string||
|&emsp;&emsp;sortOrder|||false|string||
|&emsp;&emsp;id|应用ID||false|integer(int64)||
|&emsp;&emsp;appName|应用名称||false|string||
|&emsp;&emsp;initPrompt|应用初始化的 prompt||false|string||
|&emsp;&emsp;codeGenType|代码生成类型：html-原生HTML模式，multi_file-原生多文件模式||false|string||
|&emsp;&emsp;priority|优先级||false|integer(int32)||
|&emsp;&emsp;userId|创建用户ID||false|integer(int64)||
|&emsp;&emsp;searchText|搜索关键词||false|string||
|&emsp;&emsp;ascending|||false|boolean||
|&emsp;&emsp;offset|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponsePageAppVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageAppVO|PageAppVO|
|&emsp;&emsp;records|应用信息|array|AppVO|
|&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;appName|应用名称|string||
|&emsp;&emsp;&emsp;&emsp;cover|应用封面|string||
|&emsp;&emsp;&emsp;&emsp;initPrompt|应用初始化的 prompt|string||
|&emsp;&emsp;&emsp;&emsp;codeGenType|代码生成类型|string||
|&emsp;&emsp;&emsp;&emsp;deployKey|部署标识|string||
|&emsp;&emsp;&emsp;&emsp;deployedTime|部署时间|string||
|&emsp;&emsp;&emsp;&emsp;priority|优先级|integer||
|&emsp;&emsp;&emsp;&emsp;userId|创建用户id|integer||
|&emsp;&emsp;&emsp;&emsp;editTime|编辑时间|string||
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;user|用户信息|UserVO|UserVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;lastLoginTime|最后登录时间|string||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageAppVO|PageAppVO|
|&emsp;&emsp;searchCount||PageAppVO|PageAppVO|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [
			{
				"id": 0,
				"appName": "",
				"cover": "",
				"initPrompt": "",
				"codeGenType": "",
				"deployKey": "",
				"deployedTime": "",
				"priority": 0,
				"userId": 0,
				"editTime": "",
				"createTime": "",
				"updateTime": "",
				"user": {
					"id": 0,
					"userAccount": "",
					"userName": "",
					"userAvatar": "",
					"userProfile": "",
					"userEmail": "",
					"userRole": "",
					"userStatus": 0,
					"createTime": "",
					"updateTime": "",
					"lastLoginTime": ""
				}
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	},
	"message": "",
	"success": true
}
```


## 我的应用列表


**接口地址**:`/app/my/list/page/vo`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>分页获取当前用户创建的应用列表</p>



**请求示例**:


```javascript
{
  "pageNum": 0,
  "pageSize": 0,
  "sortField": "",
  "sortOrder": "",
  "id": 0,
  "appName": "",
  "initPrompt": "",
  "codeGenType": "",
  "priority": 0,
  "userId": 0,
  "searchText": "",
  "ascending": true,
  "offset": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appQueryRequest|应用查询请求|body|true|AppQueryRequest|AppQueryRequest|
|&emsp;&emsp;pageNum|||false|integer(int32)||
|&emsp;&emsp;pageSize|||false|integer(int32)||
|&emsp;&emsp;sortField|||false|string||
|&emsp;&emsp;sortOrder|||false|string||
|&emsp;&emsp;id|应用ID||false|integer(int64)||
|&emsp;&emsp;appName|应用名称||false|string||
|&emsp;&emsp;initPrompt|应用初始化的 prompt||false|string||
|&emsp;&emsp;codeGenType|代码生成类型：html-原生HTML模式，multi_file-原生多文件模式||false|string||
|&emsp;&emsp;priority|优先级||false|integer(int32)||
|&emsp;&emsp;userId|创建用户ID||false|integer(int64)||
|&emsp;&emsp;searchText|搜索关键词||false|string||
|&emsp;&emsp;ascending|||false|boolean||
|&emsp;&emsp;offset|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponsePageAppVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageAppVO|PageAppVO|
|&emsp;&emsp;records|应用信息|array|AppVO|
|&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;appName|应用名称|string||
|&emsp;&emsp;&emsp;&emsp;cover|应用封面|string||
|&emsp;&emsp;&emsp;&emsp;initPrompt|应用初始化的 prompt|string||
|&emsp;&emsp;&emsp;&emsp;codeGenType|代码生成类型|string||
|&emsp;&emsp;&emsp;&emsp;deployKey|部署标识|string||
|&emsp;&emsp;&emsp;&emsp;deployedTime|部署时间|string||
|&emsp;&emsp;&emsp;&emsp;priority|优先级|integer||
|&emsp;&emsp;&emsp;&emsp;userId|创建用户id|integer||
|&emsp;&emsp;&emsp;&emsp;editTime|编辑时间|string||
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;user|用户信息|UserVO|UserVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;lastLoginTime|最后登录时间|string||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageAppVO|PageAppVO|
|&emsp;&emsp;searchCount||PageAppVO|PageAppVO|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [
			{
				"id": 0,
				"appName": "",
				"cover": "",
				"initPrompt": "",
				"codeGenType": "",
				"deployKey": "",
				"deployedTime": "",
				"priority": 0,
				"userId": 0,
				"editTime": "",
				"createTime": "",
				"updateTime": "",
				"user": {
					"id": 0,
					"userAccount": "",
					"userName": "",
					"userAvatar": "",
					"userProfile": "",
					"userEmail": "",
					"userRole": "",
					"userStatus": 0,
					"createTime": "",
					"updateTime": "",
					"lastLoginTime": ""
				}
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	},
	"message": "",
	"success": true
}
```


## 更新应用


**接口地址**:`/app/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新应用信息（用户只能更新自己的应用）</p>



**请求示例**:


```javascript
{
  "id": 0,
  "appName": "",
  "cover": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appUpdateRequest|应用更新请求（用户）|body|true|AppUpdateRequest|AppUpdateRequest|
|&emsp;&emsp;id|应用ID||true|integer(int64)||
|&emsp;&emsp;appName|应用名称||false|string||
|&emsp;&emsp;cover|应用封面URL||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


# authStatus


## 查询登录状态


**接口地址**:`/auth/isLogin`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>查询当前用户是否已登录</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseMapStringObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"success": true
}
```


## 踢人下线


**接口地址**:`/auth/kickout`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>将指定用户踢下线</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|loginId||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||string||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": "",
	"message": "",
	"success": true
}
```


## 用户注销


**接口地址**:`/auth/logout`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>退出登录</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||string||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": "",
	"message": "",
	"success": true
}
```


## Token信息


**接口地址**:`/auth/tokenInfo`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前Token的详细信息</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseMapStringObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"success": true
}
```


## 获取用户信息


**接口地址**:`/auth/userInfo`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前登录用户的详细信息</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseMapStringObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"success": true
}
```


# CacheController


## 清除应用缓存


**接口地址**:`/cache/evict/{appId}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>清除指定应用的AI服务缓存</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appId|应用ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 清除所有缓存


**接口地址**:`/cache/evict/all`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>清除所有AI服务缓存（管理员功能）</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 获取缓存统计


**接口地址**:`/cache/stats`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取AI服务缓存的统计信息（管理员）</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseMapStringObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"success": true
}
```


## 预热缓存


**接口地址**:`/cache/warmup/{appId}`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>为指定应用预热AI服务缓存</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appId|应用ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


# ChatHistoryController


## 添加对话历史


**接口地址**:`/chatHistory/add`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>添加一条对话历史记录</p>



**请求示例**:


```javascript
{
  "message": "",
  "messageType": "",
  "appId": 0,
  "parentId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|chatHistoryAddRequest|对话历史添加请求|body|true|ChatHistoryAddRequest|ChatHistoryAddRequest|
|&emsp;&emsp;message|消息内容||true|string||
|&emsp;&emsp;messageType|消息类型：user/ai||true|string||
|&emsp;&emsp;appId|应用id||true|integer(int64)||
|&emsp;&emsp;parentId|父消息id（用于上下文关联）||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseLong|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||integer(int64)|integer(int64)|
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": 0,
	"message": "",
	"success": true
}
```


## 获取子消息


**接口地址**:`/chatHistory/children/{parentId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取指定消息的所有子回复</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|parentId|父消息ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseListChatHistory|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|ChatHistory|
|&emsp;&emsp;id|id|integer(int64)||
|&emsp;&emsp;message|消息|string||
|&emsp;&emsp;messageType|消息类型：user/ai|string||
|&emsp;&emsp;appId|应用id|integer(int64)||
|&emsp;&emsp;userId|创建用户id|integer(int64)||
|&emsp;&emsp;parentId|父消息id（用于上下文关联）|integer(int64)||
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;isDelete|是否删除|integer(int32)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"id": 0,
			"message": "",
			"messageType": "",
			"appId": 0,
			"userId": 0,
			"parentId": 0,
			"createTime": "",
			"updateTime": "",
			"isDelete": 0
		}
	],
	"message": "",
	"success": true
}
```


## 获取对话上下文


**接口地址**:`/chatHistory/context/{appId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取指定应用的对话上下文</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appId|应用ID|path|true|integer(int64)||
|maxCount|最大条数|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseListChatHistory|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|ChatHistory|
|&emsp;&emsp;id|id|integer(int64)||
|&emsp;&emsp;message|消息|string||
|&emsp;&emsp;messageType|消息类型：user/ai|string||
|&emsp;&emsp;appId|应用id|integer(int64)||
|&emsp;&emsp;userId|创建用户id|integer(int64)||
|&emsp;&emsp;parentId|父消息id（用于上下文关联）|integer(int64)||
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;isDelete|是否删除|integer(int32)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"id": 0,
			"message": "",
			"messageType": "",
			"appId": 0,
			"userId": 0,
			"parentId": 0,
			"createTime": "",
			"updateTime": "",
			"isDelete": 0
		}
	],
	"message": "",
	"success": true
}
```


## 删除AI回复


**接口地址**:`/chatHistory/deleteAiReplies/{parentId}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除指定用户消息的所有AI回复</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|parentId|父消息ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 删除应用对话历史


**接口地址**:`/chatHistory/deleteByApp/{appId}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除指定应用的所有对话历史（管理员功能）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appId|应用ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 分页获取对话历史


**接口地址**:`/chatHistory/list/page`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>分页查询指定应用的对话历史</p>



**请求示例**:


```javascript
{
  "pageNum": 0,
  "pageSize": 0,
  "sortField": "",
  "sortOrder": "",
  "id": 0,
  "message": "",
  "messageType": "",
  "appId": 0,
  "userId": 0,
  "parentId": 0,
  "lastCreateTime": "",
  "ascending": true,
  "offset": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|chatHistoryQueryRequest|对话历史查询请求|body|true|ChatHistoryQueryRequest|ChatHistoryQueryRequest|
|&emsp;&emsp;pageNum|||false|integer(int32)||
|&emsp;&emsp;pageSize|||false|integer(int32)||
|&emsp;&emsp;sortField|||false|string||
|&emsp;&emsp;sortOrder|||false|string||
|&emsp;&emsp;id|id||false|integer(int64)||
|&emsp;&emsp;message|消息内容||false|string||
|&emsp;&emsp;messageType|消息类型（user/ai）||false|string||
|&emsp;&emsp;appId|应用id||false|integer(int64)||
|&emsp;&emsp;userId|创建用户id||false|integer(int64)||
|&emsp;&emsp;parentId|父消息id||false|integer(int64)||
|&emsp;&emsp;lastCreateTime|游标查询 - 最后一条记录的创建时间，用于分页查询，获取早于此时间的记录||false|string(date-time)||
|&emsp;&emsp;ascending|||false|boolean||
|&emsp;&emsp;offset|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponsePageChatHistory|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageChatHistory|PageChatHistory|
|&emsp;&emsp;records|对话历史|array|ChatHistory|
|&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;message|消息|string||
|&emsp;&emsp;&emsp;&emsp;messageType|消息类型：user/ai|string||
|&emsp;&emsp;&emsp;&emsp;appId|应用id|integer||
|&emsp;&emsp;&emsp;&emsp;userId|创建用户id|integer||
|&emsp;&emsp;&emsp;&emsp;parentId|父消息id（用于上下文关联）|integer||
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;isDelete|是否删除|integer||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageChatHistory|PageChatHistory|
|&emsp;&emsp;searchCount||PageChatHistory|PageChatHistory|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [
			{
				"id": 0,
				"message": "",
				"messageType": "",
				"appId": 0,
				"userId": 0,
				"parentId": 0,
				"createTime": "",
				"updateTime": "",
				"isDelete": 0
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	},
	"message": "",
	"success": true
}
```


## 重新生成AI回复


**接口地址**:`/chatHistory/retry`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`text/event-stream`


**接口描述**:<p>根据用户消息重新生成AI回复（流式返回）</p>



**请求示例**:


```javascript
{
  "userMessageId": 0,
  "appId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|chatHistoryRetryRequest|对话历史重试请求|body|true|ChatHistoryRetryRequest|ChatHistoryRetryRequest|
|&emsp;&emsp;userMessageId|用户消息id（即需要重新生成AI回复的用户消息）||true|integer(int64)||
|&emsp;&emsp;appId|应用id||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK||


**响应参数**:


暂无


**响应示例**:
```javascript

```


# userManagement


## 封禁用户


**接口地址**:`/user/admin/ban`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>封禁指定用户</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 批量操作用户


**接口地址**:`/user/admin/batch-operation`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>批量删除、封禁、解封用户</p>



**请求示例**:


```javascript
{
  "userIds": [],
  "operation": "",
  "parameter": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|batchUserOperationRequest|批量用户操作请求|body|true|BatchUserOperationRequest|BatchUserOperationRequest|
|&emsp;&emsp;userIds|用户ID列表||true|array|integer(int64)|
|&emsp;&emsp;operation|操作类型：delete-删除，ban-封禁，unban-解封，role-修改角色||true|string||
|&emsp;&emsp;parameter|操作参数（如角色类型）||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseMapStringObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"success": true
}
```


## 管理员删除用户


**接口地址**:`/user/admin/delete`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员删除指定用户</p>



**请求示例**:


```javascript
{
  "id": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|deleteRequest|DeleteRequest|body|true|DeleteRequest|DeleteRequest|
|&emsp;&emsp;id|||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 强制用户下线


**接口地址**:`/user/admin/kickout`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>强制指定用户下线</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 管理员用户列表


**接口地址**:`/user/admin/list/page/vo`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员分页获取用户列表</p>



**请求示例**:


```javascript
{
  "pageNum": 0,
  "pageSize": 0,
  "sortField": "",
  "sortOrder": "",
  "id": 0,
  "userAccount": "",
  "userName": "",
  "userEmail": "",
  "userRole": "",
  "userStatus": 0,
  "searchText": "",
  "ascending": true,
  "offset": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userQueryRequest|用户查询请求|body|true|UserQueryRequest|UserQueryRequest|
|&emsp;&emsp;pageNum|||false|integer(int32)||
|&emsp;&emsp;pageSize|||false|integer(int32)||
|&emsp;&emsp;sortField|||false|string||
|&emsp;&emsp;sortOrder|||false|string||
|&emsp;&emsp;id|用户ID||false|integer(int64)||
|&emsp;&emsp;userAccount|用户账号||false|string||
|&emsp;&emsp;userName|用户昵称||false|string||
|&emsp;&emsp;userEmail|用户邮箱||false|string||
|&emsp;&emsp;userRole|用户角色：user/admin/ban||false|string||
|&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用||false|integer(int32)||
|&emsp;&emsp;searchText|搜索关键词（账号、昵称、邮箱）||false|string||
|&emsp;&emsp;ascending|||false|boolean||
|&emsp;&emsp;offset|||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponsePageUserVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||PageUserVO|PageUserVO|
|&emsp;&emsp;records|用户信息|array|UserVO|
|&emsp;&emsp;&emsp;&emsp;id|id|integer||
|&emsp;&emsp;&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer||
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;lastLoginTime|最后登录时间|string||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageUserVO|PageUserVO|
|&emsp;&emsp;searchCount||PageUserVO|PageUserVO|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"records": [
			{
				"id": 0,
				"userAccount": "",
				"userName": "",
				"userAvatar": "",
				"userProfile": "",
				"userEmail": "",
				"userRole": "",
				"userStatus": 0,
				"createTime": "",
				"updateTime": "",
				"lastLoginTime": ""
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	},
	"message": "",
	"success": true
}
```


## 用户统计


**接口地址**:`/user/admin/stats`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取用户统计信息</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseMapStringObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"success": true
}
```


## 解封用户


**接口地址**:`/user/admin/unban`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>解封指定用户</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 管理员更新用户


**接口地址**:`/user/admin/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员更新用户信息</p>



**请求示例**:


```javascript
{
  "id": 0,
  "userAccount": "",
  "userName": "",
  "userAvatar": "",
  "userProfile": "",
  "userEmail": "",
  "userRole": "",
  "userStatus": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userAdminUpdateRequest|管理员更新用户信息请求|body|true|UserAdminUpdateRequest|UserAdminUpdateRequest|
|&emsp;&emsp;id|用户ID||true|integer(int64)||
|&emsp;&emsp;userAccount|用户账号||false|string||
|&emsp;&emsp;userName|用户昵称||false|string||
|&emsp;&emsp;userAvatar|用户头像URL||false|string||
|&emsp;&emsp;userProfile|用户简介||false|string||
|&emsp;&emsp;userEmail|用户邮箱||false|string||
|&emsp;&emsp;userRole|用户角色：user-普通用户，admin-管理员，ban-被封号||false|string||
|&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 绑定邮箱


**接口地址**:`/user/bind-email`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>绑定邮箱到当前用户</p>



**请求示例**:


```javascript
{
  "email": "",
  "code": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|bindEmailRequest|绑定邮箱请求|body|true|BindEmailRequest|BindEmailRequest|
|&emsp;&emsp;email|邮箱地址||true|string||
|&emsp;&emsp;code|验证码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 修改密码


**接口地址**:`/user/change-password`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>修改当前用户密码</p>



**请求示例**:


```javascript
{
  "oldPassword": "",
  "newPassword": "",
  "confirmPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|changePasswordRequest|修改密码请求|body|true|ChangePasswordRequest|ChangePasswordRequest|
|&emsp;&emsp;oldPassword|当前密码||true|string||
|&emsp;&emsp;newPassword|新密码||true|string||
|&emsp;&emsp;confirmPassword|确认新密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 根据id获取用户


**接口地址**:`/user/get`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据id获取用户（仅管理员）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||User|User|
|&emsp;&emsp;id|id|integer(int64)||
|&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;userPassword|密码|string||
|&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer(int32)||
|&emsp;&emsp;editTime|编辑时间|string(date-time)||
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;lastLoginTime|最后登录时间|string(date-time)||
|&emsp;&emsp;isDelete|是否删除|integer(int32)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"id": 0,
		"userAccount": "",
		"userPassword": "",
		"userName": "",
		"userAvatar": "",
		"userProfile": "",
		"userEmail": "",
		"userRole": "",
		"userStatus": 0,
		"editTime": "",
		"createTime": "",
		"updateTime": "",
		"lastLoginTime": "",
		"isDelete": 0
	},
	"message": "",
	"success": true
}
```


## 获取当前登录用户


**接口地址**:`/user/get/login`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前登录用户</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseLoginUserVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||LoginUserVO|LoginUserVO|
|&emsp;&emsp;id|用户id|integer(int64)||
|&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer(int32)||
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;lastLoginTime|最后登录时间|string(date-time)||
|&emsp;&emsp;token|访问token|string||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"id": 0,
		"userAccount": "",
		"userName": "",
		"userAvatar": "",
		"userProfile": "",
		"userEmail": "",
		"userRole": "",
		"userStatus": 0,
		"createTime": "",
		"updateTime": "",
		"lastLoginTime": "",
		"token": ""
	},
	"message": "",
	"success": true
}
```


## 根据id获取用户信息


**接口地址**:`/user/get/vo`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据id获取脱敏的用户信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseUserVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||UserVO|UserVO|
|&emsp;&emsp;id|id|integer(int64)||
|&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer(int32)||
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;lastLoginTime|最后登录时间|string(date-time)||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"id": 0,
		"userAccount": "",
		"userName": "",
		"userAvatar": "",
		"userProfile": "",
		"userEmail": "",
		"userRole": "",
		"userStatus": 0,
		"createTime": "",
		"updateTime": "",
		"lastLoginTime": ""
	},
	"message": "",
	"success": true
}
```


## 用户登录


**接口地址**:`/user/login`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户登录</p>



**请求示例**:


```javascript
{
  "userAccount": "",
  "userPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userLoginRequest|用户登录请求|body|true|UserLoginRequest|UserLoginRequest|
|&emsp;&emsp;userAccount|账号||true|string||
|&emsp;&emsp;userPassword|密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseLoginUserVO|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||LoginUserVO|LoginUserVO|
|&emsp;&emsp;id|用户id|integer(int64)||
|&emsp;&emsp;userAccount|账号|string||
|&emsp;&emsp;userName|用户昵称|string||
|&emsp;&emsp;userAvatar|用户头像|string||
|&emsp;&emsp;userProfile|用户简介|string||
|&emsp;&emsp;userEmail|用户邮箱|string||
|&emsp;&emsp;userRole|用户角色：user/admin|string||
|&emsp;&emsp;userStatus|用户状态：0-正常，1-禁用|integer(int32)||
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;lastLoginTime|最后登录时间|string(date-time)||
|&emsp;&emsp;token|访问token|string||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"id": 0,
		"userAccount": "",
		"userName": "",
		"userAvatar": "",
		"userProfile": "",
		"userEmail": "",
		"userRole": "",
		"userStatus": 0,
		"createTime": "",
		"updateTime": "",
		"lastLoginTime": "",
		"token": ""
	},
	"message": "",
	"success": true
}
```


## 用户注销


**接口地址**:`/user/logout`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>用户注销</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 获取我的权限


**接口地址**:`/user/my-permissions`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前登录用户的角色和权限</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseMapStringObject|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"success": true
}
```


## 获取用户权限


**接口地址**:`/user/permissions/{userId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取指定用户的权限列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseListString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [],
	"message": "",
	"success": true
}
```


## 用户注册


**接口地址**:`/user/register`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户注册</p>



**请求示例**:


```javascript
{
  "userAccount": "",
  "userPassword": "",
  "checkPassword": "",
  "userName": "",
  "userEmail": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userRegisterRequest|用户注册请求|body|true|UserRegisterRequest|UserRegisterRequest|
|&emsp;&emsp;userAccount|账号||true|string||
|&emsp;&emsp;userPassword|密码||true|string||
|&emsp;&emsp;checkPassword|确认密码||true|string||
|&emsp;&emsp;userName|用户昵称（可选）||false|string||
|&emsp;&emsp;userEmail|用户邮箱（可选）||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseLong|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||integer(int64)|integer(int64)|
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": 0,
	"message": "",
	"success": true
}
```


## 重置密码


**接口地址**:`/user/reset-password`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>通过邮箱验证码重置密码</p>



**请求示例**:


```javascript
{
  "email": "",
  "code": "",
  "newPassword": "",
  "confirmPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resetPasswordRequest|重置密码请求|body|true|ResetPasswordRequest|ResetPasswordRequest|
|&emsp;&emsp;email|邮箱地址||true|string||
|&emsp;&emsp;code|验证码||true|string||
|&emsp;&emsp;newPassword|新密码||true|string||
|&emsp;&emsp;confirmPassword|确认新密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 获取用户角色


**接口地址**:`/user/roles/{userId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取指定用户的角色列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseListString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": [],
	"message": "",
	"success": true
}
```


## 发送验证码


**接口地址**:`/user/send-code`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>发送邮箱验证码</p>



**请求示例**:


```javascript
{
  "email": "",
  "purpose": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|sendCodeRequest|发送验证码请求|body|true|SendCodeRequest|SendCodeRequest|
|&emsp;&emsp;email|邮箱地址||true|string||
|&emsp;&emsp;purpose|验证码用途：bind_email-邮箱绑定，reset_password-重置密码，change_email-修改邮箱||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 更新用户角色


**接口地址**:`/user/update-role`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新指定用户的角色（仅管理员）</p>



**请求示例**:


```javascript
{
  "userId": 0,
  "newRole": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|updateUserRoleRequest|更新用户角色请求|body|true|UpdateUserRoleRequest|UpdateUserRoleRequest|
|&emsp;&emsp;userId|用户ID||true|integer(int64)||
|&emsp;&emsp;newRole|新角色：user-普通用户，admin-管理员，ban-被封号||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```


## 更新个人信息


**接口地址**:`/user/update/my`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新当前登录用户的个人信息</p>



**请求示例**:


```javascript
{
  "userName": "",
  "userAvatar": "",
  "userProfile": "",
  "userEmail": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userUpdateMyRequest|用户更新个人信息请求|body|true|UserUpdateMyRequest|UserUpdateMyRequest|
|&emsp;&emsp;userName|用户昵称||false|string||
|&emsp;&emsp;userAvatar|用户头像URL||false|string||
|&emsp;&emsp;userProfile|用户简介||false|string||
|&emsp;&emsp;userEmail|用户邮箱||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|BaseResponseBoolean|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|success||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"success": true
}
```