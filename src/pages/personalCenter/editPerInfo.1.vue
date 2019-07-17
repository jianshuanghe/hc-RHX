<template>
    <div class="editPerInfo">
        <!-- head -->
        <!-- <globalHead></globalHead> -->
        <div class="perInfoCont">
            <div class="perInfoItem first">
                <label class="perInfoItemL firstChild">头像</label>
                <div>
                    <cube-upload
                        ref="upload"
                        capture="camera"
                        v-model="files"
                        :action="action"
                        :processFile="processFile"
                        @files-added="addedHandler"
                        @file-success="sucHandler"
                        @file-removed="delHandler"
                        @file-error="errHandler">
                        <div class="clear-fix touxiang">
                            <cube-upload-file class="touImg" v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                            <cube-upload-btn :multiple="false">
                            <div>
                                <img class="defaultImg" :src="form.compLogo" alt="img">
                                <!-- <i>＋</i> -->
                                <!-- <p>Please click to upload ID card</p> -->
                            </div>
                            </cube-upload-btn>
                        </div>
                    </cube-upload>
                </div>
            </div>
            <div class="perInfoItem">
                <label class="perInfoItemL">姓名</label>
                <div>
                    <input class="perInfoItemR" type="text" minlength="2" maxlength="20" v-model="form.companyName" placeholder="嘿，姓名会显示在说明书的海报二维码中哦">
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
            <div class="perInfoItem">
                <label class="perInfoItemL">个人介绍</label>
                <div>
                    <!-- <div class="perInfoItemR textarea" @click="showEdit=true">{{form.companyIntro}}</div> -->
                    <input class="perInfoItemR textarea" @click="showEdit=true" v-model="form.companyIntro" placeholder="用一段话介绍自己吧">
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
            <div class="perInfoItem">
                <label class="perInfoItemL">联系地址</label>
                <div>
                    <!-- <input class="perInfoItemR" type="text" v-model="form.addressDetail" placeholder="请选择"> -->
                    <input id="demo2" type="text" readonly="" placeholder="请输入您的联系地址" v-model="form.addressDetail" value="" />
                    <input id="value2" type="hidden" />
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
            <!-- <div class="perInfoItem">
                <label class="perInfoItemL">详细地址</label>
                <div>
                  <input class="perInfoItemR" type="text" v-model="form.addressDetail" placeholder="">
                  <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div> -->
        </div>
        <div class="perInfoCont">
            <div class="perInfoItem">
                <label class="perInfoItemL">微信公众号二维码</label>
                <div>
                    <cube-upload
                        ref="upload2"
                        capture="camera"
                        v-model="files2"
                        :action="action"
                        :processFile="processFile2"
                        @files-added="addedHandler2"
                        @file-success="sucHandler2"
                        @file-removed="delHandler2"
                        @file-error="errHandler2">
                        <div class="clear-fix erweima">
                            <cube-upload-file class="myUpload" v-for="(file, i) in files2" :file="file" :key="i"></cube-upload-file>
                            <cube-upload-btn :multiple="false">
                            <div>
                                <i class="defaultImg2 iconfont icon-Z4"></i>
                                <!-- <i>＋</i> -->
                            </div>
                            </cube-upload-btn>
                        </div>
                    </cube-upload>
                </div>
            </div>
        </div>
        <p class="tip">上传自己的微信二维码，让更多人了解您</p>
        <div class="perInfoCont" style="margin-top:22px">
            <div class="perInfoItem">
                <label class="perInfoItemL">联系电话</label>
                <div>
                    <input class="perInfoItemR" type="number" v-model="form.contactTelphone" placeholder="留一个方便让客户联系您的电话吧">
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
            <div class="perInfoItem">
                <label class="perInfoItemL">联系邮箱</label>
                <div>
                    <!-- <cube-input class="perInfoItemR" v-model="form.contactEmail"></cube-input> -->
                    <input class="perInfoItemR" type="text" v-model="form.contactEmail" placeholder="这儿可以输入您的工作邮箱哦">
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
        </div>
        <div class="save" @click="save">保存</div>
        <!-- introduce -->
        <div class="popShadow" :class="showEdit?'on': ''" @click="showEdit=false"></div>
        <Introduce class="introduce" :class="showEdit?'on': ''" :showEdit="showEdit" :text="this.form.companyIntro" @showText="showText"></Introduce>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

#demo2 {
  width: 220px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  text-align: right;
  padding-right: 15px;
  color: #3C3C3F;
}

.popShadow {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.2;
  position: fixed;
  bottom: 0px;
  z-index: 9998;
  display: none;
  transition: display 0.2s;
}

.popShadow.on {
  display: block;
}

.editPerInfo {
  overflow: hidden;
}

.introduce {
  position: fixed;
  bottom: -100%;
  z-index: 9999;
  transition: bottom 0.5s;
}

.introduce.on {
  bottom: 0px;
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

.tip {
  padding: 0 23px;
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #9B9B9B;
  line-height: 12px;
}

.icon-icon-arrow-right4 {
  color: #BDBDBD;
  font-size: 9px;
  // margin-left: 10px;
  float: right;
  margin-top: 5px;
}

.perInfoItemR {
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #3C3C3F;
  letter-spacing: 0;
  height: 18px;
  line-height: 14px;
  text-align: right;
  margin-right: 10px;
  float: left;
}

.perInfoItemL {
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #2E2E30;
  line-height: 16px;
}

.firstChild {
  line-height: 40px;
}

.perInfoItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 22px 0;
  border-bottom: 1px solid #F5F5F5;
}

.perInfoItem.first {
  padding: 11px 0 10px 0;
}

.perInfoCont:first-child {
  margin-top: 0;
}

.perInfoCont {
  padding: 0 24px;
  margin-bottom: 10px;
  margin-top: 44px;
  background: #fff;
}

// upload Img
.defaultImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.defaultImg2 {
  font-size: 14px;
}

.myUpload .cube-upload-file-def {
  width: 14px !important;
  height: 14px !important;
  background-size: 100% 100%;
  border-radius: 0% !important;
}

.cube-upload {
  // width: 40px;
  // height: 40px;
  float: right;
  position: relative;

  .cube-upload-file, .cube-upload-btn {
    margin: 0;
    // height: 200px;
  }

  .cube-upload-file {
    margin: 0;

    + .cube-upload-btn {
      // width: 40px;
      // height: 40px;
      // margin-top: -200px;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }
  }

  .cube-upload-file-def {
    width: 100%;
    height: 100%;

    .cubeic-wrong {
      display: none;
    }
  }

  .cube-upload-btn {
    // width: 40px;
    // height: 40px;
    position: relative;
    overflow: hidden;

    // display: flex;
    // align-items: center;
    // justify-content: center;
    > div {
      text-align: center;
      width: 40px;
      height: 40px;
    }

    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      // margin-bottom: 20px;
      font-size: 14px;
      line-height: 1;
      font-style: normal;
      color: #fff;
      background-color: #333;
      // border-radius: 50%;
    }
  }
}
</style>

<script>
import globalHead from "@/components/globalModules/globalHead";
import Introduce from "@/components/globalModules/introduce";
import * as API from "config/api";
import { mapMutations, mapGetters } from "vuex";
import { setTimeout } from "timers";
// import "../../../static/js/LArea.min.js";
import lrz from "lrz";
export default {
  name: "editPerInfo",
  components: { globalHead, Introduce },
  data() {
    return {
      showEdit: false,
      action: "http://img01.iambuyer.com/imgup/upLoad/fileUpload",
      files: [],
      files2: [],
      form: {
        compLogo: this.LS.getItem("uinfo").compLogo,
        wechatQrImg: this.LS.getItem("uinfo").wechatQrImg,
        companyName: this.LS.getItem("uinfo").companyName,
        companyIntro: this.LS.getItem("uinfo").companyIntro,
        addressDetail: this.LS.getItem("uinfo").addressDetail,
        contactTelphone: this.LS.getItem("uinfo").contactTelphone,
        contactEmail: this.LS.getItem("uinfo").contactEmail
      },
      subForm: {} //存放表单提交时修改过的数据
    };
  },
  watch: {
    //   监测form表单改动的数据，并放入subForm
    "form.compLogo": {
      handler(curVal, oldVal) {
        this.subForm.compLogo = curVal;
      }
    },
    "form.wechatQrImg": {
      handler(curVal, oldVal) {
        this.subForm.wechatQrImg = curVal;
      }
    },
    "form.companyName": {
      handler(curVal, oldVal) {
        this.subForm.companyName = curVal;
      }
    },
    "form.companyIntro": {
      handler(curVal, oldVal) {
        this.subForm.companyIntro = curVal;
      }
    },
    "form.addressDetail": {
      handler(curVal, oldVal) {
        this.subForm.addressDetail = curVal;
      }
    },
    "form.contactTelphone": {
      handler(curVal, oldVal) {
        this.subForm.contactTelphone = curVal;
      }
    },
    "form.contactEmail": {
      handler(curVal, oldVal) {
        this.subForm.contactEmail = curVal;
      }
    }
  },
  computed: {
    ...mapGetters(["GET_UINFO"])
  },
  created: function() {
    this.$nextTick(() => {
      //   addressPick
      this.addressChoose();
      // 微信分享
      this.wxApiG();
    });
  },
  methods: {
    // address
    addressChoose() {
      var area = new LArea();
      area.init({
        trigger: "#demo2",
        valueTo: "#value2",
        keys: {
          id: "value",
          name: "text"
        },
        type: 2,
        data: [provs_data, citys_data, dists_data]
      });
    },
    // processFile
    processFile(file, next) {
      console.log(file);
      // 压缩图片
      lrz(file).then(resImg => {
        file = resImg.file;
        console.log(file);
        next(file);
      });
    },
    //   上传头像
    addedHandler() {
      const file = this.files[0];
      file && this.$refs.upload.removeFile(file);
    },
    errHandler(file) {
      // const msg = file.response.message
      this.$vux.toast.show({
        type: warn,
        text: "上传失败！",
        time: 1500
      });
    },
    sucHandler(file) {
      console.log(file);
      this.form.compLogo = file.response.name;
    },
    delHandler(file) {
      this.form.compLogo =
        this.GET_UINFO == ""
          ? this.GET_UINFO.compLogo
          : this.LS.getItem("uinfo").compLogo;
    },
    // processFile
    processFile2(file, next) {
      console.log(file);
      // 压缩图片
      lrz(file).then(resImg => {
        file = resImg.file;
        console.log(file);
        next(file);
      });
    },
    //   上传二维码
    addedHandler2() {
      const file = this.files2[0];
      file && this.$refs.upload2.removeFile(file);
    },
    errHandler2(file) {
      // const msg = file.response.message
      this.$vux.toast.show({
        type: warn,
        text: "上传失败！",
        time: 1500
      });
    },
    delHandler2(file) {
      this.form.wechatQrImg =
        this.GET_UINFO == ""
          ? this.GET_UINFO.wechatQrImg
          : this.LS.getItem("uinfo").wechatQrImg;
    },
    sucHandler2(file) {
      this.form.wechatQrImg = file.response.name;
    },
    // save
    save() {
      if (!this.LS.getItem("userId")) {
        this.$router.push("/tel");
      } else {
        let phoneNumReg = /^1[3-578]\d{9}$/;
        let emailNumReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (!phoneNumReg.test(this.form.contactTelphone)) {
          this.$vux.toast.show({
            width: "60%",
            text: "请输入正确电话号码",
            type: "text",
            position: "bottom"
          });
        } else if (!emailNumReg.test(this.form.contactEmail)) {
          this.$vux.toast.show({
            width: "60%",
            text: "请输入正确邮箱",
            type: "text",
            position: "bottom"
          });
        } else {
          // 判断有没有修改数据，有则操作
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
                  type: "warn",
                  text: res.msg,
                  time: 1500
                });
                //   alert(res.msg);
              }
            }
          );
        }
      }
    },
    // textarea
    showText(text) {
      this.showEdit = false;
      this.form.companyIntro = text;
    }
  }
};
</script>