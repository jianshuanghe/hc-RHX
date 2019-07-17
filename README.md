# rhx-mobile-v2

> 如何秀项目2期

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
###可能用到的特性
 ```
 >>html中
 contenteditable="true"
 spellcheck="true"
 >>style中
 word-wrap:break-word
 cursor:text
 ```
 ###项目结构
  ````
  #src结构
  ---src
        # assets //---静态文件
        # common //---静态资源js/fonts/images/stylus
            fonts
            images
            js
            stylus
        # components // 组件模板
            businessModules //---公共组件
                businessPublicModule
                    bannerSlider // ---轮播组件
                    changeImgTips //---图片替换删除组件
                    ediTingBtmBtns //---底部草稿/预览/发布组件
                    manageModuleItemsTips //---管理项目中的上移/下移/删除
                    manageModuleItemsTipsBak //---
                    moduleManageBtns //---编辑状态下的管理项目/添加此项和完成按钮
                    topNav //--- 顶部组件
                feiniao
                    chengyuan
                    foot
                    huanjing
                    jianjie
                    lianxi
                    licheng
                    liuyan
                    shouhou
                    team
                    textMs
                    tuwen
                    wenhua
                productDeseTempltems
                    miCanshuMd
                    miCareMd
                    miContactUsMd
                    miDescMd
                    miUseMd
                    productDescFourBetter
                    ProductDescHowHealth
                    productDescHowInstall
                    productDescHowUse
                    productDescScenes
                    productDeseTitleImgItems
                productDescTitleImgModule
                    productDescTileImgModule
                    productDeseTileImgModuleV1
                shuixiaoya
                    foot
                    fuwu
                    icon
                    introduction
                    lianxi
                    liuyan
                    more
                    pingtai
                    shouhou
                    shuixiaoya
                    tedian
                    youshi
            globalModules
            templates
        # config //环境和缓存
        # mixins //---微信分享
        # pages //---页面
            home //---创建
                aboutRhx //---关于如何秀
                    aboutRhx
                highQualityTemplate //---高质量模板
                    addInstrcDesc
                    createShow //---模板子项通用模板/定制模板/机器行业模板
                    HighQualityTemplate
                    pubSucc
                home //---首页展示
                    index
                    Loading
            myMessages //---留言全部/已读
            myShows //---我的说明书
                instructionData //---点击其中一个说明书进去-----说明书详情里的-查看完整数据
                instructionFabu //---点击其中一个说明书进去-----说明书详情---再次编辑/完善信息/删除
                instructions //---我的说明书主页
                instructionWeiFaBu //---未发布
                instructionXiaXian //---下线
            personalCenter //---我的
                editPerInfo //---编辑个人资料
                feedBack1
                feedBack //---意见反馈
                myPersonal //---我的--数据统计文字说明
                personalData //---数据统计
                zhangHao //---账户信息
        # router
        # store
        # style
        # App.vue
        # main.js

````
 ###第一版项目结构
```
{
// url中的模板key 例如： http://10.158.41.211:8080/mitemp?instrucId=690&tempId=45&lookMyInstrc=1
  "path": "mitemp",
  "tempCon": {
  	// 控制是否可编辑状态
    "editAble": false,
    // banner数组
    "banner": [
      {
        "picUrl": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-banner-01.jpg",
        "linkUrl": ""
      },
      {
        "picUrl": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-banner-02.jpg",
        "linkUrl": ""
      },
      {
        "picUrl": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-banner-03.jpg",
        "linkUrl": ""
      },
      {
        "picUrl": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-banner-04.jpg",
        "linkUrl": ""
      }
    ],
    // 所有模块对象
    "modules": {
    // 模块的key
      "mi_desc": {
      // 模块的图标相关
        "icon": {
        	// 模块的图标
          "iconImg": "",
          // 给用户展示的图标的名字
          "iconName": "产品简介",
          // 模块的标题
          "moduleTitle": "产品简介",
          // 模块的缩略图(添加模块的时候使用)
          "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-03.jpg",
          // 开发者操作的模块名字
          "moduleName": "mi_desc"
        },
        // 模块内容相关
        "descCon": [
          {
            "index": 0,
            "title": "正反面显示",
            "s_title": "屏幕显示",
            "item_img": "http://style.iambuyer.com/img/mi-temp-imgs-02.jpg"
          },
          {
            "index": 1,
            "title": "屏幕显示",
            "s_title": "机体正面屏幕显示内容说明",
            "item_img": "http://style.iambuyer.com/img/mi-temp-imgs-03.jpg"
          }
        ]
      },
      "mi_install": {
        "icon": {
          "iconImg": "",
          "iconName": "如何安装",
          "moduleTitle": "如何安装",
          "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-06.jpg",
          "moduleName": "mi_install"
        },
        "installCon": [
          {
            "index": 0,
            "item_num": 1,
            "title": "打开滤芯仓门",
            "item_con": "下压仓门开关，打开滤芯仓门，确认滤芯已入位.",
            "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-01.jpg"
          },
          {
            "index": 1,
            "item_num": 2,
            "title": "取出电源线",
            "item_con": "从仓内包装袋中取出电源线，并关闭滤芯仓门.",
            "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-02.jpg"
          },
          {
            "index": 2,
            "item_num": 3,
            "title": "连接电源",
            "item_con": "电源线连接至底部的接口，接入电源.",
            "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-03.jpg"
          },
          {
            "index": 3,
            "item_num": 4,
            "title": "打开手机APP",
            "item_con": "下载并且打开APP，然后启动开关.",
            "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-04.jpg"
          }
        ]
      },
      "mi_use": {
        "icon": {
          "iconImg": "",
          "iconName": "如何使用",
          "moduleTitle": "如何使用",
          "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-07.jpg",
          "moduleName": "mi_use"
        },
        "useCon": [
          {
            "index": 0,
            "item_num": 1,
            "title": "正确位置摆放",
            "s_title": "为了更好的发挥空气净化器的性能，在使用时主机进风口应与墙壁等遮挡物保持一定的距离.",
            "item_con": "下压仓门开关，打开滤芯仓门，确认滤芯已入位.",
            "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-09.jpg"
          },
          {
            "index": 1,
            "item_num": 2,
            "title": "电源开关/运行模式切换",
            "s_title": "单机开机，点击切换运行模式，长按2秒关机单机开机.",
            "item_con": "从仓内包装袋中取出电源线，并关闭滤芯仓门.",
            "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-10.jpg"
          }
        ]
      },
      "mi_canshu": {
        "icon": {
          "iconImg": "",
          "iconName": "基本参数",
          "moduleTitle": "基本参数",
          "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-02.jpg",
          "moduleName": "mi_canshu"
        },
        "canshuCon": [
          {
            "index": 0,
            "title": "基本参数",
            "s_title": "基本参数",
            "item_img": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-imgs-13.jpg"
          }
        ]
      },
      "mi_care": {
        "icon": {
          "iconImg": "",
          "iconName": "注意事项",
          "moduleTitle": "注意事项",
          "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-10.jpg",
          "moduleName": "mi_care"
        },
        "careCon": [
          {
            "index": 0,
            "title": "搬运",
            "s_title": "移动时，请务必使主机停止运行，并拔出插头."
          },
          {
            "index": 1,
            "title": "电源",
            "s_title": "请勿过度拧捏、弯曲或扭转电源线，否则可能引起线芯外露或折断，断开电源时，请勿拉扯电源线."
          },
          {
            "index": 2,
            "title": "使用限制",
            "s_title": "请勿在浴室等高温、潮湿、会沾水的场所使用."
          }
        ]
      },
      "mi_contact": {
        "icon": {
          "iconImg": "",
          "iconName": "联系我们",
          "moduleTitle": "联系我们",
          "moduleImg": "http://style.iambuyer.com/img/temp-xiaomi-imgs/temp-xiaomi-public-module/temp-xiaomi-public-module-01.jpg",
          "moduleName": "mi_contact"
        },
        "contactCon": [
          {
            "index": 0,
            "item_num": 1,
            "item_title": "联系方式",
            "companyPhone": "400 **** 789",
            "companyEmail": "xxxx@hc360.com",
            "companyAddress": "北京市昌平区回龙观七里渠慧聪园总部基地"
          },
          {
            "index": 1,
            "item_num": 2,
            "item_title": "直接留言"
          }
        ]
      }
    },
    // 模板中模块的排列顺序
    "modulesSort": [
      "mi_desc",
      "mi_install",
      "mi_use",
      "mi_canshu",
      "mi_care",
      "mi_contact"
    ],
    // 导航更换图标供选择的图标库（不使用图片，采用icon字体，更改大小与颜色等样式方便，占用空间小）
    "selIconList": [
  "","","","","","","","","","","","","","","","","","","","","","","","","",""
  ],
    "dragSort": [],
    "userPhone": "",
    // 关于我们的信息，与个人中心信息同步
    "flowMe": {
      "companyName": "",
      "companyIntro": "",
      "qrImg": "",
      "telPhone": "",
      "emailAddress": "",
      "companyAddress": ""
    },
    // 用户的自定义按钮
    "userActionBtn": {
      "middleBtn": {
        "btnName": "",
        "btnLink": ""
      },
      "rightBtn": {
        "btnName": "",
        "btnLink": ""
      }
    }
  }
}
```
 ###第二版项目结构
 ```angular2

```
