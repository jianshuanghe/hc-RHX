<template>
    <div class="header">
        <span class="item1"><i class="iconfont icon-fanhui back" @click="back"></i></span>
        <span class="title">{{this.$route.meta.title}}</span>
        <span class="item3"><i class="iconfont icon-L4 mune"></i></span>
    </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.header {
    width: 100%;
    padding: 0 12px;
    height: 44px;
    flex-grow: 1;
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    background: $color-fff;
    box-shadow: 0 1px 0 0 $color-f5;
    position: fixed;
    top: 0;
    box-sizing: border-box;
    z-index: 999;
}

.header span {
}

.item1 {
    flex-basis: 60px;
    font-size: 16px;
}

.item3 {
    flex-basis: 60px;
    text-align: right;
}

.title {
    font-size: 14px;
    color: $color-2e;
    letter-spacing: 0;
    line-height: 14px;
    font-family: PingFangSC-Regular;
}

.back {
    width: 14px;
    height: 14px;
    color: $color-000;
    margin-right: 4px;
    font-size: 16px;
}

.mune {
    width: 12px;
    height: 10px;
    color: $color-000;
    margin-left: 30px;
}
</style>

<script>
export default {
  name: "globalHead",
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

