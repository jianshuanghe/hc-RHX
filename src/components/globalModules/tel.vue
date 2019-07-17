<template>
    <div class="tel">
        <input class="telNum" type="number" maxlength="11" v-model="phone" placeholder="输入电话号码">
        <div class="yzm">
            <input class="telCont" type="number" v-model="volid" placeholder="验证码">
            <button class="telMessage" v-if="yzm" @click="getYZM">获取验证码</button>
            <button class="telMessage on" v-else>{{time}} s</button>
        </div>

        <p class="tip">为了您的信息安全，保存数据前需要验证一下您的身份哦！</p>
        <div class="telBtn" @click="submit">确定</div>
    </div>
</template>

<script>
import * as API from "config/api";
import LS from "config/localstorage";
import { setInterval } from "timers";
export default {
  name: "tel",
  data() {
    return {
      phone: "",
      businessName: "1",
      portal: "ruhexiu",
      volid: "",
      time: 60,
      yzm: true,
      formData: {
        compLogo: LS.getItem("compLogo"),
        nickname: LS.getItem("nickname"),
        wxId: LS.getItem("wxId"),
        phone: ""
      }
    };
  },
  mounted: function() {
    let dHeight = $(document).height();
    let wHeight = $(window).height();
    // let aHeight = $("#app").height();
    if (document < wHeight) {
      $(".tel").height(wHeight);
      alert;
    } else {
      $(".tel").height(dHeight);
    }
  },
  methods: {
    //   获取验证码
    getYZM() {
      // let phoneNumReg = /(^[0-9]{3,4}\-[0-9]{8}$)|(^[0-9]{8}$)|(^[0-9]{3,4}[0-9]{8}$)|(^0{0,1}13[0-9]{9}$)/;
      let phoneNumReg = /^((0\d{2,3}-\d{7,8})|(1[3584796]\d{9}))$/;
      if (!phoneNumReg.test(this.phone)) {
        this.$vux.toast.show({
          width: "60%",
          text: "请输入正确电话号码",
          type: "text",
          position: "bottom"
        });
      } else {
        this.yzm = false;
        let that = this;
        let setInt = window.setInterval(function() {
          that.time--;
          if (that.time == 0) {
            that.yzm = true;
            that.time = 60;
            clearInterval(setInt);
          }
        }, 1000);
        // 发送短信
        API._phoneSms(this.phone, this.businessName, this.portal).then(res => {
          console.log(res);
          if (res.data.ret == API.ERROK) {
            this.$vux.toast.show({
              width: "60%",
              text: "发送成功",
              type: "text",
              position: "bottom"
            });
          } else {
            this.$vux.toast.show({
              width: "60%",
              text: res.data.msg,
              type: "text",
              position: "bottom"
            });
          }
        });
      }
    },
    //   submit
    submit() {
      let phoneNumReg = /^1[3-578]\d{9}$/;
      if (!phoneNumReg.test(this.phone)) {
        this.$vux.toast.show({
          width: "60%",
          text: "请输入正确电话号码",
          type: "text",
          position: "bottom"
        });
      } else if (!this.volid) {
        this.$vux.toast.show({
          width: "60%",
          text: "请输入正确验证码",
          type: "text",
          position: "bottom"
        });
      } else {
        // 校验手机短信
        console.log("xiaoyan");
        API._vCode(this.phone, this.businessName, this.volid, this.portal).then(
          res => {
            if (res.data.ret == API.ERROK) {
              this.formData.phone = this.phone;
              this.regist();
            } else {
              this.$vux.toast.show({
                width: "60%",
                text: "请输入正确验证码",
                type: "text",
                position: "bottom"
              });
            }
          }
        );
      }
    },
    // 注册
    regist() {
      API._reg(this.formData).then(res => {
        console.log(res);
        if (res.ret == API.ERROK) {
          LS.setItem("userId", res.content.userId);
          LS.setItem("token", res.content.token);
          this.$vux.toast.show({
            text: "绑定成功",
            time: 1500,
            onHide: () => {
              this.$router.go(-1);
            }
          });
        } else {
          this.$vux.toast.show({
            type: "text",
            width: "90%",
            text: res.msg,
            position: "bottom",
            time: 1500
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.yzm {
  width: 100%;
  float: left;
}

.telNum {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  margin: 20px 0 10px 0;
  box-sizing: border-box;
  border: 0;
  font-family: PingFangSC-Light;
  font-size: 14px;
  float: left;
}

.telMessage {
  width: 35%;
  height: 40px;
  padding: 0 15px;
  margin: 20px 0 10px 0;
  box-sizing: border-box;
  border: 0;
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #fff;
  background: #02C2A2;
}

.telMessage.on {
  color: #9B9B9B;
  background: #cecece;
}

.tel {
  width: 100%;
  float: left;
  background: #f9f9f9;
}

.telCont {
  width: 65%;
  height: 40px;
  padding: 0 15px;
  margin: 20px 0 10px 0;
  box-sizing: border-box;
  float: left;
}

.tip {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  font-family: PingFangSC-Light;
  font-size: 13px;
  color: #9B9B9B;
  letter-spacing: 0;
  line-height: 20px;
  float: left;
}

.telBtn {
  width: 100%;
  margin: 20px 0;
  padding: 0 15px;
  line-height: 45px;
  box-sizing: border-box;
  background: #02C2A2;
  text-align: center;
  color: #fff;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  float: left;
  box-sizing: border-box;
}
</style>


