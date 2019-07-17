<template>
  <div class="dingzhi-content">
    <!-- 点击添加收货地址 -->
    <p v-if="!info.id" class="dingzhi-add-adr bg-fff" @click="goAdr">点击添加收货地址</p>
    <!-- 收货地址 -->
    <div v-else class="dingzhi-have-adr bg-fff" @click="goAdr">
      <p class="dingzhi-adr-name">{{info.addrName}} <span style="margin-left:10px">{{info.addrPhone}}</span></p>
      <p class="dingzhi-adr-dz">{{info.addrPcodeStr + info.addrCcodeStr + info.addrAcodeStr + info.address}}</p>
    </div>
    <!-- 商家 -->
    <div class="dingzhi-cus-cont bg-fff">
      <p class="dingzhi-cus-name">{{companyName}}</p>
      <div class="dingzhi-cus-info">
        <img class="dingzhi-info-img" :src="bannerImg">
        <ul class="dingzhi-cus-ul">
          <li class="dingzhi-cus-title">{{instrucTitle}}</li>
          <li class="dingzhi-cus-ms">{{instrucIntro}}</li>
          <li><span class="dingzhi-cus-price">¥{{orderDjMoney}}.</span><span class="dingzhi-cus-price0">00</span><span class="dingzhi-cus-shuliang">x{{orderSpCount}}</span></li>
        </ul>
      </div>
    </div>
    <!-- 定制信息 -->
    <div class="bg-fff dingzhi-cont-inf">
      <p class="dingzhi-cont-inf-title">定制信息</p>
      <div class="dingzhi-cont-items" v-for="(item,index) in list" :key="index" v-if="list[index].type === 'INPUT_TABLE_A'">
        <p class="dingzhi-cont-items-head">{{item.title}}</p>
        <ul class="dingzhi-cont-items-ul">
          <li v-for="(i,index) in item.dataList" :key="index" v-if="i.value!=='请输入'">{{i.key1}}：<span class="dingzhi-marginL">{{i.value + i.key2}}</span></li>
        </ul>
      </div>
      <!-- <div class="dingzhi-cont-items" v-for="(item,index) in list" :key="index" v-if="list[index].type === 'INPUT_CHECK_A'">
          <p class="dingzhi-cont-items-head">{{item.title}}</p>
          <ul class="dingzhi-cont-items-ul disflex">
              <li class="imgC-li" v-for="(i,index) in item.dataList" :key="index" v-if="i.select">
                <img :src="i.imgUrl">
                <p>{{i.title}}</p>
              </li>
          </ul>
      </div>
      <div class="dingzhi-cont-items" v-for="(item,index) in list" :key="index" v-if="list[index].type === 'INPUT_CHECK_B'">
          <p class="dingzhi-cont-items-head">{{item.title}}</p>
          <ul class="dingzhi-stlye-ul">
            <li class="dingzhi-stlye-li" v-for="(i,index) in item.dataList" :key="index" v-if="i.select">
              <img :src="i.imgUrl" class="dingzhi-li-img">
              <div>
                <p class="dingzhi-style-head">{{i.title}}</p>
                <p class="dingzhi-style-ms">{{i.content}}</p>
              </div>
            </li>
          </ul>
      </div> -->
      <div class="dingzhi-cont-items" v-for="(item,index) in list" :key="index" v-if="list[index].type === 'INPUT_TABLE_B' && index === 5">
        <p class="dingzhi-cont-items-head">{{item.title}}</p>
        <ul class="dingzhi-cont-items-ul">
          <li v-for="(i,index) in item.dataList" :key="index">{{i.key}} <span class="dingzhi-marginL">x{{i.count}}</span></li>
        </ul>
      </div>
      <div class="dingzhi-cont-items" v-for="(item,index) in list" :key="index" v-if="list[index].type === 'INPUT_IMG_A'">
        <p class="dingzhi-cont-items-head">{{item.title}}</p>
        <ul class="dingzhi-cont-items-ul disflex" v-if="item.dataList.length">
          <li class="dingzhi-cont-items-img" v-for="(i,index) in item.dataList" :key="index">
            <img width="100%" height="100%" :src="i.imgUrl">
          </li>
        </ul>
        <p v-else>没有添加照片</p>
      </div>
      <div class="dingzhi-cont-items" v-for="(item,index) in list" :key="index" v-if="list[index].type === 'INPUT_TEXT_A'">
        <p class="dingzhi-cont-items-head">{{item.title}}</p>
        <p v-if="item.content">{{item.content}}</p>
        <p v-else>没有填写内容</p>
      </div>
    </div>
    <!-- total -->
    <div class="bg-fff dingzhi-marginB">
      <ul class="dingzhi-total-ul">
        <li class="dingzhi-total-li">
          <span>总价</span>
          <span>¥{{orderSpMoney}}.00</span>
        </li>
        <li class="dingzhi-total-li">
          <span>运费</span>
          <span>{{orderYfMoney || "- -"}}</span>
        </li>
        <!-- <li class="dingzhi-total-li">
            <span>优惠</span>
            <span>¥-20.00</span>
        </li> -->
      </ul>
      <div class="dingzhi-total-zj">
        <span>总计</span>
        <span>￥{{orderSpMoney-orderYfMoney}}.00</span>
      </div>
    </div>
    <!-- footer -->
    <div class="dingzhi-footer">
      <div class="dingzhi-footer-L"><span class="dingzhi-footer-t">总计：</span><b class="dingzhi-footer-L-P">¥{{orderSpMoney-orderYfMoney}}</b><b class="dingzhi-footer-L-0">.00</b></div>
      <div class="dingzhi-footer-btn" @click="submit">提交定制信息</div>
    </div>
  </div>
</template>

<script>
  import * as API from "config/api";
  import LS from 'config/localstorage';
  export default {
    name: "lijidingzhi",
    data() {
      return {
        addNum: "",
        orderSubmit: "",
        list: "",
        info: {},
        adrList: {},
        instrucTitle: this.LS.getItem("instrucTitle"),
        instrucIntro: this.LS.getItem("instrucIntro"),
        bannerImg: this.LS.getItem("bannerImg"),
        companyName: this.LS.getItem("companyName"),
        orderDjMoney: this.LS.getItem("orderList").orderDjMoney,
        orderSpCount: this.LS.getItem("orderList").orderSpCount,
        orderSpMoney: this.LS.getItem("orderList").orderSpMoney,
        orderYfMoney: this.LS.getItem("orderList").orderYfMoney,
        orderYfMoney: this.LS.getItem("orderList").orderYfMoney,
      };
    },
    created(){
      this.$nextTick(()=>{
        // this.defAdr();
        if(this.$route.query.id){
          this.getAdrDet()
        } else {
          if(this.LS.getItem("editAddList")){
            this.info = this.LS.getItem("editAddList")
            console.log( this.info, '--------------- this.info--------------')
          } else{
            this.defAdr();
          }
        }
      })
    },
    mounted() {
      // 取出本地存储得定制信息
      this.list = LS.getItem("orderList").context.modules;
    },
    methods: {
      // 获取默认地址
      defAdr() {
        API._getAdr(this.LS.getItem("userId")).then(res => {
          if (res.ret == API.ERROK) {
            let List = res.content;
            this.adrList = List.filter(item => item.addrState==="1")
            this.info = this.adrList[0];
            this.addNum = res.content.length;
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        });
      },
      // 选择地址
      getAdrDet() {
        API._adrDet(this.$route.query.id).then(res => {
          if (res.ret == API.ERROK) {
            console.log(res.content, '-----------------res.用户选择的地址-------------')
            this.info = res.content;
            this.info.receivPcode = res.content.addrPcode;
            this.info.receivCcode = res.content.addrCcode;
            this.info.receivAcode = res.content.addrAcode;
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        });
      },
      goAdr(){
        // this.$router.push("/addAddress")
        // this.$router.push("/adrmanage?id=200")
        if(this.addNum>0){
          this.$router.push("/adrmanage?id=200")
        } else {
          this.$router.push("/adrmanage?id=200")
        }
      },
      submit() {
        if(this.info){
          this.orderSubmit = LS.getItem("orderList");
          this.orderSubmit.receivUser = this.info.addrName;
          this.orderSubmit.receivPhone = this.info.addrPhone || this.info.receivPhone;
          this.orderSubmit.receivPcode = this.info.addrPcode || this.info.receivPcode;
          this.orderSubmit.receivCcode = this.info.addrCcode || this.info.receivCcode;
          this.orderSubmit.receivAcode = this.info.addrAcode || this.info.receivAcode;
          this.orderSubmit.receivName = this.info.address;
          // this.orderSubmit.addrPcodeStr = this.info.addrPcodeStr;
          // this.orderSubmit.receivUser = this.info.addrCcodeStr;
          // this.orderSubmit.receivUser = this.info.addrAcodeStr;
          // this.orderSubmit.receivUser = this.info.address;
          // 修改订单
          console.log(this.info, '-------------缓存中的地址信息----------------')
          if(this.LS.getItem("UpdataOrEdit") == 1 && this.LS.getItem("wxId") === 'undefined'){ // UpdataOrEdit 0 表示创建新订单 1表示更新订单 且不是在微信转发分享状态
            this.orderSubmit.id = this.LS.getItem("orderId")
            this.orderSubmit.context = JSON.stringify(LS.getItem("orderList").context)
            API._updateOrder(this.orderSubmit).then((res) => {
              if(res.data.ret === "200"){
                this.$router.push("/success");
                this.LS.removeItem("orderId")
                this.LS.removeItem("editAddList")
              }
            });
          } else { // 创建新订单
            if (this.$route.query.modify) {
              this.orderSubmit.id = this.LS.getItem("orderId")
              this.orderSubmit.context = JSON.stringify(LS.getItem("orderList").context)
              API._updateOrder(this.orderSubmit).then((res) => {
                if(res.data.ret === "200"){
                  this.$router.push("/success");
                  this.LS.removeItem("orderId")
                  this.LS.removeItem("editAddList")
                }
              });
            } else {
              this.orderSubmit.context = JSON.stringify(LS.getItem("orderList").context)
              console.log(this.orderSubmit, '参数')
              API._createOrder(this.orderSubmit).then((res) => {
                if(res.data.ret === "200"){
                  this.$router.push("/success");
                }
              });
            }
          }
        }else {
          alert("请选择收货地址")
        }
      }
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index.styl';

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

  .dingzhi-li-img {
    width: 80px;
    height: 80px;
    display: block;
    margin-right: 20px;
  }

  .dingzhi-stlye-li {
    width: 100%;
    height: 100px;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    // justify-content: space-between;
    position: relative;
    margin-bottom: 10px;
  }

  .imgC-li{
    width 80px !important
    margin-right 4%
    text-align center
  }

  .imgC-li img{
    width 80px
    height 80px
  }

  .disflex{
    display flex
  }
  .bg-fff {
    background: #fff;
  }

  .dingzhi-footer-btn {
    width: 125px;
    line-height: 50px;
    background-image: linear-gradient(-134deg, #15D49F 0%, #57D6CF 100%);
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
  }

  .dingzhi-footer-L-0 {
    font-size: 12px;
  }

  .dingzhi-footer-L-P {
    font-size: 14px;
  }

  .dingzhi-footer-t {
    font-size: 16px;
  }

  .dingzhi-footer-L {
    padding: 0 12px;
    color: #02C2A2;
  }

  .dingzhi-footer {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99999;
  }

  .dingzhi-marginB {
    margin-bottom: 110px;
  }

  .dingzhi-total-zj {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 12px;
    font-size: 14px;
    color: #9B9B9B;
  }

  .dingzhi-total-li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #2E2E30;
    padding: 10px 0;
  }

  .dingzhi-total-ul {
    width: 100%;
    padding: 10px 12px;
    border-bottom: 1px solid #d2d2d2;
  }

  .dingzhi-cont-items-img {
    width: 100px !important;
    height: 100px !important;
    display: inline-block;
    margin-right 10px
  }

  .dingzhi-marginL {
    margin-left: 10px;
  }

  .dingzhi-cont-items-ul {
    width: 100%;
  }

  .dingzhi-cont-items-ul li {
    width: 100%;
    margin-top: 12px;
    font-size: 13px;
    color: #5D5D5D;
  }

  .dingzhi-cont-items-head {
    width: 100%;
    font-size: 16px;
    color: #3C3C3F;
    line-height: 16px;
    margin-bottom 15px
  }

  .dingzhi-cont-items {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #D2D2D2;
  }

  .dingzhi-cont-items:last-child {
    border: 0;
  }

  .dingzhi-cont-inf-title {
    width: 100%;
    padding: 15px 12px;
    font-size: 16px;
    color: #2e2e30;
    text-align: center;
    position: relative;
  }

  .dingzhi-cont-inf-title:before {
    content: '';
    width: 133px;
    height: 1px;
    background: #e2e2e2;
    position: absolute;
    left: 0;
    top: 0.64rem;
  }

  .dingzhi-cont-inf-title:after {
    content: '';
    width: 133px;
    height: 1px;
    background: #e2e2e2;
    position: absolute;
    right: 0;
    top: 0.64rem;
  }

  .dingzhi-cont-inf {
    width: 100%;
    padding: 0 12px;
    margin-bottom: 10px;
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

  .dingzhi-cus-info {
    width: 100%;
    padding: 20px 14px;
    box-sizing: border-box;
    display: flex;
  }

  .dingzhi-cus-name {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #f9f9f9;
    font-size: 16px;
    color: #2E2E30;
  }

  .dingzhi-adr-name {
    margin: 15px 0 0 0;
  }

  .dingzhi-adr-dz {
    margin-bottom: 15px;
  }

  .dingzhi-have-adr {
    width: 100%;
    height: 80px;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    margin-bottom: 10px;
  }

  .dingzhi-have-adr:after {
    content: '\e67b';
    font-family: 'iconfont';
    font-size: 10px;
    color: #BDBDBD;
    position: absolute;
    right: 24px;
  }

  .dingzhi-adr-dz {
    width: 100%;
    font-size: 12px;
    color: #9B9B9B;
  }

  .dingzhi-adr-name {
    width: 100%;
    font-size: 16px;
    color: #2E2E30;
  }

  .dingzhi-content {
    width: 100%;
    background: #f9f9f9;
  }

  .dingzhi-add-adr {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 24px;
    box-sizing: border-box;
    font-size: 14px;
    color: #2E2E30;
    position: relative;
    margin-bottom: 10px;
  }

  .dingzhi-add-adr:after {
    content: '\e67b';
    font-family: 'iconfont';
    font-size: 10px;
    color: #BDBDBD;
    position: absolute;
    right: 24px;
  }
</style>

