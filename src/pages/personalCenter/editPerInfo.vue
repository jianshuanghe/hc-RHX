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
                                <img class="defaultImg" :src="form.headImg" alt="img">
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
                    <input class="perInfoItemR" type="text" minlength="2" maxlength="20" v-model="form.nickname" placeholder="嘿，姓名会显示在说明书的海报二维码中哦">
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
            <div class="perInfoItem">
                <label class="perInfoItemL">个人介绍</label>
                <div>
                    <!-- <div class="perInfoItemR textarea" @click="showEdit=true">{{form.content}}</div> -->
                    <input class="perInfoItemR textarea" @click="showEdit=true" v-model="form.content" placeholder="用一段话介绍自己吧">
                    <i class="iconfont icon-icon-arrow-right4"></i>
                </div>
            </div>
        </div>
        <div class="save" @click="save">保存</div>
        <!-- introduce -->
        <div class="popShadow" :class="showEdit?'on': ''" @click="showEdit=false"></div>
        <Introduce class="introduce" :class="showEdit?'on': ''" :showEdit="showEdit" :text="this.form.content" @showText="showText"></Introduce>
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
        headImg: this.LS.getItem("uinfo").headImg || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png',
        wechatQrImg: this.LS.getItem("uinfo").wechatQrImg,
        nickname: this.LS.getItem("uinfo").nickname,
        content: this.LS.getItem("uinfo").content,
        addressDetail: this.LS.getItem("uinfo").addressDetail,
        contactTelphone: this.LS.getItem("uinfo").contactTelphone,
        contactEmail: this.LS.getItem("uinfo").contactEmail
      },
      subForm: {} //存放表单提交时修改过的数据
    };
  },
  watch: {
    //   监测form表单改动的数据，并放入subForm
    "form.headImg": {
      handler(curVal, oldVal) {
        this.subForm.headImg = curVal;
      }
    },
    "form.wechatQrImg": {
      handler(curVal, oldVal) {
        this.subForm.wechatQrImg = curVal;
      }
    },
    "form.nickname": {
      handler(curVal, oldVal) {
        this.subForm.nickname = curVal;
      }
    },
    "form.content": {
      handler(curVal, oldVal) {
        this.subForm.content = curVal;
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
      this.form.headImg = file.response.name;
    },
    delHandler(file) {
      this.form.headImg =
        this.GET_UINFO == ""
          ? this.GET_UINFO.headImg
          : this.LS.getItem("uinfo").headImg;
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
    },
    // textarea
    showText(text) {
      this.showEdit = false;
      this.form.content = text;
    }
  }
};
</script>