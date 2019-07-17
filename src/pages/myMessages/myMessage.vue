<template>
    <div class="message">
        <div class="tabs">
            <span class="part active"><a href="#" hidefocus="true" @click="loadList('1')">全部</a></span>
            <span class="part"><a href="#" hidefocus="true"@click="loadList('0')">未读</a></span>
        </div>

        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide swiper-slide-visible swiper-slide-active">
                    <scroller
                    v-if="list.length"
                    class="scroller"
                    :on-infinite="infinite"
                    ref="myScroller" >
                        <div class="messageContent">
                            <div class="messageItem" :class="items.readeState==0 ? '' : 'readed'" v-for="items in list" :key="items.id">
                                <p class="messageItemTitle"><i class="iconfont icon-R"></i> <span>{{items.instrucTitl}}</span></p>
                                <p class="messageItemUser">{{items.name}}<span class="shu">|</span>{{items.mobile}}</p>
                                <p class="messageItemText on" @click="showall">{{items.msgContent}}
                                    <!-- <span v-if="!showOhide" class='openAll' style='color:#02C2A2;float:right'>展开全文<i class='iconfont icon-Z5'></i></span>
                                    <span v-else class='closeAll' style='color:#02C2A2;float:right'>收起<i class='iconfont icon-Z7'></i></span> -->
                                </p>
                                <p class="messageItemDate">{{items.msgTime}}<i class="iconfont icon-msnui-more" @click="pop(items.id)"></i></p>
                            </div>
                        </div>
                    </scroller>
                    <div class="noMes" v-else>
                        <i class="iconfont icon-sekuaigantan"></i>
                        <p>没有人给您留言</p>
                    </div>
                </div>
                <div class="swiper-slide">
                  <scroller
                    v-if="list2.length"
                    class="scroller"
                    :on-infinite="infinite"
                    ref="myScroller" >
                    <div class="messageContent" v-if="list2.length">
                        <div class="messageItem" v-for="items in list2" :key="items.id">
                            <p class="messageItemTitle"><i class="iconfont icon-R"></i> <span>{{items.instrucTitl}}</span></p>
                            <p class="messageItemUser">{{items.name}}<span class="shu">|</span>{{items.mobile}}</p>
                            <p class="messageItemText on" @click="showall">{{items.msgContent}}</p>
                            <p class="messageItemDate">{{items.msgTime}}<i class="iconfont icon-msnui-more" @click="pop(items.id)"></i></p>
                        </div>
                    </div>
                  </scroller>
                    <div class="noMes" v-else>
                        <i class="iconfont icon-sekuaigantan"></i>
                        <p>您没有未读的留言</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer2 -->
        <myFooter2></myFooter2>
        <!-- pop -->
        <div class="popShadow" @click="popHide"></div>
        <div class="edit">
            <ul>
                <li v-if="!list.readeState || !list2.readeState" @click="markUpMes"><i class="iconfont icon-R editI"></i> 标记已读</li>
                <li @click="delMes"><i class="iconfont icon-Z3"></i> 删除</li>
                <!-- <li><i class="iconfont icon-z"></i> 举报</li> -->
            </ul>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.icon-Z5 {
    font-size: 8px;
}

.icon-Z7 {
    font-size: 8px;
}

.openAll {
    float: right;
    color: #02C2A2;
}

.shu {
    padding: 0 10px;
    display: inline-block;
    color: #E2E2E2;
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

// pop
.edit.on {
    display: block;
    transform: display 0.5s;
}

.edit {
    width: 100%;
    height: 182px;
    position: absolute;
    z-index: 99999;
    top: 50%;
    margin-top: -91px;
    display: none;
}

.edit ul li {
    border-bottom: 1px solid #F5F5F5;
    margin: 0 12px;
    padding: 22px 21px;
    background: #fff;
}

.icon-R.editI {
    font-size: 14px;
}

.icon-Z3 {
    font-size: 14px;
    color: #02C2A2;
}

.icon-z {
    font-size: 14px;
    color: #02C2A2;
}

.popShadow.on {
    display: block;
    transform: display 0.5s;
}

.popShadow {
    width: 100%;
    opacity: 0.6;
    background: #2E2E30;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99998;
    display: none;
}

// messageCont
.icon-msnui-more {
    font-size: 15px;
    float: right;
}

.messageItemDate {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9B9B9B;
    line-height: 12px;
    margin: 0 0 20px 0;
}

.messageItemText {
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #2E2E30;
    line-height: 20px;
    margin-bottom: 16px;
}

.messageItemText.on {
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #2E2E30;
    line-height: 20px;
    margin-bottom: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.messageItemUser {
    margin: 16px 0;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9B9B9B;
    line-height: 12px;
}

.messageItemTitle {
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #2E2E30;
    line-height: 32px;
}

.messageItem p {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.messageItem p:first-child {
    padding-left: 0;
}

.icon-R {
    font-size: 10px;
    color: #02C2A2;
    margin-right: 10px;
}

.messageItem {
    position: relative;
    margin-top: 40px;
    border-bottom: 1px solid #F5F5F5;
}

.messageItem.readed p, .messageItem.readed .icon-R {
    color: #9B9B9B !important;
}

.messageItem:last-child {
    border-bottom: 0;
}

.messageContent .messageItem:last-child {
    margin-bottom: 40px;
}

.messageContent {
    padding: 0 15px;
}

.message {
    margin-bottom: 50px;
    float: left;
    width: 100%;
    background: $color-f9;
}

// swiper
.tabs {
    width: 100%;
    // padding: 12px 0 10px 0;
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 999;
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
    padding-bottom: 8px;
}

.tabs span.active a {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #02C2A2;
    // line-height: 14px;
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
    overflow-y: auto;
    // height: auto !important;
    // margin-bottom: 17px;
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
import LS from '@/config/localstorage';
// import Zepto from "../../../static/js/zepto.min.js";
import Swiper from "../../../static/js/idangerous.swiper.min.js";
import myFooter2 from "@/components/globalModules/myFooter2";
import * as API from "config/api";
export default {
  name: "myMessage",
  components: { myFooter2 },
  data() {
    return {
      showOhide: false,
      active: "tab-container1",
      page: 1,
      page2:1,
      isread:3, // 默认3,全部0，未读时1
      count: "",
      count2:'',
      list: [],
      list2: [],
      id: []
    };
  },
  computed: {
    read() {
      return this.list.filter(e => {
        return e.readeState == 1; //坑死，这里的e.readeState == 1必须是==或者===，不能是=，怕忘记就写一下注释（被自己坑怕了）
      });
    },
    noread() {
      return this.list.filter(e => {
        return e.readeState == 0; //坑死，这里的e.readeState == 1必须是==或者===，不能是=，怕忘记就写一下注释（被自己坑怕了）
      });
    }
  },
  mounted: function() {
    let wH = $(window).height();
    let tH = $(".tabs").height();
    // let hH = $(".myFooter2").height();
    let fH = $(".indexFooter").height();
    $(".swiper-slide").height(wH - tH - fH);
    //   height
    $(".popShadow").height(wH);

    // 微信分享
    this.wxApiG();

    //   tabswiper
    setTimeout(this.initSwiper, 400);
    this.pullMessages();
    this.pullMessages2();
  },
  //   updated: function() {
  //     // 文字省略 查看全文
  //     let divT = $(".messageItemText").text();
  //     let num = $(".messageItemText").text().length;
  //     console.log(num);
  //     if (num > 40) {
  //       $(".messageItemText").text(divT.substring(0, 40) + "...");
  //       $(".messageItemText").append(
  //         "<span class='openAll' style='color:#02C2A2;float:right'>展开全文<i class='iconfont icon-Z5'></i></span>"
  //       );
  //     }
  //     // 展开
  //     $(document)
  //       .off("click")
  //       .on("click", ".openAll", function() {
  //         //这样写防止click事件多次执行
  //         $(event.target) //获取触发事件的元素
  //           .parent()
  //           .text("" + divT)
  //           .append(
  //             "<span class='closeAll' style='color:#02C2A2;float:right'>收起<i class='iconfont icon-Z7'></i></span>"
  //           );
  //       });
  //     // 收起
  //     $(".messageItemText")
  //       .off("click")
  //       .on("click", ".closeAll", function() {
  //         //这样写防止click事件多次执行
  //         $(event.target) //获取触发事件的元素
  //           .parent()
  //           .text(divT.substring(0, 40) + "...")
  //           .append(
  //             "<span class='openAll' style='color:#02C2A2;float:right'>展开全文<i class='iconfont icon-Z5'></i></span>"
  //           );
  //       });
  //   },
  methods: {
    // vue scroller 上啦加载
    infinite(done) {
      if (this.isread === 0){
        if (this.count2 > 10) {
          if (this.page2 * 10 < this.count2) {
            this.page2++;
            let params = {
              'userId': LS.getItem("userId"),
              'page': this.page2
            }
            if (this.isread === 0){
              params.isread = 0
            }
            setTimeout(() => {
              API._UpdateMessages(params).then(res => {
                if (res.ret == API.ERROK) {
                  let i;
                  for (i = 0; i < res.content.list.length; i++) {
                    this.list2.push(res.content.list[i]);
                  }
                }
              });
              this.$refs.myScroller.resize();
              done();
            }, 1500);
          } else {
            //   this.$vux.toast.show({
            //     width: "60%",
            //     text: "没有数据啦！",
            //     type: "text",
            //     position: "bottom"
            //   });
            this.page = 1;
          }
        }
      } else {
        if (this.count > 10) {
          if (this.page * 10 < this.count) {
            this.page++;
            let params = {
              'userId': LS.getItem("userId"),
              'page': this.page
            }
            setTimeout(() => {
              API._UpdateMessages(params).then(res => {
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
            //   this.$vux.toast.show({
            //     width: "60%",
            //     text: "没有数据啦！",
            //     type: "text",
            //     position: "bottom"
            //   });
            this.page = 1;
          }
        }
      }
    },
    pop(id) {
      $(".message").addClass("ovfHiden");
      $(".popShadow").addClass("on");
      $(".edit").addClass("on");
      this.id.push(id);
    },
    popHide() {
      $(".message").removeClass("ovfHiden");
      $(".popShadow").removeClass("on");
      $(".edit").removeClass("on");
      this.id = [];
    },
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
    loadList(key){
      this.isread = Number(key)
      console.log(this.isread, '-----------------isread------------------')
      console.log(this.list, this.list2,'--------------this.list2--------------')
      if (this.isread === 0 && this.list2.length <= 0){
        this.pullMessages()
        return
      }
      if (this.isread === 1 && this.list.length <= 0){
        this.pullMessages()
      }
    },
    pullMessages2() {
      let params = {
        'userId': LS.getItem("userId"),
        'page': 1
      }
      params.isread = 0
      API._UpdateMessages(params).then(res => {
        if (res.ret == API.ERROK) {
          this.count2 = res.content.count;
          this.list2 = res.content.list;
        } else {
          this.$vux.toast.show({
            type: "warn",
            text: "出错啦",
            time: 1500
          });
        }
      });

    },
    // pull messages
    pullMessages() {
      let params = {
        'userId': LS.getItem("userId"),
        'page': this.page
      }
      if (this.isread === 0){
        params.page = this.page2
        params.isread = 0
        API._UpdateMessages(params).then(res => {
          if (res.ret == API.ERROK) {
            this.count2 = res.content.count;
            this.list2 = res.content.list;
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: "出错啦",
              time: 1500
            });
          }
        });
      }else {
        API._UpdateMessages(params).then(res => {
          if (res.ret == API.ERROK) {
            this.count = res.content.count;
            this.list = res.content.list;
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: "出错啦",
              time: 1500
            });
          }
        });
      }

    },
    // delete messages
    delMes() {
      API._DelMessages(this.id).then(res => {
        if (res.ret == API.ERROK) {
          this.popHide();
          this.id = [];
          this.pullMessages();
        } else {
          this.$vux.toast.show({
            type: "warn",
            text: "出错啦",
            time: 1500
          });
        }
      });
    },
    // markup messages
    markUpMes() {
      API._MarkupMessages(this.id).then(res => {
        console.log(this.id);
        if (res.ret == API.ERROK) {
          this.popHide();
          this.id = [];
          this.pullMessages();
        } else {
          this.$vux.toast.show({
            type: "warn",
            text: "出错啦",
            time: 1500
          });
        }
      });
    },
    //
    showall(e) {
      $(event.target).removeClass("on");
    }
  }
};
</script>


