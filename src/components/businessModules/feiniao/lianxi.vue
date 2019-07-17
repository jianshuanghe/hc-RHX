<template>
    <div class="shuixiaoya">
        <div class="itemConWrap_imgWrap">
            <img ref="moreContImg" class="moreContImg" src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-14.jpg">
            <div ref="moreTxt" class="moreTxt">
                <div class="jianjieHead">
                    <i class="heng">一</i>
                    <textarea v-html="jianjie_title" :disabled="!editable" class="jianjieTitle"></textarea>
                    <i class="heng">一</i>
                </div>
                <textarea
                v-html="lianxi_ms"
                :disabled="!editable"
                class="lianxiMs"
                ></textarea>
                <div class="lianxiCont">
                    <ul>
                        <li class="lianxiContItem">
                            <div class="lianxiContItemIcon"><i class="iconfont icon-dianhua1"></i></div>
                                <textarea
                                v-html="lianxiContItemC_tel"
                                :disabled="!editable"
                                class="lianxiContItemCText"
                                ></textarea>
                        </li>
                        <li class="lianxiContItem">
                            <div class="lianxiContItemIcon"><i class="iconfont icon-tubiao201"></i></div>
                                <textarea
                                v-html="lianxiContItemC_add"
                                :disabled="!editable"
                                class="lianxiContItemCText1"
                                ></textarea>
                        </li>
                        <li class="lianxiContItem">
                            <div class="lianxiContItemIcon"><i class="iconfont icon-youxiang1"></i></div>
                                <textarea
                                v-html="lianxiContItemC_email"
                                :disabled="!editable"
                                class="lianxiContItemCText1"
                                ></textarea>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "more",
  mounted: function() {
    this.$nextTick(() => {
      let that = this;
      window.onload = function() {
        that.$refs.moreTxt.style.height = that.$refs.moreContImg.height + "px";
      };
    });
  },
  data() {
    return {
      editable: false,
      jianjie_title: "联系我们",
      lianxi_ms: "有问题随时联系我们哦，期待您的来电",
      lianxiContItemC_title: "电话",
      lianxiContItemC_tel: "400-618-2288",
      lianxiContItemC_add: "北京市昌平区回龙观七里渠慧聪园 总部基地",
      lianxiContItemC_email: "liyanyan@hc360.com"
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

textarea {
    border: 0;
    background: none !important;
}

textarea:disabled {
    background: none !important;
    -webkit-text-fill-color: #fff;
}

.heng {
    width: 20px;
    height: 1px;
    color: #fff;
    display: inline-block;
}

.jianjieHead {
    width: 100%;
    display: flex;
    line-height: 30px;
    justify-content: center;
    margin: 40px 0 20px 0;
}

.jianjieTitle {
    width: 120px;
    height: 30px;
    color: #fff;
    -webkit-text-fill-color: #fff !important;
    font-size: 20px;
    font-family: PingFang-SC-Bold;
    text-align: center;
}

// lianxi
.icon-dianhua1, .icon-youxiang1, .icon-tubiao201 {
    font-size: 25px;
}

.lianxiContItem {
    padding: 10px 0 20px 0;
}

.lianxiContItemC {
    width: 100%;
    padding-left: 18px;
    box-sizing: border-box;
    text-align: center;
}

.lianxiContItemIcon {
    width: 50px;
    line-height: 50px;
    text-align: center;
    height: 50px;
    border: 1px solid #02C2A2;
    border-radius: 50%;
    color: #02C2A2;
    margin: 0 auto 10px auto;
}

.lianxiCont {
    width: 70%;
    padding: 15px;
    box-sizing: border-box;
    margin: 40px auto 0 auto;
    background: #fff;
}

.lianxiContItemCTitle {
    width: 100%;
    height: 22px;
    font-size: 16px;
    font-family: PingFang-SC-Regular;
    color: #FFFFFF;
    -webkit-text-fill-color: #FFFFFF !important;
}

.lianxiContItemCText {
    width: 100%;
    font-size: 18px;
    height: 20px;
    font-family: PingFang-SC-Regular;
    color: #02C2A2;
    -webkit-text-fill-color: #02C2A2 !important;
    text-align: center;
}

.lianxiContItemCText1 {
    width: 100%;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    color: #5D5D5D;
    -webkit-text-fill-color: #5D5D5D !important;
    text-align: center;
}

.lianxiMs {
    width: 100%;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    color: #FFFFFF;
    -webkit-text-fill-color: #FFFFFF !important;
    text-align: center;
    opacity: 0.7 !important;
}

.itemConWrap_imgWrap {
    margin-top: 0;
}

.lianxiTitle {
    width: 100%;
    height: 40px;
    font-family: PingFang-SC-Medium;
    font-size: 26px;
    color: #FFAF00;
    -webkit-text-fill-color: #FFAF00 !important;
    background: none;
    text-align: center;
    border: 0;
    margin-bottom: 15px;
}

.moreTxt {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
}

.itemConWrap_imgWrap {
    margin-top: 0;
}

.moreBtn {
    width: 160px;
    height: 50px;
    line-height: 50px;
    margin: 50px auto 0 auto;
    font-size: 20px;
    font-family: PingFang-SC-Medium;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    display: block;
}

.moreBtn:disabled {
    background: #FFAF00 !important;
}

.moreMs {
    width: 80%;
    margin: 20px 10%;
    height: 40px;
    line-height: 40px;
    font-family: PingFang-SC-Medium;
    font-size: 20px;
    border: 1px solid #fff;
    text-align: center;
}

.moreTitle {
    width: 80%;
    padding: 0 10%;
    height: 40px;
    font-family: PingFang-SC-Medium;
    font-size: 26px;
    color: #fff;
    background: none;
    text-align: center;
    border: 0;
}

.moreTxt {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
}

.moreContImg {
    width: 100%;
}

.shuixiaoya {
    width: 100%;
    background: #fff;
}

.sxyLogo {
    width: 50% !important;
    margin: 0 25%;
}

.moreCont {
    position: relative;
    width: 100%;
}
</style>

