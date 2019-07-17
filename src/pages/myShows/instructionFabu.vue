<template>
  <div class="instructionFabu">
    <!-- head -->
    <!-- <globalHead></globalHead> -->
    <!-- top -->
    <div class="fabuCont" @click="lookMyInstrc">
      <div class="fabuImgC">
        <div class="over">
          <span class="state" v-if="list.instrucState==1">已上线</span>
          <span class="state3" v-else-if="list.instrucState==0">未发布</span>
          <span class="state2" v-else>已下架</span>
          <img class="fabuImg" :src="list.bannerImg || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'" alt="img" @click.prevent="lookMyInstrc">
        </div>
      </div>
      <div class="fabuContArt">
        <p class="fabuTitle">{{list.instrucTitle}}</p>
        <p class="fabuMs">{{list.instrucIntro}}！</p>
        <p class="fabuDate">更新于 {{list.updateTime}}</p>
      </div>
    </div>
    <!-- button -->
    <div class="editButton">
      <ul class="editButtonC">
        <li class="btnItems" @click="editAgain">
          <div class="yuan"><i class="btnItemsIcon iconfont icon-Z"></i></div>
          <div class="editText">再次编辑</div>
        </li>
        <li class="btnItems" @click="wanshanInfo">
          <div class="yuan"><i class="btnItemsIcon iconfont icon-Z1"></i></div>
          <div class="editText">完善信息</div>
        </li>
        <li class="btnItems" @click="delThisIns">
          <div class="yuan"><i class="btnItemsIcon iconfont icon-Z3"></i></div>
          <div class="editText">删除</div>
        </li>
        <!--<li class="btnItems">-->
          <!--<div class="yuan" :class="list.instrucState==2?'hui':''"><i class="btnItemsIcon iconfont icon-Z2" :class="list.instrucState==2?'hui':''"></i></div>-->
          <!--<div class="editText" :class="list.instrucState==2?'hui':''">分享</div>-->
        <!--</li>-->
      </ul>
    </div>
    <!-- 已发布展示数据 -->
    <div v-if="list.instrucState==1">
      <!-- 累计数据 -->
      <div class="dataAcc">
        <div class="dataAccHead">
          <div class="dataAccHeadText"><i class="iconfont icon-Z6"></i>累计数据</div>
          <router-link :to="{ path: '/instructionData', query:{instrucId: list.instrucId, instrucTitle: list.instrucTitle} }"><div class="watchMore">查看完整数据</div></router-link>
          <!-- <router-link to="/instructionData"><div class="watchMore">查看完整数据</div></router-link> -->
        </div>
        <div class="dataAccCont">
          <div class="dataAccContItems">
            <p class="dataAccNum">{{list.pv}}</p>
            <p class="dataAccMs">访问总量</p>
          </div>
          <div class="dataAccContItems">
            <p class="dataAccNum">{{list.likeCn}}</p>
            <p class="dataAccMs">点赞总量</p>
          </div>
          <div class="dataAccContItems">
            <p class="dataAccNum">{{list.shareWxCnt + list.shareQqCnt + list.shareWbCnt}}</p>
            <p class="dataAccMs">分享总量</p>
          </div>
          <div class="dataAccContItems">
            <p class="dataAccNum">{{list.msgCnt}}</p>
            <p class="dataAccMs">留言总量</p>
          </div>
        </div>
      </div>
      <!-- 专属二维码 -->
      <div class="erWeiMa">
        <div class="dataAccHeadText"><i class="iconfont icon-Z4"></i>专属二维码</div>
        <div class="erWeiMaCon">
          <!-- 这里的src加了一个随机数，解决图片缓存，显示实时图片 -->
          <img class="scewm" :src="list.qrImg+'?t='+Math.random()" alt="二维码加载失败" preview="0">
          <p class="scewmMs"><i class="iconfont icon-changan"></i> 点击长按保存海报二维码</p>
        </div>
      </div>
      <!-- footer -->
      <myFooter2></myFooter2>
    </div>
    <!-- 未发布展示数据 -->
    <div class="fabuBtn" v-else-if="list.instrucState==0">
      <div class="fabuButton" @click="isPublic">立即发布</div>
    </div>
    <!-- 下架展示数据 -->
    <div v-else>
      <!-- 下架原因 -->
      <div class="reason">
        <div class="reasonHead"><i class="xiajia iconfont icon-z"></i>下架原因</div>
        <p class="xiaJiaReason">{{list.offContent}}</p>
        <p class="xiaJiaTime">下架时间 {{list.offTime}}</p>
      </div>
      <!-- button -->
      <div class="fabuBtn" @click="isPublic">
        <div class="fabuButton">重新发布</div>
      </div>
    </div>
    <div class="loadingBox">
      <loading :show="show1" :text="text1"></loading>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.icon-Z2.hui {
  color: #E2E2E2;
}

.yuan.hui {
  border-color: #E2E2E2;
}

.editText.hui {
  color: #E2E2E2;
}

.xiaJiaTime {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9B9B9B;
  margin-left: 23px;
}

.xiaJiaReason {
  width: 100%;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #2E2E30;
  line-height: 20px;
  margin: 16px 0 20px 0;
  padding: 0 23px;
}

.xiajia {
  width: 14px;
  height: 14px;
  color: #2E2E30;
  display: inline-block;
  margin-right: 9px;
}

.reasonHead {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #2E2E30;
  line-height: 16px;
}

.reason {
  padding: 17px 15px 18px 15px;
  background: #fff;
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

.over {
  position: relative;
  overflow: hidden;
}

.state {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 80px;
  height: 80px;
  background: #FAB100;
  transform: rotate(45deg);
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #FFFFFF;
  line-height: 136 px;
  text-align: center;
}

.state2 {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 80px;
  height: 80px;
  background: #02C2A2;
  transform: rotate(45deg);
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #FFFFFF;
  line-height: 136 px;
  text-align: center;
}

.state3 {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #FFFFFF;
  line-height: 136 px;
  text-align: center;
  background: #2E2E30;
}

.icon-changan {
  width: 16px;
  height: 16px;
  color: #9b9b9b;
}

.scewmMs {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #9B9B9B;
  line-height: 13px;
  text-align: center;
  margin-top: 10px;
}

.scewm {
  width: 225px;
  margin: 0 auto;
  display: block;
}

.erWeiMaCon {
  width: 100%;
  padding: 10px 0 20px 0;
  background: #F9F9F9;
  margin-top: 20px;
}

.icon-Z4 {
  width: 14px;
  height: 14px;
  color: #2E2E30;
  display: inline-block;
  margin-right: 9px;
}

.erWeiMa {
  padding: 14px 15px 10px 15px;
  background: #fff;
  margin-bottom: 31px;
}

.dataAccContItems:after {
  content: '';
  width: 1px;
  height: 24px;
  border-right: 1px solid #E2E2E2;
  position: relative;
  top: -20px;
  left: -20px;
}

.dataAccContItems:first-child:after {
  border: 0;
}

.dataAccMs {
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #9B9B9B;
  letter-spacing: 0;
  line-height: 12px;
}

.dataAccNum {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #02C2A2;
  letter-spacing: 0;
  line-height: 16px;
  margin-bottom: 8px;
}

.dataAccCont {
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  margin: 0 auto;
}

.editButtonC {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.yuan i {
  font-size: 20px;
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
  padding-top: 44px;
  display: flex;
  background: $color-fff;
}

.instructionFabu {
  background: $color-f9;
  height: 100%;
}
</style>

<script>
import * as API from "config/api";
import globalHead from "@/components/globalModules/globalHead";
import myFooter2 from "@/components/globalModules/myFooter2";
import { mapMutations } from "vuex";
import { Loading } from "vux";
import wxApi from "../../mixins/wxapi.js"; //微信分享sdk
export default {
  name: "instructionFabu",
  mixins: [wxApi], //微信分享sdk
  components: { globalHead, myFooter2 ,Loading},
  data() {
    return {
      show1:false,
      text1:'请稍后!',
      instrucId: this.$route.query.instrucId,
      list: []
    };
  },
  created: function() {
    this.$nextTick(() => {
      this.getDetails();
      // 微信分享
      this.wxApiG();
    });
  },
  methods: {
    //草稿说明书立即发布
    isPublic() {
      API._isPublic(this.$route.query.instrucId, 1).then(res => {
        console.log(res);
        if (res.ret == API.ERROK) {
          this.$router.push("/myInstructions");
        } else {
          alert(res.msg);
        }
      });
    },
    //删除说明书
    delThisIns() {
      console.log('触发删除按钮');
      console.log(this.list.isPut, '获取此说明书发布状态1，代表发布中，此时不可编辑，不可完善，不可删除');
      if (this.list.isPut === 1) { // 判断发布中状态的操作
        this.$vux.toast.show({
          width: "60%",
          text: "发布中不可删除！",
          type: "text",
          position: "middle",
          onHide: () => {
            // this.wantAddTel = ''
          }
        });
        return;
      };
      this.show1 = true; // 显示loading
      this.$createDialog({
        type: "confirm",
        // title: '温馨提醒',
        content: "确定要删除此说明书吗",
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          API._delInstrc(this.$route.query.instrucId).then(res => {
            if (res.ret === API.ERROK) {
              this.show1 = false; //  隐藏loading
              this.$router.push("/myInstructions");
            } else {
              this.show1 = false; //  隐藏loading
              alert(res.msg);
            }
          });
        },
        onCancel: () => {}
      }).show();
    },
    //完善信息
    wanshanInfo() {
      console.log('触发完善按钮');
      console.log(this.list.isPut, '获取此说明书发布状态1，代表发布中，此时不可编辑，不可完善，不可删除');
      if (this.list.isPut === 1) { // 判断发布中状态的操作
        this.$vux.toast.show({
          width: "60%",
          text: "发布中不可编辑！",
          type: "text",
          position: "middle",
          onHide: () => {
            // this.wantAddTel = ''
          }
        });
        return;
      };
      this.show1 = true; // 显示loading
      API._InstrucDetails(this.$route.query.instrucId).then(res => {
        this.show1 = false; //  隐藏loading
        let inData = res.content.context;
        delete inData._id;
        this.LS.setItem("_IN_DATA", JSON.parse(JSON.stringify(inData)));
        this.$router.push({
          path: "/adddesc",
          query: {
            wanshan: "200",
            instrucId: this.$route.query.instrucId,
            instrucTitle: res.content.instrucTitle,
            instrucIntro: res.content.instrucIntro
          }
        });
      });
    },
    //用户浏览自己的说明书
    lookMyInstrc() {
      this.setTempData(this.list.context);
      this.$router.push({
        path: this.list.context.path,
        query: {
          instrucId: this.$route.query.instrucId,
          tempId: this.list.context.tempId || this.list.tempId,
          instrucTitle: this.list.instrucTitle,
          // lookMyInstrc: "1", // 此时下单时候注释此行，开启下面的注释
          agin: 200 // 用于测试下单，发布需要删除本行，然后去点上面一行注释
        }
      });
    },
    // 再次编辑
    editAgain() {
      console.log('触发编辑按钮');
      console.log(this.list.isPut, '获取此说明书发布状态1，代表发布中，此时不可编辑，不可完善，不可删除');
      if (this.list.isPut === 1) { // 判断发布中状态的操作
        this.$vux.toast.show({
          width: "60%",
          text: "发布中不可编辑！",
          type: "text",
          position: "middle",
          onHide: () => {
            // this.wantAddTel = ''
          }
        });
        return;
      };
      this.setTempData(this.list.context);
      this.$router.push({
        path: this.list.context.path,
        query: {
          instrucId: this.$route.query.instrucId,
          tempId: this.list.context.tempId || this.list.tempId,
          instrucTitle: this.list.instrucTitle
        }
      });
    },
    //   说明书详情
    getDetails() {
      this.show1 = true; // 显示loading
      API._InstrucDetails(this.instrucId).then(res => {
        this.show1 = false; //  隐藏loading
        if (res.ret == API.ERROK) {
          this.list = res.content;
          //微信分享sdk
          wxApi.wxRegister(this.wxRegCallback);
          this.$previewRefresh()
        }
      });
    },
    ...mapMutations({
      setTempData: "SET_TEMP_DATA",
      set_edit: "SET_EDITABLE",
      set_preview: "SET_IS_PREVIEW",
      set_banner_height: "SET_BANNER_HEIGHT"
    }),
    // // /**
    // //  * [wxRegCallback 用于微信JS-SDK回调]
    // //  */
    // wxRegCallback() {
    //   this.wxShareTimeline();
    //   this.wxShareAppMessage();
    // },
    // /**
    //  * [wxShareTimeline 微信自定义分享到朋友圈]
    //  */
    // wxShareTimeline() {
    //   let opstion1 = {
    //     title: this.list.instrucTitle, // 分享标题
    //     link: "http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl",
    //     imgUrl: this.list.bannerImg, // 分享图标
    //     success: function() {
    //       alert("分享成功");
    //     },
    //     error: function() {
    //       alert("分享失败");
    //     }
    //   };
    //   // 将配置注入通用方法
    //   wxApi.ShareTimeline(opstion1);
    // },
    // wxShareAppMessage() {
    //   let opstion2 = {
    //     title: this.list.instrucTitle, // 分享标题
    //     desc: this.list.instrucIntro, // 分享描述
    //     link: "http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl", // 分享链接
    //     imgUrl: this.list.bannerImg, // 分享图标
    //     success: function() {
    //       alert("分享成功");
    //     },
    //     error: function() {
    //       alert("分享失败");
    //       // that.$vux.toast.show({
    //       //   width: "60%",
    //       //   text: "分享失败",
    //       //   type: "text",
    //       //   position: "middle"
    //       // });
    //     }
    //   };
    //   // 将配置注入通用方法
    //   wxApi.ShareAppMessage(opstion2);
    // }
  }
};
</script>


