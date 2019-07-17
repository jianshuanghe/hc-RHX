<template>
    <div class="feedBack">
        <!-- head -->
        <!-- <globalHead></globalHead> -->
        <div class="tabs">
            <span class="part active"><a href="#" hidefocus="true" >意见反馈</a></span>
            <span class="part"><a href="#" hidefocus="true">我的反馈</a></span>
        </div>

        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- 意见反馈 -->
                <div class="swiper-slide swiper-slide-visible swiper-slide-active">
                    <div class="pingfenCont">
                        <p class="pingfenTitle">请给如何秀评分
                            <rater class="pingfen" v-model="params.feedbackNum" :min="1" :max="5" active-color="#04BE02"></rater>
                        </p>
                        <p class="questionTitle">请描述您遇到的问题</p>
                        <checker class="questionCont"
                            v-model="params.backTypes"
                            type="checkbox"
                            default-item-class="demo5-item"
                            selected-item-class="demo5-item-selected"
                            >
                            <checker-item v-for="i in feedId" :key="i" :value="i">{{feedContent[feedId[0]-i]}}</checker-item>
                        </checker>
                        <x-textarea placeholder="请描述您的问题" :max="200"  v-model="params.context"></x-textarea>
                        <input class="conection" type="text" v-model="params.phone" placeholder="请输入联系方式(选填)">
                        <div class="uploadImg">
                          <cube-upload class="feedUpload" :multiple="false" :action="uploadUrl" :max="5" :processFile="processFile" :simultaneous-uploads="1" @file-success="sucHandler" @file-removed="delHandler"/>
                            <!-- <cube-upload-btn :multiple="false"></cube-upload-btn> -->
                        </div>
                        <div class="submitBtn" @click="pushFeedBack">提交</div>
                    </div>
                </div>
                <!-- 我的反馈 -->
                <div class="swiper-slide">
                    <!-- <scroller
                    v-if="feedList.length"
                    class="scroller"
                    :on-infinite="infinite"
                    ref="myScroller"> -->
                    <div v-if="feedList.length">
                        <div class="myFeedBack" v-for="items in feedList" :key="items.id">
                            <div class="myFeedBackTitle">
                                <rater class="pingfenRead" v-if="items.feedbackNum" v-model="items.feedbackNum" :disabled="true" :max="5" active-color="#04BE02"></rater>
                                <span class="pingfenTime">{{items.createTime}}</span>
                            </div>
                            <p class="reasons">{{items.backTypes}}</p>
                            <div class="box">
                                <p>{{items.context}}</p>
                                <img v-show="items.img001" class="uploadedImg" :src="items.img001" alt="img">
                                <img v-show="items.img002" class="uploadedImg" :src="items.img002" alt="img">
                                <img v-show="items.img003" class="uploadedImg" :src="items.img003" alt="img">
                                <img v-show="items.img004" class="uploadedImg" :src="items.img004" alt="img">
                                <img v-show="items.img005" class="uploadedImg" :src="items.img005" alt="img">
                            </div>
                            <p class="call">联系方式：{{items.phone? items.phone : "对方很神秘"}}</p>
                        </div>
                    </div>

                    <!-- </scroller> -->
                    <div class="noMes" v-else>
                        <i class="iconfont icon-sekuaigantan"></i>
                        <p>您没有提交反馈 </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="loadingBox">
          <loading :show="show1" :text="text1"></loading>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.pingfenTime {
    float: right;
}

.noMes {
    position: absolute;
    top: 50%;
    margin-top: -80px;
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #2E2E30;
}

.icon-sekuaigantan {
    font-size: 40px;
    color: #02c2a2;
}

.cube-upload-btn-def {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.cube-upload-btn-def input {
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    -ms-filter: 'alpha(opacity=0)';
}

.weui-cell:before {
    border: 0 !important;
}

.vux-x-textarea {
    border-bottom: 1px solid #F5F5F5;
    padding: 10px 0;
    margin-top: 30px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #2E2E30;
    line-height: 20px;
}

// 原因
.demo5-item {
    width: 92px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #E2E2E2;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #2E2E30;
    letter-spacing: 0;
    margin: 20px 14px 0 0;
    border-radius: 3px;
}

.demo5-item-selected {
    // background: #ffffff url('../assets/demo/checker/active.png') no-repeat right bottom;
    border-color: #02C2A2;
}

// 多余文字省略
.uploadedImg {
    width: 100%;
    margin: 10px 0;
    float: left;
}

.selectAll .icon-Z5 {
    font-size: 10px;
    color: #02C2A2;
}

.selectAll {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #02C2A2;
}

.box {
    width: 100%;
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #2E2E30;
    line-height: 20px;
}

.call {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #2E2E30;
    line-height: 13px;
    margin: 16px 0;
}

.reasons {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9B9B9B;
    line-height: 12px;
    margin: 0 0 16px 0;
}

.myFeedBackTitle {
    position: relative;
    width: 100%;
    float: left;
    margin: 30px 0 13px 0;
    // display: flex;
    // justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9B9B9B;
    line-height: 24px;
}

.myFeedBack {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    border-bottom: 1px solid #F5F5F5;
    box-sizing: border-box;
}

.myFeedBack:last-child {
    padding-bottom: 40px;
    border: 0;
}

.uploadImg {
    margin-top: 20px;
}

.submitBtn {
    height: 45px;
    line-height: 45px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    background: #02C2A2;
    margin: 10px 0 20px 0;
}

.conection {
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid #F5F5F5;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #BDBDBD;
    letter-spacing: 0;
    line-height: 14px;
    margin-top: 30px;
}

.questions {
    margin-top: 30px;
    height: 100px;
}

.cube-textarea_active {
    border: 0 !important;
}

.questionItem:nth-child(3) {
    margin-right: 0;
}

.questionItem {
    width: 92px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #E2E2E2;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #2E2E30;
    letter-spacing: 0;
    margin: 20px 20px 0 0;
}

.questionCont {
    display: flex;
    flex-wrap: wrap;
}

.pingfenCont {
    padding: 0 24px;
}

.questionTitle {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 16px;
}

.pingfenRead {
    position: absolute;
    top: 0;
    left: 0;
}

.pingfenTitle {
    margin: 30px 0 31px 0;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 24px;
    display: flex;
    align-self: center;
    justify-content: space-between;
}

// swiper
.tabs {
    width: 100%;
    height: 45px;
    line-height: 44px;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 998;
    // margin-top: 44px;
}

.tabs .part {
    display: block;
    text-align: center;
    padding: 0 10px;
}

.tabs a {
    height: 38px;
    display: block;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    text-decoration: none;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #2E2E30;
}

.tabs span.active a {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #02C2A2;
    // line-height: 14px;
    border-bottom: 2px solid #02C2A2;
}

.swiper-container {
    width: 100%;
    border-top: 0;
    margin-top: 45px !important;
}

.swiper-wrapper {
    height: auto !important;
}

.swiper-slide {
    background: #fff;
    overflow-y: auto;
    // height: auto !important;
}

.ovfHiden {
    position: fixed !important;
    z-index: 9999 !important;
}
</style>

<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
import * as API from "config/api";
// import Zepto from "../../../static/js/zepto.min.js";
import Swiper from "../../../static/js/idangerous.swiper.min.js";
import "../../../static/js/jquery.dotdotdot.min.js";
import globalHead from "@/components/globalModules/globalHead";
import { Checker, CheckerItem, Rater, XTextarea,Loading } from "vux";
import Uploader from "vux-uploader";
import lrz from "lrz";
import { setTimeout } from "timers";
export default {
  name: "feedBack",
  components: {
    Loading,
    globalHead,
    Checker,
    CheckerItem,
    Rater,
    XTextarea,
    Uploader
  },
  data() {
    return {
      show1:false,
      text1:'请稍后!',
      num: "", //记录上传图片张数
      count: "",
      page: 1,
      star2: 1,
      uploadUrl: "http://img01.iambuyer.com/imgup/upLoad/fileUpload",
      params: {
        userId: this.LS.getItem("userId"),
        feedbackNum: 1,
        backTypes: [],
        context: "",
        img001: "",
        img002: "",
        img003: "",
        img004: ""
        // photos: []
      },
      feedList: [],
      feedId: [],
      feedContent: []
    };
  },
  mounted: function() {
    // 微信分享
    this.wxApiG();
    // 清楚cube的upload默认上传的multiple属性，解决在安卓环境调取不到相机问题
    $(".feedUpload")
      .find("input")
      .removeAttr("multiple");
    //   swiper-slide height
    let wH = $(window).height();
    let tH = $(".tabs").height();
    let hH = $(".header").height();
    $(".swiper-slide").height(wH - tH - 1);
    //   tabswiper
    $(function() {
      let tabsSwiper;
      tabsSwiper = new Swiper(".swiper-container", {
        speed: 500,
        onSlideChangeStart: function() {
          $(".tabs .active").removeClass("active");
          $(".tabs span")
            .eq(tabsSwiper.activeIndex)
            .addClass("active");
        }
      });

      $(".tabs span").on("touchstart mousedown", function(e) {
        e.preventDefault();
        $(".tabs .active").removeClass("active");
        $(this).addClass("active");
        tabsSwiper.swipeTo($(this).index());
      });

      $(".tabs span").click(function(e) {
        e.preventDefault();
      });
    }); //end
    this.pullFeedBack();
    this.feefTypes();
  },
  methods: {
    // vue scroller 上啦加载
    // infinite(done) {
    //   if (this.count > 10) {
    //     if (this.page * 10 < this.count) {
    //       this.page++;
    //       setTimeout(() => {
    //         API._UpdateFeedBack(this.page).then(res => {
    //           if (res.ret == API.ERROK) {
    //             let i;
    //             for (i = 0; i < res.content.list.length; i++) {
    //               this.feedList.push(res.content.list[i]);
    //             }
    //           }
    //         });
    //         this.$refs.myScroller.resize();
    //         done();
    //       }, 1500);
    //     } else {
    //       //   this.$vux.toast.show({
    //       //     width: "60%",
    //       //     text: "没有数据啦！",
    //       //     type: "text",
    //       //     position: "bottom"
    //       //   });
    //       this.page = 1;
    //     }
    //   }
    // },
    onItemClick(index, item) {
      console.log(index);
    },
    // processFile
    processFile(file, next) {
      console.log(file);
      // 压缩图片
      lrz(file).then(resImg => {
        file = resImg.file;
        console.log(file);
        next(file);
      });
    },
    // upload
    sucHandler(file) {
      if (file.response.ret == API.ERROK) {
        this.num++;
        switch (this.num) {
          case 1:
            this.params.img001 = file.response.name;
            break;
          case 2:
            this.params.img002 = file.response.name;
            break;
          case 3:
            this.params.img003 = file.response.name;
            break;
          case 4:
            this.params.img004 = file.response.name;
            break;
          case 5:
            this.params.img005 = file.response.name;
            break;
        }
        // console.log(this.params,this.num);
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "上传失败",
          time: 1500
        });
      }
    },
    // delete img
    delHandler() {
      this.num--;
      //   console.log(this.params,this.num);
    },
    // pull feedBack
    pullFeedBack() {
      API._UpdateFeedBack(this.page).then(res => {
        if (res.ret == API.ERROK) {
          this.feedList = res.content.list;
          this.count = res.content.count;
        }
      });
    },
    // push feedBack
    pushFeedBack() {
      this.show1 = true; // 显示loading
      console.log(this.params.backTypes);
      if (this.params.backTypes.length) {
        API._CreateFeedBack(this.params).then(res => {
          this.show1 = false; // 隐藏loading
          if (res.ret == API.ERROK) {
            this.$vux.toast.show({
              text: "我们已收到您的反馈",
              time: 1500,
              onHide: () => {
                this.$router.go(-1);
              }
            });
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        });
      } else {
        this.show1 = false; //  隐藏loading
        this.$vux.toast.show({
          width: "80%",
          type: "text",
          text: "至少选择一项遇到的问题",
          position: "bottom",
          time: 1500
        });
      }
    },
    // 获取意见反馈类型列表
    feefTypes() {
      API._feedTypes().then(res => {
        if (res.ret == API.ERROK) {
          console.log(res);
          for (let i = 0; i < res.content.length; i++) {
            this.feedId.push(res.content[i].id);
            this.feedContent.push(res.content[i].content);
          }
          this.params.backTypes[0] = this.feedId[0]; //默认选中反馈原因
          console.log(this.feedId);
          console.log(this.feedContent);
        } else {
          this.$vux.toast.show({
            type: "warn",
            text: res.msg,
            time: 1500
          });
        }
      });
    }
  }
};
</script>


