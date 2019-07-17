<template>
    <div class="tips-cont">
        <i class="iconfont icon-shibai"></i>
        <!-- 网络连接失败 -->
        <div v-show="state">
            <p class="tips-head">网络连接失败</p>
            <p class="tips-ms">
                网络连接失败，请保证您的网络已连接～
            </p>
            <div class="tips-btn">重新提交</div>
        </div>
        <!-- 提交失败 -->
        <div v-show="!state">
            <p class="tips-head">提交失</p>
            <p class="tips-ms">
                您提交的内容包含违禁词语，请修改后 <br>
重新提交，谢谢合作！
            </p>
            <div class="tips-flex">
                <div class="tips-backEdit">返回修改</div>
                <div class="tips-backIndex">返回首页</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "fail",
    data() {
        return {
            state: true
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';

.tips-backIndex{
    width 164px
    line-height 45px
    font-size: 16px;
    color: #02C2A2;
    border: 1px solid #E2E2E2;
}

.tips-backEdit{
    width 164px
    line-height 45px
    background: #02C2A2;
    font-size: 16px;
    color: #FFFFFF;
}

.tips-flex{
    width 100%
    display flex
    justify-content space-between
    align-items center
    margin-top 60px
}

.tips-btn{
    width 100%
    line-height 45px
    background: #02C2A2;
    text-align center
    font-size: 16px;
    color: #FFFFFF;
    margin-top 40px
}

.tips-ms{
    font-size: 14px;
    color: #5D5D5D;
    letter-spacing: 0;
    line-height: 20px;
}

.tips-cont{
    width 100%
    padding 60px 15px
    box-sizing border-box
    text-align center
}
.tips-head{
    width 100%
    font-size: 16px;
    line-height: 16px;
    color: #2E2E30;
    margin 20px 0 8px 0
}
.icon-shibai{
    font-size 40px
    color #FF4D6A
}
</style>

