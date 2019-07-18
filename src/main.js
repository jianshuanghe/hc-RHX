// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { LoadingPlugin, ToastPlugin } from 'vux'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Cube from 'cube-ui';
import MintUI from 'mint-ui';
import $ from 'jquery'
import LS from 'config/localstorage'
import wxApi from '@/mixins/wxapi.js' //微信分享sdk
import {wxShareTimeline,wxShareAppMessage} from '@/mixins/WXShare.js' //微信分享到朋友圈和好友
import {shareCont} from '@/mixins/WXParams.js' //微信分享参数
import * as API from 'config/api'
// import 'common/fonts/iconfont.css'
//图片预览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import 'mint-ui/lib/style.css';
import './assets/scss/mint_reset.css';
//时间戳转换
import * as filters from './filters/filter';
import {api1, api2, apiProd1, apiProd2, apiProd3} from './api';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.use(preview);
Vue.use(Cube);
Vue.use(MintUI);

Vue.prototype.apiProd1 = apiProd1; // 短信 生产环境使用
Vue.prototype.apiProd2 = apiProd2; // 业务 生产环境使用
Vue.prototype.apiProd3 = apiProd3; // 图片 生产环境使用
Vue.prototype.api1 = api1; // 短信
Vue.prototype.api2 = api2; // 业务

// import promise from 'es6-promise'
// promise.polyfill()
// import VConsole from 'vconsole'
// const vconsole = new VConsole()
// 全局echarts字体适配方法
Vue.prototype.getDpr = function getDpr() {
    //window.devicePixelRatio
    var dpr = $('html').attr('data-dpr');
    if (dpr == 1) {
        return 12;
    } else if (dpr == 2) {
        return 24;
    } else {
        return 36;
    }
};
// LS.setItem("userId","56")
LS.setItem("token","123687CA085E4C831CFF5ED492F5C6D86EBDAFD7D5852C4C1559FE7F9162D7B3E71155A0F793DB0E374")

Vue.prototype.$http = axios
process.env.NODE_ENV == 'production' ? axios.defaults.baseURL = process.env.API_ROOT : ''
Vue.prototype.LS = LS //全局注册操作localStorage
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 移动端适配方案
import '../node_modules/lib-flexible/flexible'
import fastclick from 'fastclick'

Vue.config.productionTip = false
    // 点击延迟问题
fastclick.attach(document.body)

Vue.use(VueAwesomeSwiper)
Vue.use(Cube)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
    // Vue.use(AlertPlugin)
    /* eslint-disable no-new */
router.beforeEach((to, from, next) => {
    // 动态设置title
    document.title = to.meta.title;

  //全局配置转发分享
  function wxShareConfigure(){
    console.log(shareCont, '---------------------------shareCont---------------------')
    wxShareTimeline(shareCont);
    wxShareAppMessage(shareCont);
  }
  if (to.path != "/cust" || to.path != "/mitemp") {
    wxApi.wxRegister(wxShareConfigure); // 为你分享配置
  }
    if (to.path == "/index") {
        // 判断地址中是否有userId,-1表示没有，否则有
        // if (to.fullPath.indexOf("userId") == -1) {
        //     if (to.query.compLogo) {
        //         // LS.setItem("userId", "60"); //测试用，上线需要删除
        //         LS.setItem("compLogo", to.query.compLogo)
        //         LS.setItem("nickname", to.query.nickname)
        //         LS.setItem("wxId", to.query.wxId)
        //     }
        // } else {
        //     // LS.setItem("userId", "443");
        //     if (to.query.userId) {
        //         LS.setItem("userId", to.query.userId);
        //     }
        //     // let _userId = to.query.userId
        //     // console.log(_userId)
        //     // userId == _userId
        // }
      next()
    } else
      if (to.path == "/myInstructions") {
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') {
            next("/landRegistration")
        } else {
            next()
        }

    } else if (to.path == "/myMessage") {
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') {
            next("/landRegistration")
        } else {
            next()
        }

    } else if (to.path == "/adrmanage") {
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') {
          next("/landRegistration")
        } else {
          next()
        }

      } else if (to.path == "/personalData") {
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') {
            next("/landRegistration")
        } else {
            next()
        }
    } else if (to.path == "/feedBack") {
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') {
            next("/landRegistration")
        } else {
            next()
        }
    } else if (to.path == "/editPerInfo") {
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') {
            next("/landRegistration")
        } else {
            next()
        }
    } else if (to.path == "/zhangHao") {
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') {
            next("/landRegistration")
        } else {
            next()
        }
    } else if (to.path == "/pubsucc") {
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') {
            next("/landRegistration")
        } else {
            next()
        }
    }

    next()
})


//微信配置
import wx from 'weixin-js-sdk'

// 全局分享跳转到首页
Vue.prototype.wxApiG = function wxApiG() {
    wx.ready((res) => {
        // 朋友圈
        wx.onMenuShareTimeline({
            title: "如何秀", // 分享标题
            link: "http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl", // 分享链接
            imgUrl: "http://style.iambuyer.com/img/rhx-mobile-share-def.jpg", // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                alert("分享成功")
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                alert("分享失败")
            }
        });
        // 朋友
        wx.onMenuShareAppMessage({
            title: "如何秀", // 分享标题
            desc: "您的移动电子说明书", // 分享描述
            link: "http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl", // 分享链接
            imgUrl: "http://style.iambuyer.com/img/rhx-mobile-share-def.jpg", // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
                alert("分享成功")
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                alert("分享失败")
            }
        })
    })
}

router.afterEach((to, from) => {
        const ua = window.navigator.userAgent.toLowerCase()
        if (window.__wxjs_is_wkwebview === true && to.path !== location.pathname) { //解决ios跳转以后自定义分享失效，
            location.assign(to.fullPath)
            let url = window.location.href // 此处不可使用location.replace
            if (!LS.getItem("initLink")) {
                LS.setItem("initLink", url)
            }
        } else {
            let url = window.location.origin + to.fullPath
          // let url = 'http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl'
            LS.setItem("initLink", url)
        }
        //全局配置转发分享
        function wxShareConfigure(){
          console.log(shareCont, '---------------------------shareCont---------------------')
          wxShareTimeline(shareCont);
          wxShareAppMessage(shareCont);
        }
        if (to.path != "/cust" || to.path != "/mitemp") {
          wxApi.wxRegister(wxShareConfigure); // 为你分享配置
        }
    })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
