<template>
  <div class="MMIT">
    <div class="MMIT-CON">
      <a class="currIndex">{{tIndex+1}}</a>
      <div class="MMIT-BTNS">
        <a @click="DelateThisItems"><i class="iconfont icon-Z3"></i></a>
        <a @click="UpThisItems"><i class="iconfont icon-Z7"></i></a>
        <a @click="DownThisItems"><i class="iconfont icon-Z5"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "manage-module-items-tips",
    props: {
      tIndex: {
        type: Number,
        default: 1
      }
    },
    methods: {
      // 删除此项
      DelateThisItems() {
        this.$emit('delate-this-items')
      },
      // 上移此项
      UpThisItems() {
        this.$emit('up-this-items')
      },
      // 下移此项
      DownThisItems() {
        this.$emit('down-this-items')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .MMIT {
    position: absolute;
    width 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 2
  }

  .currIndex {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background: $color-cyd;
    color: $color-fff;
    font-size: 18px;
    border-radius: 3px;
    margin: 10px;
  }

  .MMIT .MMIT-CON {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .MMIT-BTNS {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 34px;
    line-height: 34px;
  }

  a {
    margin: 0 10px;
    display: inline-block;
    width: 60px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    cursor: pointer;
    margin-bottom 5px
  }

  //a:nth-last-child(1){margin-right:0;}
  i {
    font-size: 16px;
    color: #fff;
  }
</style>
