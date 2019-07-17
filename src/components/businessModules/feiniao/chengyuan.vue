<template>
    <div class="jianjie">
        <p class="chengyuanHead"><textarea v-html="chengyuan_title" :disabled="!editable" class="chengyuanTitle"></textarea></p>
        <div class="chengyuanCont">
            <div class="itemConWrap_imgWrap chengyuanItem">
                <img src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-09.jpg">
            </div>
            <div class="itemConWrap_imgWrap chengyuanItem">
                <img src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-09.jpg">
            </div>
        </div>
        <div class="chengyuanCont">
            <div class="itemConWrap_imgWrap chengyuanItem">
                <img src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-09.jpg">
            </div>
            <div class="itemConWrap_imgWrap chengyuanItem">
                <img src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-09.jpg">
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
      chengyuan_title: "我们的精英成员"
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

.chengyuanItem {
    width: 45%;
    margin-bottom: 10px;
}

.chengyuanCont {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.chengyuanTitle {
    width: 100%;
    height: 26px;
    line-height: 26px;
    padding: 30px 0 20px 0;
    font-size: 18px;
    text-align: center;
    font-family: PingFang-SC-Regular;
    margin-bottom: 15px;
}

.chengyuanHead:before {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: #F3F3F3;
    position: absolute;
    top: 70px;
    left: 50%;
    margin-left: -20px;
}

.jianjie {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    background: #2F2F2F;
}
</style>


