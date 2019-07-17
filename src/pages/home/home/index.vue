<template>
  <div class="indexContent" id="main">
    <!-- <globalHead></globalHead> -->
    <globalSwiper></globalSwiper>
    <div class="content">
      <div class="wave ripple danger">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="createCont" @click="createShow">
          <i class="iconfont icon-weibiaoti- add"></i>
          <div>创建说明书</div>
        </div>
      </div>

      <!-- <div class="wave solid warning">
          <div class="circle"></div>
          <div class="createCont" @click="createShow">
            <i class="iconfont icon-weibiaoti- add"></i>
            <div>创建说明书</div>
          </div>
      </div> -->

      <!-- <p class="liucheng"><span class="num">1</span> 选择模板 <span class="num">2</span> 编辑模板 <span class="num">3</span> 提交发布 <span class="num">4</span> 生成二维码,分享</p> -->
      <p class="liucheng"><i class="num iconfont icon-1"></i> 选择模板 <i class="num iconfont icon-2"></i> 编辑模板 <i
        class="num iconfont icon-3"></i> 提交发布 <i class="num iconfont icon-4"></i> 生成二维码,分享</p>
      <div class="about">
        <router-link class="aboutRHX" to="/aboutRhx">关于如何秀</router-link>
        <span class="shu">|</span>
        <router-link class="templete" to="/createShow">优质模板</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index.styl';

  .num {
    font-size: 14px;
    display: inline-block;
    color: #02c2a2;
  }

  /* ***********波纹效果*********** */
  .wave {
    position: relative;
    width: 160px;
    height: 160px;
  }

  .wave .circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
  }

  /* 波纹效果 */
  .wave.ripple .circle {
    width: calc(100% - 6px);
    /* 减去边框的大小 */
    height: calc(100% - 6px);
    /* 减去边框的大小 */
    border: 3px solid #fff;
  }

  .wave.ripple .circle:first-child {
    animation: circle-opacity 2s infinite;
  }

  .wave.ripple .circle:nth-child(2) {
    animation: circle-opacity 2s infinite;
    animation-delay: 0.3s;
  }

  .wave.ripple .circle:nth-child(3) {
    animation: circle-opacity 2s infinite;
    animation-delay: 0.6s;
  }

  .wave.ripple.danger {
    color: red;
  }

  .wave.ripple.danger .circle {
    border-color: #57D6CF;
  }

  .wave.ripple.warning {
    color: orange;
  }

  .wave.ripple.warning .circle {
    border-color: orange;
  }

  /* 波动效果 */
  .wave.solid .circle {
    width: 160px;
    height: 160px;
    background: #fff;
  }

  .wave.solid .circle:first-child {
    animation: circle-opacity 2s infinite;
  }

  .wave.solid.danger {
    color: red;
  }

  .wave.solid.danger .circle {
    background: red;
  }

  .wave.solid.warning {
    color: orange;
  }

  .wave.solid.warning .circle {
    background: #57D6CF;
  }

  @keyframes circle-opacity {
    from {
      opacity: 1;
      transform: scale(0);
    }

    to {
      opacity: 0;
      transform: scale(1);
    }
  }

  .indexContent {
    width: 100%;
    float: left;
    background: #fff;
  }

  .content {
    width: 100%;
    height: 370px;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    background: #fff;
  }

  .createCont {
    position: absolute;
    top: 18px;
    left: 18px;
    width: 120px;
    height: 120px;
    font-size: 16px;
    padding: 20px 0;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 0;
    line-height: 18px;
    font-family: PingFangSC-Medium;
    background: -webkit-linear-gradient(bottom, #15D49F, #57D6CF); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(top, #15D49F, #57D6CF); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(top, #15D49F, #57D6CF); /* Firefox 3.6 - 15 */
    background: linear-gradient(to top, #15D49F, #57D6CF); /* 标准的语法（必须放在最后） */
    box-shadow: 0 1px 3px 0 rgba(2, 194, 162, 0.3);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .add {
    font-size: 40px;
    color: #fff;
  }

  .liucheng {
    width: 100%;
    float: left;
    margin-top: 20px;
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 12px;
    text-align: center;
    font-weight: 300
  }

  .about {
    width: 200px;
    text-align: center;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 14px;
    margin-top: 50px;
    // position: absolute;
    bottom: 65px;
    font-family: PingFangSC-Regular;
  }

  .aboutRHX {
    color: #2E2E30;
  }

  .templete {
    color: #2E2E30;
  }

  .shu {
    margin: 0 20px;
    color: #BDBDBD;
  }
</style>

<script type="text/ecmascript-6">
  import globalSwiper from "@/components/globalModules/globalSwiperBanner";
  import globalHead from "@/components/globalModules/globalHead";

  export default {
    name: "index",
    components: {globalSwiper, globalHead},
    mounted: function () {
      // 微信分享
      this.wxApiG();
      //   height
      boxheight(); //执行函数
      function boxheight() {
        //函数：获取尺寸
        //获取浏览器窗口高度
        var winHeight = 0;
        if (window.innerHeight) winHeight = window.innerHeight;
        else if (document.body && document.body.clientHeight)
          winHeight = document.body.clientHeight;
        //通过Document对body进行检测，获取浏览器可视化高度
        if (document.documentElement && document.documentElement.clientHeight)
          winHeight = document.documentElement.clientHeight;
        //DIV高度为浏览器窗口高度
        document.getElementById("main").style.height = winHeight + "px";
      }

      window.onresize = boxheight; //窗口或框架被调整大小时执行
      this.getToken()
    },
    data() {
      return {};
    },
    created(){
      // setTimeout(() => {
      //   this.$router.push('/index')
      // },800)
    },
    methods: {
      createShow() {
        this.$router.push("/createShow");
      },
      getToken() {
        if (this.$route.query.token) {
          console.log('拿到啦')
        } else {
          console.log('没拿到')
        }
      }
    },
    updated() {
      // this.$nextTick(() => {
      //   alert(34)
      //   setTimeout(() => {
      //     // this.$router.go(0)
      //     window.location.reload()
      //   }, 3000)
      // })
    }
  };
</script>
