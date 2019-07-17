<template>
    <div class="myPersonal">
        <!-- top -->
        <div class="personalTop" @click="goEdit">
            <div class="personalName">
                <!-- <p class="userName nowrap">{{uinfo.companyName || uinfo.nickname}}</p> -->
                <p class="userName nowrap">{{uinfo.nickname}}</p>
                <p class="userEdit">点击修改个人资料<i class="iconfont icon-icon-arrow-right4"></i></p>
            </div>
            <img class="headImg" :src="uinfo.headImg || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="img">
        </div>
        <!-- order -->
        <ul class="order-cont">
          <li class="order-items" @click="goCg">
            <p class="order-items-num">{{caigouNum || 0}}</p>
            <p class="order-items-text">采购订单</p>
          </li>
          <li class="order-shu"></li>
          <li class="order-items" @click="goGy">
            <p class="order-items-num">{{gongyingNum || 0}}</p>
            <p class="order-items-text">供应订单</p>
          </li>
        </ul>
        <!-- 数据统计 -->
        <div class="dataTotal">
            <p class="dataTitle"><i class="iconfont icon-Z6"></i> 数据统计</p>
            <div class="dataTotalIfor">
                <div class="dataMs" v-if="uinfoNumber === 1">您的说明书太受欢迎了，综合实力已超过<span class="colorCYD"> {{uinfo.beyondUser ? uinfo.beyondUser : '0'}}</span>的用户啦，累计节省<span class="colorCYD"> {{uinfo.money ? uinfo.money : '0'}}元</span>。</div>
                <div class="dataMs" v-if='uinfoNumber === 2'>您的说明书水平不错哦，综合实力已超过<span class="colorCYD"> {{uinfo.beyondUser ? uinfo.beyondUser : '0'}}</span>的用户啦，累计节省<span class="colorCYD"> {{uinfo.money ? uinfo.money : '0'}}元</span>。</div>
                <div class="dataMs" v-if='uinfoNumber === 3'>您的说明书水平一般了，综合实力已超过<span class="colorCYD"> {{uinfo.beyondUser ? uinfo.beyondUser : '0'}}</span>的用户啦，累计节省<span class="colorCYD"> {{uinfo.money ? uinfo.money : '0'}}元</span>。</div>
                <div class="dataMs" v-if='uinfoNumber === 4'>您的说明书太垃圾了，综合实力只超过<span class="colorCYD"> {{uinfo.beyondUser ? uinfo.beyondUser : '0'}}</span>的用户啦，累计节省<span class="colorCYD"> {{uinfo.money ? uinfo.money : '0'}}元</span>。</div>
                <div class="dataMore" @click="goWatch">去看看</div>
            </div>
        </div>
        <!-- 账户信息 -->
        <div class="payInfor" @click="goGs">公司信息<i class="iconfont icon-icon-arrow-right4"></i></div>
        <div class="payInfor" @click="goDz">收货地址<i class="iconfont icon-icon-arrow-right4"></i></div>
        <div class="payInfor" @click="goZh">账户信息<i class="iconfont icon-icon-arrow-right4"></i></div>
        <!-- about RHX -->
        <div class="aboutRhx">
            <p class="aboutRhxItem" @click="goRhx">关于如何秀<i class="iconfont icon-icon-arrow-right4"></i></p>
            <p class="aboutRhxItem" @click="goFeedback">意见反馈<i class="iconfont icon-icon-arrow-right4"></i></p>
            <!-- <p class="aboutRhxItem" @click="weixinShareTimeline">分享<i class="iconfont icon-icon-arrow-right4"></i></p> -->
            <!-- <p class="aboutRhxItem" @click="LS.clear">清缓存<i class="iconfont icon-icon-arrow-right4"></i></p> -->
        </div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.order-items-text{
  font-size: 14px;
  color: #2E2E30;
  line-height: 14px;
}

.order-items-num{
  font-size: 18px;
  color: #2E2E30;
  line-height: 18px;
  margin-bottom 10px
}

.order-shu{
  width 1px
  height 30px
  background #E2E2E2
}

.order-items{
  flex-grow 1
}

.order-cont{
  width 100%
  border-top 1px solid #f5f5f5
  display flex
  justify-content space-around
  align-items center
  padding 14px 0
  text-align center
  background #fff
  margin-bottom 10px
}

.myPersonal {
  width: 100%;
  float: left;
  background: #f9f9f9;
}

.personalName {
  width: 80%;
}

.colorCYD {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #02c2a2;
}

// aboutRhx
.aboutRhxItem .icon-icon-arrow-right4 {
  float: right;
  color: #BDBDBD;
  font-size: 9px;
}

.aboutRhxItem {
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #2E2E30;
  line-height: 16px;
  padding: 22px 0;
  display: inline-block;
  border-bottom: 1px solid #F5F5F5;
}

.aboutRhxItem:last-child {
  border-bottom: 0;
}

.aboutRhx {
  padding: 0 24px;
  background: #fff;
  margin-top: 11px;
  display: flex;
  flex-direction: column;
  margin-bottom: 90px;
}

// 账户信息
.payInfor .icon-icon-arrow-right4 {
  float: right;
  color: #BDBDBD;
}

.payInfor {
  width: 100%;
  padding: 22px 24px;
  box-sizing: border-box;
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #2E2E30;
  line-height: 16px;
  background: #fff;
}

// 数据统计
.dataTotalIfor {
  display: flex;
  justify-content: space-between;
}

.dataMore {
  width: 60px;
  height: 24px;
  background-image: linear-gradient(134deg, #15D49F 0%, #57D6CF 100%);
  box-shadow: 0 1px 3px 0 rgba(2, 194, 162, 0.3);
  border-radius: 28px;
  text-align: center;
  line-height: 24px;
  color: #fff;
}

.dataMs {
  width: 70%;
  font-family: PingFangSC-Light;
  font-size: 13px;
  color: #9B9B9B;
  letter-spacing: 0;
  line-height: 20px;
}

.dataTitle {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #2E2E30;
  letter-spacing: 0;
  line-height: 16px;
  margin-bottom: 11px;
}

.icon-Z6 {
  font-size: 14px;
  color: #2E2E30;
  margin-right: 10px;
}

.dataTotal {
  padding: 20px 12px 15px 12px;
  background: #fff;
  margin-top: 1px;
  margin-bottom: 11px;
}

// top
.icon-icon-arrow-right4 {
  font-size: 9px;
  color: #2E2E30;
  margin-left: 6px;
  display: inline-block;
}

.userEdit {
  font-family: PingFangSC-Light;
  font-size: 13px;
  color: #3C3C3F;
  letter-spacing: 0;
  line-height: 13px;
}

.userName {
  margin-bottom: 15px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  height: 26px;
  line-height: 26px;
  color: #3C3C3F;
  letter-spacing: 0;
  line-height: 20px;
}

.headImg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.personalTop {
  width: 100%;
  padding: 40px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 0 0 #F5F5F5;
}
</style>

<script>
import * as API from "config/api";
import { mapMutations, mapGetters } from "vuex";
import wxApi from "../../mixins/wxapi.js"; //微信分享sdk
export default {
  name: "myPersonal",
  mixins: [wxApi],
  data() {
    return {
      caigouNum: '',
      gongyingNum: '',
      uinfoNumber:'', // 统计分析中百分数
      uinfo: {
        companyName: this.LS.getItem("nickname"),
        headImg: this.LS.getItem("headImg")
      }
    };
  },
  created: function() {
    this.$nextTick(() => {
      let dHeight = $(document).height();
      let wHeight = $(window).height();
      // let aHeight = $("#app").height();
      if (document < wHeight) {
        $(".myPersonal").height(wHeight);
        alert;
      } else {
        $(".myPersonal").height(dHeight);
      }
      // 微信分享
      this.wxApiG();
      if (this.LS.getItem("userId")) {
        console.log("11");
        this.getUserInfor(); // 获取用户信息
      }
      // 订单数
      this.getOrderCgNum();
      this.getOrderGyNum();
    });
  },
  methods: {
    ...mapMutations({
      set_uinfo: "SET_UINFO"
    }),
    // 获取订单单数
    getOrderCgNum() {
      API._caigouList(this.LS.getItem("userId"), 1, '').then((res)=>{
        this.caigouNum = res.content.count
      })
    },
    // 获取订单单数
    getOrderGyNum() {
      API._gongyingList(this.LS.getItem("userId"), 1, '').then((res)=>{
        this.gongyingNum = res.content.count
      })
    },
    // 获取用户信息
    getUserInfor() {
      if (this.LS.getItem("userId")) {
        API._GetUserInfo(this.LS.getItem("userId")).then(res => {
          if (res.ret == API.ERROK) {
            this.uinfo = res.content;
            this.ConUinfoNumber(this.uinfo)
            this.LS.setItem("uinfo", res.content);
            this.set_uinfo(res.content);
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        });
      } else {
        this.uinfo.nickname = this.LS.getItem("nickname");
        this.uinfo.headImg = this.LS.getItem("headImg");
      }
    },
    ConUinfoNumber(data) {
      if (parseFloat(data.beyondUser) >= parseFloat('90%')) {
        this.uinfoNumber = 1
      } else if (parseFloat(data.beyondUser) >= parseFloat("60%")&&parseFloat(data.beyondUser) < parseFloat("90%")){
        this.uinfoNumber = 2
      } else if (parseFloat(data.beyondUser) >= parseFloat("20%")&&parseFloat(data.beyondUser) < parseFloat("60%")){
        this.uinfoNumber = 3
      } else if (parseFloat(data.beyondUser) >= parseFloat("0%")&&parseFloat(data.beyondUser) < parseFloat("20%")){
        this.uinfoNumber = 4
      }
    },
    //   路由跳转
    goEdit() {
      this.$router.push("/editPerInfo");
    },
    goWatch() {
      this.$router.push("/personalData");
    },
    goZh() {
      this.$router.push("/zhangHao");
    },
    goGs() {
      this.$router.push("/company");
    },
    goDz() {
      this.$router.push("/adrmanage");
    },
    goCg() {
      this.$router.push("/caigou");
    },
    goGy() {
      this.$router.push("/gongying");
    },
    goFeedback() {
      this.$router.push("/feedBack");
    },
    goRhx() {
      this.$router.push("/aboutRhx");
    }
  }
};
</script>

