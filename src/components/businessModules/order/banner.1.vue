<template>
  <div>
    <div class="paddingB bg-fff">
      <!-- banner -->
      <banner v-show="bannerShow" ref="banner"></banner>
      <!-- 产品展示 -->
      <orderShow v-show="zshiShow" ref="comP"></orderShow>
      <!-- 产品解析 -->
      <orderJX v-show="jxShow" ref="comPJX"></orderJX>
      <!-- 产品细节 -->
      <orderXJ v-show="xjShow" ref="comPXJ"></orderXJ>
      <!-- 产品尺码 -->
      <orderSize v-show="cmShow" ref="comPSIZE"></orderSize>
      <!-- 产品展示 -->
      <!-- <div class="order-show">
        <textarea
          :class="{ 'text': !disabled, 'order-product-title': true}"
          ref="text"
          :disabled="disabled"
        >产品展示</textarea>
        <input
          type="file"
          id="choseImgFile"
          class="hide"
          @change="getThisFile"
          ref="choseImgFile"
          accept="image/*"
        >
        <img class="order-banner-img" src="./order1.png">
        <ManageCom
          class="manage-product"
          v-show="!disabled"
          @manage-this-item="showManage"
          @finsh-manage-this-item="showFinishMg"
        ></ManageCom>
      </div>-->
      <!-- 产品解析 -->
      <!-- <div class="order-show">
        <textarea
          :class="{ 'text': !disabled, 'order-product-title': true}"
          ref="text"
          :disabled="disabled"
        >产品解析</textarea>
        <img class="order-banner-img" src="./order1.png">
        <textarea
          :class="{ 'text': !disabled, 'order-product-ms': true}"
          ref="text"
          :disabled="disabled"
        >这里是您的产品具体说明，请详细说明哦，这里是您的产品具体说明，请详细说明哦～</textarea>
        <img class="order-banner-img" src="./order1.png">
        <textarea
          :class="{ 'text': !disabled, 'order-product-ms': true}"
          ref="text"
          :disabled="disabled"
        >这里是您的产品具体说明，请详细说明哦，这里是您的产品具体说明，请详细说明哦～</textarea>
        <ManageCom
          class="manage-product"
          v-show="!disabled"
          @manage-this-item="showManage1"
          @finsh-manage-this-item="showFinishMg1"
        ></ManageCom>
      </div>-->
      <!-- 产品细节 -->
      <!-- <div class="order-show">
        <textarea
          :class="{ 'text': !disabled, 'order-product-title': true}"
          ref="text"
          :disabled="disabled"
        >产品细节</textarea>
        <textarea
          :class="{ 'text': !disabled, 'order-product-ms': true}"
          ref="text"
          :disabled="disabled"
        >这里是您的产品具体说明，请详细说明哦，这里是您的产品具体说明，请详细说明哦～</textarea>
        <img class="order-banner-img" src="./order-img2.png">
        <ManageCom
          class="manage-product"
          v-show="!disabled"
          @manage-this-item="showManage1"
          @finsh-manage-this-item="showFinishMg1"
        ></ManageCom>
      </div>-->
      <!-- 产品尺码 -->
      <!-- <div class="order-show">
        <textarea
          :class="{ 'text': !disabled, 'order-product-title': true}"
          ref="text"
          :disabled="disabled"
        >产品尺码</textarea>
        <img class="order-banner-img" src="./order3.png">
        <ManageCom
          class="manage-product"
          v-show="!disabled"
          @manage-this-item="showManage1"
          @finsh-manage-this-item="showFinishMg1"
        ></ManageCom>
      </div>-->
      <!-- 价格明细 -->
      <div class="order-show" v-show="mxShow">
        <div
          v-for="(item,index) in modulesData"
          :key="index"
          v-if="modulesData[index].type === 'MONEY_A'"
        >
          <!-- 删除 -->
          <!-- <div class="order-close" v-show="!disabled" @click="delp($event,index)">
            <i class="iconfont icon-L1"></i>
          </div> -->
          <p class="order-product-title">{{item.title}}</p>
          <!-- <textarea
            :class="{ 'text': !disabled, 'order-product-title': true}"
            ref="text"
            :disabled="disabled"
          >价格明细</textarea>-->
          <div class="qipi">
            <label class="qipi-danwei">起批量单位</label>
            <input
              class="qipi-danwei-text"
              :disabled="isBusiness"
              type="text"
              maxlength="3"
              v-model="item.unit"
              placeholder="请输入单位（字限为三）"
            >
          </div>
          <div class="prici-mxC">
            <ul class="prici-mxC-name">
              <li>价格(元)</li>
              <li>最小起批量</li>
            </ul>
            <ul class="prici-mxC-name2" v-for="(i,index) in item.moneyList" :key="index" v-if="!priceMXShow && i.minCount>0">
              <li><input class="order-table-ipt" :disabled="isBusiness" type="text" placeholder="价格1" v-model="i.money"></li>
              <li class="order-price-qp-cont">
                <input
                  class="order-price-qp"
                  :disabled="isBusiness"
                  type="text"
                  placeholder="0"
                  v-model="i.minCount"
                >
                <!-- <span class="order-price-qp-icon">-</span> -->
                <span class="order-price-qp">{{item.unit}}</span>
                <!-- <input
                  class="order-price-qp"
                  :disabled="isBusiness"
                  type="text"
                  placeholder="50"
                  v-model="i.maxCount"
                > -->
              </li>
            </ul>
            <ul class="prici-mxC-name2" v-for="(i,index) in GET_MONEY_LIST" :key="index" v-if="priceMXShow">
              <li><input class="order-table-ipt" :disabled="isBusiness" type="text" placeholder="价格" v-model="i.money"></li>
              <li class="order-price-qp-cont">
                <input
                  class="order-price-qp"
                  :disabled="isBusiness"
                  type="text"
                  placeholder="0"
                  v-model="i.minCount"
                >
                <!-- <span class="order-price-qp-icon">-</span> -->
                <span class="order-price-qp">{{item.unit}}</span>
                <!-- <input
                  class="order-price-qp"
                  :disabled="isBusiness"
                  type="text"
                  placeholder="50"
                  v-model="i.maxCount"
                > -->
              </li>
            </ul>
          </div>
          <ul class="qipi-miaoshu">
          <!-- <ul class="qipi-miaoshu" v-if="item.moneyList[0].minCount"> -->
            <li>说明：</li>
            <li v-if="item.moneyList[0].minCount">
              <p>价格与起批量一一对应，并且起批量依次增大</p>
              <p v-for="(i,index) in item.moneyList" :key="index" v-if="i.minCount>0 && i.money">
                起批量：{{i.minCount}}
                <span v-if="index<2 && item.moneyList[index+1].minCount>i.minCount">-{{item.moneyList[index+1]?item.moneyList[index+1].minCount-1:i.minCount-1}}{{item.unit}}</span>
                <span v-else>以上</span>
                <span v-if="index>1">以上</span> 
                商品价格为：{{i.money}}元</p>
            </li>
            <li v-else>
              <p>价格与起批量一 一对应，并且起批量依次增大</p>
              <p v-for="(i,index) in GET_MONEY_LIST" :key="index" v-if="i.minCount>0 && i.money">
                起批量：{{i.minCount}}
                <span v-if="index<2 && GET_MONEY_LIST[index+1].minCount>i.minCount">-{{GET_MONEY_LIST[index+1]?GET_MONEY_LIST[index+1].minCount-1:i.minCount-1}}{{item.unit}}</span>
                <span v-else>以上</span>
                <span v-if="index>1">以上</span> 
                商品价格为：{{i.money}}元</p>
              <!-- <p v-for="(i,index) in GET_MONEY_LIST" :key="index" v-if="i.minCount>0">起批量：{{i.minCount}}
                <span v-if="item.moneyList[item.moneyList.length-1].minCount>=i.minCount">-{{GET_MONEY_LIST[index+1]?GET_MONEY_LIST[index+1].minCount-1:i.minCount-1}} {{item.unit}}</span>
                <span v-else>以上</span> 商品价格为：{{i.money}}元
              </p> -->
            </li>
          </ul>
          <!-- <ul class="qipi-miaoshu" v-if="item.moneyList.length==2">
            <li>说明：</li>
            <li v-if="item.moneyList[0].minCount">
              <p>价格与起批量一一对应，并且起批量依次增大</p>
              <p v-for="(i,index) in item.moneyList" :key="index" v-if="i.minCount>0 && i.money">
                起批量：{{i.minCount}}
                <span v-if="index<1 && item.moneyList[index+1].minCount>i.minCount">-{{item.moneyList[index+1]?item.moneyList[index+1].minCount-1:i.minCount-1}}{{item.unit}}</span>
                <span v-else>以上</span>
                <span v-if="index>1">以上</span> 
                商品价格为：{{i.money}}元</p>
            </li>
            <li v-else>
              <p>价格与起批量一一对应，并且起批量依次增大</p>
              <p v-for="(i,index) in GET_MONEY_LIST" :key="index" v-if="i.minCount>0 && i.money">
                起批量：{{i.minCount}}
                <span v-if="index<1 && GET_MONEY_LIST[index+1].minCount>i.minCount">-{{GET_MONEY_LIST[index+1]?GET_MONEY_LIST[index+1].minCount-1:i.minCount-1}}{{item.unit}}</span>
                <span v-else>以上</span>
                <span v-if="index>1">以上</span> 
                商品价格为：{{i.money}}元</p>
            </li>
          </ul>
          <ul class="qipi-miaoshu" v-else>
            <li>说明：</li>
            <li v-if="item.moneyList[0].minCount">
              <p>价格与起批量一一对应，并且起批量依次增大</p>
              <p v-for="(i,index) in item.moneyList" :key="index" v-if="i.minCount>0 && i.money">起批量：{{i.minCount}}{{item.unit}}以上商品价格为：{{i.money}}元</p>
            </li>
            <li v-else>
              <p>价格与起批量一一对应，并且起批量依次增大</p>
              <p v-for="(i,index) in GET_MONEY_LIST" :key="index" v-if="i.minCount>0 && i.money">起批量：{{i.minCount}}{{item.unit}}以上商品价格为：{{i.money}}元</p>
            </li>
          </ul> -->
        </div>
      </div>
      <!-- 出货周期 -->
      <div class="order-show" v-show="zqShow">
        <div
          v-for="(item,index) in modulesData"
          :key="index"
          v-if="modulesData[index].type === 'TABLE_A'"
        >
          <!-- 删除 -->
          <div class="order-close" v-show="!disabled" @click="delp($event,index)">
            <i class="iconfont icon-L1"></i>
          </div>
          <p class="order-product-title">{{item.title}}</p>
          <!-- <textarea
            :class="{ 'text': !disabled, 'order-product-title': true}"
            ref="text"
            :disabled="disabled"
          >出货周期</textarea>-->
          <table class="order-table">
            <tr v-for="(i,index) in item.dataList" :key="index">
              <td class="order-table-tdW">{{i.key}}</td>
              <td>
                <input
                  class="order-table-ipt"
                  :disabled="isBusiness"
                  type="text"
                  placeholder="0-200"
                  v-model="i.value"
                >
              </td>
            </tr>
            <!-- <tr>
              <td class="order-table-tdW">预计时间(天)</td>
              <td>
                <input class="order-table-ipt" :disabled="isBusiness" type="text" placeholder="7">
              </td>
            </tr>-->
          </table>
        </div>
      </div>
      <!-- 实力保障 -->
      <div class="order-show" v-show="bzShow">
        <div
          v-for="(item,index) in modulesData"
          :key="index"
          v-if="modulesData[index].type === 'SELECT_B'"
        >
          <p class="order-product-title">{{item.title}}</p>
          <ul class="order-shili-ul">
            <li class="order-show-cube" v-for="(i,index) in BZdataList" :key="index">
              <div>{{i.value}}</div>
              <div class="order-close" v-show="!disabled" @click="delItem(index)">
                <i class="iconfont icon-L1"></i>
              </div>
            </li>
          </ul>
          <!-- 删除 -->
          <div class="order-close" v-show="!disabled" @click="delp($event,index)">
            <i class="iconfont icon-L1"></i>
          </div>
        </div>
        <!-- 管理项目 -->
        <ManageCom
          class="manage-product"
          ref="shili"
          v-show="!disabled"
          @add-this-item="showPicker">
        ></ManageCom>
      </div>
      <!-- 支付方式 -->
      <div class="order-show" v-show="payShow">
        <div
          v-for="(item,index) in modulesData"
          :key="index"
          v-if="modulesData[index].type === 'SELECT_A'"
        >
          <!-- 删除 -->
          <div class="order-close" v-show="!disabled" @click="delp($event,index)">
            <i class="iconfont icon-L1"></i>
          </div>
          <p class="order-product-title">{{item.title}}</p>
          <ul class="order-shili-ul">
            <li class="order-show-cube" v-for="(i,index) in item.dataList" :key="index">
              <!-- <cube-select v-model="payvalue" :options="payoptions" @change="change"></cube-select> -->
              <div>{{i.value}}</div>
              <div class="order-close" v-show="!disabled" @click="delItem2(index)">
                <i class="iconfont icon-L1"></i>
              </div>
            </li>
            <!-- <li class="order-show-cube">
              <cube-select v-model="payvalue" :options="payoptions" @change="change"></cube-select>
              <div class="order-close" v-show="!disabled" @click="del($event)">
                <i class="iconfont icon-L1"></i>
              </div>
            </li>
            <li class="order-show-cube">
              <cube-select v-model="payvalue" :options="payoptions" @change="change"></cube-select>
              <div class="order-close" v-show="!disabled" @click="del($event)">
                <i class="iconfont icon-L1"></i>
              </div>
            </li>-->
          </ul>
        </div>
        <!-- 管理项目 -->
        <ManageCom
          class="manage-product"
          ref="payMethord"
          v-show="!disabled"
          @add-this-item="showPicker2">
        ></ManageCom>
      </div>
      <!-- 发货地 -->
      <div class="order-show" style="padding-bottom: 30px" v-show="adrShow">
        <div
          v-for="(item,index) in modulesData"
          :key="index"
          v-if="modulesData[index].type === 'TEXT_A'"
        >
          <!-- 删除 -->
          <div class="order-close" v-show="!disabled" @click="delp($event,index)">
            <i class="iconfont icon-L1"></i>
          </div>
          <p class="order-product-title">{{item.title}}</p>
          <input
            v-for="(i,index) in item.dataList"
            :key="index"
            class="demo2"
            type="text"
            :disabled="disabled"
            placeholder="请输入您的联系地址"
            v-model="i.value"
          >
        </div>
        <!-- 管理项目 -->
        <!-- <ManageCom class="manage-product" ref="address" v-show="!disabled"></ManageCom> -->
        <ManageCom class="manage-product" ref="address" v-show="false"></ManageCom>
      </div>
      <!-- 定制信息 -->
      <div class="order-dingzhi paddingB">
        <!-- title -->
        <p class="order-dingzhi-title bg-fff">定制信息</p>
        <!-- 基本信息 -->
        <DZbase v-show="baseShow" ref="base"></DZbase>
        <!-- 图片选择 -->
        <DZimgc1 v-show="imgShow" ref="DZimgc1"></DZimgc1>
        <!-- 样式选择 -->
        <DZimgc2 v-show="styleShow" ref="DZimgc2"></DZimgc2>
        <!-- 采购数量 多选-->
        <!-- <DZcaigou v-show="numShow" ref="DZcaigou"></DZcaigou> -->
        <!-- 采购数量 单选-->
        <DZcaigou v-show="DShow" ref="DZcaigou"></DZcaigou>
        <!-- 添加照片 -->
        <DZimgc3 v-show="addImgShow" ref="DZimgc3"></DZimgc3>
        <!-- <div class="dingzhi-base bg-fff">
          <p class="dingzhi-head">添加照片</p>
          <p class="dingzhi-addimg-ms">照片最多可添加三张哦～</p>
          <div class="uploadImg">
            <cube-upload
              class="feedUpload"
              :multiple="false"
              :action="action"
              :max="3"
              :processFile="processFile"
              :simultaneous-uploads="1"
              @file-success="sucHandler"
              @file-removed="delHandler"
            />
          </div>
          <div class="order-close dingzhi-icon-top" v-show="!disabled" @click="del($event)">
            <i class="iconfont icon-L1"></i>
          </div>
        </div> -->
        <!-- 备注说明 -->
        <div v-show="beizShow">
          <div
            class="dingzhi-base bg-fff"
            v-for="(item,index) in modulesData"
            :key="index"
            v-if="modulesData[index].type === 'INPUT_TEXT_A'"
          >
            <!-- <textarea
              :class="{ 'text': !disabled, 'dingzhi-head': true}"
              ref="text"
              :disabled="disabled"
            >备注说明</textarea>-->
            <textarea :class="{'dingzhi-head':true, 'text':!disabled}" maxlength="5" v-model="beizhu.title" :disabled="disabled"></textarea>
            <textarea
              class="dingzhi-beizhu"
              cols="30"
              rows="10"
              placeholder="可填写您的特殊要求"
              :disabled="!disabled"
              v-model="beizhu.content"
            ></textarea>
            <!-- 删除 -->
            <div class="order-close dingzhi-icon-top" v-show="!disabled" @click="del($event,index)">
              <i class="iconfont icon-L1"></i>
            </div>
          </div>
        </div>
        <!-- footer logo -->
        <myFooter></myFooter>
      </div>
    </div>
    <!-- 立即定制 button -->
    <div v-show="!look">
      <div class="order-dz-btn" v-show="!agin" ref="edit" @click="goEdit">去编辑</div>
      <div class="order-dz-btn" v-show="agin" @click="dingzhi">立即定制</div>
      <div class="ediTingBtmBtns" ref="ediTingBtmBtns" id="ediTingBtmBtns">
        <div class="ediTingBtmBtnsItems" @click="saveDraft" v-show="!againEditting">
          <a>
            <i class="iconfont icon-shiyong01"></i> &nbsp;存为草稿
          </a>
        </div>
        <div class="ediTingBtmBtnsItems" @click="goShow">
          <a>
            <i class="iconfont icon-L2"></i> &nbsp;预览
          </a>
        </div>
        <div class="ediTingBtmBtnsItems goLine"  @click="addDesc" v-show="!againEditting">
          <a>发布上线</a>
        </div>
        <div class="ediTingBtmBtnsItems goLine" @click="addDesc" v-show="againEditting">
          <a>更新一波</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { autoTextarea } from "common/js/dom";
import { mapMutations, mapGetters } from "vuex";
import myFooter from "@/components/globalModules/myFooter2";
import ManageCom from "components/businessModules/businessPublicModule/moduleManageBtns";
import changeImgTips from "components/businessModules/businessPublicModule/changeImgTips";
import manageModuleItemsTips from "components/businessModules/businessPublicModule/manageModuleItemsTips";
import orderShow from "components/businessModules/productDescTitleImgModule/orderShow";
import orderJX from "components/businessModules/productDescTitleImgModule/orderJX";
import orderXJ from "components/businessModules/productDescTitleImgModule/orderXJ";
import orderSize from "components/businessModules/productDescTitleImgModule/orderSize";
import DZbase from "components/businessModules/productDescTitleImgModule/DZbase";
import DZimgc1 from "components/businessModules/productDescTitleImgModule/DZimgchoose1";
import DZimgc2 from "components/businessModules/productDescTitleImgModule/DZimgchoose2";
import DZimgc3 from "components/businessModules/productDescTitleImgModule/DZimgchoose3";
import DZcaigou from "components/businessModules/productDescTitleImgModule/DZcaigou";
import banner from "components/businessModules/productDescTitleImgModule/banner";
import * as API from "config/api";
import lrz from "lrz";
import { setTimeout } from 'timers';
export default {
  name: "order",
  components: {
    ManageCom,
    myFooter,
    changeImgTips,
    manageModuleItemsTips,
    orderShow,
    orderJX,
    orderXJ,
    orderSize,
    DZbase,
    DZimgc1,
    DZimgc2,
    DZimgc3,
    DZcaigou,
    banner
  },
  data() {
    return {
      // priceMXShow: this.$route.query.agin || this.$route.query.update,
      priceMXShow: this.$route.query.confirmEdit,
      look: false,
      DShow: false,
      danx1: '',
      danx2: '',
      minCount: '',
      bannerShow: true,
      zshiShow: true,
      jxShow: true,
      xjShow: true,
      cmShow: true,
      mxShow: true,
      zqShow: true,
      bzShow: true,
      payShow: true,
      adrShow: true,
      baseShow: true,
      imgShow: true,
      styleShow: true,
      numShow: true,
      addImgShow: true,
      beizShow: true,
      instrucCustType: '',
      // 价格明细
      // moneyList: [
      //   {money:"",minCount:""},
      //   {money:"",minCount:""},
      //   {money:"",minCount:""}
      // ],
      // 提交订单数据
      orderSubmit: {
        instrucId: '',
        userId: this.LS.getItem('userId'),
        orderSpMoney: 0,
        orderYfMoney: 0,
        orderDjMoney: 0,
        orderSpCount: 0,
        receivPcode: "110000",
        receivCcode: "110100",
        receivAcode: "110101",
        receivName: "北京天安门",
        receivUser: "姜家成",
        receivPhone: "18611874477",
        expressPcode: "110000",
        expressCcode: "110100",
        context: {
          modules: []
        }
      },
      // 提交备注
      beizhu: {
        content: "",
        title: "备注说明",
        type: "INPUT_TEXT_A"
      },
      // 是否是再来一单
      agin: false,
      //再次回来编辑的标记
      againEditting: false,
      BZselectList: [],
      BZselected: [],
      BZdataList: [],
      PAYselectList: [],
      PAYselectListed: [],
      PAYdataList: [],
      // 回填数据
      modulesEdit: "",
      /* 根数据 */ 
      rootData: {},
      /*模板原始值*/
      TEMP_ROOT_DATA: "",
      modulesData: "",
      //备份数据
      BAK_DATA: "",
      bannerImg: "http://style.iambuyer.com/img/mi-temp-imgs-01.jpg",
      isBusiness: true,
      isCust: false,
      value: "产品展示",
      action: "http://img01.iambuyer.com/imgup/upLoad/fileUpload",
      disabled: false, // 是否不可编辑
      compLogo: "",
      files: [],
      options: [
        "7天内发货",
        "15天内发货",
        "30天内发货",
        "15天包换",
        "买家保障"
      ],
      value: "7天内发货",
      payoptions: ["支付宝", "网上银行", "信用卡"],
      payvalue: "支付宝",
      selected: "3",
      options: [
        {
          label: "Option1",
          value: "1"
        }
      ],
      showDel: false,
      numberVal: "1",
      // 修改定制信息时候的地址信息
      editAddList:{}
    };
  },
  computed: {
    ...mapGetters([
      "GET_TEMP_DATA",
      "GET_EDITABLE",
      "GET_UINFO",
      "GET_IS_PREVIEW",
      "GET_BANNER_HEIGHT",
      "GET_MODULE_ICON",
    ]),
    GET_MONEY_LIST: {
      get() {
        return this.$store.state.moneyList
      },
      set(val) {
        this.$store.commit('setML', val)
      }
    },
    // 产品展示
    CPshow: function() {
      return this.modulesData.filter(item => {
        return item.type === "IMG_A";
      });
    },
    CPjiexi: function() {
      return this.modulesData.filter(item => {
        return item.type === "IMG_CONTENT_A";
      });
    },
    CPxijie: function() {
      return this.modulesData.filter(item => {
        return item.type === "IMG_B";
      });
    },
    // 定制信息
    INPUT_TEXT_A: function() {
      if(this.$route.query.orderId){
        return this.modulesEdit.filter(item => {
          return item.type === "INPUT_TEXT_A";
        });
      } else {
        return this.modulesData.filter(item => {
          return item.type === "INPUT_TEXT_A";
        });
      }
    },
    INPUT_TABLE_A: function() {
      if(this.$route.query.orderId){
        return this.modulesEdit.filter(item => {
          return item.type === "INPUT_TABLE_A";
        });
      } else {
        return this.modulesData.filter(item => {
          return item.type === "INPUT_TABLE_A";
        });
      }
    },
    INPUT_CHECK_A: function() {
      if(this.$route.query.orderId){
        return this.modulesEdit.filter(item => {
          return item.type === "INPUT_CHECK_A";
        });
      } else {
        return this.modulesData.filter(item => {
          return item.type === "INPUT_CHECK_A";
        });
      }
    },
    INPUT_CHECK_B: function() {
      if(this.$route.query.orderId){
        return this.modulesEdit.filter(item => {
          return item.type === "INPUT_CHECK_B";
        });
      } else {
        return this.modulesData.filter(item => {
          return item.type === "INPUT_CHECK_B";
        });
      }
      // return this.modulesData.filter(item => {
      //   return item.type === "INPUT_CHECK_B";
      // });
    },
    INPUT_TABLE_B: function() {
      if(this.$route.query.orderId){
        return this.modulesEdit.filter(item => {
          return item.type === "INPUT_TABLE_B";
        });
      } else {
        return this.modulesData.filter(item => {
          return item.type === "INPUT_TABLE_B";
        });
      }
      // return this.modulesData.filter(item => {
      //   return item.type === "INPUT_TABLE_B";
      // });
    },
    INPUT_IMG_A: function() {
      if(this.$route.query.orderId){
        return this.modulesEdit.filter(item => {
          return item.type === "INPUT_IMG_A";
        });
      } else {
        return this.modulesData.filter(item => {
          return item.type === "INPUT_IMG_A";
        });
      }
      // return this.modulesData.filter(item => {
      //   return item.type === "INPUT_IMG_A";
      // });
    }
  },
  watch: {
    GET_EDITABLE(v) {
      if (v === true) {
        this.editable = true;
      } else {
        this.editable = false;
      }
    },
    // 单选
    danx1: 'ValueChange',
    danx2: 'ValueChange',
  },
  beforeCreate() {
    if (this.$route.query.agin || this.$route.query.update) {
      if(this.$route.query.orderId){
        this.orderId = this.$route.query.orderId;
        this.LS.setItem("orderId",this.$route.query.orderId)
        // 订单回填
        API._caigouDetail(this.orderId).then(res => {
          if (res.ret == API.ERROK) {
            this.modulesEdit = res.content.context.modules;
            let myContent = res.content;
            // 定制信息
            setTimeout(()=>{
              this.$refs.base.mi_title_stitle_img = this.INPUT_TABLE_A[0];
              this.$refs.DZimgc1.mi_title_stitle_img = this.INPUT_CHECK_A[0];
              this.$refs.DZimgc2.mi_title_stitle_img = this.INPUT_CHECK_B[0];
              this.$refs.DZimgc3.mi_title_stitle_img = this.INPUT_IMG_A[0];
              this.$refs.DZcaigou.mi_title_stitle_img = this.INPUT_TABLE_B[0];
              this.beizhu = this.INPUT_TEXT_A[0];
              // s收货地址
              this.editAddList.addrName = myContent.receivUser
              this.editAddList.addrPhone = myContent.receivPhone
              this.editAddList.receivPcode = myContent.addrPcode;
              this.editAddList.receivCcode = myContent.addrCcode;
              this.editAddList.receivAcode = myContent.addrAcode;
              this.editAddList.addrPcodeStr = myContent.receivPcodeStr
              this.editAddList.addrCcodeStr = myContent.receivCcodeStr
              this.editAddList.addrAcodeStr = myContent.receivAcodeStr
              this.editAddList.address = myContent.receivName
              this.editAddList.id = 1
            },1000)
          } else {
            this.$vux.toast.show({
              type: "warn",
              text: res.msg,
              time: 1500
            });
          }
        });
      }
      console.log("入口为下单/修改")
      
      // 入口为下单/修改订单
      // API._InstrucDetails(this.$route.query.tempId).then(res => {
      API._InstrucDetails(this.$route.query.instrucId).then(res => {
        this.rootData = JSON.parse(JSON.stringify(res.content));
        this.orderSubmit.instrucId = JSON.parse(JSON.stringify(res.content.instrucId));
        this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context));
        this.modulesData = JSON.parse(
          JSON.stringify(res.content.context.tempCon.modules)
        );
        this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
        this.BAK_DATA = JSON.parse(
          JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA)))
        );
        console.log("是否为可编辑状态：" + this.GET_EDITABLE);
        this.goShow();
        this.agin = true;
        this.renderIf()
        // 是否显示采购数量
        this.DShow = true;
        let OL = this.LS.getItem("orderList")
        let lh = this.LS.getItem("orderList").length
        for(let i=0; i<lh; i++) {
          if(OL[i].type === "INPUT_TABLE_B"){
            this.$refs.DZcaigou.mi_title_stitle_img = OL[i]
          }
        }
        // 实力保障
        for (let i = 0; i < this.modulesData.length; i++) {
          // 备注 
          if(this.modulesData[i].type === "INPUT_TEXT_A"){
            this.beizhu = this.modulesData[i]
          }
          // 最小起批
          if(this.modulesData[i].type === "MONEY_A"){
            this.minCount = this.modulesData[i].moneyList[0].minCount || 0
          }
          // 采购选项 获取默认选中
          if(this.modulesData[i].type === "INPUT_CHECK_A"){
            let list = this.modulesData[i].dataList
            let curList = list.map(item=>{
              let checkT;
              if(item.select){
                checkT = item.title
              }
              return checkT
            })
            console.log(curList)
            this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key += curList[0]
          }
          // 采购选项 获取默认选中
          if(this.modulesData[i].type === "INPUT_CHECK_B"){
            let list = this.modulesData[i].dataList
            let curList = list.map(item=>{
              let checkT;
              if(item.select){
                checkT = item.title
              }
              return checkT
            })
            console.log(curList)
            this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key += curList[0]
          }
          // 采购选项 INPUT_CHECK_A
          if(this.modulesData[i].type === "INPUT_CHECK_A"){
            let list = this.modulesData[i].dataList
            let curList = list.map(item=>{
              let obj={
                text: '',
                value: ''
              };
              obj.text = item.title;
              obj.value = item.title;
              return obj
            })
            this.$refs.DZcaigou.value1 = curList
          }
          if(this.modulesData[i].type === "INPUT_CHECK_B"){
            let list = this.modulesData[i].dataList
            let curList = list.map(item=>{
              let obj={
                text: '',
                value: ''
              };
              obj.text = item.title;
              obj.value = item.title;
              return obj
            })
            this.$refs.DZcaigou.value2 = curList
          }
          if (this.modulesData[i].type === "SELECT_B") {
            // 获取可选项
            this.BZselectList = this.modulesData[i].selectList.map(e => {
              // 将数组转换为数组对象
              return { value: e };
            });
            // 获取已选项
            this.BZdataList = this.modulesData[i].dataList;
          }
        }
        // 支付方式
        for (let i = 0; i < this.modulesData.length; i++) {
          if (this.modulesData[i].type === "SELECT_A") {
            this.PAYselectList = this.modulesData[i].selectList.map(e => {
              return { value: e };
            });
            // 获取已选项
            this.PAYdataList = this.modulesData[i].dataList;
          }
        }
        setTimeout(()=>{
          this.$refs.banner.banner = this.TEMP_ROOT_DATA.tempCon.banner;
          this.$refs.comP.mi_title_stitle_img = this.CPshow[0];
          this.$refs.comPJX.mi_title_stitle_img = this.CPjiexi[0];
          this.$refs.comPXJ.mi_title_stitle_img = this.CPxijie[0];
          this.$refs.comPSIZE.mi_title_stitle_img = this.CPshow[1];
          // 定制信息
          this.$refs.base.mi_title_stitle_img = this.INPUT_TABLE_A[0];
          this.$refs.DZimgc1.mi_title_stitle_img = this.INPUT_CHECK_A[0];
          this.$refs.DZimgc2.mi_title_stitle_img = this.INPUT_CHECK_B[0];
          this.$refs.DZimgc3.mi_title_stitle_img = this.INPUT_IMG_A[0];
          this.$refs.DZcaigou.mi_title_stitle_img = this.INPUT_TABLE_B[0];
        },800)
        // 微信分享
        // this.wxApiG();
      });
    } else if (this.$route.query.confirmEdit) {
      // 入口为模板选择
      API._getTempDetail(this.$route.query.tempId, "").then(res => {
        // this.orderSubmit.instrucId = JSON.parse(JSON.stringify(res.content.instrucId));
        this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context));
        this.instrucCustType = res.content.instrucCustType
        this.modulesData = JSON.parse(
          JSON.stringify(res.content.context.tempCon.modules)
        );
        this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
        this.BAK_DATA = JSON.parse(
          JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA)))
        );
        this.renderIf()
        console.log("是否为可编辑状态：" + this.GET_EDITABLE);
        // 实力保障
        for (let i = 0; i < this.modulesData.length; i++) {
          if(this.modulesData[i].type === "INPUT_TEXT_A"){
            this.beizhu = this.modulesData[i]
          }
          if (this.modulesData[i].type === "SELECT_B") {
            // 获取可选项
            this.BZselectList = this.modulesData[i].selectList.map(e => {
              // 将数组转换为数组对象
              return { value: e };
            });
            // 获取已选项
            this.BZdataList = this.modulesData[i].dataList;
          }
        }
        // 支付方式
        for (let i = 0; i < this.modulesData.length; i++) {
          if (this.modulesData[i].type === "SELECT_A") {
            this.PAYselectList = this.modulesData[i].selectList.map(e => {
              return { value: e };
            });
            // 获取已选项
            this.PAYdataList = this.modulesData[i].dataList;
          }
        }
        this.$refs.banner.banner = this.TEMP_ROOT_DATA.tempCon.banner;
        this.$refs.comP.mi_title_stitle_img = this.CPshow[0];
        this.$refs.comPJX.mi_title_stitle_img = this.CPjiexi[0];
        this.$refs.comPXJ.mi_title_stitle_img = this.CPxijie[0];
        this.$refs.comPSIZE.mi_title_stitle_img = this.CPshow[1];
        // 定制信息
        this.$refs.base.mi_title_stitle_img = this.INPUT_TABLE_A[0];
        this.$refs.base.isCus = true;
        this.$refs.DZimgc1.mi_title_stitle_img = this.INPUT_CHECK_A[0];
        this.$refs.DZimgc2.mi_title_stitle_img = this.INPUT_CHECK_B[0];
        this.$refs.DZimgc3.mi_title_stitle_img = this.INPUT_IMG_A[0];
        // this.$refs.DZcaigou.mi_title_stitle_img = this.INPUT_TABLE_B[0];
        // 微信分享
        // this.wxApiG();
      });
    } else if (
      this.$route.query.instrucId &&
      this.$route.query.tempId &&
      !this.$route.query.wxId
    ) {
      // 入口为再次编辑
      console.log("入口为编辑");
      API._InstrucDetails(this.$route.query.instrucId).then(res => {
        this.rootData = JSON.parse(JSON.stringify(res.content));
        this.orderSubmit.instrucId = JSON.parse(JSON.stringify(res.content.instrucId));
        this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context));
        this.modulesData = JSON.parse(
          JSON.stringify(res.content.context.tempCon.modules)
        );
        this.renderIf()
        this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
        this.BAK_DATA = JSON.parse(
          JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA)))
        );
        console.log("是否为可编辑状态：" + this.GET_EDITABLE);
        // this.goShow();
        this.agin = true;
        this.againEditting = true;
        // 实力保障
        for (let i = 0; i < this.modulesData.length; i++) {
          if(this.modulesData[i].type === "INPUT_TEXT_A"){
            this.beizhu = this.modulesData[i]
          }
          if (this.modulesData[i].type === "SELECT_B") {
            // 获取可选项
            this.BZselectList = this.modulesData[i].selectList.map(e => {
              // 将数组转换为数组对象
              return { value: e };
            });
            // 获取已选项
            this.BZdataList = this.modulesData[i].dataList;
          }
        }
        // 支付方式
        for (let i = 0; i < this.modulesData.length; i++) {
          if (this.modulesData[i].type === "SELECT_A") {
            this.PAYselectList = this.modulesData[i].selectList.map(e => {
              return { value: e };
            });
            // 获取已选项
            this.PAYdataList = this.modulesData[i].dataList;
          }
        }
        setTimeout(()=>{
          this.$refs.banner.banner = this.TEMP_ROOT_DATA.tempCon.banner;
          this.$refs.comP.mi_title_stitle_img = this.CPshow[0];
          this.$refs.comPJX.mi_title_stitle_img = this.CPjiexi[0];
          this.$refs.comPXJ.mi_title_stitle_img = this.CPxijie[0];
          this.$refs.comPSIZE.mi_title_stitle_img = this.CPshow[1];
          // 定制信息
          this.$refs.base.mi_title_stitle_img = this.INPUT_TABLE_A[0];
          this.$refs.DZimgc1.mi_title_stitle_img = this.INPUT_CHECK_A[0];
          this.$refs.DZimgc2.mi_title_stitle_img = this.INPUT_CHECK_B[0];
          this.$refs.DZimgc3.mi_title_stitle_img = this.INPUT_IMG_A[0];
          this.$refs.base.isCus = true;
          // this.$refs.DZcaigou.mi_title_stitle_img = this.INPUT_TABLE_B[0];
          // 微信分享
          // this.wxApiG();
        },500)
      });
    } else if (this.$route.query.wxId) {
      console.log("beforeCreate入口为分享");
      // if(this.$route.query.orderId){
      //   this.LS.setItem("orderId",this.$route.query.orderId)
      // }
      // // API._InstrucDetails(this.$route.query.tempId).then(res => {
      // API._InstrucDetails(this.$route.query.instrucId).then(res => {
      //   this.rootData = JSON.parse(JSON.stringify(res.content));
      //   this.orderSubmit.instrucId = JSON.parse(JSON.stringify(res.content.instrucId));
      //   this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context));
      //   this.modulesData = JSON.parse(
      //     JSON.stringify(res.content.context.tempCon.modules)
      //   );
      //   this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
      //   this.BAK_DATA = JSON.parse(
      //     JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA)))
      //   );
      //   console.log("是否为可编辑状态：" + this.GET_EDITABLE);
      //   this.goShow();
      //   this.agin = true;
      //   this.renderIf()
      //   // 是否显示采购数量
      //   this.DShow = true;
      //   let OL = this.LS.getItem("orderList")
      //   let lh = this.LS.getItem("orderList").length
      //   for(let i=0; i<lh; i++) {
      //     if(OL[i].type === "INPUT_TABLE_B"){
      //       this.$refs.DZcaigou.mi_title_stitle_img = OL[i]
      //     }
      //   }
      //   // 实力保障
      //   for (let i = 0; i < this.modulesData.length; i++) {
      //     // 备注 
      //     if(this.modulesData[i].type === "INPUT_TEXT_A"){
      //       this.beizhu = this.modulesData[i]
      //     }
      //     // 最小起批
      //     if(this.modulesData[i].type === "MONEY_A"){
      //       this.minCount = this.modulesData[i].moneyList[0].minCount || 0
      //     }
      //     // 采购选项 获取默认选中
      //     if(this.modulesData[i].type === "INPUT_CHECK_A"){
      //       let list = this.modulesData[i].dataList
      //       let curList = list.map(item=>{
      //         let checkT;
      //         if(item.select){
      //           checkT = item.title
      //         }
      //         return checkT
      //       })
      //       console.log(curList)
      //       this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key += curList[0]
      //     }
      //     // 采购选项 获取默认选中
      //     if(this.modulesData[i].type === "INPUT_CHECK_B"){
      //       let list = this.modulesData[i].dataList
      //       let curList = list.map(item=>{
      //         let checkT;
      //         if(item.select){
      //           checkT = item.title
      //         }
      //         return checkT
      //       })
      //       console.log(curList)
      //       this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key += curList[0]
      //     }
      //     // 采购选项 INPUT_CHECK_A
      //     if(this.modulesData[i].type === "INPUT_CHECK_A"){
      //       let list = this.modulesData[i].dataList
      //       let curList = list.map(item=>{
      //         let obj={
      //           text: '',
      //           value: ''
      //         };
      //         obj.text = item.title;
      //         obj.value = item.title;
      //         return obj
      //       })
      //       this.$refs.DZcaigou.value1 = curList
      //     }
      //     if(this.modulesData[i].type === "INPUT_CHECK_B"){
      //       let list = this.modulesData[i].dataList
      //       let curList = list.map(item=>{
      //         let obj={
      //           text: '',
      //           value: ''
      //         };
      //         obj.text = item.title;
      //         obj.value = item.title;
      //         return obj
      //       })
      //       this.$refs.DZcaigou.value2 = curList
      //     }
      //     if (this.modulesData[i].type === "SELECT_B") {
      //       // 获取可选项
      //       this.BZselectList = this.modulesData[i].selectList.map(e => {
      //         // 将数组转换为数组对象
      //         return { value: e };
      //       });
      //       // 获取已选项
      //       this.BZdataList = this.modulesData[i].dataList;
      //     }
      //   }
      //   // 支付方式
      //   for (let i = 0; i < this.modulesData.length; i++) {
      //     if (this.modulesData[i].type === "SELECT_A") {
      //       this.PAYselectList = this.modulesData[i].selectList.map(e => {
      //         return { value: e };
      //       });
      //       // 获取已选项
      //       this.PAYdataList = this.modulesData[i].dataList;
      //     }
      //   }
      //   this.$refs.banner.banner = this.TEMP_ROOT_DATA.tempCon.banner;
      //   this.$refs.comP.mi_title_stitle_img = this.CPshow[0];
      //   this.$refs.comPJX.mi_title_stitle_img = this.CPjiexi[0];
      //   this.$refs.comPXJ.mi_title_stitle_img = this.CPxijie[0];
      //   this.$refs.comPSIZE.mi_title_stitle_img = this.CPshow[1];
      //   // 定制信息
      //   this.$refs.base.mi_title_stitle_img = this.INPUT_TABLE_A[0];
      //   this.$refs.DZimgc1.mi_title_stitle_img = this.INPUT_CHECK_A[0];
      //   this.$refs.DZimgc2.mi_title_stitle_img = this.INPUT_CHECK_B[0];
      //   this.$refs.DZimgc3.mi_title_stitle_img = this.INPUT_IMG_A[0];
      //   // this.$refs.DZcaigou.mi_title_stitle_img = this.INPUT_TABLE_B[0];
      //   // 微信分享
      //   // this.wxApiG();
      // });
      //获取说明书数据
      API._UserSeeInstrucDetails(
        this.$route.query.instrucId,
        this.$route.query.wxId
      ).then(res => {
        if (res.ret == API.ERROK) {
          this.rootData = JSON.parse(JSON.stringify(res.content));
          this.orderSubmit.instrucId = JSON.parse(JSON.stringify(res.content.instrucId));
          this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context));
          this.INSTRC_ROOT_DATA = JSON.parse(JSON.stringify(res.content));
          console.log(this.TEMP_ROOT_DATA);
          this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
          // this.againEditEntry(false);
          // setTimeout(() => {
          //   // this.temp_preview()
          //   this.editable = false
          //   this.set_edit(false)
          //   this.TEMP_ROOT_DATA.tempCon.editable = false
          // }, 500)
          // this.editable = false
          // this.$refs.confirm.style.bottom = '-1.173333rem'
          // document.getElementById('confirm').style.bottom = '-1.173333rem'
        }
      });
    }
  },
  mounted() {
    let jsonstr =
      '{"modules":[{"type":"INPUT_TABLE_A","title":"基本信息","dataList":[{"key1":"四字为限","value":"请输入","key2":"四字为限"},{"key1":"参数","value":"请输入","key2":"单位"},{"key1":"参数","value":"请输入","key2":"单位"}]},{"type":"INPUT_CHECK_A","title":"图片选择","dataList":[{"imgUrl":"http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png","title":"约5个字限","select":true},{"imgUrl":"http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png","title":"白色","select":false},{"imgUrl":"http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png","title":"白色","select":false}]},{"type":"INPUT_CHECK_B","title":"样式选择","dataList":[{"imgUrl":"http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-06.png","title":"标题文字1","content":"这里是关于图片的具体描述信息，这里是关于图片的具体描述信息","select":true},{"imgUrl":"http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-06.png","title":"标题文字2","content":"这里是关于图片的具体描述信息，这里是关于图片的具体描述信息","select":false},{"imgUrl":"http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-06.png","title":"标题文字3","content":"这里是关于图片的具体描述信息，这里是关于图片的具体描述信息","select":false}]},{"type":"INPUT_TABLE_A","title":"采购数量","dataList":[{"key":"文字1","count":"0"},{"key":"文字2","count":"0"}]},{"type":"INPUT_IMG_A","title":"添加照片","content":"照片最多可添加三张哦","dataList":[]},{"type":"INPUT_TEXT_A","title":"备注说明","content":"可填写您的特殊要求"}]}';
    let arrJson = jQuery.parseJSON(jsonstr); //JSON.parse(jsonstr); 可以将json字符串转换成json对象 JSON.stringify(jsonobj); //可以将json对象转换成json对符串
    console.log(arrJson);
    this.disabled = false;
    this.isBusiness = false;
    this.$refs.payMethord.show.isShowManageBtn = false;
    this.$refs.shili.show.isShowManageBtn = false;
    this.$refs.address.show.isShowManageBtn = false;
    this.$refs.base.show.isShowManageBtn = false;
    // this.$refs.caigou.show.isShowManageBtn = false;
    this.$refs.ediTingBtmBtns.style.bottom = "0";
    this.$refs.edit.style.bottom = "-1.173333rem";
    // 清楚cube的upload默认上传的multiple属性，解决在安卓环境调取不到相机问题
    $(".feedUpload")
      .find("input")
      .removeAttr("multiple");
    // 切换编辑状态
    setTimeout(() => {
      let test = document.querySelectorAll("textarea");
      for (let i = 0; i < test.length; i++) {
        autoTextarea(test[i]);
      }
    }, 500);
    if (this.$route.query.wxId || this.$route.query.lookMyInstrc) {
      this.goShow();
      this.look = true;
      //说明书访问统计
      API._instrucDate('0', this.$route.query.instrucId).then((res) => {
      })

    }
  },
  methods: {
    // 单选
    ValueChange(){
      // if(this.danx1 && this.danx2 && this.$route.query.agin){
      if(this.$route.query.agin || this.$route.query.update){
        this.DShow = true;
        this.DShow = true;
        this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key = this.danx1 + this.danx2;
      }
    },
    // 渲染
    renderIf(){
      let arr = [];
      let lh = this.modulesData.length;
      if(this.TEMP_ROOT_DATA.tempCon.banner.length){
        this.banner = true;
      }
      for(let i=0; i<lh; i++){
        arr[arr.length] = this.modulesData[i].type
      }
      if(arr.indexOf("IMG_A") < 0){
        this.zshiShow = false
      }
      if(arr.indexOf("IMG_CONTENT_A") < 0){
        this.jxShow = false
      }
      if(arr.indexOf("IMG_B") < 0){
        this.xjShow = false
      }
      if(arr.indexOf("IMG_A") < 0){
        this.cmShow = false
      }
      if(arr.indexOf("MONEY_A") < 0){
        this.mxShow = false
      }
      if(arr.indexOf("TABLE_A") < 0){
        this.zqShow = false
      }
      if(arr.indexOf("SELECT_B") < 0){
        this.bzShow = false
      }
      if(arr.indexOf("SELECT_A") < 0){
        this.payShow = false
      }
      if(arr.indexOf("INPUT_TABLE_A") < 0){
        this.baseShow = false
      }
      if(arr.indexOf("INPUT_CHECK_A") < 0){
        this.imgShow = false
      }
      if(arr.indexOf("INPUT_CHECK_B") < 0){
        this.styleShow = false
      }
      if(arr.indexOf("INPUT_TABLE_B") < 0){
        this.numShow = false
      }
      if(arr.indexOf("INPUT_IMG_A") < 0){
        this.addImgShow = false
      }
      if(arr.indexOf("INPUT_TEXT_A") < 0){
        this.beizShow = false
      }
    },
    // 定制
    dingzhi() {
      // 根据hsah判断是跟新订单还是创建订单 UpdataOrEdit 0 表示创建新订单 1表示更新订单
      this.LS.removeItem("UpdataOrEdit")
      if(this.$route.query.agin){
        this.LS.setItem("UpdataOrEdit",0)
      } else {
        this.LS.setItem("UpdataOrEdit",1)
      }
      let totalC = this.$refs.DZcaigou.totalCount;
      this.orderSubmit.orderSpCount = totalC;
      let modulesDataLength = this.modulesData.length;
      let qipiList;
      this.orderSubmit.context.modules = [];
      // if(!this.orderSubmit.context.modules.length){
        for(let i=0; i<modulesDataLength; i++){
          if(this.modulesData[i].type === 'INPUT_TABLE_A'){
            this.orderSubmit.context.modules[
              this.orderSubmit.context.modules.length
            ] = this.$refs.base.mi_title_stitle_img;
          } else if(this.modulesData[i].type === 'INPUT_CHECK_A'){
              this.orderSubmit.context.modules[
                this.orderSubmit.context.modules.length
              ] = this.$refs.DZimgc1.mi_title_stitle_img;
          } else if(this.modulesData[i].type === 'INPUT_CHECK_B'){
              this.orderSubmit.context.modules[
                this.orderSubmit.context.modules.length
              ] = this.$refs.DZimgc2.mi_title_stitle_img;
          } else if(this.modulesData[i].type === 'INPUT_TABLE_B'){
              this.orderSubmit.context.modules[
                this.orderSubmit.context.modules.length
              ] = this.$refs.DZcaigou.mi_title_stitle_img;
          } else if(this.modulesData[i].type === 'INPUT_IMG_A'){
              this.orderSubmit.context.modules[
                this.orderSubmit.context.modules.length
              ] = this.$refs.DZimgc3.mi_title_stitle_img;
          } else if(this.modulesData[i].type === 'INPUT_TEXT_A'){
              this.orderSubmit.context.modules[
                this.orderSubmit.context.modules.length
              ] = this.beizhu;
          } else if(this.modulesData[i].type === 'MONEY_A'){
              qipiList = this.modulesData[i].moneyList
          }
        }
        // 单选
        // this.orderSubmit.context.modules[this.orderSubmit.context.modules.length] = this.$refs.DZcaigou.mi_title_stitle_img;
      // }

      
      if(this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key == "undefinedundefined"){
        this.$vux.toast.show({
          type: 'text',
          width: "7.6rem",
          // position: "bottom",
          text: "请勾选样式/款式",
          time: 1500,
        });
      } else if(totalC>=qipiList[0].minCount && totalC>0) {
        // 根据采购数量判断物品单价
        console.log(totalC)
        console.log(qipiList)
        let minAyy = qipiList.filter(item=>{
          if(item.minCount>0){
            return item.minCount<=totalC
          }
        })
        console.log(minAyy)
        let minAyyLast = minAyy[minAyy.length-1];
        console.log(minAyyLast)
        let spPrice = minAyyLast.money;
        console.log(spPrice)
        this.orderSubmit.orderDjMoney = spPrice;
        this.orderSubmit.orderSpMoney = totalC*spPrice;
        if (this.LS.getItem("orderList")){
          this.LS.removeItem("orderList");
          this.LS.setItem("orderList",this.orderSubmit);
        } else {
          this.LS.setItem("orderList",this.orderSubmit);
        }
        this.LS.setItem("instrucTitle",this.rootData.instrucTitle)
        this.LS.setItem("instrucIntro",this.rootData.instrucIntro)
        this.LS.setItem("bannerImg",this.rootData.bannerImg)
        this.LS.setItem("companyName",this.rootData.userRetVO.companyName)
        if(this.$route.query.orderId){
          this.$router.push("/lijidingzhi")
          this.LS.setItem("editAddList",this.editAddList)
        }else{
          this.$router.push("/lijidingzhi")
          this.LS.removeItem("editAddList")
        }
        // this.$router.push("/lijidingzhi?instrucTitle="+this.rootData.instrucTitle+"&instrucIntro="+this.rootData.instrucIntro+"&bannerImg="+this.rootData.bannerImg+"&companyName="+this.rootData.userRetVO.companyName);
        // if(this.$route.query.update){
        //   this.$router.push("/lijidingzhi?instrucTitle="+this.rootData.instrucTitle+"&instrucIntro="+this.rootData.instrucIntro+"&bannerImg="+this.rootData.bannerImg+"&companyName="+this.rootData.userRetVO.companyName+"&orderId="+this.$route.query.orderId);
        // } 
      }else if(totalC==0){
        this.$vux.toast.show({
          type: 'text',
          width: "7.6rem",
          // position: "bottom",
          text: "请填写采购量",
          time: 1500,
        });
      } else {
        this.$vux.toast.show({
          type: 'text',
          width: "7.6rem",
          // position: "bottom",
          text: "采购数量不能小于最小起批量",
          time: 1500,
        });
      }       
    },
    // 添加说明书简介
    addDesc() {
      if(this.GET_MONEY_LIST[0].money>0 && this.GET_MONEY_LIST[0].minCount){
        let modulesDataLength = this.modulesData.length;
        let caigou = {
          type: "INPUT_TABLE_B",
          title: "采购数量",
          dataList: [
            {
              count: "0",
              key: ""
            }
          ]
        }
        this.TEMP_ROOT_DATA.tempCon.modules[this.TEMP_ROOT_DATA.tempCon.modules.length] = caigou;
        for(let i=0; i<modulesDataLength; i++){
          if(this.modulesData[i].type === 'INPUT_TABLE_A'){
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.base.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'INPUT_CHECK_A'){
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc1.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'INPUT_CHECK_B'){
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc2.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'INPUT_TABLE_B'){
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZcaigou.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'INPUT_IMG_A'){
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc3.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'INPUT_TEXT_A'){
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.beizhu;
              console.log(i)
          } else if(this.modulesData[i].type === 'IMG_A') { // 产品
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'IMG_CONTENT_A') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPJX.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'IMG_B') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPXJ.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'IMG_A') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
              console.log(i)
          } else if(this.modulesData[i].type === 'MONEY_A') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
              this.TEMP_ROOT_DATA.tempCon.modules[i].moneyList = this.GET_MONEY_LIST
              console.log(i)
          } else if(this.modulesData[i].type === 'TABLE_A') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
              console.log(i)
          } else if(this.modulesData[i].type === 'SELECT_B') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
              console.log(i)
          } else if(this.modulesData[i].type === 'SELECT_A') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
              console.log(i)
          } else if(this.modulesData[i].type === 'TEXT_A') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
              console.log(i)
          }
        }
        console.log(this.TEMP_ROOT_DATA.tempCon.modules)
        // this.goShow()
        setTimeout(() => {
          this.setTempData(JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)));
          this.LS.setItem(
            "_IN_DATA",
            JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA))
          );
          if (!this.againEditting) {
            console.log("测试第一次提交");
            //第一次提交
            this.$router.push({ 
              path: "/adddesc",
              query: { formal: "200", instrucCustType: this.instrucCustType } 
            });
          } else {
            console.log("测试更新说明书");
            this.$store.commit('getInstrucTitle',this.rootData.instrucTitle)
            this.$store.commit('getInstrucIntro',this.rootData.instrucIntro)
            //更新说明书
            this.$router.push({
              path: "/adddesc",
              query: { update: "200", instrucId: this.$route.query.instrucId, instrucCustType: this.instrucCustType }
            });
          }
        }, 188);
      } else {
        this.$vux.toast.show({
          width: "90%",
          type: "text",
          text: '请至少填写一组对应的起批量和价格',
          position: 'middle',
          time: 1500
        });
      }
    },
    // 存草稿操作
    saveDraft() {
      this.$store.commit('getInstrucTitle','')
      this.$store.commit('getInstrucIntro','')
      let modulesDataLength = this.modulesData.length;
      for(let i=0; i<modulesDataLength; i++){
        if(this.modulesData[i].type === 'INPUT_TABLE_A'){
          this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.base.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'INPUT_CHECK_A'){
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc1.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'INPUT_CHECK_B'){
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc2.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'INPUT_TABLE_B'){
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZcaigou.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'INPUT_IMG_A'){
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc3.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'INPUT_TEXT_A'){
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.beizhu;
            console.log(i)
        } else if(this.modulesData[i].type === 'IMG_A') { // 产品
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'IMG_CONTENT_A') {
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPJX.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'IMG_B') {
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPXJ.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'IMG_A') {
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
            console.log(i)
        } else if(this.modulesData[i].type === 'MONEY_A') {
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
            console.log(i)
        } else if(this.modulesData[i].type === 'TABLE_A') {
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
            console.log(i)
        } else if(this.modulesData[i].type === 'SELECT_B') {
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
            console.log(i)
        } else if(this.modulesData[i].type === 'SELECT_A') {
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
            console.log(i)
        } else if(this.modulesData[i].type === 'TEXT_A') {
            this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
            console.log(i)
        }
      }
      // this.goShow();
      setTimeout(() => {
        this.setTempData(JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)));
        this.LS.setItem(
          "_IN_DATA",
          JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA))
        );
        this.$router.push({ path: "/adddesc", query: { draft: "200", instrucCustType: this.instrucCustType } });
      }, 500);
    },
    // 实力保障
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: "实力保障",
          data: [this.BZselectList],
          alias: { value: "value", text: "value" },
          onSelect: this.selectHandle
        });
      }
      this.picker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      let lh = this.BZdataList.length;
      for(let i=0; i<lh; i++){
        if(this.BZdataList[i].value === selectedText[0]){
          return
        }
      }
      let arr = selectedText.map(e => {
        return { value: e };
      });
      this.BZdataList.push(arr[0]);
    },
    // 支付方式
    showPicker2() {
      if (!this.aliasPicker) {
        this.aliasPicker = this.$createPicker({
          title: "支付方式",
          data: [this.PAYselectList],
          alias: { value: "value", text: "value" },
          onSelect: this.selectHandle2
        });
      }
      this.aliasPicker.show();
    },
    selectHandle2(selectedVal, selectedIndex, selectedText) {
      let lh = this.PAYdataList.length;
      for(let i=0; i<lh; i++){
        if(this.PAYdataList[i].value === selectedText[0]){
          return
        }
      }
      let arr = selectedText.map(e => {
        return { value: e };
      });
      this.PAYdataList.push(arr[0]);
    },
    // processFile
    processFile(file, next) {
      console.log(file);
      // 压缩图片
      lrz(file).then(resImg => {
        file = resImg.file;
        console.log(file);
        next(file);
      });
    },
    sucHandler(file) {
      console.log(file);
      this.compLogo = file.response.name;
    },
    delHandler(file) {
      this.form.compLogo =
        this.GET_UINFO == ""
          ? this.GET_UINFO.compLogo
          : this.LS.getItem("uinfo").compLogo;
    },
    delItem(index) {
      this.BZdataList.splice(index, 1);
    },
    delItem2(index) {
      this.PAYdataList.splice(index, 1);
    },
    del(e,i) {
      // alert("删除后该模块不可恢复，确定删除么？");
      this.TEMP_ROOT_DATA.tempCon.modules[i] = ''
      this.modulesData[i] = ''
      $(e.target)
        .parent()
        .parent()
        .remove();
    },
    delp(e,i) {
      // alert("删除后该模块不可恢复，确定删除么？");
      this.TEMP_ROOT_DATA.tempCon.modules[i] = ''
      this.modulesData[i] = ''
      $(e.target)
        .parent()
        .parent()
        .parent()
        .remove();
    },
    showManage() {
      console.log("1");
    },
    showManage1() {
      console.log("show1");
    },
    showFinishMg() {
      console.log("finish");
    },
    showFinishMg1() {
      console.log("finish1");
    },
    goEdit() {
      this.disabled = false;
      this.isBusiness = false;
      this.$refs.comP.editable = true;
      this.$refs.banner.editable = true;
      this.$refs.comPJX.editable = true;
      this.$refs.comPXJ.editable = true;
      this.$refs.comPSIZE.editable = true;
      this.$refs.base.disabled = false;
      this.$refs.base.editable = true;
      this.$refs.DZimgc1.disabled = false;
      this.$refs.DZimgc2.disabled = false;
      this.$refs.DZimgc3.disabled = false;
      this.$refs.DZimgc1.editable = true;
      this.$refs.DZimgc2.editable = true;
      this.$refs.DZimgc3.editable = true;
      this.$refs.DZcaigou.editable = true;
      this.$refs.ediTingBtmBtns.style.bottom = "0";
      this.$refs.edit.style.bottom = "-1.173333rem";
    },
    goShow() {
      this.disabled = true;
      this.isBusiness = true;
      this.$refs.comP.editable = false;
      this.$refs.banner.editable = false;
      this.$refs.comP.show.isChoseImg = false;
      this.$refs.comPJX.editable = false;
      this.$refs.comPJX.show.isChoseImg = false;
      this.$refs.comPXJ.editable = false;
      this.$refs.comPXJ.show.isChoseImg = false;
      this.$refs.comPSIZE.editable = false;
      this.$refs.comPSIZE.show.isChoseImg = false;
      this.$refs.banner.show.isChoseImg = false;
      this.$refs.base.disabled = true;
      this.$refs.base.editable = false;
      this.$refs.DZimgc1.disabled = true;
      this.$refs.DZimgc2.disabled = true;
      this.$refs.DZimgc3.disabled = true;
      this.$refs.DZimgc1.editable = false;
      this.$refs.DZimgc1.show.isChoseImg = false;
      this.$refs.DZimgc2.editable = false;
      this.$refs.DZimgc3.editable = false;
      this.$refs.DZimgc2.show.isChoseImg = false;
      // this.$refs.DZcaigou.editable = false;
      this.$refs.DZcaigou.editable = true;
      this.$refs.ediTingBtmBtns.style.bottom = "-1.173333rem";
      this.$refs.edit.style.bottom = "0";
    },
    ...mapMutations({
      setTempData: "SET_TEMP_DATA",
      set_up_or_down: "SET_UPORDOWN",
      set_edit: "SET_EDITABLE",
      set_preview: "SET_IS_PREVIEW",
      set_banner_height: "SET_BANNER_HEIGHT",
      setML: "setML"
    })
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index.styl';
@import '~common/stylus/variable';

.order-price-qp-icon {
  width: 10px;
  text-align: center;
  padding: 0 3px;
}

.order-price-qp-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 !important;
}

.order-price-qp {
  width: 37px;
  flex-grow: 1;
  text-align: center;
  font-size: 12px;
}

.prici-mxC {
  width: 100%;
  border: 1px #d2d2d2 solid;
  display: flex;
  margin: 10px 0 16px 0;
}

.prici-mxC-name {
  min-width: 25%;
  width: 25%;
  border-right: 1px #d2d2d2 solid;
  box-sizing: border-box;
}

.prici-mxC-name2 {
  min-width: 25%;
  width: 25%;
  flex-grow: 1;
  border-right: 1px #d2d2d2 solid;
}

.prici-mxC-name2:last-child {
  border: 0;
}

.prici-mxC li {
  height: 40px;
  line-height: 40px;
  padding: 0 13px;
  border-bottom: 1px #d2d2d2 solid;
}

.prici-mxC-name li:last-child {
  border: 0;
}

.prici-mxC-name2 li:last-child {
  border: 0;
}

.prici-mxC-name2 li {
  box-sizing: border-box;
}

.index-banner {
  position: relative;
}

.dingzhi-caigou-text {
  width: 168px;
  height: 40px;
  font-size: 13px;
  color: #2E2E30;
  border: 1px solid #D2D2D2;
  padding: 0 10px;
  box-sizing: border-box;
}

.dingzhi-number-icon {
  width: 38px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border: 1px solid #D2D2D2;
  font-size: 30px;
  color: #D2D2D2;
}

.dingzhi-number-ipt {
  width: 70px;
  height: 38px;
  font-size: 13px;
  color: #2E2E30;
  text-align: center;
  border-top: 1px solid #D2D2D2;
  border-bottom: 1px solid #D2D2D2;
}

.dingzhi-numberbpx {
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dingzhi-beizhu {
  width: 100%;
  margin-top: -10px;
  font-size: 12px;
}

.dingzhi-addimg-ms {
  width: 100%;
  font-size: 12px;
  color: #9B9B9B;
  line-height: 12px;
  margin-top: -10px;
}

.dingzhi-caigou-ul {
  width: 100%;
}

.dingzhi-caigou-li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dingzhi-style-cz {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(46, 46, 48, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dingzhi-style-head {
  width: 228px;
  height: 14px;
  font-size: 13px;
  color: #2E2E30;
}

.dingzhi-style-ms {
  width: 240px;
  font-size: 12px;
  color: #9B9B9B;
  line-height: 20px;
  margin-top: 4px;
}

.dingzhi-stlye-li {
  width: 100%;
  // height: 100px;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 10px;
}

.dingzhi-stlye-ul {
  width: 100%;
}

.dingzhi-tupianC-del-btn {
  padding: 10px 12px;
  font-size: 13px;
  color: #FFFFFF;
  background: #2E2E30;
}

.dingzhi-tupianC-del {
  width: 100%;
  height: 100%;
  background: rgba(46, 46, 48, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dingzhi-tupianC-div {
  width: 100%;
  position: relative;
}

.dingzhi-tupianC-li-b {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.icon-wancheng {
  font-size: 12px;
}

.icon-wancheng.on {
  color: #E2E2E2;
}

.dingzhi-tupianC-ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dingzhi-tupianC-ul li {
  width: 22%;
  text-align: center;
}

.order-show-cube .cube-select:after {
  border: none;
}

.dingzhi-cus-ipt {
  width: 200px;
  padding: 14px 10px;
  border: 1px solid #D2D2D2;
  border-radius: 2px;
  box-sizing: border-box;
}

.dingzhi-base-li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.dingzhi-ipt {
  width: 60px;
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  color: #2E2E30;
}

.dingzhi-tupianC-ipt {
  max-width: 65px;
  line-height: 20px;
  font-size: 12px;
  color: #2E2E30;
  text-align: center;
}

.dingzhi-head {
  width: 300px;
  height: 20px !important;
  font-size: 14px;
  color: #2E2E30;
  font-weight: 600;
  margin-bottom: 20px;
}

.dingzhi-base {
  width: 100%;
  padding: 20px 12px;
  float: left;
  margin-top: 10px;
  position: relative;
}

input[disabled], input:disabled, input.disabled {
  background: none;
  opacity: 1;
}

.bg-fff {
  background: #fff;
}

.order-dingzhi {
  width: 100%;
  background: #f9f9f9;
  float: left;
}

.order-dingzhi-title {
  width: 100%;
  padding: 15px 10px;
  font-size: 16px;
  color: #2E2E30;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  float: left;
  position: relative;
}

.order-dingzhi-title:before {
  content: '';
  width: 133px;
  height: 1px;
  background: #E2E2E2;
  position: absolute;
  left: 12px;
  top: 24px;
}

.order-dingzhi-title:after {
  content: '';
  width: 133px;
  height: 1px;
  background: #E2E2E2;
  position: absolute;
  right: 12px;
  top: 24px;
}

.demo2 {
  width: 100%;
  padding: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  padding-right: 15px;
  color: #3C3C3F;
  border: 1px solid #d2d2d2;
}

.order-shili-ul {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.order-shili-ul li {
  padding: 14px 10px;
  font-size: 14px;
  color: #2E2E30;
  position: relative;
  border: 1px solid #D2D2D2;
}

.order-show-cube {
  margin: 0 10px 10px 0;
}

.order-show-cube .cube-popup {
  z-index: 99999999;
}

.order-show-cube .cube-picker-confirm {
  top: 0 !important;
}

.order-close {
  position: absolute;
  top: 0;
  right: 12px;
}

.order-table-tdW {
  width: 90px;
}

.qipi-miaoshu {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  color: #FAB100;
  letter-spacing: 0;
  line-height: 11px;

  p {
    margin-bottom: 10px;
  }
}

.order-table {
  width: 100%;
  border: 1px solid #d2d2d2;
  margin: 10px 0 16px 0;

  tr td {
    border: 1px solid #d2d2d2;
    padding: 13px;
  }
}

.prici-mxC .order-table-ipt {
  width: 100%;
  height: 38px;
  text-align: center;
}

.order-table-ipt {
  width: 100%;
}

.qipi {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .qipi-danwei {
    font-size: 14px;
    color: #2E2E30;
  }

  .qipi-danwei-text {
    width: 270px;
    border: 1px solid #D2D2D2;
    padding: 14px 10px;
  }
}

.manage-product {
  margin-top: 20px;
}

.paddingB {
  padding-bottom: 70px;
}

.order-banner-img {
  width: 100%;
  display: block;
  margin: 12px 0;
}

.order-show {
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  position: relative;
}

.order-product-title {
  width: 100%;
  height: 16px;
  margin: 40px 0 20px 0;
  font-size: 16px;
  color: #2E2E30;
  font-weight: 600;
}

.text {
  border: 1px dashed rgb(172, 172, 172);
}

.order-dz-btn {
  width: 100%;
  height: 45px;
  background: rgba(46, 46, 48, 0.6);
  position: fixed;
  bottom: 0;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  z-index: 999;
}

.order-product-ms {
  width: 100%;
  font-size: 13px;
  color: #2E2E30;
  line-height: 20px;
}

.ediTingBtmBtns {
  width: 100%;
  display: flex;
  height: 44px;
  background: rgba(46, 46, 48, 0.8);
  position: fixed;
  bottom: -44px;
  transition: all 0.3s;
  justify-content: center;
  z-index: 99999;

  .ediTingBtmBtnsItems {
    flex: 1;
    text-align: center;
    line-height: 44px;

    a {
      display: block;
      color: #fff;
      font-size: 16px;
      font-weight: 300;
      line-height: 44px;
      cursor: pointer;

      i {
        font-size: 16px;
      }
    }
  }

  .goLine {
    background: linear-gradient(to right, rgba(21, 212, 159, 1), rgba(87, 214, 207, 1));
  }

  .moduleMangBtnGroup {
    width: 100%;
    height: 40px;
    text-align: center;
    transition: all 0.5s;
  }

  .moduleMangBtnGroup a {
    display: inline-block;
    width: 95px;
    height: 33px;
    line-height: 33px;
    margin-right: 14px;
    background: $color-2e;
    color: $color-fff;
    font-size: 13px;
    border-radius: 3px;
    font-weight: 300;
    cursor: pointer;
  }

  .moduleMangBtnGroup a i {
    font-size: 13px;
  }
}

.order-show-cube .order-close {
  width: 20px;
  height: 20px;
  right: -10px;
  top: -10px;
  opacity: 0.6;
  background: #2E2E30;
  color: #fff;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
  border-radius: 100%;
}

.dingzhi-icon-top {
  top: 22px;
}
</style>
