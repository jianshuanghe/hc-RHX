/**
 * Created by caoziwen on 2018/05/28.
 */
import axios from 'axios'

export const ERROK = '200'
import qs from 'qs'
import LS from 'config/localstorage'
// 测试环境
// let api = 'http://jiangjiacheng.nat300.top/'
// 正式环境
let api = ''
process.env.NODE_ENV !== 'production' ? api = 'api/' : api = ''

// 用户端-提醒发货
export function _tixing(id) {
  const tixing = axios.get(api + 'rest-rp/order/remind?orderId='+id).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return tixing
}
// 用户端-删除订单
export function _delOrder(id) {
  const delOrder = axios.get(api + 'rest-rp/order/closeOrder?orderId='+id).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return delOrder
}

// 操作订单
export function _caozuoOrder(id, formParams) {
  const caozuoOrder = axios.post(api + 'rest-rp/order/updateOrderState?orderId='+id, formParams).then((res) => {
    return res
  }).catch((res) => {
    return res
  })
  return caozuoOrder
}
// 更新订单
export function _updateOrder(formParams) {
  const updateOrder = axios.post(api + 'rest-rp/order/updateOrder', formParams).then((res) => {
    return res
  }).catch((res) => {
    return res
  })
  return updateOrder
}
// 创建订单
export function _createOrder(formParams) {
  const createOrder = axios.post(api + 'rest-rp/order/createOrder', formParams).then((res) => {
    return res
  }).catch((res) => {
    return res
  })
  return createOrder
}

// 插入or更新 收货地址
/**
 * id //传递就编辑 不传递就插入
 */
export function _newAdr(formParams) {
  const newAdr = axios.post(api + 'rest-rp/address/', formParams).then((res) => {
    return res
  }).catch((res) => {
    return res
  })
  return newAdr
}
// 删除地址
export function _delAdr(id) {
  const delAdr = axios.get(api + 'rest-rp/address/del/'+id).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return delAdr
}
// 收货地址详情
export function _adrDet(id) {
  const adrDet = axios.get(api + 'rest-rp/address/'+id).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return adrDet
}
// 根据userId获取收货地址列表
export function _getAdr(userId) {
  const getAdr = axios.get(api + 'rest-rp/address?userId='+userId).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return getAdr
}

// 商家端-供应列表
/* userId: 用户id
   page: 分页
   state: '订单状态 0 待确认  1 待发货  2 待收货 3已完成  4已关闭',
*/
export function _gongyingList(userId, page, state) {
  if(state !== '') {
    const gongyingList = axios.get(api + 'rest-rp/order/selectMyToBOrder?userId=' + userId + '&page=' + page + '&state=' + state).then((res) => {
      return res.data
    }).catch((res) => {
      return res.data
    })
    return gongyingList
  } else {
    const gongyingList = axios.get(api + 'rest-rp/order/selectMyToBOrder?userId=' + userId + '&page=' + page).then((res) => {
      return res.data
    }).catch((res) => {
      return res.data
    })
    return gongyingList
  }
}

// 用户端-采购列表
/* userId: 用户id
   page: 分页
   state: '订单状态 0 待确认  1 待发货  2 待收货 3已完成  4已关闭',
*/
export function _caigouList(userId, page, state) {
  if(state !== '') {
    const caigouList = axios.get(api + 'rest-rp/order/selectMyToCOrder?userId=' + userId + '&page=' + page + '&state=' + state).then((res) => {
      return res.data
    }).catch((res) => {
      return res.data
    })
    return caigouList
  } else {
    const caigouList = axios.get(api + 'rest-rp/order/selectMyToCOrder?userId=' + userId + '&page=' + page).then((res) => {
      return res.data
    }).catch((res) => {
      return res.data
    })
    return caigouList
  }
}

// 用户端-采购详情
export function _caigouDetail(id) {
  const caigouDetail = axios.get(api + 'rest-rp/order/selectOrderInfo?orderId='+id).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return caigouDetail
}

/**
 * 上架，下架
 * @id:说明书id
 * @instrucState ： 代表状态  0未发布 1发布 2下架
 * **/
export function _isPublic(id, state) {
  const isPublic = axios.get(api + 'rest-rp/instruc/isPublic/' + id + '?instrucState=' + state).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return isPublic
}

/**
 * 提交留言
 * @instrucId:说明书id
 *
 *
 * **/
export function _pushMsgFun(instrucId, mobile, userName, msgContent) {
  const pushMsg = axios.post(api + 'rest-rp/msg/add', qs.stringify({
    instrucId: instrucId,
    mobile: mobile,
    userName: userName,
    msgContent: msgContent
  })).then((res) => {
    return res
  }).catch((res) => {
    return res
  })
  return pushMsg
}

/**
 * 提交说明书
 * @instrucTitle:说明书标题
 * @bannerImg:banner的第一张图片
 * @tempId:所属模板id
 * @instrucIntro:说明书简介
 * @instrucState:0 未发布 1发布 2下架
 * @instrucCustType:1 定制模板 0,2 普通模板
 * */
export function _pubInstrc(instrucTitle, bannerImg, tempId, instrucIntro, instrucState, context, urlName, instrucCustType) {
  let params = {
    "userId": LS.getItem("userId"),
    "instrucTitle": instrucTitle,
    "bannerImg": bannerImg,
    "tempId": tempId,
    "instrucIntro": instrucIntro,
    "instrucState": instrucState,
    "context": context,
    "urlName": urlName,
    "instrucCustType": instrucCustType
  }
  if (localStorage.getItem('custIdOne')) {
    params.custIdOne = localStorage.getItem('custIdOne');
  }
  if (localStorage.getItem('custIdTwo') && localStorage.getItem('custIdTwo') !== 'undefined') {
    params.custIdTwo = localStorage.getItem('custIdTwo');
  }
  const pubInstrc = axios.post(api + 'rest-rp/instruc', params).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return pubInstrc
}

/**
 * 更新说明书
 * @instrucTitle:说明书标题
 * @bannerImg:banner的第一张图片
 * @instrucIntro:说明书简介
 * @instrucId:说明书ID
 * */
export function _updateInstrc(instrucId, instrucTitle, bannerImg, instrucIntro, context, urlName) {
  let params = {
    "instrucTitle": instrucTitle,
    "bannerImg": bannerImg,
    "instrucIntro": instrucIntro,
    "context": context,
    "urlName": urlName
  }
  if (localStorage.getItem('custIdOne')) {
    params.custIdOne = localStorage.getItem('custIdOne');
  }
  if (localStorage.getItem('custIdTwo') && localStorage.getItem('custIdTwo') !== 'undefined') {
    params.custIdTwo = localStorage.getItem('custIdTwo');
  }
  const updateInstrc = axios.post(api + 'rest-rp/instruc/' + instrucId, params).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return updateInstrc
}

/**
 * 图片批量验证成功
 * @SuccessBatch:批量验证的图片Name数组
 * **/
export function _uploadSuccessBatch(SuccessBatch) {
  const uploadSuccessBatch = axios.post('http://img01.iambuyer.com/imgup/upLoad/uploadSuccessBatch', {
    fileNames: SuccessBatch
  }).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return uploadSuccessBatch
}

/**
 * 单张图片验证成功
 *
 * **/
export function _uploadSuccess(formData) {
  const uploadSuccess = axios.post('http://img01.iambuyer.com/imgup/upLoad/uploadSuccess', formData).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return uploadSuccess
}

/**
 * 删除说明书
 *
 * **/
export function _delInstrc(id) {
  const delInstrc = axios.delete(api + 'rest-rp/instruc/' + id).then((res) => {
    return res.data
  }).catch((res) => {
    return res.data
  })
  return delInstrc
}

/**
 * 获取模板列表
 * */
export function _getTemp() {
  const getTemp = axios.get(api + 'rest-rp/temp').then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return getTemp
}

/**
 *根据模板ID获取所包含的模块
 * */
export function _selectModulesByTempId(tempID) {
  const selectModulesByTempId = axios.get(api + 'rest-rp/temp/' + tempID).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return selectModulesByTempId
}

/*
 * 获取模板详情
 * */
export function _getTempDetail(tempID) {
  const getTempDetail = axios.get(api + 'rest-rp/temp/' + tempID).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return getTempDetail
}

/*
 * 测试获取模板详情
 * */
// export function _getTempDetail() {
//   const getTempDetail = require('temp')
//   return getTempDetail
// }
/*
 * 获取用户信息
 * */
export function _GetUserInfo(uid) {
  const GetUserInfo = axios.get(api + 'rest-rp/user/' + uid).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return GetUserInfo
}

/*
 * 更新用户信息
 * */
export function _UpdateUserInfo(uid, params) {
  const UpdateUserInfo = axios.post(api + 'rest-rp/user/' + uid, params).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return UpdateUserInfo
}

/*
 * 针对关注我们更新用户信息
 * */
export function _UpdateUserInfoGZ(uid, params) {
  const UpdateUserInfo = axios.post(api + 'rest-rp/user/' + uid + '?flag=1', params).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return UpdateUserInfo
}

/*
 * 上传图片
 * */
export function _UploadImg(formData) {
  const _UploadImg = axios.post('http://img01.iambuyer.com/imgup/upLoad/fileUpload', formData).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _UploadImg
}

/*
 * 插入意见反馈
 * */
export function _CreateFeedBack(params) {
  const _CreateFeedBack = axios.post(api + 'rest-rp/userFeedBack', params).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _CreateFeedBack
}

/*
 * 更新意见反馈
 * */
export function _UpdateFeedBack(page) {
  const _UpdateFeedBack = axios.get(api + 'rest-rp/userFeedBack', {
    params: {'userId': LS.getItem("userId"), 'page': page}
  }).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _UpdateFeedBack
}

/*
 * 拉取留言
 * */
export function _UpdateMessages(params) {
  const _UpdateMessages = axios.get(api + 'rest-rp/msg', {
    params: params
  }).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _UpdateMessages
}

/*
 * 删除留言
 * */
export function _DelMessages(id) {
  const _DelMessages = axios.delete(api + 'rest-rp/msg/' + id).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _DelMessages
}

/*
 * 标记留言
 * */
export function _MarkupMessages(id) {
  const _MarkupMessages = axios.get(api + 'rest-rp/msg/read/' + id).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _MarkupMessages
}

/*
 * 折线图数据
 * */
export function _LineData(id, type, state) {
  const _LineData = axios.get(api + 'rest-rp/instruc/getBrokenLine', {
    params: {'id': id, 'type': type, 'state': state}
  }).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _LineData
}

/*
 * 获取用户数据统计页信息
 * */
export function _GetUserDataInfo() {
  const _GetUserDataInfo = axios.get(api + 'rest-rp/instruc/getUserDataInfo', {
    params: {'userId': LS.getItem("userId")}
  }).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _GetUserDataInfo
}

/*
 * 获取说明书统计信息
 * */
export function _GetInstrucDataInfo(id) {
  const _GetInstrucDataInfo = axios.get(api + 'rest-rp/instruc/getInstrucDataInfo', {
    params: {'instrucId': id}
  }).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _GetInstrucDataInfo
}

// 我的说明书列表
export function _UpdateInstruc(page, state, instrucCustType) {
  const _UpdateInstruc = axios.get(api + 'rest-rp/instruc', {
    params: {'userId': LS.getItem("userId"), 'page': page, 'state': state, 'instrucCustType': instrucCustType}
  }).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _UpdateInstruc
}

// 我的说明书详情
export function _InstrucDetails(instrucId) {
  const _InstrucDetails = axios.get(api + 'rest-rp/instruc/' + instrucId).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _InstrucDetails
}

// 分享出去后用户浏览说明书详情
export function _UserSeeInstrucDetails(instrucId, wxid) {
  const _InstrucDetails = axios.get(api + 'rest-rp/instruc/' + instrucId + '?wxId=' + wxid).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _InstrucDetails
}

// WX_JS 调用获取服务端授权
export function _Wechat(url) {
  const _Wechat = axios.get(api + 'rest-rp/wechat/portal/createJsapiSignature', {
    params: {url: url}
  }).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _Wechat
}

/*
 * 发送验证码
 * */
export function _phoneSms(phone, businessName, portal) {
  const phoneSms = axios.post('http://api.iambuyer.com/rest-sso/phoneSms', {
    phone: phone,
    businessName: businessName,
    portal: portal
  })
    .then(res => {
      return res
    }).catch(res => {
      return res
    })
  return phoneSms
}

/*
 * 校验短信验证码
 * */
export function _vCode(phone, businessName, phoneCode, portal) {
  const vC = axios.post('http://api.iambuyer.com/rest-sso/phoneSmsVali', {
    phone: phone,
    businessName: businessName,
    phoneCode: phoneCode,
    portal: portal
  })
    .then(res => {
      return res
    }).catch(res => {
      return res
    })
  return vC
}

// // 发送短信
// export function _SendMessage(params) {
//     const _SendMessage = axios.post(api + 'yunxin-rest-api-sso/phoneSms', params).then((res) => {
//         return res.data
//     }).catch(res => {
//         return res.data
//     })
//     return _SendMessage
// }
// // 校验手机短信
// export function _phoneSmsVali(params) {
//     const _phoneSmsVali = axios.post(api + 'yunxin-rest-api-sso/phoneSmsVali', params).then((res) => {
//         return res.data
//     }).catch(res => {
//         return res.data
//     })
//     return _phoneSmsVali
// }
// 注册
export function _reg(params) {
  const _reg = axios.post(api + 'rest-rp/user/reg', params).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _reg
}

/**
 * 插入访问量：
 * type：类型
 * 访问量 ：0
 * 分享微信量：1
 * 分享微博量：2
 * 分享QQ量 ： 3
 * id:说明书id
 * **/
export function _instrucDate(type, id) {
  const instrucDate = axios.get(api + 'rest-rp/instruc/instrucDate?type=' + type + '&id=' + id,).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return instrucDate
}

export function _instrucDate2(type, id, stopTime) {
  const instrucDate2 = axios.get(api + 'rest-rp/instruc/instrucDate?type=' + type + '&id=' + id + '&stopTime=' + stopTime,).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return instrucDate2
}

// 获取意见反馈类型列表
export function _feedTypes() {
  const feedTypes = axios.get(api + 'rest-rp/userFeedBack/types').then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return feedTypes
}

// 微信分享计数
/**
 * 插入访问量：
 * type：类型
 * 访问量 ：0
 * 分享微信量：1
 * 分享微博量：2
 * 分享QQ量 ： 3
 * id:说明书id
 * **/
export function _shareTotals(shareType,id) {
  const _shareTotals = axios.get(api + 'rest-rp/instruc/instrucDate', {
    params: {type: shareType, id: id}
  }).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _shareTotals
}


// 记录流量承载页数据
export function _setAdveData(params) {
  const _setAdveData = axios.post(api + 'rest-rp/adve/setAdveData', params).then((res) => {
    return res.data
  }).catch(res => {
    return res.data
  })
  return _setAdveData
}

// 点赞接口
export function _instrucLike(instrucId, wxId) {
  const instrucLike = axios.get(api + 'rest-rp/instruc/instrucLike?instrucId=' + instrucId + '&wxId=' + wxId).then((res) => {
    return res
  }).catch((res) => {
    return res
  })
}
