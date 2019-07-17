<template>
    <div class="tips-cont">
        <i class="iconfont icon-chenggong"></i>
        <p class="tips-head">提交成功</p>
        <p class="tips-ms">
            您的定制信息已提交成功！<br>
            商家将会尽快与您确认定制信息，请保持电话畅通
            <br>
            您也可以在个人中心—采购订单中查看订单的具体状态
        </p>
        <div class="tips-btn" @click="go">知道了</div>
    </div>
</template>

<script>
export default {
  name: "seccess",
  methods: {
    go() {
      this.$router.push("/myPersonal");
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.tips-btn {
  width: 100%;
  line-height: 45px;
  background: #02C2A2;
  text-align: center;
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 40px;
}

.tips-ms {
  font-size: 14px;
  color: #5D5D5D;
  letter-spacing: 0;
  line-height: 20px;
}

.tips-cont {
  width: 100%;
  padding: 60px 15px;
  box-sizing: border-box;
  text-align: center;
}

.tips-head {
  width: 100%;
  font-size: 16px;
  line-height: 16px;
  color: #2E2E30;
  margin: 20px 0 8px 0;
}

.icon-chenggong {
  font-size: 40px;
  color: #02C2A2;
}
</style>

