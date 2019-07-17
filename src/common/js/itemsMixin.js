/**
 * 模板中的最小单元：项
 * **/
import productDescHowUse from 'components/businessModules/productDescTempItems/productDescHowUse'
export const itemsMixin = {
  components:{
    'bannerSlider': (resolve) => {
      require(['components/businessModules/businessPublicModule/bannerSlider'], resolve)
    },
    'topNav': (resolve) => {
      require(['components/businessModules/businessPublicModule/topNav'], resolve)
    },
    // 'productDescTitleImgModuleV1': (resolve) => {
    //   require(['components/businessModules/productDescTitleImgModule/productDescTitleImgModuleV1'], resolve)
    // },
    // 标题，副标题，图片
    'productDescTitleImgItems': (resolve) => {
      require(['components/businessModules/productDescTempItems/productDescTitleImgItems'], resolve)
    },
    // 四大优势
    'productDescFourBetter': (resolve) => {
      require(['components/businessModules/productDescTempItems/productDescFourBetter'], resolve)
    },
    // 使用场景
    'productDescScenes': (resolve) => {
      require(['components/businessModules/productDescTempItems/productDescScenes'], resolve)
    },
    // 如何安装
    'productDescHowInstall': (resolve) => {
      require(['components/businessModules/productDescTempItems/productDescHowInstall'], resolve)
    },
    // 如何使用
    'productDescHowUse': (resolve) => {
      require(['components/businessModules/productDescTempItems/productDescHowUse'], resolve)
    },

    'ediTingBtmBtns': (resolve) => {
      require(['components/businessModules/businessPublicModule/ediTingBtmBtns'], resolve)
    }
    // 'moduleManageBtns': (resolve) => {
    //   require(['components/businessModules/businessPublicModule/moduleManageBtns'], resolve)
    // }
  }
}
