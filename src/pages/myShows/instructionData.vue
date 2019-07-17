<template>
    <div class="data">
        <div class="tipsBox-rhx" v-if="Number(content.instrucRank) <= 100">
          <p class="tips" v-if="uinfoNumber === 1">太棒了，{{this.$route.query.instrucTitle}}的综合实力已超越{{content.instrucCompared}}的说明书，排名前{{content.instrucRank}}哦</p>
          <p class="tips" v-if="uinfoNumber === 2">不错哦，{{this.$route.query.instrucTitle}}的综合实力已超越{{content.instrucCompared}}的说明书，排名前{{content.instrucRank}}哦</p>
          <p class="tips" v-if="uinfoNumber === 3">好可惜，{{this.$route.query.instrucTitle}}的综合实力已超越{{content.instrucCompared}}的说明书，排名前{{content.instrucRank}}哦</p>
          <p class="tips" v-if="uinfoNumber === 4">太差劲了，{{this.$route.query.instrucTitle}}的综合实力已超越{{content.instrucCompared}}的说明书，排名前{{content.instrucRank}}哦</p>
        </div>
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
              <button-tab-item selected @click.native="dayLine">近7天</button-tab-item>
              <button-tab-item @click.native="weekLine">近30天</button-tab-item>
              <button-tab-item @click.native="monthLine">近90天</button-tab-item>
            </button-tab>
            <!-- echart -->
            <div class="echartLine">
                <IEcharts :option="line"></IEcharts>
            </div>
        </div>
        <!-- 累计数据 -->
        <div class="dataAcc">
            <div class="dataAccHead">
                <div class="dataAccHeadText"><i class="iconfont icon-Z6"></i>累计数据</div>
            </div>
            <div class="dataAccCont">
                <div class="dataAccContItems">
                    <p class="dataAccNum">{{content.pvCnt}}</p>
                    <p class="dataAccMs">访问总量</p>
                </div>
                <div class="dataAccContItems">
                    <p class="dataAccNum">{{content.likeCnt}}</p>
                    <p class="dataAccMs">点赞总量</p>
                </div>
                <div class="dataAccContItems">
                    <p class="dataAccNum">{{content.shareCnt}}</p>
                    <p class="dataAccMs">分享总量</p>
                </div>
                <div class="dataAccContItems">
                    <p class="dataAccNum">{{content.msgCnt}}</p>
                    <p class="dataAccMs">留言总量</p>
                </div>
            </div>
        </div>
        <!-- foor -->
        <!-- foot -->
        <myFooter2></myFooter2>
    </div>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/index.styl';

.dataAccHeadText {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FFFFFF;
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

// echart
.echartLine {
  height: 300px;
}

.echart {
  width: 100%;
  background: #fff;
  float: left;
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

// 累计数据
.icon-Z6 {
  width: 14px;
  height: 12px;
  display: inline-block;
  margin-right: 9px;
}

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
  color: #fff;
  letter-spacing: 0;
  line-height: 12px;
}

.dataAccNum {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #fff;
  letter-spacing: 0;
  line-height: 16px;
  margin-bottom: 8px;
}

.dataAccCont {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dataAccHead {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 26px;
  color: #fff;
}

.dataAcc {
  padding: 16px 15px 10px 15px;
  background: #02C2A2;
  margin: 20px 0 0 0;
  float: left;
  width: 100%;
  box-sizing: border-box;
}

// tips
.tips {
  // height: 30px;
  line-height: 5vw;
  padding: 2vw;
  font-family: PingFangSC-Light;
  font-size: 3.5vw;
  color: #FAB100;
  background: #FEEEC7;
  // margin-top: 44px;
}

.data {
  background: $color-f9;
}
</style>

<script>
import * as API from "config/api";
import myFooter2 from "@/components/globalModules/myFooter2";
import IEcharts from "vue-echarts-v3";
import { ButtonTab, ButtonTabItem } from "vux";
export default {
  name: "instructionData",
  components: {
    IEcharts,
    myFooter2,
    ButtonTab,
    ButtonTabItem
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
  data() {
    return {

      uinfoNumber:'', // 统计分析中百分数
      instrucId: this.$route.query.instrucId, //说明书id
      type: 0, //0代表说明书 1代表用户
      state: 0, //0代表日 1代表周 2代表月
      content: {},
      line: {
        color: ["#38A5FF", "#FF4D6A", "#FAB100", "#02C2A2"],
        tooltip: {
          trigger: "axis",
          textStyle: {
            fontSize: ".64578rem",
            lineHeight: ".64578rem"
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
            fontFamily: "PingFangSC-Regular",
            fontSize: 12
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
            margin: 10, //刻度标签与轴线之间的距离
            color: "#9B9B9B",
            fontFamily: "PingFangSC-Light",
            fontSize: 24
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
            // data: [120, 132, 101, 134, 90, 230, 210],
            data: []
          },
          {
            name: "点赞量",
            type: "line",
            smooth: true,
            // data: [220, 182, 191, 234, 290, 330, 310],
            data: []
          },
          {
            name: "分享量",
            type: "line",
            smooth: true,
            // data: [150, 232, 201, 154, 190, 330, 410],
            data: []
          },
          {
            name: "留言量",
            type: "line",
            smooth: true,
            // data: [320, 332, 301, 334, 390, 330, 320],
            data: []
          }
        ]
      }
    };
  },
  created: function() {
    this.$nextTick(() => {
      // 请求接口
      this.getLine();
      this.getTotals();
      // echart 字体适配
      this.line.tooltip.textStyle.fontSize = this.getDpr();
      this.line.legend.textStyle.fontSize = this.getDpr();
      this.line.xAxis.axisLabel.fontSize = this.getDpr();
      // 微信分享
      this.wxApiG();
    });
  },
  methods: {
    ConUinfoNumber(data) {
      if (parseFloat(data.instrucCompared) >= parseFloat('90%')) {
        this.uinfoNumber = 1
      } else if (parseFloat(data.instrucCompared) >= parseFloat("60%")&&parseFloat(data.instrucCompared) < parseFloat("90%")){
        this.uinfoNumber = 2
      } else if (parseFloat(data.instrucCompared) >= parseFloat("20%")&&parseFloat(data.instrucCompared) < parseFloat("60%")){
        this.uinfoNumber = 3
      } else if (parseFloat(data.instrucCompared) >= parseFloat("0%")&&parseFloat(data.instrucCompared) < parseFloat("20%")){
        this.uinfoNumber = 4
      }
    },
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
    // 说明书统计信息
    getTotals() {
      API._GetInstrucDataInfo(this.instrucId).then(res => {
        if (res.ret == API.ERROK) {
          this.content = res.content;
          // this.id = res.content;
          this.ConUinfoNumber(this.content)
        } else {
          this.$vux.toast.show({
            type: "warn",
            text: res.msg,
            time: 1500
          });
        }
      });
    },
    // line
    getLine() {
      API._LineData(this.instrucId, this.type, this.state).then(res => {
        if (res.ret == API.ERROK) {
          this.line.xAxis.data = res.content.dateList.map(function(str) {
            return str.replace("&&", "\n");
          });
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
      });
    }
  }
};
</script>


