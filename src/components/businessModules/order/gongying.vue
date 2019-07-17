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
          <li class="order-ul-li" v-for="item in list" :key="item.id"  @click="details(item.id)">
            <p class="order-ul-li-title">
              <span class="order-ul-li-name">订单编号：{{item.orderOrder}}</span>
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
                <li class="dingzhi-cus-ms">￥{{item.orderDjMoney}}*{{item.orderSpCount}} {{item.orderUnit}}</li>
                <li class="dingzhi-cus-shuliang">总额：¥{{item.orderSpMoney+item.orderYfMoney}} <span v-if="item.orderYfMoney">(含运费￥{{item.orderYfMoney}})</span> </li>
              </ul>
            </div>
            <div class="order-ul-li-bottom">
              <ul class="order-ul-li-bottom-l">
                <li>定制客户：{{item.userName}}</li>
                <li>联系电话：{{item.ssoUserName}}</li>
              </ul>
              <ul class="order-ul-li-bottom-r">
                <li class="select" @click.stop="details(item.id)">查看</li>
                <li class="done" v-show="item.orderState == 0 || item.orderState == 1" @click.stop="banli(item.id,item.orderState)">办理</li>
              </ul>
            </div>
          </li>
          <!-- <li class="order-ul-li">
            <p class="order-ul-li-title">
              <span class="order-ul-li-name">订单编号：2830 7492 7491 5010</span>
              <span class="order-ul-li-state1">待发货</span>
            </p>
            <div class="dingzhi-cus-info">
              <img class="dingzhi-info-img" src="./order1.png">
              <ul class="dingzhi-cus-ul">
                <li class="dingzhi-cus-title">这里是定制信息的名称吧啦吧啦了啦了啦了啦了</li>
                <li class="dingzhi-cus-ms">¥99.00 ～ ¥109.00</li>
                <li class="dingzhi-cus-shuliang">订单总额：¥1980.00</li>
              </ul>
            </div>
            <div class="order-ul-li-bottom">
              <ul class="order-ul-li-bottom-l">
                <li>定制客户：某某某</li>
                <li>联系电话：123 7490 5928</li>
              </ul>
              <ul class="order-ul-li-bottom-r">
                <li class="select">查看</li>
                <li class="done">办理</li>
              </ul>
            </div>
          </li>
          <li class="order-ul-li">
            <p class="order-ul-li-title">
              <span class="order-ul-li-name">订单编号：2830 7492 7491 5010</span>
              <span class="order-ul-li-state2">已完成</span>
            </p>
            <div class="dingzhi-cus-info">
              <img class="dingzhi-info-img" src="./order1.png">
              <ul class="dingzhi-cus-ul">
                <li class="dingzhi-cus-title">这里是定制信息的名称吧啦吧啦了啦了啦了啦了</li>
                <li class="dingzhi-cus-ms">¥99.00 ～ ¥109.00</li>
                <li class="dingzhi-cus-shuliang">订单总额：¥1980.00</li>
              </ul>
            </div>
            <div class="order-ul-li-bottom">
              <ul class="order-ul-li-bottom-l">
                <li>定制客户：某某某</li>
                <li>联系电话：123 7490 5928</li>
              </ul>
              <ul class="order-ul-li-bottom-r">
                <li class="select">查看</li>
                <li class="done">办理</li>
              </ul>
            </div>
          </li>
          <li class="order-ul-li">
            <p class="order-ul-li-title">
              <span class="order-ul-li-name">订单编号：2830 7492 7491 5010</span>
              <span class="order-ul-li-state3">已关闭</span>
            </p>
            <div class="dingzhi-cus-info">
              <img class="dingzhi-info-img" src="./order1.png">
              <ul class="dingzhi-cus-ul">
                <li class="dingzhi-cus-title">这里是定制信息的名称吧啦吧啦了啦了啦了啦了</li>
                <li class="dingzhi-cus-ms">¥99.00 ～ ¥109.00</li>
                <li class="dingzhi-cus-shuliang">订单总额：¥1980.00</li>
              </ul>
            </div>
            <div class="order-ul-li-bottom">
              <ul class="order-ul-li-bottom-l">
                <li>定制客户：某某某</li>
                <li>联系电话：123 7490 5928</li>
              </ul>
              <ul class="order-ul-li-bottom-r">
                <li class="select">查看</li>
                <li class="done">办理</li>
              </ul>
            </div>
          </li> -->
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
  pullUpHeight: 0,
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
      state: "", // 订单状态  0 待确认  1 待发货  2 待收货 3已完成  4已关闭',
      pullupDefaultConfig: pullupDefaultConfig,
      pulldownDefaultConfig: pulldownDefaultConfig
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 });
    });
    this.loadMore();
    // tab
    $(".order-nav-items").click(function() {
      $(this)
        .addClass("on")
        .siblings()
        .removeClass("on");
    });
  },
  methods: {
    // 切换列表
    stateAll() {
      this.state = "";
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateDQR() {
      this.state = "0";
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateDFH() {
      this.state = "1";
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateDSH() {
      this.state = "2";
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateYWC() {
      this.state = "3";
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    stateYGB() {
      this.state = "4";
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.refresh();
    },
    // 再来一单
    aging() {},
    details(id) {
      this.$router.push("/gongyingDet?id=" + id);
    },
    banli(id,state) {
      if(state == 1){
        this.$router.push("/fahuo?id=" + id);
      }else {
        this.$router.push("/queren?id=" + id);
      }
    },
    fetchData(cb) {
      if (!this.LS.getItem("userId")) {
        this.$router.push("/tel");
      } else {
        API._gongyingList(this.LS.getItem("userId"), this.page, this.state).then(
          res => {
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
          }
        );
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

.select {
  border: 1px solid #2E2E30;
  border-radius: 2px;
  color: #2E2E30;
}

.done {
  border: 1px solid #02C2A2;
  border-radius: 2px;
  color: #02C2A2;
}

.order-ul-li-bottom-r {
  display: flex;
}

.order-ul-li-bottom-r li {
  width: 50px;
  height: 33px;
  margin-left: 20px;
  font-size: 13px;
  line-height: 33px;
  text-align: center;
}

.order-ul-li-bottom-l {
  height: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 13px;
  color: #9B9B9B;
  line-height: 13px;
}

.order-ul-li-name {
  width: 250px;
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
  width: 76px;
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
  height: 78px;
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

