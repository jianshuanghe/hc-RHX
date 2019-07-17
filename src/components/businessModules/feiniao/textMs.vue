<template>
    <div class="jianjie">
        <div class="cont">
            <p class="P_LeftLable"><textarea class="ms" :disabled="!editable" v-html="jianjie_title">sdf</textarea></p>
            <textarea class="jianjieMs" :disabled="!editable" v-html="jianjie_ms">sdf</textarea>
        </div>
        <div class="cont">
            <p class="P_LeftLable"><textarea class="ms" :disabled="!editable" v-html="jianjie_title">sdf</textarea></p>
            <textarea class="jianjieMs" :disabled="!editable" v-html="jianjie_ms">sdf</textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "jianjie",

  data() {
    return {
      editable: false,
      jianjie_title: "让每个人都能享受科技带来的乐趣让",
      jianjie_ms:
        "飞鸟科技成立于2010年，是一家专注于高端智能手机、互联网电视以及智能家居生态链建设的创新型科技企业。“让每个人都能享受科技的乐趣”是飞鸟公司的愿景"
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

.jianjieMs {
    width: 100%;
    line-height: 22px;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    color: #5D5D5D;
    -webkit-text-fill-color: #5D5D5D !important;
}

.jianjie {
    width: 100%;
    background: #fff;
}

.cont {
    width: 100%;
    padding: 40px 15px 0 15px;
    box-sizing: border-box;
}

.ms {
    width: 100%;
    line-height: 26px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    color: #393939;
    -webkit-text-fill-color: #393939 !important;
    margin-bottom: 20px;
}
</style>


