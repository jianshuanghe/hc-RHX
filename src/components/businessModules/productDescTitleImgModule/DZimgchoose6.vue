<template>
  <div class="PDTIV1 dingzhi-base bg-fff" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <!-- <textarea :class="{ 'text': !disabled, 'dingzhi-head': true}" :disabled="disabled">{{mi_title_stitle_img.title}}</textarea> -->
    <textarea :class="{'dingzhi-head':true, 'text': editable}" maxlength="5" :disabled="!editable" v-model="mi_title_stitle_img.title" @blur="getVal"></textarea>
    <textarea :class="{'dingzhi-addimg-ms':true, 'text': false}" maxlength="20" disabled="true" v-model="mi_title_stitle_img.content" @blur="getVal"></textarea>
    <!-- <p class="dingzhi-addimg-ms">{{mi_title_stitle_img.content}}</p> -->
    <transition-group class="flex" name="list-complete" tag="div" mode="in-out">
      <section
        v-for="(item,index) in mi_title_stitle_img.dataList"
        :key="index"
        class="MITEMS-WRAP img-item"
      >
        <div class="delIcon"><i class="iconfont icon-L1" @click="removeImg($event,index)" v-if="!show.isChoseImg"></i></div>
        <img class="defaultImg" :src="item.imgUrl">
      </section>
    </transition-group>
    <label :class="{'addBtn':true, 'one': (mi_title_stitle_img.dataList.length==1 ? true:false), 'two': (mi_title_stitle_img.dataList.length==2 ? true:false), 'three': (mi_title_stitle_img.dataList.length==3 ? true:false)}" for="choseimgfile" :choseimgfile="choseimgfile" @click="changeImg">
      <i class="iconfont icon-icon-test"></i>
    </label>
    <!-- 删除 -->
    <div class="order-close dingzhi-icon-top" v-show="!disabled" @click="del($event)">
      <i class="iconfont icon-L1"></i>
    </div>
  </div>
</template>
<script>
import {gethashcode} from 'common/js/hash'
import manageModuleItemsTips from "components/businessModules/businessPublicModule/manageModuleItemsTips";
import moduleManageBtns from "components/businessModules/businessPublicModule/moduleManageBtns";
import changeImgTips from "components/businessModules/businessPublicModule/changeImgTips";
import lrz from "lrz";
import * as API from "config/api";
import LS from 'config/localstorage'

export default {
  // name: "product-desc-title-img-module",
  name: "DZimgc3",
  // props: {
  //   mi_title_stitle_img: {
  //     type: Object
  //   }
  // },
  components: {
    moduleManageBtns,
    manageModuleItemsTips,
    changeImgTips
  },
  data() {
    return {
      showDel: false,
      disabled: false,
      renderThis: true,
      editable: true,
      choseImg: "",
      choseimgfile: gethashcode(),
      show: {
        // 是否显示每一项的管理层
        isShowItemstips: false,
        isShowManageBtn: true,
        isChoseImg: false
      },
      // 小米空气净化器 标题小标题图片模块数据
      mi_title_stitle_img: {
        type: "INPUT_IMG_A",
        title: "添加照片",
        content: "照片最多可添加三张哦",
        dataList: [
          // {
          //   imgUrl: "http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png",
          // }
        ]
      }
    };
  },
  methods: {
    getVal(){
      LS.setItem("imgC3",this.mi_title_stitle_img)
    },
    del(e) {
      this.renderThis = false;
      this.mi_title_stitle_img = "";
      // alert("删除后该模块不可恢复，确定删除么？");
      $(e.target)
        .parent()
        .parent()
        .remove();
      this.getVal()
    },
    
    // 可编辑文字区域点击全选
    selectText(containerid) {
      if (document.selection && this.editable) {
        var range = document.body.createTextRange();
        range.moveToElementText(containerid.target);
        range.select();
      } else if (window.getSelection && this.editable) {
        var range = document.createRange();
        // range.collapse(false) // 光标追加到最后
        range.selectNodeContents(containerid.target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
    // 点击替换图片按钮
    changeImg() {
      this.getVal()
      // 不可删除，此方法用来唤醒图片上传选择
    },
    // 点击删除图片
    removeImg(e, key) {
      console.log(key)
      this.mi_title_stitle_img.dataList.splice(key,1);
      this.getVal()
    },
    // 选择后的文件对象并上传
    getThisFile(e) {
      this.getVal()
      this.thisImgFile = e.target.files[0]
      lrz(this.thisImgFile).then((afterImg) => {
        const that = this
        let formData = new FormData()
        formData.append('file', afterImg.file)
        formData.append('systemName', 'ruhexiu')
        API._UploadImg(formData).then((res) => {
          this.getVal()
          if (res.ret === API.ERROK) {
            let fD = new FormData()
            fD.append('fileName', res.name)
            API._uploadSuccess(fD).then((rs) => {
              if (rs.ret === API.ERROK) {
                let img = { 'imgUrl': rs.httpUrl };
                that.mi_title_stitle_img.dataList.push(img)
                // that.$set(that.choseImgPath, that.choseImgKey, rs.httpUrl)
              }
            })
          }
        })
        console.log(afterImg)
      })
      e.target.value = ''
    },
  },
  computed: {
    editTextOutLine() {
      if (this.editable) {
        return `outline:.02rem dashed rgba(172,172,172,1)`;
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';
@import '~common/stylus/variable';

.PDTIV1{
  height 211px
}

.img-item{
  position relative
  width 100px
  height 100px
  margin 8px 15px 0 0
}

.delIcon{
  width 20px
  height 20px
  position absolute
  top -10px
  right -10px
  display flex
  justify-content center
  align-items center
  background #e2e2e2;
  font-size 12px
  border-radius 50%
  color #c2c2c2
} 

.addBtn .icon-icon-test{
  font-size 20px

}
.addBtn{
  display flex
  justify-content center
  align-items center
  width 100px
  height 100px
  // margin 30px 0 0 10px
  color #E2E2E2
  box-sizing border-box
  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  border-radius: 2px;
  position absolute
  top 92px
  left 12px
}

.addBtn.one{
  left 130px
}
.addBtn.two{
  left 244px
}
.addBtn.three{
  display none
}

.img-item:last-child{
  margin-right 0
}

.popover_content{
  width 80px
}

.defaultImg{
  width 100%
  height 100%
  border-radius: 2px;
}

.flex {
  display: flex;
}

.index-banner {
  position: relative;
}

.dingzhi-caigou-text {
  width: 168px;
  height: 40px;
  font-size: 13px;
  color: #2E2E30;
  border: 1px solid #D2D2D2;
  padding: 0 10px;
  box-sizing: border-box;
}

.dingzhi-number-icon {
  width: 38px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border: 1px solid #D2D2D2;
  font-size: 30px;
  color: #D2D2D2;
}

.dingzhi-number-ipt {
  width: 70px;
  height: 38px;
  font-size: 13px;
  color: #2E2E30;
  text-align: center;
  border-top: 1px solid #D2D2D2;
  border-bottom: 1px solid #D2D2D2;
}

.dingzhi-numberbpx {
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dingzhi-beizhu {
  width: 100%;
  margin-top: -10px;
  font-size: 12px;
}

.dingzhi-addimg-ms {
  width: 100%;
  font-size: 12px;
  color: #9B9B9B;
  line-height: 12px;
  margin-top: -10px;
}

.dingzhi-caigou-ul {
  width: 100%;
}

.dingzhi-caigou-li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dingzhi-style-cz {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(46, 46, 48, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dingzhi-style-head {
  width: 228px;
  height: 14px;
  font-size: 13px;
  color: #2E2E30;
}

.dingzhi-style-ms {
  width: 240px;
  font-size: 12px;
  color: #9B9B9B;
  line-height: 20px;
  margin-top: 4px;
}

.dingzhi-stlye-li {
  width: 100%;
  // height: 100px;
  // padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  // justify-content: space-between;
  position: relative;
  margin-bottom: 10px;
}

.dingzhi-stlye-ul {
  width: 100%;
}

.dingzhi-tupianC-del-btn {
  padding: 10px 12px;
  font-size: 13px;
  color: #FFFFFF;
  background: #2E2E30;
}

.dingzhi-tupianC-del {
  width: 100%;
  height: 100%;
  background: rgba(46, 46, 48, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dingzhi-tupianC-div {
  width: 100%;
  position: relative;
}

.dingzhi-tupianC-li-b {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.icon-wancheng {
  font-size: 12px;
}

.icon-wancheng.on {
  color: #E2E2E2;
}

.dingzhi-tupianC-ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.notop {
  width: 22%;
  text-align: center;
  margin-right: 3%;
}

.order-show-cube .cube-select:after {
  border: none;
}

.dingzhi-cus-ipt {
  width: 200px;
  padding: 14px 10px;
  border: 1px solid #D2D2D2;
  border-radius: 2px;
  box-sizing: border-box;
}

.dingzhi-base-li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.dingzhi-ipt {
  width: 60px;
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  color: #2E2E30;
}

.dingzhi-tupianC-ipt {
  max-width: 65px;
  line-height: 20px;
  font-size: 12px;
  color: #2E2E30;
  text-align: center;
}

.dingzhi-head {
  width: 300px;
  height: 20px !important;
  font-size: 14px;
  color: #2E2E30;
  font-weight: 600;
  margin-bottom: 20px;
}

.dingzhi-base {
  width: 100%;
  padding: 20px 12px;
  float: left;
  margin-top: 10px;
  position: relative;
}

input[disabled], input:disabled, input.disabled {
  background: none;
  opacity: 1;
}

.bg-fff {
  background: #fff;
}

.order-dingzhi {
  width: 100%;
  background: #f9f9f9;
  float: left;
}

.order-dingzhi-title {
  width: 100%;
  padding: 15px 10px;
  font-size: 16px;
  color: #2E2E30;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  float: left;
  position: relative;
}

.order-dingzhi-title:before {
  content: '';
  width: 133px;
  height: 1px;
  background: #E2E2E2;
  position: absolute;
  left: 12px;
  top: 24px;
}

.order-dingzhi-title:after {
  content: '';
  width: 133px;
  height: 1px;
  background: #E2E2E2;
  position: absolute;
  right: 12px;
  top: 24px;
}

.demo2 {
  width: 100%;
  padding: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  padding-right: 15px;
  color: #3C3C3F;
  border: 1px solid #d2d2d2;
}

.order-shili-ul {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.order-shili-ul li {
  padding: 14px 10px;
  font-size: 14px;
  color: #2E2E30;
  position: relative;
  border: 1px solid #D2D2D2;
}

.order-show-cube {
  margin: 0 10px 10px 0;
}

.order-show-cube .cube-popup {
  z-index: 99999999;
}

.order-show-cube .cube-picker-confirm {
  top: 0 !important;
}

.order-close {
  position: absolute;
  top: 0;
  right: 12px;
}

.order-table-tdW {
  width: 90px;
}

.qipi-miaoshu {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  color: #FAB100;
  letter-spacing: 0;
  line-height: 11px;

  p {
    margin-bottom: 10px;
  }
}

.order-table {
  width: 100%;
  border: 1px solid #d2d2d2;
  margin: 10px 0 16px 0;

  tr td {
    border: 1px solid #d2d2d2;
    padding: 13px;
  }
}

.order-table-ipt {
  width: 100%;
}

.qipi {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .qipi-danwei {
    font-size: 14px;
    color: #2E2E30;
  }

  .qipi-danwei-text {
    width: 270px;
    border: 1px solid #D2D2D2;
    padding: 14px 10px;
  }
}

.manage-product {
  margin-top: 20px;
}

.paddingB {
  padding-bottom: 70px;
}

.order-banner-img {
  width: 100%;
  display: block;
  margin: 12px 0;
}

.order-show {
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  position: relative;
}

.order-product-title {
  width: 100%;
  height: 16px;
  margin: 40px 0 20px 0;
  font-size: 16px;
  color: #2E2E30;
  font-weight: 600;
}

.text {
  border: 1px dashed rgb(172, 172, 172);
}

.order-dz-btn {
  width: 100%;
  height: 45px;
  background: rgba(46, 46, 48, 0.6);
  position: fixed;
  bottom: 0;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  z-index: 999;
}

.order-product-ms {
  width: 100%;
  font-size: 13px;
  color: #2E2E30;
  line-height: 20px;
}

.ediTingBtmBtns {
  width: 100%;
  display: flex;
  height: 44px;
  background: rgba(46, 46, 48, 0.8);
  position: fixed;
  bottom: -44px;
  transition: all 0.3s;
  justify-content: center;
  z-index: 99999;

  .ediTingBtmBtnsItems {
    flex: 1;
    text-align: center;
    line-height: 44px;

    a {
      display: block;
      color: #fff;
      font-size: 16px;
      font-weight: 300;
      line-height: 44px;
      cursor: pointer;

      i {
        font-size: 16px;
      }
    }
  }

  .goLine {
    background: linear-gradient(to right, rgba(21, 212, 159, 1), rgba(87, 214, 207, 1));
  }

  .moduleMangBtnGroup {
    width: 100%;
    height: 40px;
    text-align: center;
    transition: all 0.5s;
  }

  .moduleMangBtnGroup a {
    display: inline-block;
    width: 95px;
    height: 33px;
    line-height: 33px;
    margin-right: 14px;
    background: $color-2e;
    color: $color-fff;
    font-size: 13px;
    border-radius: 3px;
    font-weight: 300;
    cursor: pointer;
  }

  .moduleMangBtnGroup a i {
    font-size: 13px;
  }
}

.order-show-cube .order-close {
  width: 20px;
  height: 20px;
  right: -10px;
  top: -10px;
  opacity: 0.6;
  background: #2E2E30;
  color: #fff;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
  border-radius: 100%;
}

.dingzhi-icon-top {
  top: 22px;
}
</style>
