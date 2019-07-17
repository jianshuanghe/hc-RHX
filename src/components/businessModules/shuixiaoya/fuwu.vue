<template>
    <div class="introduction">
        <div class="tedian">
            <textarea
            v-html="tedian_title"
            :disabled="!editable"
            class="tedianTitle"
            ></textarea>
            <div class="tedianItem">
                <div class="itemConWrap_imgWrap" ref="sxyLogo">
                    <img class="sxyLogo" src="http://style.iambuyer.com/img/temp-shuixiaoya-imgs/temp-shuixiaoya-imgs-02.jpg">
                </div>
                <div class="tedianItemR" ref="tedianItemR">
                    <textarea
                    v-html="tedianItem_title"
                    :disabled="!editable"
                    class="tedianItemTitle"
                    ></textarea>
                    <textarea
                    v-html="tedianItem_price"
                    :disabled="!editable"
                    class="tedianItemPrice"
                    ></textarea>
                    <textarea
                    v-html="tedianItem_btn"
                    :disabled="!editable"
                    class="tedianItemBtn"
                    ></textarea>
                </div>
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
      tedian_title: "主打服务",
      tedianItem_title: "开公司",
      tedianItem_price: "￥ 598.00",
      tedianItem_btn: "查看详情"
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
.tedianItemTitle {
    width: 100%;
    height: 30px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    color: #393939 !important;
    -webkit-text-fill-color: #393939 !important;
}

.tedianItemBtn:disabled {
    background: #FFAF00 !important;
}

.tedianItemBtn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    color: #fff !important;
    -webkit-text-fill-color: #fff !important;
    border-radius: 4px;
}

.tedianItemPrice {
    height: 20px;
    width: 100%;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    color: #02C2A2 !important;
    -webkit-text-fill-color: #02C2A2 !important;
}

.tedianItemR {
    width: 45%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.itemConWrap_imgWrap {
    width: 50%;
}

.tedianItem {
    width: 100%;
    padding: 30px 0;
    border-bottom: 1px solid #F3F3F3;
    display: flex;
    justify-content: space-between;
}

.tedian {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    background: #fff;
}

.tedianTitle {
    width: 100%;
    padding: 60px 15px 0 15px;
    box-sizing: border-box;
    font-family: PingFang-SC-Bold;
    font-size: 20px;
    color: #FFAF00 !important;
    -webkit-text-fill-color: #FFAF00 !important;
    text-align: center;
}
</style>

