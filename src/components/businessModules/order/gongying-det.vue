<template>
  <div class="dingzhi-content">
    <!-- tip -->
    <div class="top-tips">提醒：进行操作前请确认您已收到买家的货款或者您与买家已达成协议，平台对买家是否支付货款不做监督。</div>
    <!-- state -->
    <div class="order-state">
      <div class="order-state-flex">
        <span class="dingzhi-cus-if">交易信息</span>
        <span class="order-state-text state0" v-show="list.orderState == 0">待确认</span>
        <span class="order-state-text state1" v-show="list.orderState == 1">待发货</span>
        <span class="order-state-text state1" v-show="list.orderState == 2">待收货</span>
        <span class="order-state-text state2" v-show="list.orderState == 3">已完成</span>
        <span class="order-state-text state3" v-show="list.orderState == 4">已关闭</span>
      </div>
      <ul class="jiaoyi-info-ul">
        <li>订单编号：{{list.orderOrder}}</li>
        <li v-show="list.orderState == 0 || list.orderState == 1 || list.orderState == 2 || list.orderState == 3">下单人员：{{list.myUserPhone}}</li>
        <li>下单时间：{{list.createTime | formatDate}}</li>
        <li v-show="list.orderState == 4">关闭时间：{{list.closeTime | formatDate}}</li>
        <li v-show="list.orderState == 1 || list.orderState == 2 || list.orderState == 3">确认时间：{{list.confirmTime | formatDate}}</li>
        <li v-show="list.orderState == 2 || list.orderState == 3">发货时间：{{list.sendTime | formatDate}}</li>
        <li v-show="list.orderState == 3">完成时间：{{list.finishTime | formatDate}}</li>
      </ul>
      <!-- <ul>
        <li>
          <p class="order-state-text state0">待确认</p>
          <p class="order-state-ms">等待商家确认...</p>
        </li>
        <li v-show="false">
          <p class="order-state-text state1">待发货</p>
          <p class="order-state-ms">商家已确认，正在为您准备货物～</p>
        </li>
        <li v-show="false">
          <p class="order-state-text state1">待收货</p>
          <p class="order-state-ms">
            商家已发货，点击
            <span class="state1">查看物流详情 ></span>
          </p>
        </li>
        <li v-show="false">
          <p class="order-state-text state2">已完成</p>
          <p class="order-state-ms">您已确认收货，订单已完成～</p>
        </li>
        <li v-show="false">
          <p class="order-state-text state3">已关闭</p>
          <p class="order-state-ms">订单已关闭～</p>
        </li>
      </ul>-->
    </div>
    <!-- state end -->
    <div></div>
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
      <div class="dingzhi-cont-items" v-for="(item,index) in modules" :key="index" v-if="modules[index].type === 'INPUT_TABLE_B' && index === 5">
        <p class="dingzhi-cont-items-head">{{item.title}}</p>
        <ul class="dingzhi-cont-items-ul">
          <li v-for="(i,index) in item.dataList" :key="index">{{i.key}} <span class="dingzhi-marginL">x{{i.count}}</span></li>
        </ul>
      </div>
      <div v-for="(item,index) in INPUT_IMG_A" :key="index">
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
    </div>
    <!-- 收货地址 -->
    <div class="caigou-adr">
      <p class="dingzhi-cus-name bg-fff">收货地址</p>
      <div class="dingzhi-have-adr">
        <p class="dingzhi-adr-name">
          {{list.receivUser}}
          <span style="margin-left:10px">{{list.receivPhone}}</span>
        </p>
        <p
          class="dingzhi-adr-dz"
        >{{list.receivPcodeStr + list.receivCcodeStr + list.receivAcodeStr + list.receivName}}</p>
      </div>
      <img class="line-bg" src="./ade-bg.png" width="100%">
    </div>
    <!-- 商家修可改得 -->
    <div></div>
    <!-- 备注说明 -->
    <div class="bg-fff marginB10" v-for="(item,index) in INPUT_TEXT_A" :key="index">
      <p class="dingzhi-cus-name">{{item.title}}</p>
      <p class="colse-reson lineH">{{item.content?item.content:'未填写'}}</p>
    </div>
    <!-- 关闭原因 -->
    <div class="bg-fff marginB230" v-show="list.orderState == 4">
      <p class="dingzhi-cus-name">关闭原因</p>
      <p class="colse-reson">{{list.closeContent?list.closeContent:"未填写关闭原因"}}</p>
      <div class="colse-reson-text">关闭账号：{{list.closeOrderUser}}</div>
    </div>
    <!-- footer -->
    <div class="bg-fff posiFiexd">
      <ul class="dingzhi-total-ul">
        <li class="dingzhi-total-li">
          <span>总价</span>
          <span>¥{{list.orderSpMoney}}.00</span>
        </li>
        <li class="dingzhi-total-li">
          <span>运费</span>
          <span>{{list.orderYfMoney || '- -'}}</span>
        </li>
      </ul>
      <div class="dingzhi-total-zj">
        <span>总计</span>
        <span>￥{{list.orderSpMoney + list.orderYfMoney}}.00</span>
      </div>
      <div v-show="list.orderState == 0 || list.orderState == 1 || list.orderState == 2">
        <div class="dingzhi-footer" v-show="list.orderState == 0">
          <span class="dingzhi-footer-call">
            <i class="iconfont icon-nbbPhone1"></i>
            <a @click="callPhone(list.myUserPhone)">联系买家</a>
          </span>
          <span class="dingzhi-footer-line">|</span>
          <span class="dingzhi-footer-del" @click="CloseOrder(list.context.orderId)">关闭交易</span>
          <span class="dingzhi-footer-line">|</span>
          <span class="dingzhi-footer-color" @click="editDz">确认定制信息</span>
        </div>
        <div class="dingzhi-footer" v-show="list.orderState == 1">
          <span class="dingzhi-footer-call">
            <i class="iconfont icon-nbbPhone1"></i>
            <a @click="callPhone(list.myUserPhone)">联系买家</a>
          </span>
          <span class="dingzhi-footer-line">|</span>
          <span class="dingzhi-footer-del" @click="CloseOrder(list.context.orderId)">关闭交易</span>
          <span class="dingzhi-footer-line">|</span>
          <span class="dingzhi-footer-color" @click="fahuo(list.context.orderId)">去发货</span>
        </div>
        <div class="dingzhi-footer" v-show="list.orderState == 2">
          <span class="dingzhi-footer-call">
            <i class="iconfont icon-nbbPhone1"></i>
            <a @click="callPhonePT(list.contactTelphone)">联系平台</a>
          </span>
          <span class="dingzhi-footer-call">
            <i class="iconfont icon-nbbPhone1"></i>
            <a @click="callPhone(list.myUserPhone)">联系买家</a>
          </span>
          <span class="dingzhi-footer-line">|</span>
          <span class="dingzhi-footer-color" @click="SureShouHuo(list.context.orderId,list.sendTime)">确认收货</span>
        </div>
        <div class="dingzhi-footer" v-show="list.orderState == 3">
          <span class="dingzhi-footer-call">
            <i class="iconfont icon-nbbPhone1"></i>
            <a @click="callPhone(list.myUserPhone)">联系买家</a>
          </span>
          <span class="dingzhi-footer-line">|</span>
          <span class="dingzhi-footer-color">再来一单</span>
        </div>
        <div class="dingzhi-footer" v-show="list.orderState == 4">
          <span class="dingzhi-footer-call">
            <i class="iconfont icon-nbbPhone1"></i>
            <a @click="callPhone(list.myUserPhone)">联系买家</a>
          </span>
          <span class="dingzhi-footer-line">|</span>
          <span class="dingzhi-footer-del" @click="DeleteOrder">删除订单</span>
          <span class="dingzhi-footer-line">|</span>
          <span class="dingzhi-footer-color">再来一单</span>
        </div>
      </div>
    </div>
    <!-- pop -->
    <div class="pop-shadow" v-show="popShow" @click.self="poHide">
      <div class="pop-shadow-cont">
        <h2>关闭原因</h2>
        <textarea class="pop-shadow-cont-text" maxlength="100" placeholder="关闭原因,最多100字" v-model="closeList.content"></textarea>
        <ul class="pop-shadow-b">
          <li @click="popCancel">取消</li>
          <li @click="popConfirm()">确定</li>
        </ul>
      </div>
    </div>
    <!-- <div class="pop-shadow" v-show="popShow" @click="poHide"></div>
    <div :class="{'pop-bottom': true, 'on': popShow}" v-show="popShow">
      <div class="pop-head">
        <span class="quxiao" @click="poHide">取消</span>
        <span class="pop-head-t">物流信息</span>
        <span class="save">发货</span>
      </div>
      <ul class="pop-cont">
        <li class="pop-cont-li">
          <p class="pop-cont-li-p">物流公司</p>
          <input class="pop-cont-li-ipt" type="text" placeholder="请输入">
        </li>
        <li class="pop-cont-li">
          <p class="pop-cont-li-p">物流单号</p>
          <input class="pop-cont-li-ipt" type="text" placeholder="请输入">
        </li>
        <li class="pop-cont-li">
          <p class="pop-cont-li-p">物流凭证</p>
          <cube-upload
            ref="upload"
            capture="camera"
            v-model="files"
            :action="action"
            :processFile="processFile"
            @files-added="addedHandler"
            @file-success="sucHandler"
            @file-removed="delHandler"
            @file-error="errHandler"
          >
            <div class="clear-fix pop">
              <cube-upload-file class="pop-img" v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
              <cube-upload-btn :multiple="false" v-show="imgIcon">
                <div style="width:100%;text-align:center;font-size:80px;color:#E2E2E2;">+</div>
              </cube-upload-btn>
            </div>
          </cube-upload>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
  import { autoTextarea } from "common/js/dom";
  import * as API from "config/api";
  import lrz from "lrz";
  export default {
    data() {
      return {
        Id: '',
        popShow: false,
        imgIcon: true,
        action: "http://img01.iambuyer.com/imgup/upLoad/fileUpload",
        files: [],
        orderId: this.$route.query.id,
        list: "",
        modules: [],
        closeList: {
          state: "4",
          content: "关闭",
          orderUser: this.LS.getItem("userId"),
          orderUserType:"0" // 0是商家 1是买家
        },
        fahuoList: {
          state: "3",
          content: "完成",
          orderUser: this.LS.getItem("userId"),
          orderUserType:"0" // 0是商家 1是买家
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
      // 切换编辑状态
      setTimeout(() => {
        let test = document.querySelectorAll("textarea");
        for (let i = 0; i < test.length; i++) {
          autoTextarea(test[i]);
        }
      }, 1000);
    },
    methods: {
      popCancel(){
        this.popShow = false;
      },
      popConfirm(){
        this.popShow = false;
        API._caozuoOrder(this.Id, this.closeList).then(res => {
          if (res.data.ret === "200") {
            this.popShow = false;
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
      poHide(){
        this.popShow = !this.popShow
      },
      // 发货
      fahuo(id) {
        this.$router.push("/fahuo?id=" + id);
      },
      // processFile
      // processFile(file, next) {
      //   console.log(file);
      //   // 压缩图片
      //   lrz(file).then(resImg => {
      //     file = resImg.file;
      //     console.log(file);
      //     next(file);
      //   });
      // },
      //   上传头像
      // addedHandler() {
      //   const file = this.files[0];
      //   file && this.$refs.upload.removeFile(file);
      //   this.imgIcon = false;
      // },
      // errHandler(file) {
      //   this.$vux.toast.show({
      //     type: warn,
      //     text: "上传失败！",
      //     time: 1500
      //   });
      // },
      // sucHandler(file) {
      //   console.log(file);
      //   this.imgIcon = false;
      // },
      // delHandler(file) {
      //   this.imgIcon = true;
      // },
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
      },
      // 去修改定制信息
      editDz() {
        this.$router.push("/queren?id=" + this.$route.query.id);
      },
      // 联系买家
      callPhone(tel) {
        window.location.href = "tel://" + tel;
      },
      callPhonePT(tel) {
        window.location.href = "tel://4006182288";
      },
      // 关闭订单
      CloseOrder(id) {
        this.popShow = true
        this.Id = id;
        // this.$createDialog({
        //   type: 'prompt',
        //   title: '我是标题',
        //   prompt: {
        //     value: '',
        //     placeholder: '请输入'
        //   },
        //   onConfirm: (e, promptValue) => {
        //     this.$createToast({
        //       type: 'warn',
        //       time: 1000,
        //       txt: `Prompt value: ${promptValue || ''}`
        //     }).show()
        //   }
        // }).show()
        // this.$createDialog({
        //   type: "confirm",
        //   icon: "",
        //   title: "关闭订单",
        //   content: "您确定要关闭订单么",
        //   confirmBtn: {
        //     text: "确定",
        //     active: true,
        //     disabled: false,
        //     href: "javascript:;"
        //   },
        //   cancelBtn: {
        //     text: "取消",
        //     active: false,
        //     disabled: false,
        //     href: "javascript:;"
        //   },
        //   onConfirm: () => {
        //     API._caozuoOrder(id, this.closeList).then(res => {
        //       if (res.data.ret === "200") {
        //         this.$vux.toast.show({
        //           text: res.data.msg,
        //           time: 1500,
        //           onHide: () => {
        //             this.$router.go(-1);
        //           }
        //         });
        //       } else {
        //         this.$vux.toast.show({
        //           type: "warn",
        //           text: res.data.msg,
        //           time: 1500
        //         });
        //       }
        //     });
        //   },
        //   onCancel: () => {}
        // }).show();
      },
      // 删除订单
      DeleteOrder() {
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
            this.$createToast({
              type: "warn",
              time: 1000,
              txt: "点击确认按钮"
            }).show();
          },
          onCancel: () => {
            this.$createToast({
              type: "warn",
              time: 1000,
              txt: "点击取消按钮"
            }).show();
          }
        }).show();
      },
      // 确认收货
      SureShouHuo(id,t) {
        console.log(t)
        let now = (new Date()).getTime();
        let timeCha = now - t;
        console.log(timeCha)
        if(timeCha>=1000*60*60*24*30){
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
        } else {
          this.$vux.toast.show({
            width: "90%",
            type: "text",
            text: "未超过30天的收货期限，不可进行此操作",
            time: 1500
          });
        }
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index.styl';

  .pop-shadow {
    width: 100%;
    height: 100%;
    background: rgba(46, 46, 48, 0.1);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999998;
    // display: flex;
    // justify-content center
    // align-items center
    .pop-shadow-cont{
      width 300px;
      height 200px
      background #fff
      position fixed
      top 50%
      left 50%
      margin-top -100px
      margin-left -150px
      border-radius 5px
      h2 {
        width 100%
        line-height 40px
        text-align center
        font-size 16px
        border-bottom 1px solid #e2e2e2
      }
      .pop-shadow-cont-text{
        width 296px
        height 115px !important
        padding 12px
        box-sizing border-box
        font-size 13px
        color #9b9b9b
      }
      input:focus, textarea:focus {
        outline: none;
      }
      .pop-shadow-b{
        width 100%
        line-height 40px
        display flex
        justify-content space-around
        border-top 1px solid #e2e2e2
        font-size 16px
      }
      .pop-shadow-b li{
        width 50%
        text-align center
      }
      .pop-shadow-b li:first-child{
        border-right 1px solid #e2e2e2
      }
    }
  }

  .pop-cont-li-ipt {
    width: 100%;
    padding: 20px 0;
    font-size: 16px;
    color: #D2D2D2;
  }

  .pop-cont-li-p {
    width: 100%;
    font-size: 16px;
    line-height: 16px;
    color: #2E2E30;
  }

  .pop-cont-li {
    width: 100%;
    padding: 20px 0 0 0;
    border-bottom: 1px solid #D2D2D2;
  }

  .pop-cont-li:last-child {
    border: 0;
  }

  .pop-cont {
    width: 100%;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
  }

  .save {
    color: #02C2A2;
  }

  .pop-head-t {
    color: #2E2E30;
  }

  .quxiao {
    color: #9B9B9B;
  }

  .pop-head {
    width: 100%;
    height: 55px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid #E2E2E2;
  }

  .pop-bottom {
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: -100%;
    left: 0;
    z-index: 99999999;
    box-shadow: 0 -2px 10px 0 rgba(46, 46, 48, 0.2);
    transition: all 0.2s;
  }

  .pop-bottom.on {
    bottom: 0;
    transition: all 0.2s;
  }

  // .marginB230 {
  // margin-bottom: 280px;
  // }
  .posiFiexd {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999;
  }

  .lineH {
    line-height: 22px !important;
  }

  .order-state-flex .order-state-text {
    margin-bottom: 0;
  }

  .order-state-flex {
    display: flex;
    height: 40px;
    padding: 0 12px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f9f9f9;
  }

  .dingzhi-cus-if {
    font-size: 16px;
    color: #2E2E30;
    line-height: 16px;
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

  .style-flex {
    width: 100%;
    display: flex;
    // justify-content: space-between;
  }

  .style-li {
    width: 80px !important;
  }

  .style-img-ms {
    width: 100%;
    font-size: 13px;
    color: #2E2E30;
    line-height: 13px;
    margin-top: 10px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .style-img {
    width: 80px;
    height: 80px;
    display: block;
  }

  .dingzhi-li-div-p {
    width: 100%;
    margin: 8px 0;
    font-size: 13px;
    color: #2E2E30;
    line-height: 13px;
  }

  .dingzhi-li-div-content {
    width: 100%;
    font-size: 13px;
    color: #9B9B9B;
    line-height: 18px;
    height: 37px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .dingzhi-li-div {
    flex-frow: 1;
    height: 80px;
  }

  .dingzhi-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dingzhi-li-img {
    width: 80px;
    height: 80px;
    display: block;
    margin-right: 20px;
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
    box-sizing: border-box;
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
    color: #2E2E30;
  }

  .dingzhi-total-li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #9B9B9B;
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
    padding-bottom: 200px;
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
