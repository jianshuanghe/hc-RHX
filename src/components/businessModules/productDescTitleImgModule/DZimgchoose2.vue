<template>
  <div class="PDTIV1 dingzhi-base bg-fff" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <textarea :class="{ 'text': !disabled, 'dingzhi-head': true}" maxlength="5" :disabled="disabled" v-model="mi_title_stitle_img.title"></textarea>
    <transition-group name="list-complete" tag="div" mode="in-out">
      <section
        v-for="(item,index) in mi_title_stitle_img.dataList"
        :key="index"
        class="MITEMS-WRAP list-complete-item dingzhi-stlye-li"
      >
        <manage-module-items-tips
          v-show="show.isShowItemstips" :tIndex="index"
          @delate-this-items="DelateThisItems(index)"
          @up-this-items="UpThisItems(index)"
          @down-this-items="DownThisItems(index)">
        </manage-module-items-tips>
        <div style="position:relative">
          <changeImgTips @change-img="changeImg(item,'imgUrl')"
                          @remove-img="removeImg(item,'imgUrl')" :choseimgfile="choseimgfile" v-if="showItem === index">
          </changeImgTips>
          <img class="defaultImg" :src="item.imgUrl || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="img" @click.prevent="showChoseImgBtns(item,index)">
        </div>
        <div>
          <div>
            <textarea
              :class="{ 'text': !disabled, 'dingzhi-style-head': true}"
              :disabled="disabled"
              v-model="item.title"
              maxlength="20"
            ></textarea>
            <i :class="{'iconfont icon-wancheng':true, 'on':!item.select}" style="float:left;margin-top:6px" @click="choose(index)"></i>
          </div>
          <div>
            <textarea
              :class="{ 'text': !disabled, 'dingzhi-style-ms': true}"
              :disabled="disabled"
              v-model="item.content"
              maxlength="200"
            ></textarea>
          </div>
        </div>
        <!-- 操作 -->
        <!-- <div class="dingzhi-style-cz" v-show="showDel">
          <p class="dingzhi-tupianC-del-btn" style="margin-right:14px" @click="DelateThisItems(index)">删除</p>
        </div> -->
      </section>
    </transition-group>
    <module-manage-btns
      v-if="editable"
      ref="base"
      @manage-this-item="manageThisItem"
      @finsh-manage-this-item="finshManageThisItem"
      @add-this-item="addThisItem"
    ></module-manage-btns>
    <!-- 删除 -->
    <div class="order-close dingzhi-icon-top" v-show="!disabled" @click="del($event)">
      <i class="iconfont icon-L1"></i>
    </div>
  </div>
</template>
<script>
import { autoTextarea } from "common/js/dom";
import {gethashcode} from 'common/js/hash'
import manageModuleItemsTips from "components/businessModules/businessPublicModule/manageModuleItemsTips";
import moduleManageBtns from "components/businessModules/businessPublicModule/moduleManageBtns";
import changeImgTips from "components/businessModules/businessPublicModule/changeImgTips";
import lrz from "lrz";
import * as API from "config/api";

export default {
  // name: "product-desc-title-img-module",
  name: "DZimgc2",
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
      showItem: '', // 点击的图片显示操作按钮
      // 小米空气净化器 标题小标题图片模块数据
      mi_title_stitle_img: {
        type: "INPUT_CHECK_B",
        title: "样式选择",
        dataList: [
          {
            content:
              "这里是关于图片的具体描述信息，这里是关于图片的具体描述信息",
            imgUrl:
              "http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png",
            select: true,
            title: "标题文字1"
          },
          {
            content:
              "这里是关于图片的具体描述信息，这里是关于图片的具体描述信息",
            imgUrl:
              "http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png",
            select: false,
            title: "标题文字1"
          },
          {
            content:
              "这里是关于图片的具体描述信息，这里是关于图片的具体描述信息",
            imgUrl:
              "http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png",
            select: false,
            title: "标题文字1"
          },
          {
            content:
              "这里是关于图片的具体描述信息，这里是关于图片的具体描述信息",
            imgUrl:
              "http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png",
            select: false,
            title: "标题文字1"
          },
        ]
      }
    };
  },
  beforeUpdate(){
    let height = $(document).scrollTop();
    this.$nextTick(()=>{
      // 切换编辑状态
      let test = document.querySelectorAll("textarea");
      for (let i = 0; i < test.length; i++) {
        autoTextarea(test[i]);
      }
      // 解决触发beforeUpdate以后滚动条回滚
      $(document).scrollTop(height)
    })
  },
  methods: {
    choose(i) {
      // 多选
      // this.mi_title_stitle_img.dataList[i].select = !this.mi_title_stitle_img.dataList[i].select;
      // 单选
      this.$parent.danx2 = this.mi_title_stitle_img.dataList[i].title;
      let lh = this.mi_title_stitle_img.dataList.length;
      for(let a=0; a<lh; a++){
        if(a == i){
          this.mi_title_stitle_img.dataList[i].select = true;
        } else {
          this.mi_title_stitle_img.dataList[a].select = false;
        }

      }
    },
    del(e) {
      this.$emit("listenDZimgc2",1)
      this.renderThis = false;
      this.mi_title_stitle_img = "";
      // alert("删除后该模块不可恢复，确定删除么？");
      // $(e.target)
      //   .parent()
      //   .parent()
      //   .remove();
    },
    // 管理此项
    manageThisItem() {
      this.show.isShowItemstips = true;
      this.showDel = true;
    },
    // 完成管理此项
    finshManageThisItem() {
      this.show.isShowItemstips = false;
      this.showDel = false;
    },
    // 删除某一项
    DelateThisItems(i) {
      if (this.mi_title_stitle_img.dataList.length === 1) {
        alert("删除后该模块不可恢复，确定删除么？");
        this.renderThis = false;
      } else {
        this.mi_title_stitle_img.dataList.splice(i, 1);
      }
    },
    // 上移此项
      UpThisItems(i) {
        let startItems = this.mi_title_stitle_img.dataList.slice(i, i + 1)
        let goItems = this.mi_title_stitle_img.dataList.slice(i - 1, i)
        this.$set(this.mi_title_stitle_img.dataList, i, goItems[0])
        this.$set(this.mi_title_stitle_img.dataList, i - 1, startItems[0])
      },
      // 下移此项
      DownThisItems(i) {
        let startItems = this.mi_title_stitle_img.dataList.slice(i, i + 1)
        let goItems = this.mi_title_stitle_img.dataList.slice(i + 1, i + 2)
        this.$set(this.mi_title_stitle_img.dataList, i + 1, startItems[0])
        this.$set(this.mi_title_stitle_img.dataList, i, goItems[0])
      },
    // 复加此项
    addThisItem() {
      // if (this.mi_title_stitle_img.dataList.length < 4) {
        let lastItems = JSON.parse(
          JSON.stringify(
            this.mi_title_stitle_img.dataList[
              this.mi_title_stitle_img.dataList.length - 1
            ]
          )
        );
        lastItems.index += 1;
        this.mi_title_stitle_img.dataList.push(lastItems);
      // } else {
      //   alert("最多4项");
      // }
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
    // 点击图片弹出选择图片按钮
    showChoseImgBtns(item,key){
      console.log(item, key, '-------------------itemAndkye XJ-------------')
      if(this.editable){
        this.showItem = key
      }
      return
    },
      // 点击替换图片按钮
      changeImg(imgPath, key) {
        this.choseImgPath = imgPath
        this.choseImgKey = key
        this.showItem = '' // 将标记置空
      },
      // 点击删除图片
      removeImg(imgPath, key) {
        imgPath[key] = ''
        this.showItem = '' // 将标记置空
      },
      // 选择后的文件对象并上传
      getThisFile(e) {
        this.thisImgFile = e.target.files[0]
        console.log(this.thisImgFile)
        lrz(this.thisImgFile).then((afterImg) => {
          const that = this
          let formData = new FormData()
          formData.append('file', afterImg.file)
          formData.append('systemName', 'ruhexiu')
          API._UploadImg(formData).then((res) => {
            if (res.ret === API.ERROK) {
              let fD = new FormData()
              fD.append('fileName', res.name)
              API._uploadSuccess(fD).then((rs) => {
                if (rs.ret === API.ERROK) {
                  that.$set(that.choseImgPath, that.choseImgKey, rs.httpUrl)
                  that.show.isChoseImg = false
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

.list-complete-item{
  margin 0
}

.popover_content{
  width 80px
}

.defaultImg{
  width 80px
  height 80px
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
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
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
  width: 10vw;
  height: 10vw;
  top: -3vw;
  right: 1.2vw;
}
.order-close>i{
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
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
