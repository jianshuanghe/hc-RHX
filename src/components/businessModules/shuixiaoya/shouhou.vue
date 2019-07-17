<template>
    <div class="Lbefore shouhou">
        <textarea
        v-html="shouhou_title"
        :disabled="!editable"
        class="shouhouTitle"
        ></textarea>
        <div class="shouhouCont">
            <ul>
                <li class="shouhouContItem">
                    <span class="shouhouContItemTitle">售后站点：</span>
                    <textarea
                    v-html="shouhouContItem_text"
                    :disabled="!editable"
                    class="shouhouContItemText"
                    ></textarea>
                </li>
                <li class="shouhouContItem">
                    <span class="shouhouContItemTitle">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
                    <textarea
                    v-html="shouhouContItem_text"
                    :disabled="!editable"
                    class="shouhouContItemText"
                    ></textarea>
                </li>
                <li class="shouhouContItem">
                    <span class="shouhouContItemTitle">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：</span>
                    <textarea
                    v-html="shouhouContItem_text"
                    :disabled="!editable"
                    class="shouhouContItemText"
                    ></textarea>
                </li>
                <li class="shouhouContItem">
                    <span class="shouhouContItemTitle">工作时间：</span>
                    <textarea
                    v-html="shouhouContItem_text"
                    :disabled="!editable"
                    class="shouhouContItemText"
                    ></textarea>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "more",
  data() {
    return {
      shouhou_title: "售后信息",
      shouhouContItem_text: "北京市售后服务中心北京市售后服务中心",
      editable: false
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

.shouhouContItemText {
    width: 90%;
    line-height: 22px;
    box-sizing: border-box;
    padding-left: 10px;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #5D5D5D;
    -webkit-text-fill-color: #5D5D5D !important;
}

.shouhouContItemTitle {
    width: 80px;
    line-height: 24px;
    display: block;
    color: #FFAF00;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
}

.shouhouContItem {
    width: 100%;
    padding: 5px 0;
    display: flex;
}

.shouhouCont {
    width: 100%;
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

