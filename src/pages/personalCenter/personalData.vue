<template>
    <div class="personalData">
        <!-- head -->
        <!-- <globalHead></globalHead> -->
        <!-- tip -->
          <p class="tips">已为您节省了 {{content.money}} 元钱了哦</p>
          <!-- data -->
          <div class="totals">
              <div class="totalsItems">
                  <p class="totalsNum">{{content.toDayPvCnt}}</p>
                  <p class="totalsText">今日访问量</p>
                  <p class="totalsPer">{{toDayPvCntCompared}} <i class="iconfont" :class="pvState>1 ? 'icon-yi' : (pvState=1?'icon-shangsheng':'icon-xiajiang')"></i></p>
              </div>
              <div class="totalsItems">
                  <p class="totalsNum">{{content.toDayShareCnt}}</p>
                  <p class="totalsText">今日分享量</p>
                  <p class="totalsPer xia">{{toDayShareCntCompared}} <i class="iconfont" :class="shareState>1 ? 'icon-yi' : (shareState=1?'icon-shangsheng':'icon-xiajiang')"></i></p>
              </div>
              <div class="totalsItems">
                  <p class="totalsNum">{{content.toDayMsgCnt}}</p>
                  <p class="totalsText">今日留言量</p>
                  <p class="totalsPer ping">{{toDayMsgCntCompared}} <i class="iconfont" :class="msgState>1 ? 'icon-yi' : (msgState=1?'icon-shangsheng':'icon-xiajiang')"></i></p>
              </div>
          </div>
          <!-- echart -->
          <div class="echart">
            <button-tab class="echartTab">
              <button-tab-item selected @click.native="dayLine">日</button-tab-item>
              <button-tab-item @click.native="weekLine">周</button-tab-item>
              <button-tab-item @click.native="monthLine">月</button-tab-item>
            </button-tab>
            <div class="echartLine">
                <IEcharts :option="line"></IEcharts>
            </div>
          </div>
          <!-- productList -->
          <div class="decCont" v-for="(items,index) in content.instrucList" :key="items.instrucId">
            <div class="rankBox">
              <p class="">第{{index + 1}}名</p>
            </div>
              <div class="fabuCont">
                  <div class="fabuImgC">
                      <div class="over">
                          <span class="state">已上线</span>
                          <router-link :to="{ path: '/instructionFabu', query: { instrucId: items.instrucId }}"><img class="fabuImg" :src="items.bannerImg" alt="img"></router-link>
                      </div>
                  </div>
                  <div class="fabuContArt">
                      <p class="fabuTitle">{{items.instrucTitle}}</p>
                      <p class="fabuMs">{{items.instrucIntro}}</p>
                      <p class="fabuDate">更新于 {{items.createTime}}</p>
                  </div>
              </div>
              <div class="dataAcc">
                  <div class="dataAccCont">
                      <div class="dataAccContItems">
                          <p class="dataAccNum">{{items.pvCnt}}</p>
                          <p class="dataAccMs">访问总量</p>
                      </div>
                      <div class="dataAccContItems">
                          <p class="dataAccNum">{{items.likeCnt}}</p>
                          <p class="dataAccMs">点赞总量</p>
                      </div>
                      <div class="dataAccContItems">
                          <p class="dataAccNum">{{items.shareCnt}}</p>
                          <p class="dataAccMs">分享总量</p>
                      </div>
                      <div class="dataAccContItems">
                          <p class="dataAccNum">{{items.msgCnt}}</p>
                          <p class="dataAccMs">留言总量</p>
                      </div>
                  </div>
              </div>
          </div>
          <!-- footer2 -->
          <myFooter2></myFooter2>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';
.rankBox{
  position: absolute;
  z-index: 9999;
  background: #02c2a2;
  right 3vw;
  margin-top 7vw;
  /* top: 2vw; */
  width: 13vw;
  height: 5vw;
  border-radius: 2vw;
}
.rankBox>p{
    position: relative;
    width: 100%;
    text-align: center;
    line-height: 5vw;
    color: #fff;
  }
.decCont {
  width: 100%;
  float: left;
}

.vux-button-tab-item {
  background: #D4FDF7;
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #2E2E30;
}

.vux-button-group > a.vux-button-group-current {
  background: #02C2A2;
  font-family: PingFangSC-Medium;
  font-size: 12px;
}

//
.totalsPer.ping {
  color: #02C2A2;
}

.totalsPer.xia {
  color: #FAB100;
}

.icon-yi {
  width: 10px;
  // color: #02C2A2;
  float: right;
}

.icon-xiajiang {
  width: 8.5px;
  height: 11px;
  // color: #FAB100;
  float: right;
}

.icon-shangsheng {
  width: 8.5px;
  height: 11px;
  // color: #FF4D6A;
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

.personalData {
  background: $color-f9;
}

//
.dataAccContItems:after {
  content: '';
  width: 1px;
  height: 24px;
  border-right: 1px solid #E2E2E2;
  position: relative;
  top: -20px;
  left: -20px;
}

.dataAccContItems:first-child:after {
  border: 0;
}

.dataAccMs {
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #9B9B9B;
  letter-spacing: 0;
  line-height: 12px;
}

.dataAccNum {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #02C2A2;
  letter-spacing: 0;
  line-height: 16px;
  margin-bottom: 8px;
}

.dataAccCont {
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  box-shadow: 0 -1px 0 0 #F5F5F5;
}

.state {
  position: absolute;
  top: -40px;
  right: -46px;
  width: 80px;
  height: 80px;
  background: #FAB100;
  transform: rotate(45deg);
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #FFFFFF;
  line-height: 140 px;
  text-align: center;
}

.over {
  position: relative;
  overflow: hidden;
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
  width: 43vw;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
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
  margin-top: 10px;
  display: flex;
  background: $color-fff;
}

// echart
.echartLine {
  height: 300px;
}

.echart {
  width: 100%;
  background: #fff;
  float: left;
  margin-bottom: 10px;
}

.echartTab span.on {
  background: #02C2A2;
  color: #fff;
}

.echartTab span {
  height: 24px;
  line-height: 24px;
  width: 33.33333333%;
  border-radius: 34px;
}

.echartTab {
  height: 24px;
  background: #D4FDF7;
  border-radius: 34px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: center;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #2E2E30;
  justify-content: space-around;
  margin: 15px;
}

// tips
.tips {
  // height: 30px;
  line-height: 30px;
  padding: 0 18px;
  font-family: PingFangSC-Light;
  font-size: 12px;
  color: #FAB100;
  background: #FEEEC7;
  // margin-top: 44px;
}
</style>

<script>
import * as API from "config/api";
import * as main from "../../main";
import globalHead from "@/components/globalModules/globalHead";
import IEcharts from "vue-echarts-v3";
import myFooter2 from "@/components/globalModules/myFooter2";
import { ButtonTab, ButtonTabItem } from "vux";
export default {
  name: "personalData",
  components: {
    globalHead,
    IEcharts,
    myFooter2,
    ButtonTab,
    ButtonTabItem
  },
  data: () => ({
    type: 1, //0代表说明书 1代表用户
    state: 0, //0代表日 1代表周 2代表月
    content: {},
    line: {
      color: ["#38A5FF", "#FF4D6A", "#FAB100", "#02C2A2"],
      tooltip: {
        trigger: "axis",
        textStyle: {
          // fontSize: this.getDpr(),
        },
        axisPointer: {
          type: "line",
          lineStyle: {
            // 使用深浅的间隔色
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#fff" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#02C2A2" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          }
        }
      },
      legend: {
        data: ["访问量", "点赞量", "分享量", "留言量"],
        textStyle: {
          color: "#2E2E30",
          fontFamily: "PingFangSC-Regular"
          // fontSize: this.getDpr()
        }
      },
      dataZoom: [
        {
          show: false,
          realtime: true,
          start: 60,
          end: 100
        },
        {
          type: "inside",
          realtime: true,
          start: 60,
          end: 100
        }
      ],
      grid: {
        left: "0",
        top: "14%",
        right: "0",
        bottom: "15%"
      },
      xAxis: {
        type: "category",
        boundaryGap: ["10", "10"],
        splitLine: {
          show: true,
          lineStyle: {
            // 使用深浅的间隔色
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#fff" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#E2E2E2" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          }
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#9B9B9B"
          }
        },
        axisLabel: {
          margin: 20, //刻度标签与轴线之间的距离
          color: "#9B9B9B",
          // fontSize: this.getDpr(),
          fontFamily: "PingFangSC-Light"
          // rotate:-40
        },
        axisTick: {
          show: false
        },
        data: []
      },
      yAxis: {
        show: false,
        type: "value",
        axisLine: {
          show: false
        }
      },
      series: [
        {
          name: "访问量",
          type: "line",
          smooth: true,
          data: []
        },
        {
          name: "点赞量",
          type: "line",
          smooth: true,
          data: []
        },
        {
          name: "分享量",
          type: "line",
          smooth: true,
          data: []
        },
        {
          name: "留言量",
          type: "line",
          smooth: true,
          data: []
        }
      ]
    }
  }),
  created: function() {
    this.$nextTick(() => {
      // 请求接口
      this.getTotals();
      this.getLine();
      // echart 字体适配
      this.line.tooltip.textStyle.fontSize = this.getDpr();
      this.line.legend.textStyle.fontSize = this.getDpr();
      this.line.xAxis.axisLabel.fontSize = this.getDpr();
      // 微信分享
      this.wxApiG();
    });
  },
  computed: {
    pvState() {
      let splitNum = this.content.toDayPvCntCompared.split("_", 2)[0];
      if (splitNum == 0) {
        return 0;
      } else if (splitNum == 1) {
        return 1;
      } else {
        return 2;
      }
    },
    shareState() {
      let splitNum = this.content.toDayShareCntCompared.split("_", 2)[0];
      if (splitNum == 0) {
        return 0;
      } else if (splitNum == 1) {
        return 1;
      } else {
        return 2;
      }
    },
    msgState() {
      let splitNum = this.content.toDayMsgCntCompared.split("_", 2)[0];
      if (splitNum == 0) {
        return 0;
      } else if (splitNum == 1) {
        return 1;
      } else {
        return 2;
      }
    },
    toDayPvCntCompared() {
      return this.content.toDayPvCntCompared.split("_", 2)[1];
    },
    toDayShareCntCompared() {
      return this.content.toDayShareCntCompared.split("_", 2)[1];
    },
    toDayMsgCntCompared() {
      return this.content.toDayMsgCntCompared.split("_", 2)[1];
    }
  },
  methods: {
    dayLine() {
      this.state = 0;
      this.getLine();
    },
    weekLine() {
      this.state = 1;
      this.getLine();
    },
    monthLine() {
      this.state = 2;
      this.getLine();
    },
    //   获取用户数据统计
    getTotals() {
      API._GetUserDataInfo().then(res => {
        if (res.ret == API.ERROK) {
          this.content = res.content;
        } else {
          this.$vux.toast.show({
            type: "warn",
            text: "服务器出问题拉！",
            time: 1500
          });
        }
      });
    },
    // 折线图
    getLine() {
      this.line.series[0].data ={};
      this.line.series[1].data = {};
      this.line.series[2].data = {};
      this.line.series[3].data = {};
      API._LineData(this.LS.getItem("userId"), this.type, this.state).then(
        res => {
          if (res.ret == API.ERROK) {
            this.line.xAxis.data = res.content.dateList.map(function(str) {
              return str.replace("&&", "\n");
            });
            // //测试数据S
            // let content = {};
            // if (this.state===0){
            //   console.log('仅七天')
            //   content={
            //     likelist: [
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0
            //     ],
            //     "sharelist": [
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0
            //     ],
            //     "pvlist": [
            //       3,
            //       4,
            //       5,
            //       6,
            //       7,
            //       8,
            //       0
            //     ],
            //     "dateList": [
            //       "2019-05-15",
            //       "2019-05-16",
            //       "2019-05-17",
            //       "2019-05-18",
            //       "2019-05-19",
            //       "2019-05-20",
            //       "2019-05-21"
            //     ],
            //     "msglist": [
            //       2,
            //       2,
            //       2,
            //       2,
            //       2,
            //       2,
            //       21
            //     ]
            //   }
            // } else if (this.state===1){
            //   console.log('30天')
            //   content={
            //     "likelist": [
            //       0,
            //       2,
            //       0,
            //       78,
            //       0,
            //       12,
            //       0
            //     ],
            //     "sharelist": [
            //       1,
            //       0,
            //       3,
            //       0,
            //       0,
            //       5,
            //       0
            //     ],
            //     "pvlist": [
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0
            //     ],
            //     "dateList": [
            //       "2019-04-08&&2019-04-14",
            //       "2019-04-15&&2019-04-21",
            //       "2019-04-22&&2019-04-28",
            //       "2019-04-29&&2019-05-05",
            //       "2019-05-06&&2019-05-12",
            //       "2019-05-13&&2019-05-19",
            //       "2019-05-20&&2019-05-26"
            //     ],
            //     "msglist": [
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       21
            //     ]
            //   }
            // } else if (this.state===2){
            //   console.log('90天')
            //   content={
            //     "likelist": [
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0
            //     ],
            //     "sharelist": [
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0,
            //       0
            //     ],
            //     "pvlist": [
            //       7,
            //       7,
            //       7,
            //       7,
            //       7,
            //       7,
            //       7
            //     ],
            //     "dateList": [
            //       "2018-11-01&&2018-11-30",
            //       "2018-12-01&&2018-12-31",
            //       "2019-01-01&&2019-01-31",
            //       "2019-02-01&&2019-02-28",
            //       "2019-03-01&&2019-03-31",
            //       "2019-04-01&&2019-04-30",
            //       "2019-05-01&&2019-05-31"
            //     ],
            //     "msglist": [
            //       8,
            //       8,
            //       8,
            //       8,
            //       8,
            //       8,
            //       21
            //     ]
            //   }
            // }
            // //测试数据E
            // console.log(content, '--------------------折线图----------------')
            this.line.series[0].data = res.content.pvlist;
            this.line.series[1].data = res.content.likelist;
            this.line.series[2].data = res.content.sharelist;
            this.line.series[3].data = res.content.msglist;
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: "服务器出问题拉！",
              time: 1500
            });
          }
        }
      );
    }
  }
};
</script>


