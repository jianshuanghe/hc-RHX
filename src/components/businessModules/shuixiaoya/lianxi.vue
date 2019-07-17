<template>
    <div class="shuixiaoya">
        <div class="itemConWrap_imgWrap">
            <img ref="moreContImg" class="moreContImg" src="http://style.iambuyer.com/img/temp-shuixiaoya-imgs/temp-shuixiaoya-imgs-11.jpg">
            <div ref="moreTxt" class="moreTxt">
                <textarea
                v-html="lianxi_title"
                :disabled="!editable"
                class="lianxiTitle"
                ></textarea>
                <textarea
                v-html="lianxi_ms"
                :disabled="!editable"
                class="lianxiMs"
                ></textarea>
                <div class="lianxiCont">
                    <ul>
                        <li class="lianxiContItem">
                            <div class="lianxiContItemIcon"><i class="iconfont icon-dianhua1"></i></div>
                            <div class="lianxiContItemC">
                                <textarea
                                v-html="lianxiContItemC_title"
                                :disabled="!editable"
                                class="lianxiContItemCTitle"
                                ></textarea>
                                <textarea
                                v-html="lianxiContItemC_text"
                                :disabled="!editable"
                                class="lianxiContItemCText"
                                ></textarea>
                            </div>
                        </li>
                        <li class="lianxiContItem">
                            <div class="lianxiContItemIcon"><i class="iconfont icon-youxiang1"></i></div>
                            <div class="lianxiContItemC">
                                <textarea
                                v-html="lianxiContItemC_title"
                                :disabled="!editable"
                                class="lianxiContItemCTitle"
                                ></textarea>
                                <textarea
                                v-html="lianxiContItemC_text"
                                :disabled="!editable"
                                class="lianxiContItemCText1"
                                ></textarea>
                            </div>
                        </li>
                        <li class="lianxiContItem">
                            <div class="lianxiContItemIcon"><i class="iconfont icon-tubiao201"></i></div>
                            <div class="lianxiContItemC">
                                <textarea
                                v-html="lianxiContItemC_title"
                                :disabled="!editable"
                                class="lianxiContItemCTitle"
                                ></textarea>
                                <textarea
                                v-html="lianxiContItemC_text"
                                :disabled="!editable"
                                class="lianxiContItemCText1"
                                ></textarea>
                            </div>
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
      lianxi_title: "联系我们",
      lianxi_ms: "有问题随时联系我们哦，期待您的来电",
      lianxiContItemC_title: "电话",
      lianxiContItemC_text: "400-618-2288"
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

// lianxi
.icon-dianhua1, .icon-youxiang1, .icon-tubiao201 {
    font-size: 25px;
}

.lianxiContItem {
    display: flex;
    padding: 10px 0;
}

.lianxiContItemC {
    width: 100%;
    padding-left: 18px;
    box-sizing: border-box;
}

.lianxiContItemIcon {
    width: 50px;
    line-height: 50px;
    text-align: center;
    height: 50px;
    border: 1px solid #fff;
    border-radius: 50%;
    color: #fff;
}

.lianxiCont {
    width: 100%;
    margin-top: 40px;
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
    color: #FFAF00;
    -webkit-text-fill-color: #FFAF00 !important;
}
.lianxiContItemCText1 {
    width: 100%;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    color: #fff;
    -webkit-text-fill-color: #fff !important;
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

