<template>
    <div class="template">
        <div class="template-items">
            <img class="templateImg" src="http://style.iambuyer.com/img/templateImg1.png" alt="">
            <p class="templateTitle">新品介绍/活动宣传/企业个人通用</p>
            <p class="templateMs">查看 104 <span class="use">使用 4915</span></p>
        </div>
        <div class="template-items">
            <img class="templateImg" src="http://style.iambuyer.com/img/templateImg2.png" alt="">
            <p class="templateTitle">公司简介/产品介绍/商务/科技/高端/简约通用模板</p>
            <p class="templateMs">查看 104 <span class="use">使用 4915</span></p>
        </div>
        <div class="template-items">
            <img class="templateImg" src="http://style.iambuyer.com/img/templateImg3.png" alt="">
            <p class="templateTitle">新品介绍/活动宣传/企业个人通用</p>
            <p class="templateMs">查看 104 <span class="use">使用 4915</span></p>
        </div>
        <myFooter2></myFooter2>
    </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.use {
    display: inline-block;
    margin-left: 19px;
}

.templateMs {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #9B9B9B;
    line-height: 13px;
}

.templateTitle {
    width: 100%;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #2E2E30;
    line-height: 30px;
    margin: 20px 0 15px 0;
}

.templateImg {
    width: 100%;
    // height: 184px;
}

.template-items {
    width: 100%;
    margin-bottom: 40px;
}

.template {
    padding: 15px 15px 0 15px;
    background: #fff;
}
</style>

<script>
import myFooter2 from "@/components/globalModules/myFooter2";
export default {
  name: "highQualityTemplate",
  components: { myFooter2 }
};
</script>


