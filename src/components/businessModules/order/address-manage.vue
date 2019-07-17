<template>
  <div>
    <div style="marginBottom:20vw">
      <div class="adr-items" v-for="item in adressList" :key="item.id">
        <div class="dingzhi-have-adr" @click="chooseAdr(item.id)">
          <p class="dingzhi-adr-name">
            {{item.addrName}}
            <span style="margin-left:10px">{{item.addrPhone}}</span>
          </p>
          <p
            class="dingzhi-adr-dz"
          >{{item.addrPcodeStr + item.addrCcodeStr + item.addrAcodeStr+item.address}}</p>
        </div>
        <div class="add-check">
          <div class="" @click="clickCheck(item.addrState, item.id)">
            <check-icon :value.sync="item.addrState== '1'?true:false">默认发货地址</check-icon>
          </div>
          <ul class="add-check-ul">
            <li @click="edit(item.id)">修改</li>
            <li @click="del(item.id)">删除</li>
          </ul>
        </div>
        <img src="./ade-bg.png" width="100%">
        <div class="dingzhi-grey"></div>
      </div>
    </div>
    <div class="foot" @click="addAdr">添加收货地址</div>
  </div>
</template>

<script>
import * as API from "config/api";
import { CheckIcon } from "vux";
export default {
  components: {
    CheckIcon
  },
  data() {
    return {
      adressList: "",
      clickState: 1
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.adrList();
    });
  },
  methods: {
    //切换默认地址
    clickCheck(e, id) {
      console.log(e, id)
      this.clickState = Number(e)
      this.adressList.map((item,index)=>{
        if (item.id !== id){
          item.addrState = '0'
        } else {
          let state;
          if(item.addrState === '1'){
            state = 0;
            item.addrState = '0';
          } else {
            state = 1;
            item.addrState = '1';
          }
          let params = {
            addrPhone: item.addrPhone,
            addrName: item.addrName,
            addrPcode:item.addrPcode,
            addrCcode: item.addrCcode,
            addrAcode: item.addrAcode,
            address: item.address,
            addrState: state,
            userId:item.userId,
            id: item.id
          }
          API._newAdr(params).then((res)=>{
            this.$vux.toast.show({
              text: res.data.msg,
              time: 1500,
              onHide: ()=>{

              }
            });
          })
        }
      })
    },
    chooseAdr(i){
      if(this.$route.query.id){
        this.$router.push("/lijidingzhi?id="+i)
      }else {
        this.$router.push("/addAddress?id=" + i);
      }
    },
    // 地址列表
    adrList() {
      if (!this.LS.getItem("userId")) {
        this.$router.push("/tel");
      } else {
        API._getAdr(this.LS.getItem("userId")).then(res => {
          if (res.ret == API.ERROK) {
            this.adressList = res.content;
            console.log(this.adressList, '--------------this.adressList---------------')
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        });
      }
    },
    del(id) {
      API._delAdr(id).then(res => {
        this.$vux.toast.show({
          text: res.msg,
          time: 1500,
          onHide: () => {
            this.adrList();
          }
        });
      });
    },
    edit(id) {
      this.$router.push("/addAddress?id=" + id);
    },
    addAdr() {
      this.$router.push("/addAddress");
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.foot{
  width 100%
  height 40px
  background #02c2a2
  font-size 16px
  display flex
  justify-content center
  align-items center
  position fixed
  left 0
  bottom 0
  z-index 2
  color #fff
}
.add-check-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.add-check-cont {
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border: 1px solid #02c2a2;
  margin-right: 8px;
}

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
