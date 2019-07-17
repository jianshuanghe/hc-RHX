export const itemsMixin  = {
  components:{
    //产品简介
    'mi_desc':(resolve) => {
      require(['components/businessModules/productDescTempItems/miDescMd'], resolve)
    },
    //如何安装
    'mi_install':(resolve) => {
      require(['components/businessModules/productDescTempItems/miInstallMd'], resolve)
    },
    //如何使用
    'mi_use': (resolve) => {
      require(['components/businessModules/productDescTempItems/miUseMd'], resolve)
    },
    //基本参数
    'mi_canshu': (resolve) => {
      require(['components/businessModules/productDescTempItems/miCanshuMd'], resolve)
    },
    //注意事项
    'mi_care': (resolve) => {
      require(['components/businessModules/productDescTempItems/miCareMd'], resolve)
    },
    //联系我们
    'mi_contact': (resolve) => {
      require(['components/businessModules/productDescTempItems/miContactUsMd'], resolve)
    },
  }
}
