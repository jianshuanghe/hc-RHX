<template>
  <div class="temp_root" ref="temp_root">
    <!-- 选择上传文件bridge -->
    <input type="file" :id="choseimgfile" class="hide" @change="getThisFile" ref="" accept="image/*">
    <!-- 选择上传文件bridge -->
    <!-- banner start -->
    <div class="slider-wrapper" id="slider-wrapper" ref="sliderWrapper">
      <div class="slider-content">
        <div class="slider" ref="slider" v-if="TEMP_ROOT_DATA">
          <div class="slider-group" ref="sliderGroup">

            <changeImgTips @change-img="changeImg(TEMP_ROOT_DATA.tempCon.banner[0],'picUrl')"
                           @remove-img="removeImg(TEMP_ROOT_DATA.tempCon.banner[0],'picUrl')"
                           v-if="editable"
                           :choseimgfile="choseimgfile"
            >
            </changeImgTips>
            <!--<a :href="TEMP_ROOT_DATA.tempCon.banner[0].linkUrl">-->
            <img
              :src="TEMP_ROOT_DATA.tempCon.banner[0].picUrl || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'"
              class="bannerImg" alt="">
            <!--</a>-->

          </div>
        </div>
      </div>
    </div>
    <!-- banner end -->
    <!-- nav start -->
    <div class="navTopGroup" ref="navTopGroup" id="navTopGroup">
      <ul class="navTopWrapper" :class="GET_EDITABLE ? 'manageNavStyle' : 'b'" :style="modulesListWidth"
          v-if="TEMP_ROOT_DATA.tempCon">
        <transition-group name="list-complete" tag="div" mode='in-out'>
          <li
            v-for='(item,index) in TEMP_ROOT_DATA.tempCon.modules'
            :key='index'
            :style="modulesListItemWidth">
            <a
              class="tab-link"
              @click="goID(item.icon.moduleName)"
              :class="isSelIconStyle === item.icon.moduleName ? 'isSelIconStyle' : ''"
            >
              <div class="tab-icon">
                <div class="nav-del-btn" @click="delThisModule(item,index)" v-if="editable">
                  <i class="iconfont">&#xe657;</i>
                  <!--<i>-</i>-->
                </div>
                <!--<img :src="item.defaultIcon" class="selIcon shake">-->
                <!--<a href="">{{item.module_icon}}</a>-->
                <i v-html="item.icon.iconImg" class="iconfont"
                   @click="clickModuleIcon($event.target.innerHTML,index)
            ">
                </i>
              </div>
              <!--<span class="tab-link nowrap"-->
              <!--:contenteditable="editable"-->
              <!--@click="selectText($event)">{{item.icon.iconName}}</span>-->
              <textarea name="" id="" v-model="item.icon.iconName" class="tab-link nowrap" :style="editTextOutLine"
                        maxlength="5"
                        placeholder="请输入"
                        :disabled="!editable || item.icon.noEdit"></textarea>
            </a>
          </li>
        </transition-group>
      </ul>
    </div>
    <!--<div class="navTopGroup" ref="navTopGroup" id="navTopGroup">-->
    <!--<ul class="navTopWrapper" :class="GET_EDITABLE ? 'manageNavStyle' : 'b'" :style="modulesListWidth"-->
    <!--v-if="TEMP_ROOT_DATA.tempCon">-->
    <!--<transition-group name="list-complete" tag="div" mode='in-out'>-->
    <!--<li-->
    <!--v-for='(item,index) in TEMP_ROOT_DATA.tempCon.modulesSort'-->
    <!--:key='index'-->
    <!--:style="modulesListItemWidth">-->
    <!--<a-->
    <!--class="tab-link"-->
    <!--@click="goID(TEMP_ROOT_DATA.tempCon.modules[item].icon.moduleName)"-->
    <!--&gt;-->
    <!--<div class="tab-icon">-->
    <!--<div class="nav-del-btn" @click="delThisModule(item,index)" v-if="editable">-->
    <!--<i class="iconfont">&#xe657;</i>-->
    <!--&lt;!&ndash;<i>-</i>&ndash;&gt;-->
    <!--</div>-->
    <!--&lt;!&ndash;<img :src="item.defaultIcon" class="selIcon shake">&ndash;&gt;-->
    <!--&lt;!&ndash;<a href="">{{item.module_icon}}</a>&ndash;&gt;-->
    <!--<i v-html="TEMP_ROOT_DATA.tempCon.modules[item].icon.iconImg" class="iconfont"-->
    <!--@click="clickModuleIcon($event.target.innerHTML,index)-->
    <!--">-->
    <!--</i>-->
    <!--</div>-->
    <!--&lt;!&ndash;<span class="tab-link nowrap"&ndash;&gt;-->
    <!--&lt;!&ndash;:contenteditable="editable"&ndash;&gt;-->
    <!--&lt;!&ndash;@click="selectText($event)">{{item.icon.iconName}}</span>&ndash;&gt;-->
    <!--<textarea name="" id="" v-model="TEMP_ROOT_DATA.tempCon.modules[item].icon.iconName" class="tab-link nowrap" :style="editTextOutLine"-->
    <!--maxlength="5"-->
    <!--placeholder="请输入"-->
    <!--:disabled="!editable"></textarea>-->
    <!--</a>-->
    <!--</li>-->
    <!--</transition-group>-->
    <!--</ul>-->
    <!--</div>-->
    <div class="hideNavTopGroup" ref="hideNavTopGroup" id="hideNavTopGroup"></div>
    <!--选择图标模框-->
    <div class="selIconGroup" ref="selIconGroup" id="selIconGroup" v-if="TEMP_ROOT_DATA">
      <ul class="navTopWrapper selIconWrap" :style="selIconWrapWidth">
        <li
          v-for="(item,index) in TEMP_ROOT_DATA.tempCon.selIconList"
          :key="index"
        >
          <i class="iconfont" v-html="item" @click="clickSelIcon($event.target.innerHTML,index)"></i>
        </li>
      </ul>
      <h2 class="selIconGroupTitle">选一个喜欢的图标吧</h2>
    </div>
    <div class="selIconGroup hideselIconGroup" ref="hideselIconGroup"></div>
    <!--选择模框结束-->
    <!--<div class="navTopGroup hideNavTopGroup" ref="hideNavTopGroup"></div>-->
    <!-- nav end -->
    <!--   模块容器   --------------------------------------------->
    <div id="moduleWrap" ref="moduleWrap" v-if="TEMP_ROOT_DATA">
      <transition-group name="list-complete" tag="div" mode='in-out' class="list-complete">
        <div v-for="(m,index) in mixArray" :key="index" class="list-complete-item">
          <!--index控制模块的顺序-->
          <component
            v-bind:is="m"
            :key="index"
            @del-this-module="delThisModule"
            :TEMP_ROOT_DATA="TEMP_ROOT_DATA"
          >
            <!--传递根数据给子组件数据-->
          </component>
        </div>
      </transition-group>


      <!--如何使用 start-->
      <!--<div class="itemRoot">-->

      <!--</div>-->
      <!--如何使用 end-->
    </div>
    <!--   模块容器   --------------------------------------------->
    <!--立即使用按钮-->
    <div class="confirm" ref="confirm" id="confirm" @click="goEdit" style="" v-if="TEMP_ROOT_DATA && !this.$route.query.source">去编辑</div>
    <!--选择模块模框-->
    <div class="selModule" id="selModule" ref="selModule">
      <div class="selModuleWrap" v-if="BAK_DATA">
        <h2 class="selModuleTitle">添加模块<i class="iconfont icon-L1" @click="hideAddModule"></i></h2>
        <div class="modulesCon">
          <div class="modulesConItems"
               v-for="(item,index) in BAK_DATA.tempCon.modules"
               :key="index"
          >
            <img :src="item.icon.moduleImg" alt=""
                 @click.prevent="selThisMd(item,$event.target,index)"
                 :class="{'light':selMdTips === index}">
          </div>
        </div>
        <input type="button" value="添加" ref="addTisMd" class="addTisMd" @click="addMd" :disabled="!selMd"
        >
      </div>
    </div>
    <!--排序模块框-->
    <!--<div class="addActBox1" v-if="addActBoxShow1">-->
    <!--<div class="botPup">-->
    <!--<div class="topBox">-->
    <!--<flexbox>-->
    <!--<flexbox-item><div class="leftBox" @click="hideAddBtmBtnBox()"><p class="">取消</p></div></flexbox-item>-->
    <!--<flexbox-item><div class="centBox"><p class="">添加按钮</p></div></flexbox-item>-->
    <!--<flexbox-item><div class="rightBox" @click="saveBtmActBtn" :disabled="!wantAddBtnName || !wantAddBtnUrl"><p class="">保存</p></div></flexbox-item>-->
    <!--</flexbox>-->
    <!--</div>-->
    <!--<div class="contentBox">-->
    <!--<div class="sortModuleWrap">-->
    <!--<h2 class="sortModuleWrapTitle"><span class="leftBoxCC" @click="hideSortModule">取消</span>拖动排序哟<span class="rightBoxCC" @click="ccSortModule">确定</span></i></h2>-->
    <!--<draggable-->
    <!--class="sortStart"-->
    <!--:move="getdata"-->
    <!--v-model="TEMP_ROOT_DATA.tempCon.modulesSort"-->
    <!--@update="datadragEnd"-->
    <!--:options="{animation:500,dragClass:'dragging'}">-->
    <!--<div v-for="(item,index) in TEMP_ROOT_DATA.tempCon.modulesSort" :key="index" class="sortItem">-->
    <!--<h2><a>{{index+1}}</a><i class="iconfont icon-weibiaoti-1"></i>&nbsp;{{TEMP_ROOT_DATA.tempCon.modules[item].icon.iconName}}-->
    <!--</h2>-->
    <!--</div>-->
    <!--</draggable>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="sortModule" ref="sortModule" v-if="TEMP_ROOT_DATA">
      <div class="sortModuleWrap">
        <h2 class="sortModuleWrapTitle"><span class="leftBoxCC" @click="hideSortModule">取消</span>拖动排序哟<span class="rightBoxCC" @click="ccSortModule">确定</span></i></h2>
        <draggable
          class="sortStart"
          :move="getdata"
          v-model="TEMP_ROOT_DATA.tempCon.modulesSort"
          @update="datadragEnd"
          :options="{animation:500,dragClass:'dragging'}">
          <div v-for="(item,index) in TEMP_ROOT_DATA.tempCon.modulesSort" :key="index" class="sortItem">
            <h2><a>{{index+1}}</a><i class="iconfont icon-weibiaoti-1"></i>&nbsp;{{TEMP_ROOT_DATA.tempCon.modules[item].icon.iconName}}
            </h2>
          </div>
        </draggable>
      </div>
    </div>
    <!--用户底部操作区-->
    <div id="userBtmBtnGroup" ref="userBtmBtnGroup" v-if="TEMP_ROOT_DATA.tempCon">
      <div class="userBtmBtnGroupItems">
        <a class="leftBtns" :href="'tel:'+ userRetVO.contactTelphone" @click="showAddTel('up',$event, userRetVO.contactTelphone)">
          <p class="telIcon"><i class="iconfont icon-nbbPhone1"></i></p>
          <h5>联系我们</h5>
        </a>
        <a class="leftBtns" @click="openFollowMe">
          <p class="telIcon"><i class="iconfont icon-saomiaoerweima"></i></p>
          <h5>关注我们</h5>
        </a>
      </div>
      <div class="userBtmBtnGroupItems" :style="{'display':isKong1 ? `none` : `block`}" v-if="TEMP_ROOT_DATA || TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnName">
        <div class="userBtmAddBtn" @click="addBtmBtn('middleBtn')"
             v-if="!TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnName && editable">
          添加按钮
        </div>
        <div v-else class="btmBtnLink" ref="btmBtnLink" :class="editable ? 'scale': ''">
          <i class="iconfont" v-if="editable && TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnName"
             @click="delBtmBtn('middleBtn')">&#xe657;</i>
          <a :href="TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnLink"
             v-html="TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnName" @click="clickZdyBtn()"></a>
        </div>
      </div>
      <div class="userBtmBtnGroupItems" :style="{'display':isKong2 ? `none` : `block`}" v-if="TEMP_ROOT_DATA || TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnName">
        <div class="userBtmAddBtn" @click="addBtmBtn('rightBtn')"
             v-if="!TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnName && editable">
          添加按钮
        </div>
        <div v-else class="btmBtnLink RbtmBtnLink" ref="btmBtnLink" :class="editable ? 'scale': ''">
          <i class="iconfont" v-if="editable && TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnName"
             @click="delBtmBtn('rightBtn')">&#xe657;</i>
          <a :href="TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnLink"
             v-html="TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnName"  @click="clickZdyBtn()"></a>
        </div>
      </div>
    </div>
    <!--添加互动按钮模框-->
    <div class="addActBox" v-if="addActBoxShow">
      <div class="botPup">
        <div class="topBox">
          <flexbox>
            <flexbox-item><div class="leftBox" @click="hideAddBtmBtnBox()"><p class="">取消</p></div></flexbox-item>
            <flexbox-item><div class="centBox"><p class="">添加按钮</p></div></flexbox-item>
            <flexbox-item><div class="rightBox" @click="saveBtmActBtn" :disabled="!wantAddBtnName || !wantAddBtnUrl"><p class="">保存</p></div></flexbox-item>
          </flexbox>
        </div>
        <div class="contentBox">
          <div class="butListBox">
            <div class="listBox">
              <div class="btnTitle" @click="radioCheck('1')">
                <input type="radio" name="paixu" id="paixu1" :checked="checked=== '1'?true:false">
                <label  style="cursor:pointer">添加链接按钮</label>
              </div>
              <div class="btnContBox" v-if="checked=== '1'?true:false">
                <div class="butList">
                  <p class="">按钮名称</p>
                  <input type="text" class=""placeholder="请输入"v-model="wantAddBtnName" maxlength="6">
                  <div class="line"></div>
                </div>
                <div class="butList">
                  <p class="">链接地址</p>
                  <input type="text" class=""placeholder="请输入,如:http://······"v-model="wantAddBtnUrl">
                </div>
              </div>
            </div>
            <div class="listBox">
              <div class="btnTitle" @click="radioCheck('2')">
                <input type="radio" name="paixu" id="paixu1" :checked="checked=== '2'?true:false">
                <label  style="cursor:pointer">添加定制按钮</label>
              </div>
              <div class="btnContBox" v-if="checked=== '2'?true:false">
                <div class="radioBox">
                  <scroller
                    class="scroller"
                    :on-infinite="infinite"
                    ref="myScroller" v-if="list.length>0">
                    <div class="instrcList" v-for="(items,index) in list" :key="items.instrucId" @click="checkItem(items.instrucId)">
                      <div class="letBox left">
                        <div class="btnRadio">
                          <div class="btnTitle">
                            <input type="radio" name="paixu2" id="paixu2" :checked='items.instrucId === checkItems ? true : false'>
                            <label  style="cursor:pointer"></label>
                          </div>
                        </div>
                      </div>
                      <div class="conBox left">
                        <div class="imgBox">
                          <img :src="items.bannerImg" alt="" class="">
                        </div>
                      </div>
                      <div class="rigBox left">
                        <div class="textBox">
                          <div class="texInst">
                            <p class="title">{{items.instrucTitle}}</p>
                            <p class="titleIns">{{items.instrucIntro}}</p>
                          </div>
                        </div>
                      </div>
                      <div class="clear"></div>
                    </div>
                  </scroller>
                  <div class="isNoList" v-else>
                    <p class="">您没有创建定制说明书，快去添加吧！</p>
                  </div>
                </div>
                <div class="routerDingzhi">
                  <div class="btnBox" @click="goTempDetail('11')">
                    <div class="imgBox left">
                      <img src="./add.png" alt="" class="">
                    </div>
                    <div class="addBtn left">
                      <p class="">添加新的定制模板</p>
                    </div>
                    <div class="clear"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="maskBox"  v-if="addActBoxShow"></div>
    <!--<div id="addActionBox" ref="addActionBox">-->
    <!--<h2 class="title">-->
    <!--<span class="noSaveBtn" ref="noSaveBtn" @click="hideAddBtmBtnBox">取消</span>-->
    <!--互动按钮设置-->
    <!--<button class="saveBtn" ref="saveBtn" @click="saveBtmActBtn" :disabled="!wantAddBtnName || !wantAddBtnUrl">保存-->
    <!--</button>-->
    <!--</h2>-->
    <!--&lt;!&ndash;<div class="insertGroup">&ndash;&gt;-->
    <!--&lt;!&ndash;<input type="text" placeholder="请输入按钮名称" v-model="wantAddBtnName" maxlength="6">&ndash;&gt;-->
    <!--&lt;!&ndash;<input type="text" placeholder="请输入按钮的有效链接,如:http://······" v-model="wantAddBtnUrl">&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--<div class="AccordionBox">-->
    <!--<div class="AcdList">-->
    <!--<div class="AcdTitle">-->
    <!--<cube-radio-group v-model="selected1" :options="options" />-->
    <!--</div>-->
    <!--<div class="AcdContent">-->
    <!--<div class="listTitle">-->
    <!--按钮名称-->
    <!--</div>-->
    <!--<div class="listInput">-->
    <!--<input type="text">-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--添加联系电话按钮-->
    <div id="addTelBox" ref="addTelBox">
      <h2 class="title">
        <span class="noSaveBtn" ref="noSaveBtn" @click="showAddTel('down',$event)">取消</span>
        设置联系电话
        <button class="saveBtn" ref="saveBtn" @click="saveTel('down',$event)" :disabled="!userRetVO.contactTelphone">
          保存
        </button>
      </h2>
      <div class="insertGroup">
        <input type="tel" placeholder="请输入联系电话" v-model="userRetVO.contactTelphone" maxlength="15">
      </div>
    </div>
    <!--关注我们模框-->
    <div id="followMe" ref="followMe" v-if="TEMP_ROOT_DATA.tempCon">
      <div class="followMeWrap">
        <h2 class="followMeTitle">&nbsp;<i class="iconfont icon-L1" @click="hideFollowMe"></i></h2>
        <textarea placeholder="请填写公司/个人昵称"
                  :style="editTextOutLine"
                  :disabled="!editable"
                  class="followTxt companyName"
                  v-model="userRetVO.companyName"
                  maxlength="20"
        ></textarea>
        <textarea placeholder="请填您的公司简介/个人简介"
                  :style="editTextOutLine"
                  :disabled="!editable"
                  class="followTxt companyIntro"
                  v-model="userRetVO.companyIntro"
                  maxlength="300"
        ></textarea>
        <div class="qrWrap">
          <div class="qrWrapTop">
            <changeImgTips @change-img="changeImg(userRetVO,'wechatQrImg')"
                           @remove-img="removeImg(userRetVO,'wechatQrImg')"
                           :choseimgfile="choseimgfile"
                           v-if="editable"
            >
            </changeImgTips>
            <img :src="userRetVO.wechatQrImg || 'http://style.iambuyer.com/img/mi-temp-imgs-11.jpg'"
                 alt="">
          </div>
          <div class="qrWrapBtm">
            <p>长按识别图中二维码</p>
            <p>若无法识别，请复制链接在微信中打开</p>
          </div>
        </div>
        <textarea placeholder="联系电话"
                  :style="editTextOutLine"
                  :disabled="!editable"
                  class="followTxt contactTelphone"
                  v-model="userRetVO.contactTelphone"
        ></textarea>
        <textarea placeholder="联系邮箱"
                  :style="editTextOutLine"
                  :disabled="!editable"
                  class="followTxt"
                  v-model="userRetVO.contactEmail"
        ></textarea>
        <textarea placeholder="具体地址"
                  :style="editTextOutLine"
                  :disabled="!editable"
                  class="followTxt"
                  v-model="userRetVO.addressDetail"
        ></textarea>
        <input
          type="button"
          value="保存"
          class="saveFollowMe"
          v-if="editable"
          @click="saveFollowMe"
          :disabled="!userRetVO.companyName||!userRetVO.companyIntro||!userRetVO.contactTelphone||!userRetVO.contactEmail||!userRetVO.addressDetail"
        >
      </div>
    </div>
    <!--点赞与否-->
    <div class="isLikeWrap" v-if="INSTRC_ROOT_DATA.isLike">
      <p class="isLike">
        <i class="iconfont"
           :class="INSTRC_ROOT_DATA.isLike == '0' ? 'icon-dianzan' : 'icon-dianzan1'"
           @click="isLike"
        ></i>&nbsp;<span v-html="INSTRC_ROOT_DATA.likeCn"></span>
      </p>
      <!--<p class="noLike">-->
      <!--<i class="iconfont icon-dianzan1"></i><span>123</span>-->
      <!--</p>-->
    </div>
    <!--来自陌拜商机时展示的点赞-->
    <div class="isLikeWrap" v-if="this.$route.query.source">
      <p class="isLike">
        <i class="iconfont"
           :class="isLikeMMB === false ? 'icon-dianzan' : 'icon-dianzan1'"
           @click="clickIsLike"
        ></i>&nbsp;<span v-html="INSTRC_ROOT_DATA.likeCn"></span>
      </p>
      <!--<p class="noLike">-->
      <!--<i class="iconfont icon-dianzan1"></i><span>123</span>-->
      <!--</p>-->
    </div>
    <div class="loadingBox">
      <loading :show="show1" :text="text1"></loading>
    </div>
    <!--底部logo-->
    <myFooter2></myFooter2>
    <!--编辑中的按钮-->
    <div class="ediTingBtmBtns" ref="ediTingBtmBtns" id="ediTingBtmBtns" style="" v-if="TEMP_ROOT_DATA  && !this.$route.query.source">
      <div class="ediTingBtmBtnsItems" @click="saveDraft" v-if="!againEditting">
        <a><i class="iconfont icon-shiyong01"></i> &nbsp;存为草稿</a>
      </div>
      <div class="ediTingBtmBtnsItems" @click="temp_preview">
        <a><i class="iconfont icon-L2"></i> &nbsp;预览</a>
      </div>
      <div class="ediTingBtmBtnsItems goLine" @click="addDesc" v-if="!againEditting">
        <a>发布上线</a>
      </div>
      <div class="ediTingBtmBtnsItems goLine" @click="addDesc" v-else>
        <a>更新一波</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {RadioGroup,Radio } from 'cube-ui'
  import { Flexbox, FlexboxItem, Divider,Loading } from 'vux'
  import changeImgTips from 'components/businessModules/businessPublicModule/changeImgTips'
  import {gethashcode} from 'common/js/hash'
  import * as moduleString from './moduleString'
  import * as API from "config/api";
  import {addClass, autoTextarea} from 'common/js/dom'
  import BScroll from 'better-scroll'
  import {mapMutations, mapGetters} from 'vuex'
  import {itemsMixin} from 'common/js/mdMixin'
  import {itemsFuncMixin} from 'common/js/mdFunc'
  import draggable from 'vuedraggable'
  import myFooter2 from "@/components/globalModules/myFooter2"

  import wxApi from "../../../mixins/wxapi.js"; //微信分享sdk
  import {wxShareTimeline,wxShareAppMessage} from "../../../mixins/WXShare.js"; //微信分享到朋友圈和好友
  import {shareCont} from "../../../mixins/WXParams.js"; //微信分享参数

  import VueScroller from "vue-scroller";
  Vue.use(VueScroller);

  export default {
    name: "mi-temp",
    mixins: [itemsMixin, wxApi],
    data() {
      return {
        isLikeMMB: false, // 点赞
        userStopTime: '', // 页面停留时间
        disabled: false,
        show1:false,
        instrucState: '0', // 为发布状态
        paiXuShow:false, // 拖动排序
        addActBoxShow:false, // 默认不显示按钮添加模块
        checked: '1', // 默认第一个显示
        checkItems: '', // 子表中点击选中的按钮
        custIdOne: '', // 中间按钮
        custIdTwo: '', // 右边按钮
        page: 1,
        count: "",
        count0: "",
        count1: "",
        list: [],
        upLine: [],
        caoGao: [],
        iconFont: true,
        iconFont2: true,
        showPop: true,
        slecteOptions: {},
        instrucCustType: 1, // "0,2" 表示普通说明书 "1" 表示定制说明书
        state: "", // "0" 草稿 "1" 上线 "2" 下架
        shareTitle: "",
        shareIntro: "",
        instrcName:'', // 项目名称
        instrcDesc:'', // 项目介绍
        isKong1:false, // 第一个按钮是否为空
        isKong2:false, // 第二个按钮是否为空
        shareImg: "",
        instrucId: "",
        // shareLink: window.location.origin+"/rest-rp/wechat/portal/shareUrl?instrucId="+this.$route.query.instrucId+"&tempId="+this.TEMP_ROOT_DATA.tempId+"&urlName="+this.TEMP_ROOT_DATA.path,
        userId: window.localStorage.getItem('userId'),
        mitList: '', // 编辑时返回的总数居
        //说明书信息
        INSTRC_ROOT_DATA: '',
        /*模板原始值*/
        TEMP_ROOT_DATA: '',
        //备份数据
        BAK_DATA: '',
        // 原始模块
        OriginalModule: {},
        //渲染模块顺序
        mixArray: [],
        //备份渲染模块顺序
        mixArrayBK: [],
        //模块的个数
        moduleLength: '',
        //是否可编辑
        editable: false,
        sortModules: [],
        // 追加的两个按钮
        add_icon: {
          "icon": {
            "iconImg": "&#xe62e;",
            "iconName": "添加模块",
            "noEdit": true
          }
        },
        sort_icon: {
          "icon": {
            "iconImg": "&#xe64e;",
            "iconName": "更改顺序",
            "noEdit": true
          }
        },
        // 添加模块时选中的模块的index
        selMdTips: 0,
        // 添加模块时选中的即将添加的模块的名字
        selMd: '',
        /*banner start*/
        banner: {
          dots: [],
          currentPageIndex: 0,
          loop: true,
          autoPlay: true,
          interval: 4000,
          bannerImgFile: 'bid'
        },
        /*banner end*/
        /*nav start*/
        nav: {
          // 屏幕宽度
          screenWidth: document.body.clientWidth
        },
        // 点击选择的即将更换的图标
        wantChangeIcon: '',
        /*nav end*/
        //即将添加的底部按钮
        wantAddBtn: '',
        wantAddBtnName: '',
        wantAddBtnUrl: '',
        //即将添加的联系电话
        wantAddTel: '',
        //个人中心的用户信息
        userRetVO: {
          companyName: '',
          companyIntro: '',
          wechatQrImg: '',
          contactTelphone: '',
          contactEmail: '',
          addressDetail: ''
        },
        isSelIconStyle: '',
        choseimgfile: 'rooFile',
        //再次回来编辑的标记
        againEditting: '',
        client_h: document.documentElement.clientHeight,
        // 手机号验证
        isPhone: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/,
        // 座机号验证
        isMob: /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
        // url验证
        // isUrl: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
        // 邮箱验证
        isEmail: /("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")/,
        nowScrollTop: ''
      }
    },
    watch: {
      GET_EDITABLE(v) {
        if (v === true) {
          this.editable = true
        } else {
          this.editable = false
        }
      },
      wantAddBtnName:{
        handler(a, b){
          console.log(b)
        },
        deep:true
      }
    },
    beforeCreate() {
      if (localStorage.getItem('custIdOne')) {
        localStorage.removeItem('custIdOne'); // 移除缓存数据
      }
      if (localStorage.getItem('custIdTwo')) {
        localStorage.removeItem('custIdTwo'); // 移除缓存数据
      }
      if (this.$route.query.confirmEdit) {
        // 入口为模板选择
        API._getTempDetail(this.$route.query.tempId, '').then(res => {
          this.instrcDesc = res.content.instrucIntro;
          this.instrcName = res.content.instrucTitle;
          this.LS.setItem('instrcName', res.content.tempName)
          this.LS.setItem('instrcDesc', res.content.tempIntro)
          this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context))
          this.instrucCustType = res.content.instrucCustType
          this.setTempData(JSON.parse(JSON.stringify(res.content.context)))

          this.BAK_DATA = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA))))
          console.log(this.GET_TEMP_DATA, '----------------------------GET_TEMP_DATA')
          console.log('是否为可编辑状态：' + this.GET_EDITABLE)
          // 微信分享
          this.wxApiG();
        })
      } else if (this.$route.query.instrucId && this.$route.query.tempId && !this.$route.query.wxId && !this.$route.query.agin) {
        // 入口为再次编辑
        // this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
        API._getTempDetail(this.$route.query.tempId, '').then((res) => {
          if (res.ret === API.ERROK) {
            this.instrcDesc = res.content.instrucIntro;
            this.instrcName = res.content.instrucTitle;
            this.BAK_DATA = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res.content.context))))
          }
        })
        // this.againEditEntry(true)
      } else if (this.$route.query.wxId) {
        this.show1 = true; // 显示loading
        console.log('beforeCreate入口为分享')
        //获取说明书数据
        API._UserSeeInstrucDetails(this.$route.query.instrucId, this.$route.query.wxId).then(res => {
          if (res.ret == API.ERROK) {
            this.instrcDesc = res.content.instrucIntro;
            this.instrcName = res.content.instrucTitle;
            this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(res.content.context))
            this.INSTRC_ROOT_DATA = JSON.parse(JSON.stringify(res.content))
            console.log(this.TEMP_ROOT_DATA)
            this.setTempData(JSON.parse(JSON.stringify(res.content.context)))
            this.againEditEntry(false)
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
    created() {
      this.getTemp();
      if (this.$route.query.confirmEdit) {
        console.log('入口为模板列表')
        console.log('----------------1-------------------')
        // 微信分享
        this.wxApiG();
        this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
        console.log(this.GET_TEMP_DATA, '-------------------------->this.GET_TEMP_DATA')
        this.BAK_DATA = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(this.GET_TEMP_DATA))))
        console.log('是否为可编辑状态：' + this.GET_EDITABLE)
        wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
      }
      else if (this.$route.query.wxId) {

        this.show1 = true; // 显示loading
        console.log('----------------2-------------------')
        console.log('Create入口为分享')
        if (this.$route.query.userId !== 'undefined' && !this.$route.query.source) {
          this.LS.setItem('userId', this.$route.query.userId)
        }
        setTimeout(() => {
          // this.temp_preview()
          this.editable = false
          this.set_edit(false)
          this.TEMP_ROOT_DATA.tempCon.editable = false
          let dotHerf = String(window.location.protocol + '//' + window.location.host + '/cust') // 标准链接
          if (this.TEMP_ROOT_DATA.tempCon.userActionBtn) {
            let middleLink = this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnLink; // 中间链接
            let rightLink = this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnLink; // 右侧链接
            let herf = ''
            if (middleLink) {
              herf = middleLink.split('?')[0]
              console.log('当前链接')
              if (herf === dotHerf) {
                this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnLink = middleLink + '&wxId=' + this.$route.query.wxId + '&userId=' + this.$route.query.userId
              }
              console.log( this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnLink, '重置链接中间')
            }
            if (rightLink) {
              herf = rightLink.split('?')[0]
              if (herf === dotHerf) {
                this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnLink = rightLink + '&wxId=' + this.$route.query.wxId + '&userId=' + this.$route.query.userId
              }
              console.log(this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnLink, '重置链接右侧')
            }
            this.butType()
          };
          wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
          this.show1 = false; // 隐藏loading
        }, 1500)
        this.editable = false
      } else if (this.$route.query.instrucId && this.$route.query.tempId && !this.$route.query.agin) {
        console.log('入口为编辑')
        console.log('----------------3-------------------')
        this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
        // this.butType() // 自定义按钮样式
        API._getTempDetail(this.$route.query.tempId, '').then((res) => {
          if (res.ret === API.ERROK){
            if (res.content.custIdOne) {
              this.custIdOne = res.content.custIdOne;
              localStorage.setItem('custIdOne', this.custIdOne);
            }
            if (res.content.custIdTwo) {
              this.custIdTwo = res.content.custIdTwo;
              localStorage.setItem('custIdTwo', this.custIdTwo);
            }
          this.BAK_DATA = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res.content.context))))
        }
      });
    wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
    this.againEditEntry(true)
  } else if (this.$route.query.instrucId && this.$route.query.tempId && this.$route.query.agin){
    console.log('----------------4-------------------')
    this.TEMP_ROOT_DATA = JSON.parse(JSON.stringify(this.GET_TEMP_DATA))
    // this.butType() // 自定义按钮样式
    console.log(this.TEMP_ROOT_DATA,'999')
    API._getTempDetail(this.$route.query.tempId, '').then((res) => {
      console.log(res, '-------------------res-----------------------------')
      if (res.ret === API.ERROK) {
        this.instrucState = res.content.instrucState; // 判断发布状态， 0 未发布， 1 发布
        console.log(res, '-----------------------res4-------------------')
        this.rootData = res.content,
          this.BAK_DATA = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res.content.context))))
      }
    })
    this.againEditEntry(true)
    this.editable = true
    wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
    if (this.$route.query.wxId) {
      this.LS.setItem('wxId', this.$route.query.wxId)
      if (this.$route.query.userId !== 'undefined') {
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
  }
  //-----------------------------从商机进来的逻辑------------------------
  if (this.$route.query.source) {
    console.log('从商机进来');
    if (this.$route.query.like) {
      if (this.$route.query.like === 'true') {
        this.isLikeMMB = true;
      } else {
        this.isLikeMMB = false;
      }
    }
    if (localStorage.getItem('query')) {
      if (this.$route.query.source === 'FB') {
        console.log('从商机的发现商机进来');
        this.sourceFBin();
      } else if (this.$route.query.source === 'FI') {
        console.log('从商机的流量页进来');
        this.sourceFIin();
      }
    }
  }
  },
  mounted() {
    this.$nextTick(() => {
      // if (this.$route.query.wxId || this.$route.query.source){
      //   API._shareTotals(0,this.rootData.instrucId).then(res => {
      //     console.log(res, '用户访问了')
      //   })
      //   console.log('000000000000000000000000')
      //   this.$refs.userBtmBtnGroup.style.bottom = 0
      //   this.$refs.confirm.style.display = 'none'
      //   this.butType()
      // }
      //默认选中第一个模块的图标
      setTimeout(() => {

        //图标顺序
        let wantSortMd = JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA.tempCon.modules))
        let toSortMd = JSON.parse(JSON.stringify(this.mixArray))
        let doneMd = []
        for (let i = 0; i < toSortMd.length; i++) {
          doneMd.push({[toSortMd[i]]: wantSortMd[toSortMd[i]]})
        }
        let changeDoneMd = {}
        for (let i = 0; i < doneMd.length; i++) {
          changeDoneMd[[toSortMd[i]]] = wantSortMd[toSortMd[i]]
        }
        this.TEMP_ROOT_DATA.tempCon.modules = changeDoneMd
        this.isSelIconStyle = JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA.tempCon.modulesSort[0]))
        this.butType() // 自定义按钮样式
      }, 800)
      //微信分享sdk
      window.addEventListener('scroll', this.hScroll)
      this.mixin2array()
      //区分是从选择模板过来还是用户从其它途径过来
      if (this.$route.query.confirmEdit) {
        //入口为从模板选择进入状态
        this.OriginalModule = itemsMixin.components
        wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
      } else if (this.$route.query.wxId || this.$route.query.lookMyInstrc) {

        // 入口为用户浏览状态
        console.log('入口为用户浏览状态。。')
        this.set_edit(true)
        this.$nextTick(() => {
          // 设置分享配置
          API._InstrucDetails(this.$route.query.instrucId).then((res) => {
            if (res.ret == API.ERROK) {
              console.log(res.content.bannerImg, '-------------------res.content.bannerImg------------')
              // this.instrucId = res.content.instrucId
              this.instrcDesc = res.content.tempIntro;
              this.instrcName = res.content.tempName;
              this.shareImg = res.content.bannerImg;
              this.instrucId = res.content.instrucId;
              console.log("zhezhifenxiangpeizhi")
              //微信分享sdk
              wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
            }
          })
          setTimeout(() => {
            // this.goEdit()
            this.temp_preview()
            this.editable = false
            this.set_edit(false)
            if (this.TEMP_ROOT_DATA.tempCon.editable) {
              this.TEMP_ROOT_DATA.tempCon.editable = false
            }
            document.getElementById('confirm').style.bottom = '-1.173333rem'
            this.set_banner_height('5.333333rem')
            new BScroll('.navTopGroup', {
              scrollX: true,
              click: true
            })
          }, 500)
        })
        if (document.getElementById('confirm')) {
          wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
          document.getElementById('confirm').style.bottom = '-1.173333rem'
        }
        if (!this.$route.query.source) { // 非商机进来记录
          //说明书访问统计
          API._instrucDate('0', this.$route.query.instrucId).then((res) => {
          })
        }
      } else if (this.$route.query.instrucId && this.$route.query.tempId && !this.$route.query.wxId) {
        //入口为编辑状态
        this.$nextTick(() => {
          this.set_edit(false)
          setTimeout(() => {
            this.againEditting = true
            this.temp_preview()
            this.goEdit()
            this.editable = true
            this.set_edit(true)
            this.TEMP_ROOT_DATA.tempCon.editable = true
            // 用户回来编辑的时候把上传成功的图片数组清空
            this.TEMP_ROOT_DATA.tempCon.succImgList.splice(0, this.TEMP_ROOT_DATA.tempCon.succImgList.length)
            wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
          }, 500)
        })
      }

      //获取到所有textarea并处理自适应高度的问题
      // let test = document.querySelectorAll('textarea')
      // for (let i = 0; i < test.length; i++) {
      //   autoTextarea(test[i])
      // }
      //获取个人信息以填充联系电话
      if (this.LS.getItem('userId')) {
        wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
        API._GetUserInfo(this.LS.getItem('userId')).then((res) => {
          if (res.ret == API.ERROK) {
            this.userRetVO.companyName = JSON.parse(JSON.stringify(res.content.companyName))
            this.userRetVO.companyIntro = JSON.parse(JSON.stringify(res.content.companyIntro))
            this.userRetVO.wechatQrImg = JSON.parse(JSON.stringify(res.content.wechatQrImg))
            this.userRetVO.contactTelphone = JSON.parse(JSON.stringify(res.content.contactTelphone))
            this.userRetVO.contactEmail = JSON.parse(JSON.stringify(res.content.contactEmail))
            this.userRetVO.addressDetail = JSON.parse(JSON.stringify(res.content.addressDetail))
          }
        })
      }
      if (this.$route.query.instrucId) {
        wxApi.wxRegister(this.wxShareConfigure); // 为你分享配置
        API._InstrucDetails(this.$route.query.instrucId).then((res) => {
          if (res.ret == API.ERROK) {
            this.userRetVO.companyName = JSON.parse(JSON.stringify(res.content.userRetVO.companyName))
            this.userRetVO.companyIntro = JSON.parse(JSON.stringify(res.content.userRetVO.companyIntro))
            this.userRetVO.wechatQrImg = JSON.parse(JSON.stringify(res.content.userRetVO.wechatQrImg))
            this.userRetVO.contactTelphone = JSON.parse(JSON.stringify(res.content.userRetVO.contactTelphone))
            this.userRetVO.contactEmail = JSON.parse(JSON.stringify(res.content.userRetVO.contactEmail))
            this.userRetVO.addressDetail = JSON.parse(JSON.stringify(res.content.userRetVO.addressDetail))
            setTimeout(() => {
              let test = document.querySelectorAll('textarea')
              for (let i = 0; i < test.length; i++) {
                autoTextarea(test[i])
              }
            }, 500)
          }
        })
      }

      /**
       * banner start
       * **/
      setTimeout(() => {
        if (document.getElementById('slider-wrapper')) {
          this.set_banner_height(document.getElementById('slider-wrapper').offsetHeight)
        }
      }, 1000)

      /**
       * banner end
       * **/
      /**
       * nav start
       * **/
      window.addEventListener('scroll', this.hScroll)
      setTimeout(() => {
        let scroll = new BScroll('#navTopGroup', {
          scrollX: true,
          click: true
        })
        let selscroll = new BScroll('.selIconGroup', {
          scrollX: true,
          click: true
        })
      }, 1000)

      if (this.$route.query.source){
        this.$refs.userBtmBtnGroup.style.bottom = 0;
      }

      /**
       * nav end
       * **/

    })
    if (this.$route.query.source) {
      // 如果支持 popstate 一般移动端都支持了
      if (window.history && window.history.pushState) {
        // 往历史记录里面添加一条新的当前页面的url
        history.pushState(null, null, document.URL);
        // 给 popstate 绑定一个方法 监听页面刷新
        window.addEventListener('popstate', this.backChange, true);//false阻止默认事件
      }
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
      query.herf = query.herf + '?instrucIdLike=' + this.$route.query.instrucId + '&like=' + this.isLikeMMB; // 此链接拼接说明书id，和点赞情况，这样可以把商机平台和如何秀点赞打通
      if (localStorage.getItem('shareStatus')) {
        console.log(query.herf);
        let shareStatus = JSON.parse(localStorage.getItem('shareStatus'));
        if (Number(shareStatus.instrucId) === Number(this.$route.query.instrucId)) { // 如果换从的商机id和当前的一致，测判断为已分享
          query.herf = query.herf + '&instrucIdShare=' + shareStatus.instrucId + '&share=' + shareStatus.share;
        }
      }
      if (localStorage.getItem('shareStatus')) {
        // alert(query.herf);
        // let shareStatus = JSON.parse(localStorage.getItem('shareStatus'));
        // let mmm = query.herf + '&instrucId=' + shareStatus.instrucId + '&share=' + shareStatus.share;
        // alert(mmm);
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
        let params = { // 记录用户停留时间
          "type":"0",
          "instId":Number(this.$route.query.instrucId)
        }
        API._instrucDate(params.type, params.instId).then(res => {
          console.log(res);
        });
      });
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
      query.herf = query.herf + '?instrucIdLike=' + this.$route.query.instrucId + '&like=' + this.isLikeMMB; // 此链接拼接说明书id，和点赞情况，这样可以把商机平台和如何秀点赞打通
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
        //说明书访问统计
        let params = { // 记录用户停留时间
          "type":"7",
          "instId":Number(this.$route.query.instrucId),
          "stopTime": this.userStopTime
        }
        query.herf = query.herf + '&sessionId=' + query.sessionId;
        API._instrucDate2(params.type, params.instId, params.stopTime).then(res => {
          console.log(res);
          window.clearInterval(); // 清除时间器
          window.location.href = query.herf;
          localStorage.removeItem('query'); // 移除链接缓存的参数
          localStorage.removeItem('shareStatus'); // 移除分享结果缓存参数
        });
      });
    },
    backChange() {
      // 销毁定时器
      if (this.$route.query.source) {
        console.log('从商机进来');
        if (localStorage.getItem('query')) {
          if (this.$route.query.source === 'FB') {
            console.log('从商机的发现商机进来');
            this.sourceFBout();
          } else if (this.$route.query.source === 'FI') {
            console.log('从商机的流量页进来');
            this.sourceFIout();
          }
        }
      }
    },
    getTemp () { // 进入页面之后获取模板id,用于模板直接跳转
      console.log('进入页面之后获取模板id,用于模板直接跳转');
      API._getTemp().then(res => {
        if (res.ret === API.ERROK) {
          this.Mlist = res.content;
          localStorage.setItem('DZtempId', this.Mlist[1].id); // 缓存用户点击的按钮
        } else {
          alert(res.msg);
        }
      });
    },
    /**
     * [wxShareConfigure 用于微信页面分享配置]
     */
    wxShareConfigure(){
      console.log(this.TEMP_ROOT_DATA, '------------------this.rootData--------------------')
      if ((this.$route.query.agin || this.$route.query.wxId || this.$route.query.instrucTitle) && this.instrucState !=='0') {
        shareCont.instrucId = this.TEMP_ROOT_DATA.instrucId,
          shareCont.shareTitle=this.LS.getItem('instrcName'); // 分享标题
        shareCont.shareIntro =  this.LS.getItem('instrcDesc'); // 分享文字介绍
        shareCont.shareImg = this.TEMP_ROOT_DATA.tempCon.banner[0].picUrl || 'http://style.iambuyer.com/img/rhx-mobile-normal@2x.png'; // 分享图片
        shareCont.shareLink = "http://api.ruhexiu.com/rest-rp/wechat/portal/shareUrl?instrucId=" + this.TEMP_ROOT_DATA.instrucId + "&tempId=" + this.TEMP_ROOT_DATA.tempId + "&urlName=" + this.TEMP_ROOT_DATA.path; // 分享链接
      }
      console.log(shareCont, '---------------------------shareCont---------------------')
      wxShareTimeline(shareCont);
      wxShareAppMessage(shareCont);
    },
    radioCheck(e){ // 判断点击的是哪个链接按钮
      console.log(e)
      this.checked = e
      this.checkItems = ''; // 定制字表为空
      this.wantAddBtnUrl = ''; // 定制字表选的为空
      this.wantAddBtnName = ''; // 定制字表选的为空
      if (e==='2'){
        this.getList('','1')
      }
    },
    checkItem(key){ // 判断子表点击的按钮显示
      console.log(key)
      this.checkItems = key
      let url = '';
      if (this.$route.query.wxId && !this.$route.query.agin) {
        url = window.location.protocol + '//' + window.location.host + '/cust?wxId=' + this.$route.query.wxId +  '&tempId=11&instrucId='
      } else if (!this.$route.query.wxId && this.$route.query.agin){
        url = window.location.protocol + '//' + window.location.host + '/cust?agin=' + this.$route.query.agin  + '&tempId=11&instrucId='
      } else if (!this.$route.query.wxId && !this.$route.query.agin) {
        url = window.location.protocol + '//' + window.location.host + '/cust?tempId=11&instrucId='
      } else if (this.$route.query.wxId && this.$route.query.agin){
        url = window.location.protocol + '//' + window.location.host + '/cust?agin=' + this.$route.query.agin  + '&wxId=' + this.$route.query.wxId +  '&tempId=11&instrucId='
      }
      console.log(url, '------------------url---------------')
      this.list.map((item,index)=>{
        if (item.instrucId === key){
          this.wantAddBtnUrl = url + item.instrucId;
          this.wantAddBtnName = item.instrucTitle
        }

      })
    },
    // 获取定制模板列表
    getList(state,instrucCustType) {
      API._UpdateInstruc(1,state,instrucCustType).then(res => {
        if (res.ret == API.ERROK) {
          console.log(res.content, '定制模板列表数据')
          this.list = res.content.list
          this.count = res.content.count;
        } else {
          this.$vux.toast.show({
            width: "80%",
            text: res.content,
            type: "text",
            // position: "bottom"
          });
        }
      });
    },
    // vue scroller 上啦加载
    infinite(done) {
      console.log("quanbu");
      this.instrucCustType = 1;
      if (this.count > 10) {
        if (this.page * 10 < this.count) {
          this.page++;
          setTimeout(() => {
            API._UpdateInstruc(this.page,this.state,this.instrucCustType).then(res => {
              if (res.ret == API.ERROK) {
                let i;
                for (i = 0; i < res.content.list.length; i++) {
                  this.list.push(res.content.list[i]);
                }
              }
            });
            this.$refs.myScroller.resize();
            done();
          }, 1500);
        } else {
          // this.$vux.toast.show({
          //   width: "60%",
          //   text: "没有数据啦！",
          //   type: "text",
          //   position: "bottom"
          // });
          this.page = 1;
        }
      }
    },
    infiniteLine(done) {
      if (this.count1 > 10) {
        console.log("shangxian");
        if (this.page * 10 < this.count1) {
          this.page++;
          console.log("触发了滚动加载");
          setTimeout(() => {
            API._UpdateInstruc(this.page, 1).then(res => {
              if (res.ret == API.ERROK) {
                let i;
                for (i = 0; i < res.content.list.length; i++) {
                  this.upLine.push(res.content.list[i]);
                }
              }
            });
            this.$refs.myScroller1.resize();
            done();
          }, 1500);
        } else {
          // this.$vux.toast.show({
          //   width: "60%",
          //   text: "没有数据啦！",
          //   type: "text",
          //   position: "bottom"
          // });
          this.page = 1;
        }
      }
    },
    infiniteCaoGao(done) {
      if (this.count0 > 10) {
        console.log("caogao");
        if (this.page * 10 < this.count0) {
          this.page++;
          console.log("触发了滚动加载");
          setTimeout(() => {
            API._UpdateInstruc(this.page, 0).then(res => {
              if (res.ret == API.ERROK) {
                let i;
                for (i = 0; i < res.content.list.length; i++) {
                  this.caoGao.push(res.content.list[i]);
                }
              }
            });
            this.$refs.myScroller0.resize();
            done();
          }, 1500);
        } else {
          // this.$vux.toast.show({
          //   width: "60%",
          //   text: "没有数据啦！",
          //   type: "text",
          //   position: "bottom"
          // });
          this.page = 1;
        }
      }
    },
    goTempDetail() { // 去定制模板
      // this.set_preview(true);
      // this.$router.push({path:'/prodesc',query: { tempid:i }});
      let DZtempId = Number(localStorage.getItem('DZtempId')); // 获取缓存中的定制模板的id'
      API._getTempDetail(DZtempId,'').then(res => {
        if (res.ret === API.ERROK) {
          console.log(res);
          this.setTempData(res.content.context);
          this.$nextTick(() => {
            this.$router.push({
              path: this.GET_TEMP_DATA.path,
              query: {confirmEdit: API.ERROK, tempId: DZtempId}
            });
          });
        } else {
        }
      });
    },

    //点赞
    isLike() {
      if (this.INSTRC_ROOT_DATA.isLike === '0') {
        API._instrucLike(this.$route.query.instrucId, this.$route.query.wxId)
        this.INSTRC_ROOT_DATA.isLike = '1'
        this.INSTRC_ROOT_DATA.likeCn += 1
      }
    },
    // 来自陌拜商机的点赞
    clickIsLike () {
      if (this.isLikeMMB === false) {
        this.isLikeMMB = true;
        API._instrucLike(this.$route.query.instrucId);
        this.INSTRC_ROOT_DATA.likeCn += 1
      }
    },
    // 点击替换图片按钮
    changeImg(imgPath, key) {
      console.log(key, '--------------------key')
      this.choseImgPath = imgPath
      this.choseImgKey = key
    },
    // 点击删除图片
    removeImg(imgPath, key) {
      imgPath[key] = ''
    },
    // 选择后的文件对象并上传
    getThisFile(e) {
      this.thisImgFile = e.target.files[0]
      console.log(this.thisImgFile)
      lrz(this.thisImgFile).then((afterImg) => {
        const that = this
        let formData = new FormData()
        formData.append('file', afterImg.file)
        formData.append('systemName', 'ruhexiu')
        API._UploadImg(formData).then((res) => {
          if (res.ret === API.ERROK) {
            let fD = new FormData()
            fD.append('fileName', res.name)
            API._uploadSuccess(fD).then((rs) => {
              if (rs.ret === API.ERROK) {
                that.$set(that.choseImgPath, that.choseImgKey, rs.httpUrl)
              }
            })
          }
        })
        console.log(afterImg)
      })
      e.target.value = ''
    },
    //基于userId或者产品id获取用户信息以便在关注我们页和联系电话页操作
    gUinfo() {
      if (this.editable && this.LS.getItem('userId')) {
        API._GetUserInfo(this.LS.getItem('userId')).then((res) => {
          if (res.ret == API.ERROK) {
            this.userRetVO.companyName = JSON.parse(JSON.stringify(res.content.companyName))
            this.userRetVO.companyIntro = JSON.parse(JSON.stringify(res.content.companyIntro))
            this.userRetVO.wechatQrImg = JSON.parse(JSON.stringify(res.content.wechatQrImg))
            this.userRetVO.contactTelphone = JSON.parse(JSON.stringify(res.content.contactTelphone))
            this.userRetVO.contactEmail = JSON.parse(JSON.stringify(res.content.contactEmail))
            this.userRetVO.addressDetail = JSON.parse(JSON.stringify(res.content.addressDetail))
            setTimeout(() => {
              let test = document.querySelectorAll('textarea')
              for (let i = 0; i < test.length; i++) {
                autoTextarea(test[i])
              }
            }, 500)
          }
        })
      } else if (this.$route.query.instrucId) {
        API._InstrucDetails(this.$route.query.instrucId).then((res) => {
          if (res.ret == API.ERROK) {
            this.userRetVO.companyName = JSON.parse(JSON.stringify(res.content.userRetVO.companyName))
            this.userRetVO.companyIntro = JSON.parse(JSON.stringify(res.content.userRetVO.companyIntro))
            this.userRetVO.wechatQrImg = JSON.parse(JSON.stringify(res.content.userRetVO.wechatQrImg))
            this.userRetVO.contactTelphone = JSON.parse(JSON.stringify(res.content.userRetVO.contactTelphone))
            this.userRetVO.contactEmail = JSON.parse(JSON.stringify(res.content.userRetVO.contactEmail))
            this.userRetVO.addressDetail = JSON.parse(JSON.stringify(res.content.userRetVO.addressDetail))
            setTimeout(() => {
              let test = document.querySelectorAll('textarea')
              for (let i = 0; i < test.length; i++) {
                autoTextarea(test[i])
              }
            }, 500)
          }
        })
      }
    },
    //打开关注我们
    openFollowMe() {
      this.gUinfo()
      this.$refs.followMe.style.top = 0
      this.appFixedOrStatic('fixed')
      if (this.$route.query.source === 'FI') { // 来自商机流量承载页
        let query = JSON.parse(localStorage.getItem('query')); // 读取缓存的query
        let params = { // 记录关注我们参数
          "type":"4",
          "sessionId": query.sessionId,
          "instId":Number(this.$route.query.instrucId)
        }
        API._setAdveData(params).then(res => { // 记录关注我们
          console.log(res);
          params.type = '0';
          API._setAdveData(params).then(res => { // 记录访问数
            console.log(res);
          });
        });
      }
    },
    //隐藏关注我们
    hideFollowMe() {
      this.$refs.followMe.style.top = '100%'
      this.appFixedOrStatic('static')
    },
    //保存个人资料信息
    saveUinfo() {
      // console.log((this.userRetVO.wechatQrImg).split('/').pop())
      API._UpdateUserInfoGZ(this.LS.getItem('userId'), this.userRetVO).then((res) => {
        console.log(res)
      })
    },
    //保存输入的关注我们的信息
    saveFollowMe() {
      if (!this.isPhone.test(this.userRetVO.contactTelphone) && !this.isEmail.test(this.userRetVO.contactEmail)) {
        this.$vux.toast.show({
          width: "60%",
          text: "请输入正确的手机号或邮箱",
          type: "text",
          position: "middle",
          onHide: () => {
            // this.wantAddTel = ''
          }
        });
      } else {
        this.$refs.followMe.style.top = '27.786667rem'
        this.appFixedOrStatic('static')
        //保存个人资料信息
        this.saveUinfo()
      }

    },
    //删除底部二个按钮
    delBtmBtn(btn) {
      if (btn === 'middleBtn') {
        this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnName=''
        this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnLink=''
        this.custIdOne = ''
        localStorage.setItem('custIdOne', this.custIdOne);
        console.log(this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn,'this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn')
      } else if (btn === 'rightBtn') {
        this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnName=''
        this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnLink=''
        this.custIdTwo = ''
        localStorage.setItem('custIdTwo', this.custIdTwo);
        console.log(this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn,'this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn')
      }
    },
    //保存底部操作区域的两个互动按钮
    saveBtmActBtn() {
      if (this.checked==='1'){
        if ( this.wantAddBtnName === '') {
          this.$vux.toast.show({
            width: "60%",
            text: "请输入按钮名称",
            type: "text",
            position: "middle",
            onHide: () => {
              // this.wantAddTel = ''
            }
          });
          return;
        }
        if ( this.wantAddBtnUrl === '') {
          this.$vux.toast.show({
            width: "60%",
            text: "请输入链接地址",
            type: "text",
            position: "middle",
            onHide: () => {
              // this.wantAddTel = ''
              // this.checkItems = ''; // 定制字表为空
            }
          });
          return;
        }
      } else {
        if ( this.wantAddBtnName === '' || this.wantAddBtnUrl==='') {
          this.$vux.toast.show({
            width: "60%",
            text: "请选择定制模板",
            type: "text",
            position: "middle",
            onHide: () => {
              // this.wantAddTel = ''
            }
          });
          return;
        }
      }

      if (this.wantAddBtn === 'middleBtn') {
        this.$set(this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn, 'btnName', this.wantAddBtnName)
        this.$set(this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn, 'btnLink', this.wantAddBtnUrl)
        this.custIdOne = this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnLink.split('instrucId=')[1];
        localStorage.setItem('custIdOne', this.custIdOne);
        console.log(this.custIdOne)
      }
      if (this.wantAddBtn === 'rightBtn') {
        this.$set(this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn, 'btnName', this.wantAddBtnName)
        this.$set(this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn, 'btnLink', this.wantAddBtnUrl)
        this.custIdTwo = this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnLink.split('instrucId=')[1];
        localStorage.setItem('custIdTwo', this.custIdTwo);
        console.log(this.custIdTwo)
      }
      this.wantAddBtnName = ''
      this.wantAddBtnUrl = ''
      this.hideAddBtmBtnBox()
      // }

    },
    //保存联系电话
    saveTel() {
      if (!this.isPhone.test(this.userRetVO.contactTelphone) && !this.isMob.test(this.userRetVO.contactTelphone)) {
        this.$vux.toast.show({
          width: "60%",
          text: "请输入正确电话号码",
          type: "text",
          position: "middle",
          onHide: () => {
            // this.wantAddTel = ''
          }
        });
      } else {
        this.$refs.addTelBox.style.bottom = '-7.933333rem'
        this.$set(this.userRetVO, 'contactTelphone', this.userRetVO.contactTelphone)
        this.saveUinfo()
      }

    },
    //点击添加底部按钮操作
    addBtmBtn(btn) {
      this.checkItems = '';
      this.addActBoxShow = true // 显示添加按钮模块
      this.wantAddBtn = btn
      console.log(this.wantAddBtn)
      this.AddBtmBtnBox('up')
    },
    // 点击自定义按钮
    clickZdyBtn () {
      if (this.$route.query.source === "FI") { // 来自商机流量承载页
        let query = JSON.parse(localStorage.getItem('query')); // 读取缓存的query
        let params = { // 记录自定义按钮
          "type":"5",
          "sessionId":query.sessionId,
          "instId":Number(this.$route.query.instrucId)
        }
        API._setAdveData(params).then(res => { // 记录自定义按钮
          console.log(res);
          //说明书访问统计
          let params = { // 记录用户停留时间
            "type":"6",
            "instId":Number(this.$route.query.instrucId)
          }
          API._instrucDate(params.type, params.instId).then(res => {
            console.log(res);
          });
        });
      } else if (this.$route.query.source === 'FB') {
        let params = { // 记录用户自定义按钮
          "type":"6",
          "instId":Number(this.$route.query.instrucId)
        }
        API._instrucDate(params.type, params.instId).then(res => {
          console.log(res);
        });
      }
    },
    //点击添加联系电话
    showAddTel(updown, event, telNum) {
      this.gUinfo()
      if (this.editable) {
        event.preventDefault()
        updown === 'up' ? this.$refs.addTelBox.style.bottom = '2.6rem' : ''
        updown === 'down' ? this.$refs.addTelBox.style.bottom = '-7.933333rem' : ''
      }
      console.log(telNum, '触发联系我们时要求电话号码不为空');
      if (telNum) {
        if (this.$route.query.source === 'FI') { // 来自商机流量承载页
          let query = JSON.parse(localStorage.getItem('query')); // 读取缓存的query
          let params = { // 记录电话
            "type":"1",
            "sessionId":query.sessionId,
            "instId":Number(this.$route.query.instrucId)
          }
          API._setAdveData(params).then(res => { // 记录电话数
            console.log(res);
          });
        }
        if (this.$route.query.source === 'FB') { // 来自商机流量承载页
          let params = { // 记录用户自定义按钮
            "type":"8",
            "instId":Number(this.$route.query.instrucId)
          }
          API._instrucDate(params.type, params.instId).then(res => {
            console.log(res);
          });
        }
      }
    },
    //取消显示添加按钮模框
    hideAddBtmBtnBox() {
      this.addActBoxShow = false // 隐藏添加按钮模块
      this.AddBtmBtnBox('down')
    },
    //显示隐藏添加按钮模框
    AddBtmBtnBox(updown) {
      updown === 'up' ? this.$refs.addActionBox.style.bottom = '2.6rem' : ''
      updown === 'down' ? this.$refs.addActionBox.style.bottom = '-7.933333rem' : ''
    },
    //再次编辑的入口
    againEditEntry(t) {
      API._InstrucDetails(this.$route.query.instrucId).then(res => {
        if (res.ret === API.ERROK) {
          console.log(res.content)
          this.mitList = res.content; // 获取编辑时返回的总数居
          this.instrucState = res.content.instrucState; // 判断发布状态， 0 未发布， 1 发布
          document.title = res.content.instrucTitle
          this.instrcDesc = res.content.instrucIntro;
          this.instrcName = res.content.instrucTitle;
          this.LS.setItem('instrcName', res.content.instrucTitle)
          this.LS.setItem('instrcDesc', res.content.instrucIntro)
          console.log( this.instrcDesc, this.instrcName, '--------------------标题和介绍-------------')
          this.TEMP_ROOT_DATA = res.content.context
          // this.butType() // 自定义按钮样式
          this.$store.commit('getInstrucTitle',res.content.tempName)
          this.$store.commit('getInstrucIntro',res.content.tempIntro)
          //遍历再次编辑的模块的顺序然后动态注册组件
          for (let md of this.TEMP_ROOT_DATA.tempCon.modulesSort) {
            let len = md.split("_").length
            if (len === 2) {
              switch (md) {
                case 'mi_desc':
                  const desc = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miDesc(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].descCon
                    }

                  })
                  Vue.component(md, desc)
                  this.mixArray.push(md)
                  break;
                case 'mi_install':
                  const install = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miInstall(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].installCon
                    }
                  })
                  Vue.component(md, install)
                  this.mixArray.push(md)
                  break;
                case 'mi_use':
                  const use = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miUse(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].useCon
                    }
                  })
                  Vue.component(md, use)
                  this.mixArray.push(md)
                  break;
                case 'mi_contact':
                  const contact = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miContact(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].contactCon
                    }
                  })
                  Vue.component(md, contact)
                  this.mixArray.push(md)
                  break;
                case 'mi_canshu':
                  const canshu = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miCanshu(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].canshuCon
                    }
                  })
                  Vue.component(md, canshu)
                  this.mixArray.push(md)
                  break;
                case 'mi_care':
                  const care = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miCare(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].careCon
                    }
                  })
                  Vue.component(md, care)
                  this.mixArray.push(md)
                  break;
              }
            } else if (len === 3) {
              console.log('用户新增的模块')
              let HashMdName = md.split("_").splice(0, 2).join("_")
              let HashMdHash = md.split("_")[md.split("_").length - 1]
              switch (HashMdName) {
                case 'mi_desc':
                  const desc = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miDesc(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].descCon
                    }
                  })
                  Vue.component(md, desc)
                  this.mixArray.push(md)
                  break;
                case 'mi_install':
                  const install = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miInstall(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].installCon
                    }
                  })
                  Vue.component(md, install)
                  this.mixArray.push(md)
                  break;
                case 'mi_use':
                  const use = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miUse(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].useCon
                    }
                  })
                  Vue.component(md, use)
                  this.mixArray.push(md)
                  break;
                case 'mi_contact':
                  const contact = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miContact(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].contactCon
                    }
                  })
                  Vue.component(md, contact)
                  this.mixArray.push(md)
                  break;
                case 'mi_canshu':
                  const canshu = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miCanshu(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].canshuCon
                    }
                  })
                  Vue.component(md, canshu)
                  this.mixArray.push(md)
                  break;
                case 'mi_care':
                  const care = Vue.extend({
                    mixins: [itemsFuncMixin],
                    props: ['TEMP_ROOT_DATA'],
                    template: moduleString.miCare(),
                    data() {
                      return {
                        // 选择图片文件的id
                        choseimgfile: gethashcode(),
                        editable: t,
                        mdKey: md,
                        dataPath: '',
                        //排序追加项目专用数据指向
                        sortPath: ''
                      }
                    },
                    created() {
                      this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
                      this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].careCon
                    }
                  })
                  Vue.component(md, care)
                  this.mixArray.push(md)
                  break;
              }
            }
          }
        } else {
          alert(res.msg)
        }
      });
    },
    // 添加说明书简介
    addDesc() {
      this.temp_preview()
      setTimeout(() => {
        this.setTempData(JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)))
        this.LS.setItem('_IN_DATA', JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)))
        if (!this.againEditting) {
          console.log('测试第一次提交')
          //第一次提交
          this.$router.push({path: "/adddesc", query: {formal: '200', instrucCustType: this.instrucCustType}})
        } else if (this.instrucState === '0') {
          this.$router.push({path: "/adddesc", query: {formal: '200', instrucCustType: this.instrucCustType}})
        } else {
          console.log('测试更新说明书')
          //更新说明书
          this.$router.push({path: "/adddesc", query: {update: '200', instrucId: this.$route.query.instrucId, instrucCustType: this.instrucCustType}})
        }
      }, 188)
    },
    // 存草稿操作
    saveDraft() {
      this.temp_preview()
      setTimeout(() => {
        this.setTempData(JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)))
        this.LS.setItem('_IN_DATA', JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA)))
        this.$router.push({path: "/adddesc", query: {draft: '200', instrucCustType: this.instrucCustType}})
      }, 500)
    },
    //锚点定位
    goID(ID) {
      this.isSelIconStyle = ID
      let anchor = document.getElementById(ID)
      if (anchor) {
        $('html').animate({scrollTop: anchor.offsetTop - 120})
        $('body').animate({scrollTop: anchor.offsetTop - 120})
      }
    },
    //添加模块操作
    addMd() {
      //当前要添加的模块的名字
      console.log(this.selMd)
      //制造要添加的模块在数据中的名字(key) 例如 : mi_desc
      let addModuleKey = this.selMd + gethashcode()
      //复制要添加的模块的数据
      let addModuleData = JSON.parse(JSON.stringify(this.BAK_DATA.tempCon.modules[this.selMd]))
      console.log(addModuleData,'----------------------addModuleData----------------------')
      //更改要添加的模块的数据的模块
      addModuleData.icon.moduleName = addModuleKey
      //干掉那两个增加个排序的图标
      this.delAddAndSortBtn()
      //更改本地的数据
      this.$set(this.TEMP_ROOT_DATA.tempCon.modules, addModuleKey, addModuleData)
      //找回那两个增加个排序的图标
      this.addAddAndSortBtn()
      //追加要添加的模块的名字到顺序维护数组
      this.TEMP_ROOT_DATA.tempCon.modulesSort.push(addModuleKey)
      //隐藏当前添加模块框
      this.hideAddModule()
      //追加模块到页面中
      //判断要添加的模块的名字，因为有的模块会有多个项，多个项的模块操纵难度会增加一个维度，鉴于时间关系暂定switch case
      switch (this.selMd) {
        case 'mi_desc':
          const desc = Vue.extend({
            mixins: [itemsFuncMixin],
            props: ['TEMP_ROOT_DATA'],
            template: moduleString.miDesc(),
            data() {
              return {
                // 选择图片文件的id
                choseimgfile: gethashcode(),
                editable: true,
                mdKey: addModuleKey,
                dataPath: '',
                //排序追加项目专用数据指向
                sortPath: ''
              }
            },
            created() {
              console.log('--------------------添加产品模块代码--------------')
              this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
              this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].descCon
            }
          })
          Vue.component(addModuleKey, desc)
          this.mixArray.push(addModuleKey)
          console.log('添加产品简介模块')
          break;
        case 'mi_install':
          const install = Vue.extend({
            mixins: [itemsFuncMixin],
            props: ['TEMP_ROOT_DATA'],
            template: moduleString.miInstall(),
            data() {
              return {
                // 选择图片文件的id
                choseimgfile: gethashcode(),
                editable: true,
                dataPath: '',
                //模块的key
                mdKey: addModuleKey,
                //排序追加项目专用数据指向
                sortPath: '',

              }
            },
            created() {
              this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
              this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].installCon
            }
          })
          Vue.component(addModuleKey, install)
          this.mixArray.push(addModuleKey)
          console.log('添加如何安装模块')
          break;
        case 'mi_use':
          const use = Vue.extend({
            mixins: [itemsFuncMixin],
            props: ['TEMP_ROOT_DATA'],
            template: moduleString.miUse(),
            data() {
              return {
                // 选择图片文件的id
                choseimgfile: gethashcode(),
                editable: true,
                dataPath: '',
                //模块的key
                mdKey: addModuleKey,
                //排序追加项目专用数据指向
                sortPath: '',

              }
            },
            created() {
              this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
              this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].useCon
            }
          })
          Vue.component(addModuleKey, use)
          this.mixArray.push(addModuleKey)
          console.log('添加如何使用模块')
          break;
        case 'mi_contact':
          const contact = Vue.extend({
            mixins: [itemsFuncMixin],
            props: ['TEMP_ROOT_DATA'],
            template: moduleString.miContact(),
            data() {
              return {
                // 选择图片文件的id
                choseimgfile: gethashcode(),
                editable: true,
                dataPath: '',
                //模块的key
                mdKey: addModuleKey,
                //排序追加项目专用数据指向
                sortPath: '',

              }
            },
            created() {
              this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
              this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].contactCon
            }
          })
          Vue.component(addModuleKey, contact)
          this.mixArray.push(addModuleKey)
          console.log('添加联系我们模块')
          break;
        case 'mi_canshu':
          const canshu = Vue.extend({
            mixins: [itemsFuncMixin],
            props: ['TEMP_ROOT_DATA'],
            template: moduleString.miCanshu(),
            data() {
              return {
                // 选择图片文件的id
                choseimgfile: gethashcode(),
                editable: true,
                mdKey: addModuleKey,
                dataPath: '',
                //排序追加项目专用数据指向
                sortPath: ''
              }
            },
            created() {
              this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
              this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].canshuCon
            }
          })
          Vue.component(addModuleKey, canshu)
          this.mixArray.push(addModuleKey)
          console.log('添加基本参数模块')
          break;
        case 'mi_care':
          const care = Vue.extend({
            mixins: [itemsFuncMixin],
            props: ['TEMP_ROOT_DATA'],
            template: moduleString.miCare(),
            data() {
              return {
                // 选择图片文件的id
                choseimgfile: gethashcode(),
                editable: true,
                mdKey: addModuleKey,
                dataPath: '',
                //排序追加项目专用数据指向
                sortPath: ''
              }
            },
            created() {
              this.dataPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey]
              this.sortPath = this.TEMP_ROOT_DATA.tempCon.modules[this.mdKey].careCon
            }
          })
          Vue.component(addModuleKey, care)
          this.mixArray.push(addModuleKey)
          console.log('添加注意事项模块')
          break;
        default:
          break;
      }
    },
    // app 页fixed
    appFixedOrStatic(fs) {
      if (fs === 'fixed') {
        setTimeout(() => {
          document.getElementById('app').style.position = fs
        }, 300)
      } else if (fs === 'static') {
        document.getElementById('app').style.position = fs
      }
    },
    /**
     * 点击导航按钮事件
     * **/
    clickModuleIcon(e, i) {
      this.nowScrollTop = document.body.scrollTop || document.documentElement.scrollTop
      //如果是编辑状态下的点击
      if (this.GET_EDITABLE) {
        // 判断点击了添加模块按钮
        if (i === 'add_icon') {
          this.$refs.selModule.style.top = 0
          this.$refs.addTisMd.style.bottom = 0
          this.$refs.ediTingBtmBtns.style.height = 0
          this.appFixedOrStatic('fixed')
          console.log('点击了添加按钮')
          console.log(this.nowScrollTop)
          this.paiXuShow = true; // 显示
          // 判断点击了排序按钮
        } else if (i === 'sort_icon') {
          this.mixArrayBK = this.mixArray; // 先保存备份
          this.$refs.sortModule.style.top = 0
          this.$refs.ediTingBtmBtns.style.height = 0
          this.appFixedOrStatic('fixed')
          console.log('点击了排序按钮')
        } else {
          //编辑状态下点击其它按钮逻辑
          console.log(i)
          this.wantChangeIcon = i
          this.$refs.selIconGroup.style.height = '3.5rem'
          this._initSelIconWrap()
        }
      } else {
        //如果在非编辑状态下的点击
      }

    },
    /**
     * 导航删除按钮事件
     * **/
    delThisModule(item, index) {
      if (this.TEMP_ROOT_DATA.tempCon.modulesSort.length !== 1) {
        this.$createDialog({
          type: 'confirm',
          // icon: 'cubeic-alert',
          title: '温馨提醒',
          content: '您确定要删除该模块吗？<br><br>删除后模块中的内容也会删除哦~~~',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            // 删除本地数据中的某个模块
            this.$delete(this.TEMP_ROOT_DATA.tempCon.modules, index)
            // 删除存储模块顺序的某个模块
            for (let i = 0; i < this.TEMP_ROOT_DATA.tempCon.modulesSort.length; i++) {
              this.TEMP_ROOT_DATA.tempCon.modulesSort[i] === index ? this.TEMP_ROOT_DATA.tempCon.modulesSort.splice(i, 1) : ''
            }
            // 删除渲染模块的数组的某个模块
            for (let i = 0; i < this.mixArray.length; i++) {
              this.mixArray[i] === index ? this.mixArray.splice(i, 1) : ''
            }
            // 删除模块之后重新渲染，是否可编辑的状态重置
            this.$nextTick(() => {
              this.set_edit(false)
              setTimeout(() => {
                this.set_edit(true)
              }, 50)
            })
            this.$createToast({
              type: 'loading',
              time: 1000,
            }).show()
          },
          onCancel: () => {

          }
        }).show()
      } else {
        this.$createDialog({
          type: 'alert',
          title: '温馨提醒',
          content: '至少有一个模块吧！'
        }).show()
      }
    },
    // 点击选中的图标
    clickSelIcon(item, index) {
      this.TEMP_ROOT_DATA.tempCon.modules[this.wantChangeIcon].icon.iconImg = item
      this.$refs.selIconGroup.style.height = '0'
    },
    //去编辑按钮
    goEdit() {
      console.log('触发编辑按钮');
      console.log(this.mitList.isPut, '获取此说明书发布状态1，代表发布中，此时不可编辑，不可完善，不可删除');
      if (this.mitList.isPut === 1) { // 判断发布中状态的操作
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
      this.butTypeRest() // 自定义按钮样式
      this.set_edit(true)
      this.addAddAndSortBtn()
      if (document.getElementById('confirm')) {
        document.getElementById('confirm').style.bottom = '-1.173333rem'
      }
      if (document.getElementById('ediTingBtmBtns')) {
        document.getElementById('ediTingBtmBtns').style.bottom = '0'
      }
    },
    // 隐藏选择模块框
    hideAddModule() {
      this.$refs.selModule.style.top = '100%'
      this.$refs.addTisMd.style.bottom = '-1.2rem'
      this.$refs.ediTingBtmBtns.style.height = '1.173333rem'
      this.appFixedOrStatic('static')
    },
    butTypeRest(){ // 重置自定义按钮样式
      this.isKong2 = false
      this.isKong1 = false
    },
    //自定义按钮显示
    butType(){
      console.log( this.TEMP_ROOT_DATA.tempCon, '-----------------')
      let leftBtn = this.TEMP_ROOT_DATA.tempCon.userActionBtn.middleBtn.btnName;
      let rightBtn = this.TEMP_ROOT_DATA.tempCon.userActionBtn.rightBtn.btnName;
      if (leftBtn === '' && rightBtn==='') { // 第一个和第二个都没有
        this.isKong2 = false
        this.isKong1 = false
      } else if (leftBtn!=='' && rightBtn ===''){ // 第二个为空
        this.isKong2 = true
        this.isKong1 = false
      } else if (leftBtn==='' && rightBtn !==''){ // 第一个为空
        this.isKong2 = false
        this.isKong1 = true
      } else if (leftBtn!=='' && rightBtn !==''){ // 都不为空
        this.isKong2 = false
        this.isKong1 = false
      }
    },
    // 预览操作
    temp_preview() {
      this.butType()
      this.$nextTick(() => {
        this.set_edit(false)
        this.delAddAndSortBtn()
        this.$refs.confirm.style.bottom = '0'
        this.$refs.ediTingBtmBtns.style.bottom = '-1.173333rem'
        this.$refs.addTelBox.style.bottom = '-7.933333rem'
        this.banner.autoPlay = true
        this.AddBtmBtnBox('down')
      })
    },
    // 选中模块
    selThisMd(item, e, i) {
      this.selMdTips = i
      this.selMd = JSON.parse(JSON.stringify(item.icon.moduleName))
    },
    //去除增加和排序按钮
    delAddAndSortBtn() {
      setTimeout(() => {
        this.$delete(this.TEMP_ROOT_DATA.tempCon.modules, 'add_icon')
        this.$delete(this.TEMP_ROOT_DATA.tempCon.modules, 'sort_icon')
      }, 30)
    },
    //增加增加和排序按钮
    addAddAndSortBtn() {
      setTimeout(() => {
        this.$set(this.TEMP_ROOT_DATA.tempCon.modules, 'add_icon', this.add_icon)
        this.$set(this.TEMP_ROOT_DATA.tempCon.modules, 'sort_icon', this.sort_icon)
      }, 30)
    },
    // mixin中的组件名存进数组
    mixin2array() {
      this.$nextTick(() => {
        for (let i in this.OriginalModule) {
          this.mixArray.push(i)
        }
      })
    },
    //拖动排序函数
    getdata(evt) {
      console.log(evt.draggedContext.element)
    },
    // 拖动排序完毕执行函数
    datadragEnd: function (evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      // this.ccSortModule()
      // // 拖动排序后的渲染顺序改变
      // this.mixArray = JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA.tempCon.modulesSort))
      // console.log(this.mixArray, '------------------this.mixArray--------------')
      // // 更改json对象数据中模块key的顺序来改变导航中图标的顺序
      // this.delAddAndSortBtn()
      // let wantSortMd = JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA.tempCon.modules))
      // console.log(wantSortMd, '------------------wantSortMd--------------')
      // let toSortMd = JSON.parse(JSON.stringify(this.mixArray))
      // let doneMd = []
      // for (let i = 0; i < toSortMd.length; i++) {
      //   doneMd.push({[toSortMd[i]]: wantSortMd[toSortMd[i]]})
      // }
      // // 定义改变顺序后的模块数据
      // let changeDoneMd = {}
      // for (let i = 0; i < doneMd.length; i++) {
      //   changeDoneMd[[toSortMd[i]]] = wantSortMd[toSortMd[i]]
      // }
      // this.TEMP_ROOT_DATA.tempCon.modules = changeDoneMd
      // console.log(this.TEMP_ROOT_DATA.tempCon.modules, '--------------------this.TEMP_ROOT_DATA.tempCon.modules------------')
      // // 重置editable状态
      // setTimeout(() => {
      //   this.set_edit(false)
      // }, 100)
      // setTimeout(() => {
      //   this.set_edit(true)
      // }, 200)
      // this.addAddAndSortBtn()
      // 排序json数组中的顺序
      // console.log(this.list)
    },
    ccSortModule(){
      console.log('保存')
      // 拖动排序后的渲染顺序改变
      this.mixArray = JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA.tempCon.modulesSort))
      console.log(this.mixArray, '------------------this.mixArray--------------')
      // 更改json对象数据中模块key的顺序来改变导航中图标的顺序
      this.delAddAndSortBtn()
      let wantSortMd = JSON.parse(JSON.stringify(this.TEMP_ROOT_DATA.tempCon.modules))
      console.log(wantSortMd, '------------------wantSortMd--------------')
      let toSortMd = JSON.parse(JSON.stringify(this.mixArray))
      let doneMd = []
      for (let i = 0; i < toSortMd.length; i++) {
        doneMd.push({[toSortMd[i]]: wantSortMd[toSortMd[i]]})
      }
      // 定义改变顺序后的模块数据
      let changeDoneMd = {}
      for (let i = 0; i < doneMd.length; i++) {
        changeDoneMd[[toSortMd[i]]] = wantSortMd[toSortMd[i]]
      }
      this.TEMP_ROOT_DATA.tempCon.modules = changeDoneMd
      console.log(this.TEMP_ROOT_DATA.tempCon.modules, '--------------------this.TEMP_ROOT_DATA.tempCon.modules------------')
      // 重置editable状态
      setTimeout(() => {
        this.set_edit(false)
      }, 100)
      setTimeout(() => {
        this.set_edit(true)
      }, 200)
      this.addAddAndSortBtn()
      this.paiXuShow = false;
      this.$refs.sortModule.style.top = '100%'
      this.$refs.addTisMd.style.bottom = '-1.2rem'
      this.$refs.ediTingBtmBtns.style.height = '1.173333rem'
      this.appFixedOrStatic('static')
    },
    // 排序模块隐藏
    hideSortModule() {
      this.TEMP_ROOT_DATA.tempCon.modulesSort = this.mixArrayBK; // 回复备份
      this.paiXuShow = false;
      this.appFixedOrStatic('static')
      document.getElementById('ediTingBtmBtns').style.height = '1.173333rem'
      this.$refs.sortModule.style.top = '100%'
    },
    /**
     * banner start
     * **/
    // 滚动屏幕执行逻辑
    hScroll() {
      this.$nextTick(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let nav = document.getElementById('navTopGroup')
        let hideNav = document.getElementById('hideNavTopGroup')
        let selIcon = this.$refs.selIconGroup
        let hideSelIcon = this.$refs.hideselIconGroup
        document.getElementById('selIconGroup').style.height = '0'
        // this.$refs.addTelBox.style.bottom = '-7.933333rem'
        if (scrollTop > this.GET_BANNER_HEIGHT) {
          hideNav.style.display = 'block'
          // hideSelIcon.style.display = 'block'
          nav.style.position = 'fixed'
          nav.style.top = '0'
          nav.style.zIndex = '9999999'
          selIcon.style.position = 'fixed'
          selIcon.style.top = '2.1333333rem'
        } else {
          hideNav.style.display = 'none'
          hideSelIcon.style.display = 'none'
          selIcon.style.position = 'static'
          nav.style.position = 'static'
          nav.style.top = '0'
          nav.style.zIndex = '9999999'
        }
      })
    },
    /**
     * 导航吸顶
     * **/
    /**
     * banner end
     * **/
    _initSelIconWrap() {
      let selscroll = new BScroll('.selIconGroup', {
        scrollX: true,
        click: true
      })
    },
  ...mapMutations({
      setTempData: 'SET_TEMP_DATA',
      set_up_or_down: 'SET_UPORDOWN',
      set_edit: 'SET_EDITABLE',
      set_preview: 'SET_IS_PREVIEW',
      set_banner_height: 'SET_BANNER_HEIGHT'
    })
  },
  updated() {
    const _that = this
    this.$nextTick(() => {
      if (this.$route.query.wxId || this.$route.query.lookMyInstrc) {
        if (this.$refs.confirm) {
          this.$refs.confirm.style.bottom = '-1.173333rem'
          this.$refs.userBtmBtnGroup.style.bottom = 0
        }
      }
      if (this.$route.query.source){
        this.$refs.userBtmBtnGroup.style.bottom = 0;
      }
      let textareas = document.querySelectorAll('textarea')
      $(textareas).on('focus', function () {
        for (let i = 0; i < textareas.length; i++) {
          autoTextarea(textareas[i])
        }
        document.getElementById('userBtmBtnGroup').style.opacity = '0'
        document.getElementById('ediTingBtmBtns').style.opacity = '0'
        _that.$refs.addActionBox.style.bottom = '-7.933333rem'
        _that.$refs.addTelBox.style.bottom = '-7.933333rem'
      })
      $(textareas).on('blur', function () {
        document.getElementById('userBtmBtnGroup').style.opacity = '1'
        document.getElementById('ediTingBtmBtns').style.opacity = '1'
      })
    })

  },
  computed: {
    //编辑状态线
    editTextOutLine() {
      if (this.editable) {
        return `border:.02rem dashed rgba(172,172,172,1);border-radius:3px`
      }
    },
    modulesListItemWidth() {
      const that = this
      return (function (w) {
        switch (w) {
          case 1:
            return `width:${that.nav.screenWidth}px`
            break;
          case 2:
            return `width:${that.nav.screenWidth / 2}px`
            break;
          case 3:
            return `width:${that.nav.screenWidth / 3}px`
            break;
          case 4:
            return `width:${that.nav.screenWidth / 4}px`
            break;
          default:
            return `width:${(that.nav.screenWidth / 4) - ((that.nav.screenWidth / 4) / 8)}px`
            break;
        }
      })(Object.keys(this.TEMP_ROOT_DATA.tempCon.modules).length)
    },
    modulesListWidth() {
      const that = this
      return (function (w) {
        switch (w) {
          case 2:
            return `width:100%`
            break;
          case 3:
            return `width:100%`
            break;
          case 4:
            return `width:100%`
          default:
            return `width:${((that.nav.screenWidth / 4) - ((that.nav.screenWidth / 4) / 8)) * w}px`
            break;
        }
      })(Object.keys(this.TEMP_ROOT_DATA.tempCon.modules).length)
    },
    selIconWrapWidth() {
      return `width:${(this.TEMP_ROOT_DATA.tempCon.selIconList.length * 1.6) / 2}rem`
    },
  ...mapGetters([
        'GET_TEMP_DATA',
        'GET_EDITABLE',
        'GET_UINFO',
        'GET_IS_PREVIEW',
        'GET_BANNER_HEIGHT',
        'GET_MODULE_ICON'
      ]
    ),
  },
  // beforeRouteLeave(to, from, next) {
  //   // const answer = window.confirm('确定要离开吗？')
  //   // if (answer) {
  //   //   next()
  //   // } else {
  //   //   next(false)
  //   // }
  // },
  components: {
    Loading,
      Flexbox,
      FlexboxItem,
      Divider,
      Radio,
      RadioGroup,
      draggable,
      changeImgTips,
      myFooter2
  },
  activated() {
  },
  deactivated() {
  },
  beforeDestroy() {
    this.editable = false
    this.set_edit(false)
    window.removeEventListener("scroll", this.hScroll);
  }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .isNoList{
    position relative
    width 100%
    margin-top 20%
  }
  .isNoList>p{
    width: 100%;
    text-align: center;
    color: #02c2a2;
    font-size: 3.5vw;
    line-height: 10vw;
  }
  .leftBoxCC{
    position relative;
    float left
    color: #02c2a2;
    width 15vw;
  }
  .rightBoxCC{
    position relative;
    float right
    color: #02c2a2;
    width 15vw
  }
  // 自定义按钮模块
  .maskBox{
    width: 100vw;
    position: fixed;
    top: 0;
    height: 100vh;
    z-index: 9999999;
    background: rgba(0, 0, 0, 0.5);
  }
  .addActBox{
    position: fixed;
    width: 100%;
    bottom: 0vw;
    z-index: 99999991;
  }
  .botPup{
    position relative
    width 100%;
  }
  .topBox{
    position relative
    width 100%;
    padding 0 5% 0 5%
    background #FFFFFF
    border-bottom: 1px solid #ccc;
  }
  .contentBox{
    position relative
    width 100%;
  }
  .butListBox{
    position relative
    width 100%;
  }
  .listBox{
    position relative
    width 100%;
    background #FFFFFF
  }
  .btnTitle{
    position relative
    width 100%;
    padding 0 5% 0 5%
    background #FFFFFF
    height 11vw
  }
  .listDataBox{
    padding: 0 !important;
    background: #f9f7f7 !important;
  }
  .litsItems{
    position relative;
    width 100%;
    height 20vw;
  }
  .inputBox{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .btnTitle>label{
    position: relative;
    margin-right: 34px;
    top: 2vw;
  }
  .btnTitle>input{
    display: none;
  }
  .btnTitle>label::before{
    display: inline-block;
    content: "";
    width: 4vw;
    height: 4vw;
    border-radius: 50%;
    border: 0.026667rem solid #dbdbdb;
    margin-right: 0.16rem;
    /* margin-top: -0.1vw; */
    vertical-align: bottom;
  }
  input:checked+label::before{
    background-color: #fcfcfc;
    border: 0.026667rem solid #02c2a2;
  }
  input:checked+label::after{
    display: inline-block;
    content: "";
    width: 1.5vw;
    height: 1.5vw;
    border-radius: 50%;
    position: absolute;
    left: 1.5vw;
    bottom: 1.7vw;
    background-color: #02c2a2;

  }
  .btnContBox{
    position: relative;
    width: 100%;
    background: #f9f7f7;
    padding 0 5% 0 5%
  }
  .routerDingzhi{
    position: relative;
    width: 100%;
    height: 25vw;
    background: #f9f7f7;
    padding-top: 10vw;
  }
  .btnBox{
    position: relative;
    width: 40%;
    margin-left: 30%;
    padding: 1vw 2vw 1vw 2vw;
    background: #333;
  }
  .imgBox{
    position relative
    width 16%;
  }
  .imgBox>img{
    position relative
    width 100%
  }
  .addBtn{
    position relative
    width 82%;
  }
  .addBtn>p{
    position relative
    font-size 3vw;
    line-height 5vw;
    color #fff
  }
  .radioBox{
    position: relative;
    width: 100%;
    padding: 0 5% 0 5%;
    height: 36vw;
    overflow: scroll;
  }
  .cube-radio-group{
    background-color none
  }
  .cube-radio{
    padding 0 !important
  }
  .instructText{
    position relative
    margin-left 3vw;
  }
  .titleText{
    position relative;
    color #000
    font-size 3vw;
    line-height 4vw
  }
  .instText{
    position relative;
    color #ccc
    font-size 3vw;
    line-height 4vw
  }
  .butList{
    position relative;
    width 100%;
    padding 0 5% 0 5%
  }
  .butList>p{
    position: relative;
    font-size: 3.2vw;
    line-height: 11vw;
    color: #000;
  }
  .butList>input{
    position: relative;
    width: 100%;
    border: 0;
    line-height: 9vw;
    font-size: 3.5vw;
    background: #f9f7f7;
    color: #333;
  }
  .line{
    position: relative;
    width: 100%;
    border-bottom: 0.5px solid #5d5d5d;
  }
  .left{
    float: left;
  }
  .clear{
    clear: both;
  }
  .instrcList{
    position: relative;
    width: 100%;
    height: 20vw;
  }
  .letBox{
    position: relative;
    width: 10%;
  }
  .letBox .btnRadio{
    position relative;
    width 100%;
  }
  .letBox .btnRadio .btnTitle{
    background #f9f7f7
    margin-top: 5vw;
  }
  .conBox{
    position: relative;
    width: 23%;
  }
  .conBox .imgBox{
    position: relative;
    width: 100%;
  }
  .conBox .imgBox>img{
    position: relative;
    width: 16vw;
    height: 16vw;
    margin-top: 2vw;
  }
  .rigBox{
    position: relative;
    width: 60%;
    height:20vw;
  }
  .rigBox .textBox{
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(0%,-50%);
  }
  .rigBox .textBox .texInst{
    position: relative;
    width: 100%;
  }
  .rigBox .textBox .texInst .title{
    position: relative;
    width: 100%;
    font-size: 3vw;
    line-height: 5vw;
    color: #000000;
  }
  .rigBox .textBox .texInst .titleIns{
    position: relative;
    width: 100%;
    font-size: 3vw;
    line-height: 5vw;
    color: #ccc;
  }
  .leftBox{
    position relative;
    width 100%
  }
  .centBox{
    position relative;
    width 100%
  }
  .rightBox{
    position relative;
    width 100%
  }
  .leftBox>p{
    font-size 3.5vw;
    line-height 12vw;
    color #000000
    text-align left
  }
  .centBox>p{
    font-size 3.5vw;
    line-height 12vw;
    color #000000
    text-align center
  }
  .rightBox>p{
    font-size 3.5vw;
    line-height 12vw;
    color lightseagreen
    text-align right
  }

  //关注我们模块框
  #followMe {
    width 100%
    height 100%
    -webkit-overflow-scrolling touch
    transform: translate3d(0, 0, 0);
    background $color-fff
    position fixed
    top 100%
    left 0
    transition all 0.3s
    overflow-y scroll
    z-index 9999999
    padding-bottom 360px
  }

  #followMe .followMeWrap {
    width 100%
    /*-webkit-overflow-scrolling touch*/
    overflow hidden
    position relative
  }

  #followMe .followMeWrap textarea {
    display block
    width 90%
    margin 10px auto
    font-size 16px
    padding 3px
    color $color-cyd
    text-align center
    height 18px
  }

  #followMe .followMeWrap .companyName {
    font-size 16px
    font-weight 400
    color #2E2E30
  }

  #followMe .followMeWrap .companyIntro {
    font-size 13px
    color #9B9B9B
  }

  #followMe .followMeWrap .contactTelphone {
    font-size 12px
    color #02C2A2
  }

  #followMe .followMeWrap .qrWrap {
    width 240px
    height 300px
    border 1px solid #E2E2E2
    margin 20px auto
  }

  #followMe .followMeWrap .qrWrap .qrWrapTop {
    width 180px
    height 180px
    margin 30px
    position relative
  }

  #followMe .followMeWrap .qrWrap .qrWrapBtm {
    border-top 1px solid #E2E2E2
    height 60px
    line-height 60px
    padding-top 10px
  }

  #followMe .followMeWrap .qrWrap .qrWrapBtm p {
    line-height 20px
    font-size 12px
    font-weight 300
    text-align center
    color #02C2A2
  }

  #followMe .followMeWrap .qrWrap .qrWrapTop img {
    width 100%
    height 100%
  }

  #followMe .followMeWrap .saveFollowMe {
    width 345px
    height 45px
    border-radius 3px
    font-size 14px
    background $color-cyd
    color $color-fff
    margin 10px auto
    display block

  }

  #followMe .followMeWrap .saveFollowMe:disabled {
    opacity 0.5
  }

  #followMe .followMeWrap textarea::-webkit-input-placeholder {
    color: #eee
  }

  #followMe .followMeWrap .followMeTitle {
    text-align center
    font-size 20px
    font-weight 300
    margin 20px auto
    position relative
  }

  #followMe .followMeWrap .followMeTitle i {
    position absolute
    font-size 18px
    right 15px
    top 5px
    display inline-block
    width 50px
    height 50px
  }

  //添加互动按钮框
  #addActionBox, #addTelBox {
    width 90%
    height 200px
    position fixed
    border-radius 4px
    bottom 92px
    bottom -200px
    background rgba(200, 200, 200, 0.9)
    transition all 0.3s
    left 0
    right 0
    margin auto
  }

  #addActionBox .title, #addTelBox .title {
    width 100%
    display block
    position relative
    text-align center
    font-size 16px
    font-weight 300
    line-height 40px
    margin-top 10px
  }

  #addActionBox .title .noSaveBtn, #addActionBox .title .saveBtn, #addTelBox .title .noSaveBtn, #addTelBox .title .saveBtn {
    float left
    margin-left 20px
    font-weight 300
    display inline-block
    width 60px
    height 26px
    line-height 26px
    margin-top 10px
    border-radius 3px
    font-size 14px
  }

  #addActionBox .title .saveBtn, #addTelBox .title .saveBtn {
    float right
    margin-left 0
    margin-right 20px
    background $color-cyd
    color $color-fff
    transition all 0.3s
  }

  #addActionBox .title .saveBtn:disabled, #addTelBox .title .saveBtn:disabled {
    opacity 0.6
  }

  #addActionBox .insertGroup, #addTelBox .insertGroup {
    width 100%
    text-align center
    margin-top 10px
  }

  #addActionBox .insertGroup input, #addTelBox .insertGroup input {
    width 90%
    height 40px
    margin 10px auto
    text-indent 1em
    border-radius 3px
    font-size 14px
    font-weight 300
    color $color-cyd
  }

  #addActionBox .insertGroup input::-webkit-input-placeholder, #addTelBox .insertGroup input::-webkit-input-placeholder {
    font-weight 300
    font-size 14px
    color #ccc
  }

  //用户底部按钮组
  #userBtmBtnGroup {
    width 100%
    height 48px
    background rgba(245, 245, 245, 0.9)
    position fixed
    bottom 44px
    transition all 0.3s
    display flex
    justify-content center
  }

  #userBtmBtnGroup .userBtmBtnGroupItems {
    flex 1
    text-align center
    line-height 48px
    font-size 0
    transition all 0.3s
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  #userBtmBtnGroup .userBtmBtnGroupItems .userBtmAddBtn {
    width 100px
    height 34px
    line-height 34px
    border 1px dashed #ccc
    font-size 12px
    margin 7px auto
    box-sizing border-box
    font-weight 300
    transition all 0.5s
  }

  //底部两个互动按钮
  #userBtmBtnGroup .userBtmBtnGroupItems .btmBtnLink {
    font-size 16px
    background linear-gradient(to bottom right, #FAD161, #F77F3B)
    transform scale(1)
    position relative
    transition all 0.3s
  }

  #userBtmBtnGroup .userBtmBtnGroupItems .btmBtnLink i {
    position absolute
    font-size 32px
    color red
    right -30px
    top -20px
    cursor pointer
    display inline-block
    width 50px
    height 50px
  }

  #userBtmBtnGroup .userBtmBtnGroupItems .scale {
    transform scale(0.6) !important
  }
  #userBtmBtnGroup .userBtmBtnGroupItems .RbtmBtnLink {
    background linear-gradient(to bottom right, #15D49F, #57D6CF)
  }

  #userBtmBtnGroup .userBtmBtnGroupItems .btmBtnLink a {
    font-weight: 300;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* position: relative; */
    width: -9vw;
    display: block;
  }

  #userBtmBtnGroup .userBtmBtnGroupItems .leftBtns {
    font-size 12px
    width 50%
    height 48px
    text-align center
    display inline-block
    float left
  }

  #userBtmBtnGroup .userBtmBtnGroupItems .leftBtns .telIcon {
    line-height 18px
    margin-top 8px
  }

  #userBtmBtnGroup .userBtmBtnGroupItems .leftBtns h5 {
    line-height 20px
    font-size 12px
    font-weight 300
    transform scale(0.9)
    margin-top -3px
  }

  #userBtmBtnGroup .userBtmBtnGroupItems .leftBtns .telIcon i {
    font-size 16px
  }

  .tab-link {
    display: inline-block
    transition: all 0.3s
  }

  .temp_root {
    background #fff
    padding-bottom 90px
    z-index 10
  }

  .bannerImg {
    width 100%
    height 100%
  }

  .slider-wrapper
    position: relative
    width: 100%
    height: 0
    padding-top: 200px
    overflow: hidden
    .slider-content
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      .slider
        min-height: 1px
        height: 100%
        position: relative
        .slider-group
          position: relative
          overflow: hidden
          white-space: nowrap
          height: 100%
          .slider-item
            float: left
            height: 100%
            box-sizing: border-box
            overflow: hidden
            text-align: center
            position relative
            a
              display: block
              width: 100%
              height: 100%
              overflow: hidden
              text-decoration: none
              .bannerImg
                display: block
                width: 100%
                height 200px
        .dots
          position: absolute
          right: 0
          left: 0
          bottom: 12px
          transform: translateZ(1px)
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            transition all 0.3s
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll

  //nav start
  .navTopWrapper {
    width 100%
    height 100%
  }

  .navTopWrapper li {
    height 100%
    text-align center
    float left
    color $color-5d
    transition all 0.5s
  }

  .navTopWrapper li textarea {
    font-size: $font-size-small;
    max-width: 5em
    display: inline-block
    padding: 1px
    text-align: center
    border-radius: 3px
    height: 16px
    font-weight: 300
    resize: none
  }

  .navTopWrapper li .noEdit {
    color #000
  }

  //.navTopWrapper li textarea:focus {
  //border: 1px dashed #ccc
  //border-radius 3px
  //}
  .tab-icon {
    width 40px
    height 40px
    line-height 40px
    border-radius 50%
    /*border 1px solid #ccc*/
    margin 10px auto 4px auto
    background $color-bd
    text-align center
    position relative
  }

  .tab-icon i {
    font-size 20px
    color $color-fff
  }

  .navTopGroup {
    width 100%
    height 80px
    /*display flex*/
    /*background #eee*/
    box-shadow: 0 0 10px #f0e7e7
    background rgba(255, 255, 255, 0.9)
    margin-bottom .5px
    overflow hidden
    z-index 999
  }

  //isSelIconStyle选中的图标状态
  .isSelIconStyle .tab-icon {
    background linear-gradient(to bottom right, #139c76, #57D6CF)
  }

  .isSelIconStyle textarea {
    -webkit-text-fill-color $color-cyd
  }

  .isSelIconStyle textarea:disabled {
    -webkit-text-fill-color $color-cyd
  }

  .selIconGroup {
    width 100%
    overflow hidden
    z-index 999
    height 0
    background rgba(245, 245, 245, 0.9)
    transition all 0.3s
  }

  .selIconGroupTitle {
    width 375px
    text-align center
    font-size 14px
    color $color-cyd
    font-weight 300
    margin-top -20px
  }

  .selIconWrap {
    /*width: 4000px;*/
  }

  .selIconWrap li {
    width: 56px
    height 56px
    line-height 56px
  }

  .selIconWrap li i {
    font-size: 28px
  }

  .nav-del-btn {
    width 16px
    height 16px
    border-radius 8px
    position absolute
    top -4px
    right -9px
    font-size 0
    /*transition all 0.3s*/
  }

  .nav-del-btn i {
    font-size 20px
    /*font-weight bolder*/
    position absolute
    color red
    top -12px
    right 1px
    z-index 10
    /*transition all 0.3s*/
  }

  .manageNavStyle
    li
      &:nth-last-child(1)
        .tab-icon
          background $color-fff
          border 1px dashed $color-9b
          .iconfont
            color $color-cyd
        textarea
          border none !important
        .nav-del-btn
          display none
      &:nth-last-child(2)
        .tab-icon
          background $color-fff
          border 1px dashed $color-9b
          .iconfont
            color $color-cyd
        textarea
          border none !important
        .nav-del-btn
          display none

  .hideNavTopGroup {
    display: none
    height 80px
  }

  .hideselIconGroup {
    height 3.5rem
    display none
  }

  //nav end
  //底部去编辑按钮
  .confirm
    width 100%
    height 44px
    background rgba(46, 46, 48, 0.8)
    position fixed
    //bottom -44px
    bottom 0
    line-height 44px
    text-align center
    color #fff
    font-size 14px
    font-weight 300
    transition all 0.5s
    z-index 999

  //编辑中的按钮
  .ediTingBtmBtns
    width 100%
    display flex
    height 44px
    background rgba(46, 46, 48, .8)
    position fixed
    bottom -44px
    transition all .3s
    justify-content center
    z-index 99999
    .ediTingBtmBtnsItems
      flex 1
      text-align center
      line-height 44px
      a
        display block
        color #fff
        font-size 16px
        font-weight 300
        line-height 44px
        cursor pointer
        i
          font-size 16px
    .goLine
      background linear-gradient(to right, rgba(21, 212, 159, 1), rgba(87, 214, 207, 1))

  //增加模块框
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
    z-index 11
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
        justify-content space-around
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
        position fixed
        bottom -45px
        width 100%
        left 0
        height 45px
        line-height 45px
        color #fff
        background #02C2A2
        border-radius 3px
        font-size 14px
        &:disabled
          background: #98e4d8 !important;

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
    z-index 10
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

  //如何安装模块
  #moduleWrap
    .list-complete
      .list-complete-item
        .itemRoot
          .installRoot
            display flex
            flex-wrap wrap
            justify-content center
            align-items flex-start
            align-content flex-start
            .mi_install_thisItem
              flex 1 1 50%
              text-align center
              .item_num
                min-width 50px
                max-width 375px
                min-height 50px
                line-height 50px
                font-size 30px
                border-radius 25px
                color $color-fff
                display inline-block
                background $color-cyd
                margin-top 50px
              .item_title
                font-size $font-size-18
                color $color-34
                width 170px
                margin 25px auto 16px auto
                padding 3px
                text-align center
                height 24px
                line-height 24px
              .item_con
                font-size $font-size-14
                color $color-5d
                max-width 144px
                display inline-block
                text-align left
                line-height 20px
                padding 10px
              .itemConWrap_imgWrap
                margin 0 auto
              .item_img
                width 178px
                height 210px
                margin-top 25px
                img
                  width 100%
                  height 100%

  .isLikeWrap {
    text-align center
  }

  .isLikeWrap p {
    font-size 14px
    color #02C2A2
  }

  .isLikeWrap p i {
    font-size 16px
  }
</style>
