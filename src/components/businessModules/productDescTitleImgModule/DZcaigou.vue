<template>
  <div class="PDTIV1 dingzhi-base bg-fff" v-if="renderThis">
    <!-- 选择上传文件bridge -->
    <input
      type="file"
      id="choseImgFile"
      class="hide"
      @change="getThisFile"
      ref="choseImgFile"
      accept="image/*"
    >
    <!-- 选择上传文件bridge -->
    <!-- <textarea :class="{ 'text': editable, 'dingzhi-head': true}" :disabled="disabled" v-model="mi_title_stitle_img.title"></textarea> -->
    <textarea :class="{ 'text': !editable, 'dingzhi-head': true}" :disabled="!disabled" v-model="mi_title_stitle_img.title"></textarea>
    <transition-group name="list-complete" tag="div" mode="in-out">
      <section
        v-for="(item,index) in mi_title_stitle_img.dataList"
        :key="index"
        class="MITEMS-WRAP"
      >
        <ul class="dingzhi-caigou-ul ">
          <li class="dingzhi-caigou-li">
            <!-- <input class="dingzhi-caigou-text" type="text" :placeholder="item.key" v-model="item.key"> -->
            <div class="dingzhi-caigou-text"@click="showMutiPicker(index)">
              <p class="">{{mi_title_stitle_img.dataList[index].key === 'undefinedundefinedundefined' ? '' : mi_title_stitle_img.dataList[index].key}}</p>
              <!--<cube-button >{{item.key.indexOf("undefined")>-1?'':item.key}}</cube-button>-->
            </div>
            <div class="dingzhi-numberbpx">
              <b class="dingzhi-number-icon" @click="numberD(index)">-</b>
              <input class="dingzhi-number-ipt" type="text" v-model="item.count">
              <b class="dingzhi-number-icon" @click="numberA(index)">+</b>
            </div>
            <i class="iconfont icon-Z3" v-show="showDel && index>0" @click="DelateThisItems(index)"></i>
          </li>
        </ul>
        <div class="maskDZ" v-if="isMaskShow" @click="cancelShow">
        </div>
        <div class="imgClose" v-if="isMaskShow">
            <div class="titleBox">
              <p class="">{{imgClose? '图片选择' : '样式选择'}}</p>
            </div>
            <div class="contentBox">
              <div class="imgCloseBox" v-if="imgClose">
                <div class="listBox"  v-for="(item,index) in value1" @click="clickListImg(index)">
                  <div class="imgBox left">
                    <img :src="item.img" alt="" class="">
                  </div>
                  <div class="textBox left">
                    <p class="">{{item.text}}</p>
                  </div>
                  <div class="iconBox left">
                    <span class=""></span>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
              <div class="imgCloseBox" v-else>
                <div class="listBox"  v-for="(item,index) in value2" @click="clickListCSS(index)">
                  <div class="imgBox left">
                    <img :src="item.img" alt="" class="">
                  </div>
                  <div class="textBox left">
                    <p class="">{{item.text}}</p>
                  </div>
                  <div class="iconBox left">
                    <span class=""></span>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
            <div class="bottomBox"@click="cancelShow">
              <p class="">取消</p>
            </div>
          </div>
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
    <!-- <div class="order-close dingzhi-icon-top" v-show="editable" @click="del($event)">
      <i class="iconfont icon-L1"></i>
    </div> -->
  </div>
</template>
<script>
import manageModuleItemsTips from "components/businessModules/businessPublicModule/manageModuleItemsTips";
import moduleManageBtns from "components/businessModules/businessPublicModule/moduleManageBtns";
import changeImgTips from "components/businessModules/businessPublicModule/changeImgTips";
import lrz from "lrz";
import * as API from "config/api";

const column1 = [{ text: '剧毒', value: '剧毒'}, { text: '蚂蚁', value: '蚂蚁' },
  { text: '幽鬼', value: '幽鬼' }]
const column2 = [{ text: '输出', value: '输出' }, { text: '控制', value: '控制' },
  { text: '核心', value: '核心'}, { text: '爆发', value: '爆发' }]
export default {
  name: "product-desc-title-img-module",
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
  updated(){
    let cut = 0;
    let lh = this.mi_title_stitle_img.dataList.length
    for(let i=0; i<lh; i++){
      cut += Number(this.mi_title_stitle_img.dataList[i].count);
    }
    this.totalCount = Number(cut)
  },
  data() {
    return {
      isMaskShow:false, // 弹层展示
      imgClose:true, // 样式：默认时图片选择
      index: "",
      choseListData:'', // 选择的数据
      value1: [],
      value2: [],
      options: [2013, 2014, 2015, 2016, 2017, 2018],
      showDel: false,
      disabled: false,
      renderThis: true,
      editable: true,
      choseImg: "",
      totalCount: "",
      show: {
        // 是否显示每一项的管理层
        isShowItemstips: false,
        isShowManageBtn: true,
        isChoseImg: false
      },
      // 小米空气净化器 标题小标题图片模块数据
      mi_title_stitle_img: {
        type: "INPUT_TABLE_B",
        title: "采购数量",
        dataList: [
          {
            count: "1",
            key: ""
          }
        ]
      }
    };
  },
  methods: {
    showMutiPicker(i) {
      console.log('触发选择');
      this.isMaskShow = !this.isMaskShow;
      this.index = i;
    },
    clickListImg(e){ // 图片选择
      this.imgClose = !this.imgClose;
      this.value1.map((item,index)=>{
        if (e === index){
          this.choseListData = item.value
        }
      })
    },
    clickListCSS(e){ // 样式选择
      this.isMaskShow = !this.isMaskShow;
      this.imgClose = !this.imgClose;
      this.value2.map((item,index)=>{
        if (e === index){
          this.choseListData = this.choseListData + " " +  item.value
        }
      })
      this.mi_title_stitle_img.dataList[this.index].key = this.choseListData
    },
    cancelShow(){ // 隐藏
      this.isMaskShow = !this.isMaskShow;
    },
    change(value, index, text) {
      console.log('change', value, index, text)
    },
    getV(){
      this.mi_title_stitle_img.dataList[0].key = keyValue;
    },
    // number+
    numberA(i) {
      this.mi_title_stitle_img.dataList[i].count++;
    },
    // number-
    numberD(i) {
      if (this.mi_title_stitle_img.dataList[i].count > 0) {
        this.mi_title_stitle_img.dataList[i].count--;
      }
    },
    del(e) {
      this.mi_title_stitle_img = "";
      // alert("删除后该模块不可恢复，确定删除么？");
      $(e.target)
        .parent()
        .parent()
        .remove();
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
      let startItems = this.mi_title_stitle_img.dataList.slice(i, i + 1);
      let goItems = this.mi_title_stitle_img.dataList.slice(i - 1, i);
      this.$set(this.mi_title_stitle_img.dataList, i, goItems[0]);
      this.$set(this.mi_title_stitle_img.dataList, i - 1, startItems[0]);
    },
    // 下移此项
    DownThisItems(i) {
      let startItems = this.mi_title_stitle_img.dataList.slice(i, i + 1);
      let goItems = this.mi_title_stitle_img.dataList.slice(i + 1, i + 2);
      this.$set(this.mi_title_stitle_img.dataList, i + 1, startItems[0]);
      this.$set(this.mi_title_stitle_img.dataList, i, goItems[0]);
    },
    // 复加此项
    addThisItem() {
      if (this.mi_title_stitle_img.dataList.length < 4) {
        let lastItems = JSON.parse(
          JSON.stringify(
            this.mi_title_stitle_img.dataList[
              this.mi_title_stitle_img.dataList.length - 1
            ]
          )
        );
        lastItems.index += 1;
        this.mi_title_stitle_img.dataList.push(lastItems);
      } else {
        alert("最多4项");
      }
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
    showChoseImgBtns() {
      if (this.editable) {
        this.show.isChoseImg = !this.show.isChoseImg;
      }
      return;
    },
    // 点击替换图片按钮
    changeImg(i) {
      console.log(i);
      this.choseImgIndex = i;
    },
    // 选择后的文件对象并上传
    getThisFile(e) {
      this.show.isChoseImg = false;
      this.thisImgFile = e.target.files[0];
      console.log(this.thisImgFile);
      lrz(this.thisImgFile).then(afterImg => {
        let formData = new FormData();
        formData.append("file", this.thisImgFile);
        formData.append("systemName", "ruhexiu");
        API._UploadImg(formData).then(res => {
          if (res.ret === API.ERROK) {
            // 当前选择此模块的图片index
            console.log(this.choseImgIndex);
            this.mi_title_stitle_img.dataList[this.choseImgIndex].item_img =
              res.httpUrl;
          }
        });
        console.log(afterImg);
      });
    }
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
.left{
  float: left
}
.clear{
  clear: both
}

.maskDZ{
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 999999999999999;
  height: 100vh;
  width: 100vw;
}
.imgClose{
  position: fixed;
  background: #fff;
  width: 90vw;
  left:50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 9999999999999991;
}
.titleBox{
  position: relative;
  width: 100%;
  height: 10vw;
}
.titleBox>p{
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 4.2vw;
  line-height: 10vw;
  color: #000;
}
.contentBox{
  position: relative;
  width: 100%;
  /* min-height: 60vw; */
  max-height: 113vw;
  overflow: scroll;
  background: #fff;
}
.imgCloseBox{
  position: relative;
  width: 90%;
  margin-left: 5%;
}
.imgCloseBox .listBox{
  position: relative;
  width: 100%;
  padding: 0.5vw 0 0.5vw 0;
}
.imgCloseBox .listBox .imgBox{
  position: relative;
  width: 10%;
}
.imgCloseBox .listBox .imgBox>img{
  position: relative;
  width: 10vw;
  height: 10vw;
}
.textBox{
  position: relative;
  width: 80%;
  height: 10vw;
  display: flex;
  align-items:center;
}
.textBox>p{
  position: relative;
  width: 94%;
  margin-left: 3%;
  font-size: 3.7vw;
  color: #000;
  line-height: 5vw;
  text-align: left;
}
.iconBox{
  position: relative;
  width: 5%;
  height: 8vw;
  display: flex;
  align-items:center;
}
.iconBox>span{
  position: relative;
  width: 2vw;
  height: 2vw;
  border: 0.026667rem solid #666;
  border-radius: 50%;
  display: block;
  float: right;

}
.bottomBox{
  position: relative;
  width: 100%;
  background: #e2e2e2;
  height: 11vw;
}
.bottomBox>p{
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 4.2vw;
  line-height: 11vw;
  color: #000
}
.dingzhi-caigou-text .cube-btn{
  white-space pre-wrap
  padding 0
}

.defaultImg {
  width: 80px;
  height: 80px;
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
  display: flex;
  align-items:center;
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
