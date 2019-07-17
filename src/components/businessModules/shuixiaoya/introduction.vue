<template>
    <div class="introduction">
        <div>
            <textarea
            v-html="s_title"
            :disabled="!editable"
            class="moreTitle"
            ></textarea>
            <textarea
            v-html="s_text"
            :disabled="!editable"
            class="introductionText"
            ></textarea>
            <textarea
            v-html="s_text"
            :disabled="!editable"
            class="introductionText"
            ></textarea>
            <textarea
            v-html="s_text"
            :disabled="!editable"
            class="introductionText"
            ></textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "introduction",
  data() {
    return {
      editable: false,
      s_title: "公司简介",
      s_text:
        "税小鸭是提供一站式企业综合服务的O2O平台，包括企业注册、产业孵化、创业投融资等多项服务。税小鸭是慧聪网旗下子平台，致力于帮助国内中小微企业降低成本、提升效率。",
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

// tedian


// 介绍
.introductionText {
    width: 100%;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    padding: 0 15px;
    margin-bottom: 40px;
    box-sizing: border-box;
    color: #5D5D5D !important;
    -webkit-text-fill-color: #5D5D5D !important;
}

.moreTitle {
    width: 100%;
    padding: 60px 15px 20px 15px;
    box-sizing: border-box;
    font-family: PingFang-SC-Bold;
    font-size: 20px;
    color: #FFAF00 !important;
    -webkit-text-fill-color: #FFAF00 !important;
    text-align: center;
}

.introduction {
    width: 100%;
    background: #fff;
}
</style>

