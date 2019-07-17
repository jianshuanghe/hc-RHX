<template>
  <div class="ediTingBtmBtns" ref="ediTingBtmBtns" id="ediTingBtmBtns">
    <div class="ediTingBtmBtnsItems">
      <a><i class="iconfont icon-shiyong01"></i> &nbsp;存为草稿</a>
    </div>
    <div class="ediTingBtmBtnsItems" @click="temp_preview">
      <a><i class="iconfont icon-L2"></i> &nbsp;预览</a>
    </div>
    <div class="ediTingBtmBtnsItems goLine" @click="addDesc">
      <a>发布上线</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "edi-ting-btm-btns",
    computed: {
      ...mapGetters([
        'GET_UPORDOWN',
        'GET_EDITABLE'
      ])
    },
    watch: {
      //编辑过程中底部按钮显示与否
      GET_UPORDOWN(o, n) {
        if(this.GET_EDITABLE){
          if (n === 'up') {
            this.$refs.ediTingBtmBtns.style.bottom = '0'
          } else {
            this.$refs.ediTingBtmBtns.style.bottom = '-1.173333rem'
          }
        }

      }
    },
    created() {

    },
    methods:{
      temp_preview(){
        this.$emit('temp-preview')
      },
      addDesc(){
        this.$emit('add-desc')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .ediTingBtmBtns
    width 100%
    display flex
    height 44px
    background rgba(46, 46, 48, .8)
    position fixed
    bottom -44px
    transition all .3s
    justify-content center
    z-index 99999
    .ediTingBtmBtnsItems
      flex 1
      text-align center
      line-height 44px
      a
        display block
        color #fff
        font-size 16px
        font-weight 300
        line-height 44px
        cursor pointer
        i
          font-size 16px
    .goLine
      background linear-gradient(to right, rgba(21,212,159,1) , rgba(87,214,207,1))
</style>
