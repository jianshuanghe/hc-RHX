<template>
  <div class="dingzhi-content">
    <!-- state -->
    <div class="order-state">
      <ul>
        <li v-show="list.orderState == 0">
          <p class="order-state-text state0">待确认</p>
          <p class="order-state-ms">等待商家确认...</p>
        </li>
        <li v-show="list.orderState == 1">
          <p class="order-state-text state1">待发货</p>
          <p class="order-state-ms">商家已确认，正在为您准备货物～</p>
        </li>
        <li v-show="list.orderState == 2">
          <p class="order-state-text state1">待收货</p>
          <p class="order-state-ms">
            商家已发货，点击
            <span class="state1" @click="showPop = !showPop">查看物流详情 ></span>
          </p>
        </li>
        <li v-show="list.orderState == 3">
          <p class="order-state-text state2">已完成</p>
          <p class="order-state-ms">您已确认收货，订单已完成～</p>
        </li>
        <li v-show="list.orderState == 4">
          <p class="order-state-text state3">已关闭</p>
          <p class="order-state-ms">订单已关闭～</p>
        </li>
      </ul>
    </div>
    <!-- state end -->
    <div></div>
    <div class="caigou-adr">
      <div class="dingzhi-have-adr">
        <p class="dingzhi-adr-name">
          {{list.receivUser}}
          <span style="margin-left:10px">{{list.receivPhone}}</span>
        </p>
        <p
          class="dingzhi-adr-dz"
        >{{list.receivPcodeStr+list.receivCcodeStr+list.receivAcodeStr+list.receivName}}</p>
        <!-- <p
          class="dingzhi-adr-dz"
        >{{list.receivPcodeStr+list.receivCcodeStr+list.receivAcodeStr+list.receivName}}</p> -->
      </div>
      <img class="line-bg" src="./ade-bg.png" width="100%">
    </div>
    <!-- 商家 -->
    <div class="dingzhi-cus-cont bg-fff">
      <p class="dingzhi-cus-name">{{list.companyName}}</p>
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
    <div class="bg-fff dingzhi-cont-inf">
      <p class="dingzhi-cont-inf-title">定制信息</p>
      <!-- INPUT_TABLE_A 基本信息-->
      <div v-for="(item,index) in INPUT_TABLE_A" :key="index">
        <div class="dingzhi-cont-items">
          <p class="dingzhi-cont-items-head">{{item.title}}</p>
          <ul class="dingzhi-cont-items-ul">
            <li v-for="(i,index) in item.dataList" :key="index" v-if="i.value!=='请输入'">
              {{i.key1}}：
              <span class="dingzhi-marginL">{{i.value}}{{i.key2}}</span>
            </li>
            <!-- <li>
              体重：
              <span class="dingzhi-marginL">75KG</span>
            </li>
            <li>
              年龄：
              <span class="dingzhi-marginL">28岁</span>
            </li>-->
          </ul>
        </div>
      </div>
      <!-- INPUT_CHECK_A -->
      <!-- <div class="dingzhi-cont-items" v-for="(item,index) in INPUT_CHECK_A" :key="index">
        <p class="dingzhi-cont-items-head">{{item.title}}</p>
        <ul class="dingzhi-cont-items-ul style-flex">
          <li class="style-li" v-for="(i,index) in item.dataList" :key="index" v-if="i.select">
            <img class="style-img" :src="i.imgUrl">
            <p class="style-img-ms">{{i.title}}</p>
          </li>
        </ul>
      </div> -->
      <!-- INPUT_CHECK_B -->
      <!-- <div class="dingzhi-cont-items" v-for="(item,index) in INPUT_CHECK_B" :key="index">
        <p class="dingzhi-cont-items-head">{{item.title}}</p>
        <ul class="dingzhi-cont-items-ul">
          <li class="dingzhi-li" v-for="(i,index) in item.dataList" :key="index" v-if="i.select">
            <img :src="i.imgUrl" class="dingzhi-li-img">
            <div class="dingzhi-li-div">
              <p class="dingzhi-li-div-p">{{i.title}}</p>
              <p class="dingzhi-li-div-content">{{i.content}}</p>
            </div>
          </li>
        </ul>
      </div> -->
      <!-- 采购数量-->
      <div class="dingzhi-cont-items marginB10" v-for="(item,index) in modules" :key="index" v-if="modules[index].type === 'INPUT_TABLE_B' && index === 5">
          <p class="dingzhi-cont-items-head">{{item.title}}</p>
          <ul class="dingzhi-cont-items-ul">
              <li v-for="(i,index) in item.dataList" :key="index">{{i.key}} <span class="dingzhi-marginL">x{{i.count}}</span></li>
          </ul>
      </div>
      <!-- <div class="dingzhi-cont-items">
        <p class="dingzhi-cont-items-head">{{IMG_A[1].title}}</p>
        <ul class="dingzhi-cont-items-ul">
          <li v-for="(i,index) in INPUT_TABLE_B[0].dataList" :key="index">
            L
            <span class="dingzhi-marginL">x{{i.count}}</span>
          </li>
        </ul>
      </div> -->
      <div class="marginB10" v-for="(item,index) in INPUT_IMG_A" :key="index">
        <div class="dingzhi-cont-items">
          <p class="dingzhi-cont-items-head">{{item.title}}</p>
          <ul class="dingzhi-cont-items-ul" v-if="item.dataList.length">
            <li>
              <img
                class="dingzhi-cont-items-img"
                v-for="(i,index) in item.dataList"
                :key="index"
                :src="i.imgUrl"
              >
              <!-- <img class="dingzhi-cont-items-img" src="./img5.png">
              <img class="dingzhi-cont-items-img" src="./img5.png">-->
            </li>
          </ul>
          <ul class="dingzhi-cont-items-ul" v-else>
            <li>没有照片</li>
          </ul>
        </div>
      </div>
      <!-- 备注说明 -->
      <div class="bg-fff marginB10" v-for="(item,index) in INPUT_TEXT_A" :key="index">
        <p class="dingzhi-cont-items-head">{{item.title}}</p>
        <p class="colse-reson lineH">{{item.content?item.content:'未填写'}}</p>
      </div>
    </div>
    <!-- total -->
    <div class="bg-fff marginB10">
      <ul class="dingzhi-total-ul">
        <li class="dingzhi-total-li">
          <span>总价</span>
          <span>¥{{list.orderSpMoney}}.00</span>
        </li>
        <li class="dingzhi-total-li">
          <span>运费</span>
          <span>{{list.orderYfMoney || '- -'}}</span>
        </li>
        <!-- <li class="dingzhi-total-li">
          <span>优惠</span>
          <span>¥-20.00</span>
        </li>-->
      </ul>
      <div class="dingzhi-total-zj">
        <span>总计</span>
        <span>￥{{list.orderSpMoney + list.orderYfMoney}}.00</span>
      </div>
    </div>
    <!-- 交易信息 -->
    <div class="bg-fff marginB10">
      <p class="dingzhi-cus-name">交易信息</p>
      <ul class="jiaoyi-info-ul">
        <li>订单编号：{{list.orderOrder}}</li>
        <li>下单时间：{{list.createTime | formatDate}}</li>
        <li v-show="list.orderState == 4">关闭时间：{{list.closeTime | formatDate}}</li>
        <li v-show="list.orderState == 1 || list.orderState == 2 || list.orderState == 3" >确认时间：{{list.confirmTime | formatDate}}</li>
        <li v-show="list.orderState == 2 || list.orderState == 3">发货时间：{{list.sendTime | formatDate}}</li>
        <li v-show="list.orderState == 3 || list.orderState == 3">完成时间：{{list.finishTime | formatDate}}</li>
      </ul>
    </div>
    <!-- 关闭原因 -->
    <div class="bg-fff" v-show="list.orderState == 4 && list.closeContent !=='买家关闭'">
      <p class="dingzhi-cus-name">关闭原因</p>
      <p class="colse-reson">{{list.closeContent?list.closeContent:"未填写关闭原因"}}</p>
      <div class="colse-reson-text">关闭账号:{{list.closeOrderUser}}</div>
    </div>
    <!-- footer -->
    <div class="foot-fukuan" v-show="list.orderState == 0">
      <span>
        应付款
        <span class="yunfei">（含运费￥{{list.orderYfMoney||'0'}}）</span>
      </span>
      <span class="foot-total-p">￥{{list.orderSpCount*list.orderDjMoney + list.orderYfMoney}}.00</span>
    </div>
    <div class="dingzhi-footer" v-show="list.orderState == 0">
      <span class="dingzhi-footer-call">
        <i class="iconfont icon-nbbPhone1"></i>
        <a @click="callPhone(list.bUserPhone)">联系商家</a>
      </span>
      <span class="dingzhi-footer-line">|</span>
      <span class="dingzhi-footer-del" @click="CloseOrder(list.context.orderId,list.isAvailable)">关闭交易</span>
      <span class="dingzhi-footer-line">|</span>
      <span class="dingzhi-footer-color" @click="updata(list.instrucId,list.isAvailable,list.context.orderId)">修改定制信息</span>
    </div>
    <div class="dingzhi-footer" v-show="list.orderState == 1">
      <span class="dingzhi-footer-call">
        <i class="iconfont icon-nbbPhone1"></i>
        <a @click="callPhone(list.bUserPhone)">联系商家</a>
      </span>
      <span class="dingzhi-footer-line" v-if="showFaHuo">|</span>
      <span class="dingzhi-footer-color" v-if="showFaHuo" @click="fahuo(list.context.orderId)">提醒发货</span>
    </div>
    <div class="dingzhi-footer" v-show="list.orderState == 2">
      <span class="dingzhi-footer-call">
        <i class="iconfont icon-nbbPhone1"></i>
        <a @click="callPhone(list.bUserPhone)">联系商家</a>
      </span>
      <span class="dingzhi-footer-line">|</span>
      <span class="dingzhi-footer-color" @click="SureShouHuo(list.context.orderId,list.isAvailable)">确认收货</span>
    </div>
    <div class="dingzhi-footer" v-show="list.orderState == 3">
      <span class="dingzhi-footer-call">
        <i class="iconfont icon-nbbPhone1"></i>
        <a @click="callPhone(list.bUserPhone)">联系商家</a>
      </span>
      <span class="dingzhi-footer-line">|</span>
      <span class="dingzhi-footer-color" @click="editDz(list.instrucId,list.isAvailable)">再来一单</span>
    </div>
    <div class="dingzhi-footer" v-show="list.orderState == 4">
      <span class="dingzhi-footer-call">
        <i class="iconfont icon-nbbPhone1"></i>
        <a @click="callPhone(list.bUserPhone)">联系商家</a>
      </span>
      <span class="dingzhi-footer-line">|</span>
      <span class="dingzhi-footer-del" @click="DeleteOrder(list.context.orderId,list.isAvailable)">删除订单</span>
      <span class="dingzhi-footer-line">|</span>
      <span class="dingzhi-footer-color" @click="editDz(list.instrucId,list.isAvailable)">再来一单</span>
    </div>
    <!--  -->
    <div :class="{'popShadow': true, 'on': showPop}"  @click="showPop = !showPop"></div>
    <div :class="{'pop-bottom': true, 'on': showPop}">
      <p class="wuliu-title">物流详情</p>
      <ul class="pop-cont">
        <li class="pop-cont-li">
          <span class="pop-cont-li-p">物流公司：</span>{{list.expressCompany}}
        </li>
        <li class="pop-cont-li">
          <span class="pop-cont-li-p">物流单号：</span>{{list.expressNo}}
        </li>
        <li class="pop-cont-li">
          <span class="pop-cont-li-p">物流凭证：</span>
          <img :src="list.expressImg" alt="订单图片" class="wuliu-img" >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as API from "config/api";
import axios from "axios";
export default {
  name: "caigouDet",
  data() {
    return {
      count: 0,
      showFaHuo: true,
      confirmTime: '',
      showPop: false,
      orderId: this.$route.query.id,
      list: "",
      modules: [],
      closeList: {
        state: "4",
        content: "关闭",
        orderUser: this.LS.getItem("userId"),
	      orderUserType:"1" // 0是商家 1是买家
      },
      fahuoList: {
        state: "3",
        content: "完成",
        orderUser: this.LS.getItem("userId"),
	      orderUserType:"1" // 0是商家 1是买家
      }
    };
  },
  computed: {
    // 模块
    INPUT_TABLE_A: function() {
      return this.modules.filter(item => {
        return item.type === "INPUT_TABLE_A";
      });
    },
    INPUT_TEXT_A: function() {
      return this.modules.filter(item => {
        return item.type === "INPUT_TEXT_A";
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
  },
  mounted() {
    this.getD();
  },
  methods: {
    // 关闭订单
    CloseOrder(id,i) {
      if(i == 1){
        this.$vux.toast.show({
          width: "90%",
          type: "text",
          text: '不好意思，定制说明书已经下架或删除',
          position: 'middle',
          time: 1500
        });
      } else{
      this.$createDialog({
        type: "confirm",
        icon: "",
        title: "关闭订单",
        content: "您确定要关闭订单么",
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          API._caozuoOrder(id, this.closeList).then(res => {
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
      }
    },
    // 删除订单
    DeleteOrder(id,i) {
      if(i == 1){
        this.$vux.toast.show({
          width: "90%",
          type: "text",
          text: '不好意思，定制说明书已经下架或删除',
          position: 'middle',
          time: 1500
        });
      } else {
        this.$createDialog({
          type: "confirm",
          icon: "",
          title: "删除订单",
          content: "您确定要删除订单么",
          confirmBtn: {
            text: "确定",
            active: true,
            disabled: false,
            href: "javascript:;"
          },
          cancelBtn: {
            text: "取消",
            active: false,
            disabled: false,
            href: "javascript:;"
          },
          onConfirm: () => {
            API._delOrder(id).then((res)=>{
              if (res.ret === "200") {
                this.$vux.toast.show({
                  text: res.msg,
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
            })
          },
          onCancel: () => {

          }
        }).show();
      }
    },
    // 确认收货
    SureShouHuo(id,i) {
      console.log(id, i, '----------------------确认收货参数--------------------')
      // if(Number(i) == 1){
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
      //     content: "确认收货前请与您的买家确认是否收到货哦~~~",
      //     confirmBtn: {
      //       text: "我已确认",
      //       active: true,
      //       disabled: false,
      //       href: "javascript:;"
      //     },
      //     cancelBtn: {
      //       text: "还未确认",
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
        content: "确认收货前请与您的买家确认是否收到货哦~~~",
        confirmBtn: {
          text: "我已确认",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "还未确认",
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
    // 提醒发货
    fahuo(id) {
      this.count++
      let now = (new Date()).getTime();
      let timeCha = now - (1000*60*60*24*3)
      if(timeCha>= this.confirmTime){
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
        alert("距离下单不满3天，不可进行此操作")
        // this.$vux.toast.show({
        //   // width: "7.6rem",
        //   type: "warn",
        //   text: "距离下单不满3天，不可进行此操作",
        //   time: 1500
        // });
      }
    },
    // detail
    getD() {
      API._caigouDetail(this.orderId).then(res => {
        if (res.ret == API.ERROK) {
          this.list = res.content;
          if (!this.list.bUserPhone) {
            this.list.bUserPhone = 18599699999
          }
          this.modules = res.content.context.modules;
          this.confirmTime = res.content.confirmTime
          // let count
          // let mD = this.modules.filter(item=>item.type==="INPUT_TABLE_B")
          // let mDLh = mD[0].dataList.length
          // this.list.orderSpCount = 0
          // for(let i=0;i<mDLh;i++){
          //   this.list.orderSpCount+=Number(mD[0].dataList[i].count)
          // }
        } else {
          this.$vux.toast.show({
            type: "warn",
            text: res.msg,
            time: 1500
          });
        }
      });
    },
    // 再来一单
    editDz(id,i) {
      if(i == 1){
        this.$vux.toast.show({
          width: "90%",
          type: "text",
          text: '不好意思，定制说明书已经下架或删除',
          position: 'middle',
          time: 1500
        });
      } else{
        this.$router.push("/cust?instrucId="+id+"&agin=200"+"&orderId=" + '&zailai=1'+this.$route.query.id)
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
    // 联系商家
    callPhone(tel) {
      window.location.href = "tel://" + tel;
      // window.location.href = "tel://4006182288";
    },
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.wuliu-img{
  width 255px
  height 135px
}

.wuliu-title{
  font-size: 16px;
color: #2E2E30;
line-height 56px
text-align center
border-bottom 1px solid #E2E2E2;
margin-bottom 20px
}

.pop-cont-li{
  font-size: 16px;
color: #2E2E30;
letter-spacing: 0;
margin-bottom 20px
width 100%
display flex
align-items flex-start

}

.popShadow{
  width 100%
  height 100%
  background #000
  opacity 0
  z-index -1
  position absolute
  top 0
  left 0
  transition: all 0.2s;
}

.popShadow.on{
  opacity .2
  z-index 9999998
  transition: all 0.2s;
}

.pop-cont{
  padding 0 12px;
}

.pop-bottom {
  width: 100%;
  box-sizing border-box
  background: #fff;
  position: fixed;
  // bottom: -100%;
  left: 0;
  z-index: 99999999;
  box-shadow: 0 -2px 10px 0 rgba(46, 46, 48, 0.2);
  transition: all 0.2s;
}

.pop-bottom.on {
  bottom: 0;
  transition: all 0.2s;
}

.style-flex{
  width 100%
  display flex
  // justify-content space-between
}

.style-li{
  width 80px !important
}

.style-img-ms{
  width 100%
  font-size: 13px;
  color: #2E2E30;
  line-height: 13px;
  margin-top 10px
  text-align center
  text-overflow ellipsis
  white-space nowrap
  overflow hidden
}

.style-img{
  width 80px
  height 80px
  display block
}

.dingzhi-li-div-p{
  width 100%
  margin 8px 0
  font-size: 13px;
  color: #2E2E30;
  line-height: 13px;
}
.dingzhi-li-div-content{
  width 100%
  font-size: 13px;
  color: #9B9B9B;
  line-height: 18px;
  height 37px
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}

.dingzhi-li-div{
  flex-frow 1
  height 80px
}

.dingzhi-li{
  display flex
  justify-content space-between
  align-items center
}

.dingzhi-li-img{
  width 80px
  height 80px
  display block
  margin-right 20px
}

.yunfei {
  font-size: 12px;
  color: #bdbdbd;
}

.foot-total-p {
  color: #FAB100;
  font-size: 16px;
}

.foot-fukuan {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 50px;
  z-index: 99999999;
  background: #fff;
  box-shadow: 0 -1px 0 0 #F5F5F5;
}

.dingzhi-footer-del {
  flex-grow: 1;
  font-size: 16px;
  color: #FF4D6A;
  line-height: 16px;
}

.dingzhi-footer-color {
  flex-grow: 1;
  font-size: 16px;
  color: #02C2A2;
  line-height: 16px;
}

.dingzhi-footer-line {
  color: #E2E2E2;
}

.dingzhi-footer-call {
  flex-grow: 1;
  font-size: 16px;
  color: #2E2E30;
  line-height: 16px;
}

.dingzhi-footer-call a {
  color: #2E2E30;
}

.icon-nbbPhone1 {
  color: #9B9B9B;
  margin-right: 10px;
}

.colse-reson-text {
  width: 100%;
  padding: 0 12px 15px 12px;
  font-size: 13px;
  color: #BDBDBD;
  line-height: 20px;
}

.colse-reson {
  width: 100%;
  font-size: 13px;
  color: #5D5D5D;
  letter-spacing: 0;
  line-height: 13px;
  padding: 20px 12px 10px 12px;
}

.jiaoyi-info-ul {
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
}

.jiaoyi-info-ul li {
  width: 100%;
  padding: 10px 0;
  font-size: 13px;
  color: #5D5D5D;
  line-height: 13px;
}

.marginB10 {
  margin-bottom: 10px;
}

.order-state-ms {
  font-size: 13px;
  color: #BDBDBD;
  line-height: 13px;
}

.order-state-text {
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 12px;
}

.state0 {
  color: #FAB100;
}

.state1 {
  color: #02C2A2;
}

.state2 {
  color: #FF4D6A;
}

.state3 {
  color: #2E2E30;
}

.order-state {
  width: 100%;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.line-bg {
  display: block;
}

.bg-fff {
  background: #fff;
}

.dingzhi-grey {
  width: 100%;
  height: 10px;
  background: #f9f9f9;
}

.dingzhi-adr-name {
  margin: 15px 0 0 0;
  font-size: 16px;
  color: #2E2E30;
}

.dingzhi-adr-dz {
  margin-bottom: 15px;
  font-size: 14px;
  color: #9B9B9B;
}

.caigou-adr {
  margin-bottom: 10px;
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
  justify-content: space-around;
  align-items: center;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99999;
  text-align: center;
  box-shadow: 0 -1px 0 0 #F5F5F5;
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
  width: 110px;
  height: 110px;
  display: inline-block;
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
}

.dingzhi-cont-items {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #D2D2D2;
}

.dingzhi-cont-items:last-child {
  // border: 0;
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
  padding-bottom: 110px;
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

