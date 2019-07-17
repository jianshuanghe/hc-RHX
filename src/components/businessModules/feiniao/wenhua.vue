<template>
    <div class="jianjie">
        <div class="jianjieHead">
            <i class="heng">一</i>
            <textarea v-html="wenhua_title" :disabled="!editable" class="jianjieTitle"></textarea>
            <i class="heng">一</i>
        </div>
        <div class="wenhua">
            <div class="itemConWrap_imgWrap">
                <img src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-05.jpg">
            </div>
            <textarea v-html="wenhua_head" :disabled="!editable" class="jianjieTop"></textarea>
            <textarea v-html="jianjieText" :disabled="!editable" class="jianjieText"></textarea>
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
      wenhua_title: "企业文化",
      wenhua_head: "飞鸟文化",
      jianjieText:
        "我们没有森严的等级，每一位员工都是平等的，每一位同事都是自己的伙伴。我们相信用户就是驱动力，我们坚持“为发烧而生”的产品理念。"
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

.jianjieText {
    width: 100%;
    font-size: 14px;
    line-height: 22px;
    font-family: PingFang-SC-Regular;
    color: #5D5D5D !important;
    -webkit-text-fill-color: #5D5D5D !important;
    padding: 0 15px;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 40px;
}

.jianjieTop {
    width: 100%;
    height: 22px;
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    color: #393939 !important;
    -webkit-text-fill-color: #393939 !important;
    padding: 0 15px;
    box-sizing: border-box;
    text-align: center;
    margin: 20px 0;
}

.wenhua {
    width: 100%;
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


