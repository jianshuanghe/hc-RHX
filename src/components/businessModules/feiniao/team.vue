<template>
    <div class="jianjie">
        <div class="jianjieHead">
            <i class="heng">一</i>
            <textarea v-html="team_title" :disabled="!editable" class="jianjieTitle"></textarea>
            <i class="heng">一</i>
        </div>
        <div class="teamCont">
            <div class="teamContItem">
                <div class="itemConWrap_imgWrap">
                    <img ref="teamImg" class="teamImg" src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-03.jpg">
                </div>
                <div ref="teamText" class="teamText">
                    <p class="teamTextTitle">
                        <textarea v-html="team_name" :disabled="!editable" class="teamName"></textarea>
                        <textarea v-html="team_zhiwei" :disabled="!editable" class="teamZhiWei"></textarea>
                    </p>
                    <textarea v-html="team_ms" :disabled="!editable" class="teamMs"></textarea>
                </div>
            </div>
            <div class="teamContItem">
                <div class="itemConWrap_imgWrap">
                    <img ref="teamImg" class="teamImg" src="http://style.iambuyer.com/img/temp-feiniao-imgs/temp-feiniao-imgs-03.jpg">
                </div>
                <div ref="teamText" class="teamText">
                    <p class="teamTextTitle">
                        <textarea v-html="team_name" :disabled="!editable" class="teamName"></textarea>
                        <textarea v-html="team_zhiwei" :disabled="!editable" class="teamZhiWei"></textarea>
                    </p>
                    <textarea v-html="team_ms" :disabled="editable" class="teamMs"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "jianjie",
  //   mounted: function() {
  //     this.$nextTick(() => {
  //       window.onload = function() {
  //         let imgH = $(".teamImg").height();
  //         console.log(imgH);
  //         $(".teamText").height(imgH);
  //       };
  //     });
  //   },
  data() {
    return {
      editable: false,
      team_title: "管理团队",
      team_name: "李翔",
      team_zhiwei: "CEO",
      team_ms:
        "十年家居设计行业工作经验经验，对于中国家居行业有独特的见解，曾在海外公司担任项目负责人。"
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

textarea {
    border: 0;
    background: none !important;
}

textarea:disabled {
    background: none !important;
    -webkit-text-fill-color: #fff;
}

.teamTextTitle {
    width: 100%;
    display: flex;
}

.teamMs {
    width: 100%;
    height: 100px;
    overflow-y: auto;
    line-height: 20px;
    font-size: 14px;
    font-family: PingFang-SC-Regular;
    color: #4D4D4D !important;
    -webkit-text-fill-color: #4D4D4D !important;
    margin-top: 20px;
    background: none;
}

.teamZhiWei {
    height: 20px;
    line-height: 24px;
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    color: #4D4D4D !important;
    -webkit-text-fill-color: #4D4D4D !important;
}

.teamName {
    height: 20px;
    font-size: 16px;
    font-family: PingFang-SC-Bold;
    color: #333333 !important;
    -webkit-text-fill-color: #333333 !important;
}

.teamText {
    width: 100%;
    overflow: hidden;
    margin-top: 15px;
    padding: 15px;
    box-sizing: border-box;
    background: #F3F3F3;
}

.teamContItem {
    width: 45%;
}

.teamCont {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
}

.jianjieMs {
    width: 60%;
    padding: 15px 24px;
    line-height: 24px;
    height: auto;
    box-sizing: border-box;
    color: #fff !important;
    -webkit-text-fill-color: #fff !important;
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    text-align: center;
    border: 1px solid #fff;
    opacity: 0.7 !important;
    margin-bottom: 80px;
}

.jianjieP {
    width: 100%;
    padding: 80px 15px 0 15px;
    box-sizing: border-box;
    color: #fff !important;
    -webkit-text-fill-color: #fff !important;
    font-size: 30px;
    font-family: PingFang-SC-Medium;
    text-align: center;
}

.logo {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    margin: 0 auto;
}

.moreTxt {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 40px 0;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
}

.itemConWrap_imgWrap {
    margin-top: 0;
}

.heng {
    width: 20px;
    height: 1px;
    color: #02C2A2;
    display: inline-block;
}

.jianjieHead {
    width: 100%;
    display: flex;
    line-height: 30px;
    justify-content: center;
    margin: 40px 0 20px 0;
}

.jianjieTitle {
    width: 120px;
    height: 30px;
    color: #02C2A2 !important;
    -webkit-text-fill-color: #02C2A2 !important;
    font-size: 20px;
    font-family: PingFang-SC-Bold;
    text-align: center;
}

.jianjie {
    width: 100%;
    background: #fff;
}
</style>


