<template>
  <div id="app">
    <!--<transition name="fade" mode="out-in">&lt;!&ndash;<transition>标签让路由有过渡动画,&ndash;&gt;-->
    <!--<router-view></router-view>-->
    <transition :name="transitionName">
      <!--<keep-alive>-->
      <router-view class="Router"></router-view>
      <!--</keep-alive>-->
    </transition>
    <div >
      <loading :show="loadingShow" text="请稍等..."></loading>
    </div>
    <indexFooter v-if="this.$route.meta.tabbar"></indexFooter>
  </div>
</template>

<script>
  import indexFooter from "@/components/globalModules/indexFooter";
  import { Loading } from 'vux';
  import { mapGetters } from 'vuex';
  import $ from "jquery";
  import { isWeiXin } from './utils/browserType.js';
  import 'common/fonts/iconfont.css'
  export default {
    name: "App",
    components: {
      Loading,
      indexFooter
    },
    data() {
      return {
        transitionName: "slide-left",
        LOADING: "",
        loadingShow: false
      };
    },
    computed: {
      ...mapGetters(['LOADINGSHOW'])
    },
    created() {
      isWeiXin();
      // localStorage.setItem('userId', '965'); // 测试，生产要关闭啊
      localStorage.setItem('token', '123687CA085E4C831CFF5ED492F5C6D86EBDAFD7D5852C4C1559FE7F9162D7B3E71155A0F793DB0E374'); // 测试，生产要关闭啊
      const that = this;
      // **********axios全局拦截**********
      this.$http.interceptors.request.use(
        function (config) {
          // console.log(config)
          const TOKEN = that.LS.getItem('token')
          // Do something before request is sent
          if (TOKEN) {
            console.log('本地有token')
            config.headers.token = TOKEN
          } else {
            console.log('本地无token')
          }
          that.loading(); // 测试，生产要打开
          return config;
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error);
        }
      );
      this.$http.interceptors.response.use(
        function (response) {
          // Do something with response data
          // console.log(response)
          if (response.data.ret === '202') {
            window.location.href = response.data.content
          }
          that.hideLoading();
          return response;
        },
        function (error) {
          // Do something with response error
          return Promise.reject(error);
        }
      );
      //****************************************
    },
    methods: {
      loading() {
        this.$vux.loading.show({
          // text: "Loading"
        });
      },
      hideLoading() {
        this.$vux.loading.hide();
      }
    },
    watch: {
      LOADINGSHOW: {
        handler (a, b) {
          console.log(a, b, 'loading数据vuex');
          this.loadingShow = a.loadingShow; // 侦听loading
        },
        deep: true
      },
      //使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = "slide-left";
          setTimeout(window.scrollTo(0, 0), 2000);
        } else {
          this.transitionName = "slide-right";
          setTimeout(window.scrollTo(0, 0), 2000);
        }
      }
    },
    mounted: function () {
      // let dHeight = $(document).height();
      // let wHeight = $(window).height();
      // // let aHeight = $("#app").height();
      // if (document < wHeight) {
      //   $("#app").height(wHeight);
      //   alert;
      // } else {
      //   $("#app").height(dHeight);
      // }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index.styl';
  @import '~common/fonts/iconfont.css'

  #app {
    background: $color-f9;
    width: 100%;
    float: left;
  }

  .Router {
    position: absolute;
    width: 100%;
    transition: all 0.3s ease;
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100% 0, 0);
  }
</style>
