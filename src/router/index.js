import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由页面懒加载
// 说明书骨架(2/4)
// 路由页面懒加载
// 说明书骨架(2/4)

import loading from '@/pages/home/home/Loading'
import index from '@/pages/home/home/index';
//登录注册
import bindPhone from '@/components/landRegistration/bindPhone';
import landRegistration from '@/components/landRegistration/landRegistration';
import forgetPassWord from '@/components/landRegistration/forgetPassWord';

// 空白页
const helloWorld = resolve => require(['@/components/HelloWorld'], resolve) // text order
// 来自会员的空白页
const sourceMemberCenterCreate = resolve => require(['@/components/sourceMemberCenterCreate'], resolve) // text order
// 路由页面懒加载
const cust = resolve => require(['@/components/businessModules/order/banner'], resolve) // text order
const addadr = resolve => require(['@/components/businessModules/order/add-address'], resolve) // text order
const liji = resolve => require(['@/components/businessModules/order/lijidingzhi'], resolve) // text order
const adrmanage = resolve => require(['@/components/businessModules/order/address-manage'], resolve) // text order
const success = resolve => require(['@/components/businessModules/order/success'], resolve) // text order
const fail = resolve => require(['@/components/businessModules/order/fail'], resolve) // text order
const caigou = resolve => require(['@/components/businessModules/order/caigou'], resolve) // text order
const caigouDet = resolve => require(['@/components/businessModules/order/caigou-det'], resolve) // text order
const gongying = resolve => require(['@/components/businessModules/order/gongying'], resolve) // text order
const gongyingDet = resolve => require(['@/components/businessModules/order/gongying-det'], resolve) // text order
const queren = resolve => require(['@/components/businessModules/order/queren'], resolve) // text order
const fahuo = resolve => require(['@/components/businessModules/order/fahuo'], resolve) // text order
const company = resolve => require(['@/pages/personalCenter/company'], resolve) // text order
// 说明书骨架(2/4)

const mitemp = resolve => require(['@/components/templates/mitemp/MiTemp'], resolve)
const prodDesc = resolve => require(['@/components/templates/productDescTemp/productDesc'], resolve)
    // dev期间使用，pro可以删除
const more = resolve => require(['@/components/businessModules/shuixiaoya/more'], resolve)
const shouhou = resolve => require(['@/components/businessModules/feiniao/shouhou'], resolve)
    // 添加说明书介绍（3/4）
const addInstrcDesc = resolve => require(['@/pages/home/highQualityTemplate/addInstrcDesc'], resolve)
const addInstrcDesc1 = resolve => require(['@/pages/home/highQualityTemplate/addInstrcDesc1'], resolve)
    // 发布成功（4、4）
const pubSucc = resolve => require(['@/pages/home/highQualityTemplate/pubSucc'], resolve)
    // const index = resolve => require(['@/pages/home/home/index'], resolve)
const aboutRhx = resolve => require(['@/pages/home/aboutRhx/aboutRhx'], resolve)
const highQualityTemplate = resolve => require(['@/pages/home/highQualityTemplate/highQualityTemplate'], resolve)
const createShow = resolve => require(['@/pages/home/highQualityTemplate/createShow'], resolve)
const myInstructions = resolve => require(['@/pages/myShows/instructions'], resolve)
const instructionFabu = resolve => require(['@/pages/myShows/instructionFabu'], resolve)
const instructionWeiFabu = resolve => require(['@/pages/myShows/instructionWeiFabu'], resolve)
const instructionXiaXian = resolve => require(['@/pages/myShows/instructionXiaXian'], resolve)
const instructionData = resolve => require(['@/pages/myShows/instructionData'], resolve)
const myMessage = resolve => require(['@/pages/myMessages/myMessage'], resolve)
const myPersonal = resolve => require(['@/pages/personalCenter/myPersonal'], resolve)
const editPerInfo = resolve => require(['@/pages/personalCenter/editPerInfo'], resolve)
const personalData = resolve => require(['@/pages/personalCenter/personalData'], resolve)
const zhangHao = resolve => require(['@/pages/personalCenter/zhangHao'], resolve)
const feedBack = resolve => require(['@/pages/personalCenter/feedBack'], resolve)
const tel = resolve => require(['@/components/globalModules/tel'], resolve)
    // import instructionData from '@/pages/myShows/instructionData'

export default new Router({
    linkActiveClass: 'on',
    mode: 'history',
    routes: [{
            path: '*',
            redirect: 'index'
        },
        {
            path: '/',
            redirect: 'loading',
            // meta: {
            //   title: '',
            // }
        },
        {
          path: '/helloWorld',
          name: 'helloWorld',
          component: helloWorld,
          meta: {
            title: '',
          }
        },
        {
          path: '/bindPhone',
          name: 'bindPhone',
          meta: {
            title: '立即绑定'
          },
          component: bindPhone
        }, {
          path: '/landRegistration',
          name: 'landRegistration',
          meta: {
            title: '登陆注册'
          },
          component: landRegistration
        }, {
          path: '/forgetPassWord',
          name: 'forgetPassWord',
          meta: {
            title: '忘记密码'
          },
          component: forgetPassWord
        },
      {
          path: '/sourceMemberCenterCreate',
          name: 'sourceMemberCenterCreate',
          component: sourceMemberCenterCreate,
          meta: {
            title: '',
          }
        },
        {
            path: '/loading',
            name: 'loading',
            component: loading,
            meta: {
                title: '',
            }
        },
        // text order
        // {
        //     path: '/',
        //     redirect: 'cust',
        //     // meta: {
        //     //   title: '',
        //     // }
        // },
        {
            path: '/cust',
            name: 'cust',
            component: cust,
            meta: {
                title: '',
            }
        },
        {
            path: '/lijidingzhi',
            name: "lijidingzhi",
            component: liji,
            meta: {
                title: '立即定制',
            }
        },
        {
            path: '/addAddress',
            name: "addadr",
            component: addadr,
            meta: {
                title: '添加地址',
                index: 4.7 //index用来定义当前路由的层级,由小到大,由低到高
            }
        },
        {
            path: '/adrManage',
            name: "adrmanage",
            component: adrmanage,
            meta: {
                title: '地址管理',
                index: 4.6 //index用来定义当前路由的层级,由小到大,由低到高
            }
        },
        {
            path: '/fahuo',
            name: "fahuo",
            component: fahuo,
            meta: {
                title: '发货操作',
                index: 7 //index用来定义当前路由的层级,由小到大,由低到高
            }
        },
        {
            path: '/success',
            name: "success",
            component: success,
            meta: {
                title: '提交定制信息',
            }
        },
        {
            path: '/fail',
            name: "fail",
            component: fail,
            meta: {
                title: '提交定制信息',
            }
        },
        {
            path: '/caigou',
            name: "caigou",
            component: caigou,
            meta: {
                title: '采购订单',
            }
        },
        {
            path: '/caigouDet',
            name: "caigouDet",
            component: caigouDet,
            meta: {
                title: '订单详情',
            }
        },
        {
            path: '/gongyingDet',
            name: "gongyingDet",
            component: gongyingDet,
            meta: {
                title: '订单详情',
                index: 4.1
            }
        },
        {
            path: '/gongying',
            name: "gongying",
            component: gongying,
            meta: {
                title: '供应订单',
            }
        },
        {
            path: '/queren',
            name: "queren",
            component: queren,
            meta: {
                title: '确认定制信息',
                index: 4.1
            }
        },
        {
            path: '/company',
            name: "company",
            component: company,
            meta: {
                title: '公司信息',
                index: 4.1
            }
        },
        // text order end
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: {
                tabbar: true,
                title: '如何秀',
                index: 1 //index用来定义当前路由的层级,由小到大,由低到高
            }
        },
        {
            path: '/prodesc',
            name: 'prodesc',
            component: prodDesc,
            meta: {
                title: '编辑模板(2/4)',
                index: 1.3
            }
        },
        {
            path: '/mitemp',
            name: 'mitemp',
            component: mitemp,
            meta: {
                title: '编辑模板(2/4)',
                index: 1.3
            }
        },
        // dev
        {
            path: '/more',
            name: 'more',
            component: more,
            meta: {
                title: '编辑模板(2/4)',
                index: 1.3
            }
        },
        {
            path: '/shouhou',
            name: 'shouhou',
            component: shouhou,
            meta: {
                title: '编辑模板(2/4)',
                index: 1.3
            }
        },
        // div end
        {
            path: '/adddesc',
            name: 'addInstrcDesc',
            component: addInstrcDesc,
            meta: {
                title: '介绍说明(3/4)',
                index: 1.4
            }
        },
        {
            path: '/adddesc1',
            name: 'addInstrcDesc1',
            component: addInstrcDesc1,
            meta: {
                title: '介绍说明(3/4)',
                index: 1.4
            }
        },
        {
            path: '/pubsucc',
            name: 'pubSucc',
            component: pubSucc,
            meta: {
                title: '分享二维码(4/4)',
                index: 1.5
            }
        },
        {
            path: '/aboutRhx',
            name: 'aboutRhx',
            component: aboutRhx,
            meta: {
                tabbar: false,
                title: '关于如何秀',
                index: 4.65 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/highQualityTemplate',
            name: 'highQualityTemplate',
            component: highQualityTemplate,
            meta: {
                tabbar: false,
                title: '优质模板',
                index: 1.2 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/createShow',
            name: 'createShow',
            component: createShow,
            meta: {
                tabbar: false,
                title: '选择模版(1/4)',
                index: 1.2 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/myInstructions',
            name: 'myInstructions',
            component: myInstructions,
            meta: {
                tabbar: true,
                title: '我的说明书',
                index: 2 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/instructionFabu',
            name: 'instructionFabu',
            component: instructionFabu,
            meta: {
                tabbar: false,
                title: '说明书详情',
                index: 2.1 //index用来定义当前路由的层级,由小到大,由低到高
            }
            // children: [{
            //     path: '/instructionData',
            //     name: 'instructionData',
            //     component: instructionData,
            //     meta: {
            //         tabbar: false,
            //         title: 'instructionData'
            //     },
            // }]
        }, {
            path: '/instructionWeiFabu',
            name: 'instructionWeiFabu',
            component: instructionWeiFabu,
            meta: {
                tabbar: false,
                title: '说明书详情',
                index: 2.3 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/instructionXiaXian',
            name: 'instructionXiaXian',
            component: instructionXiaXian,
            meta: {
                tabbar: false,
                title: '说明书详情',
                index: 2.4 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/instructionData',
            name: 'instructionData',
            component: instructionData,
            meta: {
                tabbar: false,
                title: '完整数据',
                index: 2.5 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/myMessage',
            name: 'myMessage',
            component: myMessage,
            meta: {
                tabbar: true,
                title: '我的留言',
                index: 3 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/myPersonal',
            name: 'myPersonal',
            component: myPersonal,
            meta: {
                tabbar: true,
                title: '个人中心',
                index: 4 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/editPerInfo',
            name: 'editPerInfo',
            component: editPerInfo,
            meta: {
                tabbar: false,
                title: '个人资料',
                index: 4.61 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/personalData',
            name: 'personalData',
            component: personalData,
            meta: {
                tabbar: false,
                title: '数据统计',
                index: 4.62 //index用来定义当前路由的层级,由小到大,由低到高
            }

        }, {
            path: '/zhangHao',
            name: 'zhangHao',
            component: zhangHao,
            meta: {
                tabbar: false,
                title: '账号信息',
                index: 4.63 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/feedBack',
            name: 'feedBack',
            component: feedBack,
            meta: {
                tabbar: false,
                title: '意见反馈',
                index: 4.64 //index用来定义当前路由的层级,由小到大,由低到高
            }
        }, {
            path: '/tel',
            name: 'tel',
            component: tel,
            meta: {
                tabbar: false,
                title: '绑定电话',
                index: 4.65 //index用来定义当前路由的层级,由小到大,由低到高
            }
        },
        // {
        //   path: '/index',
        //   name: 'index',
        //   component: index,
        //   meta: {
        //     tabbar: true,
        //     title: '如何秀',
        //   }
        // },
    ]
})
