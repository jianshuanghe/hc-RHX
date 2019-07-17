<template>
    <div class="Lbefore shouhou">
        <textarea
        v-html="liuyan_title"
        :disabled="!editable"
        class="shouhouTitle"
        ></textarea>
        <input type="text" class="liuyanName" placeholder="如何称呼您">
        <input type="text" class="liuyanName" placeholder="在这里输入您的联系电话哦">
        <textarea class="liuyanTA" placeholder="说点什么吧，我可是非常期待呢"></textarea>
        <textarea class="liuyanBtn" v-html="liuyan_btn"></textarea>
    </div>
</template>

<script>
export default {
  name: "liuyan",
  data() {
    return {
      editable: false,
      liuyan_title: "直接留言",
      liuyan_btn: "提交信息"
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

.liuyanBtn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    margin-top: 30px;
    box-sizing: border-box;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #fff;
    -webkit-text-fill-color: #fff !important;
    background: #FFAF00;
    text-align: center;
}

.liuyanTA {
    width: 100%;
    height: 160px;
    line-height: 22px;
    border: 1px solid #DDDBD5;
    padding: 0 15px;
    margin-top: 15px;
    box-sizing: border-box;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #5D5D5D;
    -webkit-text-fill-color: #5D5D5D !important;
}

.liuyanName {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #DDDBD5;
    padding: 0 15px;
    margin-top: 15px;
    box-sizing: border-box;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #5D5D5D;
    -webkit-text-fill-color: #5D5D5D !important;
}

.shouhouTitle {
    width: 100%;
    height: 30px;
    padding-left: 10px;
    box-sizing: border-box;
    font-family: PingFang-SC-Medium;
    font-size: 18px;
    color: #393939;
    -webkit-text-fill-color: #393939 !important;
}

.shouhou {
    width: 100%;
    padding: 30px 15px;
    box-sizing: border-box;
    background: #fff;
}
</style>

