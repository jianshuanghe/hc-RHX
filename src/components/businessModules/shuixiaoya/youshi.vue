<template>
    
        <div class="youshi">
            <textarea
            v-html="youshi_title"
            :disabled="!editable"
            class="moreTitle"
            ></textarea>
            <div class="youshiItem">
                <div class="youshiItemG">
                    <div class="youshiItemIcon">
                        <img class="youshiItemIconImg" src="./icon.png">
                    </div>
                    <textarea
                    v-html="youshiItemG_title"
                    :disabled="!editable"
                    class="youshiItemGTitle"
                    ></textarea>
                    <textarea
                    v-html="youshiItemG_text"
                    :disabled="!editable"
                    class="youshiItemGText"
                    ></textarea>
                </div>
                <div class="youshiItemW">
                    <div class="youshiItemIcon itemConWrap_imgWrap">
                        <img class="youshiItemIconImg" src="./icon.png">
                    </div>
                    <textarea
                    v-html="youshiItemG_title"
                    :disabled="!editable"
                    class="youshiItemGTitle"
                    ></textarea>
                    <textarea
                    v-html="youshiItemG_text"
                    :disabled="!editable"
                    class="youshiItemGText"
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
      youshi_title: "四大优势",
      youshiItemG_title: "明码标价",
      youshiItemG_text:
        "打破传统的陋习，将所有服务明码标价打破传统的陋习，将所有服务明码标价"
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
.youshiItemGText {
    width: 100%;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #5D5D5D !important;
    -webkit-text-fill-color: #5D5D5D !important;
    text-align: center;
}

.youshiItemGTitle {
    width: 100%;
    font-family: PingFang-SC-Medium;
    font-size: 18px;
    color: #393939 !important;
    -webkit-text-fill-color: #393939 !important;
    text-align: center;
}

.youshiItemIconImg {
    width: 55px;
    height: 55px;
    margin-top: 15px;
}

.youshiItemIcon {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background: #FFAF00;
    text-align: center;
}

.itemConWrap_imgWrap {
    margin-top: 0 !important;
}

.youshiItemG {
    width: 100%;
    height: 243px;
    padding: 35px 15px;
    background: #F3F3F3;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.youshiItemW {
    width: 100%;
    height: 243px;
    padding: 35px 15px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.youshi {
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

