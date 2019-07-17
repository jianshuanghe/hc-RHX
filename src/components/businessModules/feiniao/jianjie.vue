<template>
    <div class="jianjie">
        <div class="jianjieHead">
            <i class="heng">一</i>
            <textarea v-html="jianjie_title" :disabled="!editable" class="jianjieTitle"></textarea>
            <i class="heng">一</i>
        </div>
        <div class="itemConWrap_imgWrap">
            <img ref="moreContImg" class="moreContImg" src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-01.jpg">
            <div ref="moreTxt" class="moreTxt">
                <div class="itemConWrap_imgWrap logo">
                    <img src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-15.png">
                </div>
                <textarea v-html="jianjie_p" :disabled="!editable" class="jianjieP"></textarea>
                <textarea v-html="jianjie_ms" :disabled="!editable" class="jianjieMs"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "jianjie",
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
      jianjie_title: "公司简介",
      jianjie_p: "一心一意做好产品",
      jianjie_ms: "我们立足于设计行业二十年，竭力为您提供最优质的服务 ......"
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

textarea {
    background: none !important;
    border: 0;
}

textarea:disabled {
    background: none !important;
    -webkit-text-fill-color: #fff;
}

.jianjieMs {
    width: 60%;
    padding: 15px 24px;
    line-height: 24px;
    height: auto;
    box-sizing: border-box;
    color: #fff;
    -webkit-text-fill-color: #fff !important;
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    text-align: center;
    border: 1px solid #fff;
    opacity: 0.7 !important;
    margin-bottom: 80px;
}

.jianjieP {
    width: 100%;
    padding: 80px 15px 0 15px;
    box-sizing: border-box;
    color: #fff;
    -webkit-text-fill-color: #fff !important;
    font-size: 30px;
    font-family: PingFang-SC-Medium;
    text-align: center;
}

.logo {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    margin: 0 auto;
}

.moreTxt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 40px 0;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
}

.itemConWrap_imgWrap {
    margin-top: 0;
}

.heng {
    width: 20px;
    height: 1px;
    color: #02C2A2;
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
    color: #02C2A2;
    -webkit-text-fill-color: #02C2A2 !important;
    font-size: 20px;
    font-family: PingFang-SC-Bold;
    text-align: center;
}

.jianjie {
    width: 100%;
    background: #fff;
}
</style>


