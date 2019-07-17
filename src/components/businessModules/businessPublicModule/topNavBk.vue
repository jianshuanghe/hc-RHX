<template>
  <div>
      <div class="navWrap">
        <div>
          1
        </div>
        <div>
          1
        </div>
        <div>
          1
        </div>
        <div>
          1
        </div>
        <div>
          1
        </div>
        <div>
          1
        </div>
        <div>
          1
        </div>
        <div>
          1
        </div>

      </div>
  </div>
</template>

<script>
  export default {
    name: "top-nav"
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .navWrap
    /*width 100%*/
    /*display flex*/
    height 70px
    background $color-text-d
    overflow-x scroll
    div
      width 100px
      height 70px
      line-height 70px
      display inline-block
      /*float left*/
      text-align center

</style>
