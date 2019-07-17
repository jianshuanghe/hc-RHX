/**
 * Created by caoziwen on 2018/05/26.
 */
// 获取用户信息
export const GET_UINFO = state => state.uinfo

// 模板获取滚动方向
export const GET_UPORDOWN = state => state.up_or_down

// 获取模板中每一项的数据
export const GET_TEMP_DATA = state => state.temp_data

// 获取当前是否为可编辑状态
export const GET_EDITABLE = state => state.editable

// 获取是否在预览状态
export const GET_IS_PREVIEW = state => state.is_preview

// 获取banner高度
export const GET_BANNER_HEIGHT = state => state.banner_height

// 获取模块图标集合
export const GET_MODULE_ICON = state => state.temp_data.module_icon

// 获取moneyList（价格明细)
export const GET_MONEY_LIST = state => state.moneyList
// 获取title
export const INS_TITLE = state => state.instrucTitle
//获取instro
export const INS_INTRO = state => state.instrucIntro
export const DTA = state => state.dta
