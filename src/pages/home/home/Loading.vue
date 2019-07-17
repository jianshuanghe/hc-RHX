<template>
  <div>
    &nbsp;
  </div>
</template>

<script>
  export default {
    name: "loading",
    created() {
      // this.token = this.$route.query.token
      if(this.$route.query.token && this.$route.query.userId){
        this.LS.removeItem('token')
        this.LS.removeItem('userId')
        this.LS.setItem('token',this.$route.query.token)
        this.LS.setItem('userId',this.$route.query.userId)
      }else {
        this.LS.removeItem('compLogo')
        this.LS.removeItem('nickname')
        this.LS.removeItem('wxId')
        this.LS.setItem("compLogo", this.$route.query.compLogo)
        this.LS.setItem("nickname", this.$route.query.nickname)
        this.LS.setItem("wxId", this.$route.query.wxId)
      }


    },
    mounted: function () {
      this.$nextTick(function () {
        // setTimeout(() => {
          this.$router.push('/index')
        // },100)
        // Code that will run only after the
        // entire view has been rendered
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index.styl';
  @import '~common/fonts/iconfont.css'
</style>
