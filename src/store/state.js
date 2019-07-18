/**
 * Created by caoziwen on 2017/12/28.
 */
const state = {
  loading: { // loading
    loadingShow: false,
    loadingText: '请稍等...'
  },
  wx: {},// 微信签名等数据
  uinfo: {},// 拉取的个人中心用户信息
  editable: false, // 区分是否可编辑
  up_or_down: '',// 上滑下滑
  banner_height: '',//
  is_preview: true,
  temp_data: '',
  moneyList: [
    {money:"",minCount:""},
    {money:"",minCount:""},
    {money:"",minCount:""}
  ],
  instrucTitle: '',
  instrucIntro: '',
  dta:'8'
  //模板数据
  // temp_data: {
  //   "tempId": "45",
  //   "path": "mitemp",
  //   "tempCon": {
  //     "editAble": false,
  //     "succImgList": [],
  //     "banner": [
  //       {
  //         "picUrl": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-banner-01.jpg",
  //         "linkUrl": ""
  //       },
  //       {
  //         "picUrl": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-banner-02.jpg",
  //         "linkUrl": ""
  //       },
  //       {
  //         "picUrl": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-banner-03.jpg",
  //         "linkUrl": ""
  //       },
  //       {
  //         "picUrl": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-banner-04.jpg",
  //         "linkUrl": ""
  //       }
  //     ],
  //     "modules": {
  //       "mi_desc": {
  //         "icon": {
  //           "iconImg": "&#xe6c4;",
  //           "iconName": "产品简介",
  //           "moduleTitle": "产品简介",
  //           "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-03.jpg",
  //           "moduleName": "mi_desc"
  //         },
  //         "descCon": [
  //           {
  //             "index": 0,
  //             "title": "正反面显示",
  //             "s_title": "屏幕显示",
  //             "item_img": "http://style.iambuyer.com/img/mi-temp-imgs-02.jpg"
  //           },
  //           {
  //             "index": 1,
  //             "title": "屏幕显示",
  //             "s_title": "机体正面屏幕显示内容说明",
  //             "item_img": "http://style.iambuyer.com/img/mi-temp-imgs-03.jpg"
  //           }
  //         ]
  //
  //       },
  //       "mi_install": {
  //         "icon": {
  //           "iconImg": "&#xe7a4;",
  //           "iconName": "如何安装",
  //           "moduleTitle": "如何安装",
  //           "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-06.jpg",
  //           "moduleName": "mi_install"
  //         },
  //         "installCon": [
  //           {
  //             "index": 0,
  //             "item_num": 1,
  //             "title": "打开滤芯仓门",
  //             "item_con": "下压仓门开关，打开滤芯仓门，确认滤芯已入位.",
  //             "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-01.jpg"
  //           },
  //           {
  //             "index": 1,
  //             "item_num": 2,
  //             "title": "取出电源线",
  //             "item_con": "从仓内包装袋中取出电源线，并关闭滤芯仓门.",
  //             "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-02.jpg"
  //           },
  //           {
  //             "index": 2,
  //             "item_num": 3,
  //             "title": "连接电源",
  //             "item_con": "电源线连接至底部的接口，接入电源.",
  //             "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-03.jpg"
  //           },
  //           {
  //             "index": 3,
  //             "item_num": 4,
  //             "title": "打开手机APP",
  //             "item_con": "下载并且打开APP，然后启动开关.",
  //             "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-04.jpg"
  //           }
  //         ]
  //
  //       },
  //       "mi_use": {
  //         "icon": {
  //           "iconImg": "&#xe629;",
  //           "iconName": "如何使用",
  //           "moduleTitle": "如何使用",
  //           "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-07.jpg",
  //           "moduleName": "mi_use"
  //         },
  //         "useCon": [
  //           {
  //             "index": 0,
  //             "item_num": 1,
  //             "title": "正确位置摆放",
  //             "s_title": "为了更好的发挥空气净化器的性能，在使用时主机进风口应与墙壁等遮挡物保持一定的距离.",
  //             "item_con": "下压仓门开关，打开滤芯仓门，确认滤芯已入位.",
  //             "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-09.jpg"
  //           },
  //           {
  //             "index": 1,
  //             "item_num": 2,
  //             "title": "电源开关/运行模式切换",
  //             "s_title": "单机开机，点击切换运行模式，长按2秒关机单机开机.",
  //             "item_con": "从仓内包装袋中取出电源线，并关闭滤芯仓门.",
  //             "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-10.jpg"
  //           }
  //         ]
  //
  //       },
  //       "mi_canshu": {
  //         "icon": {
  //           "iconImg": "&#xe62d;",
  //           "iconName": "基本参数",
  //           "moduleTitle": "基本参数",
  //           "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-02.jpg",
  //           "moduleName": "mi_canshu"
  //         },
  //         "canshuCon": [
  //           {
  //             "index": 0,
  //             "title": "基本参数",
  //             "s_title": "基本参数",
  //             "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-13.jpg"
  //           }
  //         ]
  //
  //       },
  //       "mi_care": {
  //         "icon": {
  //           "iconImg": "&#xe620;",
  //           "iconName": "注意事项",
  //           "moduleTitle": "注意事项",
  //           "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-10.jpg",
  //           "moduleName": "mi_care"
  //         },
  //         "careCon": [
  //           {
  //             "index": 0,
  //             "title": "搬运",
  //             "s_title": "移动时，请务必使主机停止运行，并拔出插头."
  //           },
  //           {
  //             "index": 1,
  //             "title": "电源",
  //             "s_title": "请勿过度拧捏、弯曲或扭转电源线，否则可能引起线芯外露或折断，断开电源时，请勿拉扯电源线."
  //           },
  //           {
  //             "index": 2,
  //             "title": "使用限制",
  //             "s_title": "请勿在浴室等高温、潮湿、会沾水的场所使用."
  //           }
  //         ]
  //       },
  //       "mi_contact": {
  //         "icon": {
  //           "iconImg": "&#xe600;",
  //           "iconName": "联系我们",
  //           "moduleTitle": "联系我们",
  //           "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-01.jpg",
  //           "moduleName": "mi_contact"
  //         },
  //         "contactCon": [
  //           {
  //             "index": 0,
  //             "item_num": 1,
  //             "item_title": "联系方式",
  //             "companyPhone": "400 **** 789",
  //             "companyEmail": "xxxx@hc360.com",
  //             "companyAddress": "北京市昌平区回龙观七里渠慧聪园总部基地"
  //           },
  //           {
  //             "index": 1,
  //             "item_num": 2,
  //             "item_title": "直接留言"
  //           }
  //         ]
  //       }
  //     },
  //     "modulesSort": ["mi_desc", "mi_install", "mi_use","mi_canshu","mi_care","mi_contact"],
  //     "selIconList": ["&#xe622;", "&#xe62a;", "&#xe629;", "&#xe627;", "&#xe7a4;", "&#xe625;", "&#xe68a;", "&#xe666;", "&#xe624;", "&#xe62d;", "&#xe602;", "&#xe609;", "&#xe628;", "&#xe6d8;", "&#xe600;", "&#xe621;", "&#xe620;", "&#xe61f;", "&#xe60a;", "&#xe6ad;", "&#xe60e;", "&#xe601;", "&#xe6c4;", "&#xe607;", "&#xe638;", "&#xe615;"],
  //     "dragSort": [],
  //     "userPhone": "",
  //     "flowMe": {
  //       "companyName": "",
  //       "companyIntro": "",
  //       "qrImg": "",
  //       "telPhone": "",
  //       "emailAddress": "",
  //       "companyAddress": ""
  //     },
  //     "userActionBtn": {
  //       "middleBtn":
  //         {"btnName": "", "btnLink": ""},
  //       "rightBtn":
  //         {"btnName": "", "btnLink": ""}
  //     }
  //   }
  // }
}
export default state
