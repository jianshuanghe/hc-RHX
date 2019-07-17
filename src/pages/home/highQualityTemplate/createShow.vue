<template>
  <div>
    <!--<div>tab</div>-->
    <div class="createShow">
      <div class="template-items" v-for="(item,index) in Mlist" :key="index" @click="goTempDetail(item.id)">
        <img class="templateImg" :src="item.tempImg" alt="" @click="goTempDetail(item.id)">
        <p class="templateTitle">{{item.tempName}}</p>
        <p class="templateMs">查看 {{item.pvCnt || 0}} <span class="use">使用 {{item.useCnt || 0}}</span></p>
      </div>
      <myFooter2></myFooter2>
    </div>
  </div>
</template>

<script>
  import myFooter2 from "@/components/globalModules/myFooter2";
  import * as API from "config/api";
  import {mapMutations, mapGetters} from "vuex";

  export default {
    name: "createShow",
    components: {myFooter2},
    data() {
      return {
        Mlist: []
      };
    },
    methods: {
      /**
       *更新vuex数据
       * **/
      ...mapMutations({
        setTempData: "SET_TEMP_DATA",
        set_preview: "SET_IS_PREVIEW",
        set_uinfo: "SET_UINFO"

      }),
      // 去模版详情
      goTempDetail(i) {
        this.set_preview(true);
        // this.$router.push({path:'/prodesc',query: { tempid:i }});
        API._getTempDetail(i,'').then(res => {
          if (res.ret === API.ERROK) {
            console.log(res);
            this.setTempData(res.content.context);
            this.$nextTick(() => {
              this.$router.push({
                path: this.GET_TEMP_DATA.path,
                query: {confirmEdit: API.ERROK, tempId: i}
              });
            });
          } else {
          }
        });
      },
      // 获取用户信息
      getUserInfor() {
        API._GetUserInfo(this.LS.getItem("userId")).then(res => {
          console.log(res);
          if (res.ret == API.ERROK) {
            this.uinfo = res.content;
            this.LS.setItem("uinfo", res.content);
            let isMember = false; // 是否为会员，true为会员，默认为false
            if (res.content.vipState !== 0 || res.content.vipState !== 3) { // 0代表不是会员，3代表已过期
              isMember = true;
            }
            this.LS.setItem("isMember", isMember); // 缓存会员状态
            this.set_uinfo(res.content);
          } else {
            this.$createDialog({
              type: "alert",
              content: res.msg
            }).show();
          }
        });
      }
    },
    created() {
      this.LS.removeItem('instrcName')
      this.LS.removeItem('instrcDesc')
      this.$nextTick(() => {
        this.getUserInfor();
        // 获取模版列表
        API._getTemp().then(res => {
          if (res.ret === API.ERROK) {
            this.Mlist = res.content;
            localStorage.setItem('DZtempId', this.Mlist[1].id); // 缓存用户点击的按钮
          } else {
            alert(res.msg);
          }
        });
        // 微信分享
        this.wxApiG();
      });
    },
    computed: {
      ...mapGetters(["GET_TEMP_DATA"])
    },
    mounted: function () {
      // let liL = document.getElementsByClassName("tabsItem").length;
      // document.getElementById("tabUl").style.width = 122 * liL + "px";
      // console.log(document.getElementById("tabUl").style.width);
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/index.styl';

  .use {
    display: inline-block;
    margin-left: 19px;
    font-weight: 300
  }

  .templateMs {
    font-size: 13px;
    color: #9B9B9B;
    line-height: 13px;
    font-weight: 300
  }

  .templateTitle {
    width: 100%;
    font-size: 20px;
    color: #2E2E30;
    line-height: 30px;
    margin: 20px 0 15px 0;
  }

  .templateImg {
    width: 100%;
    height: 184px;
  }

  .template-items {
    width: 100%;
    padding-bottom: 40px;
  }

  .createShow {
    padding: 15px 15px 0 15px;
    background: #fff;
    margin-top: 30px;
  }
</style>


