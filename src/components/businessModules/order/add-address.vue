<template>
  <div class="add-content">
    <ul>
      <li class="add-li">
        <label class="add-li-text">收货人</label>
        <input class="add-li-ipt" type="text" v-model="info.addrName" placeholder="名字">
        <i class="iconfont icon-tongxunlu"></i>
      </li>
      <li class="add-li">
        <label class="add-li-text">联系电话</label>
        <input class="add-li-ipt" type="number" v-model="info.addrPhone" placeholder="手机或固定电话">
      </li>
      <li class="add-li">
        <label class="add-li-text">所在地区</label>
        <input class="add-li-ipt" id="demo2" type="text" readonly :placeholder="adressDet.addrPcodeStr + adressDet.addrCcodeStr + adressDet.addrAcodeStr || '选择地址'">
        <!-- value2用来接收所选对应城市得id，映射到value属性上 -->
        <input id="value2" type="hidden">
        <i class="iconfont icon-tubiao201"></i>
      </li>
      <li class="add-li">
        <label class="add-li-text top">详细地址</label>
        <textarea class="add-li-textarea" v-model="info.address" placeholder="街道、楼层、门牌号等信息"></textarea>
      </li>
    </ul>
    <div class="add-check">
      <check-icon :value.sync="checked">默认发货地址</check-icon>
    </div>
    <!-- <router-link to="/adrManage"> -->
    <input type="button" value="保存地址" class="add-save" :disabled="!this.info.addrPhone || !this.info.addrName || !this.info.addrPcode || !this.info.addrCcode || !this.info.addrAcode || !this.info.address" @click="submit"/>
    <!-- </router-link> -->
  </div>
</template>

<script>
import * as API from "config/api";
import { autoTextarea } from "common/js/dom";
import { CheckIcon } from "vux";
import { setTimeout } from 'timers';
import LArea from '../../../common/js/LArea.js'
export default {
  name: "addAddress",
  components: {
    CheckIcon
  },
  data() {
    return {
      checked: false,
      adressDet: '',
      info: {
        addrPhone: '',
        addrName: '',
        addrPcode: '',
        addrCcode: '',
        addrAcode: '',
        address: '',
        addrState: 0,
        userId: this.LS.getItem("userId"),
      },
    };
  },
  created: function() {
    this.$nextTick(() => {
      //   addressPick
      this.addressChoose();
      if(this.$route.query.id){
        this.getAdrDet();
      }
    });
  },
  methods: {
    change() {
      console.log("111")
    },
    // submit
    submit() {
      if(this.checked){
        this.info.addrState = 1;
      } else {
        this.info.addrState = 0;
      }
      API._newAdr(this.info).then((res)=>{
        this.$vux.toast.show({
          text: res.data.msg,
          time: 1500,
          onHide: ()=>{
            this.$router.go(-1)
          }
        });
      })
    },
    // address
    addressChoose() {
      var area = new LArea();
      area.init({
        trigger: "#demo2",
        valueTo: "#value2",
        keys: {
          id: "id",
          name: "name"
        },
        type: 1,
        data: DataJson,

      });
      // success 回调是自己在lare.js中添加得
      area.success=()=>{
        let idString = $("#value2").val();
        let idArr = idString.split(",");
        this.info.addrPcode = idArr[0];
        this.info.addrCcode = idArr[1];
        this.info.addrAcode = idArr[2];
        console.log(idArr)
      }
    },
    // 地址详情
    getAdrDet() {
      API._adrDet(this.$route.query.id).then(res => {
        if (res.ret == API.ERROK) {
          this.adressDet = res.content;
          this.info.addrPhone = res.content.addrPhone;
          this.info.addrName = res.content.addrName;
          this.info.addrPcode = res.content.addrPcode;
          this.info.addrCcode = res.content.addrCcode;
          this.info.addrAcode = res.content.addrAcode;
          this.info.address = res.content.address;
          this.info.addrState = res.content.addrState;
          this.info.id = res.content.id;
          if(this.info.addrState === "1"){
            this.checked = true
          } else {
            this.checked = false
          }
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
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.add-save:disabled {
  background: #98e4d8 !important;
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

.add-save {
  width: 87vw;
  height: 14vw;
  font-size: 4.2vw;
  color: #fff;
  background: #02c2a2;
  border-radius: 1vw;
  font-weight: 90vw;
  margin: 11vw auto 11vw auto;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  line-height: 14vw;
}

.add-check {
  padding: 10px 0;
}

textarea::-webkit-input-placeholder {
  color: #BDBDBD;
}

textarea:focus {
  outline: none;
}

.add-li-textarea {
  flex-grow: 1;
  height: 60px;
  font-size: 14px;
  line-height: 20px;
}

.add-li-ipt {
  flex-grow: 1;
  height: 60px;
}

.add-li .iconfont {
  flex-basis: 16px;
  font-size: 16px;
}

.add-li-text {
  width: 60px;
  flex-basis: 60px;
  margin-right: 20px;
}

.add-li-text.top {
  align-self: flex-start;
  line-height: 22px;
}

.add-li {
  width: 100%;
  border-bottom: 1px solid #D2D2D2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #2E2E30;
}

.add-li:last-child {
  padding: 20px 0;
}

.add-content {
  width: 100%;
  padding: 0 24px;
  background: #fff;
}
</style>

