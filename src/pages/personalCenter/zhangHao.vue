<template>
    <div class="myPersonal">
        <!-- head -->
        <!-- <globalHead></globalHead> -->
        <div class="zhangHu">
            <div class="perInfoItem">
                <label class="perInfoItemL">联系电话</label>
                <div>
                    <input class="perInfoItemR" type="text" v-model="form.userPhone">
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
            <div class="perInfoItem">
                <label class="perInfoItemL">联系邮箱</label>
                <div>
                    <input class="perInfoItemR" type="text" v-model="form.userEmail">
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
        </div>
        <div class="perInfoItem2">
            <label class="perInfoItemL">微信昵称</label>
            <div>
                <!-- <input class="perInfoItemR" type="text" placeholder="请填写"> -->
                <span class="perInfoItemR">{{form.nickname}}</span>
                <i class="iconfont icon-icon-arrow-right4"></i>
            </div>
        </div>
        <div class="save" @click="save">保存</div>
    </div>
</template>
<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.myPersonal {
  width: 100%;
  float: left;
  background: #f9f9f9;
}

.save {
  height: 45px;
  line-height: 45px;
  text-align: center;
  background: #02C2A2;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #FFFFFF;
  margin: 10px 24px 20px 24px;
}

.icon-icon-arrow-right4 {
  color: #BDBDBD;
  font-size: 9px;
}

.perInfoItemR {
  width: 200px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #3C3C3F;
  letter-spacing: 0;
  line-height: 14px;
  text-align: right;
  margin-right: 10px;
}

.perInfoItemL {
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #2E2E30;
  line-height: 16px;
}

.perInfoItem:last-child {
  border: 0;
  margin: 0 10px 0 0;
}

.perInfoItem2 {
  display: flex;
  justify-content: space-between;
  padding: 22px;
  margin-top: 10px;
  background: #fff;
}

.perInfoItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 22px 0;
  border-bottom: 1px solid #F5F5F5;
}

.zhangHu {
  box-sizing: border-box;
  padding: 0 22px;
  margin-top: 44px;
  background: #fff;
}

.personalZh {
  background: $color-9f;
}
</style>

<script>
import globalHead from "@/components/globalModules/globalHead";
import * as API from "config/api";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "zhangHao",
  components: { globalHead },
  computed: {
    ...mapGetters(["GET_UINFO"])
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
    });
  },
  data() {
    return {
      form: {
        userPhone: this.LS.getItem("uinfo").userPhone,
        userEmail: this.LS.getItem("uinfo").userEmail,
        nickname: this.LS.getItem("uinfo").nickname
      },
      subForm: {}
    };
  },
  watch: {
    //   监测form表单改动的数据，并放入subForm
    "form.userPhone": {
      handler(curVal, oldVal) {
        this.subForm.userPhone = curVal;
      }
    },
    "form.userEmail": {
      handler(curVal, oldVal) {
        this.subForm.userEmail = curVal;
      }
    }
  },
  methods: {
    // save
    save() {
      if (!this.LS.getItem("userId")) {
        this.$router.push("/tel");
      } else {
        let phoneNumReg = /^1[3-578]\d{9}$/;
        let emailNumReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (!phoneNumReg.test(this.form.userPhone)) {
          this.$vux.toast.show({
            width: "60%",
            text: "请输入正确电话号码",
            type: "text",
            position: "bottom"
          });
        } else if (!emailNumReg.test(this.form.userEmail)) {
          this.$vux.toast.show({
            width: "60%",
            text: "请输入正确邮箱",
            type: "text",
            position: "bottom"
          });
        } else {
          API._UpdateUserInfo(this.LS.getItem("userId"), this.subForm).then(
            res => {
              if (res.ret == API.ERROK) {
                this.$vux.toast.show({
                  text: "您的个人资料已保存咯",
                  time: 1500,
                  onHide: () => {
                    this.$router.go(-1);
                  }
                });
              } else {
                this.$vux.toast.show({
                  width: "60%",
                  text: res.msg,
                  type: "text",
                  position: "bottom"
                });
                //   alert(res.msg);
              }
            }
          );
        }
      }
    }
  }
};
</script>


