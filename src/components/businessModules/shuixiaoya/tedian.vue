<template>
    <div class="introductionItem">
        <div class="introductionItemT">
            <textarea
            v-html="introductionItemT_title"
            :disabled="!editable"
            class="introductionItemTitle"
            ></textarea>
            <textarea
            v-html="introductionItemT_text"
            :disabled="!editable"
            class="introductionItemText"
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
      introductionItemT_title: "2000万+中小企业",
      introductionItemT_text: "他们聚集在这里"
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

.introductionItemText {
    width: 100%;
    font-font-family: PingFang-SC-Regular;
    font-size: 13px;
    line-height: 20px;
    color: #393939 !important;
    -webkit-text-fill-color: #393939 !important;
    text-align: center;
    margin-top: 10px;
}

.introductionItemTitle {
    width: 100%;
    font-size: 18px;
    text-align: center;
    font-family: PingFang-SC-Medium;
    color: #FFAF00 !important;
    -webkit-text-fill-color: #FFAF00 !important;
}

.introductionItemT {
    width: 100%;
    padding: 25px 15px;
    box-sizing: border-box;
    border: 1px solid #FFAF00;
    margin-bottom: 30px;
}

.introductionItem {
    width: 100%;
    padding: 40px 15px 10px 15px;
    box-sizing: border-box;
    background: #F3F3F3;
}

</style>

