<template>
  <div>
    <div class="qrWrap">
      <img :src="qrUrl" alt="">
      <p><i class="iconfont icon-changan"></i>长按保存海报二维码</p>
    </div>
    <div class="btnGroup">
      <div type="button" value="继续发布" class="againGo" @click="againGo">继续发布</div>
      <div type="button" value="我的说明书" class="myIns" @click="myIns">我的说明书</div>
    </div>
  </div>
</template>

<script>
import LS from 'config/localstorage'
  export default {
    name: "pub-succ",
    data(){
      return{
        qrUrl:this.$route.query.qrUrl
      }
    },
    mounted: function(){
      // 微信分享
      this.wxApiG();
      LS.removeItem("base")
      LS.removeItem("imgC1")
      LS.removeItem("imgC2")
      LS.removeItem("imgC3")
      LS.removeItem("addM1")
      LS.removeItem("addM2")
      LS.removeItem("addM3")
      LS.removeItem("addM4")
      LS.removeItem("addM5")
      this.LS.removeItem('instrcName')
      this.LS.removeItem('instrcDesc')
      // LS.removeItem("addId")
    },
    methods: {
      againGo(){
        this.$router.push("/createShow")
      },
      myIns(){
        this.$router.push("/myInstructions")
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .qrWrap
    width 345px
    height 366px
    background #F5F5F5
    margin 20px auto 10px auto
    overflow hidden
    img
      width 225px
      height 312px
      margin 10px auto
      display block
    p
      text-align center
      font-size 14px
      color #9B9B9B
      font-weight 300
      i
        font-size 18px

  .btnGroup
    width 94vw
    height 15vw
    margin 15vw auto 3vw auto
    text-align center
    div
      width: 45%;
      height: 12vw;
      font-size: 4vw;
      font-weight: 300;
      border-radius: 2vw;
      color: #fff;
      text-align: center;
      line-height: 11vw;
      display: inline-block;
    .againGo
      background #02c2a2
    .myIns
      background #bfc202
</style>
