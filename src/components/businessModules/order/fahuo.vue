<template>
  <div>
    <div class="pop-bottom">
      <ul class="pop-cont">
        <li class="pop-cont-li">
          <p class="pop-cont-li-p">物流公司</p>
          <input
            class="pop-cont-li-ipt"
            type="text"
            v-model="list.expressCompany"
            placeholder="请输入"
          >
        </li>
        <li class="pop-cont-li">
          <p class="pop-cont-li-p">物流单号</p>
          <input class="pop-cont-li-ipt" type="text" v-model="list.expressNo" placeholder="请输入">
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
                <!-- <img class="defaultImg" :src="form.compLogo" alt="img"> -->
                <div style="width:100%;text-align:center;font-size:80px;color:#E2E2E2;">+</div>
                <!-- <p>Please click to upload ID card</p> -->
              </cube-upload-btn>
            </div>
          </cube-upload>
        </li>
      </ul>
      <input
        type="button"
        value="发货"
        class="add-save"
        :disabled="!list.expressCompany || !list.expressNo || !this.list.expressImg"
        @click="submit"
      >
    </div>
  </div>
</template>

<script>
import * as API from "config/api";
import lrz from "lrz";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      orderId: this.$route.query.id,
      imgIcon: true,
      action: "http://img01.iambuyer.com/imgup/upLoad/fileUpload",
      files: [],
      list: {
        state: "2",
        //订单编号
        expressNo: "",
        //公司名称
        expressCompany: "",
        //凭证照片
        expressImg: "",
        //备注
        content: "发货啦~~",
        orderUser: this.LS.getItem("userId"),
	      orderUserType:"0" // 0是商家 1是买家
      }
    };
  },
  methods: {
    processFile(file, next) {
      // 压缩图片
      lrz(file).then(resImg => {
        file = resImg.file;
        next(file);
      });
    },
    addedHandler() {
      const file = this.files[0];
      file && this.$refs.upload.removeFile(file);
      this.imgIcon = false;
    },
    errHandler(file) {
      this.$vux.toast.show({
        type: warn,
        text: "上传失败！",
        time: 1500
      });
    },
    sucHandler(file) {
      console.log(file);
      this.list.expressImg = file.response.name;
      this.imgIcon = false;
    },
    delHandler(file) {
      this.imgIcon = true;
    },
    submit() {
      API._caozuoOrder(this.orderId, this.list).then(res => {
        console.log(res)
        if (res.data.ret === "200") {
          alert(res.data.msg)
          setTimeout(()=>{
            this.$router.go(-1);
          },1500)
          // this.$vux.toast.show({
          //   text: res.data.msg,
          //   time: 1500,
          //   onHide: () => {
          //     this.$router.go(-1);
          //   }
          // });
        } else {
          alert(res.data.msg)
          setTimeout(()=>{
            this.$router.go(-1);
          },1500)
          // this.$vux.toast.show({
          //   type: "warn",
          //   text: res.data.msg,
          //   time: 1500
          // });
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.add-save {
  position: relative;
  margin-left: 6.5vw;
  width: 87vw;
  height: 14vw;
  font-size: 4.2vw;
  color: #fff;
  background: #02c2a2;
  border-radius: 1vw;
  font-weight: 90vw;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  line-height: 14vw;
}

.add-save:disabled {
  background: #98e4d8 !important;
}

.pop-shadow {
  width: 100%;
  height: 100%;
  background: rgba(46, 46, 48, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999998;
}

.pop-cont-li-ipt {
  width: 100%;
  padding: 20px 0;
  font-size: 16px;
  // color: #D2D2D2;
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
  // bottom: -100%;
  left: 0;
  z-index: 99999999;
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
  justify-content: space-between;
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
