<template>
    <div class="myFooter2">
      <div class=""  v-if='!this.$route.query.source'>
        <span class="opcity">本系统由 </span>
        <img class="logo" src="http://style.iambuyer.com/img/rhx-mobile-logo-shenhui.png" alt="Logo">
        <span class="opcity"> 提供技术支持
          <a er= '12321'href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx582097e6b4749e25&redirect_uri=http%3A%2F%2Fapi.ruhexiu.com%2Frest-rp%2Fuser%2FwxLogin&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect">
            &nbsp;我也要制作
          </a>
        </span>
      </div>
      <div class="" v-if='this.$route.query.source'>
        <span class="opcity">本系统由 </span>
        <img class="logo" src="http://style.iambuyer.com/img/rhx-mobile-logo-shenhui.png" alt="Logo">
        <span class="opcity"> 提供技术支持
          <a er= '1' @click="zhiZuo">
            &nbsp;我也要制作
          </a>
        </span>
      </div>
    </div>
</template>
<script>
  export default {
    name: "",
    components: {  },
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
      zhiZuo() {
        console.log('触发立即制作按钮');
        if (this.$route.query.source) {
          console.log('从商机进来');
          if (window.location.href.split('cust').length > 1) {
            window.location.href = window.location.href.split('cust')[0];
          } else if (window.location.href.split('mitemp').length > 1) {
            window.location.href = window.location.href.split('mitemp')[0];
          };
          return false;
        };
      },
    }
  };
</script>
<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.logo {
    width: 38px;
    margin: 0 4px;
    display: inline-block;
    position: relative;
    top: 2px;
}

.opcity {
    font-size: 12px;
    color: #BDBDBD;
    opacity: 0.6;
    display: inline-block;
    font-weight: 300
}
.opcity a {
  font-weight 300
  color $color-cyd
}
.myFooter2 {
    width: 100%;
    margin: 20px 0;
    padding-bottom: 20px;
    text-align: center;
    float: left;
}
</style>

