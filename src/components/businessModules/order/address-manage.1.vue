<template>
  <div v-show="adrList.length">
    <div class="adr-items" v-for="item in adrList" :key="item.id">
      <div class="dingzhi-have-adr">
        <p class="dingzhi-adr-name">
          {{item.addrName}}
          <span style="margin-left:10px">{{item.addrPhone}}</span>
        </p>
        <p
          class="dingzhi-adr-dz"
        >{{item.addrPcodeStr + item.addrCcodeStr + item.addrAcodeStr+item.address}}</p>
      </div>
      <div class="add-check">
        <check-icon :value.sync="checked">默认发货地址</check-icon>
        <!-- <check-icon :value.sync="item.addrState == 1 ? true : false">默认发货地址</check-icon> -->
        <ul class="add-check-ul">
          <li>
            <router-link to="/addAddress">修改</router-link>
          </li>
          <li @click="del">删除</li>
        </ul>
      </div>
      <img src="./ade-bg.png" width="100%">
      <div class="dingzhi-grey"></div>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from "vux";
import * as API from "config/api";
import axios from "axios";
export default {
  components: {
    CheckIcon
  },
  data() {
    return {
      checked: true
    };
  },
  mounted() {
    this.adrList();
  },
  methods: {
    del() {},
    // 地址列表
    adrList() {
      if (!this.LS.getItem("userId")) {
        this.$router.push("/tel");
      } else {
        API._getAdr(this.LS.getItem("userId")).then(res => {
          if (res.ret == API.ERROK) {
            this.adrList = res.content;
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
a {
  color: #2E2E30;
}

img {
  display: block;
}

.add-check-ul {
  display: flex;
}

.add-check-ul li {
  margin-left: 20px;
  color: #2E2E30;
}

.add-check {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-check /deep/ .weui-icon-circle {
  font-size: 16px;
  color: #02C2A2;
}

.add-check /deep/ .weui-icon-success {
  font-size: 16px;
  color: #02C2A2;
}

.add-check /deep/ .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
  color: #02C2A2;
}

.dingzhi-grey {
  width: 100%;
  height: 10px;
  background: #f9f9f9;
}

.dingzhi-adr-name {
  margin: 15px 0 0 0;
  font-size: 16px;
  color: #2E2E30;
}

.dingzhi-adr-dz {
  margin-bottom: 15px;
  font-size: 14px;
  color: #9B9B9B;
}

.dingzhi-have-adr {
  width: 100%;
  height: 80px;
  padding: 0 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  border-bottom: 1px solid #D2D2D2;
}
</style>
