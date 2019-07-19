<template>
  <div>
    <div class="paddingB bg-fff" >
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
          <p class="order-product-title">{{item.title}}</p>
          <div class="edtStatus" v-if="edtStatus">
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
              <ul class="prici-mxC-name2" v-for="(i,index) in GET_MONEY_LIST" :key="index">
                <li><input class="order-table-ipt" :disabled="isBusiness" type="number" placeholder="价格" v-model="i.money"></li>
                <li class="order-price-qp-cont">
                  <input
                    class="order-price-qp"
                    :disabled="isBusiness"
                    type="number"
                    placeholder="0"
                    v-model="i.minCount"
                  >
                  <span class="order-price-qp">{{item.unit}}</span>
                </li>
              </ul>
            </div>
            <ul class="qipi-miaoshu">
              <li class="">
                <p v-if="errorTip" style="color: mediumvioletred">价格与起批量一 一对应，并且起批量依次增大</p>
              </li>
            </ul>
            <ul class="qipi-miaoshu">
              <li>说明：</li>
              <li>
                <!--<p v-if="errorTip" style="color: mediumvioletred">价格与起批量一 一对应，并且起批量依次增大</p>-->
                <p>商品价格至少填写一个哦</p>
                <p v-for="(i,index) in GET_MONEY_LIST" :key="index" v-if="i.minCount>0 && i.money && index ===0">
                  起批量：{{i.minCount}}
                  <span v-if="index<2 && GET_MONEY_LIST[index+1].minCount>i.minCount">-{{GET_MONEY_LIST[index+1]?GET_MONEY_LIST[index+1].minCount-1:i.minCount-1}}{{item.unit}}</span>
                  <span v-else>{{item.unit}}以上</span>
                  商品价格为：{{i.money}}元</p>
                <p v-for="(i,index) in GET_MONEY_LIST" :key="index" v-if="i.minCount>0 && i.money && index ===1 && GET_MONEY_LIST[index-1].minCount<i.minCount">
                  起批量：{{i.minCount}}
                  <span v-if="index<2 && GET_MONEY_LIST[index+1].minCount>i.minCount">-{{GET_MONEY_LIST[index+1]?GET_MONEY_LIST[index+1].minCount-1:i.minCount-1}}{{item.unit}}</span>
                  <span v-else>{{item.unit}}以上</span>
                  商品价格为：{{i.money}}元</p>
                <p v-for="(i,index) in GET_MONEY_LIST" :key="index" v-if="i.minCount>0 && i.money && index ===2 && GET_MONEY_LIST[index-1].minCount<i.minCount">
                  起批量：{{i.minCount}}
                  <span v-if="index<2 && GET_MONEY_LIST[index+1].minCount>i.minCount">-{{GET_MONEY_LIST[index+1]?GET_MONEY_LIST[index+1].minCount-1:i.minCount-1}}{{item.unit}}</span>
                  <span v-else>{{item.unit}}以上</span>
                  商品价格为：{{i.money}}元</p>
              </li>
            </ul>
          </div>
          <div class="previewStatus" v-else>
            <x-table full-bordered style="background-color:#fff;"v-if="GET_MONEY_LIST[0].minCount > 0  ||  GET_MONEY_LIST[1].minCount >0 || GET_MONEY_LIST[2].minCount>0" >
              <tbody>
              <tr  v-for="(i,index) in GET_MONEY_LIST" v-if="i.minCount>0">
                <td v-if="index<2 && GET_MONEY_LIST[index+1].minCount>i.minCount">{{i.minCount}}-{{GET_MONEY_LIST[index+1]?GET_MONEY_LIST[index+1].minCount-1:i.minCount-1}}{{item.unit}}</td>
                <td v-else>{{i.minCount}}{{item.unit}}以上</td>
                <td style=" color: mediumvioletred;fontWeight: bold;">{{i.money}}元</td>
              </tr>
              </tbody>
            </x-table>
            <x-table full-bordered style="background-color:#fff;"v-else >
              <tbody>
              <tr  v-for="(i,index) in GET_MONEY_LIST">
                <td >价格{{i.money}}元（元）</td>
                <td>价格1</td>
              </tr>
              </tbody>
            </x-table>
            <ul class="qipi-miaoshu" style="marginTop:3vw">
              <li class="">
                <p v-if="errorTip || (GET_MONEY_LIST[0].minCount <= 0 && GET_MONEY_LIST[1].minCount <= 0 && GET_MONEY_LIST[2].minCount<= 0)" style="color: mediumvioletred">价格与起批量一 一对应，并且起批量依次增大</p>
              </li>
            </ul>
          </div>
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
          <div class="order-close" v-show="!disabled" @click="delp($event,index,item.type)">
            <i class="iconfont icon-L1"></i>
          </div>
          <p class="order-product-title">{{item.title}}</p>
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
          <div class="order-close" v-show="!disabled" @click="delp($event,index,item.type)">
            <i class="iconfont icon-L1"></i>
          </div>
        </div>
        <!-- 管理项目 -->
        <ManageCom
          class="manage-product"
          ref="shili"
          v-show="!disabled"
          @add-this-item="showPicker"
          v-if="SHOW_SELECT_B">
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
          <div class="order-close" v-show="!disabled" @click="delp($event,index,item.type)">
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
          </ul>
        </div>
        <!-- 管理项目 -->
        <ManageCom
          class="manage-product"
          ref="payMethord"
          v-show="!disabled"
          v-if="SHOW_SELECT_A"
          @add-this-item="showPicker2"
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
          <div class="order-close" v-show="!disabled" @click="delp($event,index,item.type)">
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
      <div class="order-dingzhi paddingB" id="dingZhiId">
          <div class="titlebx">
            <!-- title -->
            <p class="order-dingzhi-title bg-fff">定制信息</p>
            <!-- 添加模块儿 -->
          </div>
          <!-- 基本信息 -->
          <DZbase v-show="baseShow" ref="base" v-on:listenDZbase="DZbaseShow" :msgData="this.$route.query.source"></DZbase>
          <!-- 图片选择 -->
          <DZimgc1 v-show="imgShow" ref="DZimgc1"  v-on:listenDZimgc1="DZimgShow" id="ruhexiu"></DZimgc1>
          <!-- 样式选择 -->
          <DZimgc2 v-show="styleShow" ref="DZimgc2"  v-on:listenDZimgc2="DZstyleShow"></DZimgc2>
          <!-- 采购数量 多选-->
          <!-- <DZcaigou v-show="numShow" ref="DZcaigou"></DZcaigou> -->
          <!-- 采购数量 单选-->
          <DZcaigou v-show="DShow" ref="DZcaigou"></DZcaigou>
          <!-- 添加照片 -->
          <DZimgc3 v-show="addImgShow" ref="DZimgc3"  v-on:listenDZimgc3="DZaddImgShow"></DZimgc3>
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
              <div class="order-close dingzhi-icon-top" v-show="!disabled" @click="del($event,index,item.type)">
                <i class="iconfont icon-L1"></i>
              </div>
            </div>
          </div>
          <DZbaseBAK v-show="addM1" ref="addM1"></DZbaseBAK>
          <DZimgc1BAK v-show="addM2" ref="addM2"></DZimgc1BAK>
          <DZimgc2BAK v-show="addM3" ref="addM3"></DZimgc2BAK>
          <DZimgc3BAK v-show="addM4" ref="addM4" mm="999"></DZimgc3BAK>
          <!-- <div v-show="addM5">
            <div
              class="dingzhi-base bg-fff"
              v-for="(item,index) in modulesData"
              :key="index"
              v-if="modulesData[index].type === 'INPUT_TEXT_A'"
            >
              <textarea :class="{'dingzhi-head':true, 'text':!disabled}" maxlength="5" v-model="beizhu.title" :disabled="disabled"></textarea>
              <textarea
                class="dingzhi-beizhu"
                cols="30"
                rows="10"
                placeholder="可填写您的特殊要求"
                :disabled="!disabled"
                v-model="beizhu.content"
              ></textarea>
              <div class="order-close dingzhi-icon-top" v-show="!disabled" @click="del($event,index)">
                <i class="iconfont icon-L1"></i>
              </div>
            </div>
          </div> -->
          <!-- footer logo -->
          <div :class="sourceFBisMember2 ? 'mask_MD' : ''" id= 'maskMD'></div>
          <myFooter></myFooter>
        </div>
    </div>
    <!-- 立即定制 button -->
    <div v-show="!look" class="aginOrWxid">
      <div class="RHX-btn">
        <!--如何秀逻辑-->
        <div class="" v-show="!this.$route.query.source">
          <div class="" v-if="this.$route.query.sourceMember">
            <div class="order-dz-btn   dfasddsa" v-show="sourceFBisMember" ref="edit" @click="goEdit">去编辑</div>
          </div>
          <div class="" v-if="!this.$route.query.sourceMember">
            <div class="order-dz-btn" v-show="!agin && !this.$route.query.wxId" ref="edit" @click="goEdit">去编辑</div>
          </div>
          <div class="" v-show="agin">
            <div class="order-dz-btn" v-show="(agin || this.$route.query.wxId) && instrucState !== '0'" @click="dingzhi">立即定制</div>
            <div class="ediTingBtmBtns aginEdit" v-show="agin && !this.$route.query.zailai && !this.$route.query.modify">
              <div class="ediTingBtmBtnsItems goLine aginEditM" @click="goEdit" v-if="!showStype">
                <a>继续编辑</a>
              </div>
              <div class="ediTingBtmBtnsItems goLine aginEditM"@click="goShow" v-if="showStype">
                <a>预览</a>
              </div>
              <div class="ediTingBtmBtnsItems goLine"  @click="addDesc">
                <a >更新一波</a>
              </div>
            </div>
          </div>
          <div class="order-dz-btn" v-show="!agin && this.$route.query.wxId" @click="dingzhi">立即定制</div>
          <div class="ediTingBtmBtns" ref="ediTingBtmBtns" id="ediTingBtmBtns" v-show = '!agin && !this.$route.query.wxId'>
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
        <!--膜拜上级-->
        <div class="" v-show="this.$route.query.source">
          <div class="order-dz-btn" @click="dingzhi">立即定制</div>
        </div>
      </div>

      <!--实力保障-->
      <div class="selModule" id="selModule1" ref="selModule1">
        <div class="selModuleWrap">
          <h2 class="selModuleTitle">保障服务<i class="iconfont icon-L1" @click="hideAdd1"></i></h2>
          <div class="modulesCon">
            <div class="moduleBox">
              <div class="tetleBox">
                <p class="">换货服务</p>
              </div>
              <flexbox :gutter="0" wrap="wrap">
                <checker v-model="Required.Required1"  default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                  <checker-item value="7天包换">
                    <p class="flexbox-item-text">
                      7天包换
                    </p>
                  </checker-item>
                  <checker-item value="15天包换">
                    <p class="flexbox-item-text">
                      15天包换
                    </p>
                  </checker-item>
                  <checker-item value="21天包换">
                    <p class="flexbox-item-text">
                      21天包换
                    </p>
                  </checker-item>
                  <checker-item value="60天包换">
                    <p class="flexbox-item-text">
                      60天包换
                    </p>
                  </checker-item>
                </checker>
              </flexbox>
            </div>
            <div class="moduleBox">
              <div class="tetleBox">
                <p class="">发货保障</p>
              </div>
              <flexbox :gutter="0" wrap="wrap">
                <checker v-model="Required.Required2"  default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                  <checker-item value="7天内发货">
                    <p class="flexbox-item-text">
                      7天内发货
                    </p>
                  </checker-item>
                  <checker-item value="15天内发货">
                    <p class="flexbox-item-text">
                      15天内发货
                    </p>
                  </checker-item>
                  <checker-item value="30天内发货">
                    <p class="flexbox-item-text">
                      30天内发货
                    </p>
                  </checker-item>
                </checker>
              </flexbox>
            </div>
            <div class="moduleBox">
              <div class="tetleBox">
                <p class="">破损补寄</p>
              </div>
              <flexbox :gutter="0" wrap="wrap">
                <checker v-model="Required.Required3"  default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                  <checker-item value="破损补寄">
                    <p class="flexbox-item-text">
                      破损补寄
                    </p>
                  </checker-item>
                </checker>
              </flexbox>
            </div>
            <div class="moduleBox">
              <div class="tetleBox">
                <p class="">交期保障</p>
              </div>
              <flexbox :gutter="0" wrap="wrap">
                <checker v-model="Required.Required4"  default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                  <checker-item value="交期保障">
                    <p class="flexbox-item-text">
                      交期保障
                    </p>
                  </checker-item>
                </checker>
              </flexbox>
            </div>
            <div class="moduleBox">
              <div class="tetleBox">
                <p class="">材质保障</p>
              </div>
              <flexbox :gutter="0" wrap="wrap">
                <checker v-model="Required.Required5"  default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                  <checker-item value="材质保障">
                    <p class="flexbox-item-text">
                      材质保障
                    </p>
                  </checker-item>
                </checker>
              </flexbox>
            </div>
            <div class="moduleBox">
              <div class="tetleBox">
                <p class="">正品保障</p>
              </div>
              <flexbox :gutter="0" wrap="wrap">
                <checker v-model="Required.Required6"  default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                  <checker-item value="正品保障">
                    <p class="flexbox-item-text">
                      正品保障
                    </p>
                  </checker-item>
                </checker>
              </flexbox>
            </div>
          </div>
          <div class="btnSub" v-if="btnSub"  @click="addMd">确定</div>
          <!--<input type="button" value="确定" ref="addTisMd1" class="addTisMd" @click="addMd">-->
        </div>
      </div>
      <!--选择模块模框-->
      <div class="selModule" id="selModule" ref="selModule">
        <div class="selModuleWrap">
          <h2 class="selModuleTitle">添加模块<i class="iconfont icon-L1" @click="hideAdd"></i></h2>
          <div class="modulesCon">
            <div class="modulesConItems" v-for="(item,index) in imgUrlList">
              <img src="./add-img1.png" v-show="index === 0" :class="{'light':selMdTips === index+1}" @click.prevent="selThisMd(index)" />
              <img src="./add-img2.png" v-show="index === 1" :class="{'light':selMdTips === index+1}" @click.prevent="selThisMd(index)" />
              <img src="./add-img3.png" v-show="index === 2" :class="{'light':selMdTips === index+1}" @click.prevent="selThisMd(index)" />
              <img src="./add-img4.png" v-show="index === 3" :class="{'light':selMdTips === index+1}" @click.prevent="selThisMd(index)" />
              <img src="./add-img5.png" v-show="index === 4" :class="{'light':selMdTips === index+1}" @click.prevent="selThisMd(index)" />
            </div>
          </div>
          <input type="button" value="添加" ref="addTisMd" class="addTisMd" @click="addMd" :disabled="!selMdTips" style="display: none">
        </div>
      </div>
      <!--选择模块模框 end-->
      <!--排序模块框-->
      <div class="sortModule" ref="sortModule" v-if="TEMP_ROOT_DATA">
        <div class="sortModuleWrap">
          <h2 class="sortModuleWrapTitle">拖动排序哟<i class="iconfont icon-L1" @click="hidePaixu"></i></h2>
          <draggable
            class="sortStart"
            :move="getdata"
            v-model="paixunList"
            @update="datadragEnd"
            :options="{animation:500,dragClass:'dragging'}">
            <div v-for="(item,index) in paixunList" :key="index" class="sortItem">
              <h2><a>{{index+1}}</a><i class="iconfont icon-weibiaoti-1"></i>&nbsp;{{item}}
              </h2>
            </div>
          </draggable>
        </div>
      </div>
      <!--排序模块框 end-->
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, Sticky, Flexbox, FlexboxItem,Checker, CheckerItem,XTable } from 'vux'
  import draggable from 'vuedraggable'
  import { autoTextarea } from "common/js/dom";
  import { mapMutations, mapGetters} from "vuex";
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
  import DZbaseBAK from "components/businessModules/productDescTitleImgModule/DZbaseBAK";
  import DZimgc1BAK from "components/businessModules/productDescTitleImgModule/DZimgchoose4";
  import DZimgc2BAK from "components/businessModules/productDescTitleImgModule/DZimgchoose5";
  import DZimgc3BAK from "components/businessModules/productDescTitleImgModule/DZimgchoose6";
  import DZcaigou from "components/businessModules/productDescTitleImgModule/DZcaigou";
  import banner from "components/businessModules/productDescTitleImgModule/banner";
  import * as API from "config/api";
  import lrz from "lrz";
  import { setTimeout } from 'timers';
  import wxApi from "../../../mixins/wxapi.js"; //微信分享sdk
  import {wxShareTimeline,wxShareAppMessage} from "../../../mixins/WXShare.js"; //微信分享到朋友圈和好友
  import {shareCont} from "../../../mixins/WXParams.js"; //微信分享参数
  import LS from 'config/localstorage'
  export default {
    name: "order",
    mixins: [wxApi],
    components: {
      Sticky, Flexbox, FlexboxItem,Checker, CheckerItem, XTable,draggable,ManageCom,myFooter,changeImgTips,manageModuleItemsTips,orderShow,orderJX,orderXJ,orderSize,DZbase,DZimgc1,DZimgc2,DZimgc3,DZbaseBAK,DZimgc1BAK,DZimgc2BAK,DZimgc3BAK,DZcaigou,banner
    },
    data() {
      return {
        sourceFBisMember: false, // 来自商机，判断用户是否时会员，会员为ture， 不是会员为false, 会员存储在本地queryMC中的isMember
        sourceFBisMember2: false, // 来自商机，判断用户是否时会员，会员为ture， 不是会员为false, 会员存储在本地queryMC中的isMember
        userStopTime: 0, // 记录用户再页面停留时间
        instrucState: '0', // 为发布状态
        instrucState2: '0', // 为发布状态
        showStype: true, // 默认编辑
        SHOW_SELECT_A:true, // 支付操作按钮显示
        SHOW_SELECT_B:true, // 实力保障操作按钮显示
        errorTip:false, // 价格明细输入错误提示，默认不显示
        edtStatus:true, // 价格明细编辑和预览状态切换，默认编辑状态
        btnSub:false, // 确认实力保障按钮显示，默认不显示
        contList:{},
        navAdd: '',
        addM1: false,
        addM2: false,
        addM3: false,
        addM4: false,
        addM5: false,
        paixunList: ['基本信息', '图片选择', '样式选择', '添加照片', '备注说明'],
        imgUrlList: ['/add-img1.png', '/add-img2.png', '/add-img3.png', '/add-img4.png', '/add-img5.png'],
        selMdTips: 0,
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
        moneyList: [
          {money:"",minCount:''},
          {money:"",minCount:""},
          {money:"",minCount:""}
        ],
        // 提交订单数据
        orderSubmit: {
          instrucId: '',
          userId: this.LS.getItem('userId'),
          orderSpMoney: 0,
          orderYfMoney: 0,
          orderDjMoney: 0,
          orderSpCount: 0,
          receivPcode: "",
          receivCcode: "",
          receivAcode: "",
          receivName: "",
          receivUser: "",
          receivPhone: "",
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
        Required:{ // 实力保障
          Required1: '',
          Required2: '',
          Required3: '',
          Required4: '',
          Required5: '',
          Required6: '',
        },
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
        editAddList:{},
        // 要添加的模块
        addModule: {},
        heightMd: {
          height: ''
        },
      };
    },
    computed: {
      ...mapGetters(["GET_TEMP_DATA","GET_EDITABLE","GET_UINFO","GET_IS_PREVIEW","GET_BANNER_HEIGHT","GET_MODULE_ICON"]),
      GET_MONEY_LIST: {
        get() {
          let dataList = this.$store.state.moneyList
          dataList.map((item,index)=>{
            item.minCount = Number(item.minCount)
          })
          return dataList
        },
        set(val) {
          console.log(val)
          this.$store.commit('setML', val)
        }
      },
        // 产品展示
      CPshow: function() {
        return this.modulesData.filter(item => {
          return item.type === "IMG_A";
        });
      },
      CPsize: function() {
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
      GET_MONEY_LIST:{
        handler(a, b){
          let cont1 = Number(b[0].minCount);
          let cont2 = Number(b[1].minCount);
          let cont3 = Number(b[2].minCount);
          console.log(typeof(cont1), cont2, cont3)
          if ((cont1 >= cont2) && cont2 !== 0 && cont1 !== 0) { // 第一个填写状态
            this.errorTip = true; // 显示错误提示
            return
          }
          if (cont2 !== 0) { // 第二个填写写状态
            if (cont1 === 0) { // 先校验第一个是否填写
              this.errorTip = true; // 显示错误提示
              return
            }
            if ((cont2>=cont3) && cont3 !== 0){ // 再校验第三个填写和值比较
              this.errorTip = true; // 显示错误提示
              return
            }
          }
          if (cont3 !== 0) { // 第三个填写写状态
            if (cont1 === 0) { // 先校验第一个是否填写
              this.errorTip = true; // 显示错误提示
              return
            }
            if (cont2 === 0) { // 先校验第二个是否填写
              this.errorTip = true; // 显示错误提示
              return
            }
            if ((cont1 >= cont2)  && cont1 !== 0) { // 第一个填写状态与第二个的之比较
              this.errorTip = true; // 显示错误提示
              return
            }
            if ((cont2>=cont3) && cont3 !== 0){ // 再校验第三个填写和值比较
              this.errorTip = true; // 显示错误提示
              return
            }
          }
          this.errorTip = false; // 显示错误提示
          this.contList.cont1 = cont1;
          this.contList.cont2 = cont2;
          this.contList.cont3 = cont3;
        },
        deep: true
      },
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
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        console.log("============================")
        console.log(vm)
        console.log(vm.$route.query.agin)
        console.log(vm.$route.query.update)
        if(vm.$route.query.instrucTitle){
          document.title = vm.$route.query.instrucTitle
        }
      })
    },
    created() {
      this.wxApiG();
      console.log(this.DTA, '--------------------DTA-----------')
      this.$store.commit('setML',this.moneyList)
      if (this.$route.query.agin || this.$route.query.update) {
        if(this.$route.query.orderId){
          this.orderId = this.$route.query.orderId;
          this.LS.setItem("orderId",this.$route.query.orderId)
          // 订单回填
          API._caigouDetail(this.orderId).then(res => {
            wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
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
                console.log(this.$refs.DZcaigou.mi_title_stitle_img, '采购数据');
                this.beizhu = this.INPUT_TEXT_A[0];
                // s收货地址
                console.log(myContent, '----------------myContent收获地址数据------------')
                this.editAddList.addrName = myContent.receivUser
                this.editAddList.addrPhone = myContent.receivPhone
                this.editAddList.receivPcode = myContent.receivPcode;
                this.editAddList.receivCcode = myContent.receivCcode;
                this.editAddList.receivAcode = myContent.receivAcode;
                this.editAddList.addrPcodeStr = myContent.receivPcodeStr;
                this.editAddList.addrCcodeStr = myContent.receivCcodeStr;
                this.editAddList.addrAcodeStr = myContent.receivAcodeStr;
                this.editAddList.address = myContent.receivName
                this.editAddList.id = 1
                console.log(this.editAddList, '-------------------this.editAddList----------------')
                // 执行渲染添加模块
                this.renderAddM(res);
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
          document.title = res.content.instrucTitle
          this.instrucState = res.content.instrucState; // 判断发布状态， 0 未发布， 1 发布
          this.instrucState2 = res.content.isPut; //  1投放中 非1不是投放中
          this.orderSubmit.instrucId = JSON.parse(JSON.stringify(res.content.instrucId));
          this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context));
          this.modulesData = JSON.parse(
            JSON.stringify(res.content.context.tempCon.modules)
          );
          for (let i in this.modulesData) {
            if(this.modulesData[i].type === "MONEY_A") {
              console.log(JSON.parse(JSON.stringify(this.modulesData[i].moneyList)), '--------------接口返回数据中的价格------------')
              let CBlist = this.modulesData[i].moneyList
              this.$store.commit('setML',CBlist)
              console.log(typeof(this.GET_MONEY_LIST), '新的数据')
            }
          }
          this.LS.setItem('instrcName', res.content.instrucTitle)
          this.LS.setItem('instrcDesc', res.content.instrucIntro)
          wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
          this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
          this.BAK_DATA = JSON.parse(
            JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA)))
          );
          console.log("是否为可编辑状态1111：" + this.GET_EDITABLE);
          this.goShow();
          this.agin = true;
          this.againEditting = true;
          this.renderIf()
          this.DShow = true;
          // 是否显示采购数量
          if(!this.LS.getItem("orderList")){
          } else {
            // this.DShow = true;
            let OL = this.LS.getItem("orderList")
            let lh = this.LS.getItem("orderList").length
            for(let i=0; i<lh; i++) {
              if(OL[i].type === "INPUT_TABLE_B"){
                this.$refs.DZcaigou.mi_title_stitle_img = OL[i]
              }
            }
          }
          //
          // 保障
          for (let i = 0; i < this.modulesData.length; i++) {
            // 备注
            if(this.modulesData[i].type === "INPUT_TEXT_A"){
              this.beizhu = this.modulesData[i]
            }
            // 最小起批
            if(this.modulesData[i].type === "MONEY_A"){
              console.log("---------------------------------")
              console.log(this.modulesData[i].moneyList[0].minCount)
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
              console.log("curList------------")
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
              console.log("curList------------")
              console.log(curList)
              this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key += curList[0]
            }
            // 采购选项 INPUT_CHECK_A
            if(this.modulesData[i].type === "INPUT_CHECK_A"){
              let list = this.modulesData[i].dataList
              let curList = list.map(item=>{
                let obj={
                  img:'',
                  text: '',
                  value: ''
                };
                //给采购订单组件赋值
                obj.img = item.imgUrl;
                obj.text = item.title;
                obj.value = item.title;
                return obj
              })
              console.log(curList, '传值到子列表的curList');
              this.$refs.DZcaigou.value1 = curList
            }
            if(this.modulesData[i].type === "INPUT_CHECK_B"){
              let list = this.modulesData[i].dataList
              console.log(list, '---------------------list222222222222222---------------------')
              let curList = list.map(item=>{
                let obj={
                  img:'',
                  text: '',
                  value: ''
                };
                //给采购订单组件赋值
                obj.img = item.imgUrl;
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
            this.$refs.comPSIZE.mi_title_stitle_img = this.CPsize[1];
            // 定制信息
            this.$refs.base.mi_title_stitle_img = this.INPUT_TABLE_A[0];
            this.$refs.DZimgc1.mi_title_stitle_img = this.INPUT_CHECK_A[0];
            this.$refs.DZimgc2.mi_title_stitle_img = this.INPUT_CHECK_B[0];
            this.$refs.DZimgc3.mi_title_stitle_img = this.INPUT_IMG_A[0];
            this.$refs.DZcaigou.mi_title_stitle_img = this.INPUT_TABLE_B[0];
            // 执行渲染添加模块
            this.renderAddM(res);
          },800)
          // 微信分享
          // this.wxApiG();
        });
      } else if (this.$route.query.confirmEdit) {
        wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
        // 入口为模板选择
        API._getTempDetail(this.$route.query.tempId, "").then(res => {
          this.LS.setItem('instrcName', res.content.tempName)
          this.LS.setItem('instrcDesc', res.content.tempIntro)
          this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context)); // 模板原始数据
          console.log( res.content.instrucCustType,'-------------------instrucCustType------------------')
          this.instrucCustType = res.content.instrucCustType
          this.modulesData = JSON.parse(JSON.stringify(res.content.context.tempCon.modules)); // 接口返回模板子项集合
          this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
          this.BAK_DATA = JSON.parse(
            JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA)))
          );
          this.renderIf()
          // 微信分享
          this.wxApiG();
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
              this.BZdataList.map((item, index) =>{
                if (item.value === '7天包换' || item.value === '15天包换' || item.value === '21天包换' || item.value === '60天包换') {
                  this.Required.Required1 = item.value
                } else if (item.value === '7天内发货' || item.value === '15天内发货' || item.value === '30天内发货'){
                  this.Required.Required2 = item.value
                } else if (item.value === '破损补寄'){
                  this.Required.Required3 = item.value
                } else if (item.value === '交期保障'){
                  this.Required.Required4 = item.value
                } else if (item.value === '材质保障'){
                  this.Required.Required5 = item.value
                } else{
                  this.Required.Required6 = item.value
                }
              })
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
          this.$refs.comPSIZE.mi_title_stitle_img = this.CPsize[1];
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
      } else if (this.$route.query.instrucId && this.$route.query.tempId && !this.$route.query.wxId) {
        // 入口为再次编辑
        console.log("入口为编辑");
        API._InstrucDetails(this.$route.query.instrucId).then(res => {
          this.rootData = JSON.parse(JSON.stringify(res.content));
          this.instrucState = res.content.instrucState; // 判断发布状态， 0 未发布， 1 发布
          this.instrucState2 = res.content.isPut; //  1投放中 非1不是投放中
          console.log(this.instrucState, '编辑-----------------判断发布状态， 0 未发布， 1 发布')
          this.orderSubmit.instrucId = JSON.parse(JSON.stringify(res.content.instrucId));
          this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context));
          this.modulesData = JSON.parse(
            JSON.stringify(res.content.context.tempCon.modules)
          );
          this.LS.setItem('instrcName', res.content.instrucTitle)
          this.LS.setItem('instrcDesc', res.content.instrucIntro)
          for (let i in this.modulesData) {
            if(this.modulesData[i].type === "MONEY_A") {
              console.log(JSON.parse(JSON.stringify(this.modulesData[i].moneyList)), '--------------接口返回数据中的价格------------')
              let CBlist = this.modulesData[i].moneyList
              this.$store.commit('setML',CBlist)
              console.log(typeof(this.GET_MONEY_LIST), '新的数据')
            }
          }
          this.renderIf()
          // this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
          this.$store.commit('SET_TEMP_DATA', this.TEMP_ROOT_DATA);
          this.BAK_DATA = JSON.parse(
            JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA)))
          );
          console.log("是否为可编辑状态：" + this.GET_EDITABLE);
          // this.goShow();
          this.agin = false;
          this.againEditting = true;
          // 微信分享
          this.wxApiG();
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
              // 获取已选项
              this.BZdataList = this.modulesData[i].dataList;
              this.BZdataList.map((item, index) =>{
                if (item.value === '7天包换' || item.value === '15天包换' || item.value === '21天包换' || item.value === '60天包换') {
                  this.Required.Required1 = item.value
                } else if (item.value === '7天内发货' || item.value === '15天内发货' || item.value === '30天内发货'){
                  this.Required.Required2 = item.value
                } else if (item.value === '破损补寄'){
                  this.Required.Required3 = item.value
                } else if (item.value === '交期保障'){
                  this.Required.Required4 = item.value
                } else if (item.value === '材质保障'){
                  this.Required.Required5 = item.value
                } else{
                  this.Required.Required6 = item.value
                }
              })
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
            this.$refs.comPSIZE.mi_title_stitle_img = this.CPsize[1];
            // 定制信息
            this.$refs.base.mi_title_stitle_img = this.INPUT_TABLE_A[0];
            this.$refs.DZimgc1.mi_title_stitle_img = this.INPUT_CHECK_A[0];
            this.$refs.DZimgc2.mi_title_stitle_img = this.INPUT_CHECK_B[0];
            this.$refs.DZimgc3.mi_title_stitle_img = this.INPUT_IMG_A[0];
            this.$refs.base.isCus = true;
            // this.$refs.DZcaigou.mi_title_stitle_img = this.INPUT_TABLE_B[0];
            // 微信分享
            // this.wxApiG();
            // 执行渲染添加模块
            this.renderAddM(res);
          },500)
          wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
          console.log(this.rootData, '-------------->------------this.rootData')
          console.log(this.orderSubmit.instrucId, '-------------->------------this.orderSubmit.instrucId')
          console.log(this.TEMP_ROOT_DATA, '-------------->------------this.TEMP_ROOT_DATA')
          console.log(this.modulesData, '-------------->------------this.modulesData')
          this.goShow();
        });

      }
      if (this.$route.query.wxId) {
        this.LS.setItem('wxId', this.$route.query.wxId)
        if (this.$route.query.userId !== 'undefined' && !this.$route.query.source) {
          this.LS.setItem('userId', this.$route.query.userId)
        }
        console.log("beforeCreate入口为分享");
        API._shareTotals(0,this.rootData.instrucId).then(res => {
          console.log(res, '用户访问了')
        })
        //获取说明书数据
        API._UserSeeInstrucDetails(
          this.$route.query.instrucId,
          this.$route.query.wxId
        ).then(res => {
          if (res.ret == API.ERROK) {
            this.rootData = JSON.parse(JSON.stringify(res.content));
            document.title = res.content.instrucTitle
            this.orderSubmit.instrucId = JSON.parse(JSON.stringify(res.content.instrucId));
            this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context));
            this.modulesData = JSON.parse(
              JSON.stringify(res.content.context.tempCon.modules)
            );
            for (let i in this.modulesData) {
              if(this.modulesData[i].type === "MONEY_A") {
                console.log(JSON.parse(JSON.stringify(this.modulesData[i].moneyList)), '--------------接口返回数据中的价格------------')
                let CBlist = this.modulesData[i].moneyList
                this.$store.commit('setML',CBlist)
                console.log(typeof(this.GET_MONEY_LIST), '新的数据')
              }
            }
            wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
            this.setTempData(JSON.parse(JSON.stringify(res.content.context)));
            this.BAK_DATA = JSON.parse(
              JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA)))
            );
            console.log("是否为可编辑状态1111：" + this.GET_EDITABLE);
            this.goShow();
            this.renderIf()
            this.DShow = true;
            // 是否显示采购数量
            if(!this.LS.getItem("orderList")){
            } else {
              // this.DShow = true;
              let OL = this.LS.getItem("orderList")
              let lh = this.LS.getItem("orderList").length
              for(let i=0; i<lh; i++) {
                if(OL[i].type === "INPUT_TABLE_B"){
                  this.$refs.DZcaigou.mi_title_stitle_img = OL[i]
                }
              }
            }
            //
            // 保障
            for (let i = 0; i < this.modulesData.length; i++) {
              // 备注
              if(this.modulesData[i].type === "INPUT_TEXT_A"){
                this.beizhu = this.modulesData[i]
              }
              // 最小起批
              if(this.modulesData[i].type === "MONEY_A"){
                console.log("---------------------------------")
                console.log(this.modulesData[i].moneyList[0].minCount)
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
                console.log("curList------------")
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
                console.log("curList------------")
                console.log(curList)
                this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key += curList[0]
              }
              // 采购选项 INPUT_CHECK_A
              if(this.modulesData[i].type === "INPUT_CHECK_A"){
                let list = this.modulesData[i].dataList
                let curList = list.map(item=>{
                  let obj={
                    img:'',
                    text: '',
                    value: ''
                  };
                  //给采购订单组件赋值
                  obj.img = item.imgUrl;
                  obj.text = item.title;
                  obj.value = item.title;
                  return obj
                })
                this.$refs.DZcaigou.value1 = curList
              }
              if(this.modulesData[i].type === "INPUT_CHECK_B"){
                let list = this.modulesData[i].dataList
                console.log(list, '---------------------list222222222222222---------------------')
                let curList = list.map(item=>{
                  let obj={
                    img:'',
                    text: '',
                    value: ''
                  };
                  //给采购订单组件赋值
                  obj.img = item.imgUrl;
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
              this.$refs.comPSIZE.mi_title_stitle_img = this.CPsize[1];
              // 定制信息
              this.$refs.base.mi_title_stitle_img = this.INPUT_TABLE_A[0];
              this.$refs.DZimgc1.mi_title_stitle_img = this.INPUT_CHECK_A[0];
              this.$refs.DZimgc2.mi_title_stitle_img = this.INPUT_CHECK_B[0];
              this.$refs.DZimgc3.mi_title_stitle_img = this.INPUT_IMG_A[0];
              this.$refs.DZcaigou.mi_title_stitle_img = this.INPUT_TABLE_B[0];
              // 执行渲染添加模块
              this.renderAddM(res);
            },800)
          }
          wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
        });
      }
      //-----------------------------从商机进来的逻辑------------------------
      if (this.$route.query.source) {
        console.log('从商机进来');
        if (localStorage.getItem('query')) {
          if (this.$route.query.source === 'FB') {
            console.log('从商机的发现商机进来');
            this.sourceFBin();
          } else if (this.$route.query.source === 'FI') {
            console.log('从商机的流量页进来');
            this.sourceFIin();
          };
        };
      };
    },
    beforeMount(){
      //微信分享sdk
    },
    mounted() {
      console.log(this.GET_MONEY_LIST, '--------------------store中价格明细-----------------》')
      // this.$store.state.moneyList[0].money = "";
      // this.$store.state.moneyList[0].minCount = "";
      // this.$store.state.moneyList[1].money = "";
      // this.$store.state.moneyList[1].minCount = "";
      // this.$store.state.moneyList[2].money = "";
      // this.$store.state.moneyList[2].minCount = "";
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
      if (this.$route.query.lookMyInstrc) {
        this.goShow();
        this.look = true;
        //说明书访问统计
        // API._instrucDate('0', this.$route.query.instrucId).then((res) => {
        // })

      }
      setTimeout(()=>{
        console.log(this.instrucState, '选然后-----------------判断发布状态， 0 未发布， 1 发布')
      },1500)
      // 如果支持 popstate 一般移动端都支持了
      if (window.history && window.history.pushState) {
        // 往历史记录里面添加一条新的当前页面的url
        history.pushState(null, null, document.URL);
        // 给 popstate 绑定一个方法 监听页面刷新
        window.addEventListener('popstate', this.backChange, true);//false阻止默认事件
      }
      // 如何让秀进来判断是否为会员
      if (localStorage.getItem('isMember')) {
        let isMember = JSON.parse(localStorage.getItem('isMember')); // 获取缓存中的会员信息
        if (isMember === 'true'){ // 判断是否为会员，会员是true
          this.sourceFBisMember = !this.sourceFBisMember; // 会员可编辑
        } else if (isMember === 'false') {
          this.sourceFBisMember2 = true
        }
        this.goShow(); // 进入预览
      }
      // 从陌拜商机会员进来
      if (localStorage.getItem('queryMC')) {
        let queryMC = JSON.parse(localStorage.getItem('queryMC'));
        console.log(queryMC.isMember, '--------------queryMC.isMember----------');
        if (queryMC.isMember === 'true'){ // 判断是否为会员，会员是true
          this.sourceFBisMember = !this.sourceFBisMember; // 会员可编辑
        } else if (queryMC.isMember === 'false') {
          this.sourceFBisMember2 = true
        }
        this.goShow(); // 进入预览
      }
    },
    destroyed () {
      if (this.$route.query.source) {
        window.removeEventListener('popstate', this.backChange, false);//false阻止默认事件
      }
      if (!this.$route.query.source && !this.$route.query.sourceMember) {
        localStorage.removeItem('queryMC'); // 移除链接缓存的参数queryMC
        localStorage.removeItem('query'); // 移除链接缓存的参数
        localStorage.removeItem('shareStatus'); // 移除分享结果缓存参数
      }
    },
    methods: {
      sourceFBin () { // 进入详情页触发
        console.log('来源发现商机 --- 进入详情页触发');
        setInterval(() => {
          this.userStopTime++;
        }, 1000);
        let params = { // 记录用户停留时间
          "type":"0",
          "instId":Number(this.$route.query.instrucId)
        }
        API._instrucDate(params.type, params.instId).then(res => {
          console.log(res);
        });
      },
      sourceFBout () { // 离开详情页触发
        console.log('来源发现商机 --- 离开详情页触发');
        setInterval(() => {
          this.userStopTime++;
        }, 1000);
        let query = JSON.parse(localStorage.getItem('query')); // 读取缓存的query
        if (localStorage.getItem('shareStatus')) {
          console.log(query.herf);
          let shareStatus = JSON.parse(localStorage.getItem('shareStatus'));
          if (Number(shareStatus.instrucId) === Number(this.$route.query.instrucId)) { // 如果换从的商机id和当前的一致，测判断为已分享
            query.herf = query.herf + '?instrucIdShare=' + shareStatus.instrucId + '&share=' + shareStatus.share;
          }
        }
        let params = { // 记录用户停留时间
          "type":"7",
          "instId":Number(this.$route.query.instrucId),
          "stopTime": this.userStopTime
        }
        API._instrucDate2(params.type, params.instId, params.stopTime).then(res => {
          console.log(res);
          window.clearInterval(); // 清除时间器
          window.location.href = query.herf;
          localStorage.removeItem('query'); // 移除链接缓存的参数
          localStorage.removeItem('shareStatus'); // 移除分享结果缓存参数
        });
      },
      sourceFIin () { // 进入详情页触发
        console.log('来源流量入口 --- 进入详情页触发');
        setInterval(() => {
          this.userStopTime++;
        }, 1000);
        let query = JSON.parse(localStorage.getItem('query')); // 读取缓存的query
        let params = { // 记录用户访问数
          "type":"0",
          "sessionId":query.sessionId,
          "instId":Number(this.$route.query.instrucId)
        }
        API._setAdveData(params).then(res => {
          console.log(res);
        });
        //说明书访问统计
        API._instrucDate('0', this.$route.query.instrucId).then((res) => {
        })
      },
      sourceFIout () { // 离开详情页触发
        console.log('来源流量入口 --- 离开详情页触发');
        // 《《《《《《《《《《----------------------测试使用，测试分享数据-----------------------
        // let shareStatus = {
        //   instrucId: Number(this.$route.query.instrucId),
        //   share: true
        // };
        // localStorage.setItem('shareStatus', JSON.stringify(shareStatus));
        // ----------------------测试使用，测试分享数据-----------------------》》》》》》》》》》》
        let query = JSON.parse(localStorage.getItem('query')); // 读取缓存的query
        if (localStorage.getItem('shareStatus')) {
          console.log(query.herf);
          let shareStatus = JSON.parse(localStorage.getItem('shareStatus'));
          if (Number(shareStatus.instrucId) === Number(this.$route.query.instrucId)) { // 如果换从的商机id和当前的一致，测判断为已分享
            query.herf = query.herf + '&instrucIdShare=' + shareStatus.instrucId + '&share=' + shareStatus.share;
          }
        }
        let params = { // 记录用户停留时间
          "type":"6",
          "sessionId":query.sessionId,
          "instId":Number(this.$route.query.instrucId),
          "stopTime": this.userStopTime
        }
        API._setAdveData(params).then(res => {
          console.log(res);
          let params = { // 记录用户停留时间
            "type":"7",
            "instId":Number(this.$route.query.instrucId),
            "stopTime": this.userStopTime
          }
          query.herf = query.herf + '&sessionId=' + query.sessionId;
          API._instrucDate2(params.type, params.instId, params.stopTime).then(res => {
            window.clearInterval(); // 清除时间器
            window.location.href = query.herf;
            localStorage.removeItem('query'); // 移除链接缓存的参数
            localStorage.removeItem('shareStatus'); // 移除分享结果缓存参数
          });
        });
      },
      backChange() {
        // 销毁定时器
        if (this.$route.query.source) { // 用户返回商机首页和流量页
          console.log('从商机进来');
          if (localStorage.getItem('query')) {
            if (this.$route.query.source === 'FB') {
              console.log('从商机的发现商机进来');
              this.sourceFBout();
            } else if (this.$route.query.source === 'FI') {
              console.log('从商机的流量页进来');
              this.sourceFIout();
            };
          }
        };
        if (this.$route.query.sourceMember) { // 用户返回商机会员页面
          let queryMC = JSON.parse(localStorage.getItem('queryMC')); // 读取缓存的queryMC
          window.location.href = queryMC.herf;
          localStorage.removeItem('queryMC'); // 移除链接缓存的参数queryMC
        }
      },
      DZbaseShow(data){ // 基本
        if (data === 1){
          this.baseShow = false
        }
        console.log(data,'侦听子组件变化')
      },
      DZimgShow(data){ // 图片
        if (data === 1){
          this.imgShow = false
        }
        console.log(data,'侦听子组件变化')
      },
      DZstyleShow(data){ // 样式
        if (data === 1){
          this.styleShow = false
        }
        console.log(data,'侦听子组件变化')
      },
      DZaddImgShow(data){ // 添加图片
        if (data === 1){
          this.ImgShow = false
        }
        console.log(data,'侦听子组件变化')
      },
      /**
       * [wxShareConfigure 用于微信页面分享配置]
       */
      wxShareConfigure(){
        if ((this.$route.query.agin || this.$route.query.wxId || this.$route.query.instrucTitle) && this.instrucState !=='0') {
            shareCont.instrucId = this.rootData.instrucId,
            shareCont.shareTitle=this.rootData.instrucTitle; // 分享标题
            shareCont.shareIntro = this.rootData.instrucIntro; // 分享文字介绍
            shareCont.shareImg = this.rootData.bannerImg; // 分享图片
            shareCont.shareLink = "http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl?instrucId=" + this.TEMP_ROOT_DATA.instrucId + "&tempId=" + this.TEMP_ROOT_DATA.tempId + "&urlName=" + this.TEMP_ROOT_DATA.path; // 分享链接
        }
        console.log(shareCont, '---------------------------shareCont---------------------')
        wxShareTimeline(shareCont);
        wxShareAppMessage(shareCont);
      },
      // 渲染添加的模块
      renderAddM(i){
        let addModules = LS.getItem("addModules");
        if(addModules.id == i.content.instrucId){
          console.log("11111111111111111");
          console.log(addModules);
          this.addM1 = addModules.addM1;
          this.addM2 = addModules.addM2;
          this.addM3 = addModules.addM3;
          this.addM4 = addModules.addM4;
          this.addM5 = addModules.addM5;
          this.$refs.addM1.mi_title_stitle_img = addModules.base;
          this.$refs.addM2.mi_title_stitle_img = addModules.imgC1;
          this.$refs.addM3.mi_title_stitle_img = addModules.imgC2;
          this.$refs.addM4.mi_title_stitle_img = addModules.imgC3;
        }
      },
      // 获取新添加的模块值
      // getBaseVal(){

      // },
      //拖动排序函数
      getdata(evt) {
        console.log(evt.draggedContext.element)
      },
      // 拖动排序完毕执行函数
      datadragEnd: function (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
      },
      // 排序
      paixu(){
        this.$refs.sortModule.style.top = 0
        // this.$refs.ediTingBtmBtns.style.height = 0
      },
      hidePaixu(){
        this.$refs.sortModule.style.top = '100%'
      },
      // 选择模块
      selThisMd(i){
        this.selMdTips = i+1;
        console.log(this.modulesData)
        switch(i){
          case 0:
            this.addModule = {
              dataList:[
                {key1: '四字为限', value: '', key2: '四字为限'},
                {key1: '四字为限', value: '', key2: '四字为限'},
                {key1: '四字为限', value: '', key2: '四字为限'}
              ],
              title: '基本信息',
              type: 'INPUT_TABLE_A'
            };
            this.navAdd = "基本信息";
            LS.setItem("base",this.addModule)
            break;
          case 1:
            this.addModule = {
              dataList:[
                {imgUrl: 'http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png', select: false, title: '5字为限'},
                {imgUrl: 'http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png', select: false, title: '5字为限'},
                {imgUrl: 'http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-05.png', select: false, title: '5字为限'},
              ],
              title: '图片选择',
              type: 'INPUT_CHECK_A'
            };
            this.navAdd = "图片选择";
            LS.setItem("imgC1",this.addModule)
            break;
          case 2:
            this.addModule = {
              dataList:[
                {imgUrl: 'http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-06.png', select: false, title: '5字为限', content: '这里是关于图片的具体描述信息，这里是关于图片的具体描述信息'},
                {imgUrl: 'http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-06.png', select: false, title: '5字为限', content: '这里是关于图片的具体描述信息，这里是关于图片的具体描述信息'},
                {imgUrl: 'http://style.iambuyer.com/img/temp-cust-imgs/temp-cust-imgs-content-06.png', select: false, title: '5字为限', content: '这里是关于图片的具体描述信息，这里是关于图片的具体描述信息'}
              ],
              title: '样式选择',
              type: 'INPUT_CHECK_B'
            };
            this.navAdd = "样式选择";
            LS.setItem("imgC2",this.addModule)
            break;
          case 3:
            this.addModule = {
              dataList:[],
              content: '照片最多可添加三张哦',
              title: '添加照片',
              type: 'INPUT_IMG_A'
            };
            this.navAdd = "添加照片";
            LS.setItem("imgC3",this.addModule)
            break;
          case 4:
            this.addModule = {
              content: '',
              title: '备注说明',
              type: 'INPUT_TEXT_A'
            };
            this.navAdd = "备注说明";
            break;
        }
      },
      // 添加新项
      addMd(){
        this.BZdataList = [] // 添加实力保障选项时原始数据置空
        let that = this;
        var promise = new Promise(function(resolve, reject) {
          for (var i in that.Required) {
            if (that.Required[i] !== '') {
              that.BZdataList.push({'value' : that.Required[i]}) // 将选择的数组放入渲染数组中
            }
          }
          resolve();
        });

        promise.then(function() { // 异步操作
          that.modulesData.map((item,index)=>{
            if (item.type === 'SELECT_B') {
              item.dataList = that.BZdataList
            }
          })
          this.btnSub = false
        });
        that.hideAdd();
        that.hideAdd1();
        that.paixunList.push(that.navAdd)
        // this.modulesData[this.modulesData.length] = this.addModule;
        // console.log(this.modulesData);
        switch(that.selMdTips){
          case 1:
            that.addM1 = true;
            LS.setItem("addM1",true)
            break;
          case 2:
            that.addM2 = true;
            LS.setItem("addM2",true)
            break;
          case 3:
            that.addM3 = true;
            LS.setItem("addM3",true)
            break;
          case 4:
            that.addM4 = true;
            LS.setItem("addM4",true)
            break;
          case 5:
            that.addM5 = true;
            LS.setItem("addM5",true)
            break;
        }
      },
      // 添加模块
      addModules(){
        this.$refs.selModule.style.top = 0;
        this.$refs.addTisMd.style.bottom = 0;
      },
      hideAdd1(){
        this.btnSub = false
        this.$refs.selModule1.style.top = "100%"
        this.$refs.addTisMd1.style.bottom = '-1.2rem'
      },
      hideAdd(){
        this.$refs.selModule.style.top = "100%"
        this.$refs.addTisMd.style.bottom = '-1.2rem'
      },
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
        if (!LS.getItem("userId") || LS.getItem("userId") === 'undefined') { // 本地不存在登录信息
          this.$router.push("/landRegistration")
        }
        // if (this.$route.query.source) { // 从流量页面进入
        //   console.log('从商机进来');
        //   if (this.$route.query.source === 'FB') {
        //     window.location.href = window.location.href.split('cust')[0];
        //   } else if (this.$route.query.source === 'FI') {
        //     console.log('从商机的流量页进来');
        //     window.location.href = window.location.href.split('cust')[0];
        //     return false;
        //   };
        // };
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


        if(this.$refs.DZcaigou.mi_title_stitle_img.dataList[0].key == ""){
          this.$vux.toast.show({
            type: 'text',
            width: "7.6rem",
            // position: "bottom",
            text: "请勾选样式/款式",
            time: 1500,
          });
          document.getElementById('ruhexiu').scrollIntoView();
          document.getElementById('ruhexiu').style.scrollMarginTop = this.$refs.DZcaigou.$el.offsetTop;
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
            if (this.$route.query.modify) {
              this.$router.push({path: "/lijidingzhi", query: {modify: '1'}})
            } else {
              this.$router.push({path: "/lijidingzhi", query: {}})
            }
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
        //第一次提交
        console.log(this.instrucState2, '获取此说明书发布状态1，代表发布中，此时不可编辑，不可完善，不可删除');
        if (Number(this.instrucState2) === 1) { // 判断发布中状态的操作
          this.$vux.toast.show({
            width: "60%",
            text: "发布中不可编辑！",
            type: "text",
            position: "middle",
            onHide: () => {
              // this.wantAddTel = ''
            }
          });
          return;
        }
        let dataList = this.GET_MONEY_LIST;
        console.log(dataList[0], '---------------------dataList------------------>1')
        if (dataList[0].minCount === 0 && dataList[1].minCount === 0 && dataList[2].minCount === 0 && dataList[0].money === '' && dataList[1].money === '' && dataList[2].money === '') { // 价格明细都为空
          this.$vux.toast.show({
            width: "90%",
            type: "text",
            text: '请至少填写一组对应的起批量和价格',
            position: 'middle',
            time: 1500
          });
          this.errorTip = true; // 显示价格明细错误提示
          console.log('都为空')
        } else {
          console.log('有不为空的项')
          if (dataList[0].minCount === 0 || dataList[0].money === '')  { // 第一组数据不能为空
            console.log('第一组为空的项')
            this.$vux.toast.show({
              width: "90%",
              type: "text",
              text: '请至少填写一组对应的起批量和价格',
              position: 'middle',
              time: 1500
            });
            this.errorTip = true; // 显示价格明细错误提示
          } else if ((dataList[0].minCount !== 0 && dataList[0].money === '') || (dataList[0].minCount === 0 && dataList[0].money !== '')) {
            console.log('第一组为空的项')
            this.$vux.toast.show({
              width: "90%",
              type: "text",
              text: '请至少填写一组对应的起批量和价格',
              position: 'middle',
              time: 1500
            });
            this.errorTip = true; // 显示价格明细错误提示
          } else if ((dataList[1].minCount !== 0 && dataList[1].money === '') || (dataList[1].minCount === 0 && dataList[1].money !== '')) {
            console.log('第二组为空的项')
            this.$vux.toast.show({
              width: "90%",
              type: "text",
              text: '请至少填写一组对应的起批量和价格',
              position: 'middle',
              time: 1500
            });
            this.errorTip = true; // 显示价格明细错误提示
          } else if ((dataList[2].minCount !== 0 && dataList[2].money === '') || (dataList[2].minCount === 0 && dataList[2].money !== '')) {
            console.log('第三组为空的项')
            this.$vux.toast.show({
              width: "90%",
              type: "text",
              text: '请至少填写一组对应的起批量和价格',
              position: 'middle',
              time: 1500
            });
            this.errorTip = true; // 显示价格明细错误提示
          } else {
            this.errorTip = false; // 隐藏价格明细错误提示
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
                // this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
                console.log(i)
                if(i>0){
                  this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
                } else {
                  this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
                }
              } else if(this.modulesData[i].type === 'IMG_CONTENT_A') {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPJX.mi_title_stitle_img;
                console.log(i)
              } else if(this.modulesData[i].type === 'IMG_B') {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPXJ.mi_title_stitle_img;
                console.log(i)
              } else if(this.modulesData[i].type === 'IMG_A') {
                // this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
                console.log(i)
                if(i>0){
                  this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
                } else {
                  this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
                }
              } else if(this.modulesData[i].type === 'MONEY_A') {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
                if (!this.$route.query.instrucId) {
                  this.TEMP_ROOT_DATA.tempCon.modules[i].moneyList = this.GET_MONEY_LIST
                }
                console.log(i)
              } else if(this.modulesData[i].type === 'TABLE_A') {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
                console.log(i)
              } else if(this.modulesData[i].type === 'SELECT_B') {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
                console.log(i, this.modulesData[i], '--------------------this.modulesData[i]-----------------')
              } else if(this.modulesData[i].type === 'SELECT_A') {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
                console.log(i)
              } else if(this.modulesData[i].type === 'TEXT_A') {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
                console.log(i)
              }
            }
            // this.goShow()
            setTimeout(() => {
              this.setTempData(JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)));
              this.LS.setItem(
                "_IN_DATA",
                JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA))
              );
              let num0 = this.$store.state.moneyList[0].minCount || 0
              num0= Number(num0);
              let num1 = this.$store.state.moneyList[1].minCount || 0
              num1= Number(num1);
              let num2 = this.$store.state.moneyList[2].minCount || 0
              num2= Number(num2);
              let routerQuery = { // 定义路由参数
                formal: "200",
                instrucCustType: this.instrucCustType
              }
              if (this.againEditting){
                routerQuery = { // 定义路由参数
                  update: "200",
                  instrucId: this.$route.query.instrucId,
                  instrucCustType: this.instrucCustType
                }
                // if (this.instrucState === '0'){
                //   delete routerQuery.update;
                //   routerQuery.formal=200
                // }
                console.log("num0是："+num0,"num1是："+num1,"num2是："+num2)
                console.log("测试更新说明书5555");
                this.$store.commit('getInstrucTitle',this.rootData.instrucTitle)
                this.$store.commit('getInstrucIntro',this.rootData.instrucIntro)
              }
                console.log("测试第一次提交");
                //第一次提交

                if(num2!==0){
                  console.log(2)
                  if(num2<=num1 || num1<=num0){
                    console.log("num0是："+num0,"num1是："+num1,"num2是："+num2)
                    this.$vux.toast.show({
                      width: "90%",
                      type: "text",
                      text: '起批量和价格填写错误',
                      position: 'middle',
                      time: 1500
                    });
                    this.errorTip = true; // 显示价格明细错误提示
                  }else{
                    this.$router.push({
                      path: "/adddesc",
                      query: routerQuery
                    });
                    this.errorTip = false; // 隐藏价格明细错误提示
                  }
                } else if (num1!==0){
                  console.log(1, 'hhhhhhhhhhhhhhhh')
                  if(num0 >= num1){
                    console.log("num0是："+num0,"num1是："+num1,"num2是："+num2)
                    this.$vux.toast.show({
                      width: "90%",
                      type: "text",
                      text: '起批量和价格填写错误',
                      position: 'middle',
                      time: 1500
                    });
                    this.errorTip = true; // 显示价格明细错误提示
                  }else{
                    this.$router.push({
                      path: "/adddesc",
                      query: routerQuery
                    });
                    this.errorTip = false; // 隐藏价格明细错误提示
                  }
                } else {
                  this.$router.push({
                    path: "/adddesc",
                    query: routerQuery
                  });
                  this.errorTip = false; // 隐藏价格明细错误提示
                }
                // this.$router.push({
                //   path: "/adddesc",
                //   query: { formal: "200", instrucCustType: this.instrucCustType }
                // });
            }, 188);
          }
          // this.addMd();
        }
      },
      // 存草稿操作
      saveDraft() {
        this.instrucCustType = 0;
        this.$store.commit('getInstrucTitle','')
        this.$store.commit('getInstrucIntro','')//第一次提交
        let dataList = this.GET_MONEY_LIST;
        console.log(dataList[0], '---------------------dataList------------------>1')
        if (dataList[0].minCount === 0 && dataList[1].minCount === 0 && dataList[2].minCount === 0 && dataList[0].money === '' && dataList[1].money === '' && dataList[2].money === '') { // 价格明细都为空
          this.$vux.toast.show({
            width: "90%",
            type: "text",
            text: '请至少填写一组对应的起批量和价格',
            position: 'middle',
            time: 1500
          });
          this.errorTip = true; // 显示价格明细错误提示
          console.log('都为空')
        } else {
          console.log('有不为空的项')
          if (dataList[0].minCount === 0 || dataList[0].money === '')  { // 第一组数据不能为空
            console.log('第一组为空的项')
            this.$vux.toast.show({
              width: "90%",
              type: "text",
              text: '请至少填写一组对应的起批量和价格',
              position: 'middle',
              time: 1500
            });
            this.errorTip = true; // 显示价格明细错误提示
          } else if ((dataList[0].minCount !== 0 && dataList[0].money === '') || (dataList[0].minCount === 0 && dataList[0].money !== '')) {
            console.log('第一组为空的项')
            this.$vux.toast.show({
              width: "90%",
              type: "text",
              text: '请至少填写一组对应的起批量和价格',
              position: 'middle',
              time: 1500
            });
            this.errorTip = true; // 显示价格明细错误提示
          } else if ((dataList[1].minCount !== 0 && dataList[1].money === '') || (dataList[1].minCount === 0 && dataList[1].money !== '')) {
            console.log('第二组为空的项')
            this.$vux.toast.show({
              width: "90%",
              type: "text",
              text: '请至少填写一组对应的起批量和价格',
              position: 'middle',
              time: 1500
            });
            this.errorTip = true; // 显示价格明细错误提示
          } else if ((dataList[2].minCount !== 0 && dataList[2].money === '') || (dataList[2].minCount === 0 && dataList[2].money !== '')) {
            console.log('第三组为空的项')
            this.$vux.toast.show({
              width: "90%",
              type: "text",
              text: '请至少填写一组对应的起批量和价格',
              position: 'middle',
              time: 1500
            });
            this.errorTip = true; // 显示价格明细错误提示
          } else {
            this.errorTip = false; // 隐藏价格明细错误提示

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
              // this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
              console.log(i)
              if(i>0){
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
              } else {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
              }
            } else if(this.modulesData[i].type === 'IMG_CONTENT_A') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPJX.mi_title_stitle_img;
              console.log(i)
            } else if(this.modulesData[i].type === 'IMG_B') {
              this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPXJ.mi_title_stitle_img;
              console.log(i)
            } else if(this.modulesData[i].type === 'IMG_A') {
              // this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
              console.log(i)
              if(i>0){
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
              } else {
                this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
              }
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
            //第一次提交
            let num0 = this.$store.state.moneyList[0].minCount || 0
            num0= Number(num0);
            let num1 = this.$store.state.moneyList[1].minCount || 0
            num1= Number(num1);
            let num2 = this.$store.state.moneyList[2].minCount || 0
            num2= Number(num2);
            if (!this.againEditting) {
              console.log("测试第一次提交");
              let queryList = {
                draft:'200',
                instrucCustType: this.instrucCustType
              }
              if(this.$route.query.agin === 200){
                queryList.update = '200'
              }
              console.log(queryList, '路由參數')
              console.log("num0是："+num0,"num1是："+num1,"num2是："+num2)
              if(num2!==0){
                if(num2<num1 || num1<num0){
                  this.$vux.toast.show({
                    width: "90%",
                    type: "text",
                    text: '起批量和价格填写错误',
                    position: 'middle',
                    time: 1500
                  });
                  this.errorTip = true; // 显示价格明细错误提示
                }else{
                  this.errorTip = false; // 不显示
                  this.$router.push({
                    path: "/adddesc",
                    query: queryList
                  });
                }
              } else if (num1!==0){
                if(num1<=num0){
                  this.$vux.toast.show({
                    width: "90%",
                    type: "text",
                    text: '起批量和价格填写错误',
                    position: 'middle',
                    time: 1500
                  });
                  this.errorTip = true; // 显示价格明细错误提示
                }else{
                  this.errorTip = false; // 不显示
                  this.$router.push({
                    path: "/adddesc",
                    query: queryList
                  });
                }
              } else {
                this.errorTip = false; // 不显示
                this.$router.push({
                  path: "/adddesc",
                  query: queryList
                });
              }
              // this.$router.push({
              //   path: "/adddesc",
              //   query: { draft: "200", instrucCustType: this.instrucCustType }
              // });
            } else {
              console.log("num0是："+num0,"num1是："+num1,"num2是："+num2)
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
        }
        }
        // let modulesDataLength = this.modulesData.length;
        // for(let i=0; i<modulesDataLength; i++){
        //   if(this.modulesData[i].type === 'INPUT_TABLE_A'){
        //     this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.base.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'INPUT_CHECK_A'){
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc1.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'INPUT_CHECK_B'){
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc2.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'INPUT_TABLE_B'){
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZcaigou.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'INPUT_IMG_A'){
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.DZimgc3.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'INPUT_TEXT_A'){
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.beizhu;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'IMG_A') { // 产品
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comP.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'IMG_CONTENT_A') {
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPJX.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'IMG_B') {
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPXJ.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'IMG_A') {
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.$refs.comPSIZE.mi_title_stitle_img;
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'MONEY_A') {
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'TABLE_A') {
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'SELECT_B') {
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'SELECT_A') {
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
        //       console.log(i)
        //   } else if(this.modulesData[i].type === 'TEXT_A') {
        //       this.TEMP_ROOT_DATA.tempCon.modules[i] = this.modulesData[i];
        //       console.log(i)
        //   }
        // }
        // // this.goShow();
        // setTimeout(() => {
        //   this.setTempData(JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)));
        //   this.LS.setItem(
        //     "_IN_DATA",
        //     JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA))
        //   );
        //   this.$router.push({ path: "/adddesc", query: { draft: "200", instrucCustType: this.instrucCustType } });
        // }, 500);
      },
      // 实力保障
      showPicker() {
        // if (!this.picker) {
        //   this.picker = this.$createPicker({
        //     title: "实力保障",
        //     data: [this.BZselectList],
        //     alias: { value: "value", text: "value" },
        //     onSelect: this.selectHandle
        //   });
        // }
        // this.picker.show();
        // this.BZdataList = this.modulesData[i].dataList;
        this.Required = { // 实力保障
          Required1: '',
          Required2: '',
          Required3: '',
          Required4: '',
          Required5: '',
          Required6: '',
        }
        this.BZdataList.map((item, index) =>{
          if (item.value === '7天包换' || item.value === '15天包换' || item.value === '21天包换' || item.value === '60天包换') {
            this.Required.Required1 = item.value
          } else if (item.value === '7天内发货' || item.value === '15天内发货' || item.value === '30天内发货'){
            this.Required.Required2 = item.value
          } else if (item.value === '破损补寄'){
            this.Required.Required3 = item.value
          } else if (item.value === '交期保障'){
            this.Required.Required4 = item.value
          } else if (item.value === '材质保障'){
            this.Required.Required5 = item.value
          } else{
            this.Required.Required6 = item.value
          }
        })
        this.btnSub = true
        console.log(this.BZselectList, '----------------------this.BZselectList---------')
        this.$refs.selModule1.style.top = 0;
        this.$refs.addTisMd1.style.bottom = 0;
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
        // this.BZdataList = this.modulesData[i].dataList;
        this.Required = { // 实力保障
            Required1: '',
            Required2: '',
            Required3: '',
            Required4: '',
            Required5: '',
            Required6: '',
        }
        this.BZdataList.map((item, index) =>{
          if (item.value === '7天包换' || item.value === '15天包换' || item.value === '21天包换' || item.value === '60天包换') {
            this.Required.Required1 = item.value
          } else if (item.value === '7天内发货' || item.value === '15天内发货' || item.value === '30天内发货'){
            this.Required.Required2 = item.value
          } else if (item.value === '破损补寄'){
            this.Required.Required3 = item.value
          } else if (item.value === '交期保障'){
            this.Required.Required4 = item.value
          } else if (item.value === '材质保障'){
            this.Required.Required5 = item.value
          } else{
            this.Required.Required6 = item.value
          }
        })
      },
      delItem2(index) {
        this.PAYdataList.splice(index, 1);
      },
      del(e,i,type) {
        for (let i in this.modulesData) {
          if ( this.modulesData[i].type === type) {
            this.modulesData.splice(i,1)
            this.TEMP_ROOT_DATA.tempCon.modules.splice(i,1)
          }
          if (type === 'SELECT_A') {
            this.SHOW_SELECT_A = false // 支付操作按钮隐藏
          } else if (type === 'SELECT_B'){
            this.SHOW_SELECT_B = false // 实力保障操作按钮隐藏
          }
        }
        // alert("删除后该模块不可恢复，确定删除么？");
        this.TEMP_ROOT_DATA.tempCon.modules[i] = ''
        this.modulesData[i] = ''
        // $(e.target)
        //   .parent()
        //   .parent()
        //   .remove();
        // this.$nextTick(() => {
        //   window.scrollTo(0, 1)
        //   window.scrollTo(0, 0)
        // })
      },
      delp(e,i,type) {
        // alert("删除后该模块不可恢复，确定删除么？");
        console.log(type,'-------------------type----------------')
        for (let i in this.modulesData) {
          if ( this.modulesData[i].type === type) {
            this.modulesData.splice(i,1)
            this.TEMP_ROOT_DATA.tempCon.modules.splice(i,1)
          }
          if (type === 'SELECT_A') {
            this.SHOW_SELECT_A = false // 支付操作按钮隐藏
          } else if (type === 'SELECT_B'){
            this.SHOW_SELECT_B = false // 实力保障操作按钮隐藏
          }
        }
        console.log(this.modulesData, '----------------this.modulesData----------')
        // this.TEMP_ROOT_DATA.tempCon.modules[i] = ''
        // this.modulesData[i] = ''
        // $(e.target)
        //   .parent()
        //   .parent()
        //   .parent()
        //   .remove();
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
        console.log(this.instrucState2, '获取此说明书发布状态1，代表发布中，此时不可编辑，不可完善，不可删除');
        if (Number(this.instrucState2) === 1) { // 判断发布中状态的操作
          this.$vux.toast.show({
            width: "60%",
            text: "发布中不可编辑！",
            type: "text",
            position: "middle",
            onHide: () => {
              // this.wantAddTel = ''
            }
          });
          return;
        };
        if (localStorage.getItem('uinfo')) {
          let uinfo = JSON.parse(localStorage.getItem('uinfo')); // 读取缓存的用户信息
          if (uinfo.vipState === '0') {
            this.$vux.toast.show({
              width: "60%",
              text: "只有会员才可以编辑！",
              type: "text",
              position: "middle",
              onHide: () => {
                // this.wantAddTel = ''
              }
            });
            return;
          }
        }
        this.showStype = !this.showStype;
        this.edtStatus= true, // 价格明细切换编辑状态
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
        this.$refs.DZimgc3.disabled = true;
        this.$refs.DZimgc1.editable = true;
        this.$refs.DZimgc2.editable = true;
        this.$refs.DZimgc3.editable = true;
        this.$refs.DZcaigou.editable = true;
        this.$refs.ediTingBtmBtns.style.bottom = "0";
        this.$refs.edit.style.bottom = "-1.173333rem";
      },
      goShow() {
        this.showStype = !this.showStype;
        this.edtStatus = false; // 预览状态
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
        if (!this.$route.query.sourceMember && !this.$route.query.source) {
          console.log(this.instrucState2, '获取此说明书发布状态1，代表发布中，此时不可编辑，不可完善，不可删除');
          if (Number(this.instrucState2) === 1) { // 判断发布中状态的操作
            this.$vux.toast.show({
              width: "60%",
              text: "发布中不可编辑！",
              type: "text",
              position: "middle",
              onHide: () => {
                // this.wantAddTel = ''
              }
            });
            return;
          };
        }
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
.mask_MD{
  position: fixed;
  width: 100%;
  opacity: 0
  height 100vh;
  top: 0;
}
  .MB-btn-cont{
    position relative
    width 100%
  }
  .MB-btn-cont>p{
    background: #02C2A2;
    font-family: PingFangSC-Regular;
    font-size: 4.266vw;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12vw;
    text-align center
  }
  .pointPraise{
    position: relative
    width 20vw
    height 20vw
    margin auto
  }
  .pointPraise>img{
    width 100%
  }
  .aginOrWxid{
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
  }
    .aginEdit{
      position relative !important
      bottom:0 !important
    }
      .aginEditM{
        background:#393939 !important
      }
  .cube-picker-wheel-item {
    list-style: none;
    height: 36px;
    overflow: hidden;
    white-space: nowrap;
    color: #333;
    font-size: 3.2vw !important;
  }
  //排序模块框
  .sortModule
    width 100%
    height 100%
    overflow-y scroll
    position fixed
    top 100%
    left 0
    background rgb(255, 255, 255)
    transition all 0.5s
    -webkit-overflow-scrolling touch
    padding-bottom 44px
    z-index 99999999
    .sortModuleWrap
      width 345px
      -webkit-overflow-scrolling touch
      margin 20px auto
      overflow hidden
      position relative
      .sortModuleWrapTitle
        text-align center
        font-size 18px
        color #2E2E30
        line-height 32px
        margin-bottom 20px
        position relative
        .iconfont
          font-size 20px
          font-weight 300
          position absolute
          right 0
          vertical-align middle
      .dragging
        box-shadow 0 0 10px #ccc
      .sortStart
        border-top 2px solid #f5f5f5
        margin-top 16px
        .sortItem
          width 100%
          height 60px
          line-height 60px
          font-size 16px
          border-bottom 1px solid #f5f5f5
          padding-left 6px
          h2
            /*text-indent 1em*/
            font-weight 300
            i
              font-size 16px
              margin-right 8px
              font-weight 300
              float right
              transform rotate(90deg)
            a
              display inline-block
              min-width 20px
              height 20px
              line-height 20px
              text-align center
              font-size 12px
              border-radius 10px
              color $color-fff
              background $color-cyd
              vertical-align text-top

  //增加模块框
.vux-checker-box{
  width 100%
}
  .demo1-item {
    width: 32.3333333%;
    border: 0.026667rem solid #ececec;
    padding: 0.08rem 0.2rem;
    margin-bottom: 2vw;
  }
  .demo1-item-selected {
    border: 1px solid green;
  }
  .moduleBox{
      position: relative;
      width: 100%;
     margin-bottom: 2.5vw;
  }
  .tetleBox{
    position relative
    width 100%;
    height 6vw;
  }
  .tetleBox>p{
    position relative
    width 100%;
    font-size 3.8vw;
    line-height 3vw;
  }
  .flex-demoL {
    position relative
    width 90%;
    float left;
    color: #666;
    border: 1px solid #ccc;
    border-radius 2px;
    font-size: 4vw;
    background-clip: padding-box;
    line-height: 5vw;
    margin-bottom 2.5vw;
  }
  .flex-demoC {
    position relative
    width 90%;
    margin-left 5%;
    color: #666;
    border: 1px solid #ccc;
    border-radius 2px;
    font-size: 4vw;
    background-clip: padding-box;
    line-height: 5vw;
    margin-bottom 2vw;
  }
  .flex-demoR{
    position relative
    width 90%;
    float right;
    color: #666;
    border: 1px solid #ccc;
    border-radius 2px;
    font-size: 4vw;
    background-clip: padding-box;
    line-height: 5vw;
    margin-bottom 2vw;
  }
  .flexbox-item-text{
    text-align: center;
    position relative
    color: #666;
    font-size: 3.8vw;
    line-height: 7vw;
  }
  .selModule
    width 100%
    height 100%
    overflow-y scroll
    position fixed
    top 100%
    left 0
    background rgb(255, 255, 255)
    transition all 0.5s
    -webkit-overflow-scrolling touch
    padding-bottom 44px
    z-index 999999999
    .selModuleWrap
      width 345px
      -webkit-overflow-scrolling touch
      margin 20px auto
      overflow hidden
      position relative
      .selModuleTitle
        text-align center
        font-size 16px
        color #2E2E30
        line-height 32px
        margin-bottom 20px
        position relative
        .iconfont
          font-size 20px
          font-weight 300
          position absolute
          right 0
          vertical-align middle

      .modulesCon
        display flex
        flex-wrap wrap
        justify-content space-between
        align-items flex-start
        align-content flex-start
        .modulesConItems
          /*flex 1 1 50%*/
          width 159px
          height 240px
          margin-bottom 10px
          text-align center
          overflow hidden
          border 1px solid #02C2A2
          border-radius 4px
          img
            width 100%
            height 100%
            transition all 0.3s
            border none
          .light
            border 4px solid #02C2A2
      .addTisMd
        position: fixed;
        z-index: 9999999999;
        bottom: -1.2rem;
        width: 100%;
        left: 0;
        height: 12vw;
        line-height: 12vw;
        color: #fff;
        background: #02c2a2;
        font-size: 3.5vw;
  .btnSub{
    position: fixed;
    z-index: 9999999999;
    bottom: -1.2rem;
    width: 100%;
    left: 0;
    height: 12vw;
    line-height: 12vw;
    color: #fff;
    background: #02c2a2;
    font-size: 3.5vw;
    bottom: 0;
    text-align: center;
    border-radius: 1vw;
  }
  // nav
  .add-module{
    width 100%
    background: #fff
    margin-top: 10px
    float: left
    position relative
    overflow hidden

    .add-desc{
      position absolute
      left 0
      top 0
      padding 15px 12px
      background #fff
    }

    ul{
      width: auto
      overflow-x auto
      white-space: nowrap  /* 不换行 */
      display flex
      flex-flow row nowrap
      box-sizing border-box
      padding 14px 12px 14px 44px
      margin-right 92px
      li{
        font-size 14px
        padding 0 12px 0 0
      }
    }
    // 不让滚动条显示
    ul::-webkit-scrollbar{
         width 0
         height 0
       }
    .add-module-btn{
      position absolute
      right 0
      top 0
      padding 15px 12px
      font-size 14px
      background #fff
      color #02c2a2
      box-shadow: 0 1px 4px 3px rgba(46,46,48,0.05);
      .add-module-t{
        border 1px solid #02c2a2
        border-radius 20px
        padding 4px
      }
    }
  }
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
    position: relative;
    width: 54vw;
    height: 8vw;
    padding: 1vw 1vw;
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
    width: 22.1%;
    padding: 1vw 1vw;
    font-size: 3.5vw;
    color: #2e2e30;
    text-align: center;
    line-height: 6vw;
    position: relative;
    border: 0.026667rem solid #d2d2d2;
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
    width: 10vw;
    height: 10vw;
    top: -3vw;
    right: 1.2vw;
  }
  .order-close>i{
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
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
    background: #9b9b9b;
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
    background: #000;
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
