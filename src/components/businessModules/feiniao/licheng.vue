<template>
    <div class="jianjie">
        <div class="jianjieHead">
            <i class="heng">一</i>
            <textarea v-html="jianjie_title" :disabled="!editable" class="jianjieTitle"></textarea>
            <i class="heng">一</i>
        </div>
        <div class="licheng">
            <div class="itemConWrap_imgWrap lichengImg">
                <img src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-10.jpg">
            </div>
            <div class="lichengRight">
                <p>
                    <textarea v-html="licheng_month" :disabled="!editable" class="jianjieMonth"></textarea>
                    <textarea v-html="licheng_year" :disabled="!editable" class="jianjieYear"></textarea>
                </p>
                <textarea v-html="licheng_ms" :disabled="!editable" class="jianjieMs"></textarea>
            </div>
        </div>
        <div class="licheng">
            <div class="itemConWrap_imgWrap lichengImg">
                <img src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-10.jpg">
            </div>
            <div class="lichengRight">
                <p>
                    <textarea v-html="licheng_month" :disabled="!editable" class="jianjieMonth"></textarea>
                    <textarea v-html="licheng_year" :disabled="!editable" class="jianjieYear"></textarea>
                </p>
                <textarea v-html="licheng_ms" :disabled="!editable" class="jianjieMs"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "jianjie",
  data() {
    return {
      editable: false,
      jianjie_title: "发展历程",
      licheng_month: "04月",
      licheng_year: "2018",
      licheng_ms:
        "公司新产品新一代智能电话获得了国际创新设计大奖，并获得了专家一致好评。"
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
    height: 74px;
    overflow-y: auto;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    color: #5D5D5D !important;
    -webkit-text-fill-color: #5D5D5D !important;
}

.jianjieYear {
    width: 50px;
    height: 22px;
    font-size: 12px;
    font-family: PingFang-SC-Medium;
    color: #5D5D5D !important;
    -webkit-text-fill-color: #5D5D5D !important;
}

.jianjieMonth {
    width: 46px;
    height: 24px;
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    color: #393939 !important;
    -webkit-text-fill-color: #393939 !important;
}

.lichengRight {
    flex-basis: 160px;
    flex-grow: 1;
    margin-left: 20px;
}

.licheng {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
}

.lichengImg {
    flex-basis: 160px;
    flex-grow: 1;
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
    color: #02C2A2 !important;
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


