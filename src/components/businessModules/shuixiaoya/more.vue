<template>
    <div class="shuixiaoya">
        <div class="itemConWrap_imgWrap">
            <img class="sxyLogo" src="./shuixiaoya_logo.png">
        </div>
        <div class="itemConWrap_imgWrap">
            <img ref="moreContImg" class="moreContImg" src="http://style.iambuyer.com/img/temp-shuixiaoya-imgs/temp-shuixiaoya-imgs-01.jpg">
            <div ref="moreTxt" class="moreTxt">
                <textarea
                v-html="s_title"
                :disabled="!editable"
                class="moreTitle"
                ></textarea>
                <textarea
                v-html="s_ms"
                :disabled="!editable"
                class="moreMs"
                ></textarea>
                <textarea
                v-html="s_btn"
                :disabled="!editable"
                class="moreBtn"
                ></textarea>
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
      s_title: "税小鸭",
      s_ms: "企业版一站式服务平台",
      s_btn: "了解更多",
      editable: false
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

