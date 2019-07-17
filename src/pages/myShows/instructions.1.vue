<template>
    <div class="instructions">
        <div class="tabs">
            <span class="part active"><a href="#" hidefocus="true" >全部</a></span>
            <span class="part"><a href="#" hidefocus="true" ref="onLine">已上线</a></span>
            <span class="part"><a href="#" hidefocus="true">草稿箱</a></span>
        </div>

        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide swiper-slide-visible swiper-slide-active">
                    <scroller
                    v-if="list.length"
                    class="scroller"
                    :on-infinite="infinite"
                    ref="myScroller" >
                        <div class="instructionsItems" v-for="items in list" :key="items.instrucId">
                            <p class="instructionsTitle">{{items.instrucTitle}}</p>
                            <span class="instructionsDate">更新于 {{items.updateTime}}</span>
                            <div class="instructionsProduct">
                                <span class="state" v-if="items.instrucState==1">已上线</span>
                                <span class="state3" v-else-if="items.instrucState==0">未发布</span>
                                <span class="state2" v-else>下架</span>
                                <router-link v-if="items.bannerImg" :to="{ path: '/instructionFabu', query:{instrucId: items.instrucId} }"><img class="instructionsImg" :src="items.bannerImg" alt="img"></router-link>
                                <router-link class="instructionsImg" v-else-if="!items.bannerImg" :to="{ path: '/instructionFabu', query:{instrucId: items.instrucId} }"><img class="instructionsImg" src="http://style.iambuyer.com/img/rhx-mobile-normal@2x.png" alt="img"></router-link>
                            </div>
                            <div class="instructionsProductBottom">
                                <p>查看 {{items.pv}}</p>
                                <p>喜欢 {{items.likeCn}}</p>
                                <p>分享 {{items.shareQqCnt + items.shareWbCnt}}</p>
                                <p>留言 {{items.msgCnt}}</p>
                            </div>
                        </div>
                    </scroller>
                    <div class="noMes" v-else>
                        <i class="iconfont icon-sekuaigantan"></i>
                        <p>您还没有创建说明书，<span @click="toCreate" class="toCreate"> 去创建 》</span></p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <scroller
                    v-if="upLine.length"
                    class="scroller"
                    :on-infinite="infiniteLine"
                    ref="myScroller1" >
                        <div class="instructionsItems" v-for="items in upLine" :key="items.instrucId">
                            <p class="instructionsTitle">{{items.instrucTitle}}</p>
                            <span class="instructionsDate">更新于 {{items.updateTime}}</span>
                            <div class="instructionsProduct">
                                <span class="state">已上线</span>
                                <router-link v-if="items.bannerImg" :to="{ path: '/instructionFabu', query:{instrucId: items.instrucId} }"><img class="instructionsImg" :src="items.bannerImg" alt="img"></router-link>
                                <router-link class="instructionsImg" v-else-if="!items.bannerImg" :to="{ path: '/instructionFabu', query:{instrucId: items.instrucId} }">未上传说明说图片</router-link>
                            </div>
                            <div class="instructionsProductBottom">
                                <p>查看 {{items.pv}}</p>
                                <p>喜欢 {{items.likeCn}}</p>
                                <p>分享 {{items.shareQqCnt + items.shareWbCnt}}</p>
                                <p>留言 {{items.msgCnt}}</p>
                            </div>
                        </div>
                    </scroller>
                    <div class="noMes" v-else>
                        <i class="iconfont icon-sekuaigantan"></i>
                        <p>您还没有发布说明书，快去发布一个吧</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <scroller
                    v-if="caoGao.length"
                    class="scroller"
                    :on-infinite="infiniteCaoGao"
                    ref="myScroller0" >
                        <div class="instructionsItems" v-for="items in caoGao" :key="items.instrucId">
                            <p class="instructionsTitle">{{items.instrucTitle}}</p>
                            <span class="instructionsDate">更新于 {{items.updateTime}}</span>
                            <div class="instructionsProduct">
                                <span class="state" v-if="items.instrucState==1">已上线</span>
                                <span class="state3" v-else-if="items.instrucState==0">未发布</span>
                                <span class="state2" v-else>下架</span>
                                <router-link v-if="items.bannerImg" :to="{ path: '/instructionFabu', query:{instrucId: items.instrucId} }"><img class="instructionsImg" :src="items.bannerImg" alt="img"></router-link>
                                <router-link class="instructionsImg" v-else-if="!items.bannerImg" :to="{ path: '/instructionFabu', query:{instrucId: items.instrucId} }">未上传说明说图片</router-link>
                            </div>
                            <div class="instructionsProductBottom">
                                <p>查看 {{items.pv}}</p>
                                <p>喜欢 {{items.likeCn}}</p>
                                <p>分享 {{items.shareQqCnt + items.shareWbCnt + items.shareWxCnt}}</p>
                                <p>留言 {{items.msgCnt}}</p>
                            </div>
                        </div>
                    </scroller>
                    <div class="noMes" v-else>
                        <i class="iconfont icon-sekuaigantan"></i>
                        <p>没有保存的草稿</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.toCreate {
  color: #02c2a2;
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

.instructionsProductBottom p {
  width: 25%;
  box-sizing: border-box;
  border-right: 1px solid #E2E2E2;
  text-align: center;
  font-weight: 300;
}

.instructionsProductBottom p:last-child {
  border: 0;
}

.instructionsProductBottom {
  padding: 20px 8px;
  border-bottom: 1px solid #F5F5F5;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #9B9B9B;
  line-height: 12px;
}

.state {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 80px;
  height: 80px;
  background: #FAB100;
  transform: rotate(45deg);
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #FFFFFF;
  line-height: 136 px;
  text-align: center;
}

.state2 {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 80px;
  height: 80px;
  background: #02C2A2;
  transform: rotate(45deg);
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #FFFFFF;
  line-height: 136 px;
  text-align: center;
}

.state3 {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #FFFFFF;
  line-height: 136 px;
  text-align: center;
  background: #2E2E30;
}

.instructionsImg {
  width: 99.9%;
  height: 184px;
  display: block;
}

.instructionsProduct {
  position: relative;
  overflow: hidden;
}

.instructionsDate {
  font-size: 13px;
  color: #BDBDBD;
  line-height: 13px;
  display: inline-block;
  margin: 8px 0 20px 0;
  font-weight: 300
}

.instructionsTitle {
  width: 100%;
  font-size: 20px;
  color: #2E2E30;
  line-height: 32px;
}

.instructions {
  padding: 0 15px;
  background: #fff;
  margin-bottom: 50px;
}

.tabs {
  width: 100%;
  padding: 12px 0 10px 0;
  // height: 32px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 999;
}

.tabs .part {
  display: block;
  text-align: center;
  padding: 0 10px;
}

.tabs a {
  display: block;
  color: #fff;
  text-align: center;
  margin: 0 auto;
  text-decoration: none;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #2E2E30;
  padding-bottom: 8px;
}

.tabs span.active a {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #02C2A2;
  line-height: 14px;
  border-bottom: 2px solid #02C2A2;
  padding-bottom: 6px;
}

.swiper-container {
  width: 100%;
  border-top: 0;
  margin-top: 44px !important;
}

.swiper-slide {
  background: #fff;
  // height: auto !important;
  // margin-bottom: 17px;
  overflow-y: auto;
}

.instructionsItems {
  margin: 20px 0;
}
</style>

<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
import * as API from "config/api";
// import Zepto from "../../../static/js/zepto.min.js";
import Swiper from "../../../static/js/idangerous.swiper.min.js";
// import wxApi from "../../mixins/wxapi.js";
export default {
  name: "instructions",
  // mixins: [wxApi],
  data() {
    return {
      active: "tab-container1",
      page: 1,
      count: "",
      count0: "",
      count1: "",
      list: [],
      upLine: [],
      caoGao: []
    };
  },
  created: function() {
    this.$nextTick(() => {
      this.getInstruction();
      this.getInstruction0();
      this.getInstruction1();
      this.getUserInfor();
      // 微信分享
      this.wxApiG();
    });
  },
  mounted: function() {
    // wxApi.wxRegister(this.wxRegCallback);
    let wH = $(window).height();
    let tH = $(".tabs").height();
    // let hH = $(".myFooter2").height();
    let fH = $(".indexFooter").height();
    $(".swiper-slide").height(wH - tH - fH);
    setTimeout(this.initSwiper, 400);
  },
  methods: {
    // vue scroller 上啦加载
    infinite(done) {
      console.log("quanbu");
      if (this.count > 10) {
        if (this.page * 10 < this.count) {
          this.page++;
          setTimeout(() => {
            API._UpdateInstruc(this.page).then(res => {
              if (res.ret == API.ERROK) {
                let i;
                for (i = 0; i < res.content.list.length; i++) {
                  this.list.push(res.content.list[i]);
                }
              }
            });
            this.$refs.myScroller.resize();
            done();
          }, 1500);
        } else {
          // this.$vux.toast.show({
          //   width: "60%",
          //   text: "没有数据啦！",
          //   type: "text",
          //   position: "bottom"
          // });
          this.page = 1;
        }
      }
    },
    infiniteLine(done) {
      if (this.count1 > 10) {
        console.log("shangxian");
        if (this.page * 10 < this.count1) {
          this.page++;
          console.log("触发了滚动加载");
          setTimeout(() => {
            API._UpdateInstruc(this.page, 1).then(res => {
              if (res.ret == API.ERROK) {
                let i;
                for (i = 0; i < res.content.list.length; i++) {
                  this.upLine.push(res.content.list[i]);
                }
              }
            });
            this.$refs.myScroller1.resize();
            done();
          }, 1500);
        } else {
          // this.$vux.toast.show({
          //   width: "60%",
          //   text: "没有数据啦！",
          //   type: "text",
          //   position: "bottom"
          // });
          this.page = 1;
        }
      }
    },
    infiniteCaoGao(done) {
      if (this.count0 > 10) {
        console.log("caogao");
        if (this.page * 10 < this.count0) {
          this.page++;
          console.log("触发了滚动加载");
          setTimeout(() => {
            API._UpdateInstruc(this.page, 0).then(res => {
              if (res.ret == API.ERROK) {
                let i;
                for (i = 0; i < res.content.list.length; i++) {
                  this.caoGao.push(res.content.list[i]);
                }
              }
            });
            this.$refs.myScroller0.resize();
            done();
          }, 1500);
        } else {
          // this.$vux.toast.show({
          //   width: "60%",
          //   text: "没有数据啦！",
          //   type: "text",
          //   position: "bottom"
          // });
          this.page = 1;
        }
      }
    },
    // swiper
    initSwiper() {
      let tabsSwiper;
      tabsSwiper = new Swiper(".swiper-container", {
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
    },
    // 获取用户信息
    getUserInfor() {
      API._GetUserInfo(this.LS.getItem("userId")).then(res => {
        console.log(res);
        if (res.ret == API.ERROK) {
          this.uinfo = res.content;
          this.LS.setItem("uinfo", res.content);
          // this.set_uinfo(res.content);
        } else {
          this.$createDialog({
            type: "alert",
            content: res.msg
          }).show();
        }
      });
    },
    // 去创建说明书
    toCreate() {
      this.$router.push("/createShow");
    },
    // 说明书列表
    getInstruction() {
      API._UpdateInstruc(this.page).then(res => {
        if (res.ret == API.ERROK) {
          this.count = res.content.count;
          this.list = res.content.list;
        }
      });
    },
    // 发布
    getInstruction1() {
      API._UpdateInstruc(this.page, 1).then(res => {
        if (res.ret == API.ERROK) {
          this.count1 = res.content.count;
          this.upLine = res.content.list;
        }
      });
    },
    // 草稿
    getInstruction0() {
      API._UpdateInstruc(this.page, 0).then(res => {
        if (res.ret == API.ERROK) {
          this.count0 = res.content.count;
          this.caoGao = res.content.list;
        }
      });
    },
    //
    // /**
    //  * [wxRegCallback 用于微信JS-SDK回调]
    //  */
    // wxRegCallback() {
    //   this.wxShareTimeline();
    //   this.wxShareAppMessage();
    // },
    // /**
    //  * [wxShareTimeline 微信自定义分享到朋友圈]
    //  */
    // wxShareTimeline() {
    //   let opstion = {
    //     title: "我的说明书to朋友圈", // 分享标题
    //     link: "http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     imgUrl:
    //       "http://img04.iambuyer.com/imgup/upload/images/2018/02/28/8UlsbbRhcjjc2BFhUxvhcjjc2BWWoephcjjc2Bzka1LauwtJOZeYban4nJqbgBYB5q8aUznQub0kvQce8i.jpeg", // 分享图标
    //     success: function() {
    //       alert("分享成功");
    //     },
    //     error: function() {
    //       alert("分享失败");
    //     }
    //   };
    //   // 将配置注入通用方法
    //   wxApi.ShareTimeline(opstion);
    // },
    // wxShareAppMessage() {
    //   let opstion = {
    //     title: "我的说明书to朋友", // 分享标题
    //     desc: "好用的说明书",
    //     link: "http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl", // 分享链接
    //     imgUrl:
    //       "http://img04.iambuyer.com/imgup/upload/images/2018/02/28/8UlsbbRhcjjc2BFhUxvhcjjc2BWWoephcjjc2Bzka1LauwtJOZeYban4nJqbgBYB5q8aUznQub0kvQce8i.jpeg", // 分享图标
    //     success: function() {
    //       alert("分享成功");
    //     },
    //     error: function() {
    //       alert("分享失败");
    //     }
    //   };
    //   // 将配置注入通用方法
    //   wxApi.ShareAppMessage(opstion);
    // }
  }
};
</script>


