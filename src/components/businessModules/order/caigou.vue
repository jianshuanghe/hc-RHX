<template>
  <div class="order-content">
    <!-- nav -->
    <ul class="order-nav">
      <li class="order-nav-items on" @click="stateAll">全部</li>
      <li class="order-nav-items" @click="stateDQR">待确认</li>
      <li class="order-nav-items" @click="stateDFH">待发货</li>
      <li class="order-nav-items" @click="stateDSH">待收货</li>
      <li class="order-nav-items" @click="stateYWC">已完成</li>
      <li class="order-nav-items" @click="stateYGB">已关闭</li>
    </ul>
    <!-- content -->
    <div v-show="list.length">
      <scroller
        use-pullup
        :pullup-config="pullupDefaultConfig"
        @on-pullup-loading="loadMore"
        use-pulldown
        :pulldown-config="pulldownDefaultConfig"
        @on-pulldown-loading="refresh"
        lock-x
        ref="scrollerBottom"
        height="-40"
      >
        <ul class="order-ul">
          <li class="order-ul-li" v-for="(item,index) in list" :key="item.id">
            <div @click="details(item.id)">
              <p class="order-ul-li-title">
                <span class="order-ul-li-name">{{item.companyName}}</span>
                <span class="order-ul-li-state0" v-show="item.orderState == 0">待确认</span>
                <span class="order-ul-li-state1" v-show="item.orderState == 1">待发货</span>
                <span class="order-ul-li-state1" v-show="item.orderState == 2">待收货</span>
                <span class="order-ul-li-state2" v-show="item.orderState == 3">已完成</span>
                <span class="order-ul-li-state3" v-show="item.orderState == 4">已关闭</span>
              </p>
              <div class="dingzhi-cus-info">
                <img class="dingzhi-info-img" :src="item.bannerImg">
                <ul class="dingzhi-cus-ul">
                  <li class="dingzhi-cus-title">{{item.instrucTitle}}</li>
                  <li class="dingzhi-cus-ms">{{item.instrucIntro}}</li>
                  <li>
                    <span class="dingzhi-cus-price">¥{{item.orderDjMoney}}.</span>
                    <span class="dingzhi-cus-price0">00</span>
                    <span class="dingzhi-cus-shuliang">x{{item.orderSpCount}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="order-ul-li-bottom">
              <span class="order-ul-li-total">共{{item.orderSpCount}}件商品 总计 ￥{{item.orderSpMoney+item.orderYfMoney}} <small v-if="item.orderYfMoney">(含运费{{item.orderYfMoney}})</small> </span>
              <span class="order-ul-li-btn1" v-show="item.orderState == 0" @click="updata(item.instId,item.isAvailable,item.id)">修改定制信息</span>
              <span class="order-ul-li-btn0" v-show="item.orderState == 3" @click="aging(item.instId,item.isAvailable,item.id)">再来一单</span>
              <span class="order-ul-li-btn1" v-show="item.orderState == 1" @click="fahuo(index,item.id)">提醒发货</span>
              <span class="order-ul-li-btn1" v-show="item.orderState == 2" @click="shouhuo(item.id,item.isAvailable)">确认收货</span>
            </div>
          </li>
        </ul>
      </scroller>
    </div>
    <div class="no-msg" v-show="!list.length">
      <i class="iconfont icon-sekuaigantan"></i>
    </div>
  </div>
</template>

<script>
import { Scroller } from "vux";
import * as API from "config/api";
import axios from "axios";
import { setTimeout } from 'timers';
const pulldownDefaultConfig = {
  content: "下拉刷新",
  height: 40,
  autoRefresh: false,
  downContent: "下拉刷新",
  upContent: "释放后刷新",
  loadingContent: "正在刷新...",
  clsPrefix: "xs-plugin-pulldown-"
};
const pullupDefaultConfig = {
  content: "上拉加载更多",
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: "释放后加载",
  upContent: "上拉加载更多",
  loadingContent: "加载中...",
  clsPrefix: "xs-plugin-pullup-"
};
export default {
  name: "order-list",
  components: { Scroller },
  data() {
    return {
      page: 1,
      list: [],
      state: '', // 订单状态  0 待确认  1 待发货  2 待收货 3已完成  4已关闭',
      pullupDefaultConfig: pullupDefaultConfig,
      pulldownDefaultConfig: pulldownDefaultConfig,
      fahuoList: {
        state: "3",
        content: "完成",
        orderUser: this.LS.getItem("userId"),
	      orderUserType:"1" // 0是商家 1是买家
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 });
    });
    this.loadMore();
    // tab
    $(".order-nav-items").click(function(){
      $(this).addClass("on").siblings().removeClass("on");
    })
  },
  methods: {
    shouhuo(id, i){
      console.log(id, i, '----------------------确认收货参数--------------------')
      // if(i == 1){
      //   this.$vux.toast.show({
      //     width: "90%",
      //     type: "text",
      //     text: '不好意思，定制说明书已经下架或删除',
      //     position: 'middle',
      //     time: 1500
      //   });
      // } else {
      //   this.$createDialog({
      //     type: "confirm",
      //     icon: "",
      //     title: "确认收货",
      //     content: "您确定已收到货物了么？",
      //     confirmBtn: {
      //       text: "收到",
      //       active: true,
      //       disabled: false,
      //       href: "javascript:;"
      //     },
      //     cancelBtn: {
      //       text: "未收到",
      //       active: false,
      //       disabled: false,
      //       href: "javascript:;"
      //     },
      //     onConfirm: () => {
      //       API._caozuoOrder(id, this.fahuoList).then(res => {
      //         console.log(res)
      //         if (res.data.ret === "200") {
      //           this.$vux.toast.show({
      //             text: res.data.msg,
      //             time: 1500,
      //             onHide: () => {
      //               this.$router.go(-1);
      //             }
      //           });
      //         } else {
      //           this.$vux.toast.show({
      //             type: "warn",
      //             text: res.data.msg,
      //             time: 1500
      //           });
      //         }
      //       });
      //     },
      //     onCancel: () => {}
      //   }).show();
      // }
      this.$createDialog({
        type: "confirm",
        icon: "",
        title: "确认收货",
        content: "您确定已收到货物了么？",
        confirmBtn: {
          text: "收到",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "未收到",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          API._caozuoOrder(id, this.fahuoList).then(res => {
            console.log(res)
            if (res.data.ret === "200") {
              this.$vux.toast.show({
                text: res.data.msg,
                time: 1500,
                onHide: () => {
                  this.$router.go(-1);
                }
              });
            } else {
              this.$vux.toast.show({
                type: "warn",
                text: res.data.msg,
                time: 1500
              });
            }
          });
        },
        onCancel: () => {}
      }).show();
    },
    fahuo(i,id){
      let confirmTime = this.list[i].confirmTime;
      let now = (new Date()).getTime();
      let timeCha = now - (1000*60*60*24*3)
      if(timeCha< confirmTime){
        API._tixing(id).then(res=>{
          if(res.ret == API.ERROK){
            this.$vux.toast.show({
              text: "已提醒商家发货",
              time: 1500
            });
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        })
      } else {
        this.$vux.toast.show({
          width: "90%",
          type: "text",
          text: "距离下单不满3天，不可进行此操作",
          time: 1500
        });
        // alert("距离下单不满3天，不可进行此操作")
      }
    },
    // 切换列表
    stateAll() {
      this.state = '';
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateDQR() {
      this.state = '0';
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateDFH() {
      this.state = '1';
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateDSH() {
      this.state = '2';
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateYWC() {
      this.state = '3';
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateYGB() {
      this.state = '4';
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    // 再来一单
    aging(id,i,key) {
      console.log(id,i,key, '------------再来一单传值------------------')
      if(i == 1){
        this.$vux.toast.show({
          width: "90%",
          type: "text",
          text: '不好意思，定制说明书已经下架或删除',
          position: 'middle',
          time: 1500
        });
      } else{
        this.$router.push("/cust?instrucId="+id+"&agin=200" + "&orderId=" + key  + '&modify=1')
      }
    },
    // 修改定制信息
    updata(id,i,orderId) {
      if(i == 1){
        this.$vux.toast.show({
          width: "90%",
          type: "text",
          text: '不好意思，定制说明书已经下架或删除',
          position: 'middle',
          time: 1500
        });
      } else{
        this.$router.push("/cust?orderId="+orderId+"&instrucId="+id+"&update=200" + '&modify=1')
      }
    },
    details(id) {
      this.$router.push("/caigouDet?id="+id);
    },
    fetchData(cb) {
      if (!this.LS.getItem("userId")) {
        this.$router.push("/tel");
      } else {
        API._caigouList(this.LS.getItem("userId"), this.page, this.state).then(res => {
          if (res.ret == API.ERROK) {
            $(".xs-plugin-pullup-container").show()
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset();
              if(res.content.list.length==0){
                $(".xs-plugin-pullup-container").html("到底了")
                setTimeout(()=>{
                  $(".xs-plugin-pullup-container").hide()
                },1000)
              }
            });
            cb(res.content);
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        });
      }
    },
    refresh() {
      this.page = 1;
      this.fetchData(data => {
        this.list = data.list;
        if (data.list.length <= 10) {
          this.$refs.scrollerBottom.donePulldown();
          this.$refs.scrollerBottom.disablePullup();
        } else {
          this.$refs.scrollerBottom.donePulldown();
          this.$refs.scrollerBottom.donePullup();
        }
      });
    },
    loadMore() {
      this.fetchData(data => {
        if (data.count <= 10) {
          this.$refs.scrollerBottom.disablePullup();
          this.list = this.list.concat(data.list);
        } else {
          this.list = this.list.concat(data.list);
          this.$refs.scrollerBottom.donePullup();
          this.page++;
        }
      });
    }
    // 用户端-采购列表
    // getList() {
    //   if (!this.LS.getItem("userId")) {
    //     this.$router.push("/tel");
    //   } else {
    //     API._caigouList(this.LS.getItem("userId"), this.page).then(res => {
    //       if (res.ret == API.ERROK) {
    //         console.log(res);
    //       } else {
    //         this.$vux.toast.show({
    //           type: "warn",
    //           text: res.msg,
    //           time: 1500
    //         });
    //       }
    //     });
    //   }
    // }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.icon-sekuaigantan{
  font-size 40px
  color #02c2a2;
}

.no-msg{
  width 100%
  background #fff
  height 300px
  display flex
  justify-content center
  align-items center
}

.order-ul-li-name {
  width: 280px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.order-ul-li-btn0 {
  width: 76px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #2E2E30;
  border-radius: 2px;
  font-size: 13px;
  color: #2E2E30;
  text-align: center;
}

.order-ul-li-btn1 {
  padding 0 12px
  height: 34px;
  line-height: 34px;
  border: 1px solid #02C2A2;
  border-radius: 2px;
  font-size: 13px;
  color: #02C2A2;
  text-align: center;
}

.order-ul-li-total {
  font-size: 13px;
  color: #9B9B9B;
}

.order-ul-li-bottom {
  width: 100%;
  height: 54px;
  padding: 10px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #d2d2d2;
}

.order-ul-li-state1 {
  color: #02C2A2;
}

.order-ul-li-state2 {
  color: #FF4D6A;
}

.order-ul-li-state2 {
  color: #9B9B9B;
}

.dingzhi-cus-info {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
}

.dingzhi-cus-cont {
  width: 100%;
  margin-bottom: 10px;
}

.dingzhi-cus-shuliang {
  font-size: 13px;
  color: #9B9B9B;
}

.dingzhi-cus-price0 {
  font-size: 13px;
  color: #02C2A2;
  margin-right: 10px;
}

.dingzhi-cus-price {
  font-size: 16px;
  color: #02C2A2;
}

.dingzhi-cus-ms {
  width: 100%;
  font-size: 13px;
  color: #9B9B9B;
  line-height: 13px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.dingzhi-cus-title {
  width: 100%;
  font-size: 16px;
  color: #2E2E30;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 10px;
}

.dingzhi-cus-ul {
  width: 280px;
  margin-left: 12px;
  display flex
  flex-direction column
  justify-content space-between
}

.dingzhi-info-img {
  width: 56px;
  height: 58px;
}

.order-ul-li-state0 {
  color: #FAB100;
}

.xs-plugin-pulldown-container {
  height: 40px !important;
  line-height: 40px !important;
}

.xs-plugin-pullup-container {
  height: 40px !important;
  line-height: 40px !important;
}

.order-ul-li-title {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border-bottom: 1px solid #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #2E2E30;
  line-height: 16px;
}

.order-ul-li {
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
}

.order-ul {
  width: 100%;
}

.order-nav-items.on {
  color: #02C2A2;
  position: relative;
}

.order-nav-items.on:after {
  content: '';
  width: 12px;
  height: 1px;
  background: #02C2A2;
  position: absolute;
  bottom: -12px;
  left: 50%;
  margin-left: -6px;
}

.order-nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #2E2E30;
  background: #fff;
}

.order-content {
  width: 100%;
  background: #f9f9f9;
}
</style>

