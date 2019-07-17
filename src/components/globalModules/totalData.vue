<template>
    <div class="totals">
        <div class="totalsItems">
            <p class="totalsNum">1047</p>
            <p class="totalsText">今日访问量</p>
            <p class="totalsPer">25% <i class="iconfont icon-shangsheng"></i></p>
        </div>
        <div class="totalsItems">
            <p class="totalsNum">1094</p>
            <p class="totalsText">今日分享量</p>
            <p class="totalsPer xia">40% <i class="iconfont icon-xiajiang"></i></p>
        </div>
        <div class="totalsItems">
            <p class="totalsNum">1047</p>
            <p class="totalsText">今日留言量</p>
            <p class="totalsPer ping">0 <i class="iconfont icon-yi"></i></p>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.totalsPer.ping {
    color: #02C2A2;
}

.totalsPer.xia {
    color: #FAB100;
}

.icon-yi {
    width: 10px;
    color: #02C2A2;
    float: right;
}

.icon-xiajiang {
    width: 8.5px;
    height: 11px;
    color: #FAB100;
    float: right;
}

.icon-shangsheng {
    width: 8.5px;
    height: 11px;
    color: #FF4D6A;
    float: right;
}

.totalsPer {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #FF4D6A;
}

.totalsText {
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #9B9B9B;
    margin: 6px 0 20px 0;
}

.totalsNum {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #2E2E30;
}

.totalsItems {
    width: 33.3%;
    padding: 10px 20px 10px 10px;
    box-sizing: border-box;
    margin-right: 25px;
}

.totalsItems:last-child {
    margin-right: 0;
}

.totals {
    padding: 10px 15px 0 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    background: #fff;
}
</style>

