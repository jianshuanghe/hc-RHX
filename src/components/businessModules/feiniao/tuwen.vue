<template>
    <div class="jianjie">
        <div class="itemConWrap_imgWrap">
            <img ref="moreContImg" class="moreContImg" src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-02.jpg">
        </div>
        <textarea v-html="tuwen_ms" :disabled="!editable" class="tuwenMS"></textarea>
        <!-- <div class="jianjieHead">
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
        </div> -->
    </div>
</template>

<script>
export default {
  name: "jianjie",
  data() {
    return {
      editable: false,
      tuwen_ms:
        "飞鸟公司自创办以来，保持了令世界惊讶的增长速度，小米公司在2017年全年售出手机800万台，和业界合作伙伴一起推动智能生态链建设。"
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

.tuwenMS {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    line-height: 22px;
    margin-top: 20px;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    color: #5D5D5D;
    -webkit-text-fill-color: #5D5D5D !important;
}

.jianjie {
    width: 100%;
    background: #fff;
    padding-top: 40px;
}
</style>


