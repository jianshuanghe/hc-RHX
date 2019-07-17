<template>
    <div class="shuixiaoya">
        <textarea
        v-html="tigong"
        :disabled="!editable"
        class="tigong"
        ></textarea>
        <textarea
        v-html="metoo"
        :disabled="!editable"
        class="metoo"
        ></textarea>
        <i class="iconfont "></i>
    </div>
</template>

<script>
export default {
  name: "more",

  data() {
    return {
      editable: false,
      tigong: "本系统由******提供技术支持",
      metoo: "我也要制作 ＞"
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

.metoo {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    color: #02C2A2;
    -webkit-text-fill-color: #02C2A2 !important;
}

.tigong {
    width: 80%;
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    color: #9B9B9B;
    -webkit-text-fill-color: #9B9B9B !important;
    text-align: center;
}

.shuixiaoya {
    width: 100%;
    background: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    display: flex;
}
</style>

