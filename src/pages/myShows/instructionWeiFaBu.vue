<template>
    <div class="instructionFabu">
        <!-- head -->
        <globalHead></globalHead>
        <!-- top -->
        <div class="fabuCont">
            <div class="fabuImgC">
                <div class="over">
                    <span class="state">未发布</span>
                    <img class="fabuImg" src="http://style.iambuyer.com/img/fabuImg1.png" alt="img">
                </div>
            </div>
            <div class="fabuContArt">
                <p class="fabuTitle">这里是产品说明书的名称，最长字数20字阐述</p>
                <p class="fabuMs">我在如何秀上面创建了属于我自己的说明书哦，快来支持我吧！</p>
                <p class="fabuDate">更新于 2018-05-06 12:04:10</p>
            </div>
        </div>
        <!-- button -->
        <div class="editButton">
            <ul class="editButtonC">
                <li class="btnItems">
                    <div class="yuan"><i class="btnItemsIcon iconfont icon-Z"></i></div>
                    <div class="editText">再次编辑</div>
                </li>
                <li class="btnItems">
                    <div class="yuan"><i class="btnItemsIcon iconfont icon-Z1"></i></div>
                    <div class="editText">完善信息</div>
                </li>
                <li class="btnItems">
                    <div class="yuan"><i class="btnItemsIcon iconfont icon-Z3"></i></div>
                    <div class="editText">删除</div>
                </li>
                <li class="btnItems">
                    <div class="yuan"><i class="btnItemsIcon iconfont icon-Z2"></i></div>
                    <div class="editText">分享</div>
                </li>
            </ul>
        </div>
        <!-- button -->
        <div class="fabuBtn">
            <div class="fabuButton">立即发布</div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.over {
    position: relative;
    overflow: hidden;
}

.state {
    position: absolute;
    top: -40px;
    right: -46px;
    width: 80px;
    height: 80px;
    background: #02C2A2;
    transform: rotate(45deg);
    font-family: PingFangSC-Medium;
    font-size: 10px;
    color: #FFFFFF;
    line-height: 140 px;
    text-align: center;
}

.fabuButton {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #02C2A2;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
}

.fabuBtn {
    padding: 0 15px;
    margin: 40px 0;
}

.icon-changan {
    width: 16px;
    height: 16px;
    color: #9b9b9b;
}

.watchMore {
    background-image: linear-gradient(134deg, #15D49F 0%, #57D6CF 100%);
    box-shadow: 0 1px 3px 0 rgba(2, 194, 162, 0.3);
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    line-height: 24px;
    width: 92px;
    height: 24px;
    text-align: center;
    border-radius: 30px;
}

.icon-Z6 {
    width: 14px;
    height: 12px;
    display: inline-block;
    margin-right: 9px;
}

.dataAccHeadText {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 16px;
}

.dataAccHead {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 26px;
}

.dataAcc {
    padding: 16px 15px 20px 15px;
    background: #fff;
    margin-bottom: 10px;
}

.icon-Z2 {
    width: 15px;
    height: 16px;
    color: #02C2A2;
}

.icon-Z3 {
    width: 14px;
    height: 16px;
    color: #02C2A2;
}

.icon-Z1 {
    width: 14px;
    height: 14px;
    color: #02C2A2;
}

.editText {
    width: 100%;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #2E2E30;
    line-height: 12px;
    margin-top: 14px;
}

.icon-Z {
    width: 16px;
    height: 16px;
    color: #02C2A2;
}

.yuan {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #02C2A2;
    text-align: center;
    line-height: 40px;
}

.editButtonC {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.editButton {
    width: 100%;
    padding: 20px 0 14px 0;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 -1px 0 0 #F5F5F5;
    margin-bottom: 10px;
}

.fabuContArt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.fabuDate {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #BDBDBD;
    line-height: 12px;
    margin-top: 24px;
}

.fabuMs {
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #9B9B9B;
    line-height: 20px;
}

.fabuTitle {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #2E2E30;
    line-height: 22px;
}

.fabuCont p {
    margin-left: 11px;
    float: left;
}

.fabuImg {
    width: 120px;
    height: 120px;
    float: left;
}

.fabuCont {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    margin-top: 44px;
    display: flex;
    background: $color-fff;
}

.instructionFabu {
    background: $color-f9;
    height: 100%;
}
</style>

<script>
import globalHead from "@/components/globalModules/globalHead";
import wxApi from "../../mixins/wxapi.js"; //微信分享sdk
export default {
  name: "instructionWeiFabu",
  components: { globalHead },
  mixins: [wxApi], //微信分享sdk
  mounted: function() {
    //微信分享sdk
    wxApi.wxRegister(this.wxRegCallback);
  },
  methods: {
    /**
     * [wxRegCallback 用于微信JS-SDK回调]
     */
    wxRegCallback() {
      this.wxShareTimeline();
      this.wxShareAppMessage();
    },
    /**
     * [wxShareTimeline 微信自定义分享到朋友圈]
     */
    wxShareTimeline() {
      let opstion1 = {
        title: "说明书", // 分享标题
        link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          "http://img04.iambuyer.com/imgup/upload/images/2018/02/28/8UlsbbRhcjjc2BFhUxvhcjjc2BWWoephcjjc2Bzka1LauwtJOZeYban4nJqbgBYB5q8aUznQub0kvQce8i.jpeg", // 分享图标
        success: function() {
          alert("分享成功");
        },
        error: function() {
          alert("分享失败");
        }
      };
      // 将配置注入通用方法
      wxApi.ShareTimeline(opstion1);
    },
    wxShareAppMessage() {
      let opstion2 = {
        title: "说明书", // 分享标题
        desc: "我的说明书", // 分享描述
        link: this.link, // 分享链接
        imgUrl:
          "http://img04.iambuyer.com/imgup/upload/images/2018/02/28/8UlsbbRhcjjc2BFhUxvhcjjc2BWWoephcjjc2Bzka1LauwtJOZeYban4nJqbgBYB5q8aUznQub0kvQce8i.jpeg", // 分享图标
        success: function() {
          alert("分享成功");
        },
        error: function() {
          alert("分享失败");
        }
      };
      // 将配置注入通用方法
      wxApi.ShareAppMessage(opstion2);
    }
  }
};
</script>


