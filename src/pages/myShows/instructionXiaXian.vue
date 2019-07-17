<template>
    <div class="instructionFabu">
        <!-- head -->
        <globalHead></globalHead>
        <!-- top -->
        <div class="fabuCont">
            <div class="fabuImgC">
                <div class="over">
                    <span class="state">已下线</span>
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
                    <div class="yuan hui"><i class="btnItemsIcon iconfont icon-Z2 hui"></i></div>
                    <div class="editText hui">分享</div>
                </li>
            </ul>
        </div>
        <!-- 下架原因 -->
        <div class="reason">
            <div class="reasonHead"><i class="xiajia iconfont icon-z"></i>下架原因</div>
            <p class="xiaJiaReason">说明书的内容包含违禁词语说明书的内容包含违禁词语说明书的内容包含违禁词语</p>
            <p class="xiaJiaTime">下架时间 2018-05-14 10:03:02</p>
        </div>
        <!-- button -->
        <div class="fabuBtn">
            <div class="fabuButton">重新编辑</div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.state {
    position: absolute;
    top: -40px;
    right: -46px;
    width: 80px;
    height: 80px;
    transform: rotate(45deg);
    font-family: PingFangSC-Medium;
    font-size: 10px;
    color: #FFFFFF;
    line-height: 140 px;
    text-align: center;
    background: #2E2E30;
    opacity: 0.6;
}

.over {
    position: relative;
    overflow: hidden;
}

// .fabuImgC {
// width: 120px;
// height: 120px;
// position: relative;
// // overflow: hidden;
// }
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
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #2E2E30;
    line-height: 20px;
    margin: 16px 0 20px 23px;
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
export default {
  name: "instructionXiaXian",
  components: { globalHead }
};
</script>


