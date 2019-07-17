<template>
    <div class="aboutRhx">
        <!-- head -->
        <!-- <globalHead></globalHead> -->
        <!-- about RHX -->
        <div class="about">
            <p class="aboutTitle">关于如何秀</p>
            <p class="aboutArtcle">
                一个提供免费建站、制作电子版说明书等服务的平台，是一款移动的智能电子说明书。它可以让用户随时查看更新的产品说明书，实时联系商家，解决产品使用问题和售后维修问题，还可以提供多种场景的推广说明，助力商家移动端自主营销。
            </p>
        </div>
        <!-- RHX Help You -->
        <div class="aboutHelp">
            <p class="aboutHelpTitle">如何秀帮您 <br><span class="line"></span> </p>
            <div class="aboutHelpCont">
                <div class="aboutHelpContItems">
                    <div class="aboutHelp-icon1"><i class="iconfont icon-0"></i></div>
                    <p class="aboutHelpContTitle">0成本</p>
                    <div class="aboutHelpContArt">可以免费使用，对高昂的使用制作成本say"No"</div>
                </div>
                <div class="aboutHelpContItems">
                    <div class="aboutHelp-icon2"><i class="iconfont icon-lightningbshandian"></i></div>
                    <p class="aboutHelpContTitle">制作快</p>
                    <div class="aboutHelpContArt">3分钟就可制作完成版，并且可以随时修改更新</div>
                </div>
            </div>
            <div class="aboutHelpCont">
                <div class="aboutHelpContItems">
                    <div class="aboutHelp-icon3"><i class="iconfont icon-shipin"></i></div>
                    <p class="aboutHelpContTitle">易理解</p>
                    <div class="aboutHelpContArt">视频图文相结合，增加浏览阅读趣味</div>
                </div>
                <div class="aboutHelpContItems">
                    <div class="aboutHelp-icon4"><i class="iconfont icon-yidongdiannao"></i></div>
                    <p class="aboutHelpContTitle">不丢失</p>
                    <div class="aboutHelpContArt">3分钟就可制作完成版，并且可以随时修改更新</div>
                </div>
            </div>
            <div class="aboutHelpCont">
                <div class="aboutHelpContItems">
                    <div class="aboutHelp-icon5"><i class="iconfont icon-saomiaoerweima"></i></div>
                    <p class="aboutHelpContTitle">传播广</p>
                    <div class="aboutHelpContArt">一键生成专属的说明书二维码，多平台阅读分享</div>
                </div>
                <div class="aboutHelpContItems">
                    <div class="aboutHelp-icon6"><i class="iconfont icon-shujutongji"></i></div>
                    <p class="aboutHelpContTitle">直击用户</p>
                    <div class="aboutHelpContArt">快速联系用户，解决用户的问题，并实现数据统计</div>
                </div>
            </div>
        </div>
        <!-- 还可以解决您的以下困扰 -->
        <div class="more">
            <p class="aboutHelpTitle">还可以解决您的以下困扰 <br><span class="line"></span></p>
            <div class="moreItems">
                <img class="moreImg" src="http://style.iambuyer.com/img/moreImg1.png" alt="img">
                <div class="moreCon">
                    <p class="moreItemsTitle">成本高</p>
                    <p class="moreItemsArt">各种费用动辄数万价格昂贵</p>
                </div>
            </div>
            <div class="moreItemsRight">
                <img class="moreImg" src="http://style.iambuyer.com/img/moreImg2.png" alt="img">
                <div class="moreConRight">
                    <p class="moreItemsTitle">耗时长</p>
                    <p class="moreItemsArt">制作时间长,印制好后无法更新升级</p>
                </div>
            </div>
            <div class="moreItems">
                <img class="moreImg" src="http://style.iambuyer.com/img/moreImg3.png" alt="img">
                <div class="moreCon">
                    <p class="moreItemsTitle">难理解</p>
                    <p class="moreItemsArt">只有图文展示？音频、视频更好理解</p>
                </div>
            </div>
            <div class="moreItemsRight">
                <img class="moreImg" src="http://style.iambuyer.com/img/moreImg4.png" alt="img">
                <div class="moreConRight">
                    <p class="moreItemsTitle">易丢失</p>
                    <p class="moreItemsArt">纸质文件不易保存,易丢失</p>
                </div>
            </div>
            <div class="moreItems">
                <img class="moreImg" src="http://style.iambuyer.com/img/moreImg5.png" alt="img">
                <div class="moreCon">
                    <p class="moreItemsTitle">售后难</p>
                    <p class="moreItemsArt">售后服务难以跟进,有的甚至不能联系</p>
                </div>
            </div>
            <div class="moreItemsRight">
                <img class="moreImg" src="http://style.iambuyer.com/img/moreImg6.png" alt="img">
                <div class="moreConRight">
                    <p class="moreItemsTitle">没数据</p>
                    <p class="moreItemsArt">不知道消费者使用情况,没有数据支持</p>
                </div>
            </div>
        </div>
        <!-- hr -->
        <div class="hr"></div>
        <div class="contact">
            <p>客服热线 <a class="tel" href="tel:400-618 2288">400-618 2288</a></p>
            <p>工作时间 8:30-18:00</p>
            <p>如何秀官网 www.ruhexiu.com</p>
        </div>
        <!-- foot -->
        <myFooter></myFooter>
    </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.aboutRhx {
    background: #fff;
    float: left;
}

.contact p:nth-child(2) {
    margin: 6px 0;
}

.tel {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 12px;
}

.contact {
    width: 100%;
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 12px;
    text-align: center;
}

.hr {
    width: 100%;
    height: 1px;
    background: #F5F5F5;
    margin: 30px 0;
    float: left;
}

.moreConRight {
    text-align: right;
    order: 1;
    margin-right: 10px;
}

.moreImgRight {
    width: 90px;
    height: 90px;
    order: 2;
}

.moreCon {
    float: left;
    padding-left: 10px;
}

.moreItemsArt {
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 18px;
}

.moreItemsTitle {
    font-size: 16px;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 16px;
    margin: 29px 0 9px 0;
}

.moreImg {
    width: 90px;
    height: 90px;
    float: left;
}

.moreItems {
    width: 100%;
    // height: 90px;
    margin: 10px 0 20px 0;
    display: flex;
    float: left;
    font-family: PingFangSC-Regular;
}

.moreItemsRight {
    width: 100%;
    // height: 90px;
    margin: 10px 0 20px 0;
    display: flex;
    float: left;
    flex-direction: row-reverse;
    font-family: PingFangSC-Regular;
}

.more {
    padding: 0 40px;
}

.icon-shujutongji {
    width: 12px;
    height: 12px;
    color: #7ED321;
}

.aboutHelp-icon6 {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    opacity: 0.5;
    background: #FFFFFF;
    border: 1px solid #7ED321;
    border-radius: 50%;
}

.icon-saomiaoerweima {
    width: 12px;
    height: 12px;
    color: #FAB100;
}

.aboutHelp-icon5 {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    opacity: 0.5;
    background: #FFFFFF;
    border: 1px solid #FAB100;
    border-radius: 50%;
}

.icon-yidongdiannao {
    width: 15px;
    height: 11px;
    color: #4990E2;
}

.aboutHelp-icon4 {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    opacity: 0.5;
    background: #FFFFFF;
    border: 1px solid #4990E2;
    border-radius: 50%;
}

.aboutHelp-icon3 {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    opacity: 0.5;
    background: #FFFFFF;
    border: 1px solid #02C2A2;
    border-radius: 50%;
}

.icon-shipin {
    width: 9.2px;
    height: 12px;
    color: #02C2A2;
}

.icon-lightningbshandian {
    width: 10px;
    height: 16px;
    color: #FAB100;
}

.aboutHelpContItems {
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 15px;
}

.aboutHelpContTitle {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 16px;
    margin: 17px 0 6px 0;
}

.icon-0 {
    width: 10px;
    height: 14px;
    color: #FF4D6A;
    opacity: 1;
}

.aboutHelp-icon1 {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    opacity: 0.5;
    background: #FFFFFF;
    border: 1px solid #FF4D6A;
    border-radius: 50%;
}

.aboutHelp-icon2 {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    opacity: 0.5;
    background: #FFFFFF;
    border: 1px solid #FAB100;
    border-radius: 50%;
}

.about {
    padding: 0 20px;
}

.aboutTitle {
    width: 100%;
    font-size: $font-size-18;
    font-family: PingFangSC-Regular;
    color: #2E2E30;
    margin: 60px 0 20px 0;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
}

.aboutArtcle {
    font-family: PingFangSC-Light;
    font-size: $font-size-14;
    color: #2E2E30;
    letter-spacing: 0;
    line-height: 20px;
}

.aboutHelp {
    padding: 0 12px;
}

.aboutHelpTitle {
    width: 100%;
    font-size: $font-size-18;
    font-family: PingFangSC-Regular;
    color: #2E2E30;
    margin: 60px 0 0 0;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
}

.line {
    width: 24px;
    height: 2px;
    background: $color-2e;
    display: inline-block;
    margin: 10px 0 20px 0;
}

.aboutHelpCont {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.aboutHelpContItems {
    flex-basis: 170px;
    height: 123px;
    padding: 14px 14px 12px 14px;
    background: #FFFFFF;
    box-shadow: 0 1px 3px 0 rgba(46, 46, 48, 0.1);
    box-sizing: border-box;
}
</style>

<script>
import globalHead from "@/components/globalModules/globalHead";
import myFooter from "@/components/globalModules/myFooter";
export default {
  name: "about-rhx",
  components: { globalHead, myFooter },
  mounted: function() {
    // 微信分享
    this.wxApiG();
  }
};
</script>