<template>
    <div class="pingtai">
        <textarea
        v-html="pingtai_title"
        :disabled="!editable"
        class="moreTitle"
        ></textarea>
        <div class="pingtaiItem">
            <div class="itemConWrap_imgWrap" ref="sxyLogo">
                <img class="sxyLogo" src="http://style.iambuyer.com/img/temp-shuixiaoya-imgs/temp-shuixiaoya-imgs-05.jpg">
            </div>
            <div class="Lbefore pingtaiItemTitleCont">
                <textarea
                v-html="pingtaiItem_title"
                :disabled="!editable"
                class="pingtaiItemTitle"
                ></textarea>
                <textarea
                v-html="pingtaiItem_text"
                :disabled="!editable"
                class="pingtaiItemText"
                ></textarea>
            </div>
            
        </div>
        <div class="pingtaiItem">
            <div class="itemConWrap_imgWrap" ref="sxyLogo">
                <img class="sxyLogo" src="http://style.iambuyer.com/img/temp-shuixiaoya-imgs/temp-shuixiaoya-imgs-05.jpg">
            </div>
            <div class="Lbefore pingtaiItemTitleCont">
                <textarea
                v-html="pingtaiItem_title"
                :disabled="!editable"
                class="pingtaiItemTitle"
                ></textarea>
                <textarea
                v-html="pingtaiItem_text"
                :disabled="!editable"
                class="pingtaiItemText"
                ></textarea>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
  name: "introduction",
  data() {
    return {
      editable: false,
      pingtai_title: "孵化平台",
      pingtaiItem_title: "天津产业扶持",
      pingtaiItem_text:
        "只要通过税小鸭平台在徐州注册公司且经营满一年，即可连续8年获得约省级财税的70%扶持资金。"
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

// pingtai
.pingtaiItemText {
    width: 100%;
    font-family: PingFang-SC-Regular;
    font-size: 13px;
    line-height: 20px;
    color: #5D5D5D !important;
    -webkit-text-fill-color: #5D5D5D !important;
}

.Lbefore:before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 20px;
    margin-top: 3px;
    background: #FFAF00;
    position: absolute;
}

.pingtaiItemTitleCont {
    width: 100%;
    padding: 30px 15px;
}

.pingtaiItemTitle {
    width: 100%;
    box-sizing: border-box;
    text-indent: 8px;
    font-family: PingFang-SC-Medium;
    font-size: 18px;
    margin-bottom: 20px;
    color: #393939 !important;
    -webkit-text-fill-color: #393939 !important;
}

.pingtai {
    width: 100%;
    background: #fff;
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


</style>

