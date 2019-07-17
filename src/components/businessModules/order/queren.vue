<template>
  <div class="queren-content">
    <!-- tip -->
    <div class="top-tips">提醒：进行操作前请确认您已收到买家的货款或者您与买家已达成协议，平台对买家是否支付货款不做监督。</div>
    <!-- 商家 -->
    <div class="dingzhi-cus-cont bg-fff">
      <p class="dingzhi-cus-name">订单编号：{{list.orderOrder}}</p>
      <div class="dingzhi-cus-info">
        <img class="dingzhi-info-img" :src="list.bannerImg">
        <ul class="dingzhi-cus-ul">
          <li class="dingzhi-cus-title">{{list.instrucTitle}}</li>
          <li class="dingzhi-cus-ms">{{list.instrucIntro}}</li>
          <li>
            <span class="dingzhi-cus-price">¥{{list.orderDjMoney}}.</span>
            <span class="dingzhi-cus-price0">00</span>
            <span class="dingzhi-cus-shuliang">x{{list.orderSpCount}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 定制信息 -->
    <div class="order-dingzhi paddingB">
      <!-- title -->
      <!-- <p class="order-dingzhi-title bg-fff" v-for="(item,index) in TITLE_A" :key="index">{{item.title}}</p> -->
      <p class="order-dingzhi-title bg-fff">定制信息</p>
      <!-- 基本信息 -->
      <div class="dingzhi-base bg-fff" v-for="(item,index) in INPUT_TABLE_A" :key="index">
        <p class="dingzhi-head">{{item.title}}</p>
        <ul>
          <li class="dingzhi-base-li" v-for="(i,index) in item.dataList" :key="index">
            <input
              :class="{ 'text': !disabled, 'dingzhi-ipt': true}"
              type="text"
              maxlength="4"
              :disabled="disabled"
              :value="i.key1"
            >
            <input class="dingzhi-cus-ipt" type="text" :value="i.value" disabled placeholder="请输入">
            <input
              :class="{ 'text': !disabled, 'dingzhi-ipt': true}"
              type="text"
              maxlength="4"
              :disabled="disabled"
              :value="i.key2"
            >
          </li>
        </ul>
      </div>
      <!-- 图片选择 -->
      <div class="dingzhi-base bg-fff" v-for="(item,index) in INPUT_CHECK_A" :key="index" v-show="false">
        <p class="dingzhi-head">{{item.title}}</p>
        <ul class="dingzhi-tupianC-ul">
          <li v-for="(i,index) in item.dataList" :key="index">
            <div class="dingzhi-tupianC-div">
              <img class="defaultImg" :src="i.imgUrl" alt="img">
            </div>
            <div class="dingzhi-tupianC-li-b">
              <input
                :class="{ 'text': !disabled, 'dingzhi-tupianC-ipt': true}"
                type="text"
                maxlength="5"
                :disabled="disabled"
                :value="i.title"
              >
              <i :class="{'iconfont':true, 'icon-wancheng':true, 'on': !i.select}"></i>
            </div>
          </li>
          <!-- <li>
            <div class="dingzhi-tupianC-div">
              <img class="defaultImg" src="./yifu.png" alt="img">
            </div>
            <div class="dingzhi-tupianC-li-b">
              <input
                :class="{ 'text': !disabled, 'dingzhi-tupianC-ipt': true}"
                type="text"
                maxlength="5"
                :disabled="disabled"
                value="白色"
              >
              <i class="iconfont icon-wancheng on"></i>
            </div>
          </li>
          <li>
            <div class="dingzhi-tupianC-div">
              <img class="defaultImg" src="./yifu.png" alt="img">
            </div>
            <div class="dingzhi-tupianC-li-b">
              <input
                :class="{ 'text': !disabled, 'dingzhi-tupianC-ipt': true}"
                type="text"
                maxlength="5"
                :disabled="disabled"
                value="白色"
              >
              <i class="iconfont icon-wancheng on"></i>
            </div>
          </li>
          <li>
            <div class="dingzhi-tupianC-div">
              <img class="defaultImg" src="./yifu.png" alt="img">
            </div>
            <div class="dingzhi-tupianC-li-b">
              <input
                :class="{ 'text': !disabled, 'dingzhi-tupianC-ipt': true}"
                type="text"
                maxlength="5"
                :disabled="disabled"
                value="白色"
              >
              <i class="iconfont icon-wancheng on"></i>
            </div>
          </li>-->
        </ul>
      </div>
      <!-- 样式选择 -->
      <div class="dingzhi-base bg-fff" v-for="(item,index) in INPUT_CHECK_B" :key="index" v-show="false">
        <p class="dingzhi-head">{{item.title}}</p>
        <!-- <textarea
          :class="{ 'text': !disabled, 'dingzhi-head': true}"
          ref="text"
          :disabled="disabled"
        >样式选择</textarea>-->
        <ul class="dingzhi-stlye-ul">
          <li class="dingzhi-stlye-li" v-for="(i,index) in item.dataList" :key="index">
            <img :src="i.imgUrl" class="dingzhi-li-img">
            <div>
              <div>
                <i
                  :class="{'iconfont':true, 'icon-wancheng':true, 'on': !i.select}"
                  style="float:left;margin-top:6px"
                ></i>
                <textarea
                  :class="{ 'text': !disabled, 'dingzhi-style-head': true}"
                  ref="text"
                  :disabled="disabled"
                >{{i.title}}</textarea>
              </div>
              <div>
                <textarea
                  :class="{ 'text': !disabled, 'dingzhi-style-ms': true}"
                  ref="text"
                  :disabled="disabled"
                >{{i.title}}</textarea>
              </div>
            </div>
          </li>
          <!-- <li class="dingzhi-stlye-li">
            <img class="defaultImg" src="./img4.png" alt="img">
            <div>
              <div>
                <i class="iconfont icon-wancheng on" style="float:left;margin-top:6px"></i>
                <textarea
                  :class="{ 'text': !disabled, 'dingzhi-style-head': true}"
                  ref="text"
                  :disabled="disabled"
                >标题文字1</textarea>
              </div>
              <div>
                <textarea
                  :class="{ 'text': !disabled, 'dingzhi-style-ms': true}"
                  ref="text"
                  :disabled="disabled"
                >这里是关于图片的具体描述信息，这里是关于图片的具体描述信息</textarea>
              </div>
            </div>
          </li>-->
        </ul>
      </div>
      <!-- 采购数量 -->
      <div class="dingzhi-base bg-fff" v-for="(item,index) in INPUT_TABLE_B" :key="index" v-if="index == 0">
        <textarea
          :class="{ 'text': !disabled, 'dingzhi-head': true}"
          ref="text"
          :disabled="disabled"
        >{{item.title}}</textarea>
        <ul class="dingzhi-caigou-ul">
          <li class="dingzhi-caigou-li" v-for="(i,index) in item.dataList" :key="index">
            <!-- <input
              class="dingzhi-caigou-text"
              type="text"
              disabled
              :value="i.key"
              placeholder="文字1"
            > -->
            <p class="dingzhi-caigou-text">{{i.key}}</p>
            <div class="dingzhi-numberbpx">
              <b class="dingzhi-number-icon">-</b>
              <input class="dingzhi-number-ipt" type="number" disabled :value="i.count">
              <b class="dingzhi-number-icon">+</b>
            </div>
          </li>
        </ul>
      </div>
      <!-- 添加照片 -->
      <div class="dingzhi-base bg-fff" v-for="(item,index) in INPUT_IMG_A" :key="index">
        <!-- <textarea
            :class="{ 'text': !disabled, 'dingzhi-head': true}"
            ref="text"
            :disabled="disabled"
        >添加照片</textarea>-->
        <p class="dingzhi-head">{{item.title}}</p>
        <p class="dingzhi-addimg-ms">照片最多可添加三张哦～</p>
        <img
          class="uploadImg"
          v-for="(i,index) in item.dataList"
          :key="index"
          :src="i.imgUrl"
          alt="img"
        >
      </div>
      <!-- 物流费用 -->
      <div class="dingzhi-base bg-fff">
        <p class="dingzhi-head">物流费用</p>
        <div class="wuliu-cont">
          <input
            class="wuliu-ipt"
            id="demo2"
            readonly
            type="text"
            :placeholder="list.expressCompany || '请选择发货地址'"
          >
          <!-- value2用来接收所选对应城市得id，映射到value属性上 -->
          <input id="value2" type="hidden">
          <span class="wuliu-icon">至</span>
          <input
            class="wuliu-ipt"
            type="text"
            :value="list.receivPcodeStr+list.receivCcodeStr"
            placeholder="请选择发货地址"
          >
        </div>
        <div>
          <span>需</span>
          <input class="wuliu-ipt" type="number" v-model="list.orderYfMoney" placeholder="请输入物流费用">
          <span>元</span>
        </div>
      </div>
      <!-- 备注说明 -->
      <div class="dingzhi-base bg-fff" v-for="(item,index) in INPUT_TEXT_A" :key="index">
        <!-- <textarea
            :class="{ 'text': !disabled, 'dingzhi-head': true}"
            ref="text"
            :disabled="disabled"
        >备注说明</textarea>-->
        <p class="dingzhi-head">{{item.title}}</p>
        <textarea
          class="dingzhi-beizhu"
          cols="30"
          rows="10"
          placeholder="可填写您的特殊要求"
          :disabled="isCust"
          v-model="item.content"
        ></textarea>
      </div>
    </div>
    <!-- submit -->
    <div class="queren-submit" @click="submit">提交订单</div>
  </div>
</template>

<script>
  import * as API from "config/api";
  import qs from "qs";
  export default {
    data() {
      return {
        isCust: false,
        disabled: true,
        orderId: this.$route.query.id,
        list: "",
        modules: [],
        numberVal: "1",
        orderList: {
          state: "1",
          expressPcode: "",
          expressCcode: "",
          orderYfMoney: "",
          content: "发货啦~",
          orderUser: this.LS.getItem("userId"),
          orderUserType:"0" // 0是商家 1是买家
        }
      };
    },
    computed: {
      // 模块
      TITLE_A: function() {
        return this.modules.filter(item => {
          return item.type === "TITLE_A";
        });
      },
      INPUT_TABLE_A: function() {
        return this.modules.filter(item => {
          return item.type === "INPUT_TABLE_A";
        });
      },
      IMG_A: function() {
        return this.modules.filter(item => {
          return item.type === "IMG_A";
        });
      },
      INPUT_TABLE_B: function() {
        return this.modules.filter(item => {
          return item.type === "INPUT_TABLE_B";
        });
      },
      INPUT_IMG_A: function() {
        return this.modules.filter(item => {
          return item.type === "INPUT_IMG_A";
        });
      },
      INPUT_CHECK_B: function() {
        return this.modules.filter(item => {
          return item.type === "INPUT_CHECK_B";
        });
      },
      INPUT_CHECK_A: function() {
        return this.modules.filter(item => {
          return item.type === "INPUT_CHECK_A";
        });
      },
      INPUT_TEXT_A: function() {
        return this.modules.filter(item => {
          return item.type === "INPUT_TEXT_A";
        });
      }
    },
    mounted() {
      this.getD();
      this.addressChoose();
    },
    methods: {
      // address
      addressChoose() {
        var area = new LArea();
        area.init({
          trigger: "#demo2",
          valueTo: "#value2",
          keys: {
            id: "id",
            name: "name"
          },
          type: 1,
          data: DataJson
        });
        // success 回调是自己在lare.js中添加得
        area.success = () => {
          let idString = $("#value2").val();
          let idArr = idString.split(",");
          this.orderList.expressPcode = idArr[0];
          this.orderList.expressCcode = idArr[1];
        };
      },
      // submit
      submit() {
        this.orderList.orderYfMoney = (this.list.orderYfMoney).toString();
        if (!this.list.orderYfMoney) {
          alert("请填写运费");
        } else if (!this.orderList.expressPcode) {
          alert("请选择发货地");
        } else {
          this.upDataOrder() // 更新备注说明
          API._caozuoOrder(this.orderId, this.orderList).then(res => {
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
        }
      },
      //更新备注说明
      upDataOrder() {
        let contents = this.list.context.modules;
        let param = {
          id:Number(this.$route.query.id),
          context: JSON.stringify({'modules':contents})
        }
        API._updateOrder(param).then((res) => {
          if(res.data.ret === "200"){
            console.log('数据更新成功')
          }
        })
      },
      // detail
      getD() {
        API._caigouDetail(this.orderId).then(res => {
          if (res.ret == API.ERROK) {
            this.list = res.content;
            this.modules = res.content.context.modules;
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index.styl';

  .wuliu-cont {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .wuliu-icon {
    display: inline-block;
    text-align: center;
    margin: 0 15px;
  }

  .wuliu-ipt {
    padding: 12px;
    border: 1px solid #d2d2d2;
    flex-grow: 1;
    max-width: 40%;
  }

  .bg-fff {
    background: #fff;
  }

  .dingzhi-li-img {
    width: 80px;
    height: 80px;
    display: block;
    margin-right: 20px;
  }

  .defaultImg {
    width: 80px;
    height: 80px;
  }

  .queren-content {
    padding-bottom: 60px;
    background: #f9f9f9;
  }

  .queren-submit {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: #02C2A2;
    box-shadow: 0 -1px 0 0 #F5F5F5;
    font-size: 16px;
    color: #FFFFFF;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 998;
  }

  .uploadImg {
    width: 100px;
    height: 100px;
    margin: 12px 12px 0 0;
  }

  .uploadImg:last-child {
    margin-right: 0;
  }

  .top-tips {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    background: #FEEEC7;
    font-size: 12px;
    color: #FAB100;
    line-height: 18px;
  }

  .dingzhi-cus-cont {
    width: 100%;
    // margin-bottom: 10px;
  }

  .dingzhi-cus-name {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #f9f9f9;
    font-size: 16px;
    color: #2E2E30;
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
    line-height: 18px;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .dingzhi-info-img {
    width: 56px;
    height: 58px;
  }

  .dingzhi-cus-info {
    width: 100%;
    padding: 20px 14px;
    box-sizing: border-box;
    display: flex;
  }

  .dingzhi-caigou-text {
    width: 168px;
    height: 40px;
    font-size: 13px;
    color: #2E2E30;
    line-height 22px
    // border: 1px solid #D2D2D2;
    // padding: 0 10px;
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
    height: 100px;
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
    // justify-content: space-between;
  }

  .dingzhi-tupianC-ul li {
    width: 22%;
    text-align: center;
  }

  .order-show-cube .cube-select:after {
    border: none;
  }

  .dingzhi-cus-ipt {
    width: 54vw;
    height: 8vw;
    padding: 1vw 1vw;
    border-radius: 0.053333rem;
    border: 1px solid #ccc;
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
    margin-bottom: 10px;
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

  #demo2 {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    padding-right: 15px;
    color: #3C3C3F;
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
</style>


