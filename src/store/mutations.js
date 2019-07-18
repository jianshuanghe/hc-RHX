/**
 * Created by caoziwen on 2018/05/26.
 */
import * as types from './mutation-types'

const mutations = {
  [types.SET_UINFO](state, U) {
    state.uinfo = U
  },
  [types.SET_UPORDOWN](state, ud) {
    state.up_or_down = ud
  },
  [types.SET_TEMP_DATA](state, NDATA) {
    state.temp_data = NDATA
  },
  [types.SET_EDITABLE](state, editable) {
    state.editable = editable
  },
  [types.SET_IS_PREVIEW](state, is_preview) {
    state.is_preview = is_preview
  },
  [types.SET_BANNER_HEIGHT](state, BH) {
    state.banner_height = BH
  },
  [types.SET_MODULE_ICON](state, MICON) {
    state.temp_data.module_icon = MICON
  },
  setLoadingShow (state, info) {
    console.log(info, 'setLoadingShow');
    state.loading.loadingShow = info;
  },
  // setML: (state,val)=>{state.moneyLists = val},
  setML(state,info){
    state.moneyList = info;
    console.log(info, '新state.moneyLists')
  },
  getInstrucTitle(state,val){
    state.instrucTitle = val
    console.log(state.instrucTitle, 'state.instrucTitle')
  },
  getInstrucIntro(state,val){
    state.instrucIntro = val
    console.log(state.instrucIntro,'state.instrucIntro')
  },
  updatedata(state, p) {
    state.dta = p
  }
}
export default mutations
